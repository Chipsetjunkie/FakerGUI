import { KeyNodeType } from "../../types";

export interface ObjectEntriesType {
    node: KeyNodeType;
    deleteCurrentEntity?: (e: KeyNodeType) => void;
    _depth?: number;
}

export interface ObjectEntriesStateType {
    data: KeyNodeType[];
}

