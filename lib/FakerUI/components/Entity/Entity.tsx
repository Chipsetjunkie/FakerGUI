import {
  ObjectEntityType,
  EntityStateType,
  DefaultOptionKeys,
} from "./Entity.type";
import { useEffect, useState } from "react";
import { fakerDE as faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import EntityDropdowns from "./EntityDropdown/EntityDropdowns";
import EntryChildren from "./EntityChildren/EntryChildren";
import { retrieveKeys, sanitizePropertyKeys } from "../../utils/helpers";
import { KeyNode } from "../../dataStore/nodeTree";

export default function ObjectEntity({
  node,
  deleteChildNode,
  isParentRoot,
}: Readonly<ObjectEntityType>) {
  const [state, setState] = useState<EntityStateType>({
    propertyLabel: node.value,
    isExpressionComplete: false,
    dropdowns: [],
    childNodes: node.children,
  });
  const hasNoChildren = !state.childNodes.length;

  useEffect(() => {
    node.expression.length
      ? intialiseWithExistingDropdowns()
      : initialiseDropdowns();
  }, [node]);

  function intialiseWithExistingDropdowns() {
    const dropdowns: EntityStateType["dropdowns"] = [];
    let objectRef = faker;
    let expressionErrors = node.error.slice(1)

    let expressionIndex = 0
    while (expressionErrors) {
      const keys = sanitizePropertyKeys(objectRef);

      dropdowns.push({ id: uuidv4(), selected: expressionErrors[0] ? "N/A" : node.expression[expressionIndex], options: keys });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      objectRef = objectRef[node.expression[expressionIndex]];
      expressionIndex++

      // injecting n+1 dropdown hence checking after insertion
      if (expressionErrors[0]) break

      expressionErrors = expressionErrors.slice(1)
    }

    setState((prev) => ({
      ...prev,
      propertyLabel: node.value,
      dropdowns,
    }));
  }

  function initialiseDropdowns() {
    const keys = sanitizePropertyKeys(faker);
    setState((prev) => ({
      ...prev,
      propertyLabel: node.value,
      dropdowns: [{ id: uuidv4(), selected: "N/A", options: keys }],
    }));
  }

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
      isExpressionComplete: false
    }));
  }

  function removeAllChildrenFromCurrentNode() {
    node.children = [];
    setState((prev) => ({
      ...prev,
      childNodes: node.children,
    }));
  }


  return hasNoChildren ? (
    <EntityDropdowns
      node={node}
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
