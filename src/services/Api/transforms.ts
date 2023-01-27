import { AxiosRequestTransformer } from "axios";

const exampleRequestTransformation: AxiosRequestTransformer = (data) => {
  return data;
};

const exampleResponseTransformation: AxiosRequestTransformer = (data) => {
  return data;
};

export const requestTransforms: AxiosRequestTransformer[] = [
  exampleRequestTransformation,
];

export const responseTransforms: AxiosRequestTransformer[] = [
  exampleResponseTransformation,
];
