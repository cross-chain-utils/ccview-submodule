import styled, { keyframes } from 'styled-components';
import React, { Fragment, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { userActions } from '../../store/user';
import { useDispatch } from 'react-redux';


// todo: make params
const fadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
`;

const pngBG = `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFVWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjY0IgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iNjQiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSI2NCIKICAgdGlmZjpJbWFnZUxlbmd0aD0iNjQiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249Ijk2LzEiCiAgIHRpZmY6WVJlc29sdXRpb249Ijk2LzEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxl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")`;
const svgBG = `url('data:image/svg+xml;utf8,<svg width="100%" height="100%" viewBox="0 0 750 750" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">    <g transform="matrix(1,0,0,1,0.158692,75.01)">        <path d="M127.084,12.244L620.022,12.244L717.324,116.693L716.634,117.568L749.183,117.568L372.923,587.736L0.5,117.568L30.472,117.568L29.782,116.693L127.084,12.244ZM55.856,117.767L135.704,32.055L354.681,32.055L354.681,106.799L185.805,106.799L177.949,122.738C177.949,122.738 331.43,322.597 350.964,348.034C350.964,348.034 351.513,492.783 351.513,492.783C351.513,492.783 55.856,117.767 55.856,117.767ZM561.301,106.799L392.425,106.799C392.425,106.799 392.425,32.055 392.425,32.055L611.402,32.055L691.25,117.767C656.267,162.14 456.717,415.252 395.593,492.783C395.593,492.783 396.142,348.034 396.142,348.034C396.142,348.034 569.157,122.738 569.157,122.738L561.301,106.799Z" style="fill:white;"/>    </g></svg>')`;
const LoginButton = styled.div`

    padding: ${props => props.scale ? (0.5 * props.scale) + 'rem ' + (props.scale) + 'rem ' + (0.5 * props.scale) + 'rem ' + (4 * props.scale) + 'rem' : '0.5rem 1rem 0.5rem 4rem'}; 
    border: ${props => props.scale ? (0.2 * props.scale) + 'rem' : '0.2rem'} solid;
    border-color:  ${props => props.polling ? '#00000033' : props.loggedIn ? '#CC0000' : '#000000dd'};
    border-radius: ${props => props.scale ? (props.scale) + 'rem' : '1rem'};
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    width: ${props =>
        props.useBootstrap ?
            props.scale ? (16 * props.scale) + 'rem' : '16rem' :
            props.scale ? (12 * props.scale) + 'rem' : '12rem'};
    background-repeat: no-repeat; 
    background-size: ${props => props.scale ? (3 * props.scale) + 'rem ' + (3 * props.scale) + 'rem' : '3rem 3em'}; 
    background-position:  ${props => props.scale ? (0.5 * props.scale) + 'rem' : '0.5rem'} center; 
    display: inline-block;
    color: white; 
    background-image: ${props => props.logotype === "svg" ? svgBG : pngBG};
    background-color: ${props => props.polling ? '#333333dd' : props.loggedIn ? '#dc3545' : '#5733cc'};
 line-height: ${props => props.scale ? (2 * props.scale) + 'rem' : '2rem'};
   box-shadow: inset 0px 0px ${props => props.scale ? (2 * props.scale) + 'rem' : '2rem'} #00000055;
    transition: border-color 1.0s linear;
    transition: background-color 1.0s linear;

    &:hover {
        background-color: ${props => props.polling ? '#333333dd' : props.loggedIn ? '#681012' : '#674eba'};
        transition: border-color 0.2s linear;
        transition: background-color 0.2s linear;
    }

    label {
        font-size: ${props => props.polling ?
        props.scale ? (1.8 * props.scale) + 'rem' : '1.8rem' :
        props.loggedIn ?
            props.scale ? (1.7 * props.scale) + 'rem' : '1.7rem' :
            props.scale ? (1.5 * props.scale) + 'rem' : '1.5rem'};
        line-height: ${props => props.scale ? (2 * props.scale) + 'rem' : '2rem'};
        vertical-align: middle;
        height:${props => props.scale ? (2.2 * props.scale) + 'rem' : '2.2rem'};
        display: inline-block;
        font-weight: bold;
        text-shadow: 0px 0px ${props => props.scale ? (5 * props.scale) + 'px' : '5px'} #270b3a;
       
    }
`;

const BGShade = styled.div`
    width:100vw;
    height:100vh;
    top:0;
    left:0;
    background-color: #000000dd;
    display: block;
    position:absolute;
    opacity: ${props => props.out ? 0 : 1};
    animation: ${props => props.out ? fadeOut : fadeIn} 0.3s linear;
    backdrop-filter: blur(1px);
`;
const BGTotalShade = styled.div`
    width:100vw;
    height:100vh;
    top:0;
    left:0;
    background-color: #00000000;
    display: block;
    position:absolute;
    opacity: 1;
   
`;





const CCLogin = (props) => {

    const dispatch = useDispatch();

    const fget = (url) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        return fetch(`${url}?t=${(new Date()).getTime()}&pubkey=${encodeURIComponent(props.pubkey)}`, { signal: controller.signal, credentials: 'include' });
    }


    const getUserInfo = async (api_root) => {

        const res = await fget(`${api_root}/poll`);

        const userInfo = await res.json();

        if (userInfo.remoteJwt && ((new Date(userInfo.expires) > (new Date()).getTime()))) {
            return userInfo;
        }

        return false;

    };



    const [isLoggedOut, setIsLoggedOut] = useState(true);
    const [isPolling, setIsPolling] = useState(true);
    const [isError, setIsError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [init, setInit] = useState(true);
    const [popupWindow, setPopupWindow] = useState(null);
    const [userID, setUserID] = useState("");
    //const [userProfile, setUserProfile] = useState("");

    // todo: add local JWT to SESSION INFO


    const vlog = (str, obj) => {

        if (props.verbose) {
            obj !== undefined ? console.log(str, obj) : console.log(str);

        }
    }

    const loginClickHandler = useCallback(async (event) => {

        if (isPolling) {
            event.preventDefault();
            return;
        }
        //'v1/closewindow'
        let popup = null;
        if (!isLoggedOut) {
            popup = window.open(
                props.lib_root + "/logout/" + encodeURIComponent('v1/closewindow'), 'popUpWindow', 'height=550,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');

            vlog("Logging out...");

            fget(`${props.api_root}/logout`).then((res) => {
                setIsLoggedOut(true);
                dispatch(userActions.logout());
                vlog("Logged out.");
            });

        } else {
            popup = window.open(
                props.lib_root + "/api_login/" + encodeURIComponent(props.webhook_pubkey) + "/" + encodeURIComponent(userID), 'popUpWindow', 'height=550,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
        }

        setShowModal(true);

        const timer = setInterval(function () {
            vlog("Window Timer Running...");

            if (!popup || popup.closed) {
                // only close 
                clearInterval(timer);
                setShowModal(false);

            }
        }, 200);

        setPopupWindow({ popup, timer }
        );

    }, [userID, isPolling, isLoggedOut]);

    const BGShadeClickHandler = useCallback((event) => {

        event.preventDefault();
        //setShowModal(false);

        popupWindow.popup.focus();

    }, [popupWindow]);


    const windowEventListener = useCallback((event) => {

        if (event.origin !== props.lib_root)
            return;

        vlog("MESSAGE", event);

        if (popupWindow && popupWindow.timer) {
            clearInterval(popupWindow.timer);
        }

        let dataP = JSON.parse(event.data.replaceAll("&quot;", '"'));

        vlog("DATA", dataP);


        if (dataP && dataP.jwt) {
            setIsLoggedOut(false);
            console.log(dataP);
            dispatch(userActions.login({ ownedWallets: dataP.wallets, ccid: dataP.ccuuid, ccjwt: `${dataP.jwt.token_type} ${dataP.jwt.access_token}` }));
        }

    }, [props]);

    useEffect(() => {
        vlog("INIT", init);

        window.addEventListener("message", windowEventListener);

        if (init) {
            setInit(false);

            (async () => {
                const webError = () => {
                    setUserID();
                    setIsPolling(false);
                    setIsLoggedOut(true);
                    setIsError(true);
                }
                try {



                    const res = await fget(`${props.api_root}/session`);

                    console.log(res);

                    if (res.ok) {
                        const sessionInfo = await res.json();
                        const loggedIn = await getUserInfo(props.api_root);

                        vlog("LOGGED IN", loggedIn)
                        vlog("SESSION INFO", sessionInfo);

                        dispatch(userActions.populateLocalJwt({ localjwt: sessionInfo.localJwt }));

                        if (loggedIn && loggedIn.ccid) {

                            dispatch(userActions.login({ ownedWallets: loggedIn.wallets, ccid: loggedIn.ccid, ccjwt: loggedIn.remoteJwt, localjwt: loggedIn.localJwt }));
                        }

                        setUserID(sessionInfo.localSessionId);
                        setIsPolling(false);
                        setIsLoggedOut(!loggedIn);
                    } else {
                        webError();
                    }

                } catch (ex) {
                    console.log("LOGIN EXCEPTION", ex);
                    webError();
                }

            })();
        }

        return () => {
            //vlog("Clear async interval");
            // asyncPollInterval && clearInterval(asyncPollInterval);
            window.removeEventListener("message", windowEventListener);
        }


    }, []); // never run after initial

    const overlayPanePortal = document.getElementById("cc-modal-pane");

    return <Fragment>
        <LoginButton scale={props.scale ?? 1} useBootstrap={props.useBootstrap ?? false} logotype={props.logotype ?? "png"} polling={isPolling} loggedIn={!isLoggedOut} onClick={loginClickHandler}>
            <label>{isPolling ? "Loading..." : isLoggedOut ? "CC Connect" : "Disconnect"}</label>
        </LoginButton>
        {isError && <div style={{ fontSize: '0.7rem', opacity: "0.4" }}>{`${props.api_root}`} unreachable.</div>}
        {props.verbose === "true" && `Debug User ID: ${userID}`}
        {showModal && overlayPanePortal && ReactDOM.createPortal(<BGShade onClick={BGShadeClickHandler} />, overlayPanePortal)}

    </Fragment >
}

export default React.memo(CCLogin);