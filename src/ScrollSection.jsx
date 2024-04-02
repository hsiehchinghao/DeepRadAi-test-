import React, { useEffect, useRef, useContext, useState } from "react";
import { valueContext } from "./context/valueContext";
import useSliderServices from "./useSliderServices";
import styled from "styled-components";

const ScrollSection = () => {
  const scrollBarRef = useRef(null);
  const sliderRef = useRef(null);
  //context
  const {
    currentValue,
    setCurrentValue,
    selectedValue,
    setSelectedvalue,
    tagsObj,
  } = useContext(valueContext);

  //customer hook
  const [
    getLatestSliderPos,
    showLabel,
    displayLabel,
    clckToPos,
    isDrag,
    setIsDrag,
    handleDragSlider,
    handleLeaveSlider,
    handleSlider,
  ] = useSliderServices(scrollBarRef, sliderRef);

  useEffect(() => {
    //同步currentValue及slider位置一致
    getLatestSliderPos(currentValue, scrollBarRef, sliderRef);

    //確認需要顯示的標籤
    showLabel(currentValue);

    if (displayLabel && displayLabel.length > 1) {
    }

    //設定點擊滑動
    const handleUpdatePosition = (e) => {
      clckToPos(e, scrollBarRef, sliderRef, isDrag);
    };
    if (scrollBarRef && sliderRef) {
      scrollBarRef.current.addEventListener("click", handleUpdatePosition);
      sliderRef.current.addEventListener("mousedown", handleDragSlider);
    }

    //拖拉滑動
    const handleMouseMove = (e) => {
      if (isDrag) {
        handleSlider(e, scrollBarRef, sliderRef);
      }
    };

    //掛事件監聽
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleLeaveSlider);

    //cleanup function
    return () => {
      scrollBarRef.current.removeEventListener("click", handleUpdatePosition);
      sliderRef.current.removeEventListener("mousedown", handleDragSlider);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleLeaveSlider);
    };
  }, [tagsObj, isDrag, currentValue]);

  return (
    <div
      className={isDrag ? "scroll-bar active" : "scroll-bar"}
      ref={scrollBarRef}
    >
      <span className="scroll-section__slider" ref={sliderRef}></span>
      {tagsObj &&
        tagsObj.tags.map((tag) => (
          <StyledTag key={tag} top={((tag * 100) / tagsObj.full).toFixed(0)}>
            <StyledLabel
              onClick={() => {
                setCurrentValue(tag);
                setSelectedvalue(tag);
              }}
              displaylabel={displayLabel}
              tag={tag}
            >
              {tag}
            </StyledLabel>
          </StyledTag>
        ))}
    </div>
  );
};

export default ScrollSection;

//styled-components
//Tags
const StyledTag = styled.span`
  width: 100%;
  height: 1.5px;
  background-color: #ddd;
  position: absolute;
  top: ${({ top }) => top}%;
`;
const StyledLabel = styled.div`
  display: ${({ displaylabel, tag }) => {
    console.log(tag);
    if (displaylabel.includes(tag)) {
      return "block";
    } else {
      return "none";
    }
  }};
  width: 40px;
  line-height: 30px;
  background-color: #444442;
  text-align: center;
  color: #fff;
  position: absolute;
  left: ${({ displaylabel, tag }) => {
    if (displaylabel.indexOf(tag) == 1) {
      return "-160";
    } else {
      return "-80";
    }
  }}%;
  top: -15px;
  border-radius: 5px;
`;
