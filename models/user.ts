import BaseEntity from "./base-entity"

export default class User extends BaseEntity<User> {
  name: string
  email: string
  password: string

  constructor(user?: any) {
    super(user)
    if (user) { this.populate(user) }
  }

  parse(e: any): User {
    return new User(e)
  }

  populate(user) {
    this.name = user.name
    this.email = user.email
    this.password = user.password
  }
}