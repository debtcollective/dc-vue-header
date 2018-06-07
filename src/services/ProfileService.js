import {
  getOptions,
  deleteOptions,
  discourseEndpoint,
  currentUsername
} from "./service";

export const getProfileLink = () =>
  `${discourseEndpoint()}/u/${((currentUsername() || {}).user || {}).username}`;

export const getInboxLink = () => `${getProfileLink()}/messages`;

export const getCurrentUser = () =>
  fetch(
    `${discourseEndpoint()}/about/live_post_counts.json`,
    getOptions()
  ).then(res => {
    if (res.status === 403) {
      throw res;
    } else {
      const username = res.headers.get("X-Discourse-Username");
      return fetch(`${discourseEndpoint()}/u/${username}`, getOptions())
        .then(r => r.json())
        .then(user => {
          return (window["@@current-user"] = user);
        });
    }
  });

export const getCsrfToken = () =>
  fetch(`${discourseEndpoint()}/session/csrf.json`, getOptions())
    .then(res => res.json())
    .then(({ csrf }) => {
      window["@@csrf-token"] = csrf;
    });

export const logout = () =>
  fetch(
    `${discourseEndpoint()}/session/${currentUsername()}`,
    deleteOptions()
  ).catch(() => (window.location = "/"));
