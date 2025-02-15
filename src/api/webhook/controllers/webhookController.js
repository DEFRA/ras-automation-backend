export const webHookController = {
  handler: (_request, h) => {
    const validationToken = _request.query.validationToken

    if (validationToken) {
      return h.response(validationToken).type('text/plain').code(200)
    }

    return h.response({ message: 'success' }).code(200)
  }
}
