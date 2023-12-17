import { v4 as uuidv4 } from 'uuid';
import { KeyNodeType } from '@lib/FakerUI/types';

export class KeyNode implements KeyNodeType {
    value: string
    expression: string[]
    children: KeyNodeType[]
    parent: null | KeyNodeType
    id: string
    error: [boolean, boolean, boolean]

    constructor(value: string) {
        this.value = value
        this.expression = []
        this.children = []
        //Not in use currently
        this.parent = null
        //-----------------
        this.error = [false, false, false]
        this.id = uuidv4()
    }
}


const rootNode = new KeyNode("root")
rootNode.children.push(new KeyNode(""))

export default rootNode