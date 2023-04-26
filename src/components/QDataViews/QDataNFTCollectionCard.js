import React, { Fragment } from 'react';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion';
import Badge from 'react-bootstrap/Badge';
import QDataCollectionFlags from './QDataCollectionFlags';
import Card from 'react-bootstrap/Card';
import RenderImage from '../UI/RenderImage';
import { useStore } from 'react-redux';
import Thumbnail from '../UI/Thumbnail';

const FlexGrid = styled.div`
  width: 101%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: row wrap;
    margin-left: -0.5%; 
   
`;

const BreakH2 = styled.h2`
word-wrap: break-word;
   max-width: 100%;
`;

const QDataNFTCollectionCard = (props) => {
    const c = props.data;
    const key = "acc-" + c.key;

    const isWhitelistImage = (url) => {
        const allowList = process.env.WHITELIST_IMG_URL ? process.env.WHITELIST_IMG_URL.split(",") : [];
        for (var item in allowList) {
            if (url.indexOf(allowList[item]) === 0) {
                return true;
            }
        }
        return false;
    }

    const MissingImage = c.name !== 'OpenSea Collections' ? <div style={{ width: '5rem', textAlign: 'center' }}>MISSING<br />IMAGE</div> : <Thumbnail src={require("../../../public/opensea.svg")} style={{ width: '5rem' }} width={200} />;

    return c ?


        <Accordion.Item eventKey={key}>

            <Accordion.Button as="div">

                <Card className='bg-light' style={{ minWidth: '4.5rem', marginRight: '1rem' }}>
                    {c.image && c.image.toString() !== "null" && c.image.toString() !== "undefined" ?
                        // TODO: move this to an exception list of allowed image URLs
                        (isWhitelistImage(c.image) ?
                            <img style={{ borderRadius: '0.25rem', maxWidth: '5rem' }} src={`${c.image}`} />
                            :
                            <RenderImage throttle={true} style={{ borderRadius: '0.25rem', maxWidth: '5rem' }} width={process.env.THUMBNAIL_WIDTH} src={`${c.image}`} />
                        )

                        : MissingImage}
                </Card>
                <Badge pill style={{ marginRight: '2rem', fontSize: '1.5rem', minWidth: '5rem' }}>{c.assetdata ? `${c.assetdata.filter(x =>
                    !props.hiddenReducer ||
                    (props.hiddenReducer(x) !== null)
                ).length}` : c.assets}</Badge>
                <BreakH2>{`${c.name}`}</BreakH2>

                <QDataCollectionFlags data={c.flags} />

            </Accordion.Button>
            <Accordion.Body style={{ padding: 0 }}>

                {props.expanded ?
                    <FlexGrid key={'fg-' + c.key}>

                        {React.cloneElement(props.detailViewControl, { key: 'dvc-' + c.key, image: c.image, placeholders: c.placeholders, collection: c.key, assetdata: c.assetdata, fixedCollectionName: props.fixedCollectionName })}

                    </FlexGrid>
                    : <Fragment></Fragment>}

            </Accordion.Body>
        </Accordion.Item>



        : <Fragment>No Card.</Fragment>
}

export default React.memo(QDataNFTCollectionCard);