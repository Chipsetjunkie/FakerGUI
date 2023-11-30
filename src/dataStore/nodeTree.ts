import { v4 as uuidv4 } from 'uuid';
import { KeyNodeType } from '../types';

export class KeyNode implements KeyNodeType {
    value: string
    expression: string[]
    children: KeyNodeType[]
    parent: null | KeyNodeType
    id: string

    constructor(value: string) {
        this.value = value
        this.expression = []
        this.children = []
        this.parent = null
        this.id = uuidv4()
    }
}


const rootNode = new KeyNode("root")
rootNode.children.push(new KeyNode(""))

export default rootNode