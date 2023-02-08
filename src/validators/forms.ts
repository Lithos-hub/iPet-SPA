import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

const formValidations = {
  email: [(value: string) => isEmail(value), "UI.ERRORS.email_format"],
  password: [
    (value: string) => isStrongPassword(value),
    "UI.ERRORS.pass_contain",
  ],
};

export const getValidationsByQuery = (query: string[]) => {
  const auxObj: Record<string, unknown> = {};

  query.forEach((query: string) => {
    auxObj[query] = formValidations[query as keyof typeof formValidations];
  });

  return auxObj;
};
