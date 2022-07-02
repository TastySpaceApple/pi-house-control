const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const Gpio = require('onoff').Gpio; // Gpio class

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/toggle', async (req, res) => {
  const pinNumber = parseInt(req.body.pin);
  const pin = new Gpio(pinNumber, 'out');
  
  const value = await pin.read();
  await pin.write(value ^ 1);

  res.json({success:true})
})

app.use('/', express.static(__dirname + '/static'))

app.listen(process.env.PORT || 5000);