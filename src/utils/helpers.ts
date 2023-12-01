import { KeyNode } from "../dataStore/nodeTree"
import { fakerDE as faker } from "@faker-js/faker";

//TODO: Figure out type situation
export function generateSchema(node: KeyNode) {
    if (node.expression.length > 0) {
        const ans = retrieveNestedObject(node.expression)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        return ans?.call(this) || "N/A"
    } else if (node.children.length > 0) {
        const schema = { [node.value]: {} }
        for (const childNode of node.children) {
            schema[node.value] = { ...schema[node.value], [childNode.value]: generateSchema(childNode) }
        }
        return schema[node.value]
    } else {
        return {}
    }
}


export function isValidSchema(node: KeyNode) {
    let isValid = true

    function checkValidaityAndUpdateFlag(node: KeyNode) {
        const hasError = node.children.length !== 2 || node.value.length === 0
        if (hasError && isValid) {
            isValid = false
        }
        node.error = [node.value.length === 0, node.children.length < 1, node.children.length < 2]
        for (const childNode of node.children) {
            checkValidaityAndUpdateFlag(childNode)
        }
    }
    checkValidaityAndUpdateFlag(node)
    console.log(isValid)
    return isValid
}

export function retrieveNestedObject(nestedKeys: string[]) {
    let nestedObject = faker;
    for (const element of nestedKeys) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        nestedObject = nestedObject[element];
    }
    return nestedObject
}

export function retrieveKeys(nestedKeys: string[]) {
    return Object.keys(retrieveNestedObject(nestedKeys))
}
