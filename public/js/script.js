const apiKeyInput = document.querySelector('#api-key-input');
const nodeURLInput = document.querySelector('#node-url-input');
const transactionSenderInput = document.querySelector('#sender-address-input');
const routerAddressInput = document.querySelector('#router-address-input');
const token0Input = document.querySelector('#first-token-input');
const token1Input = document.querySelector('#second-token-input');
const pairInput = document.querySelector('#pair-address-input');

const updateNodeButton = document.querySelector('#update-node-button');
const updateSenderButton = document.querySelector('#update-sender-button');
const updateRouterButton = document.querySelector('#update-router-button');
const updateToken0Button = document.querySelector('#update-first-token-button');
const updateToken1Button = document.querySelector('#update-second-token-button');
const updatePairButton = document.querySelector('#update-pair-button');
const startMonitorButton = document.querySelector('#start-monitor-button');

const statusArea = document.querySelector('#pending-transaction-area');


// BUTTON EVENT LISTENERS
// #############################################################################

updateNodeButton.addEventListener('click', () => {
  updateNode();

  //TESTING
  //update_status('Update Node Button clicked!');
});

startMonitorButton.addEventListener('click', () => {
  updateParams();
  startMonitor();
  //TESTING
  //update_status('Start Monitor Button clicked!');
});

updatePairButton.addEventListener('click', () => {
  //getUpdate();
  //TESTING
  //update_status('Start Monitor Button clicked!');
});

// ACTION FUNCTIONS
// #############################################################################

function updateNode() {

  var _provider = nodeURLInput.value;
  message('Provider: '+_provider)

  const data = { provider: _provider };

  fetch('http://localhost:3000/monitor/update_provider', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Response:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function updateParams() {

  var transactionSender = transactionSenderInput.value;
  var routerAddress = routerAddressInput.value;
  var token0 = token0Input.value;
  var token1 = token1Input.value;
  var pair = pairInput.value;

  if(!transactionSender) {
    transactionSender = '0';
  }
  if(!routerAddress) {
    routerAddress = '0';
  }
  if(!token0) {
    token0 = '0';
  }
  if(!token1) {
    token1 = '0';
  }
  if(!pair) {
    pair = '0';
  }

  // TODO - include others

  var url = 'http://localhost:3000/monitor/update_params'
  url = url+'/'+transactionSender+'/'+routerAddress+'/'+token0+'/'+token1+'/'+pair;

  fetchMonitor(url);
}

function getUpdate() {
  var url = 'http://localhost:3000/monitor/get_update'
  fetchMonitor(url)
}

function fetchMonitor(url) {
  // abstraction for standard fetch operation
  fetch(url)
  .then( response => response.json() )
  .then( response => {
    update_status(JSON.stringify(response));
    //console.log(response);
  });
}

function startMonitor() {
  var url = 'http://localhost:3000/monitor/start_monitor'
  fetchMonitor(url)
}




function update_status(_message) {

  //let current = new Date();
  //let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
  //let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
  //let dateTime = cDate + ' ' + cTime;
  //console.log(dateTime);

  const status = statusArea.value;
  statusArea.value = _message + '\n' + status
  //statusArea.value = dateTime + ": " + _message + '\n' + status;
  message(_message);
};

function message(message) {
  console.log(message);
};
