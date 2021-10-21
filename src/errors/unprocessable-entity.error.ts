export class UnprocessableEntityError extends Error {
  private readonly statusCode: number;

  constructor(message) {
    super(message);
    this.statusCode = 422;
  }
}
