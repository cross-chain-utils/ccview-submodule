
import { useSelector } from 'react-redux';


const CCWalletSelect = (props) => {


    // todo: add navlinks to future view pages
    // todo: list all wallets, sorted


    const userWallets = useSelector(state => state.user.ownedWallets);
    const userLoggedIn = useSelector(state => state.user.isLoggedIn);

    const testData = 'payload=' + encodeURIComponent(`${JSON.stringify({ payloadTest: "test", date: new Date() })}`)


    return <div>
        <hr />
        Logged In: {JSON.stringify(userLoggedIn)}        <hr />
        {JSON.stringify(userWallets)}
        <hr />


    </div>;
};

export default CCWalletSelect;