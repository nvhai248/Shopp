import { ApolloServerErrorCode } from '@apollo/server/errors';

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
  ALL = 'ALL',
}

export enum TYPE_KEY {
  VERIFY = 'verify',
  REFRESH_PASSWORD = 'refresh_password',
}

export const CLIENT_SITE_DOMAIN = process.env.CLIENT_SITE_DOMAIN;
export const SITE_PORT = process.env.SITE_PORT || 8080;
