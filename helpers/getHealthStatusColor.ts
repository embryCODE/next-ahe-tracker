import { HealthStatus } from '../types'

export function getHealthStatusColor(healthStatus: HealthStatus): string {
  switch (healthStatus) {
    case HealthStatus.Bad:
      return 'rgba(252, 95, 66, 0.6)'
    case HealthStatus.Good:
    case HealthStatus.ExtraCredit:
      return 'rgba(46, 200, 144, 0.6)'
    default:
      return 'white'
  }
}
