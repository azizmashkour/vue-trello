import { Model } from './model.interface'

export class BaseModel implements Model {
  id: string

  constructor () {
    this.id = Math.random().toString(36).substr(2, 9)
  }

  toJson (): Record<string, any> {
    const obj = { ...this }

    return obj
  }
}
