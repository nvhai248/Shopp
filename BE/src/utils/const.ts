import { ApolloServerErrorCode } from '@apollo/server/errors';
import * as dotenv from 'dotenv';
dotenv.config();

export enum GRAPHQL_CODE_ERROR {
  InternalServerError = ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
  BadRequest = ApolloServerErrorCode.BAD_REQUEST,
  UnAuthorizedError = 'UNAUTHORIZED_ERROR',
  DBError = 'DB_ERROR',
  ForbiddenError = 'FORBIDDEN_ERROR',
  NotFound = 'NOTFOUND_ERROR',
}

export enum DB_TYPES {
  USER = 'user_type_for_shopp',
  PRODUCT = 'product_type_for_shopp',
  STORE = 'store_type_for_shopp',
  CATEGORY = 'category_type_for_shopp',
}

export enum USER_STATUS {
  ACTIVE = 1,
  NOT_VERIFIED = 0,
  DELETED = -1,
}

export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNDEFINED = 'UNDEFINED',
}

export enum TYPE_KEY {
  REFRESH_PASSWORD = 'refresh_password',
}

export function GenKey(userId: number, typeKey: string): string {
  return `${userId}:${typeKey}`;
}

export const CLIENT_SITE_DOMAIN = process.env.CLIENT_SITE_DOMAIN;
export const SITE_PORT = process.env.SITE_PORT || 8080;

export const JWT_CONST = {
  ACCESS_SECRET: process.env.SECRET_ACCESS_TOKEN_KEY,
  REFRESH_SECRET: process.env.SECRET_ACCESS_REFRESH_KEY,
  ACCESS_EXPIRED: 60 * 60, // one hour
  REFRESH_EXPIRED: 60 * 60 * 24 * 30, // one month
};
