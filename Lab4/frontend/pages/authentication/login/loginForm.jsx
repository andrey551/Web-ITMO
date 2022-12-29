import { useState, useEffect } from 'react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Divider, TextField, Box, Typography, Button, Link } from '@mui/material';
import { login, register } from "../../../redux/modules/auth"
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false)

    const dispath = useDispatch()
    
    const handleLoginSubmit = () => {
        dispath(login(username, password))
    }

    const handleRegisterSubmit = () => {
        dispath(register(username, password))
    }

    const setRegister = (e) =>{

        if(e.target.checked === true) {
            setIsRegister(true);
        } else {
            setIsRegister(false);
        }
    }
    const [formWidth, setFormWidth] = useState(600);
    let resizeWindow = () => {
        if(window.innerWidth > 1077) setFormWidth(700)
        else if(window.innerWidth > 737) setFormWidth(400)
        else setFormWidth(300)
    };
    useEffect(() => {
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
      }, [formWidth]);

    const {serverErrorMessage} = useSelector(state=>state.auth)
    return(
        <>
        <div>
        <Box sx={{marginTop: 20, width: formWidth, backgroundColor:'rgba(218, 34, 55, 0.16)', borderRadius: 10}}>
            <Typography sx={{height: 80, textAlign:"center"}}>
                {isRegister === true ? <h1>Register to D.U.M.B system</h1> :<h1>Login to D.U.M.B system</h1>}
            </Typography>
            <Divider/>
            <Box sx={{ margin: 10}}>
                <div>
                    <text style={{color: 'red'}}>{serverErrorMessage} </text>
                </div>
                <div style={{margin: 10}}>
                    <TextField
                    required
                    value={username}
                    onChange={e=>setUsername(e.target.value)}
                    id="outlined-required"
                    label="Username"
                    fullWidth
                    />
                </div>
                <div  style={{margin: 10}}>
                    <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    fullWidth
                    />
                </div>
                <div style={{margin: 10}}>
                    {isRegister  === true? 
                    <Button variant="outlined" onClick={handleRegisterSubmit}>Submit</Button> :
                    <Button variant="outlined" onClick={handleLoginSubmit}>Submit</Button>}
                </div>
                {/* {isRegister === false ? <div>
                    <Link href="#" 
                    underline="none" 
                    sx={{display: 'flex', 
                    justifyContent:'flex-end', 
                    paddingBottom: 3,
                    onClick:{setRegister}}}>
                    {'Sign up now'}
                    </Link>
                </div> : <div style={{paddingBottom: 3}}/>} */}
                <FormControlLabel
                    control={
                        <Switch onChange={setRegister} name="Register" />
                    }
                    label="Register"
                    />
            </Box>
        </Box>
        </div>
        </>
    )
}

export default LoginForm;