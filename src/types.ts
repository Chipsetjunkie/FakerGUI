
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
    handeNodeDelete: () => void
}

export interface EntryChildrenProps {
    node: KeyNodeType;
    handlePropertyLabelChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    propertyLabel: string;
    deleteRoot: () => void
}


export type DefaultOptionKeys = keyof typeof DEFAULT_OPTIONS;


export interface ObjectEntityType {
    addEntry: () => void;
    deleteEntry: () => void;
    node: KeyNodeType;
    _depth?: number;
}


export interface ObjectEntriesType {
    node: KeyNodeType;
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
