import { useEffect, useState } from "react";
import { ObjectEntriesStateType, ObjectEntriesType } from "../types";
import ObjectEntity from "./Entity";
import { KeyNode } from "../dataStore/nodeTree";

export default function Entities({ node, _depth = 1 }: ObjectEntriesType) {
  const [entries, setEntries] = useState<ObjectEntriesStateType>({
    data: [],
  });

  useEffect(() => {
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

  function deleteEntry() {}

  return (
    <div>
      {entries.data.map((item) => (
        <ObjectEntity
          key={item.id}
          node={item}
          addEntry={addEntry}
          deleteEntry={deleteEntry}
          _depth={_depth}
        />
      ))}
      <button onClick={addEntry}> Add </button>
    </div>
  );
}
