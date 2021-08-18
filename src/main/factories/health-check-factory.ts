import { Controller } from '@/presentation/protocols'
import { HealthCheckController } from '@/presentation/controllers/health-check'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { LogMongoRepository } from '@/infra/db/mongodb/log-mongo-repository'

export const makeHealthCheckController = (): Controller => {
  const healthCheckController = new HealthCheckController()
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(healthCheckController, logMongoRepository)
}
