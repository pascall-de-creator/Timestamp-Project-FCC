// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", (req, res) => {
  const givenDate = req.params.date
  let date

  // check if no date provided
  if (!givenDate) {
    date = new Date()
  } else {
    // check if unix time:
    const checkUnix = givenDate * 1
    date = isNaN(checkUnix) ? new Date(givenDate) : new Date(checkUnix)
  }

  //check if valid format
  if (date == "Invalid Date") {
    res.json({ error: "Invalid Date" })
  } else {
    const unix = date.getTime()
    const utc = date.toUTCString()
    res.json({ unix, utc })
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
