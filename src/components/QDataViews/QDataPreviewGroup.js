import React, { Fragment } from 'react';
import QDataNFTPreview from './QDataNFTPreview';


const QDataPreviewGroup = (props) => {
    // Add data wrapper
    // Only wrap when made visible...
    //console.log("PREVIEW", props)
    // todo: Prop exists for detailViewControl which is the control that can render the NFT preview passed in from the top

    // feed placeholder ID into the "real" control
    // detail viewcontrol wraps the placeholder until it loads?

    // TODO: !!!!! Data is the web result now
    console.log("TODO USE THIS DATA", props.data);
    // Match placeholder key with the NFT data
    return <Fragment>
        {props?.placeholderdata?.map(placeholder =>

            props.data?.data?.data?.find(x => x.template_id === placeholder.key) ?
                <div>Placeholder not found.</div>
                : <QDataNFTPreview image={props.image} data={{ placeholder }} key={'preview_' + placeholder.key} />

        )

        }

    </Fragment>
};


export default QDataPreviewGroup;