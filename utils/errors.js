module.exports = {
  HTTP_BAD_REQUEST: 400, // CastError. ValidationError, AssertionError
  AUTHORIZATION_ERROR: 401,
  FORBIDDEN_ERROR: 403,
  HTTP_NOT_FOUND: 404, // DocumentNotFoundError
  CONFLICT: 409,
  HTTP_INTERNAL_SERVER_ERROR: 500, // default error
};
