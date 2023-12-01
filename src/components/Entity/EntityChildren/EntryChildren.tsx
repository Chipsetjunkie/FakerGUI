import { useEffect, useState } from "react";

import Entities from "../../Entities/Entities";
import { EntryChildrenProps } from "./EntityChidren.types";
import styles from "./EntryChildren.module.scss";

export default function EntryChildren({
  node,
  handlePropertyLabelChange,
  propertyLabel,
  deleteCurrentNodeFromParent,
  isImmediateRootChild,
  removeAllChildrenFromCurrentNode,
}: Readonly<EntryChildrenProps>) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(node.error[0]);
  }, [node.error]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    // updating main schema node
    node.error[0] = false

    setError(false);
    handlePropertyLabelChange(e);
  }

  return (
    <div className={styles.main_container}>
      <div>
        <div className={styles.root_container}>
          <button
            className={styles.add_button}
            onClick={removeAllChildrenFromCurrentNode}
          >
            {"{"}
          </button>
          <input
            placeholder="key value"
            className={styles.input}
            onChange={handleInputChange}
            value={propertyLabel}
          />
          {!isImmediateRootChild && (
            <button
              className={styles.delete_button}
              onClick={deleteCurrentNodeFromParent}
            >
              Delete Root
            </button>
          )}
        </div>

        <div>{error && <p> Invalid key value</p>}</div>
      </div>
      <div className={styles.children_container}>
        <Entities
          node={node}
          deleteCurrentEntity={() => removeAllChildrenFromCurrentNode()}
        />
      </div>
    </div>
  );
}