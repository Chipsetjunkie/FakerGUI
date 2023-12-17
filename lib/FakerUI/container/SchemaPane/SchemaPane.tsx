import styles from "./SchemaPane.module.scss";
import ObjectEntities from "@lib/FakerUI/components/CoreComponents/Entities";
import { SchemaPaneProps } from "./SchemaPane.type";

// TODO : Refactor styles

export default function SchemaPane({
  generatedData,
}: Readonly<SchemaPaneProps>) {
  return (
    <div className={styles.schema_root_container}>
      <div className={styles.root_entity_container}>
        <ObjectEntities node={generatedData.rootNode} />
      </div>
    </div>
  );
}
