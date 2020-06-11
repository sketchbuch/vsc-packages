import {
  HttpStatusCodes100,
  HttpStatusCodes200,
  HttpStatusCodes300,
  HttpStatusCodes400,
  HttpStatusCodes500,
} from '../constants/network';

export type HttpStatusCodes =
  | HttpStatusCodes100
  | HttpStatusCodes200
  | HttpStatusCodes300
  | HttpStatusCodes400
  | HttpStatusCodes500;
