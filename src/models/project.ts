import { BaseModel } from './base-model'
import { Member } from './member'
import { Group } from './group'

export class Project extends BaseModel {
  name: string
  progress: number
  members: Member[] = []
  groups: Group[] = []
  status: 'New' | 'Pending' | 'In progress' | 'Completed' | 'Archieved' = 'New'

  constructor (name: string, progress: number, members?: string[]) {
    super()
    this.name = name
    this.progress = progress

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

  addGroup (group: Group) {
    group.members = this.members
    this.groups.push(group)
  }

  toJson () {
    return {
      id: this.id,
      name: this.name,
      progress: this.progress,
      status: this.status,
      members: this.members.map(member => member.toJson()),
      groups: this.groups.map(group => group.toJson())
    }
  }
}
