import { Button, Box, Divider } from "@mui/material"
import CheckboxGroupR from "./CheckboxGroupR"
import CheckboxGroupX from "./CheckboxGroupX"
import InputFieldY from "./InputFieldY"
import { checkXValid } from '../../../utils';
import {useSelector, useDispatch} from "react-redux"
import { checkPoint, selectX } from "../../../redux/modules/points"
import { useState, useEffect } from "react"

const Form = () => {
        const [windowWidth, setWindowWidthWidth] = useState(window.innerWidth);
    let resizeWindow = () => {
        setWindowWidthWidth(window.innerWidth)
    };

    useEffect(() => {
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
      }, [windowWidth]);
    const dispatch = useDispatch()
    const {yCurrent} = useSelector(state => state.points)
    const [x, setX] = useState({
        minusThree: false,
        minusTwo: false,
        minusOne: false,
        zero: false,
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
      });
    const handleChange = (event) => {
        setX({
        ...x,
        [event.target.name]: event.target.checked,
        });
    };

    function SubmitOnclick() {
        // const {rCurrent, xCurrent, yCurrent} = useSelector(state=>state.point);
        // if(rCurrent && xCurrent && yCurrent) {
        //     dispatch(checkPoint)
        // }
        let xVal = checkXValid(x)
        console.log(xVal);
        if(xVal || xVal === 0){
            dispatch(selectX(xVal))
            if(!yCurrent){
                alert("Invalid Y")
            }else{
                dispatch(checkPoint())
            }
        }else{
            alert("Invalid X")
        }

    }
    return (
        <>
        <Box sx={{display: 'block', minWidth : 449, border: '1px solid black', borderRadius: 5, marginLeft: 3, marginBottom: '4vh'}}>
            {windowWidth > 737 ? <div><Box sx={{marginLeft: 5}}>
                <CheckboxGroupX onChange={handleChange} x={x}/>
            </Box>
            <Box sx={{ float:'left', marginLeft: 5}}>       
                <InputFieldY/>
            </Box >
            </div>: <div/>}
            <Box sx={{ minWidth : 449}}>     
                <CheckboxGroupR/>
            </Box> 
            <Divider/> 
            <Box sx={{textAlign: 'right', margin: '1vw'}}>
                <Button variant="contained" sx={{marginBottom: 5, marginRight: 10}} onClick={SubmitOnclick}>Submit</Button>    
            </Box>
        </Box>
        </>
    )
}

export default Form;