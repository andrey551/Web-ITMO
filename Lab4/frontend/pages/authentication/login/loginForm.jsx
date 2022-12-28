import { useState, useEffect } from 'react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Divider, TextField, Box, Typography, Button, Link } from '@mui/material';
import { login } from "../../../redux/modules/auth"

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispath = useDispatch()
    
    const handleSubmit = () => {
        dispath(login(username, password))
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
                <h1>Login to D.U.M.B system</h1>
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
                    <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
                </div>
                <div>
                    <Link href="#" underline="none" sx={{display: 'flex', justifyContent:'flex-end', paddingBottom: 3}}>
                    {'Sign up now'}
                    </Link>
                </div>
            </Box>
        </Box>
        </div>
        </>
    )
}

export default LoginForm;