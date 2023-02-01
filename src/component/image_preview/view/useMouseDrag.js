import React from 'react'

export function useMouseDrag({mainContainer, isInGrabState}) {
    let mouseDown = false;
    let startX, scrollLeft, startY, scrollTop;

    React.useEffect(() => {
        if (!isInGrabState) return;

        const mouseMoveHandeler = (e) => {
            e.preventDefault();
            if (!mouseDown) { return; }
            const x = e.pageX - mainContainer.offsetLeft;
            const scrollX = x - startX;
            const y = e.pageY - mainContainer.offsetTop;
            const scrollY = y - startY;
            mainContainer.scrollLeft = scrollLeft - scrollX;
            mainContainer.scrollTop = scrollTop - scrollY;
        };

        const mouseDownHandeler = (e) => {
            e.preventDefault();
            mouseDown = true;
            startX = e.pageX - mainContainer.offsetLeft;
            scrollLeft = mainContainer.scrollLeft;

            startY = e.pageY - mainContainer.offsetTop;
            scrollTop = mainContainer.scrollTop;
        }

        const mouseUpHandeler = (e) => {
            e.preventDefault();
            mouseDown = false;
        };

        mainContainer.addEventListener('mousedown', mouseDownHandeler);
        mainContainer.addEventListener('mouseup', mouseUpHandeler);
        mainContainer.addEventListener('mousemove', mouseMoveHandeler);

        return () => {
            mainContainer.removeEventListener('mousedown', mouseDownHandeler);
            mainContainer.removeEventListener('mouseup', mouseUpHandeler);
            mainContainer.removeEventListener('mousemove', mouseMoveHandeler);
        };
    }, [isInGrabState, mainContainer]);
}