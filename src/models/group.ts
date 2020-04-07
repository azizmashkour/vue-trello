import { BaseModel } from './base-model'
import { Member } from './member'
import { Task } from './task'

export class Group extends BaseModel {
  title: string
  description: string
  startDate: Date
  dueDate: Date
  members: Member[] = []
  tasks: Task[] = []

  constructor (title: string, description?: string, start?: string, due?: string, members?: string[]) {
    super()
    this.title = title

    this.description = description || ''
    this.startDate = new Date(start || '')
    this.dueDate = new Date(due || '')

    if (members && members.length) {
      this.members = members.map(member => new Member(member))
    }
  }

  static build (item: any) {
    const group = new Group(item.title)

    group.id = item.id
    group.description = item.description
    group.startDate = new Date(item.startDate)
    group.dueDate = new Date(item.dueDate)
    group.members = item.members.map((assignee: any) => new Member(assignee.name))
    group.tasks = item.tasks.map((task: any) => new Task(task.title, task))

    return group
  }

  addTask (task: Task) {
    this.tasks.push(task)
  }

  removeTask (id: string) {
    const index = this.tasks.findIndex((item) => item.id === id)

    if (index > -1) {
      this.tasks.splice(index, 1)
    }
  }

  assignTo (member: string | Member) {
    const item = (typeof (member) === 'string') ? new Member(member) : member

    this.members.push(item)
  }

  removeMember (id: string) {
    const index = this.members.findIndex((item) => item.id === id)

    if (index > -1) {
      this.members.splice(index, 1)
    }
  }

  toJson () {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      startDate: this.startDate.toJSON(),
      dueDate: this.dueDate.toJSON(),
      members: this.members.map(member => member.toJson()),
      tasks: this.tasks.map(task => task.toJson())
    }
  }
}
