import styled from 'styled-components';
import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { webcacheActions } from '../../store/webcache';
import ReactDOM from 'react-dom';

const HiddenImage = styled.img`
 display: none; 
`

const QueueItem = (props) => {


    const dispatch = useDispatch();

    const targetItem = props.item;



    useEffect(() => {

        if (targetItem.status === "Active" && !targetItem.isImage) {

            (async () => {

                let res = null;
                try {


                    const controller = new AbortController();

                    if (targetItem.method === "GET") {

                        if (targetItem.credentials) {
                            res = await fetch(targetItem.url, { signal: controller.signal, credentials: 'include' });
                        } else {

                            if (targetItem.headers) {
                                res = await fetch(targetItem.url, { signal: controller.signal, headers: targetItem.headers });
                            } else {
                                res = await fetch(targetItem.url, { signal: controller.signal });
                            }



                        }
                    } else {
                        res = await fetch(targetItem.url, targetItem.credentials ? {
                            signal: controller.signal,
                            credentials: 'include',
                            method: 'POST',
                            headers: targetItem.headers ? {
                                "content-type": "application/json",
                                ...targetItem.headers,
                            } : {},
                            body: targetItem.data && typeof targetItem.data === 'object' ? JSON.stringify(targetItem.data) : targetItem.data
                        } : {
                            signal: controller.signal,
                            method: 'POST',
                            headers: targetItem.headers ? {
                                "content-type": "application/json",
                                ...targetItem.headers,
                            } : {},
                            body: targetItem.data && typeof targetItem.data === 'object' ? JSON.stringify(targetItem.data) : targetItem.data
                        });
                    }

                    const jval = await res.json();
                    dispatch(webcacheActions.markFinished({ wkey: props.wkey, ikey: targetItem.key, data: jval }));

                    if (targetItem.expires > -1) {
                        setTimeout(() => {
                            dispatch(webcacheActions.expireFinished({ wkey: props.wkey, ikey: targetItem.key }));

                            console.log("DATA EXPIRED");
                        }, targetItem.expires)
                    }

                    props.onData && props.onData(jval, targetItem.url, targetItem.key);
                } catch (ex) {

                    console.log("FETCH EXCEPTION", ex);
                    dispatch(webcacheActions.markFinished({ wkey: props.wkey, ikey: targetItem.key, data: {} }));
                    console.log("FETCH... did you forget to add isImage={true} to the QData tag?")
                }

            })();
        }
    }, []);


    const queueItemImageFinished = (event) => {

        dispatch(webcacheActions.markFinished({ wkey: props.wkey, ikey: targetItem.key }));
        props.onData && props.onData({ src: event.target.src }, targetItem.url, targetItem.key);

    }

    const queueItemImageError = (error) => {
        console.log("IMAGE ERROR!", { wkey: props.wkey, ikey: targetItem.key });

        dispatch(webcacheActions.markFailed({ wkey: props.wkey, ikey: targetItem.key }));

    }

    // try react.cloneElement in the callback to set a property.  {React.cloneElement(hero, { color: "#1560bd"})}
    const backgroundPanePortal = document.getElementById("cc-background-pane");
    // preloads image
    return <Fragment>
        {props.visible && <div>{targetItem.url}</div>}
        {targetItem.status === "Active" && targetItem.isImage === true &&
            backgroundPanePortal && ReactDOM.createPortal(<HiddenImage onLoad={queueItemImageFinished} onError={queueItemImageError} src={targetItem.url} />, backgroundPanePortal)}


    </Fragment>;
}

export default React.memo(QueueItem);