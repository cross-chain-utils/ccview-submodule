import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import { useSelector } from "react-redux";
import LoggedOut from "./LoggedOut";
import Debug from "./Debug";
import Gallery from "./Gallery";
import Features from "./Features";
import WAXWallet from "./WAXWallet";
import XTZWallet from "./XTZWallet";
import ETHWallet from "./ETHWallet";

const RouteIndex = () => {
    const userLoggedIn = useSelector(state => state.user.isLoggedIn);
    return <Routes>
        <Route path="/" element={userLoggedIn ? <Home /> : <LoggedOut />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/debug" element={<Debug />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/features" element={<Features />} />
        <Route path='/cctestwax/:walletid' element={<WAXWallet />} />
        <Route path='/ccwax/:walletid' element={<WAXWallet />} />
        <Route path='/cceth/:walletid' element={<ETHWallet />} />
        <Route path='/ccxtz/:walletid' element={<XTZWallet />} />
        <Route path='/cc/:hostwalletid' element={<Home />} />
    </Routes>;
}

export default RouteIndex;