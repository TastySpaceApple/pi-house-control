const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const rpio = require('rpio');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let gpio_state = {}

app.post('/api/toggle', (req, res) => {
  const pin = parseInt(req.body.pin);
  if(typeof gpio_state == 'undefined')
    rpio.open(port, rpio.OUTPUT, OFF);

  gpio_state[pin] = !gpio_state;
  rpio.write(pin, gpio_state[pin] ? rpio.HIGH : rpio.LOW)
  res.json({success:true})
})

app.use('/', express.static(__dirname + '/static'))

app.listen(process.env.PORT || 5000);