import { BaseModel } from './base-model'
import { Member } from './member'
import { Group } from './group'

export class Project extends BaseModel {
  name: string
  members: Member[] = []
  groups: Group[] = []

  constructor (name: string, members?: string[]) {
    super()
    this.name = name

    if (members) {
      this.members = members.map(item => new Member(item))
    }
  }

  static build (obj: any) {
    const project = new Project(obj.name, obj.progress)

    project.id = obj.id
    project.members = obj.members.map((item: any) => Member.build(item))
    project.groups = obj.groups.map((item: any) => Group.build(item))

    return project
  }

  get status () {
    if (this.progress === 100) {
      return 'Completed'
    }

    if (!this.groups.length) {
      return 'New'
    }

    if (!this.taskTotal) {
      return 'Pending'
    }

    return 'In Progress'
  }

  get taskTotal () {
    return this.groups.reduce((previous: number, current: Group) => {
      return previous + current.tasks.length
    }, 0)
  }

  get progress () {
    const doneCount = this.groups.reduce((previous: number, current: Group) => {
      return previous + current.tasks.filter((item) => item.checked).length
    }, 0)

    return this.taskTotal ? (doneCount / this.taskTotal) * 100 : 0
  }

  addGroup (group: Group) {
    group.members = this.members
    this.groups.push(group)
  }

  toJson () {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
      members: this.members.map(member => member.toJson()),
      groups: this.groups.map(group => group.toJson())
    }
  }
}
