# zkSync MultiSwap

Put private key in `.env` and update rpc endpoint in `deploy/main.ts`. Then:

```
yarn install
hh compile
```

This won't finish, and will prompt you to run:
```
hh deploy-zksync:libraries
```
This is intended behaviour and the zksync plugin will use the output it generates to deploy the OneInchDecoder library. It will also add a `libraries` field in `hardhat.config.ts` with the address of the deployed library. Delete this if you want to re-deploy libraries during testing

compile again:
```
hh compile
```
This time it will compile the other contracts

```
hh deploy-zksync
```
This will deploy and config all the contracts


Can do the above against a local in-memory node with:
```
hh node-zksync
```