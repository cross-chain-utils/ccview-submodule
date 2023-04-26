import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { webcacheActions } from '../../store/webcache';
import QueueFactory from '../../utils/QueueFactory';
import { Spinner } from 'react-bootstrap';


const QData = (props) => {


    const dispatch = useDispatch();

    const dataWatcher = useSelector(state => state.cache.cachedApiData ? state.cache.cachedApiData[props.url] : null);

    const stateParamObj = {
        data: dataWatcher,
        requestData: props.url,
        chain: props.data ? (Array.isArray(props.data) ? [...props.data, dataWatcher] : [props.data, dataWatcher]) : [] // can chain QData together


    };


    useEffect(() => {

        if (!dataWatcher) {

            const apiItem = QueueFactory.QueueItem();
            apiItem.url = props.url;
            apiItem.fallback_url = props.fallback_url;
            apiItem.headers = props.headers;
            apiItem.credentials = props.credentials;
            apiItem.isImage = props.isImage;
            apiItem.prepend = props.prepend;
            apiItem.expires = props.expires;

            if (props.method === "POST") {
                apiItem.method = "POST";
                apiItem.data = props.body;

            }

            dispatch(webcacheActions.addQueueItem(apiItem));

        }

    }, [dataWatcher]);


    return <Fragment>{
        React.Children.map(props.children, (child) => {
            return React.cloneElement(child, stateParamObj);
        })
    }
        {!dataWatcher && props.showLoading && <Spinner></Spinner>}
    </Fragment>;
}

export default React.memo(QData);