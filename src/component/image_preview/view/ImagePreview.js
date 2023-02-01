import React, { useEffect, useState } from "react";
import style from "./imagePreview.module.css";
import { useMouseDrag } from './useMouseDrag';

function ImagePreview(props) {
  const { galleryImages } = props;
  const [slideNumber, setSlideNumber] = useState(0);
  const [rotaion, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [isInGrabState, setIsInGrabState] = useState(false);
  const mainContainer = document.getElementById('main-container');

  useMouseDrag({mainContainer, isInGrabState});

  const prevSlide = () => {
    slideNumber === 0
      ? setSlideNumber(galleryImages.length - 1)
      : setSlideNumber(slideNumber - 1);
  };

  // Next Image
  const nextSlide = () => {
    slideNumber + 1 === galleryImages.length
      ? setSlideNumber(0)
      : setSlideNumber(slideNumber + 1);
  };

  const updateScalePlus = () => {
    if(scale+0.05 >= 3) return;
    setScale(scale+0.05);
  } 

  const updateScaleMinus = () => {
    if(scale - 0.05 < 0.5) return;
    setScale(scale - 0.05);
  }


  useEffect(() => {
    const container = document.getElementById("image-container");
    const image = document.getElementById("image");
    const iWidth = image.width;
    const iHeight = image.height; 
    const cWidth = container.clientWidth;
    const cHeight = container.clientHeight;
    
    if (rotaion % 180 === 0) {
      image.style.width = '100%';
      image.style.height = 'auto'
    }
    else {
      image.style.width = iWidth / (cWidth / cHeight) + 'px';
      image.style.height = '100%';
    }

  }, [rotaion]);

  const onClickRotate = () => {
    let newRotation = rotaion + 90;
    if (newRotation >= 360) {
      newRotation = 0;
    }
    setRotation(newRotation);
  };

  const grab = () => {
    setIsInGrabState(true);
  };

  const unGrab = () => {
    setIsInGrabState(false);
  }

  const scaleAtParticularRatio = (value) => {
    setScale(value)
  };

  return (
    <div className={style.imageContainer} id="main-container">
      <div className={style.imgHeader}>
        <div onClick={onClickRotate}>
          <i class="fa-solid fa-rotate-right"></i>
        </div>
        <div onClick={updateScalePlus}>
          <i class="fa-solid fa-magnifying-glass-plus"></i> </div>
        <div onClick={updateScaleMinus}>
          <i class="fa-solid fa-magnifying-glass-minus"></i>
        </div>
        {!isInGrabState && <div onClick={grab}>grab</div> }
        {isInGrabState && <div onClick={unGrab}>un grab</div>}
        <select name="size"  onChange={(evt) => scaleAtParticularRatio(evt.target.value/100)}>
          <option>50</option>
          <option>100</option>
          <option>200</option>
          <option>300</option>
        </select>
      </div>
      
      <div className={style.imageCarousel} id="image-container"
        style={{
          cursor: isInGrabState ? 'grab' : 'default',
          transform: `rotate(${rotaion}deg) scale(${scale})`,
          transformOrigin: rotaion <= 0 ? 'top left' : '' 
        }}
      >
        <img
          id="image"
          className={style.imageCarouselImage}
          src={galleryImages[slideNumber].img}
          alt=""
        />
      </div>
    
      <div className={style.left} onClick={prevSlide}>
        <i class="fa-solid fa-chevron-left fa-2xl"></i>
      </div>
      <div className={style.right} onClick={nextSlide}>
        <i class="fa-solid fa-chevron-right fa-2xl"></i>
      </div>
      {/* <div className={style.bottomAction}>header</div> */}
    </div>
  );
}

export default ImagePreview;
