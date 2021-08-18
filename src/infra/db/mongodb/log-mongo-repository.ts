import { LogErrorRepository } from '@/data/protocols/log-error-repository'
import { MongoHelper } from './mongo-helper'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorsCollection = await MongoHelper.getCollection('errors')
    await errorsCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
