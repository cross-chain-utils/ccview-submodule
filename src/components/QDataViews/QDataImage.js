import React from 'react';
import Spinner from 'react-bootstrap/Spinner';


const QDataImage = (props) => {
    //console.log(props.data)
    return (
        props.data ?
            <img src={props.data.url} style={props.style} className={props.className} /> : <Spinner variant="success" />);
}

export default React.memo(QDataImage);