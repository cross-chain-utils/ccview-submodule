import React, { Fragment, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';



const WAX2AssetBadge = (props) => {

    const [value, setValue] = useState([props.selected]);



    const buttonGroupOnChanged = (e) => {

        // setValue(e);
        // if (props.onChange) {
        //     props.onChange(props.data?.data?.data?.find(x => x.asset_id === e));
        // }
    };

    const unsetSelected = (e) => {

        //console.log("UNSET", e.target.htmlFor === value);

        if (value === e.target.htmlFor) {
            setValue('none');
            if (props.onChange) {
                props.onChange(null);
            }
        } else {
            setValue(e.target.htmlFor);
            if (props.onChange) {
                props.onChange(props.data?.data?.data?.find(x => x.asset_id === e.target.htmlFor));
            }
        }


    };


    //console.log("PROPS", value)
    return (
        props.data ?
            <Fragment>
                <ToggleButtonGroup
                    type='radio'
                    onChange={buttonGroupOnChanged}
                    vertical={true}
                    name="selectedNFT"
                    value={value}
                    key="w2abg"
                    style={{ display: 'block' }}
                >{props.data?.data?.data?.map((x, index) =>
                    <ToggleButton
                        variant='outline-light'
                        id={x.asset_id}
                        value={x.asset_id}
                        className={"bg-dark"}
                        onClick={unsetSelected}
                        key={"w2ab" + index}
                        size={"sm"}
                        style={{ margin: '0.5rem', display: 'inline-block', width: '12rem' }}>
                        <Badge style={{ marginRight: '0.3rem', minWidth: '3rem' }}>#{x.template_mint}</Badge>
                        {x.asset_id}
                    </ToggleButton>
                )}</ToggleButtonGroup>

            </Fragment >
            :
            <Spinner variant="primary" animation="border" role="status" key="w2aspinner">
                <span className="visually-hidden">Loading...</span>
            </Spinner>);
}

export default React.memo(WAX2AssetBadge);