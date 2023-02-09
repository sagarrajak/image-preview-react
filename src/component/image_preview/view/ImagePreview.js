import React, { useEffect, useState } from "react";
import style from "./imagePreview.module.css";
import { useMouseDrag } from './useMouseDrag';
import { Document, Page } from 'react-pdf';

function ImagePreview(props) {
  const { galleryImages, onChange } = props;
  const [slideNumber, setSlideNumber] = useState(0);
  const [rotaion, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [isInGrabState, setIsInGrabState] = useState(false);
  const [isImageRotationEnabled, setIsImageRotationEnabled] = useState(true);

  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  const [baseWidth, setBaseWidth] = useState();
  const [baseHeight, setBaseHeight] = useState();

  const [isImageOverflow, setIsImageOverflow] = useState(false);


  const mainContainer = document.getElementById('main-container');

  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useMouseDrag({mainContainer, isInGrabState});

  const resetBeforeScroll = () => {
    setRotation(0);
    setScale(1);
  }

  const prevSlide = React.useCallback(() => {
    let currentIndex = null;
    currentIndex = slideNumber === 0
      ? galleryImages.length - 1
      : slideNumber - 1;
    resetBeforeScroll();
    setTimeout(() => {
      setSlideNumber(currentIndex);
      if (onChange) {
        onChange(currentIndex);
      }
    }, 100);

  }, [galleryImages.length, slideNumber, onChange]);

  // Next Image
  const nextSlide = React.useCallback(() => {
    let currentIndex = null;
    currentIndex = slideNumber + 1 === galleryImages.length
      ? 0
      : slideNumber + 1;
    resetBeforeScroll();
    setTimeout(() => {
      setSlideNumber(currentIndex);
      if (onChange) {
        onChange(currentIndex);
      }
    }, 100);
  }, [galleryImages.length, slideNumber, onChange]);

  const updateScalePlus = () => {
    if(scale+0.05 > 2) return;
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
    const imageContainer = document.getElementById('main-container');
    const containerWidth = imageContainer.offsetWidth;
    if (width > containerWidth) 
      setIsImageOverflow(true);
    else 
      setIsImageOverflow(false);
  }, [height, scale, width]);

  useEffect(() => {
    const resizeRatio = 0.9;
    const img = new Image();
    img.src = galleryImages[slideNumber].img;
    const checkIfContainerIsLargerThenImage = (width, height) => {
      const imageContainer = document.getElementById('main-container');
      const containerHeight = imageContainer.offsetHeight;
      if (height > containerHeight) {
        setBaseHeight((containerHeight)*resizeRatio);
        const aspectRatio = +(height/width);
        setBaseWidth((1/aspectRatio)*(containerHeight)*resizeRatio);
      } else {
        setBaseHeight((height)*resizeRatio);
        setBaseWidth((width)*resizeRatio)
      }
    };
    img.onload = function() {
      checkIfContainerIsLargerThenImage(this.width, this.height);
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

  const onClickRotateClockWise = () => {
    let newRotation = rotaion + 90;
    if (newRotation >= 360) {
      newRotation = 0;
    }
    setRotation(newRotation);
  };

  const onClickRotateAntiClockWise = () => {
    let newRotation = rotaion - 90;
    setRotation(newRotation);
  };


  const scaleAtParticularRatio = (value) => {
    setScale(value)
  };

  const centerContainerWhenImageOverflow = () => {
    if (!isImageOverflow) {
      return {
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center' 
      }
    }
    return {};
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.setAttribute("type", "hidden");
    document.body.appendChild(link);
    link.setAttribute("href", galleryImages[slideNumber].img);
    link.setAttribute("download", galleryImages[slideNumber].img.split('/').pop());
    link.click();
    document.body.removeChild(link);
  }

  useEffect(()=> {
    const keyDownListerner = (event) => {
      if (event.keyCode === 39) {
          nextSlide();
       }
       else if (event.keyCode === 37) {
          prevSlide();
       }
    }
    document.addEventListener('keydown', keyDownListerner);
    return () => {
      document.removeEventListener('keydown', keyDownListerner);
    }
  }, [nextSlide, prevSlide]);

  return (
    <div className={style.imageContainer}>
      <div className={style.imgHeader}>
        <div className={style.imageHeaderFileName}>
          <div>
            <i className="fa-solid fa-image"></i>
            <span>{galleryImages[slideNumber]?.name || ''}</span>
          </div>
        </div>
        <div>
          <div onClick={updateScalePlus}>
            <i className="fa-solid fa-magnifying-glass-plus"></i> </div>
          <div>
            <select name="size" value={parseInt(scale) * 100} onChange={(evt) => scaleAtParticularRatio(evt.target.value / 100)}>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
            </select>
          </div>
          <div onClick={updateScaleMinus}>
            <i className="fa-solid fa-magnifying-glass-minus"></i>
          </div>
        </div>
        <div>
          {isImageRotationEnabled && <div onClick={onClickRotateAntiClockWise}>
            <i className="fa-solid fa-rotate-left"></i>
          </div>}
          {isImageRotationEnabled && <div onClick={onClickRotateClockWise}>
            <i className="fa-solid fa-rotate-right"></i>
          </div>}
          <div onClick={downloadImage}>
            <i className="fa fa-download" aria-hidden="true"></i>
          </div>
          {(scale > 1) && <div onClick={() => setScale(1)}>
            <i className='fa-solid fa-minimize' aria-hidden="true"></i>
          </div>}
          {(scale < 1) && <div onClick={() => setScale(1)}>
              <i class="fa-solid fa-maximize" aria-hidden="true"></i>
          </div>}
        </div>
      </div>
      <div
        className={style.carouselContainer}
        id="main-container"
        style={{
          ...centerContainerWhenImageOverflow()
        }}
      >
        {
          galleryImages[slideNumber].img ?
            <div className={style.imageCarousel} id="image-container"
              style={{
                cursor: isInGrabState ? 'grab' : 'default',
                transform: `rotate(${rotaion}deg)`,
                height: `${height}px`,
                width: `${width}px`,
              }}
            >
              <img
                id="image"
                className={style.imageCarouselImage}
                src={galleryImages[slideNumber].img}
                alt=""
                width={width}
                style={{
                  display: 'block'
                }}
                height={height}
              />
            </div>
            :
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
      <div className={style.left} onClick={prevSlide}>
        <i class="fa-solid fa-chevron-left fa-2xl"></i>
      </div>
      <div className={style.right} onClick={nextSlide}>
        <i class="fa-solid fa-chevron-right fa-2xl"></i>
      </div>
    </div>
  );
}

export default ImagePreview;
