import React from "react";

export default function FormAlert(props) {
  const { response } = props;

  if (response?.message) {
    return (
      <div className={`alert alert-${response.success ? "success" : "danger"}`}>
        <div className="alert-heading">{response.message}</div>
      </div>
    );
  }

  return <></>;
}
