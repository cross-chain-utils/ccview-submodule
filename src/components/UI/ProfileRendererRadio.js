import React, { Fragment } from 'react';
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import { useSelector } from "react-redux";

const ProfileRendererRadio = (props) => {

    const alchEthState = useSelector((state) => state.user.prefs.alch_eth);
    const alchPolyState = useSelector((state) => state.user.prefs.alch_poly);
    const ethPolyRenderer = useSelector((state) => state.user.prefs.ethPolyRenderer);
    const waxRenderer = useSelector((state) => state.user.prefs.waxRenderer);
    const xtzRenderer = useSelector((state) => state.user.prefs.xtzRenderer);
    const imageResizer = useSelector((state) => state.user.prefs.imageResizer);
    const privateGatewayState = useSelector((state) => state.user.prefs.filebase_private_gateway);


    const setRenderer = (key) => {
        switch (key.split("_")[1]) {
            case "WAX":
                return props.postFn({ waxRenderer: key });
            case "EthPoly":
                return props.postFn({ ethPolyRenderer: key });
            case "XTZ":
                return props.postFn({ xtzRenderer: key });
            case "IMG":
                return props.postFn({ imageResizer: key });
        }
    };

    const getChecked = (value) => {
        // console.log("FINDME", value.split("_")[1]);
        switch (value.split("_")[1]) {
            case "WAX":
                return value === waxRenderer;
            case "EthPoly":
                return value === ethPolyRenderer;
            case "XTZ":
                return value === xtzRenderer;
            case "IMG":
                return value === imageResizer;
        }
    }

    const setApiKey = (key, e) => {
        switch (key) {
            case "alch_eth":
                return props.postFn({ alch_eth: e.target.value });
            case "alch_poly":
                return props.postFn({ alch_poly: e.target.value });
        }
    };

    const setPrivateGateway = (e) => {
        props.postFn({ filebase_private_gateway: e.target.value });
    }


    return (<Fragment>

        <Form.Check
            type="radio"
            label={props.label}
            inline
            disabled={props.disabled}
            checked={getChecked(props.value)}
            onChange={(e) => setRenderer(props.value)}
        />
        {props.requiresAPI ? <><Badge>Requires API Key</Badge></> : <><Badge bg="success">Public API</Badge></>}
        {" "}{props.recommendProxy ? <Badge bg="secondary">Recommend Proxy</Badge> : <></>}
        {" "}{props.rateLimited ? <Badge bg="warning">Slow</Badge> : <></>}
        <br />
        {props.value === "Alchemy_EthPoly" && ethPolyRenderer === "Alchemy_EthPoly" && (
            <Fragment>
                <Form.Group className="mb-3">
                    <Form.Label>Alchemy API-Key: Ethereum</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter API key"
                        value={alchEthState}
                        onChange={(e) => setApiKey("alch_eth", e)}
                    />
                    <Form.Text className="text-muted">
                        DEV Feature, API key must be proxied at server.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Alchemy API-Key: Polygon</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter API key"
                        value={alchPolyState}
                        onChange={(e) => setApiKey("alch_poly", e)}
                    />
                    <Form.Text className="text-muted">
                        DEV Feature, API key must be proxied at server.
                    </Form.Text>
                </Form.Group>
            </Fragment>
        )}
        {props.value === "PrivateGateway_IMG" && imageResizer === "PrivateGateway_IMG" && (
            <Fragment>
                <Form.Group className="mb-3">
                    <Form.Label>Filebase Private Gateway</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter URL"
                        value={privateGatewayState}
                        onChange={(e) => setPrivateGateway(e)}
                    />
                    <Form.Text className="text-muted">
                        No rate limit!
                    </Form.Text>
                </Form.Group>


            </Fragment>
        )}



    </Fragment>)
}

export default ProfileRendererRadio;