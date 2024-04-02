import React, { useContext } from "react";
import { valueContext } from "./context/valueContext";

const ValueData = () => {
  const { currentValue, selectedValue } = useContext(valueContext);
  return (
    <div className="value-data-section">
      <div className="value-data-section__current-value">
        Current value:{currentValue}
      </div>
      <div className="value-data-section__selected-value">
        Selected value:{selectedValue}
      </div>
    </div>
  );
};

export default ValueData;
