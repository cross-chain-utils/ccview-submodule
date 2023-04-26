import React from 'react';
import { Spinner, Card } from 'react-bootstrap';
import QData from '../HostLaneQueue/QData';
import QDataNFTCollection from '../QDataViews/QDataNFTCollection';
import QDataNFTCollectionHeader from '../QDataViews/QDataNFTCollectionHeader';
import QDataRaw from '../QDataViews/QDataRaw';
import OBJKT2NFTPreview from './OBJKT2NFTPreview';
import QDataNFTCollectionHeader from '../QDataViews/QDataNFTCollectionHeader';
import QDataNFTCollection from '../QDataViews/QDataNFTCollection';
import OBJKT2NFTCollectionWrapper from './OBJKT2NFTCollectionWrapper';
import OBJKT2NFTPreview from './OBJKT2NFTPreview';
import OBJKTContinuationWrapper from './OBJKTContinuationWrapper';
import CollectionFilter from '../QDataViews/CollectionFilter';
import { validateAddress } from '@taquito/utils';


const chunkSize = +process.env.TEZOS_CHUNK_SIZE;

const ENSWrapperL1 = (props) => {
  // Check for ENS and look it up
  const nsdata = {
    query:
      `query {
          domain (name: "${props.walletid}"){
            name
            address
          }
        }`

  };

  if (/^[a-z0-9A-Z]+\.tez$/.test(props.walletid)) {
    return <QData method="POST" headers={{ "content-type": "application/json" }} body={nsdata} url={"https://api.tezos.domains/graphql?walletid=" + props.walletid}><ENSWrapperL2>{props.children}</ENSWrapperL2></QData>;

  }

  const invalidAddrData = {
    query: `query {
      holder(
        where: {address: {_ilike: "${props.walletid}"}}
        limit: 1
      ) {
        address
      }
    }
    `
  };

  const addrValidation = validateAddress(props.walletid);

  // 

  return addrValidation !== 3 ?
    <QData method="POST" headers={{ "content-type": "application/json" }} body={invalidAddrData} url={"https://data.objkt.com/v3/graphql?wallet=" + props.walletid}><ENSWrapperL3>{props.children}</ENSWrapperL3></QData> :
    <ENSWrapperL2 walletID={props.walletid}>{props.children}</ENSWrapperL2>;
}

const ENSWrapperL2 = (props) => {

  const walletID = props.walletID ? props.walletID : props.data?.data?.data?.domain?.address;
  const error = props.data && !walletID;
  return walletID ? <TezosWalletData walletid={walletID}>{props.children}</TezosWalletData> : (error ? <Card style={{ textAlign: 'center', fontSize: '2rem' }}><h2>Failed to resolve .TEZ address.</h2></Card> : <Card style={{ textAlign: 'center', fontSize: '2rem' }}><div><Spinner /> Loading TEZ address...</div></Card>);

}

const ENSWrapperL3 = (props) => {


  console.log("L3Props", props);

  const walletID = props.walletID ? props.walletID : props.data?.data?.data?.holder[0].address;
  console.log("L3Props", walletID);
  const error = props.data && !walletID;
  return walletID ? <TezosWalletData walletid={walletID}>{props.children}</TezosWalletData> : (error ? <Card style={{ textAlign: 'center', fontSize: '2rem' }}><h2>Failed to resolve invalid address. Please copy paste from your OBJKT profile.</h2></Card> : <Card style={{ textAlign: 'center', fontSize: '2rem' }}><div><Spinner /> Loading TEZ address...</div></Card>);

}


const TezosWalletData = (props) => {

  return <OBJKTContinuationWrapper walletid={props.walletid} chunksize={process.env.TEZOS_CHUNK_SIZE}>{props.children}</OBJKTContinuationWrapper>;
}


const OBJKT2CollectionList = (props) => {

  return (
    <ENSWrapperL1 walletid={props.walletid}>
      <OBJKT2NFTCollectionWrapper walletid={props.walletid}>
        <CollectionFilter showOnly={props.showOnly} removeList={props.removeList}>
          <QDataNFTCollectionHeader hideAssets={props.showOnly !== undefined} />
          <QDataNFTCollection
            hiddenReducer={props.hiddenReducer}
            walletid={props.walletid}
            detailViewControl={<OBJKT2NFTPreview
              walletid={props.walletid}
              stackwidth={props.stackwidth}
              chromeless={props.chromeless}
              hiddenReducer={props.hiddenReducer}
              customRender={props.customRender}
              alphaSort={props.alphaSort}
            />} />
        </CollectionFilter>
      </OBJKT2NFTCollectionWrapper>



    </ENSWrapperL1>
  );

}

export default React.memo(OBJKT2CollectionList);