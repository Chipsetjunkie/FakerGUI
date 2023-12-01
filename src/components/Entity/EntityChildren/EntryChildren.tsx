import { useState } from "react";

import rootNode from "../../../dataStore/nodeTree";
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
  const [errors, setErrors] = useState({
    hasFilledValue: false,
    hasInteracted: false,
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    // setErrors({
    //   hasInteracted: true,
    //   hasFilledValue: e.target.value.length > 0,
    // });
    handlePropertyLabelChange(e);
  }

  return (
    <div className={styles.main_container}>
      <div>
        <div className={styles.root_container}>
          <button
            className={styles.add_button}
            onClick={() => {
              console.log(rootNode);
            }}
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

        <div>
          {errors.hasInteracted && !errors.hasFilledValue && (
            <p> Please provide key label</p>
          )}
        </div>
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
