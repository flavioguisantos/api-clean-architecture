export class UnprocessableEntity extends Error {
  constructor(param: string) {
    super(`Entities ${param} already exists`)
    this.name = 'UnprocessableEntity'

  }
}
