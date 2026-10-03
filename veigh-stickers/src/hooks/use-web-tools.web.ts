import { useEffect, useLayoutEffect, useRef } from 'react';
import type { EditorActions } from './use-web-tools';
export type { EditorActions } from './use-web-tools';

type ModelContext = { registerTool: (tool: { name: string; title: string; description: string; inputSchema: object; annotations: { readOnlyHint: boolean; untrustedContentHint: boolean }; execute: (input: unknown) => unknown }, options: { signal: AbortSignal }) => void | Promise<void> };

export function useWebTools(actions: EditorActions) {
  const latest = useRef(actions);
  useLayoutEffect(() => { latest.current = actions; }, [actions]);
  useEffect(() => {
    const context = (document as Document & { modelContext?: ModelContext }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const register = (name: string, title: string, description: string, inputSchema: object, readOnly: boolean, execute: (input: unknown) => unknown) => {
      try {
        void Promise.resolve(context.registerTool({ name, title, description, inputSchema, annotations: { readOnlyHint: readOnly, untrustedContentHint: false }, execute }, { signal: lifecycle.signal })).catch(() => {});
      } catch { /* Navegadores sem suporte continuam usando a interface normal. */ }
    };
    const empty = { type: 'object', properties: {}, additionalProperties: false };
    register('read_editor_state', 'Ler estado do editor', 'Consulta a foto e a figurinha atualmente selecionadas.', empty, true, () => latest.current.getState());
    register('start_editing_current_photo', 'Editar foto atual', 'Ativa as opções de edição para a foto exibida.', empty, false, async () => {
      latest.current.useCurrentPhoto();
      await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      return latest.current.getState();
    });
    register('set_photo_sticker', 'Escolher figurinha', 'Substitui a figurinha atual por uma das seis opções. A foto precisa estar em edição.', { type: 'object', properties: { stickerId: { type: 'string', enum: ['emoji1','emoji2','emoji3','emoji4','emoji5','emoji6'] } }, required: ['stickerId'], additionalProperties: false }, false, async input => {
      if (!input || typeof input !== 'object' || !('stickerId' in input) || typeof input.stickerId !== 'string') throw new Error('Informe stickerId.');
      await latest.current.selectSticker(input.stickerId);
      return latest.current.getState();
    });
    return () => lifecycle.abort();
  }, []);
}
