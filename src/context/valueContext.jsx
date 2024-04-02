import React, { createContext, useState, useEffect } from "react";

export const valueContext = createContext(null);

const ValueContextProvider = ({ children }) => {
  //Test1
  const [currentValue, setCurrentValue] = useState(0);
  const [selectedValue, setSelectedvalue] = useState("__");
  const [tagsObj, setTagsObj] = useState(null);

  useEffect(() => {
    ////...fetchData...
    setTagsObj({ tags: [15, 63, 127, 191, 201, 239], full: 255 });
  }, []);

  //Test2
  const [list, setList] = useState(null);

  useEffect(() => {
    //...fetchData...
    setList([""]);
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
