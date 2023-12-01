

export interface KeyNodeType {
    value: string;
    expression: string[]
    children: KeyNodeType[]
    parent: KeyNodeType | null
    error: [boolean, boolean, boolean]
    id: string
}
