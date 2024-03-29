import React, { Fragment } from "react";
import WifiIcon from "@mui/icons-material/Wifi";
import { GetElementColorForRSSI } from "./utils";


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
                  <br/>
                    Last fetched:
                    <br/>
                    {transmitter.time}
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
                                    color: GetElementColorForRSSI(network.rssi)
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
                                      color: GetElementColorForRSSI(network.rssi)
                                    }}
                                  >
                                    <WifiIcon fontSize="large" />{" "}
                                    {network.rssi >= -30
                                      ? "Excellent"
                                      : network.rssi < -30 &&
                                        network.rssi >= -50
                                      ? "Very good"
                                      : network.rssi < -50 &&
                                        network.rssi >= -70
                                      ? "Good"
                                      : network.rssi <= -70 &&
                                        network.rssi > -90
                                      ? "Low"
                                      : network.rssi <= -90
                                      ? "Very Low"
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
    );
  } else {
    return (
      <h3 style={{ marginTop: "2rem" }}>Waiting for server connection...</h3>
    );
  }
}
