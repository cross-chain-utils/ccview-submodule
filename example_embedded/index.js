import { Fragment } from "react";
import store from './store';
import { Provider } from 'react-redux';

import { createRoot } from 'react-dom/client';
import DCLib, { Render_WAXWallet } from "../dclib";
import GGCardRender from "./GGCardRender";

const container = document.getElementById('dcembed');
const root = createRoot(container);
//console.log(root);
root.render(<Fragment>

    <Provider store={store}>
        <DCLib profile={{
            filebase_private_gateway: "https://MYGATEWAY.myfilebase.com",
            imageResizer: "PrivateGateway_IMG"
        }}>
            <Render_WAXWallet
                walletid="MYWAXWALLET.wam"
                customRender={<GGCardRender />}
                showOnly={['googoonsgen1']}
                expandItem={"acc-googoonsgen1"} />
        </DCLib>

    </Provider>

</Fragment>);
