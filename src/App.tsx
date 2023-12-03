import { useEffect, useState } from "react";
import ObjectEntities from "./components/Entities/Entities";
import rootNodeData from "./dataStore/nodeTree";
import { generateSchema, isValidSchema } from "./utils/helpers";
import { fakerDE as faker } from "@faker-js/faker";
import styles from "./App.module.scss";
import { useToast } from "./context/ToastContext";
import Editor, { loader } from "@monaco-editor/react";

export default function App() {
  const { triggerPopup } = useToast();
  const [generatedData, setGeneratedData] = useState({
    count: 5,
    // flag for force re-rendering
    triggerLoad: false,
    data: {},
    rootNode: rootNodeData,
    hasError: false,
  });

  function loadFromLocal() {
    const cache = localStorage.getItem("schema");
    if (cache) {
      const rootNode = JSON.parse(cache);
      setGeneratedData((prev) => ({
        ...prev,
        rootNode,
        triggerLoad: !prev.triggerLoad,
      }));
      triggerPopup("Loaded schema successfully!");
    } else {
      triggerPopup("Nothing to load", "error");
    }
  }

  function validateAndGenerate() {
    const { mainNode, isValid } = isValidSchema(generatedData.rootNode);
    if (isValid) {
      handleGenerate();
    } else {
      setGeneratedData((prev) => ({
        ...prev,
        rootNode: structuredClone(mainNode),
        hasError: true,
      }));
    }
  }

  function handleGenerate() {
    function createFakeData() {
      const res = generateSchema(generatedData.rootNode);
      return res;
    }
    const fakerData = faker.helpers.multiple(createFakeData, {
      count: generatedData.count,
    });
    setGeneratedData((prev) => ({
      ...prev,
      data: fakerData,
      hasError: false,
    }));
  }

  function saveSchemaLocally() {
    localStorage.setItem(
      "schema",
      JSON.stringify(generatedData.rootNode, (k, v) => k !== "parent" && v)
    );
    triggerPopup("Saved to local");
  }

  async function copyContent(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      triggerPopup("Content copied to clipboard");
    } catch (err) {
      triggerPopup("Failed to copy to clipboard", "error");
    }
  }

  useEffect(() => {
    loader.init().then((monaco) => {
      monaco.editor.defineTheme("vs-json", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#202125",
          "scrollbar.shadow": "#202125",
        },
      });
    });
  }, []);

  return (
    <div className={styles.editor_container}>
      <div className={styles.editor_element}>
        <div className={styles.left_pane}>
          <div className={styles.generate_section}>
            <button
              className={styles.generate_button}
              onClick={validateAndGenerate}
            >
              Generate{" "}
              {generatedData.hasError && (
                <span style={{ padding: "2px", color: "red" }}> ! </span>
              )}
            </button>

            <button
              className={styles.generate_button}
              onClick={saveSchemaLocally}
            >
              Save
            </button>

            <button className={styles.generate_button} onClick={loadFromLocal}>
              Load Saved
            </button>

            <div className={styles.datapoint_count_input}>
              <div className={styles.count_input_tag}>
                <p> Data-count</p>
              </div>
              <input
                type="number"
                value={generatedData.count}
                onChange={(e) =>
                  setGeneratedData((prev) => ({
                    ...prev,
                    count: +e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className={styles.root_entity_container}>
            <ObjectEntities node={generatedData.rootNode} />
          </div>
        </div>
      </div>
      <div className={styles.json_element}>
        <div
          style={{
            width: "100%",
            height: "100%",
            flex: 1,
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              className={styles.copy_button}
              onClick={() =>
                copyContent(JSON.stringify(generatedData.data, null, 2))
              }
            >
              Copy
            </button>
          </div>
          <div className={styles.json_monaco_container}>
            <Editor
              height="95%"
              defaultLanguage="json"
              defaultValue={JSON.stringify(generatedData.data, null, 2)}
              value={JSON.stringify(generatedData.data, null, 2)}
              theme="vs-json"
              options={{ readOnly: true, cursorBlinking: "solid" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
