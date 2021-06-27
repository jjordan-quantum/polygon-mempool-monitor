# polygon-mempool-monitor

This is a mempool monitor nodeJS app that can be used to monitor pending transactions in Ethereum or other chains forked from Ethereum, such as BSC or Polygon.

The app comes with the ability to decode transaction input data for any UniswapV2 clone router, as well as Uniswap's V3 SwapRouter and NonfungiblePositionManager.

Note:  The only reason the name is 'polygon-mempool-monitor' is because it was originally created to monitor the mempool on Polygon, but I realized it will work with other chains.

The steps to get this working are simple...

Make sure you have nodejs installed, then clone the repo:

```
git clone https://github.com/jjordan-quantum/polygon-mempool-monitor.git
```

Then cd into the new directory:

```
cd polygon-mempool-monitor
```

Then initialize an node project and install dependencies:

```
npm init -y
npm install
```

Run the app:

```
npm start
```

The app will serve a static page over port 3000 that you can open in a browser window with http://localhost:3000.

This page will have the following elements, some of which can be ignored for now:
(Keep in mind this is a work in progress)

**API KEY** - ignore

**Node URL** - You must copy and paste a valid JSON-RPC websocket endpoint for the node that will be your point of connection to the desired blockchain.  The endpoint should be of the form 'wss://......'

**Transaction Sender** - This will be the 'from' address that the monitor is filtering for.  Current behaviour of the app will show ALL tx's coming from this address, even if they are not to the specified contracts.

**Router Address** - This can be the contract address for any UniswapV2Router02 clone on the chain specified by the NodeURL.  Alternatively, this can be the address of Uniswap's V3 SwapRouter or NonfungiblePositionManager contract, if the network for the given NodeURL is Ethereum mainnet.

**Token Address, Token Address, and Pair Address** are actually just being used as additional 'from' addresses to filter for, so don't be confused as to why you aren't getting tx's involving the specified tokens if you provide values in those fields.

# Instructions

1.  Once you have copied and pasted your endpoint into Node URL, press the "Update Node" button.  Pay attention to the terminal/console where your nodejs app is running...you will get a message saying the provider has been updated.
2.  Once you have pasted a desired target router address or any of the aforementioned contract addresses in the "Router Address" field, press the "Start Monitor" button and watch the console/terminal window closely where the nodejs app is running.

Any questions or problems feel free to hit me on telegram @jayjorgen

GOOD LUCK!
