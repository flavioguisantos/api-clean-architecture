import 'module-alias/register'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { PostgresHelper } from '@/infra/db/postgres/postgres-helper'

PostgresHelper.connect(env.postgresUrl)
  .then(async () => {
    await PostgresHelper.createModels()
    MongoHelper.connect(env.mongoUrl)
      .then(async () => {
        const app = (await import('./config/app')).default
        app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
      })
      .catch(console.error)
  })
  .catch(console.error)
