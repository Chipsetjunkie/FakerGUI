import { useState } from "react";
import ObjectEntities from "./components/Entities/Entities";
import rootNodeData from "./dataStore/nodeTree";
import { generateSchema, isValidSchema } from "./utils/helpers";
import { fakerDE as faker } from "@faker-js/faker";
import styles from "./App.module.scss";


export default function App() {
  const [generatedData, setGeneratedData] = useState({
    count: 5,
    // flag for force re-rendering
    triggerLoad: false,
    data: {},
    rootNode:rootNodeData,
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
    }
  }

  function validateAndGenerate() {
    if (isValidSchema(generatedData.rootNode)) {
      handleGenerate();
    } else {
      setGeneratedData((prev) => ({
        ...prev,
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
  }

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

      <div className={styles.partition_line} />
      <div className={styles.editor_element}>
        <pre>{JSON.stringify(generatedData.data, null, 2)}</pre>
      </div>
    </div>
  );
}
