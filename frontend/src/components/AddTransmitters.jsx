import React, { useState, useCallback, useEffect } from "react";
import { map, evolve } from "ramda";
import { initialTransmitters, initialPos } from "./initialData";

import Viewer from "./Viewer";
import WifiIcon from "@mui/icons-material/Wifi";
import SensorDetails from "./SensorDetails";

const INITIAL_MODE = "3d";

export default function AddTransmitters(props) {
  const [space, setSpace] = useState();
  const [mode, setMode] = useState(INITIAL_MODE);

  const [ssid, setSsid] = useState("");

  const [transmitters, setTransmitters] = useState([initialTransmitters]);

  // fetch most recent data for each transmitter
  const fetchTransmitters = async () => {
    const newData = [];
    for (let i = 1; i <= 5; i++) {
      const data = await fetch("/transmitter/" + i);
      const items = await data.json();
      if (items[0]) {
        // if there's an item, put it into the newData
        newData.push(items[0]);
      } else {
        // if there isn't, use initial value
        newData.push(initialTransmitters[i - 1]);
      }
    }
    console.log(newData);
    setTransmitters(newData);
  };

  function handleSetSsid(event) {
    setSsid(event.target.value);
  }

  // set rssi for each transmitter
  function handleSsidSubmit() {
    let newRssiArray = [...transmitterPos];
    let wantedSsid = ssid;

    newRssiArray.map((newRssi, index) => {
      const foundArr = transmitters[index].network_array.find((element) => {
        return element.ssid === wantedSsid;
      });
      if (foundArr) {
        return (newRssi.rssi = foundArr.rssi);
      } else {
        return (newRssi.rssi = null);
      }
    });

    setTransmitterPos(newRssiArray);
  }

  const [transmitterPos, setTransmitterPos] = useState(initialPos);

  function handleUpdatePosition(transmitter_index, coordinates) {
    let newPos = [...transmitterPos];
    newPos[transmitter_index].position = coordinates;
    setTransmitterPos(newPos);
  }

  // memoize so Viewer render once only (wrapped in memo)
  const onReady = useCallback((space) => setSpace(space), []);

  const onModeChange = useCallback(setMode, []);

  const noElevationIn2D = useCallback(
    (value) => (mode === "3d" ? value : 0),
    [mode]
  );
  const autoElevation = map(
    evolve({ position: { elevation: noElevationIn2D } })
  );

  // // fetch transmitter data
  // useEffect(() => {
  //   fetchTransmitters();
  // }, []);

  //fetch transmitter data every time interval
  useEffect(() => {
    const interval = setInterval(() => {
      fetchTransmitters();
    }, 5000); //refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  // render elements
  useEffect(() => {
    if (!space) {
      return;
    }

    space.addDataLayer({
      id: "transmitter",
      type: "point",
      data: autoElevation(transmitterPos),
      diameter: 1,
      anchor: "bottom",
      color: (d) =>
        d.rssi >= -70
          ? "#2ECC71"
          : d.rssi < -70 && d.rssi >= -85
          ? "#F4D03F"
          : d.rssi <= -86 && d.rssi > -100
          ? "#F39C12"
          : d.rssi <= -100
          ? "#FA1D0F"
          : "undefined",

      tooltip: (d) => {
        return "Transmitter-" + d.transmitterId + " RSSI: " + d.rssi;
      },
      onDrop: ({ data, position }) => {
        handleUpdatePosition(data.transmitterId - 1, position);
      },
    });
  }, [space, transmitterPos, autoElevation]);

  return (
    <div className="container-fluid measure-container">
      <div className="row viewer-row">
        <div className="col-lg-7">
          <Viewer
            mode={INITIAL_MODE}
            onReady={onReady}
            onModeChange={onModeChange}
            spaceID={props.spaceID}
            clientToken={props.clientToken}
          />
        </div>
        <div className="col-lg-5">
          <div>
            {!space && (
              <div className="start-viewer-heading-div">
                <h2 className="start-viewer-heading">
                  Please start the viewer before measuring.
                  <br />
                  👈
                </h2>
              </div>
            )}
            {space && (
              <div className="container">
                <h3>Enter network SSID:</h3>
                <div className="input-group mb-3">
                  <input
                    onChange={handleSetSsid}
                    type="text"
                    placeholder="my-ssid"
                    value={ssid}
                    className="form-control"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={handleSsidSubmit}
                    >
                      Add
                    </button>
                  </div>
                </div>
                <h3>Set transmitter position:</h3>
                {transmitterPos.map((tPos, index) => {
                  return (
                    <div className="container">
                      <div className="row add-transmitter">
                        <div className="col" style={{ margin: "auto" }}>
                          <h5
                            style={{
                              color:
                                tPos.rssi >= -70
                                  ? "green"
                                  : tPos.rssi < -70 && tPos.rssi >= -85
                                  ? "gold"
                                  : tPos.rssi < -85 && tPos.rssi > -100
                                  ? "orange"
                                  : tPos.rssi <= -100
                                  ? "red"
                                  : "undefined",
                            }}
                          >
                            Transmitter-{tPos.transmitterId}
                          </h5>
                        </div>
                        <div className="col" style={{ margin: "auto" }}>
                          <div
                            style={{
                              color:
                                tPos.rssi >= -70
                                  ? "green"
                                  : tPos.rssi < -70 && tPos.rssi >= -85
                                  ? "gold"
                                  : tPos.rssi < -85 && tPos.rssi > -100
                                  ? "orange"
                                  : tPos.rssi <= -100
                                  ? "red"
                                  : "undefined",
                            }}
                          >
                            <WifiIcon fontSize="large" />
                          </div>
                        </div>
                        <div className="col" style={{ margin: "auto" }}>
                          <h6>RSSI:</h6>
                          <p>{tPos.rssi}</p>
                        </div>
                        <div className="col" style={{ margin: "auto" }}>
                          <button
                            className="btn btn-outline-secondary position-button"
                            onClick={() => {
                              space.enablePickingMode({
                                onPick: ({ coordinates }) => {
                                  handleUpdatePosition(index, coordinates);
                                  space.disablePickingMode();
                                },
                              });
                            }}
                          >
                            Set position
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <SensorDetails transmitters={transmitters} />
    </div>
  );
}
