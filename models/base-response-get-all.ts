import BaseEntity from "./base-entity"

export default class BaseResponseGetAll<T extends BaseEntity<T>> {
  rows: T[] = []

  constructor(response, Type: new () => T) {
    const modelType: T = new Type()
    this.rows = modelType.parseMultiple(response?.data || [])
  }
}