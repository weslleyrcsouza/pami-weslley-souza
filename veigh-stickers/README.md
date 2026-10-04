# StickerSmash Example

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  <!-- Web -->
  <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
</p>

Example code for "Get started tutorial" in Expo documentation.

## Launch your own

[![Launch with Expo](https://github.com/expo/examples/blob/master/.gh-assets/launch.svg?raw=true)](https://launch.expo.dev/?github=https://github.com/weslleyrcsouza/pami-weslley-souza/tree/main/veigh-stickers)


## Abrir esta versão no iPhone ou Android

Este é o aplicativo completo do tutorial StickerSmash, feito com Expo e React Native. As telas, cores, textos, botões, abas e stickers são os originais. A imagem inicial da praia foi substituída pela foto do Veigh no EVOM DVD.

1. Instale o [Node.js LTS](https://nodejs.org/) no computador e o [Expo Go](https://expo.dev/go) no celular.
2. No terminal, dentro do repositório `pami-weslley-souza`, execute:

```bash
git pull origin main
cd veigh-stickers
npm ci
npx expo login
npx expo start --go
```

3. No iPhone, entre no Expo Go com a mesma conta Expo usada no comando `expo login`. Leia o QR code do terminal com a Câmera do iPhone e abra no Expo Go.
4. No Android, abra o Expo Go e use **Scan QR code** para ler o QR code do terminal.
5. Mantenha o computador e o celular conectados à mesma rede Wi-Fi e o terminal aberto enquanto usa o aplicativo.

Se a rede da escola impedir a conexão, encerre o servidor com Ctrl+C e execute:

```bash
npx expo start --go --tunnel
```

O projeto utiliza o Expo SDK 57. Use uma versão do Expo Go compatível com esse SDK. O site publicado é a versão web do mesmo projeto; para abrir a versão nativa de iPhone ou Android, use o QR code do Expo Go.

Instruções oficiais: [executar o aplicativo no celular](https://docs.expo.dev/tutorial/create-your-first-app/#run-the-app-on-mobile-and-web).

## 🚀 How to use

- Install packages with `npm install` or `yarn install`.
- Run `npx expo start` to start the bundler.
- Open the project in Expo Go app:
  - iOS: [Client iOS](https://itunes.apple.com/app/apple-store/id982107779)
  - Android: [Client Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=blankexample)
  - Web: Any web browser

## Deploy

Deploy on all platforms with Expo Application Services (EAS).

- Deploy the website: `npx eas-cli deploy` — [Learn more](https://docs.expo.dev/eas/hosting/get-started/)
- Deploy on iOS and Android using: `npx eas-cli build` — [Learn more](https://expo.dev/eas)

## 📝 Notes

Learn more about building **StickerSmash** app from scratch in [Get started with Expo tutorial](https://docs.expo.dev/tutorial/introduction/).
