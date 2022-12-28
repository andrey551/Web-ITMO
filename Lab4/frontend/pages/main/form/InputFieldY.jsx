import React, {useState } from 'react'
import { FormControl, TextField} from '@mui/material';
import {useSelector, useDispatch} from "react-redux"
import { changeY } from '../../../redux/modules/points';

const InputFieldY = () => {
    const dispatch = useDispatch()
    const [err, setError] = useState();

    function onChange(e) {
        let value = parseFloat(e.target.value)
        if(!value || value > 5 || value < -5)
            setError("Please enter y in range [-5, 5]")
        else {
            setError()
            dispatch(changeY(value))
        }
    }
    return(
        <>
        <FormControl sx={{ width: '25ch', marginLeft: '1vw' }}>
        <TextField placeholder="Please enter Y" onChange={onChange} helperText={err}/>
        </FormControl>
        </>
    )
}

export default InputFieldY;