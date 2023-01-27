import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm: any = {}, formValidations: any = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, []);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue as keyof typeof formValidation] !== null)
        return false;
    }

    return true;
  }, [formValidation]);

  const onInputChange = ({ target }: any) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues: Record<string, any> = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage]: [Function, string] =
        formValidations[formField as keyof typeof formValidations];
      const validField: string = `${formField}Valid`;
      formCheckedValues[validField] = fn(
        formState[formField as keyof typeof formValidations]
      )
        ? null
        : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,

    ...formValidation,
    isFormValid,
  };
};
