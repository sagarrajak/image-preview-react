import React, { useEffect, useState } from "react";
import style from "./imagePreview.module.css";

function ImagePreview(props) {
  const { galleryImages } = props;
  const [slideNumber, setSlideNumber] = useState(0);
  const [rotaion, setRotation] = useState(0);
  const [scale, setScale] = useState(1);


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
      image.style.height = 'auto'
    }

  }, [rotaion]);


  const onClickRotate = () => {
    let newRotation = rotaion + 90;
    if (newRotation >= 360) {
      newRotation = 0;
    }
    setRotation(newRotation);
  };
  return (
    <div className={style.imageContainer}>
      <div className={style.imgHeader}>
        <div onClick={onClickRotate}>rotate</div>
        <div onClick={updateScalePlus}>Scale + </div>
        <div onClick={updateScaleMinus}>Scale - </div>
        <select name="size"  onChange={(evt) => setScale(+(evt.target.value/100))}>
          <option>50</option>
          <option>100</option>
          <option>200</option>
          <option>300</option>
        </select>
      </div>
      
      <div className={style.imageCarousel} id="image-container" style={{ transform: `rotate(${rotaion}deg) scale(${scale})` }}>
          <img
            id="image"
            className={style.imageCarouselImage}
            src={galleryImages[slideNumber].img}
            alt=""
          />
        </div>
    
      <div className={style.left} onClick={prevSlide}>
        left
      </div>
      <div className={style.right} onClick={nextSlide}>
        right
      </div>
      <div className={style.bottomAction}>header</div>
    </div>
  );
}

export default ImagePreview;
