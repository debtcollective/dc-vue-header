import { getOptions, discourseEndpoint, currentUser } from "./service";

export const getInboxLink = () =>
  `${discourseEndpoint()}/u/${currentUser().user.username}/messages`;

export const getCurrentUser = () =>
  fetch(
    `${discourseEndpoint()}/about/live_post_counts.json`,
    getOptions()
  ).then(res => {
    const username = res.headers.get("X-Discourse-Username");
    return fetch(`${discourseEndpoint()}/u/${username}`, getOptions())
      .then(r => r.json())
      .then(user => {
        return (window["@@current-user"] = user);
      });
  });
