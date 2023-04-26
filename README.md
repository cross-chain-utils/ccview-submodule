# DANGER -- WORK IN PROGRESS -- DO NOT USE IN PRODUCTION PROJECTS

NO LICENSE

This code is currently pre-alpha and cannot be used by anyone other than the author (NTBooks) until it is released.  
I fully intend to release this as open source under a permissive licence once it's stable but it would be unwise to use this is any production projects right now.  
If you would like permission to use this library in your project please visit https://waxworks.io and fill out the contact form or contact @Tantilloon on Twitter.

# OK then why isn't it private?

I needed to put this in a public submodule while I develop with it because it's a SDK. If you're interested in what I'm doing please reach out! Eventually this will be made available.

# ccview-submodule

This is a work in progress multichain wallet viewer. It works as a static website in react and only consumes public APIs.

I've tried a few times to make this into an npm package but because it slots in with redux and has so many dependencies it remains a project for another day.

# limitations

This viewer has a few special rules to make sure it works when hosted by IPFS:

1. It can only consume public APIs -- this is extremely limiting as most NFT apis require either a proxy (to enforce server rate limiting) or an API Key (for billing) which can't be shared with the client. BYOAPI may be added in the future (bring your own API Key for either NFTScan or Alchemy if that improves the user experience significantly.) Until then, implementing a proxy if enhanced data is required is something left to individual projects (since they can set up CORS rules for their client/server to prevent abuse.)
2. This viewer will provide example implementations for multiple chains but it's based on APIs and sometimes they change their rules. Examples may be out of date.
3. Opportunities to utilize a private server will be marked with HOOK in the source code so it's clear why the dimished functionality exists.

NOTE: deploy this on a private gateway if you don't want your profile settings to be available to every site on the IPFS host.
