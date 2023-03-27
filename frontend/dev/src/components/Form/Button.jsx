import React from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const defaultProps = {
  loading: false,
  loadingText: "",
  spinnerProps: {
    as: "span",
    size: "sm",
    role: "status",
    animation: "border",
    className: "btn-loading-spinner",
  },
};

export default (props) => {
  const spinnerProps = { ...defaultProps.spinnerProps, ...props.spinnerProps };
  const _props = {
    ...defaultProps,
    ...props,
  };

  const { children, disabled, loading, loadingText } = _props;

  const btnProps = {};
  for (let k in _props) {
    if (!["loading", "loadingText", "spinnerProps"].includes(k)) {
      btnProps[k] = _props[k];
    }
  }

  return (
    <Button {...btnProps} disabled={disabled || loading}>
      {loading ? (
        <>
          <Spinner aria-hidden="true" {...spinnerProps} />
          {loadingText ? (
            <span className="btn-loading-text ml-1">{loadingText}</span>
          ) : (
            <></>
          )}
        </>
      ) : (
        children
      )}
    </Button>
  );
};
