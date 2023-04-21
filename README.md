# Run the following to start the app in local environment


1. Install the dependencies:

```sh
# install using NPM or Yarn
npm install

# or

yarn install
```

2. Start the local Hardhat node

```sh
npx hardhat node
```

3. With the network running, deploy the contracts to the local network in a separate terminal window

```sh
npx hardhat run scripts/deploy.js --network localhost
```

4. Start the app

```
npm run dev
```