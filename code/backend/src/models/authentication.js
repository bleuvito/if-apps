import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { getOAuth2Client, getOauth2 } from '../utils/googleOAuth2Client.js';

const prisma = new PrismaClient();

async function authenticate(args) {
  try {
    const { code, clientType } = args;
    const oAuth2 = getOauth2(clientType);
    const oAuth2Client = getOAuth2Client(clientType);

    const { tokens } = await oAuth2Client.getToken(code);

    if (!tokens) {
      throw new Error('Invalid credentials');
    }

    oAuth2Client.setCredentials(tokens);
    const { data } = await oAuth2.userinfo.get();

    const user = await prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (!user.name) {
      await prisma.user.update({
        where: {
          email: `${data.email}`,
        },
        data: {
          name: `${data.name}`,
        },
      });
    }

    if (clientType === 'web') {
      await prisma.user.update({
        where: {
          email: `${data.email}`,
        },
        data: {
          webRefreshToken: `${tokens.refresh_token}`,
        },
      });
    }

    if (clientType === 'android') {
      await prisma.user.update({
        where: {
          email: `${data.email}`,
        },
        data: {
          androidRefreshToken: `${tokens.refresh_token}`,
        },
      });
    }

    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name,
      },
      clientType,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return token;
  } catch (error) {
    throw new Error(error);
  }
}

function verify(allowedRoles) {
  return (req, res, next) => {
    try {
      const authorizationHeader = req.get('authorization');

      if (!authorizationHeader) {
        throw new Error('No token');
      }

      const tokenSplit = authorizationHeader.split(' ');
      if (tokenSplit.length !== 2 || tokenSplit[0] !== 'Bearer') {
        throw new Error('Invalid token');
      }

      const clientJwt = tokenSplit[1];
      jwt.verify(clientJwt, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          throw new Error('Invalid token');
        }

        if (
          allowedRoles !== 'all' &&
          !allowedRoles.includes(decoded.user.role)
        ) {
          throw new Error('Unauthorized');
        } else {
          req.locals = decoded;
          next();
        }
      });
    } catch (error) {
      next(error);
    }
  };
}

export { authenticate, verify };
