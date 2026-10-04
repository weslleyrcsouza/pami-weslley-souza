import domtoimage from "dom-to-image";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library/legacy";
import { useEffect, useRef, useState } from "react";
import {
  ImageSourcePropType,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";

import Button from "@/components/Button";
import CircleButton from "@/components/CircleButton";
import EmojiList from "@/components/EmojiList";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiSticker from "@/components/EmojiSticker";
import IconButton from "@/components/IconButton";
import ImageViewer from "@/components/ImageViewer";

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [pickedEmoji, setPickedEmoji] = useState<
    ImageSourcePropType | undefined
  >(undefined);

  const [permissionResponse, requestPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const imageRef = useRef<View>(null);

  /*
   * No navegador do iPhone, o arquivo precisa estar pronto
   * ANTES do usuário tocar em Save.
   *
   * Caso contrário, o Safari pode bloquear a tela de
   * compartilhamento.
   */
  const [webFile, setWebFile] = useState<File | null>(null);
  const [webFilePreparing, setWebFilePreparing] = useState(false);

  useEffect(() => {
    if (Platform.OS !== "web" && !permissionResponse?.granted) {
      requestPermission();
    }
  }, [permissionResponse, requestPermission]);

  /*
   * Prepara antecipadamente a imagem para o Safari/iPhone.
   */
  useEffect(() => {
    if (
      Platform.OS !== "web" ||
      !showAppOptions ||
      !imageRef.current
    ) {
      return;
    }

    let cancelled = false;

    const prepareWebImage = async () => {
      try {
        setWebFilePreparing(true);

        /*
         * Pequena espera para garantir que a foto e o sticker
         * terminaram de renderizar.
         */
        await new Promise((resolve) => setTimeout(resolve, 400));

        if (!imageRef.current || cancelled) {
          return;
        }

        const blob = await domtoimage.toBlob(
          imageRef.current as any,
          {
            width: 320,
            height: 440,
          }
        );

        if (!blob || cancelled) {
          return;
        }

        const file = new File(
          [blob],
          "veigh-stickers.png",
          {
            type: "image/png",
          }
        );

        if (!cancelled) {
          setWebFile(file);
          console.log("Imagem pronta para salvar no navegador.");
        }
      } catch (error) {
        console.error(
          "Erro ao preparar imagem para navegador:",
          error
        );
      } finally {
        if (!cancelled) {
          setWebFilePreparing(false);
        }
      }
    };

    prepareWebImage();

    return () => {
      cancelled = true;
    };
  }, [selectedImage, pickedEmoji, showAppOptions]);

  const pickImageAsync = async () => {
    try {
      if (
        Platform.OS !== "web" &&
        !permissionResponse?.granted
      ) {
        const permission = await requestPermission();

        if (!permission.granted) {
          alert(
            "Permita o acesso às fotos para escolher uma imagem."
          );
          return;
        }
      }

      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsEditing: true,
          quality: 1,
        });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        setWebFile(null);
        setShowAppOptions(true);
      }
    } catch (error) {
      console.error(
        "Erro ao escolher imagem:",
        error
      );

      alert(
        "Não foi possível abrir a galeria."
      );
    }
  };

  const onReset = () => {
    setSelectedImage(undefined);
    setPickedEmoji(undefined);
    setShowAppOptions(false);
    setWebFile(null);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    if (!imageRef.current) {
      alert(
        "A imagem ainda não está pronta para ser salva."
      );
      return;
    }

    /*
     * =========================================================
     * WEB / SAFARI / IPHONE
     * =========================================================
     */
    if (Platform.OS === "web") {
      try {
        if (webFilePreparing) {
          alert(
            "A imagem ainda está sendo preparada. Aguarde um instante e toque em Save novamente."
          );
          return;
        }

        if (!webFile) {
          alert(
            "A imagem ainda não está pronta. Aguarde um instante e toque em Save novamente."
          );
          return;
        }

        const webNavigator = navigator as any;

        /*
         * iPhone/iPad:
         * abre a folha de compartilhamento do iOS.
         */
        if (
          webNavigator.share &&
          (
            !webNavigator.canShare ||
            webNavigator.canShare({
              files: [webFile],
            })
          )
        ) {
          await webNavigator.share({
            files: [webFile],
            title: "Veigh Stickers",
          });

          return;
        }

        /*
         * Fallback para computador / outros navegadores.
         */
        const url =
          URL.createObjectURL(webFile);

        const link =
          document.createElement("a");

        link.href = url;
        link.download =
          "veigh-stickers.png";

        document.body.appendChild(link);

        link.click();

        link.remove();

        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 2000);
      } catch (error: any) {
        /*
         * Se o usuário fechar a tela de compartilhamento
         * sem salvar, não mostramos erro.
         */
        if (
          error?.name === "AbortError"
        ) {
          return;
        }

        console.error(
          "Erro ao salvar no navegador:",
          error
        );

        alert(
          "Não foi possível salvar a imagem.\n\n" +
            String(error)
        );
      }

      return;
    }

    /*
     * =========================================================
     * EXPO GO / IPHONE / ANDROID NATIVO
     * =========================================================
     */
    try {
      const permission =
        await MediaLibrary.requestPermissionsAsync(
          true
        );

      if (!permission.granted) {
        alert(
          "Permita que o aplicativo salve imagens nas suas Fotos."
        );
        return;
      }

      const localUri =
        await captureRef(imageRef, {
          format: "png",
          quality: 1,
          result: "tmpfile",
        });

      console.log(
        "Imagem criada em:",
        localUri
      );

      await MediaLibrary.saveToLibraryAsync(
        localUri
      );

      alert(
        "Imagem salva na galeria! ✅"
      );
    } catch (error) {
      console.error(
        "Erro ao salvar imagem:",
        error
      );

      alert(
        "Não foi possível salvar a imagem.\n\n" +
          String(error)
      );
    }
  };

  return (
    <GestureHandlerRootView
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <View
          ref={imageRef}
          collapsable={false}
        >
          <ImageViewer
            imgSource={PlaceholderImage}
            selectedImage={selectedImage}
          />

          {pickedEmoji && (
            <EmojiSticker
              imageSize={40}
              stickerSource={pickedEmoji}
            />
          )}
        </View>
      </View>

      {showAppOptions ? (
        <View
          style={styles.optionsContainer}
        >
          <View style={styles.optionsRow}>
            <IconButton
              icon="refresh"
              label="Reset"
              onPress={onReset}
            />

            <CircleButton
              onPress={onAddSticker}
            />

            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View
          style={styles.footerContainer}
        >
          <Button
            theme="primary"
            label="Choose a photo"
            onPress={pickImageAsync}
          />

          <Button
            label="Use this photo"
            onPress={() => {
              setShowAppOptions(true);
              setWebFile(null);
            }}
          />
        </View>
      )}

      <EmojiPicker
        isVisible={isModalVisible}
        onClose={onModalClose}
      >
        <EmojiList
          onSelect={(emoji) => {
            setPickedEmoji(emoji);
            setWebFile(null);
          }}
          onCloseModal={
            onModalClose
          }
        />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },

  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },

  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },

  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },

  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});