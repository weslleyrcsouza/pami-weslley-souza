import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#09090b" />
        <meta name="description" content="Escolha sua foto, adicione uma figurinha e salve sua criação. StickerSmash com identidade visual inspirada no Veigh." />
        <title>Veigh Studio · StickerSmash</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <ScrollViewStyleReset />
        <style>{'body{background:#09090b;color:#f4f4f5}*:focus-visible{outline:2px solid #ff4d5a;outline-offset:4px}img{user-select:none;-webkit-user-drag:none}'}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
