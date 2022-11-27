const mqtt = require("mqtt");
const mongoose = require("mongoose");
const express = require("express");
const moment = require("moment");
const path = require("path");

// MQTT Data
const host = "localhost";
const mqttPort = "1883";
const clientId = `mqtt_service`;
const topic = "wifiscanner";

// Express
const app = express();

//serve static files
const root = path.join(__dirname, "build");
app.use(express.static(root));

// Mongoose
mongoose.connect("mongodb://localhost:27017/wifiscanner");

const networkSchema = {
  time: Date,
  device_index: Number,
  network_amount: Number,
  network_array: [
    {
      network_index: {
        type: Number,
        required: true,
      },
      ssid: {
        type: String,
        required: true,
      },
      rssi: {
        type: Number,
        required: true,
      },
    },
  ],
};

const Network = mongoose.model("Network", networkSchema);

// Connect to MQTT
const connectUrl = "mqtt://" + host + ":" + mqttPort;

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: "rpi-broker",
  password: "rpi-broker!",
  reconnectPeriod: 1000,
});

client.on("connect", () => {
  console.log("Connected");
  client.subscribe([topic], () => {
    console.log("Subscribed to topic " + topic);
  });
});

// Receive data
client.on("message", (topic, payload) => {
  if (payload) {
    try {
      jsonData = JSON.parse(payload);
    } catch (e) {
      console.log(e);
    }
  }

  const now = moment();
  console.log(now.subtract(10, "seconds").format());

  // find lists not older than 10 seconds coming from the same device index
  Network.find(
    {
      device_index: jsonData.device_index,
      time: { $gte: now.subtract(10, "seconds").format() },
    },
    function (err, foundList) {
      if (foundList.length > 0) {
        console.log("Item lready exists in db");
      } else {
        const network = new Network({
          time: now,
          device_index: jsonData.device_index,
          network_amount: jsonData.network_amount,
          network_array: jsonData.network_array,
        });
        console.log(network);
        network.save();
      }
    }
  );
});

app.get("/transmitter/:device_index", (req, res) => {
  //get 1 MOST RECENT entry with a device index
  Network.find({ device_index: req.params.device_index })
    .sort({ _id: -1 })
    .limit(1)
    .exec(function (err, transmitterData) {
      if (err) throw err;
      if (transmitterData) {
        res.end(JSON.stringify(transmitterData));
      } else {
        res.end();
      }
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
