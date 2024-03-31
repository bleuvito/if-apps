import { PrismaClient } from "@prisma/client"
import { getOAuth2Client, getOauth2 } from "./oauth2client.service.js"
import { OperationError } from "../utils/errors.js";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

async function authenticate(args) {
  try {
    const { authCode, type } = args;
    const oAuth2Client = getOAuth2Client(type);
    const oAuth2 = getOauth2(type);
    console.log("authCode in authenticate function in authentication.service.js\n", authCode);

    const { tokens: googleTokens } = await oAuth2Client.getToken(authCode);
    if (!googleTokens) {
      throw new OperationError({
        errcode: 'E_AUTH_FAILED',
      });
    }
    console.log("googleTokens in authenticate function in authentication.service.js\n", googleTokens);

    oAuth2Client.setCredentials(googleTokens);
    const { data: googleUserInfo } = await oAuth2.userinfo.get();
    console.log("googleUserInfo in aunthenticate function in authentication.service.js\n", googleUserInfo)

    const user = await prisma.user.findUnique({
      where: {
        email: googleUserInfo.email,
      },
    });

    if (!user) {
      throw new OperationError({
        errcode: 'E_AUTH_FAILED',
      });
    }

    if (type === 'web') {
      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          webRefreshToken: googleTokens.refresh_token
        }
      });
    } else {
      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          androidRefreshToken: googleTokens.refresh_token
        }
      });
    }

    const token = jwt.sign({
      user: {
        id: user.id,
        name: googleUserInfo.name,
        email: googleUserInfo.email,
        role: user.role,
      },
      token: {
        access_token: googleTokens.access_token,
        access_token_exp_date: googleTokens.expiry_date
      }
    }, process.env.JWT_SECRET);

    // const token = expojwt.encode(
    //   {
    //     user: {
    //       id: user.id,
    //       name: googleUserInfo.name,
    //       email: googleUserInfo.email,
    //       role: user.role,
    //     },
    //     token: {
    //       access_token: googleTokens.access_token,
    //       access_token_exp_date: googleTokens.expiry_date
    //     }
    //   }, "cJS2tKq6Bh0jPeqV3PzVQr52"
    // );

    console.log("authenticate function in authenticatoin.service.js is being executed\n");

    return token;
  } catch (error) {
    console.error(`ERROR in authenticating user in authenticate function in authentication.service.js\n`, error);
  } finally {
    await prisma.$disconnect();
  }
}

export { authenticate };