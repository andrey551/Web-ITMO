import React from 'react'


const Logo = () => {
    return(
        <div style={{ float:'left', padding: 5}}>
                <img onClick={function (){ 
                    window.location.href = "https://se.ifmo.ru/"
                    }} 
                    href='https://se.ifmo.ru/' 
                    src={require("../../../assets/logo/itmo-cs-logo.png")} />
        </div>
    )
}

export default Logo;