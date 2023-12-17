import { DEFAULT_OPTIONS } from "@lib/FakerUI/utils/constants";
import { KeyNodeType } from "@lib/FakerUI/types";


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


export interface EntityDropdownProps {
    node: KeyNodeType
    dropdowns: ReactiveDropdownOptionTypeState[]
    handleNestedClick: () => void;
    handlePropertyLabelChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    propertyLabel: string
    isExpressionComplete: boolean;
    handleOptionSelect: (e: DefaultOptionKeys, f: string) => void
    deleteCurrentNodeFromParent: () => void
    isImmediateRootChild: boolean
}


export type DefaultOptionKeys = keyof typeof DEFAULT_OPTIONS;


export interface ObjectEntityType {
    addEntry: () => void;
    deleteChildNode: (e: KeyNodeType) => void;
    node: KeyNodeType;
    isParentRoot: boolean;
}

