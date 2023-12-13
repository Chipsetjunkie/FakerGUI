import styles from "./PreviewPane.module.scss"
import Editor from "@monaco-editor/react";
import { PreviewPaneProps } from "./PreviewPane.type";

export default function PreviewPane({copyContent, generatedData}:Readonly<PreviewPaneProps>) {
    return (
        <div className={styles.preview_root_container}>
            <div
                style={{
                    flex: 1,
                    width: "100%",
                    flexDirection: "column",
                }}
            >
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                        className={styles.preview_copy_button}
                        onClick={() =>
                            copyContent(JSON.stringify(generatedData.data, null, 2))
                        }
                    >
                        Copy
                    </button>
                </div>
                <div className={styles.preview_monaco_container}>
                    <div style={{ width: "100%", height: "100%" }}>
                        <Editor
                            height="100%"
                            defaultLanguage="json"
                            defaultValue={JSON.stringify(generatedData.data, null, 2)}
                            value={JSON.stringify(generatedData.data, null, 2)}
                            theme="vs-json"
                            options={{ readOnly: true }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
