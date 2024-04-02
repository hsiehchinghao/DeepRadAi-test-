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
    setList([
      { id: "001", title: "嗯嗯", isUpdate: false },
      { id: "002", title: "呵呵", isUpdate: false },
      { id: "003", title: "去洗澡", isUpdate: false },
    ]);
  }, []);

  const value = {
    currentValue,
    setCurrentValue,
    selectedValue,
    setSelectedvalue,
    tagsObj,
    list,
    setList,
  };
  return (
    <valueContext.Provider value={value}>{children}</valueContext.Provider>
  );
};

export default ValueContextProvider;
