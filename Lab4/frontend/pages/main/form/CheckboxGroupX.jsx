import React from 'react';
import { useState } from 'react';
import { FormControl, FormGroup, FormLabel, FormControlLabel,Checkbox , FormHelperText} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { checkXValid } from '../../../utils';
import { selectX } from '../../../redux/modules/points';
import { useEffect } from 'react';
const CheckboxGroupX = ({ onChange, x }) =>{
    const dispatch = useDispatch()
    const { minusThree, minusTwo, minusOne, zero, one, two, three, four, five } = x;

    
    // const error = [minusThree, minusTwo, minusOne, zero, one, two, three, four, five].filter((v) => v).length !== 1;
    

    // useEffect(() => {
    //     let xVal = checkXValid(x)
    //     console.log(x);
    //     if(xVal != -1) {
    //         dispatch(selectX(xVal))
    //     } 
    // }, [x])


    return(
        <>
         <FormControl
            required
            error={""}
            component="fieldset"
            variant="standard"
        >
            <FormLabel component="legend">X</FormLabel>
            <FormGroup sx={{display:'block'}}>
                <FormControlLabel
                control={
                <Checkbox checked={minusThree} onChange={onChange} name="minusThree" />
                }
                label="-3"
                />
                <FormControlLabel
                control={
                <Checkbox checked={minusTwo} onChange={onChange} name="minusTwo" />
                }
                label="-2"
                />
                <FormControlLabel
                control={
                <Checkbox checked={minusOne} onChange={onChange} name="minusOne" />
                }
                label="-1"
                />
                <FormControlLabel
                control={
                <Checkbox checked={zero} onChange={onChange} name="zero" />
                }
                label="0"
                />
                <FormControlLabel
                control={
                <Checkbox checked={one} onChange={onChange} name="one" />
                }
                label="1"
                />
                <FormControlLabel
                control={
                <Checkbox checked={two} onChange={onChange} name="two" />
                }
                label="2"
                />
                <FormControlLabel
                control={
                <Checkbox checked={three} onChange={onChange} name="three" />
                }
                label="3"
                />
                <FormControlLabel
                control={
                <Checkbox checked={four} onChange={onChange} name="four" />
                }
                label="4"
                />
                <FormControlLabel
                control={
                <Checkbox checked={five} onChange={onChange} name="five" />
                }
                label="5"
                />
                
            </FormGroup>
            <FormHelperText>Please choose one option</FormHelperText>
        </FormControl>
        </>
    )
}

export default CheckboxGroupX;