import {
  getOptions,
  deleteOptions,
  discourseEndpoint,
  toolsEndpoint,
  currentUsername
} from "./service";

export const getProfileLink = () =>
  `${discourseEndpoint()}/u/${currentUsername()}`;

export const getInboxLink = () => `${getProfileLink()}/messages`;

export const getCurrentUser = () =>
  fetch(`${discourseEndpoint()}/session/current.json`, getOptions())
    .then(res => res.json())
    .then(json => {
      const currentUser = json.current_user || null;

      return (window["@@current-user"] = { user: currentUser });
    });

export const getCsrfToken = () =>
  fetch(`${discourseEndpoint()}/session/csrf.json`, getOptions())
    .then(res => res.json())
    .then(({ csrf }) => {
      window["@@csrf-token"] = csrf;
    });

const toBase = () => (window.location = "/");

export const logout = () =>
  fetch(
    `${discourseEndpoint()}/session/${currentUsername()}`,
    deleteOptions()
  ).catch(() =>
    fetch(`${toolsEndpoint()}/logout`, { credentials: "include" })
      .then(toBase)
      .catch(toBase)
  );
