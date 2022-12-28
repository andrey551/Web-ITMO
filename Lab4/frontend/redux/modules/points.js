import pointAPI from "../../api/pointAPI";
import { logout } from "./auth";
import { setPoints, addPoint } from "./table";
import {checkIsValid} from "../../utils"

const SELECT_X = 'SELECT_X'
const SELECT_R = 'SELECT_R'
const CHANGE_Y = 'CHANGE_Y'
const CLEAR_CURRENT = 'CLEAR_CURRENT'

const initialState = {
    rValues: [-3, -2, -1, 0, 1, 2, 3, 4, 5],
    rCurrent: {
        minusThree: false,
        minusTwo: false,
        minusOne: false,
        zero: false,
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
      },
    xValues: [-3, -2, -1, 0, 1, 2, 3, 4, 5],
    xCurrent: undefined,
    yMin: -5,
    yMax: 5,
    yCurrent: undefined
}

export default function valuesReducer (state = initialState, action = {}) {
    switch(action.type) {
        case SELECT_R:
            return Object.assign(
                {}, 
                state, {
                    rCurrent: action.value
                }
            )
        case SELECT_X:
            return Object.assign(
                {}, 
                state, {
                    xCurrent: action.value
                }
            )
        case CHANGE_Y:
            return Object.assign(
                {},
                state, 
                {
                    yCurrent: action.value
                }
            )
        case CLEAR_CURRENT:
            return Object.assign(
                {}, 
                state, 
                {
                    rCurrent: 1,
                    xCurrent: undefined,
                    yCurrent: undefined
                }
            )
        default:
            return state
    }
}

export function selectR(value) {
    return {type: SELECT_R, value}
}

export function selectX(value ) {
    return {type: SELECT_X, value}
}

export function changeY(value) {
    return {type: CHANGE_Y, value}
}

export function clearCurrent() {
    return {type: CLEAR_CURRENT}
}

export const checkPoint = () => (dispatch, getState) =>{
    const isvalid = checkIsValid(getState().points.rCurrent)

    if(isvalid != -1){
        pointAPI.checkPoint(
            getState().points.xCurrent,
            getState().points.yCurrent,
            isvalid,
            JSON.parse(localStorage.getItem('tad')).jwt)
            .then (response => {
                if(response.status == 200) {
                    dispatch(addPoint(response.data))
                } else {
                    alert(`Unexpected response ${response.status} from server`)
                }
            })
            .catch (err => {
                if(err.response.status == 401) {
                    dispatch(logout())
                } else {
                    alert(`Unexpected response ${err.response.status} from server`)
                }
            })
    }else{
        alert("Invalid R")
    }

}

export const clearPoint = () => (dispatch) => {
    pointAPI.clearPoint(JSON.parse(localStorage.getItem('tad')).jwt)
    .then (response =>{
        if(response.status == 200) {
            dispatch(setPoints([]))
        } else {
            alert(`Unexpected response ${response.status} from server`)
        }
    })
    .catch (err => {
        if(err.response.status == 401) {
            dispatch(logout())
        } else {
            alert(`Unexpected response ${err.response.status} from server`)
        }
    })
}
