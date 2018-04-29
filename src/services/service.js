export const discourseEndpoint = () => window["@@discourse-endpoint"];

export const baseOptions = extendWith =>
  Object.assign(
    {
      credentials: "include",
      headers: {
        Accept: "application/json"
      }
    },
    extendWith
  );

export const getOptions = () => baseOptions();
export const postOptions = () => baseOptions({ method: "post" });
export const putOptions = () => baseOptions({ method: "put" });
export const deleteOptions = () => baseOptions({ method: "delete" });
