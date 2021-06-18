const Web3 = require('web3')
const fs = require('fs')
const abiDecoder = require('abi-decoder'); // NodeJS


// VARIABLES FOR TESTING ON ROPSTEN
// =============================================================================

//const web3 = new Web3('https://ropsten.infura.io/v3/5595014ec4194f70bb6ef58f1cf3e9fc');
var web3 = new Web3('wss://late-green-field.matic.quiknode.pro/16222f7b09b4dfd6915812422ae62e81f5183c70/')
var UniswapV2RouterAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

// OTHER REQUIRED VARIABLES
// =============================================================================

const BN = web3.utils.BN;

var transactionSender = false;
var routerAddress = false;
var token0 = false;
var token1 = false;
var pair = false;

var transactions = [];
var confirmed = [];


var ERC20ABI = fs.readFile('./app_modules/abis/UniswapV2ERC20.json', (err, data) => {
    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {
        // parse JSON string to JSON object
        const parsed = JSON.parse(data);
        //console.log(parsed);
        return parsed;
    }
});

var PairABI = fs.readFile('./app_modules/abis/UniswapV2Pair.json', (err, data) => {
    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {
        // parse JSON string to JSON object
        const parsed = JSON.parse(data);
        //console.log(parsedhttps://eth.getblock.io/ropsten/?api_key=2aebf3b3-089c-4487-b570-9c50991bff2b);
        return parsed;
    }
});

var FactoryABI = fs.readFile('./app_modules/abis/UniswapV2Factory.json', (err, data) => {
    if (err) {
        consodecodedDatale.log(`Error reading file from disk: ${err}`);
    } else {
        // parse JSON string to JSON object
        const parsed = JSON.parse(data);
        //console.log(parsed);
        return parsed;
    }
});

var RouterABI = fs.readFile('./app_modules/abis/UniswapV2Router02.json', (err, data) => {
    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {
        // parse JSON string to JSON object
        const parsed = JSON.parse(data);
        //console.log(parsed);
        return parsed;
    }
});

// FLAGS FOR CONTROL MECHANISMS
// =============================================================================

var pause = true;
var kill = false;
var reload = false;
var polling_interval = 1000;  // set to 1 second for testing
var update_message = "";


// EXPORT FUNCTIONS
// =============================================================================


exports.update_provider = function (provider) {
  console.log("Checking provider...");
  new_web3 = new Web3(provider);

  new_web3.eth.getBlockNumber()
  .then( () => {
    web3 = new_web3;
    msg = "Provider updated to: "+provider
    console.log(msg);
    update_message = msg;
    //update_provider_success();
  }).catch( (error) => {
    msg = "Invalid provider: "+provider
    console.log(msg);
    console.log(error);
    update_message = msg
    //update_provider_error();
  });

  return "Checking provider...";
}

exports.start_monitor = function () {
  pause = false;

  checkFilter();

  console.log('Monitor started');
  return 'Monitor started';
};

exports.stop_monitor = function () {
  pause = true;
  console.log('Monitor stopped');
  return 'Monitor stopped';
};

// TODO - update with the rest of the params
exports.update_params = function (

  _transactionSender, _routerAddress, _token0, _token1, _pair) {

  if(_transactionSender != '0') {
    transactionSender = web3.utils.toChecksumAddress(_transactionSender).toLowerCase();
  }

  if(_routerAddress != '0') {
    routerAddress = web3.utils.toChecksumAddress(_routerAddress).toLowerCase();
  }

  if(_token0 != '0') {
    token0 = web3.utils.toChecksumAddress(_token0).toLowerCase();
  }

  if(_token1 != '0') {
    token1 = web3.utils.toChecksumAddress(_token1).toLowerCase();
  }

  if(_pair != '0') {
    pair = web3.utils.toChecksumAddress(_pair).toLowerCase();
  }

  console.log("Updated parameters");

  log_params();

  /*
  const balance = web3.eth.getBalance(account).then(response => {
    message('Snipe', 'Account Balance: ' + response);
    message('Snipe', 'Starting swap function....');
    // review this behaviour
    //swap(tokenIn, tokenOut, fee, recipient, deadline, amountIn, amountOutMinimum, sqrtPriceLimitX96, value, gasPrice, gas);
  });
  */
  return 'Params updated for monitor'
}

function log_params() {

  console.log("transactionSender: ", transactionSender);
  console.log("routerAddress: ", routerAddress);
  console.log("token0: ", token0);
  console.log("token1: ", token1);
  console.log("pair: ", pair);
}

exports.get_update = function () {
  // TODO - Get update data and return in JSON response
  console.log('# Processing Update');
  return transactions;
};

