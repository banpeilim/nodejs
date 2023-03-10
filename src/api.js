const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    hello: "Hi Lim Ban Pei @ Singapore",
  });
});

router.get("/lighton", (req, res) => {
  var bridgeIp = "192.168.1.108";

  // Set the ID of the light you want to control
  var lightId = "1";

  // Set the API key for your Hue bridge
  var apiKey = "HIjG0NftLDjrWmp45y-8Ew7u0HrOKXGz6MgQmBIA";

  // Function to turn the light on
  function turnOn() {
    $.ajax({
      type: "PUT",
      url:
        "http://" +
        bridgeIp +
        "/api/" +
        apiKey +
        "/lights/" +
        lightId +
        "/state",
      data: '{"on":true}',
      success: function () {
        console.log("Light turned on.");
      },
    });
  }

  turnOn();
});

app.use(`/.netlify/functions/api/name`, router);

module.exports = app;
module.exports.handler = serverless(app);
