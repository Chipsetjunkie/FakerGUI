import { useEffect, useState } from "react";

import { EntryChildrenProps } from "./EntityChidren.types";
import styles from "./EntryChildren.module.scss";
import ObjectEntities from "../../Entities";

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
    node.error[0] = false;

    setError(false);
    handlePropertyLabelChange(e);
  }

  return (
    <div className={styles.main_container}>
      <div className={styles.nested_children_input_container}>
        <div className={styles.root_container}>
          <div>
            <button
              className={styles.add_nested_button}
              onClick={removeAllChildrenFromCurrentNode}
            >
              {"•"}
            </button>
          </div>
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

        <div>{error && <p className={styles.invalid_text}> Invalid key value</p>}</div>
      </div>
      <div className={styles.children_container}>
        <ObjectEntities
          node={node}
          deleteCurrentEntity={() => removeAllChildrenFromCurrentNode()}
        />
      </div>
    </div>
  );
}