// Starts the monitor monitoring loop
// Only performs checks and snipes if pause is set to false by start_monitor
exports.start = function () {
  pause = true;
  runner();
  console.log("# Started asynchronous Monitor function.");
  console.log("# Paused and awaiting commands....");
  return 'Started Monitor App.  Paused and awaiting commands....'
};

async function runner() {

  while (true) {
    while (true) {
      await monitoring();
      if (kill) {
        kill = false;
        break;
      }
    }
    if(reload) {
      reload = false;
      break
    }
  }
  return false;
};

function monitoring() {
  return new Promise((resolve, reject)=>{
    //console.log("monitoring function executed!")
    //console.log("# pause: " + pause);
    if (!pause) { checkTransactions(); }
    setTimeout(()=>{
      //console.log("in timeout...");
      resolve();
    } , 100
    );
  })
}


function checkFilter() {

  var subscription = web3.eth.subscribe('pendingTransactions', (err, res) => {
    if (err) console.error(err);
  });

  const uniRouter = UniswapV2RouterAddress.toLowerCase();

  fs.readFile('./app_modules/abis/UniswapV2Router02.json', (err, data) => {
      if (err) {
          console.log(`Error reading file from disk: ${err}`);
      } else {
          // parse JSON string to JSON object
          var RouterABI = JSON.parse(data);
          abiDecoder.addABI(RouterABI);
          getData();
      }
  });


  function getData() {

    var addresses = [];

    if (transactionSender) {
      addresses.push(transactionSender);
    }
    if (token0) {
      addresses.push(token0);
    }
    if (token1) {
      addresses.push(token1);
    }
    if (pair) {
      addresses.push(pair);
    }



    subscription.on('data', (txHash) => {


      setTimeout(async () => {
        try {
          let tx = await web3.eth.getTransaction(txHash);
          //console.log('Transaction Hash: ',txHash )

          if(tx && tx.to) {
            if(addresses.length == 0) {
              if(tx.to.toLowerCase() == routerAddress) {
                console.log('-------------------------------------------------');
                console.log('PENDING TRANSACTION FOUND!!!!');
                console.log('-------------------------------------------------');
                console.log(tx);
                transactions.push(txHash);
                decodedData = abiDecoder.decodeMethod(tx.input);

                console.log('Input: ', decodedData);
              }
            }


            else if(addresses.includes(tx.from.toLowerCase())) {
              console.log('-------------------------------------------------');
              console.log('PENDING TRANSACTION FOUND!!!!');
              console.log('-------------------------------------------------');
              console.log(tx);
              transactions.push(txHash);
              if(tx.to.toLowerCase() == routerAddress) {
                if(tx.input) {

                  //console.log(tx);
                  //console.log('Transaction Hash: ',txHash );
                  decodedData = abiDecoder.decodeMethod(tx.input);

                  console.log('Input: ', decodedData);

                }
              //console.log(tx);
              //console.log('Transaction Hash: ',txHash );
              //console.log('Transaction Input: ',tx.input );// 0 when transaction is pending
              }
            }

          }

        } catch (err) {
          console.error(err);
        }
      }, 10);
    });
  }

  /*
  var subscription = web3.eth.subscribe('pendingTransactions', function(error, result){
    if (!error)
        console.log(result);
  })
  .on("data", function(transaction){
      console.log(transaction);
  });

  web3.eth.getPendingTransactions()
  .then(console.log)
  .catch( (error) => {
    console.log(error);
  });
  */
}

async function checkTransactions() {

  var transaction_set = transactions.slice();

  //console.log('checking txs');

  for (i = 0; i < transaction_set.length; i++) {
    let txHash = transaction_set[i];
    let tx = await web3.eth.getTransaction(txHash);
    if (confirmed.includes(txHash))  {
      const index = transactions.indexOf(txHash);
      if (index > -1) {
        transactions.splice(index, 1);
      }
      continue;
    }

    if(tx && tx.transactionIndex) {
      console.log('#######################################################');
      console.log('#######################################################');
      console.log('TRANSACTION CONFIRMED!!!!');
      console.log('#######################################################');
      console.log('#######################################################');
      //console.log(tx);
      //console.log('Transaction Hash: ',txHash );
      decodedData = abiDecoder.decodeMethod(tx.input);
      tx.input = 'see below';
      console.log(tx);
      console.log('Input: ', decodedData);
      const index = transactions.indexOf(txHash);
      confirmed.push(txHash);
      if (index > -1) {
        transactions.splice(index, 1);
      }
    }
  }
  //console.log('done checking txs');
}

// INTERNAL FUNCTION FOR LOGGIN MESSAGES
// =============================================================================

function message (function_name, message) {
  console.log('#----------------------------------------------------------');
  console.log('# ' + function_name + ' function');
  console.log('#----------------------------------------------------------');
  console.log('#')
  console.log('# ' + message);
  console.log('#')
}
