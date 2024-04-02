import React, { useEffect, useContext, useState } from "react";
import { valueContext } from "./context/valueContext";

const useSliderServices = (scrollBarRef, sliderRef) => {
  //取得區域狀態及function
  const { currentValue, setCurrentValue, tagsObj } = useContext(valueContext);
  //滑動邏輯
  const [isDrag, setIsDrag] = useState(false);
  const [displayLabel, setDisplayLabel] = useState([]);

  //計算位置轉成%
  const currentPos = (e, scrollBarRef, sliderRef) => {
    let position = (
      ((e.clientY - scrollBarRef.current.getBoundingClientRect().top) /
        scrollBarRef.current.offsetHeight) *
      100
    ).toFixed(0);
    if (position <= 0) {
      position = 0;
      sliderRef.current.style.top = `0%`;
      setCurrentValue((prev) => 0);
    } else if (position >= 100) {
      position = 100;
      sliderRef.current.style.top = `100%`;
      setCurrentValue((prev) => 255);
    } else {
      sliderRef.current.style.top = `${position}%`;
      setCurrentValue((prev) => ((position * 255) / 100).toFixed(0));
    }
    return position;
  };

  //slider與value同步位置
  const getLatestSliderPos = (currentValue, scrollBarRef, sliderRef) => {
    const data = ((currentValue * 100) / 255).toFixed(0);
    sliderRef.current.style.top = `${data}%`;
    console.log(data);
  };

  //顯示標籤
  const showLabel = (currentValue) => {
    if (currentValue) {
      const displayTags = tagsObj.tags.map((tag) => {
        if (currentValue - tag < 10 && currentValue - tag > -10) {
          return tag;
        }
      });
      console.log(displayTags);
    }
  };

  //點擊跳轉
  const clckToPos = (e, scrollBarRef, sliderRef, isDrag, currentValue) => {
    //設定點擊滑動 / 改變當前數值
    if (!isDrag) {
      sliderRef.current.style.transition = "0.3s";
    }
    currentPos(e, scrollBarRef, sliderRef);
  };

  //滑動邏輯
  //mousedown
  const handleDragSlider = () => {
    setIsDrag(true);
    if (!isDrag && sliderRef) {
      sliderRef.current.style.transition = "0.3s";
    }
  };
  //mouseup
  const handleLeaveSlider = () => {
    setIsDrag(false);
  };
  //drag slider
  const handleSlider = (e, scrollBarRef, sliderRef, isDrag) => {
    sliderRef.current.style.transition = "none";
    const updatePos = currentPos(e, scrollBarRef, sliderRef);
    console.log(updatePos);
    sliderRef.current.style.top = `${updatePos}%`;
  };

  return [
    getLatestSliderPos,
    showLabel,
    clckToPos,
    isDrag,
    setIsDrag,
    handleDragSlider,
    handleLeaveSlider,
    handleSlider,
  ];
};

export default useSliderServices;
