import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Job from 'App/Models/Job'
import Sample from 'App/Models/Sample'

export default class JobsController {
  public async index(ctx: HttpContextContract) {
    const job=await Job.query().where('id', ctx.params.id).select('*').first()
    const samples=await Sample.query().where('job_id', ctx.params.id)
    ctx.response.send({job, samples})
  }

  public async create({}: HttpContextContract) {}

  public async store(ctx: HttpContextContract) {

    let body=ctx.request.body()
    const images = ctx.request.files('samples') 
    if(!body.first_name
      ||!body.last_name
      ||!body.clothing
      ||!body.phone_number
      ||!body.email
      ||!body.address
      ||!body.postal_code
      ||!body.state
      ||!body.description
      ||!images)
      ctx.response.status(300).send('Failed')
    const job= await Job.create({
      first_name:body.first_name,
      last_name:body.last_name,
      clothing:body.clothing,
      phone_number:body.phone_number,
      email:body.email,
      address:body.address,
      postal_code:body.postal_code,
      state:body.state,
      description:body.description,
      budget:body.budget,
    });

    for (let image of images) {
      await image.moveToDisk('./')
      const fileName = image.fileName;
      if(fileName){
        console.log(await job.related('samples').create({file:fileName}))
      }
    }
    return {job}
  }

  public async show(ctx: HttpContextContract) {
    const taskModel=await Job.all()
    ctx.response.send({jobs:taskModel})
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
