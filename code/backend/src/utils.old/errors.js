class OperationError extends Error {
  constructor(payload) {
    super(payload.message);
    this.payload = payload;
  }
}

export { OperationError }