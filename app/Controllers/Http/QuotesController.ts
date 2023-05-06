import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Job from 'App/Models/Job'
import mail from './Mailer'
export default class QuotesController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store(ctx: HttpContextContract) {
    const job_id=ctx.request.params().id
    const quote=ctx.request.body().quote
    const description=ctx.request.body().description
    const job=await Job.findOrFail(job_id)
    if(job){
      const response= await job.related('quotes').create({price:quote, comment:description})
      job.count=job.count+1
      mail(job.email, quote, description);
      job.save()
      
      ctx.response.send(response)
    }
    else
      ctx.response.send({status:404})
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
