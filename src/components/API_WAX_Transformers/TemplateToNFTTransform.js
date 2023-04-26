import React, { Fragment } from 'react';
import QDataNFTPreview from '../QDataViews/QDataNFTPreview';
import FlexStack from '../UI/FlexStack';
import QDataNFTCard from '../QDataViews/QDataNFTCard';
import WAXNFTToGenericTransform from './WAXNFTToGenericTransform';
const TemplateToNFTTransform = (props) => {


    return <Fragment>
        {props?.placeholderdata?.map(placeholder => {
            const NFTData = props.data?.data?.data?.find(x => x.template_id === placeholder.key);

            return placeholder?.props?.isGraft ?
                <FlexStack key={placeholder.key} className={'graft'} width={props.stackwidth}>
                    {placeholder}
                </FlexStack>

                :
                <FlexStack key={placeholder.key} assets={placeholder.assets} className={NFTData ? 'nftfinal' : 'nftplaceholder'} width={props.stackwidth}>
                    {NFTData ?
                        <WAXNFTToGenericTransform chromeless={props.chromeless} customRender={props.customRender} walletid={props.walletid} data={NFTData}><QDataNFTCard image={props.image} /></WAXNFTToGenericTransform>
                        : <QDataNFTPreview image={props.image} data={{ placeholder }} key={'preview_' + placeholder.key} />}
                </FlexStack>
        }
        )

        }
        {!props.placeholderdata &&

            <FlexStack assets={1} className={'nftfinal'} width={props.stackwidth}>

                <QDataNFTCard image={props.image} data={props.data} />

            </FlexStack>
        }

    </Fragment>
};

export default TemplateToNFTTransform;