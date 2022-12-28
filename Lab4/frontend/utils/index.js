export const checkIsValid = (R) => {
    let count = 0 
    let temp = 0

    for(let  i = 0; i < Object.keys(R).length ; ++i) {
        if(Object.values(R)[i]){
            count++
            temp = i - 3
        }
    }

    if(count === 1 && temp >= 1){
        return temp
    } else {
        return -1
    }
}

export const checkXValid = (X) =>{
    let count = 0 
    let temp = 0

    for(let  i = 0; i < Object.keys(X).length ; ++i) {
        if(Object.values(X)[i]){
            count++
            temp = i - 3
        }
    }

    if(count === 1 ){
        return temp
    } else {
        return false
    }
}
