const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const Gpio = require('onoff').Gpio; // Gpio class

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const _gpioState = {}

app.post('/api/toggle', async (req, res) => {
  const pinNumber = parseInt(req.body.pin);
  const pin = new Gpio(pinNumber, 'out');

  _gpioState[pin] = !_gpioState[pin];

  await pin.write(_gpioState[pin] | 0);

  res.json({success:true})
})


app.use('/', express.static(__dirname + '/static'))

app.listen(process.env.PORT || 5000);
