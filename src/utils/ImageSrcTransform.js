const ImageSrcTransform = (imageResizer, privateGateway, src, width) => {
    const RenderEngine = imageResizer;
    const privateGatewayState = privateGateway;
    const ipfs = /(Qm[1-9A-Za-z]{44}[^\"]*)/g;
    const imgIPFS = src?.match(ipfs);
    let newSrc = '';

    // TODO: if more proxies get added this moves below
    const proxyBase = `https://wsrv.nl/?url=${imgIPFS ? `${process.env.IPFS1}${src}` : src}&w=${width}`;

    switch (RenderEngine) {
        case 'PrivateGateway_IMG':
            // use gateway for IPFS but use image resizer for anything else
            newSrc = imgIPFS ? `${privateGatewayState}/ipfs/${imgIPFS}?img-onerror=redirect&img-fit=scale-down&img-anim=true&img-width=${width}` :
                proxyBase;
            break;
        case 'FreeProxy_IMG':
            // Just use image resizer
            newSrc = proxyBase;
            break;
        case 'NoProxy_IMG':
            // NOT SAFE
            newSrc = imgIPFS ? `${process.env.IPFS1}${src}` : src;
            break;
    }
    return newSrc;
}


export default ImageSrcTransform;