import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import ChainPathLookup from '../../utils/ChainPathLookup';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';


const NavDemoWallets = (props) => {

    const demoWallets = [{ chain: "WAX", name: "uz414.c.wam" },
    { chain: "WAX", name: "wwexhibition" },
    { chain: "WAX", name: "betsynftonly" },
    { chain: "WAX", name: "wwxyoshidrop" },
    { chain: "WAX", name: "wwxtreepeace" },
    { chain: "WAX", name: "wworkgallery" },
    { chain: "WAX", name: "iwadirectory" },
    { chain: "XTZ", name: "waxworks.tez" },
    { chain: "XTZ", name: "nerdcity.tez" },
    { chain: "ETH", name: "0x06faf4c761f23328cc2ec36f556c01cd7a4da8f1" },
    { chain: "ETH", name: "0xca1257ade6f4fa6c6834fdc42e030be6c0f5a813" },

    ];


    return <NavDropdown title="Demo Wallets" id="basic-nav-dropdown">
        {demoWallets && demoWallets.map((wallet, index) =>

            <LinkContainer key={`nuw${index}`} to={`${ChainPathLookup(wallet.chain)}${wallet.name}`}><NavDropdown.Item><Badge style={{ marginRight: '1rem' }} bg="secondary"> {wallet.chain}</Badge>{wallet.name}</NavDropdown.Item></LinkContainer>

        )}

        <NavDropdown.Divider />
        <NavDropdown.Item href={process.env.SESSION_SERVER_MANAGE_WALLETS}>
            Log in to view your own wallets!
        </NavDropdown.Item>
    </NavDropdown >;
}

export default React.memo(NavDemoWallets);