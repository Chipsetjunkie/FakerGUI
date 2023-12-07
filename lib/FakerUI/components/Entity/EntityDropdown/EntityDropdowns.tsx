import { useState, useEffect } from "react";
import { DefaultOptionKeys, EntityDropdownProps } from "../Entity.type";
import {
  DEFAULT_OPTIONS,
  OPTIONS_INDEX_MAPPING,
} from "../../../utils/constants";
import styles from "./EntityDropdown.module.scss";

export default function EntityDropdowns({
  handleOptionSelect,
  isExpressionComplete,
  dropdowns,
  handleNestedClick,
  propertyLabel,
  handlePropertyLabelChange,
  deleteCurrentNodeFromParent,
  isImmediateRootChild,
  node,
}: Readonly<EntityDropdownProps>) {
  const [errors, setErrors] = useState({
    hasInValidValue: false,
    hasInvalidCategory: false,
    hasInvalidSubCategory: false,
  });

  useEffect(() => {
    setErrors({
      hasInValidValue: node.error[0],
      hasInvalidCategory: node.error[1],
      hasInvalidSubCategory: node.error[2],
    });
  }, [node.error]);

  function updateOption(k: DefaultOptionKeys, v: string) {
    // updating main schema store
    node.error[k + 1] = false;

    setErrors((prev) => ({
      ...prev,
      [OPTIONS_INDEX_MAPPING[k].title]: false,
    }));
    handleOptionSelect(k, v);
  }

  function updateKeyValue(e: React.ChangeEvent<HTMLInputElement>) {
    // updating main schema store
    node.error[0] = false;

    setErrors((prev) => ({
      ...prev,
      hasInValidValue: false,
    }));
    handlePropertyLabelChange(e);
  }

  return (
    <div className={styles.root_container}>
      <div className={styles.main_container}>
        {/* TODO: Troubleshoot style add_button */}
        <div>
          <button
            className={styles.add_nested_button}
            onClick={handleNestedClick}
          >
            {" "}
            {"{"}{" "}
          </button>
        </div>
        <input
          placeholder="key value"
          className={styles.input}
          onChange={updateKeyValue}
          value={propertyLabel}
        />
        <div>
          <div className={styles.adjoin_line} />
        </div>
        <div
          className={`${styles.dropdown_container} ${
            isExpressionComplete ? styles.valid : ""
          }`}
        >
          {dropdowns.map((item, index) => {
            const errorObject = OPTIONS_INDEX_MAPPING[index as 0 | 1];
            return (
              <div key={item.id} className={styles.dropdown_item}>
                <div className={styles.select_container}>
                  <select
                    className={`${styles.select_item} ${
                      errors[errorObject.title] ? styles.invalid : ""
                    }`}
                    defaultValue={item.selected}
                    onChange={(e) =>
                      updateOption(index as DefaultOptionKeys, e.target.value)
                    }
                  >
                    <option disabled className={styles.hidden} value="N/A">
                      {DEFAULT_OPTIONS[index as DefaultOptionKeys]}
                    </option>
                    {item.options.map((optionItem) => {
                      return (
                        <option
                          key={`${item.id}-${optionItem}`}
                          value={optionItem}
                        >
                          {optionItem}
                        </option>
                      );
                    })}
                  </select>
                  <div className={styles.select_arrow} />
                </div>
              </div>
            );
          })}
        </div>
        {!isImmediateRootChild && (
          <button
            className={styles.delete_button}
            onClick={deleteCurrentNodeFromParent}
          >
            Delete node
          </button>
        )}
      </div>
      <div>
        {errors.hasInValidValue && (
          <p className={styles.invalid_text}>
            Invalid key value!
          </p>
        )}
      </div>
    </div>
  );
}
