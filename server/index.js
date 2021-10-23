const express = require("express");
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const axios = require('axios')

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
app.use(
    cors()
);
const url = 'https://my.veridocglobal.com/api/generateqr';
app.post("/api/generateqr", function(req, res) {
    console.log('got request');
    const apiKey = req.headers['apikey'];
    const payload = req.headers['payload'];
    const _data = 'data';
    console.log('request headers[payload]', payload);
    console.log('request body ', _data);
    const _headers = {
        'apikey': apiKey,
		'payload': payload,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    axios.post(url, _data, {
        headers: _headers
    }).then((response) => {
        console.log('response',response);
        res.json({ qrimage: response.qrimage, 
            message: response.message
        });
      });
      
  });
  
