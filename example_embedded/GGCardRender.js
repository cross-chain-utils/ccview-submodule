import React, { Fragment } from 'react';
import { QData, QDataRaw, RenderImage } from '../dclib';
import { } from '../dclib';

const GGCardRender = (props) => {
    const cardData = props.data;

    return (
        <Fragment>
            <div>
                <h2 class="ggtitle">{
                    cardData.name.indexOf("Progenitor") > -1 && cardData.name.indexOf(",") > -1 ?
                        <Fragment>{cardData.name.substring(0, cardData.name.indexOf(","))}
                            <span style={{ color: "firebrick" }}> PROGENITOR</span>
                        </Fragment>
                        : cardData.name}
                </h2>
                <h3 class={`rarity ${cardData.meta.rarity}`}>{cardData.meta.rarity}</h3>
                <p class="description">{cardData.meta.description}</p>
            </div>
            <div style={{ width: '80%', margin: '10%', padding: '1vw', background: '#FFFFFF33' }}>

                <RenderImage src={cardData.meta.backimg} width={process.env.THUMBNAIL_WIDTH} style={{ float: 'left', marginRight: '1vw' }} />
                <strong>Generation: </strong>{cardData.meta.generation}<br />
                <strong>Website: </strong><a href="https://googoons.net">GooGoons.net</a><br />
                <strong>Copyright: </strong>2022, googoons.net<br />
                <strong>Collection ID: </strong>{props.data.collection_id}<br />
                <strong>Collection Name: </strong>{props.data.collection_name}<br />
                <strong>Contract: </strong>{props.data.contract}<br />
                <strong>Max: </strong>{props.data.max}<br />
                {props.data.mint && <Fragment><strong>Mint: </strong>{props.data.mint}</Fragment>}
                <div style={{ clear: 'both' }}> </div>

            </div>

        </Fragment>
    )

};

export default GGCardRender;

