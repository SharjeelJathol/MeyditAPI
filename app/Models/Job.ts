import { BaseModel, HasMany, beforeCreate, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { randomUUID } from 'crypto'
import Sample from './Sample'
import Quote from './Quote'

export default class Job extends BaseModel {
  
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string
  
  @beforeCreate()
  public static assignUuid(job: Job) {
    job.id = randomUUID()
  }

  @column()
  public first_name: String
  
  @column()
  public phone_number: String
  
  @column()
  public last_name: String
  
  @column()
  public email: String
  
  @column()
  public address: String
  
  @column()
  public state: String
  
  @column()
  public postal_code: number
  
  @column()
  public clothing: String
  
  @column()
  public description: String
  
  @column()
  public budget?: number
  
  @column({})
  public count: number
  
  @column()
  public status: String
  
  @hasMany(() => Sample, {
    foreignKey: 'job_id', 
  })
  public samples: HasMany<typeof Sample>
  
  @hasMany(() => Quote, {
    foreignKey: 'job_id', 
  })
  public quotes: HasMany<typeof Quote>
  
}
