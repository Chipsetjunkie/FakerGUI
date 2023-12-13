import { AppState } from "../../types";
export interface SchemaPaneProps {
    validateAndGenerate: (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
    generatedData: AppState;
    saveSchemaLocally: () => void;
    loadFromLocal: () => void;
    updateCount: (p: number) => void;
  }
  