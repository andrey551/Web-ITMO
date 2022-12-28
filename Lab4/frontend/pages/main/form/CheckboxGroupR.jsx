import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {selectR} from "../../../redux/modules/points"
import { FormControl, FormGroup, FormLabel, FormControlLabel,Checkbox , FormHelperText} from '@mui/material';
const CheckboxGroupR = () =>{
    const [err, setErr] = useState();
    const {rCurrent: x} = useSelector(state => state.points)
    const dispatch = useDispatch()

      const { minusThree, minusTwo, minusOne, zero, one, two, three, four, five } = (x == null ? {minusThree: false, minusTwo:false, minusOne:false, zero:false, one:false, two:false, three:false, four:false, five:false} : x);
      const error = [minusThree, minusTwo, minusOne, zero, one, two, three, four, five].filter((v) => v).length !== 1;
      function check () {
        let { minusThree, minusTwo, minusOne, zero, one, two, three, four, five } = x;
        return [minusThree, minusTwo, minusOne, zero, one, two, three, four, five].filter((v) => v).length !== 1;
      }


    const handleChange = (event) => {
        if((parseInt(event.target.value) <= 0) && (event.target.checked) && check()) {
            setErr("Radius must bigger than 0")
        } else if(!check() && event.target.checked) {
            setErr("Please choose one option");
        } else {
            setErr();
        }

        dispatch(selectR({
            ...x,
            [event.target.name]: event.target.checked,
            }))
    };

    return(
        <>
         <FormControl
            required
            error={error}
            component="fieldset"
            variant="standard"
        >
            <FormLabel component="legend">R</FormLabel>
            <FormGroup sx={{display:'block'}} >
                <FormControlLabel
                control={
                <Checkbox checked={minusThree} value='-3' onChange={handleChange} name="minusThree" />
                }
                label="-3"
                />
                <FormControlLabel
                control={
                <Checkbox checked={minusTwo} value='-2' onChange={handleChange} name="minusTwo" />
                }
                label="-2"
                />
                <FormControlLabel
                control={
                <Checkbox checked={minusOne} value='-1' onChange={handleChange} name="minusOne" />
                }
                label="-1"
                />
                <FormControlLabel
                control={
                <Checkbox checked={zero} value ='0' onChange={handleChange} name="zero" />
                }
                label="0"
                />
                <FormControlLabel
                control={
                <Checkbox checked={one} value = '1' onChange={handleChange} name="one" />
                }
                label="1"
                />
                <FormControlLabel
                control={
                <Checkbox checked={two} value = '2' onChange={handleChange} name="two" />
                }
                label="2"
                />
                <FormControlLabel
                control={
                <Checkbox checked={three} value='3' onChange={handleChange} name="three" />
                }
                label="3"
                />
                <FormControlLabel
                control={
                <Checkbox checked={four} value='4' onChange={handleChange} name="four" />
                }
                label="4"
                />
                <FormControlLabel
                control={
                <Checkbox checked={five} value='5' onChange={handleChange} name="five" />
                }
                label="5"
                />
                
            </FormGroup>
            <FormHelperText>{err}</FormHelperText>
        </FormControl>
        </>
    )
}

export default CheckboxGroupR;