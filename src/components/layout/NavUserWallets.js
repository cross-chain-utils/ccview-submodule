import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import ChainPathLookup from '../../utils/ChainPathLookup';
import { useSelector } from 'react-redux';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';


const NavUserWallets = (props) => {

    const userWallets = useSelector(state => state.user.ownedWallets);



    return <NavDropdown title="My Wallets" id="basic-nav-dropdown">
        {userWallets && userWallets.map((wallet, index) =>

            <LinkContainer key={`nuw${index}`} to={`${ChainPathLookup(wallet.chain)}${wallet.name}`}><NavDropdown.Item><Badge bg="secondary"> {wallet.chain}</Badge>{wallet.name}</NavDropdown.Item></LinkContainer>

        )}

        <NavDropdown.Divider />
        <NavDropdown.Item href={process.env.SESSION_SERVER_MANAGE_WALLETS}>
            Manage Wallets (debug2)
        </NavDropdown.Item>
    </NavDropdown>;
}

export default React.memo(NavUserWallets);