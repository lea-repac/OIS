
/**
 *
 * @param x1, x koordinata prve točke
 * @param y1, y koordinata prve točke
 * @param x2, x koordinata druge točke
 * @param y2, y koordinata druge točke
 * @return {razdalja med koordinatama v metrih}
 */
function haversineOddaljenostTock(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const p1 = lat1 * Math.PI/180;
  const p2 = lat2 * Math.PI/180;
  const deltaLon = lon2 - lon1;
  const deltaLambda = (deltaLon * Math.PI) / 180;
  const d = Math.acos(
      Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos(deltaLambda),
  ) * R;
  return d;
}