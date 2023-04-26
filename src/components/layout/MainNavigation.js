import React from 'react';
import CCLogin from '../cc-custom/CCLogin';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import NavUserWallets from './NavUserWallets';
import NavDemoWallets from './NavDemoWallets';

const logoFile = require('../../../public/CCView.svg');

const MainNavigation = () => {


    const userState = useSelector(state => state.user);

    // console.log("MAIN NAVIGATION", userState);




    return (<Navbar bg="dark" variant="dark" expand="lg" >
        <Container>
            <LinkContainer to="/">
                <Navbar.Brand> <img
                    src={logoFile}
                    width="80"
                    height="40"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                /></Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">

                    {userState.isLoggedIn ?
                        <NavUserWallets /> :
                        <NavDemoWallets />



                    }


                    <LinkContainer to="/gallery">
                        <Nav.Link>Gallery</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/profile">
                        <Nav.Link>Profile</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/features">
                        <Nav.Link>Features</Nav.Link>
                    </LinkContainer>

                </Nav>
                <Nav>
                    <LinkContainer to="/debug">
                        <Nav.Link>Debug</Nav.Link>
                    </LinkContainer>
                    {process.env.SESSION_SERVER_ENABLED === "true" &&
                        <Navbar.Text>

                            <CCLogin
                                verbose="false"
                                api_root={process.env.API_ROOT}
                                lib_root={process.env.LIB_ROOT}
                                pubkey={process.env.CLIENT_PUBKEY}
                                webhook_pubkey={process.env.WEBHOOK_PUBKEY}
                                scale="0.6"
                                logotype="svg"
                                useBootstrap="true"
                                shadeLoading="true"
                            />
                        </Navbar.Text>
                    }
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>)


};

export default MainNavigation;