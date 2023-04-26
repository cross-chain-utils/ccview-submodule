import React, { Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { userActions } from '../../store/user';
import EncryptedLocalStorage from '../../utils/EncryptedLocalStorage';

const QDataBootswatch = (props) => {


    const dispatch = useDispatch();
    const userState = useSelector(state => state.user.prefs.theme);


    const getPrevProfile = () => {
        try {
            return EncryptedLocalStorage().getAppSettings();


        } catch {
            return { theme: 'darkly' };
        }
    }

    const selectChanged = (e) => {

        if (props.mode !== "themepicker") {
            dispatch(userActions.setCCProfile({ theme: e.target.value, noSync: false }));
            EncryptedLocalStorage().setAppSettings({ ...getPrevProfile(), theme: e.target.value, noSync: true });
        } else {
            props.setState(e.target.value);
            dispatch(userActions.setCCProfile({ theme: e.target.value, noSync: false }));
        }


    }

    const handleStylesheetLoad = () => {

        if (props.stylesheetload) {
            props.stylesheetload(props.data.data.themes.find(x => x.name.toLowerCase() === selectedTheme)?.cssCdn);
        }
    }

    const selectedTheme = userState && (userState !== '') ? userState : getPrevProfile().theme;
    const cssCDN = props.data?.data?.themes.find(x => x.name.toLowerCase() === selectedTheme)?.cssCdn;

    return (
        props.data?.data?.themes ?
            props.mode === "stylesheet" ?
                <Helmet>
                    {selectedTheme && <link rel="stylesheet" key={cssCDN} href={cssCDN} onload={handleStylesheetLoad()} />}
                </Helmet> :
                <Form.Select value={selectedTheme} onChange={selectChanged} >

                    {props.data.data.themes.map(x => <option key={x.name} value={x.name.toLowerCase()}>{`${x.name} - ${x.description}`}</option>)}

                </Form.Select> :
            props.mode === "themepicker" ?
                <Form.Select value={selectedTheme} onChange={selectChanged} >

                    {props.data.data.themes.map(x => <option key={x.name} value={x.name.toLowerCase()}>{`${x.name} - ${x.description}`}</option>)}

                </Form.Select> :

                <Fragment><link rel="stylesheet" href={process.env.PRELOAD_THEME} onload={handleStylesheetLoad()} /></Fragment>);
}

export default React.memo(QDataBootswatch);