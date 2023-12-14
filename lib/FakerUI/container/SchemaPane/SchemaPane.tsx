import styles from "./SchemaPane.module.scss";
import ObjectEntities from "../../components/Entities";
import { SchemaPaneProps } from "./SchemaPane.type";

// TODO : Refactor styles

export default function SchemaPane({
  generatedData,
  isMobile
}: Readonly<SchemaPaneProps>) {
  return (
    <div className={styles.schema_root_container} style={{ width: !isMobile ? "48vw" : "100vw", marginRight: isMobile ? "40px" : "0px", overflow: "hidden", height: "95vh", border:isMobile ? "1px solid #ffffff4d":"none", borderRadius:"4px" }}>
      <div className={styles.root_entity_container}>
        <ObjectEntities node={generatedData.rootNode} />
      </div>
    </div>
  );
}
