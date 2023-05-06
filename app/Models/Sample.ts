import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Job from './Job'
import { randomUUID } from 'crypto'

export default class Sample extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static assignUuid(sample: Sample) {
    sample.id = randomUUID()
  }

  @column()
  public file:string

  @column()
  public job_id: string

  @belongsTo(() => Job, {
    localKey: 'job_id', // defaults to sample_id
  })
  public jobId: BelongsTo<typeof Job>



}
