import React from 'react';
import QRCode from 'react-qr-code';
const CustomQRCode = React.forwardRef((props, ref)=>{
	return(
		<div className={props.containerClass} ref={ref}>
            <QRCode value={props.qrCode} size={props.size} bgColor="#D6D6D6"
                fgColor="#1C1A1D"/>
        </div>
	);
});

export default CustomQRCode;