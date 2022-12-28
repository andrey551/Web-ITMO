import pointAPI from "../../api/pointAPI";
import { setLoading, logout } from "./auth";

const SET_POINTS = 'SET_POINTS'
const CLEAR_POINTS = 'CLEAR_POINTS'
const ADD_POINT = 'ADD_POINT'

const initialState = {
    points: []
}

export default function tableReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_POINTS: 
            return Object.assign (
                {},
                state, {
                    points: action.value
                }
            )
        case CLEAR_POINTS:
            return Object.assign (
                {},
                state, {
                    points: []
                }
            )

        case ADD_POINT:
            return Object.assign (
                {}, 
                state, {
                    points: [...state.points, action.value]
                }
            )
        default:
            return state
    }
}

export function setPoints(value) {
    return {type: SET_POINTS, value}
}

export function clearPoint() {
    return {type: CLEAR_POINTS}
}

export function addPoint(value) {
    return {type: ADD_POINT, value}
}

export const getPoints = () => (dispatch) => {
    dispatch(setLoading(true));
    pointAPI.getPoints(JSON.parse(localStorage.getItem('tad')))
            .then(response => {
                
                if(response.status == 200) {
                    dispatch(setPoints(response.data))
                } else {
                    alert(`unexpected response ${response.status} from server`);
                }

                dispatch(setLoading(false))
            })
            .catch(err => {
                if(err.response.status == 401) {
                    dispatch(logout);
                } else {
                    alert(`unexpected response ${err.response.status} from server`)
                }

                dispatch(setLoading(false));
            }) ;
}