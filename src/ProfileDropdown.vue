<template>
  <div class="ProfileDropdown">
    <button :class="`ProfileDropdown__head`" role="button" @click="toggleActive">
      <placeholder-profile-picture :has-unread="hasUnread"/>
      <span class="sr-only">Open/Close Profile Notifications</span>
    </button>
    <div class="ProfileDropdown__body" :aria-hidden="(!active).toString()">
      <div class="ProfileDropdown__body-header">
        Notifications
      </div>
      <ul class="ProfileDropdown__body-content list-reset" v-if="notifications.length">
        <li class="ProfileDropdown__notification" v-for="notification in notifications" :key="notification.id">
          <profile-notification
            :title="notification.title"
            :type="notification.type"
            :id="notification.id"
            :unread-count="notification.unreadCount"
            :notification="notification.data"
            :read="notification.read"
          />
        </li>
      </ul>
      <div v-else class="ProfileDropdown__body-content">
        No notifications!
      </div>
      <div class="ProfileDropdown__body-footer">
        <button type="button" class="btn btn-primary profile">
          View Profile
        </button>
        <button type="button" class="btn btn-secondary log-out">
          Log out
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PlaceholderProfilePicture from "./PlaceholderProfilePicture.vue";
import ProfileNotification from "./ProfileNotification.vue";
import { getNotifications } from "./services/NotificationService";
import { getCurrentUser } from "./services/ProfileService";

export default {
  components: { PlaceholderProfilePicture, ProfileNotification },
  name: "ProfileDropdown",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      active: false,
      notifications: [],
      toggled: false
    };
  },
  computed: {
    hasUnread() {
      return (
        !this.toggled &&
        this.notifications.reduce(
          (anyUnread, { read }) => anyUnread || !read,
          false
        )
      );
    }
  },
  methods: {
    toggleActive() {
      this.toggled = true;

      if (!this.active) {
        document.addEventListener("click", this.handleOffMenuClick);
      } else {
        document.removeEventListener("click", this.handleOffMenuClick);
      }

      this.active = !this.active;

      if (this.active) {
        this.getNotifications();
      }
    },
    handleOffMenuClick({ target: { classList } }) {
      // Prevent clicks on the menu from closing the dropdown but also set
      // clicking the profile picture to close the dropdown
      if (
        classList.toString().indexOf("ProfileDropdown") === -1 &&
        !classList.contains("ProfileDropdown__head")
      )
        this.toggleActive();
    },
    getNotifications() {
      getNotifications()
        .then(notifications => {
          console.log(notifications);
          this.notifications = notifications;
        })
        .catch(({ error_type: errorType }) => {
          if (errorType === "not_logged_in") {
            this.loggedIn = false;
          }
        });
    }
  },
  created() {
    this.getNotifications();
  }
};
</script>

<style scoped lang="scss">
@import "./variables";
@import "./shared";

.ProfileDropdown {
  margin-left: 2em;
  margin-right: 1em;

  &__head {
    border: none;
    background-color: transparent;

    &:hover {
      cursor: pointer;
    }
  }

  &__body {
    z-index: 1;
    position: absolute;
    width: 29rem;
    white-space: nowrap;
    padding: 0;
    right: 1.5rem;
    top: 71px;
    list-style: none;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color: $k-bg-tan;
    border: 1px solid $text-0;

    &::before {
      border: 9px solid $text-0;
      content: "";
      position: absolute;
      right: 10px;
      top: -9px;
      width: 0;
      transform: rotate(45deg);
    }

    &[aria-hidden="true"] {
      display: none;
    }

    &-header {
      background-color: $text-0;
      color: $text-5;
      padding-top: 1rem;
      padding-left: 1rem;
      padding-bottom: 0.25rem;
      text-transform: uppercase;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 1px;
    }

    &-content {
      max-height: 17.5rem;
      overflow-y: scroll;
    }

    &-footer {
      padding: 0.5rem 0.25rem;
      border-top: 1px solid $text-0;

      .profile {
        width: 60%;
        margin-right: 0;
      }

      .log-out {
        width: 36.5%;
      }
    }
  }

  &__notification {
    border-top: 1px solid $text-3;
  }
}
</style>
