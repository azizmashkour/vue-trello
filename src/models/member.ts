import { BaseModel } from './base-model'

export class Member extends BaseModel {
  name: string

  constructor (name: string) {
    super()
    this.name = name
  }

  get titled () {
    const splited = this.name.split(' ')

    return splited.map((item) => item[0]).join('')
  }

  static build (item: any) {
    const memb = new Member(item.name)
    memb.id = item.id

    return memb
  }

  toJson () {
    return {
      id: this.id,
      name: this.name
    }
  }
}
