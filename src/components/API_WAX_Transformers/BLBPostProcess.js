import React, { Fragment, useRef } from 'react';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';


const BLBPostProcess = (props) => {

    const nsfw_allowed = useSelector(state => state.user.nsfw_allowed);
    const whitelist_only = false; //useSelector(state => state.user.whitelist_only);

    const passedProps = props.passedProps;
    const owner = passedProps.walletid;

    //console.log("PDATA_UP", passedProps.data?.data.data);
    // console.log("PDATA", props.data?.data?.data);

    let filteredBlockObj = {};
    let flags = {};

    const blockObj = props.data?.data?.data;
    let blocked = 0;
    let allowed = 0;
    for (const key in blockObj) {
        if (blockObj.hasOwnProperty(key)) {
            const bo = blockObj[key];
            if (bo.ban === true || (bo.nsfw === true && nsfw_allowed !== true)) {
                blocked++;
            } else {

                allowed++;
                filteredBlockObj[key] = bo;
                if (!flags[key]) {
                    flags[key] = [];
                }
                for (const key2 in bo) {
                    if (bo.hasOwnProperty(key2)) {
                        flags[key].push(key2);
                    }
                }

            }
        }
    }


    const filterData = (rawdata, returnBad = false) => {

        if (!rawdata) {
            return [];
        }


        const filterOut = rawdata.filter(y => (filteredBlockObj[y.collection.collection_name] === undefined) && (whitelist_only !== true && blockObj && blockObj[y.collection.collection_name] !== undefined));

        if (returnBad) {
            return filterOut;
        }

        const filterOutNames = filterOut.map(z => z.collection.collection_name);

        return rawdata.filter(y => filterOutNames.indexOf(y.collection.collection_name) == -1);

    }

    const convertData = (rawdata) => {
        return rawdata.map((x, index) => {

            return x.collection ? {

                key: x.collection.collection_name,
                contract: x.collection.contract,
                name: x.collection.name,
                assets: +x.assets,
                flags: flags[x.collection.collection_name],
                image: x.collection.img,
                placeholders: passedProps.data?.data?.data?.templates.filter(y =>
                    y.collection_name === x.collection.collection_name).map(z => {
                        return {
                            assets: z.assets,
                            key: z.template_id
                        }
                    }),

                collection_details: 'url for more info on block explorer or market'
            } : {};
        });
    }

    const storedList = useRef({ data: [{ error: "Not calculated." }] });

    if (blockObj && storedList.current.data) {

        storedList.current.data = convertData(filterData(passedProps.data?.data?.data?.collections));

    }
    const newData = blockObj ? {
        chain: "WAX",
        owner: owner, assets: passedProps.data?.data?.data?.assets, collections: storedList.current.data
    } : (passedProps.data?.data?.data?.collections ? {
        chain: "WAX",
        owner: owner, assets: passedProps.data?.data?.data?.assets, collections: convertData(passedProps.data?.data?.data?.collections)
    } : null);


    const filteredOut = convertData(filterData(passedProps.data?.data?.data?.collections, true));


    return <Fragment>
        {process.env.SESSION_SERVER_ENABLED === "true" && !blockObj && newData && <Alert style={{ marginTop: '5rem' }} variant="warning">NSFW and ban list wasn't applied. This feature relies on the session server and is unavailable in static-site mode. </Alert>}
        {
            React.Children.map(passedProps.children, (child) => {
                return React.cloneElement(child, {
                    data: newData,
                    requestData: passedProps.url,

                });
            })
        }

        {filteredOut.length > 0 && <Alert style={{ marginTop: '5rem' }} variant="info">{`${filteredOut.length}`} collections filtered out based on NSFW preference or presence on a ban list. <Button variant="dark">NSFW <Badge variant="secondary">{nsfw_allowed ? "On" : "Off"}</Badge></Button> </Alert>}</Fragment>;
};

export default React.memo(BLBPostProcess);
