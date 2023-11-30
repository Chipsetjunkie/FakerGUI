import React from "react";
import rootNode from "../dataStore/nodeTree";
import Entities from "./Entities";
import { EntryChildrenProps } from "../types";

export default function EntryChildren({
  node,
  handlePropertyLabelChange,
  propertyLabel,
  deleteCurrentNodeFromParent,
  isImmediateRootChild,
  removeAllChildrenFromCurrentNode
}: Readonly<EntryChildrenProps>) {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <button
          onClick={() => {
            console.log(rootNode);
          }}
        >
          {" "}
          +{" "}
        </button>
        <input onChange={handlePropertyLabelChange} value={propertyLabel} />
        {!isImmediateRootChild && (
          <button onClick={deleteCurrentNodeFromParent}>X</button>
        )}
      </div>
      <div style={{ marginLeft: "10px" }}>
        <Entities
          node={node}
          deleteCurrentEntity={() => removeAllChildrenFromCurrentNode()}
        />
      </div>
    </div>
  );
}
