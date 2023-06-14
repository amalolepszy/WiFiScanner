export function GetElementColorForRSSI(rssi) {
  return rssi >= -30
    ? "#00CCCC"
    : rssi < -30 && rssi >= -50
    ? "#2ECC71"
    : rssi < -50 && rssi >= -70
    ? "#F4D03F"
    : rssi <= -70 && rssi > -90
    ? "#F39C12"
    : rssi <= -90
    ? "#FA1D0F"
    : "undefined";
}