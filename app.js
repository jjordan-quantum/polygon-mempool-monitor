const express = require('express')
var bodyParser = require('body-parser')

const app = express()
const port = 3000

// EXAMPLE REQUIRE CUSTOM MODULES
// =============================================================================
var calculator = require('./app_modules/calculator');
var monitor = require('./app_modules/monitor');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('-------------------------------------------------------');
  console.log('                       Monitor');
  console.log('-------------------------------------------------------');
  next(); // make sure we go to the next routes and don't stop here
});

// update_provider route
router.post('/update_provider', function(req, res) {
  console.log('# Request received to update provider')
  var provider = req.body.provider;
  console.log('Provider URL:');
  console.log(provider);
  var msg = monitor.update_provider(provider);
  res.json({ message: msg});
});

// start_monitor route
router.get('/start_monitor', function (req, res) {
  console.log('# Request received to start monitor')
  var msg = monitor.start_monitor();
  res.json({ message: msg});
});

// stop_monitor route
router.get('/stop_monitor', function (req, res) {
  console.log('# Request received to stop monitor')
  var msg = monitor.stop_monitor();
  res.json({ message: msg});
});

// update_params route
router.get('/update_params/:transactionSender/:routerAddress/:token0/:token1/:pair', function(req, res) {
  console.log('# Request received to update params');
  var transactionSender = req.params.transactionSender;
  var routerAddress = req.params.routerAddress;
  var token0 = req.params.token0;
  var token1 = req.params.token1;
  var pair = req.params.pair;

  // TODO - add the other params

  var msg = monitor.update_params(
    transactionSender, routerAddress, token0, token1, pair
  );
  res.json({ message: msg});
});

// get_update route
router.get('/get_update', function (req, res) {
  console.log('# Request received to get update')
  var transactions = monitor.get_update()
  res.json({ transactions });
})

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/monitor', router);

app.listen(port, () => {
  console.log(`<---------------------Mempool Monitor app running----------------------->`)
  monitor.start();
})
