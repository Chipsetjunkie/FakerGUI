import styles from "./PreviewPane.module.scss"
import Editor from "@monaco-editor/react";
import { PreviewPaneProps } from "./PreviewPane.type";

//assets
import CloseIcon from "@lib/FakerUI/assets/close.svg"

export default function PreviewPane({ copyContent, generatedData, onClose }: Readonly<PreviewPaneProps>) {


    return <div className={styles.preview_pane_backdrop_container}>
        <div className={styles.preview_pane_root_container}>
            <div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                    <button
                        className={styles.preview_copy_button}
                        onClick={() =>
                            copyContent(JSON.stringify(generatedData.data, null, 2))
                        }
                    >
                        Copy


                    </button>
                    <button
                        onClick={onClose}
                        className={styles.preview_close_button}
                    >
                        <img src={CloseIcon} style={{ width: "16px", height: "16px" }} />
                    </button>

                </div>
            </div>
            <div className={styles.preview_monaco_container}>
                <Editor
                    height="60vh"
                    defaultLanguage="json"
                    defaultValue={JSON.stringify(generatedData.data, null, 2)}
                    value={JSON.stringify(generatedData.data, null, 2)}
                    theme="vs-json"
                    options={{ readOnly: true }}
                />
            </div>
        </div >
    </div>
}
