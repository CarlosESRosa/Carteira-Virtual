import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const senhasecreta = process.env.JWT_SECRET || 'jwt_secret';

const generateJWT = (payload: { username: string }) => {
  const token = jwt.sign({ data: payload }, senhasecreta, { expiresIn: '24h', algorithm: 'HS256' });

  return token;
};

export default generateJWT;
