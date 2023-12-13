import styles from "./SchemaPane.module.scss";
import ObjectEntities from "../../components/Entities";
import { SchemaPaneProps } from "./SchemaPane.type";


export default function SchemaPane({
  validateAndGenerate,
  generatedData,
  saveSchemaLocally,
  loadFromLocal,
  updateCount,
}: Readonly<SchemaPaneProps>) {
  return (
    <div className={styles.schema_root_container}>
      <div className={styles.left_pane}>
        <div className={styles.generate_section}>
          <button
            className={styles.generate_section_button}
            onClick={validateAndGenerate}
          >
            Generate{" "}
            {generatedData.hasError && (
              <span style={{ padding: "2px", color: "red" }}> ! </span>
            )}
          </button>

          <button
            className={styles.generate_section_button}
            onClick={saveSchemaLocally}
          >
            Save
          </button>

          <button
            className={styles.generate_section_button}
            onClick={loadFromLocal}
          >
            Load Saved
          </button>

          <div className={styles.datapoint_count_input}>
            <div className={styles.count_input_tag}>
              <p> Data-count</p>
            </div>
            <input
              type="number"
              value={generatedData.count}
              onChange={(e) => updateCount(+e.target.value)}
            />
          </div>
        </div>
        <div className={styles.root_entity_container}>
          <ObjectEntities node={generatedData.rootNode} />
        </div>
      </div>
    </div>
  );
}
