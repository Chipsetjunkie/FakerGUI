import styles from "./PreviewPane.module.scss"
import Editor from "@monaco-editor/react";
import { PreviewPaneProps } from "./PreviewPane.type";

export default function PreviewPane({ copyContent, generatedData, isMobile }: Readonly<PreviewPaneProps>) {


    return <div className={styles.preview_pane_root_container} style={{ width: isMobile ? "100%" : "43vw", marginLeft: isMobile ? "150px" : "" }}>
        <div>
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
        </div>
        <div className={styles.preview_monaco_container}>
            <Editor
                height="85vh    "
                defaultLanguage="json"
                defaultValue={JSON.stringify(generatedData.data, null, 2)}
                value={JSON.stringify(generatedData.data, null, 2)}
                theme="vs-json"
                options={{ readOnly: true }}
            />
        </div>
    </div >

}
