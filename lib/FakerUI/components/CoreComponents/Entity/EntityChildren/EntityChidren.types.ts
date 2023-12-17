import { KeyNodeType } from "@lib/FakerUI/types";

export interface EntryChildrenProps {
    node: KeyNodeType;
    handlePropertyLabelChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    propertyLabel: string;
    isImmediateRootChild: boolean;
    deleteCurrentNodeFromParent: () => void
    removeAllChildrenFromCurrentNode: () => void
}

