import { AppState } from "@lib/FakerUI/types"

export interface PreviewPaneProps {
    copyContent: (p: string) => void,
    generatedData: AppState
    onClose: () => void
}
