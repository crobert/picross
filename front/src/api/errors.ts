export class UnknownUserError extends Error {
  constructor() {
    super('The user does not exist anymore');
  }
}
