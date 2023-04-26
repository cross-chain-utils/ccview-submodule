import React, { Fragment, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { userActions } from '../../store/user';
import { useSelector, useDispatch } from 'react-redux';
import QData from '../HostLaneQueue/QData';
import QDataBool from './QDataBool';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons/faCloudArrowUp'
import EncryptedLocalStorage from '../../utils/EncryptedLocalStorage';

const RemoteUserProfile = (props) => {

    // todo: make this a modal shroud until prefs are downloaded...
    console.log("RemoteUserProfile Draw", props);
    const dispatch = useDispatch();

    //const [savedUserPrefs, setSavedUserPrefs] = useState(props.data);

    const currentUserPrefs = useSelector(state => state.user.prefs);
    const syncID = currentUserPrefs.syncID;

    // update current profile data to match downloaded data
    const userStoreUpdateUrl = props.data ? `${process.env.API_ROOT}/user_payload?sync=${syncID}` : '';
    const formatStateData = props.data ? "payload=" + encodeURIComponent(JSON.stringify(currentUserPrefs)) : '';

    const userLoggedIn = useSelector(state => state.user.isLoggedIn);

    // initial load
    useEffect(() => {

        if (props.data && props.data.data && !props.data.data.error) {
            console.log("RemoteUserProfile Effect", props.data.data);
            dispatch(userActions.setCCProfile({ ...props.data.data, noSync: true }));
            EncryptedLocalStorage().setAppSettings({ ...props.data.data, noSync: true });
        } else {
            // No data yet, so get user remote data
            console.log("Wait for data.");
            const localCCProfile = EncryptedLocalStorage().getAppSettings(); // localStorage.getItem('CCProfile');
            try {
                dispatch(userActions.setCCProfile(localCCProfile));
                console.log("User profile", localCCProfile);
            } catch {
                console.log("Unable to parse local profile.");
            }




        }
    }, [props.data]);




    // update user state whenever it changes by adding it to the queue whenever it renders with data
    return (
        props.data && props.data.data && !props.data.data.error ?

            <Fragment>
                {userLoggedIn && currentUserPrefs.syncID > 0 ? <QData key={syncID} url={userStoreUpdateUrl} method="POST" headers={{ 'content-type': 'application/x-www-form-urlencoded' }}
                    body={formatStateData} credentials="true">
                    <QDataBool pass="" pending="..." fail="Failed.">
                        <FontAwesomeIcon icon={faCloudArrowUp} size="2x" /></QDataBool>
                </QData> : <></>}
            </Fragment>
            :
            <Fragment>
                {userLoggedIn && currentUserPrefs.syncID > 0 ? <Spinner animation="border" role="status">
                    <span className="visually-hidden">Prefs Loading...</span>
                </Spinner> : <></>}
            </Fragment>);
}

export default React.memo(RemoteUserProfile);