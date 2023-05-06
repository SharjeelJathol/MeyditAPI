// import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Job from './Job'
import { randomUUID } from 'crypto'

export default class Quote extends BaseModel {

  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static assignUuid(quote: Quote) {
    quote.id = randomUUID()
  }

  @column()
  public price: number

  @column()
  public job_id: string
  
  @column()
  public comment?:String

  @belongsTo(() => Job, {
    localKey: 'job_id', // defaults to quote_id
  })
  public jobId: BelongsTo<typeof Job>

}
