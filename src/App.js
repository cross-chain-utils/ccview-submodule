import React, { Fragment, useEffect, useState } from "react";

import style from 'styled-components';

import { useSelector } from "react-redux";
import CCHostLaneQueue from "./components/HostLaneQueue/CCHostLaneQueue";
import ModalBG from "./components/UI/ModalBG";
import BootswatchCDN from "./components/themes/BootswatchCDN"
import RemoteUserProfile from "./components/QDataViews/RemoteUserProfile";
import QDataAuth from "./components/HostLaneQueue/QDataAuth";
import MainNavigation from "./components/layout/MainNavigation";
import RouteIndex from "./routes/RouteIndex";
import DispatchTimer from "./components/HostLaneQueue/DispatchTimer";
import Alert from "react-bootstrap/Alert";
import { GlobalStyles } from './styles';

const checkBox = require('../public/Checkbox.svg');

const Pane = style.div`
display:block;
position:fixed;
top:0;
left:0;
width: 100vw;
height: 0px;
pointer-events: none;
`;
const NotificationBar = style.div`

transition: height 0.5s ease-in;
height: 1.6rem;
overflow: hidden;
:empty {
 height: 0;

}

`;


const SaveNotificationBar = style.div`
padding: 0.5rem;
border-radius: 1rem;
display:inline-block;
margin: 0.5rem;
transition: opacity 1s ease-in;
opacity: 0.8;
:empty {
 opacity: 0;
 width: 4.2rem;
 padding: 1.55rem;
 background-image: URL("${checkBox}");
 background-repeat: no-repeat;
 background-size: 2rem;
 background-position:center;
}
`;

const HostQueueContainer = style.div`
font-size: 10px;

h2,h3 {
    font-size: 12px;
}


`;


const App = () => {
    //console.log("APP RENDER");

    const localSessionEstablished = useSelector(state => state.user.localjwt && state.user.localjwt !== '');
    const hide = localSessionEstablished ? {} : { visibility: 'hidden' };
    const [giveItTime, setGiveItTime] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setGiveItTime(true);
        }, 2000)

    }, []);


    const Pane = style.div`
    display:block;
    position:fixed;
    top:0;
    left:0;
    width: 100vw;
    height: 0px;
    pointer-events: none;
    `;

    return <Fragment>
        <GlobalStyles />
        {/* {localSessionEstablished ? <></> : <NotificationBar>Creating session... (if this takes too long, check cookie settings.)</NotificationBar>} */}
        <BootswatchCDN mode="stylesheet" />
        <Pane id="cc-background-pane" />
        <div id="cc-content-pane" >
            {process.env.SESSION_SERVER_ENABLED === "true" &&
                <NotificationBar>{!localSessionEstablished && giveItTime && <Alert style={{ borderRadius: 0, margin: 0, fontSize: '0.8rem', padding: '0.2rem', textAlign: 'center' }} variant="info">You are viewing this app in static mode without a session server.</Alert>}</NotificationBar>
            }
            <MainNavigation />
            <RouteIndex />

        </div>
        <Pane id="cc-overlay-pane">
            <SaveNotificationBar className="bg-info text-white">
                <QDataAuth url={`${process.env.API_ROOT}/user_payload?action=readprofile`} credentials="true" propsOnly="true">
                    <RemoteUserProfile />
                </QDataAuth>
            </SaveNotificationBar>
            <ModalBG>


                {/* <LoadingShade /> */}
            </ModalBG>
        </Pane>
        <Pane id="cc-modal-pane" style={{ pointerEvents: 'unset' }}>

        </Pane>
        <DispatchTimer />
        {/* <QueueTimer /> */}
        <HostQueueContainer>
            <CCHostLaneQueue />
        </HostQueueContainer>
    </Fragment >;

}

export default App;