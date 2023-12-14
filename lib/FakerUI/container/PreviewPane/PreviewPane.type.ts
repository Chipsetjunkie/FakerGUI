import { AppState } from "../../types"

export interface PreviewPaneProps {
    copyContent: (p: string) => void,
    generatedData: AppState,
    isMobile: boolean
}
