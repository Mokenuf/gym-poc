interface IParser<T> {
  parse(entity: any): T,
  parseMultiple(entities: any[]): T[]
  populate(entity: any): void
}

export default abstract class BaseEntity<T> implements IParser<T> {
  id?: number | string
  createdAt?: string
  updatedAt?: string

  constructor(entity?: any) {
    this.id = entity?.id
    this.createdAt = entity?.created_at
    this.updatedAt = entity?.updated_at
    if (entity) {
      this.populate(entity)
    }
  }

  public abstract parse(entity: any): T

  public parseMultiple(entities: any[]): T[] {
    return entities?.map(e => this.parse(e)) || []
  }

  public abstract populate(entity: any): void
}