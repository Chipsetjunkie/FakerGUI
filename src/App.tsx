import { useState } from "react";
import ObjectEntities from "./components/Entities/Entities";
import rootNode from "./dataStore/nodeTree";
import { generateSchema, isValidSchema } from "./utils/helpers";
import { fakerDE as faker } from "@faker-js/faker";
import styles from "./App.module.scss";

export default function App() {
  const [generatedData, setGeneratedData] = useState({
    count: 5,
    data: {},
    hasError: false,
  });

  function validateAndGenerate() {
    if (isValidSchema(rootNode)) {
      handleGenerate();
    }
  }

  function handleGenerate() {
    function createFakeData() {
      const res = generateSchema(rootNode);
      return res;
    }
    const fakerData = faker.helpers.multiple(createFakeData, {
      count: generatedData.count,
    });
    setGeneratedData((prev) => ({ ...prev, data: fakerData }));
  }

  return (
    <div className={styles.editor_container}>
      <div className={styles.editor_element}>
        <div>
          <div>
            <button
              className={styles.generate_button}
              onClick={validateAndGenerate}
            >
              Generate
            </button>
          </div>
          <div>
            <ObjectEntities node={rootNode} />
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
