import { KeyNode } from "./dataStore/nodeTree";


export interface KeyNodeType {
    value: string;
    expression: string[]
    children: KeyNodeType[]
    parent: KeyNodeType | null
    error: [boolean, boolean, boolean]
    id: string
}


export interface AppState{
    count: number,
    // flag for force re-rendering
    triggerLoad: boolean,
    data: Record<string, unknown>[],
    rootNode: KeyNode,
    hasError: boolean,
}