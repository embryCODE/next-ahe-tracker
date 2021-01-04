import { HealthStatus } from '../types'

export function getHealthStatusColor(healthStatus: HealthStatus): string {
  switch (healthStatus) {
    case HealthStatus.Bad:
      return 'rgba(252, 95, 66, 0.6)'
    case HealthStatus.Warning:
      return 'rgba(238, 230, 87, 0.6)'
    case HealthStatus.Good:
      return 'rgba(46, 200, 144, 0.6)'
    default:
      return 'white'
  }
}
