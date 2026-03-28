const { getTrackingByGuia } = require('../repositories/dataRepository');

function obtenerEstadoCompleto(guia) {
  const record = getTrackingByGuia(guia);
  if (!record) return null;
  return {
    guia: record.guia,
    estadoActual: record.estado,
    bodegaActual: record.bodegaActual,
    historial: record.historial
  };
}
module.exports = { obtenerEstadoCompleto };