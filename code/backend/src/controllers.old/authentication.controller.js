import * as AuthService from '../services/authentication.service.js'

async function authenticate(req, res, next) {
  try {
    console.log("req.body in authenticate function in authentication.controller.js\n", req.body);
    const token = await AuthService.authenticate(req.body);
    res.json({
      data: token
    });
  } catch (error) {
    console.error(`Error while authenticating user`, error);
    next(error);
  }
}

export { authenticate };