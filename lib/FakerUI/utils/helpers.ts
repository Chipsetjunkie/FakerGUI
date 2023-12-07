import { KeyNode } from "../dataStore/nodeTree"
import { Faker, fakerDE as faker } from "@faker-js/faker";

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

export function isValidSchema(mainNode: KeyNode) {
    let isValid = true

    function checkValidityAndUpdateFlag(node: KeyNode) {
        node.error[0] = node.value.length === 0
        node.error[1] = node.children.length === 0 && node.expression.length < 1
        node.error[2] = node.children.length === 0 && node.expression.length < 2

        isValid = isValid && node.error.every(item => !item)
        for (const childNode of node.children) {
            checkValidityAndUpdateFlag(childNode)
        }
    }

    checkValidityAndUpdateFlag(mainNode)
    return { mainNode, isValid }
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

export function sanitizePropertyKeys(object: Faker) {
    return Object.keys(object).filter((item) => {
        return (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            Object.getPrototypeOf(object[item]) != Object.prototype &&
            !item.startsWith("_") &&
            item !== "faker" && item !== "helpers"
        );
    });
}


export function retrieveKeys(nestedKeys: string[]) {
    return sanitizePropertyKeys(retrieveNestedObject(nestedKeys))
}
