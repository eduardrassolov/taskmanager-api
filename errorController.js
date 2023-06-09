class CustomError extends Error {
  constructor(code, msg) {
    super(msg);
    this.code = code;
    this.message = msg;
  }
}
