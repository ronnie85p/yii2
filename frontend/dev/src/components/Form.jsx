import React, { useState, useEffect } from "react";
import BootstrapForm from "react-bootstrap/Form";

import * as Formik from "formik";

const defaultFormProps = {
  preventPressEnter: true,
  noValidate: true,
};

const useForm = (props) => {
  const { actionRequest, onSubmit, onSuccess, onError } = props;
  const [response, setResponse] = useState({});
  const formik = Formik.useFormik({
    initialValues: {},
    ...props,
    onSubmit: async (values, methods) => {
      const { setSubmitting } = methods;

      if (onSubmit && onSubmit(values, methods) === false) {
        setSubmitting(false);
        return;
      }

      if (actionRequest) {
        const response = await actionRequest(values, methods)
          .then((response) => {
            if (response?.success === false) {
              setResponseErrors(response.errors);
            }

            onSuccess && onSuccess(response);
            return response;
          })
          .catch(onError);

        setResponse(response);
        setSubmitting(false);
      }
    },
  });

  const setResponseErrors = (array) => {
    let errors = {};
    for (let i in array) {
      let error = array[i];
      errors[error.id] = error.msg;
    }

    formik.setErrors(errors);
  };

  return {
    ...formik,
    response,
    setResponse,
    setResponseErrors,
  };
};

const Form = (props) => {
  const _props = { ...defaultFormProps, ...props };
  const { preventPressEnter, onKeyDown, onSubmit, children } = _props;

  const handleKeyPress = (e) => {
    if (preventPressEnter === true && e.keyCode === 13) {
      e.preventDefault();
    }

    onKeyDown && onKeyDown(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit && onSubmit(e);
  };

  let deprecatedProps = ["preventPressEnter"];
  for (let i in deprecatedProps) {
    delete _props[deprecatedProps[i]];
  }

  return (
    <>
      <BootstrapForm
        {..._props}
        onKeyDown={handleKeyPress}
        onSubmit={handleSubmit}
      >
        {children}
      </BootstrapForm>
    </>
  );
};

export { useForm, Form, Formik };
export default Form;
