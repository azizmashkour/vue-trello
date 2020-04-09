import { BaseModel } from './base-model'
import { Member } from './member'

export class Task extends BaseModel {
  title: string
  start: Date
  due: Date
  assignees: Member[] | undefined
  description: string
  comments: string
  tags: string[]
  status: 'New' | 'Pending' | 'In progress' | 'Completed' | 'Archieved' = 'New'

  constructor (title: string, data: any) {
    super()
    this.title = title

    this.start = data.start
    this.due = data.due
    this.description = data.description || ''
    this.comments = data.comments || ''
    this.tags = data.tags || []
    this.status = data.status || 'New'

    if (data.assignees) {
      this.assignees = data.assignees.map(item => Member.build(item))
    }
  }

  set checked (value: boolean) {
    this.status = value ? 'Completed' : 'In progress'
  }

  get checked () {
    return this.status === 'Completed'
  }

  clone () {
    const obj = this.toJson()

    return new Task(obj.title, obj)
  }

  toJson () {
    const data = {
      id: this.id,
      title: this.title,
      description: this.description,
      comments: this.comments,
      start: this.start,
      due: this.due,
      status: this.status,
      tags: this.tags,
      assignees: this.assignees?.map(member => member.toJson())
    }

    // console.log('Task Json', data)

    return data
  }
}
