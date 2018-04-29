<template>
  <div class="ProfileNotification">
    <div class="ProfileNotification__icon">
      <div v-if="type === 'event'" class="ProfileNotification__icon-calendar">
        <calendar-icon />
      </div>
      <div v-else-if="type === 'posted'" class="ProfileNotification__icon-text">
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
        {{summary}}
      </div>
      <div class="ProfileNotification__description-content">
        {{title}}
      </div>
    </div>
  </div>
</template>

<script>
import CalendarIcon from "./CalendarIcon.vue";

export default {
  name: "ProfileNotification",
  components: { CalendarIcon },
  props: {
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    read: {
      type: Boolean,
      required: false,
      default: false
    },
    date: {
      type: Number,
      required: false
    },
    relativeTime: {
      type: String,
      required: false
    },
    lastUpdated: {
      type: Number,
      required: false
    },
    notification: {
      type: Object,
      required: true
    },
    unreadCount: {
      type: Number,
      required: false
    }
  },
  computed: {
    summary() {
      switch (this.type) {
        case "posted":
          if (this.unreadCount > 1) {
            return `${this.unreadCount} new replies to:`;
          } else {
            const { display_username: name } = this.notification;
            return `${name} replied to:`;
          }
        case "event":
          return `Happening ${this.relativeTime}:`;
        case "privateMessage":
          const { display_username: name } = this.notification;
          return `${name} replied to:`;
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "./variables";
@import "./shared";

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
