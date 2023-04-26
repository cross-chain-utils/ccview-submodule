import styled from 'styled-components';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot } from '@fortawesome/free-solid-svg-icons/faRobot'
import Spinner from 'react-bootstrap/Spinner';

const BGTotalShade = styled.div`
    width:100vw;
    height:100vh;
    top:0;
    left:0;
    background-color: #333;
    display: block;
    position: absolute;
    opacity: 1;
    font-size: 5rem;
    font-weight:bold;
    color: white;
    text-align:center;
   
`;


const LoadingShade = (props) => {

    const localSessionEstablished = useSelector(state => state.user.localjwt && state.user.localjwt !== '');

    return <Fragment>
        {!localSessionEstablished && <BGTotalShade><FontAwesomeIcon icon={faRobot} />Loading... beep boop.<br /><Spinner animation="grow" /></BGTotalShade>}
    </Fragment>;
}

export default React.memo(LoadingShade);