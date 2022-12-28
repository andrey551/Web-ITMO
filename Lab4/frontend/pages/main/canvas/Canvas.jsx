import React, { useState } from 'react';
import {useSelector, useDispatch} from "react-redux"
import { useEffect } from 'react';
import { useRef } from 'react';
import { checkIsValid } from '../../../utils';

import { selectX, changeY, checkPoint} from "../../../redux/modules/points"


const X_CENTER = 220;
const Y_CENTER = 228;
const LINE_LENGTH = 20;

function getNearestY(yval) {
    return -(yval - Y_CENTER) / (2 * LINE_LENGTH);
}

function getNearestX(xval) {
    return parseInt((xval - X_CENTER) / (2*LINE_LENGTH));
}

const Canvas = (props) => {
    const {rCurrent: R, xCurrent, yCurrent} = useSelector(state => state.points)
    const {points} = useSelector((state => state.table))
    
    let rCurrent = (R == null ? 0 : checkIsValid(R))

    const dispatch = useDispatch()

    const {width = 449, height = 449} = props;

    const canvas = useRef(null);
    function init(){
        const context = canvas.current.getContext("2d");

        const background_image = new Image();
        background_image.src=require("../../../assets/canvas/canvas.png")
        context.drawImage(background_image, 0, 0)
    }

    function drawArea() {
        if(rCurrent > 0){
            const context = canvas.current.getContext("2d");
            context.beginPath();
            context.fillStyle = 'rgba(0, 0, 101, 0.24)';
            context.fillRect(X_CENTER, Y_CENTER - 2 * rCurrent * LINE_LENGTH, rCurrent * LINE_LENGTH, 2 * rCurrent * LINE_LENGTH)
            context.closePath();
    
            context.beginPath();
            context.fillStyle = 'rgba(0, 0, 101, 0.24)';
            context.moveTo(X_CENTER, Y_CENTER);
            context.lineTo(X_CENTER + 2 * rCurrent * LINE_LENGTH, Y_CENTER);
            context.lineTo(X_CENTER, Y_CENTER+ 2 * rCurrent * LINE_LENGTH);
            context.lineTo(X_CENTER, Y_CENTER);
            context.arc(X_CENTER, Y_CENTER, 2 * rCurrent * LINE_LENGTH,  0 , Math.PI / 2);
            context.fill()
            context.closePath()
    
            context.beginPath();
            context.fillStyle = 'rgba(0, 0, 101, 0.24)';
            context.moveTo(X_CENTER, Y_CENTER);
            context.lineTo(X_CENTER, Y_CENTER - rCurrent * LINE_LENGTH);
            context.lineTo(X_CENTER - rCurrent * LINE_LENGTH, Y_CENTER);
            context.lineTo(X_CENTER, Y_CENTER);
            context.fill();
            context.closePath();
        }


    }

    function setPointFixed(xCurrent, yCurrent, result = "") {
        const ctx = canvas.current.getContext("2d");
        ctx.beginPath();
        if(!result){
            ctx.fillStyle = 'rgba(223, 0, 0, 0.81)';
        }else if(result === "Hit"){
            ctx.fillStyle = 'rgba(0, 255, 0, 1)';
        }else if (result === "Miss"){
            ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        }
        ctx.arc(X_CENTER + xCurrent * 2 * LINE_LENGTH, Y_CENTER - yCurrent * 2 * LINE_LENGTH, 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }



    function canvasOnClick(e) {
        dispatch(selectX(getNearestX(e.nativeEvent.offsetX)))
        dispatch(changeY(getNearestY(e.nativeEvent.offsetY)))

        dispatch(checkPoint())
    }
    
    useEffect(() => {
        init()
        drawArea()
        setPointFixed(xCurrent, yCurrent)
    }, [xCurrent, yCurrent, rCurrent])

    useEffect(() => {
        if(points.length){
            init()
            drawArea()
            const {x: xPoint, y: yPoint, result: resultPoint} = points[points.length - 1]

            setPointFixed(parseFloat(xPoint), parseFloat(yPoint), resultPoint)
        }

    }, [points])

    const style = { width, height };

    return (
        <>
            <canvas ref={canvas}  width={449} height={449} style={style} onClick={canvasOnClick}/>
        </>
    )
}

export default Canvas;