const data = require('../../data/trackingData.json');
function getTrackingByGuia(guia) {
  return data.find((row) => row.guia === guia);
}
module.exports = { getTrackingByGuia };
