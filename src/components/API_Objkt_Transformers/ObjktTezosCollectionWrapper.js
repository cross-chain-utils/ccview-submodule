// import { Fragment } from "react";
// import QData from '../HostLaneQueue/QData';

// const ObjktTezosCollectionWrapper = (props) => {

//   const objktCollections = { _in: [...new Set(props.data?.map(x => x.item.collection))].map(x => x.split(":")[0] === "TEZOS" && x.split(":")[1]) }
//   const nsdata = {
//     query:
//       `query GetCollectionsByContract {
//             fa(where: {contract: ${JSON.stringify(objktCollections).replace('"_in"', '_in')}}) {
             
//               collection_id
//               description
//               editions
//               logo
//               name
//               contract
             
//             }
//           }`

//   };


//   // data should get chained through...

//   return objktCollections._in.length > 0 ?
//     <QData data={props.data} method="POST" headers={{ "content-type": "application/json" }} body={nsdata} url={"https://data.objkt.com/v3/graphql"}>{props.children}</QData>
//     :
//     <Fragment>{props.children}</Fragment>;


// }

// export default ObjktTezosCollectionWrapper;