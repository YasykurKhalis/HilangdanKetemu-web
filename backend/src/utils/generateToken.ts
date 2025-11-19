// src/utils/generateToken.ts
import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
  // Token akan kadaluarsa dalam 30 hari
  return jwt.sign({ id }, process.env.JWT_SECRET || 'rahasia_default', {
    expiresIn: '30d',
  });
};

export default generateToken;