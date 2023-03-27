import React from "react";
import Form from "react-bootstrap/Form";

export default (props) => {
  const { children } = props;

  return (
    <>
      <Form.Control.Feedback {...props} type="invalid">
        {children}
      </Form.Control.Feedback>
    </>
  );
};
