import React, { useEffect, useState } from "react";
import style from "./imagePreview.module.css";
import { useMouseDrag } from './useMouseDrag';
import { Document, Page } from 'react-pdf';

function ImagePreview(props) {
  const { galleryImages } = props;
  const [slideNumber, setSlideNumber] = useState(0);
  const [rotaion, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [isInGrabState, setIsInGrabState] = useState(false);
  const [isImageRotationEnabled, setIsImageRotationEnabled] = useState(true);

  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  const [baseWidth, setBaseWidth] = useState();
  const [baseHeight, setBaseHeight] = useState();


  const mainContainer = document.getElementById('main-container');

  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useMouseDrag({mainContainer, isInGrabState});

  
  const setRotationBeforeSlide = React.useCallback((slideNumber) => {
    if (!galleryImages[slideNumber].img) { 
      setRotation(0);
      setIsImageRotationEnabled(false);
    } else {
      setIsImageRotationEnabled(true);
    }
  }, [galleryImages]);

  const prevSlide = () => {
    let currentIndex = null;
    currentIndex = slideNumber === 0
      ? galleryImages.length - 1
      : slideNumber - 1;
    setRotationBeforeSlide(currentIndex);
    setTimeout(() => {
      setSlideNumber(currentIndex);
    }, 100);
  };

  // Next Image
  const nextSlide = () => {
    let currentIndex = null;
    currentIndex = slideNumber + 1 === galleryImages.length
      ? 0
      : slideNumber + 1;
    setRotationBeforeSlide(currentIndex);
    setTimeout(() => {
      setSlideNumber(currentIndex);
    }, 100);
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
    if (scale > 1) {
        setIsInGrabState(true);
    } else {
        setIsInGrabState(false);
    }
  }, [scale]);

  useEffect(() => {
    const img = new Image();
    img.src = galleryImages[slideNumber].img;
    img.onload = function() {
      setBaseWidth(this.width*0.75);
      setBaseHeight(this.height*0.75);
    }
  }, [slideNumber, galleryImages]);

  useEffect(() => {
    if (rotaion%180 === 0) {
      setWidth(baseWidth*scale);
      setHeight(baseHeight*scale);
    } else {
      setHeight(baseWidth*scale);
      setWidth(baseHeight*scale);
    }
  }, [scale, rotaion, baseHeight, baseWidth]);

  const onClickRotate = () => {
    let newRotation = rotaion + 90;
    if (newRotation >= 360) {
      newRotation = 0;
    }
    setRotation(newRotation);
  };

  const scaleAtParticularRatio = (value) => {
    setScale(value)
  };

  return (
    <div className={style.imageContainer} >
      <div className={style.imgHeader}>
        {isImageRotationEnabled && <div onClick={onClickRotate}>
          <i className="fa-solid fa-rotate-right"></i>
        </div>}
        <div onClick={updateScalePlus}>
          <i className="fa-solid fa-magnifying-glass-plus"></i> </div>
        <div onClick={updateScaleMinus}>
          <i className="fa-solid fa-magnifying-glass-minus"></i>
        </div>
        <div>
          <select name="size"  onChange={(evt) => scaleAtParticularRatio(evt.target.value/100)}>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
          </select>
        </div>
      </div>

      <div
        className={style.carouselContainer}
        id="main-container"
      >
        <div className={style.imageCarousel} id="image-container"
          style={{
            cursor: isInGrabState ? 'grab' : 'default',
            transform: `rotate(${rotaion}deg)`,
            height: `${height}px`,
            width: `${width}px`
          }}
        >
          {
            galleryImages[slideNumber].img ?
              <img
                id="image"
                className={style.imageCarouselImage}
                src={galleryImages[slideNumber].img}
                alt=""
                width={width}
                height={height}
              /> :
              <Document
                file={{ url: galleryImages[slideNumber].doc }}
                options={{ workerSrc: "/pdf.worker.js" }}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
              </Document>
          }
        </div>
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
