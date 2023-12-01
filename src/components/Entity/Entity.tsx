import {
  ObjectEntityType,
  EntityStateType,
  DefaultOptionKeys,
} from "./Entity.type";
import { useEffect, useState } from "react";
import { fakerDE as faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import { KeyNode } from "../../dataStore/nodeTree";

import EntityDropdowns from "./EntityDropdown/EntityDropdowns";
import EntryChildren from "./EntityChildren/EntryChildren";
import { retrieveKeys } from "../../utils/helpers";

export default function ObjectEntity({
  node,
  deleteChildNode,
  isParentRoot,
}: Readonly<ObjectEntityType>) {
  const [state, setState] = useState<EntityStateType>({
    propertyLabel: "",
    isExpressionComplete: false,
    dropdowns: [],
    childNodes: [],
  });

  useEffect(() => {
    const keys = Object.keys(faker).filter((item) => {
      return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        Object.getPrototypeOf(faker[item]) != Object.prototype &&
        !item.startsWith("_")
      );
    });

    setState((prev) => ({
      ...prev,
      dropdowns: [{ id: uuidv4(), selected: "N/A", options: keys }],
    }));
  }, []);

  function handleOptionSelect(k: DefaultOptionKeys, value: string) {
    if (state.dropdowns[k].selected == value) return;

    const updatedDropdowns = state.dropdowns.slice(0, +k + 1);
    updatedDropdowns[updatedDropdowns.length - 1].selected = value;

    const expressionKeyMap = updatedDropdowns.map((item) => item.selected);
    const keysMap = retrieveKeys(expressionKeyMap);

    node.expression = expressionKeyMap;

    if (keysMap.length) {
      updatedDropdowns.push({
        id: uuidv4(),
        selected: "N/A",
        options: keysMap,
      });
    }

    setState((prev) => ({
      ...prev,
      isExpressionComplete: !keysMap.length,
      dropdowns: updatedDropdowns,
    }));
  }

  function handlePropertyLabelChange(e: React.ChangeEvent<HTMLInputElement>) {
    node.value = e.target.value;
    setState((prev) => ({
      ...prev,
      propertyLabel: e.target.value,
    }));
  }

  function handleNestedCreation() {
    const childNode = new KeyNode("");
    childNode.parent = node;

    node.expression = [];
    node.children.push(childNode);
    setState((prev) => ({
      ...prev,
      dropdowns: [prev.dropdowns[0]],
      childNodes: node.children,
    }));
  }

  function removeAllChildrenFromCurrentNode() {
    node.children = [];
    setState((prev) => ({
      ...prev,
      childNodes: node.children,
    }));
  }

  console.log(node.error);

  const hasNoChildren = !state.childNodes.length;
  return hasNoChildren ? (
    <EntityDropdowns
      dropdowns={state.dropdowns}
      isExpressionComplete={state.isExpressionComplete}
      handleNestedClick={handleNestedCreation}
      handleOptionSelect={handleOptionSelect}
      propertyLabel={state.propertyLabel}
      handlePropertyLabelChange={handlePropertyLabelChange}
      isImmediateRootChild={isParentRoot}
      deleteCurrentNodeFromParent={() => deleteChildNode(node)}
    />
  ) : (
    <EntryChildren
      deleteCurrentNodeFromParent={() => deleteChildNode(node)}
      removeAllChildrenFromCurrentNode={removeAllChildrenFromCurrentNode}
      node={node}
      propertyLabel={state.propertyLabel}
      isImmediateRootChild={isParentRoot}
      handlePropertyLabelChange={handlePropertyLabelChange}
    />
  );
}
