export const DEFAULT_OPTIONS = {
    0: "- pick category -",
    1: "- pick sub-category -",
};


export const OPTIONS_INDEX_MAPPING = {
    0: { title: "hasInvalidCategory" as const, message: "invalid category" },
    1: { title: "hasInvalidSubCategory" as const, message: "invalid sub-category" }
}

export const MINIMUM_SCREEN_THRESHOLD = 768