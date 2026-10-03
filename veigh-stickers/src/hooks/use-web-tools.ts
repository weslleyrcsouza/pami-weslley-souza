// A versão web registra as ações do editor quando o navegador oferece WebMCP.
export function useWebTools(_actions: EditorActions) { void _actions; }

export type EditorActions = {
  getState: () => { editing: boolean; selectedSticker: string | null; customPhoto: boolean };
  useCurrentPhoto: () => void;
  selectSticker: (id: string) => Promise<void>;
  reset: () => void;
};
