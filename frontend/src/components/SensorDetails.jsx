import React, { Fragment } from "react";
// import { initialTransmitters as transmitters } from "./initialData";
import WifiIcon from "@mui/icons-material/Wifi";

export default function SensorDetails(props) {
  if (props.transmitters.length === 5) {
  return (
    <div>
      <div className="row">
        <div className="col-lg-12 details-heading-col">
          <div className="details-heading-div">
            <h2 className="details-heading">Sensor details 👇:</h2>
          </div>
        </div>
      </div>
      <div className="row">
        {props.transmitters.map((transmitter, index) => {
          return (
            <Fragment key={index}>
              <div className="col transmitter-col">
                <h3>Transmitter-{transmitter.device_index}</h3>
                <span>
                  Found networks:
                  <br />
                  {transmitter.network_amount}
                </span>
                <div className="network-list">
                  {transmitter.network_array.map((network, _index) => {
                    return (
                      <Fragment key={_index}>
                        <div className="network">
                          <hr />
                          <div className="row row-cols-2">
                            <div className="col">
                              <h5
                                style={{
                                  color:
                                    network.rssi >= -70
                                      ? "green"
                                      : network.rssi < -70 &&
                                        network.rssi >= -85
                                      ? "gold"
                                      : network.rssi < -86 &&
                                        network.rssi > -100
                                      ? "orange"
                                      : network.rssi <= -100
                                      ? "red"
                                      : "undefined",
                                }}
                              >
                                SSID: {network.ssid} <br />
                                RSSI: {network.rssi}
                              </h5>
                            </div>
                            <div className="col">
                              <div style={{ textAlign: "center" }}>
                                <h4
                                  style={{
                                    color:
                                      network.rssi >= -70
                                        ? "green"
                                        : network.rssi < -70 &&
                                          network.rssi >= -85
                                        ? "gold"
                                        : network.rssi < -86 &&
                                          network.rssi > -100
                                        ? "orange"
                                        : network.rssi <= -100
                                        ? "red"
                                        : "undefined",
                                  }}
                                >
                                  <WifiIcon fontSize="large" />{" "}
                                  {network.rssi >= -70
                                    ? "Excellent"
                                    : network.rssi < -70 && network.rssi >= -85
                                    ? "Good"
                                    : network.rssi < -86 && network.rssi > -100
                                    ? "Fair"
                                    : network.rssi <= -100
                                    ? "Poor"
                                    : "undefined"}
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  )} else {
    return <h3>Loading...</h3>
  }
}
