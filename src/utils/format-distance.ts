export function formatDistance(distance: number): string {
  if (distance >= 1000) {
    const distanceKm = (distance / 1000).toFixed(2)
    return distanceKm + ' km'
  } else {
    return distance.toFixed(2) + ' m'
  }
}
