export const discourseEndpoint = () => window["@@discourse-endpoint"];
export const toolsEndpoint = () => window["@@tools-endpoint"];
export const currentUser = () => window["@@current-user"];
export const csrfToken = () => window["@@csrf-token"];
export const currentUsername = () =>
  ((currentUser() || {}).user || {}).username;
export const currentUserAvatarUrl = (size = 96) =>
  new URL(currentUser().user.avatar_template.replace(/\{size\}/g, size), discourseEndpoint());
export const assertCurrentUser = () =>
  console.assert(currentUser() !== null && currentUser() !== undefined)

export const baseOptions = extendWith =>
  Object.assign(
    {
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...(csrfToken() ? { "X-CSRF-Token": csrfToken() } : {})
      }
    },
    extendWith
  );

export const getOptions = () => baseOptions();
export const postOptions = () => baseOptions({ method: "post" });
export const putOptions = () => baseOptions({ method: "put" });
export const deleteOptions = () => baseOptions({ method: "delete" });
