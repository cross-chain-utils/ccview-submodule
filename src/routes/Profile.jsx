import React, { Fragment, useState } from "react";
import { Helmet } from "react-helmet-async";
import BootswatchCDN from "../components/themes/BootswatchCDN";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { userActions } from "../store/user";
import ProfileRendererRadio from "../components/UI/ProfileRendererRadio";
import EncryptedLocalStorage from "../utils/EncryptedLocalStorage";

const Profile = () => {
  const dispatch = useDispatch();
  const messyModeState = useSelector((state) => state.user.prefs.messyMode);

  const [timer, setTimer] = useState(null);

  const changeDelay = () => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        // sync to web server
        console.log("POST!");
        postChanges(getPrevProfile(), true);
      }, 1000)
    );
  };

  const delayPostChanges = (profileData) => {
    postChanges(profileData); // immmediately update redux and file but not web
    changeDelay();
  };

  // todo: remove dupe code
  const getPrevProfile = () => {
    try {
      return EncryptedLocalStorage().getAppSettings();
    } catch {
      return { theme: "darkly", messyMode: false, alch_eth: "", alch_poly: "" };
    }
  };

  const postChanges = (profileData, sync = false) => {
    // set noSync to true so the state doesn't update the web server but set a timer

    console.log(profileData);
    const profileChange = {
      ...profileData,
    };

    dispatch(
      userActions.setCCProfile({
        ...profileChange,
        noSync: !sync,
      })
    );
    EncryptedLocalStorage().setAppSettings({
      ...getPrevProfile(),
      ...profileChange,
      noSync: !sync,
    });
  };

  const checkboxChanges = (e) => {
    console.log("CB", e.target.checked);

    delayPostChanges({ messyMode: e.target.checked });
  };

  return (
    <Container>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Row>
        <Col xs={3}></Col>
        <Col xs={6}>
          <Card style={{ marginTop: 90, padding: 20 }}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Active Theme</Form.Label>

                <BootswatchCDN />

                <Form.Text className="text-muted">
                  Saves to your profile when you change it.
                </Form.Text>
              </Form.Group>

              <Form.Group
                className="mb-3"
                style={{ border: "1px solid", padding: "1vw" }}
              >
                <Form.Label>ETH/Poly Render API</Form.Label>
                <hr />
                <ProfileRendererRadio
                  label="Rarible"
                  value="Rarible_EthPoly"
                  postFn={delayPostChanges}
                  requiresAPI={false}
                  recommendProxy={false}
                />
                <ProfileRendererRadio
                  label="Alchemy"
                  value="Alchemy_EthPoly"
                  postFn={delayPostChanges}
                  requiresAPI={true}
                  recommendProxy={true}
                  disabled={true}
                />
                <ProfileRendererRadio
                  label="NFTScan"
                  value="NFTScan_EthPoly"
                  postFn={delayPostChanges}
                  requiresAPI={true}
                  recommendProxy={true}
                  disabled={true}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                style={{ border: "1px solid", padding: "1vw" }}
              >
                <Form.Label>Tezos Render API</Form.Label>
                <hr />
                <ProfileRendererRadio
                  label="Objkt"
                  value="Objkt_XTZ"
                  postFn={delayPostChanges}
                  requiresAPI={false}
                  recommendProxy={false}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                style={{ border: "1px solid", padding: "1vw" }}
              >
                <Form.Label>WAX Render API</Form.Label>
                <hr />
                <ProfileRendererRadio
                  label="AtomicAssets"
                  value="AtomicAssets_WAX"
                  postFn={delayPostChanges}
                  requiresAPI={false}
                  recommendProxy={false}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                style={{ border: "1px solid", padding: "1vw" }}
              >
                <Form.Label>Image Resizer</Form.Label>
                <hr />
                <ProfileRendererRadio
                  label="Filebase Private Gateway"
                  value="PrivateGateway_IMG"
                  postFn={delayPostChanges}
                  requiresAPI={true}
                  recommendProxy={false}
                />
                <ProfileRendererRadio
                  label="https://images.weserv.nl/ Free Proxy"
                  value="FreeProxy_IMG"
                  postFn={delayPostChanges}
                  requiresAPI={false}
                  recommendProxy={false}
                  disabled={false}
                  rateLimited={true}
                />

                <ProfileRendererRadio
                  label="No Proxy (HIGH BANDWIDTH USAGE)"
                  value="NoProxy_IMG"
                  postFn={delayPostChanges}
                  requiresAPI={false}
                  recommendProxy={true}
                  disabled={false}
                  rateLimited={true}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Messy Display Mode</Form.Label>
                <Form.Check
                  checked={messyModeState}
                  onChange={checkboxChanges}
                  label={`Randomize My Stacks`}
                />
                <Form.Text className="text-muted">
                  Experimental -- GPU intensive.
                </Form.Text>
              </Form.Group>
            </Form>
          </Card>
        </Col>
        <Col xs={3}></Col>
      </Row>
    </Container>
  );
};
export default Profile;
