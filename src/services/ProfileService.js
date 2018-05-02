import { getOptions, discourseEndpoint, currentUser } from "./service";

export const getProfileLink = () =>
  `${discourseEndpoint()}/u/${((currentUser() || {}).user || {}).username}`;

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
