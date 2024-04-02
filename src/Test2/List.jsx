import React, { useState, useEffect, useContext, useRef } from "react";
import { valueContext } from "../context/valueContext";

const List = () => {
  const { list, setList } = useContext(valueContext);
  const [updatingObj, setUpdatingObj] = useState(null);
  const [updating, setUpdating] = useState("");
  const [input, setInput] = useState("");
  const [ifGetInput, setIfGetInput] = useState(true);
  const [ifUpdate, setIfUpdate] = useState(true);
  const [ifCancel, setIfCancel] = useState(true);
  const inputRef = useRef(null);
  const updateBtnRef = useRef(null);
  const cancelBtnRef = useRef(null);

  //點擊列表選項
  const handleUpdate = (e, item) => {
    setUpdating(item.title);
    setUpdatingObj(item);
    inputRef.current.focus();
    setIfGetInput(false);
    setIfCancel(false);
    const updatedList = list.map((data) => {
      if (data.id == item.id) {
        data.isUpdate = true;
      } else {
        data.isUpdate = false;
      }
      return data;
    });
    setList(updatedList);
  };

  //點擊取消
  const handleCancel = () => {
    setUpdating("");
    setIfCancel(true);
    setIfUpdate(true);
    setIfGetInput(true);
    setUpdatingObj(null);
    const updatedList = list.map((data) => {
      data.isUpdate = false;
      return data;
    });
    setList(updatedList);
  };

  //input輸入
  const handleInput = (e, item) => {
    setUpdating(e.target.value);
    const ifInclude = list.some((item) => {
      return item.title == e.target.value;
    });
    if (e.target.value !== "" && !ifInclude) {
      setIfUpdate(false);
    } else {
      setIfUpdate(true);
    }
  };

  //提交
  const handleSubmit = () => {
    const updatedList = list.map((data) => {
      if (data.id === updatingObj.id) {
        data.title = updating;
        data.isUpdate = false;
      }
      return data;
    });
    setList(updatedList);
    handleCancel(); // 完成修改后重置
  };

  return (
    <>
      <h2 className="list-section__title">Line貼圖出現之前最常用的三句話</h2>
      <ol className="list-section__list">
        {list &&
          list.map((item, index) => (
            <li
              key={index}
              onClick={(e) => handleUpdate(e, item)}
              className={item.isUpdate ? "list-section__list__updating" : ""}
            >
              {item.title}
            </li>
          ))}
      </ol>
      <div className="update-form">
        <input
          type="text"
          disabled={ifGetInput}
          ref={inputRef}
          value={updating}
          onChange={handleInput}
        />
        <button ref={updateBtnRef} onClick={handleSubmit} disabled={ifUpdate}>
          修改
        </button>
        <button ref={cancelBtnRef} onClick={handleCancel} disabled={ifCancel}>
          取消
        </button>
      </div>
    </>
  );
};

export default List;
