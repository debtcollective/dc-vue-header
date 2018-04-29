import { getOptions, discourseEndpoint } from "./service";

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

export const getNotifications = () => {
  return fetch(
    `${discourseEndpoint()}/notifications?recent=true&limit=16`,
    getOptions()
  )
    .then(res => res.json())
    .then(({ notifications /*seen_notification_id*/ }) => {
      console.log(notifications);
      return Promise.all(
        notifications.reduce((promises, n) => {
          const {
            notification_type,
            fancy_title: title,
            read,
            topic_id,
            id,
            data
          } = n;
          const type = notificationTypes[notification_type - 1];

          if (!title) return promises;

          if (type === "posted") {
            return [
              ...promises,
              getTopic(topic_id).then(topic => {
                const { last_read_post_number, highest_post_number } = topic;
                return {
                  type,
                  title,
                  data,
                  read,
                  topic,
                  unreadCount: highest_post_number - last_read_post_number,
                  id
                };
              })
            ];
          } else {
            return [
              ...promises,
              Promise.resolve({ type, title, read, data, id })
            ];
          }
        }, [])
      );
    })
    .catch(console.error);
};
