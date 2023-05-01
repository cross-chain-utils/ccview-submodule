import React, { Fragment, useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import styled, { keyframes } from 'styled-components';
import QDataRaw from './QDataRaw';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoadBarrier } from '@fortawesome/free-solid-svg-icons/faRoadBarrier';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons/faCirclePlay';
import { Button } from 'react-bootstrap';
import Thumbnail from '../UI/Thumbnail';
import RenderImage from '../UI/RenderImage';
import { useStore } from 'react-redux';

const fadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;


const Title = styled.div`
font-weight:bold;
text-shadow: 0px 0px 0.2rem;
font-size: 1.2rem;
animation-name: ${fadeIn};
  animation-duration: 0.5s;
`;




const QDataNFTCard = (props) => {



    const ipfsPaths = useStore().getState().user.api_endpoints.IPFS;
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgFullLoaded, setImgFullLoaded] = useState(false);
    const [fixBrokenThumbImage, setFixBrokenThumbImage] = useState(null);
    const [fixBrokenFullImage, setFixBrokenFullImage] = useState(null);
    const [playVideo, setPlayVideo] = useState(false); // TODO: make a setting
    const [downloadUnsafeImage, setDownloadUnsafeImage] = useState(false); // TODO: make a setting
    const RenderEngine = useStore().getState().user.prefs.imageResizer;
    const [show, setShow] = useState(false);
    const throttle = RenderEngine !== "PrivateGateway_IMG";
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const nftContext = props.nftid;

    const imageLoadedEvent = (e) => {


        if (e.type === 'error') {
            console.log("IMAGE LOAD ERROR", e);
            if (RenderEngine !== "PrivateGateway_IMG" && e.target.src.indexOf(process.env.IPFS1) > -1) {
                setFixBrokenThumbImage(e.target.src.replace(process.env.IPFS1, process.env.IPFS2));
                // try backup IPFS
            }
            //Replace IPFS1 with IPFS2 and try again...
        }
        setImgLoaded(true);
    }

    const imageFullLoadedEvent = (e) => {
        if (e.type === 'error') {
            console.log("IMAGE LOAD ERROR", e);
            if (RenderEngine !== "PrivateGateway_IMG" && e.target.src.indexOf(process.env.IPFS1) > -1) {
                setFixBrokenFullImage(e.target.src.replace(process.env.IPFS1, process.env.IPFS2));
                // try backup IPFS
            }
            //Replace IPFS1 with IPFS2 and try again...
        }
        setImgFullLoaded(true);
    }

    const handleUnblockImage = (e) => {
        setDownloadUnsafeImage(true);

    }

    const handleUnblockVideo = (e) => {
        setPlayVideo(true);

    }

    useEffect(() => {
        if (isWhitelistImage(props.data?.img)) {
            setDownloadUnsafeImage(true);
        }
    }, []);

    const isWhitelistImage = (url) => {
        const allowList = process.env.WHITELIST_IMG_URL ? process.env.WHITELIST_IMG_URL.split(",") : [];
        for (var item in allowList) {
            if (url?.indexOf(allowList[item]) === 0) {
                return true;
            }
        }
        return false;
    }

    const ipfs = /(Qm[1-9A-Za-z]{44}[^\"]*)/g;

    const imgIPFS = props.data?.img?.match(ipfs);


    const imageLink = !downloadUnsafeImage ? `${ipfsPaths.provider1}${imgIPFS}?img-onerror=redirect&img-fit=scale-down&img-anim=true&img-width=` : props.data?.img;

    // if user is not using a proxy block all non-IPFS images for safety
    let imageBlocked = RenderEngine === "NoProxy_IMG" ? true : !props.data?.img || !imgIPFS;



    const renderPreviewImage = () => {

        const path = props.data?.img;

        if (!path) {

            return <div>NO IMAGE</div>;
        }

        // TODO: bug here when image is empty but video is present
        if (imgIPFS || downloadUnsafeImage) {

            return props.data.img ?
                <Fragment>
                    <RenderImage prepend={false} throttle={throttle} onClick={handleShow} style={{ width: '100%', maxHeight: '100%' }} onLoad={imageLoadedEvent} onError={imageLoadedEvent} width={process.env.THUMBNAIL_WIDTH} src={fixBrokenThumbImage ? fixBrokenThumbImage : path} />
                </Fragment>
                :

                'NO IMAGE'

        }


        return <div><FontAwesomeIcon icon={faRoadBarrier} size="4x" /><br /> EXTERNAL IMAGE BLOCKED <Button onClick={handleUnblockImage}>Unblock</Button></div>;

    }

    const renderImageStack = () => {

        const path = props.data?.img;

        if (!path) {

            return <div>NO IMAGE</div>;
        }

        if (imgIPFS || downloadUnsafeImage) {

            return <Fragment>
                {props.data.img && <RenderImage prepend={false} throttle={throttle} onClick={handleShow} style={{ width: '100%', position: 'relative' }} width={process.env.THUMBNAIL_WIDTH} src={fixBrokenThumbImage ? fixBrokenThumbImage : path} />}
                {props.data.img ? <RenderImage prepend={false} throttle={throttle} onClick={handleShow} style={{ width: '100%', position: 'absolute', left: 0 }} width={process.env.MAX_WIDTH} onLoad={imageFullLoadedEvent} src={fixBrokenFullImage ? fixBrokenFullImage : path} />
                    :
                    'NO IMAGE'}
            </Fragment>;
        }


        return <div><FontAwesomeIcon icon={faRoadBarrier} size="4x" /><br /> EXTERNAL IMAGE BLOCKED <Button onClick={handleUnblockImage}>Unblock</Button> </div>;

    }

    //mixBlendMode: 'soft-light',
    const vidButtonStyle = { margin: '1rem 1rem 0 1rem', opacity: 0.8, position: "absolute", top: "1rem", left: "1rem", borderRadius: "5rem", boxShadow: "0rem 0rem 0.5rem 0.5rem black" };

    const videoSrc = `${ipfsPaths.provider1}${props.data?.video}`;

    // hiddenReducer returns null if the item should be hidden
    // change to modify data...
    const NFTData = props.hiddenReducer ? props.hiddenReducer(props.data) : props.data;

    return (
        NFTData ?
            <Fragment>
                {NFTData.banner ? <div>{NFTData.banner}</div> : <></>}

                {!imageBlocked && !imgLoaded && !NFTData.video ? <Spinner variant="danger" animation="border" role="status" style={{ margin: '2rem auto 2rem auto' }}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner> : ''}

                {
                    NFTData.video ?

                        (playVideo ?
                            <div style={{ width: '10rem' }}><video onClick={handleShow} autoPlay={true} playsInline={true} loop={true} style={{ width: '10rem', opacity: 1, position: 'static' }} muted={true} src={videoSrc}></video></div>
                            : <div>
                                {NFTData.img ? <Fragment>
                                    {renderPreviewImage()}

                                    <FontAwesomeIcon icon={faCirclePlay} size="6x" style={vidButtonStyle} onClick={handleUnblockVideo} /></Fragment> :
                                    <Fragment>


                                        {props.image && <Thumbnail prepend={true} throttle={throttle} onClick={handleShow} style={{ width: '100%', position: 'relative' }} src={`${ipfsPaths.provider1}${props.image}?img-onerror=redirect&img-fit=scale-down&img-anim=true&img-width=200`} />}
                                        <FontAwesomeIcon icon={faCirclePlay} size="6x" style={vidButtonStyle} onClick={handleUnblockVideo} /> </Fragment>}

                                <br /> </div>)

                        : renderPreviewImage()
                }



                <Title onClick={handleShow} className={'cardtitle'}>{`${NFTData.name}`}</Title>

                {
                    show && <Modal show={show} onHide={handleClose} size={'xl'} centered>
                        <style>
                            {`.modal-dialog {
                            max-width: 96vw !important;
                        }`}
                        </style>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <Title onClick={handleShow}><h1 className={'modaltitle'}>{`${props.fixedCollectionName ? props.fixedCollectionName : NFTData.collection_name} - ${NFTData.name}`}</h1></Title>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={NFTData?.mint ? { backgroundColor: "#00000055" } : {}}>
                            <Container fluid>
                                {props.chromeless ?
                                    <Row>
                                        <Col sm={12} lg={12}>
                                            {props.customRender ?
                                                React.cloneElement(props.customRender, { data: NFTData, chainSpecific: props.chainSpecific })
                                                : <Fragment>
                                                    <h2>NFT Data</h2>
                                                    <QDataRaw data={NFTData} />
                                                </Fragment>}
                                        </Col>
                                    </Row>
                                    :

                                    <Row>
                                        <Col sm={12} lg={4} style={{ position: 'relative', padding: 0 }}>
                                            {!imageBlocked && !imgFullLoaded && !NFTData.video ? <Spinner variant="danger" animation="border" role="status" style={{ position: "absolute", left: '50%' }}>
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner> : ''}

                                            {NFTData.video ?
                                                (playVideo ?
                                                    <div style={{ width: '100%' }}><video onClick={handleShow} autoPlay={true} playsInline={true} loop={true} style={{ width: '100%', opacity: 1, position: 'static' }} muted={false} src={videoSrc}></video></div>
                                                    : <div><FontAwesomeIcon icon={faCirclePlay} size="6x" style={{ margin: '1rem' }} onClick={handleUnblockVideo} /><br /> </div>)

                                                :
                                                renderImageStack()} </Col>
                                        <Col sm={12} lg={8} class="nft_body">
                                            <h2 className="owner_tag">Owner</h2>
                                            <p className="owner_name">{NFTData.owner}</p>
                                            <h2 className="copies_tag">Copies Owned</h2>

                                            {props.chainSpecific}
                                            {props.customRender ?
                                                React.cloneElement(props.customRender, { data: NFTData, chainSpecific: props.chainSpecific })
                                                : <Fragment>
                                                    <h2>NFT Data</h2>
                                                    <QDataRaw data={NFTData} />
                                                </Fragment>}
                                        </Col>
                                    </Row>
                                }
                            </Container>


                        </Modal.Body>
                        <Modal.Footer>

                        </Modal.Footer>
                    </Modal>
                }
            </Fragment > :
            <Spinner variant="danger" animation="border" role="status" style={{ position: "absolute", left: '50%' }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>);
}

export default React.memo(QDataNFTCard);