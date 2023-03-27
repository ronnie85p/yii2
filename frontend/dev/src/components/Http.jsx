import React from "react";

const http = {
  options: {
    method: "GET",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      // "Content-Type": "application/json",
    },
  },

  getFormData(data) {
    var fd = new FormData();
    for (let k in data) {
      fd.append(k, data[k]);
    }
    return fd;
  },

  request(url, options) {
    url = new URL(url, document.location.origin);
    if (options.params) {
      for (let k in options.params) {
        url.searchParams.set(k, options.params[k]);
      }
    }

    return fetch(url, { ...this.options, ...options }).then((response) =>
      response.json()
    );
  },

  get(url, params, options) {
    return this.request(url, {
      ...options,
      params: params,
      method: "GET",
    });
  },

  post(url, data, options) {
    return this.request(url, {
      ...options,
      body: this.getFormData(data),
      method: "POST",
    });
  },

  update(url, data, options) {
    return this.request(url, {
      ...options,
      body: JSON.stringify(data),
      method: "PUT",
    });
  },

  delete(url, params, options) {
    return this.request(url, {
      ...options,
      body: JSON.stringify(params),
      method: "DELETE",
    });
  },
};

const useHttpState = (props) => {
  const { request } = props;
  const [errors, setErrors] = React.useState([]);
  const [state, setState] = React.useState({ status: "none" });

  const sendRequest = (data) => {
    setState({ status: "pending" });
    return request(data)
      .then((response) => {
        if (response.success === false) {
          if (response.errors) {
            setErrors(response.errors);
          }

          throw new Error(response.message);
        }

        setState({ status: "success", response });
        return response;
      })
      .catch((error) =>
        setState({
          status: "error",
          response: { success: false, message: error.message },
          error,
        })
      );
  };

  return { ...state, errors, sendRequest };
};

export { useHttpState, http };
