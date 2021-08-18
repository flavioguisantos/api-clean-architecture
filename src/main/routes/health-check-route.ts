import { Router } from 'express'
import { makeHealthCheckController } from '@/main/factories/health-check-factory'
import { adaptRoute } from '@/main/adapters/express-route-adapter'

export default (router: Router): void => {
  router.get('/health', adaptRoute(makeHealthCheckController()))
}
