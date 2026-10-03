# Veigh Studio — StickerSmash

Projeto de **Programação Web I**, da **Etec Camargo Aranha**, professor **João Siles**.

Aluno: **Weslley Romã Campos de Souza**.

Este projeto implementa as nove etapas do [tutorial oficial de React Native e Expo](https://docs.expo.dev/tutorial/introduction/). A identidade visual foi adaptada para um tema inspirado no Veigh, com fundo preto, elementos em prata, detalhes vermelhos e uma foto do artista. As seis figurinhas são as fornecidas pelo tutorial.

## Como abrir no computador

Instale o **Node.js LTS** e abra esta pasta no VS Code. O projeto usa **Expo SDK 57**. É recomendado Node.js 22 LTS ou 24 LTS.

Se você já clonou o repositório, abra um terminal na pasta `pami-weslley-souza` e execute:

```bash
cd veigh-stickers
npm ci
npm run web
```

Abra o endereço mostrado no terminal. A pasta que precisa conter o `package.json` é `veigh-stickers`, e não a raiz do repositório PAMI.

Se ainda não tem o repositório no computador:

```bash
git clone https://github.com/weslleyrcsouza/pami-weslley-souza.git
cd pami-weslley-souza/veigh-stickers
npm ci
npm run web
```

## Como abrir no celular

Instale uma versão do **Expo Go compatível com o SDK 57**. No terminal desta pasta:

```bash
npm start
```

Mantenha celular e computador na mesma rede Wi-Fi. Leia o QR code pelo Expo Go no Android ou pela câmera no iPhone. No iPhone, entre na mesma conta Expo no Expo Go e no terminal, usando `npx expo login` quando solicitado. Se a rede bloquear a conexão, use `npx expo start --tunnel` e siga as instruções exibidas pelo Expo.

## Como usar

1. Toque em **Escolher uma foto** ou **Usar esta foto**.
2. Toque em **+** para abrir o seletor de figurinhas.
3. Escolha uma das seis figurinhas. Ela aparece sobre a foto e substitui a escolha anterior, como no tutorial.
4. Arraste para mover. Dê dois toques para ampliar e mais dois para reduzir.
5. Toque em **Salvar**. Na web, será baixado `veigh-stickers.jpeg`. No aplicativo nativo, a imagem é salva na galeria, após a permissão do aparelho.
6. **Reiniciar** remove a figurinha e retorna à escolha da foto, mantendo a foto atual. Você pode escolher outra foto ou usar a mesma novamente.

No computador, também é possível dar dois cliques na figurinha. Para usar o teclado, selecione a figurinha com Tab, mova com as setas e use Enter ou Espaço para mudar o tamanho.

## As nove etapas do tutorial

| Etapa | Implementação |
| --- | --- |
| 1. Criar o aplicativo | Projeto gerado com `create-expo-app`, TypeScript e Expo SDK 57. |
| 2. Adicionar navegação | Stack em `src/app/_layout.tsx`, abas Início/Sobre em `src/app/(tabs)/_layout.tsx` e fallback `+not-found.tsx`. |
| 3. Construir a tela | Flexbox, `View`, `Text`, `Pressable`, componentes reutilizáveis e `expo-image`. |
| 4. Escolher uma imagem | `expo-image-picker`, com opção de usar a foto inicial. |
| 5. Criar um modal | `Modal` em `emoji-picker.tsx` e `FlatList` horizontal em `emoji-list.tsx`. |
| 6. Adicionar gestos | Arrastar e tocar duas vezes, com Gesture Handler e Reanimated em `emoji-sticker.tsx`. |
| 7. Capturar a imagem | `react-native-view-shot` e `expo-media-library` no aplicativo nativo. |
| 8. Tratar diferenças entre plataformas | `save-image.web.ts` usa `dom-to-image`; `save-image.ts` salva na galeria nativa. |
| 9. Configurar barra de status, abertura e ícone | `StatusBar` claro, plugin de splash screen e ícones próprios em `app.json`. |

## Organização

| Pasta ou arquivo | Função |
| --- | --- |
| `src/app/` | Rotas, layouts e telas. |
| `src/components/` | Botões, visualizador, modal, lista e figurinha com gestos. |
| `src/constants/` | Cores e lista das figurinhas. |
| `src/utils/` | Captura e salvamento para cada plataforma. |
| `assets/images/` | Todos os arquivos oficiais baixados do tutorial e a foto do Veigh. |
| `assets/brand/` | Ícone, splash e favicon do tema Veigh Studio. |
| `public/favicon.svg` | Ícone da versão web. |
| `app.json` | Configurações do Expo e permissões. |
| `package-lock.json` | Versões fixadas das dependências para `npm ci`. |

Os assets originais de ícone, splash e foto do tutorial foram preservados em `assets/images`. O app usa os assets personalizados de `assets/brand` e `assets/images/veigh.jpg`.

## Verificações e exportação

```bash
npm run typecheck
npm run lint
npm run build
```

`npm run build` exporta a versão web para `dist/`. Para visualizar essa exportação localmente, depois do build use `npm run dev`. Para desenvolver normalmente com atualização das alterações, use `npm run web`.

`node_modules`, `dist`, pastas nativas geradas e dados temporários ficam fora do Git. Tudo o que você precisa para instalar e executar está nesta única pasta do projeto.

### Observações do SDK 57

A função `saveToLibraryAsync` usada no tutorial está disponível em `expo-media-library/legacy` neste SDK. O projeto importa esse caminho para manter o mesmo comportamento sem chamar a API descontinuada que lança um erro em tempo de execução.

O ícone e a tela de abertura estão configurados. A aparência real da splash screen precisa ser conferida em um build de preview ou produção; o Expo Go não reproduz essa parte integralmente. Não é necessário publicar em loja para executar a atividade no navegador.

## Créditos

- Tutorial e assets: [Expo — StickerSmash](https://docs.expo.dev/tutorial/introduction/).
- Código de referência: [expo/examples/stickersmash](https://github.com/expo/examples/tree/master/stickersmash).
- Foto inicial do Veigh: João Rocha / Moodgate, gravação do DVD **EVOM — A Última Dança**, no Espaço Unimed, em 03/06/2026. [Reportagem e crédito da foto](https://moodgate.com.br/2026/06/04/veigh-celebra-o-fim-da-era-evom-em-noite-historica-de-gravacao-de-dvd-no-espaco-unimed/). Direitos da fotografia pertencem ao autor.
- Este é um projeto acadêmico inspirado no artista, sem vínculo oficial com ele.
