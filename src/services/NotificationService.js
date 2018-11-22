import { getOptions, discourseEndpoint } from "./service";
import { captureMessage } from "./service/ErrorService";

// check discourse notification types at: https://goo.gl/Lcyhp3
const notificationTypes = [
  "mentioned",
  "replied",
  "quoted",
  "edited",
  "liked",
  "privateMessage",
  "invitedToPrivateMessage",
  "inviteeAccepted",
  "posted",
  "movedPost",
  "linked",
  "grantedBadge",
  "invitedToTopic",
  "custom",
  "groupMentioned",
  "groupMessageSummary",
  "watchingFirstPost",
  "topicReminder"
];

export const getTopic = id =>
  fetch(`${discourseEndpoint()}/t/${id}.json`, getOptions()).then(r =>
    r.json()
  );

export const isSystem = n => n.data.display_username === "system";

export const mapSystemToReadable = n => ({
  ...n,
  data: { ...n.data, display_username: "Dispute Tools" }
});

export const getTopicForNotification = notification =>
  getTopic(notification.topic_id);

export const getLinkForNotification = notification => {
  if (!notification.topic_id || !notification.post_number) {
    captureMessage("Trying to get a notification link with invalid format", {
      notification
    });
    return "#";
  }

  return `${discourseEndpoint()}/t/${notification.topic_id}/${
    notification.post_number
  }`;
};

export const getNotifications = () => {
  return (
    fetch(
      `${discourseEndpoint()}/notifications?recent=true&limit=16`,
      getOptions()
    )
      .then(res => res.json())
      .then(({ notifications }) => {
        // Support notifications with fancy_title only and append a readable "type" of notification
        const reducerFunction = (ns, n) =>
          n.fancy_title
            ? [
                ...ns,
                { ...n, type: notificationTypes[n.notification_type - 1] }
              ]
            : ns;

        return notifications.reduce(reducerFunction, []);
      })
      // eslint-disable-next-line
      .catch(console.error)
  );
};
