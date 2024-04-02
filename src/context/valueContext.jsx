import React, { createContext, useState, useEffect } from "react";

export const valueContext = createContext(null);

const ValueContextProvider = ({ children }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [selectedValue, setSelectedvalue] = useState("__");
  const [tagsObj, setTagsObj] = useState(null);

  useEffect(() => {
    //載入tags數據
    setTagsObj({ tags: [15, 63, 127, 191, 201, 239], full: 255 });
  }, []);
  const value = {
    currentValue,
    setCurrentValue,
    selectedValue,
    setSelectedvalue,
    tagsObj,
  };
  return (
    <valueContext.Provider value={value}>{children}</valueContext.Provider>
  );
};

export default ValueContextProvider;
