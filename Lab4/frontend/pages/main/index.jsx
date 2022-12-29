import React from 'react';
import { Button, Link } from '@mui/material';
import { useDispatch} from 'react-redux';
import Header from '../../component/layout/header'
import { logout } from '../../redux/modules/auth';
import Canvas from './canvas/Canvas';
import Form from './form';
import ResultTable from './table';
import {useEffect, useState} from "react"
import { clearPoint } from '../../redux/modules/points';

const Mainpage = () => {
    const [windowWidth, setWindowWidthWidth] = useState(window.innerWidth);
    let resizeWindow = () => {
        setWindowWidthWidth(window.innerWidth)
    };

    useEffect(() => {
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
      }, [windowWidth]);

    const dispatch = useDispatch();
    const Logout = () =>{
        dispatch(logout());
    }

    const ClearTable = () => {
        dispatch(clearPoint())
    }
    return (
        <>
        <div>
            <Header />
        </div>
        {windowWidth > 1077 ? <div style={{display: 'flex', paddingTop: 100}}>
            <div style={{display:'block', paddingTop: 20, marginLeft: 50}}>
                <div style={{border: " solid 2px black", marginBottom: 20}}>
                    <Canvas />
                </div>
                <div>
                    <Form/>
                </div>
            </div>
            <div style={{width: '50%'}}>
                <div style={{marginLeft: 120}}>
                <div style={{textAlign:"left"}}><Button  onClick={ClearTable} variant="contained">Reset Table</Button></div>
                <ResultTable/>
                </div>
                <div>
                    <Link style={{ paddingBottom:120, marginLeft: 20}} onClick={Logout} >
                        Logout
                    </Link>
                </div>
            </div>
        </div> : <div>
                <div style={{ marginBottom: 20, display: "grid", maxWidth: 564, paddingTop: 120, paddingLeft: 20}}>
                    <Canvas />
                    </div>
                    <div style={{maxWidth: 460}}>
                        <Form/>
                    </div>
                    <div style={{marginLeft: 10}}>
                    <div style={{textAlign:"left"}}><Button  onClick={ClearTable} variant="contained">Reset Table</Button></div>
                        <ResultTable/>
                    </div>
                <div>
                    <Link style={{ paddingBottom:120, marginLeft: 20}} onClick={Logout} >
                        Logout
                    </Link>
                </div>
            </div>}

        </>
    )
}

export default Mainpage;