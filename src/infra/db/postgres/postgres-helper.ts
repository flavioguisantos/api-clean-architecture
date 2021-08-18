import { Sequelize } from 'sequelize'
import { readdirSync } from 'fs'
import { join } from 'path'

export const PostgresHelper = {
  client: null as Sequelize,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await new Sequelize(uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getClient (): Promise<Sequelize> {
    try {
      await this.client?.authenticate()
    } catch (error) {
      await this.connect(this.uri)
    } finally {
      return this.client
    }
  },

  async getModel (modelName: string): Promise<any> {
    try{
      await this.client?.authenticate()
    } catch (error) {
      await this.connect(this.uri)
      await this.createModels()
    } finally {
      const model = await this.client.models[modelName]
      if(model) {
        return model
      }
      return null
    }
  },
  
  async createModels(): Promise<void> {
    readdirSync(join(__dirname, '/../postgres-models')).map(async file => {
      if (!file.includes('.test.') && !file.endsWith('.map')) {
        (await import(`../postgres-models/${file}`)).default(this.client)
      }
    })
  }
}
