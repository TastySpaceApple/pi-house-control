const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const rpio = require('rpio');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const _gpioState = {}

app.post('/api/toggle', (req, res) => {
  const pin = parseInt(req.body.pin);
  if(!(pin in _gpioState))
    rpio.open(pin, rpio.OUTPUT, rpio.LOW);

  _gpioState[pin] = !_gpioState[pin];
  console.log(pin, _gpioState[pin]);
  rpio.write(pin, _gpioState[pin] ? rpio.HIGH : rpio.LOW)
  res.json({success:true})
})

app.use('/', express.static(__dirname + '/static'))

app.listen(process.env.PORT || 5000);