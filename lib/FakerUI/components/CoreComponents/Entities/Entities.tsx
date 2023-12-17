import { useEffect, useState } from "react";
import {
  ObjectEntriesStateType,
  ObjectEntriesType,
} from "./Entities.type";
import { KeyNodeType } from "@lib/FakerUI/types";
import ObjectEntity from "../Entity/Entity";
import { KeyNode } from "@lib/FakerUI/dataStore/nodeTree";
import styles from "./Entities.module.scss"

export default function ObjectEntities({
  node,
  deleteCurrentEntity = () => { },
}: Readonly<ObjectEntriesType>) {
  const [entries, setEntries] = useState<ObjectEntriesStateType>({
    data: [],
  });

  useEffect(() => {
    setEntries({
      data: node.children,
    });
  }, [node]);

  function addEntry() {
    const childNode = new KeyNode("");
    childNode.parent = node;
    node.children.push(childNode);
    setEntries({
      data: node.children,
    });
  }

  function deleteEntry(ChildNode: KeyNodeType) {
    node.children = node.children.filter((item:unknown) => item !== ChildNode);
    if (node.children.length === 0) {
      deleteCurrentEntity(node);
    }
    setEntries({
      data: node.children,
    });
  }

  return (
    <div>
      {entries.data.map((item, index) => (
        <ObjectEntity
          deleteChildNode={deleteEntry}
          key={item.id}
          isParentRoot={node.value === "root" && index === 0}
          node={item}
          addEntry={addEntry}
        />
      ))}
      <button className={styles.add_button} onClick={addEntry}> Add new key </button>
    </div>
  );
}
