import { DefaultOptionKeys, EntityDropdownProps } from "../Entity.type";
import { DEFAULT_OPTIONS } from "../../../utils/constants";
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
}: Readonly<EntityDropdownProps>) {
  return (
    <div className={styles.main_container}>
      <button className={styles.add_button} onClick={handleNestedClick}>
        {" "}
        {"{"}{" "}
      </button>
      <input
        className={styles.input}
        onChange={handlePropertyLabelChange}
        value={propertyLabel}
      />
      <div className={styles.adjoin_line} />
      <div
        className={`${styles.dropdown_container} ${
          isExpressionComplete ? styles.valid : ""
        }`}
      >
        {dropdowns.map((item, index) => {
          return (
            <div key={item.id} className={styles.dropdown_item}>
              <div className={styles.select_container}>
                <select
                  className={styles.select}
                  defaultValue="N/A"
                  onChange={(e) =>
                    handleOptionSelect(
                      index as DefaultOptionKeys,
                      e.target.value
                    )
                  }
                >
                  <option disabled className={styles.hidden} value="N/A">
                    {DEFAULT_OPTIONS[index as DefaultOptionKeys]}
                  </option>
                  {item.options.map((optionItem) => {
                    return (
                      optionItem !== "faker" && (
                        <option
                          key={`${item.id}-${optionItem}`}
                          value={optionItem}
                        >
                          {optionItem}
                        </option>
                      )
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
  );
}
