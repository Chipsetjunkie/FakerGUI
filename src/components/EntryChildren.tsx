import React from "react";
import rootNode from "../dataStore/nodeTree";
import Entities from "./Entities";
import { EntryChildrenProps } from "../types";

export default function EntryChildren({
  node,
  handlePropertyLabelChange,
  propertyLabel,
  deleteRoot,
}: Readonly<EntryChildrenProps>) {
  return (
    <div>
      <button
        onClick={() => {
          console.log(rootNode);
        }}
      >
        {" "}
        +{" "}
      </button>
      <input onChange={handlePropertyLabelChange} value={propertyLabel} />
      <div style={{ marginLeft: "10px" }}>
        <Entities node={node} />
      </div>
      <button onClick={deleteRoot}>X</button>
    </div>
  );
}
