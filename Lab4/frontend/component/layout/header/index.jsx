import Info from "./Info"
import Logo from "./Logo"
import React from 'react'
import {useState, useEffect} from "react"



const Header = () => {
    const [windowWidth, setWindowWidthWidth] = useState(window.innerWidth);
    let resizeWindow = () => {
        setWindowWidthWidth(window.innerWidth)
    };

    useEffect(() => {
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
      }, [windowWidth]);
    return(
        <>
        <div style={{ width:windowWidth, padding: 5, backgroundColor:'rgba(11, 138, 145, 0.8)', position: 'fixed', backdropFilter: "blur(2px)"}}>
                <Logo/>
                {windowWidth > 737 ? <Info/> : <div/>}
        </div>
        </>
    )
}

export default Header;