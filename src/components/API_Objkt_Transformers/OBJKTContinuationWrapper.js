import React, { Fragment } from 'react';
import QData from '../HostLaneQueue/QData';
import { Card, Spinner } from 'react-bootstrap';

const OBJKTContinuationWrapper = (props) => {



    const data = {
        query:
            `
        query GetObjktsByHolderPaged($limit: Int!, $offset: Int!, $where: token_holder_bool_exp = {}, $order_by: [token_holder_order_by!] = {}) {
            token_holder(limit: $limit, offset: $offset, where: $where, order_by: $order_by) {
              quantity
              token {
                ...TokenCard
              }
              
            }
          }
          
          fragment TokenCard on token {
            pk
            token_id
            display_uri
            thumbnail_uri
            artifact_uri
            fa_contract
            supply
            timestamp
            description
            name
            mime
            flag
            
            creators {
              ...CreatorDefault
              
            }
            fa {
              ...FaCard
            }
            
          }
          
          fragment CreatorDefault on token_creator {
            creator_address
            holder {
              ...UserDefault
              
            }
            
          }
          
          fragment UserDefault on holder {
            address
            alias
            website
            twitter
            description
            tzdomain
            logo
            
          }
          
          fragment FaCard on fa {
            contract
            name
            logo
            creator_address
            collection_id
            live
            creator {
              ...UserDefault
              
            }
            
          }
          

          
        `,
        variables: {
            "limit": +props.chunksize,
            "offset": props.current ? +props.current : 0,
            "order_by": [
                {
                    "last_incremented_at": "desc"
                },
                {
                    "token_pk": "desc"
                }
            ],
            "where": {
                "holder_address": {
                    "_eq": props.walletid
                },
                "quantity": {
                    "_gt": 0
                },
                "token": {
                    "supply": {
                        "_gt": "0"
                    },
                    "flag": {
                        "_neq": "removed"
                    },
                    "artifact_uri": {
                        "_neq": ""
                    },
                    "timestamp": {
                        "_is_null": false
                    },
                    "fa": {
                        "live": {
                            "_eq": true
                        }
                    }
                }
            }
        },
        operationName: "GetObjktsByHolderPaged"
    }

    // TODO: need to add a continuation processor for large collections


    const walletID = props.chain && props.chain.length > 0 ? props.chain[0] : props.walletid;

    if (+props.current > 1000) {
        throw "Error";
    }

    if (!props.current || (props.data && props.chunksize && (+props.chunksize === props.data?.data?.data?.token_holder?.length))) {

        return (
            <QData method="POST" headers={{ "content-type": "application/json" }} body={data} url={"https://data.objkt.com/v3/graphql?wallet=" + props.walletid + "&continuation=" + (props.current ? +props.current : 0)}>
                <OBJKTContinuationWrapper
                    dataaggregate={props.dataaggregate ? [...props.dataaggregate, props.data] : []}
                    walletid={walletID}
                    chunksize={props.chunksize}
                    current={(props.current ? +props.current : 0) + (+props.chunksize)}
                >{props.children}</OBJKTContinuationWrapper>
            </QData>);
    } else if (props.data?.data?.data?.token_holder?.length > 0) {
        // expand data from all sets and send it on...
        const finalDataSrc = [...props.dataaggregate, props.data].map(x => x.data.data.token_holder);
        let finalData = [];
        finalDataSrc.forEach(x => {
            finalData = [...finalData, ...x];
        });

        const mimicFormat = { data: { data: { token_holder: finalData } } };

        return <Fragment>{
            React.Children.map(props.children, (child) => {
                return React.cloneElement(child, { data: mimicFormat });
            })
        }</Fragment>;


    }

    return <Fragment><Card style={{ textAlign: 'center', fontSize: '2rem' }}><div><Spinner> </Spinner>Loading OBJKT wallet...</div></Card></Fragment>;

}

export default OBJKTContinuationWrapper;