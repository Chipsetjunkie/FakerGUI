import { useEffect, useState } from "react";
import {
  KeyNodeType,
  ObjectEntriesStateType,
  ObjectEntriesType,
} from "../types";
import ObjectEntity from "./Entity";
import { KeyNode } from "../dataStore/nodeTree";

export default function Entities({
  node,
  deleteCurrentEntity = () => {},
}: ObjectEntriesType) {
  const [entries, setEntries] = useState<ObjectEntriesStateType>({
    data: [],
  });

  useEffect(() => {
    console.log("Renderin");
    setEntries({
      data: node.children,
    });
  }, []);

  function addEntry() {
    const childNode = new KeyNode("");
    childNode.parent = node;
    node.children.push(childNode);
    setEntries({
      data: node.children,
    });
  }

  function deleteEntry(ChildNode: KeyNodeType) {
    node.children = node.children.filter((item) => item !== ChildNode);
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
      <button onClick={addEntry}> Add </button>
    </div>
  );
}
