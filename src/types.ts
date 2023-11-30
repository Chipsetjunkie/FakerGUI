
import { DEFAULT_OPTIONS } from "./utils/constants";

interface ReactiveDropdownOptionTypeState {
    selected: string;
    options: string[];
    id: string;
}

export type EntityStateType = {
    propertyLabel: string;
    isExpressionComplete: boolean;
    dropdowns: ReactiveDropdownOptionTypeState[]
    childNodes: KeyNodeType[]
};

export interface ReactiveDropdownProps {
    node: KeyNodeType
}


export interface EntityDropdownProps {
    dropdowns: ReactiveDropdownOptionTypeState[]
    handleNestedClick: () => void;
    handlePropertyLabelChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    propertyLabel: string
    isExpressionComplete: boolean;
    handleOptionSelect: (e: DefaultOptionKeys, f: string) => void
    deleteCurrentNodeFromParent: () => void
    isImmediateRootChild: boolean
}

export interface EntryChildrenProps {
    node: KeyNodeType;
    handlePropertyLabelChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    propertyLabel: string;
    isImmediateRootChild: boolean;
    deleteCurrentNodeFromParent: () => void
    removeAllChildrenFromCurrentNode: () => void
}


export type DefaultOptionKeys = keyof typeof DEFAULT_OPTIONS;


export interface ObjectEntityType {
    addEntry: () => void;
    deleteChildNode: (e: KeyNodeType) => void;
    node: KeyNodeType;
    isParentRoot: boolean;
}


export interface ObjectEntriesType {
    node: KeyNodeType;
    deleteCurrentEntity?: (e: KeyNodeType) => void;
    _depth?: number;
}

export interface ObjectEntriesStateType {
    data: KeyNodeType[];
}


export interface KeyNodeType {
    value: string;
    expression: string[]
    children: KeyNodeType[]
    parent: KeyNodeType | null
    id: string
}
