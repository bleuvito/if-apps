function createResponse(errorCode, message, data) {
  if (errorCode) {
    return {
      success: false,
      errorCode,
      message,
      data: {},
    };
  }

  return {
    success: true,
    message,
    data,
  };
}

export { createResponse };
