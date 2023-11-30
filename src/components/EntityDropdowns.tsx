import { DefaultOptionKeys, EntityDropdownProps } from "../types";
import { DEFAULT_OPTIONS } from "../utils/constants";

export default function EntityDropdowns({
  handleOptionSelect,
  isExpressionComplete,
  dropdowns,
  handleNestedClick,
  propertyLabel,
  handlePropertyLabelChange,
  handeNodeDelete,
}: Readonly<EntityDropdownProps>) {
  return (
    <div style={{ display: "flex" }}>
      <button onClick={handleNestedClick}> + </button>
      <input onChange={handlePropertyLabelChange} value={propertyLabel} />
      <p>:</p>
      {dropdowns.map((item, index) => {
        return (
          <div key={item.id} style={{ display: "flex" }}>
            {index > 0 && <span>.</span>}
            <select
              style={{
                border: isExpressionComplete ? "1px solid green" : "",
              }}
              defaultValue="N/A"
              onChange={(e) =>
                handleOptionSelect(index as DefaultOptionKeys, e.target.value)
              }
            >
              <option disabled style={{ display: "none" }} value="N/A">
                {DEFAULT_OPTIONS[index as DefaultOptionKeys]}
              </option>
              {item.options.map((optionItem) => {
                return (
                  optionItem !== "faker" && (
                    <option key={`${item.id}-${optionItem}`} value={optionItem}>
                      {optionItem}
                    </option>
                  )
                );
              })}
            </select>
          </div>
        );
      })}
      <button onClick={handeNodeDelete}> x</button>
    </div>
  );
}
