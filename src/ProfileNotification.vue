<template>
  <div :class="`ProfileNotification ${read ? '-read' : '-unread'}`">
    <a :href="href" rel="noopener noreferrer">
      <div class="ProfileNotification__icon">
        <div v-if="type === 'event'" class="ProfileNotification__icon-calendar">
          <calendar-icon />
        </div>
        <div v-else-if="unreadCount !== null" class="ProfileNotification__icon-text">
          <span v-if="unreadCount >= 1 && unreadCount < 10">
            +{{unreadCount}}
          </span>
          <span v-else-if="unreadCount >= 10">
            9+
          </span>
        </div>
      </div>
      <div :class="`ProfileNotification__description ${read ? '-read' : ''}`">
        <div class="ProfileNotification__description-summary">
          {{summary.title}}
        </div>
        <div class="ProfileNotification__description-content">
          {{summary.content}}
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import CalendarIcon from "./CalendarIcon.vue";
import {
  getTopicForNotification,
  getLinkForNotification
} from "./services/NotificationService";
import { getInboxLink } from "./services/ProfileService";

export default {
  name: "ProfileNotification",
  components: { CalendarIcon },
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      unreadCount: null,
      relativeTime: null,
      read: this.notification.read
    };
  },
  computed: {
    href() {
      switch (this.notification.type) {
        case "posted":
        case "privateMessage":
          return getLinkForNotification(this.notification);
        case "aggregatedSystem":
          return getInboxLink();
      }
    },
    summary() {
      switch (this.notification.type) {
        case "posted":
          if (this.unreadCount > 1) {
            return {
              title: `${this.unreadCount} new replies to:`,
              content: this.notification.fancy_title
            };
          } else {
            const { display_username: name } = this.notification.data;
            return {
              title: `${name} replied to:`,
              content: this.notification.fancy_title
            };
          }
        case "event":
          return `Happening ${this.relativeTime}:`;
        case "aggregatedSystem":
          return {
            title: `You have ${
              this.notification.aggregatedSystem.count
            } dispute updates.`,
            content: "Click here to go to your inbox"
          };
        case "privateMessage":
          if (this.notification.post_number === 1) {
            const { display_username: name } = this.notification.data;

            if (name === "Dispute Tools") {
              return {
                title: `${name} update:`,
                content: this.notification.fancy_title
              };
            } else {
              return {
                title: `${name} sent you a private message:`,
                content: this.notification.fancy_title
              };
            }
          } else {
            const { display_username: name } = this.notification.data;
            return {
              title: `${name} replied to:`,
              content: this.notification.fancy_title
            };
          }
      }
    }
  },
  created() {
    switch (this.notification.type) {
      case "posted":
        return getTopicForNotification(this.notification).then(topic => {
          this.unreadCount =
            topic.highest_post_number - topic.last_read_post_number;
        });
      case "aggregatedSystem":
        return (this.unreadCount = this.notification.aggregatedSystem.count);
    }
  }
};
</script>

<style scoped lang="scss">
@import "./variables";
@import "./shared";

.Header__mobile {
  .ProfileNotification {
    padding: 1rem 0.75rem;
  }
}

.ProfileNotification {
  padding: 1rem;

  &__icon {
    display: inline-block;
    vertical-align: top;
    background-color: $text-3-5;
    border-radius: 100%;
    width: 3rem;
    height: 3rem;
    margin-right: 0.75rem;

    &-calendar {
      padding: 0.6rem 0.75rem;
    }

    &-text {
      color: $text-2;
      font-size: 1.5rem;
      font-weight: 600;
      padding: 0.6rem 0;
      text-align: center;
    }
  }

  &__description {
    display: inline-block;
    color: $text-1;
    padding-top: 0.25rem;

    &-summary {
      font-weight: 600;
    }

    &-content {
      font-style: italic;
      max-width: 21rem;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    &.-read {
      color: $text-2;
    }
  }
}
</style>
