import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import React from 'react'
import Popover from 'react-bootstrap/Popover';

const Info = () => {

    const placement= 'left';

    return (
        <>
        <div style={{float:'right', marginRight: 50, zIndex: 4}}>
            <OverlayTrigger
            trigger="click"
            key={placement}
            placement={placement}
            overlay={
                <Popover id={`popover-positioned-${placement}`}>
                <Popover.Body sx={{zIndex: 5}}>
                    <div style={{backgroundColor:'rgba(202, 210, 210, 0.8)', borderRadius: 10}}>
                        <div style={{padding: 5}}>
                            <div>
                                <text className="infoText"><b>Name:</b> Dau Cong Tuan Anh </text>
                            </div>
                            <div>
                                <text className="infoText"><b>Group:</b> P32151</text>
                            </div>
                            <div>
                                <text className="infoText"><b>Variant:</b> 17000</text>
                            </div>

                        </div>
                    </div>
                </Popover.Body>
                </Popover>
            }
            >
                    <img src={require("../../../assets/logo/avatar.jpg")} style={{width: 50, borderRadius: '50%', padding: 5}}/>
            </OverlayTrigger>
        </div>
        </>
    )
}

export default Info;

