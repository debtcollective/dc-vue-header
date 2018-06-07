<template>
  <div class="ProfileDropdown">
    <button class="ProfileDropdown__head" role="button" @click="toggleActive">
      <placeholder-profile-picture :has-unread="hasUnread"/>
      <span class="sr-only">Open/Close Profile Notifications</span>
    </button>
    <div class="ProfileDropdown__body" :aria-hidden="(!active).toString()">
      <div class="ProfileDropdown__body-header">
        Notifications
      </div>
      <ul class="ProfileDropdown__body-content list-reset" v-if="notifications.length">
        <li class="ProfileDropdown__notification" v-for="notification in notifications" :key="notification.id">
          <profile-notification :notification="notification" />
        </li>
      </ul>
      <div v-else class="ProfileDropdown__body-content">
        No notifications!
      </div>
      <div class="ProfileDropdown__body-footer">
        <a class="btn btn-primary profile" :href="profileHref" rel="noopener noreferrer">
          View Profile
        </a>
        <button type="button" class="btn btn-secondary log-out" @click="handleLogout">
          Log out
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PlaceholderProfilePicture from "./PlaceholderProfilePicture.vue";
import ProfileNotification from "./ProfileNotification.vue";
import {
  getNotifications,
  isSystem,
  mapSystemToReadable
} from "./services/NotificationService";
import { getProfileLink, logout } from "./services/ProfileService";

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
      rawNotifications: [],
      toggled: false,
      profileHref: getProfileLink()
    };
  },
  computed: {
    hasUnread() {
      return (
        !this.toggled &&
        this.rawNotifications.reduce(
          (anyUnread, { read }) => anyUnread || !read,
          false
        )
      );
    },
    notifications() {
      const { system, rest } = this.rawNotifications.reduce(
        ({ system, rest }, n) =>
          isSystem(n)
            ? { system: [...system, mapSystemToReadable(n)], rest }
            : { system, rest: [...rest, n] },
        { system: [], rest: [] }
      );

      if (system.length > 3) {
        return [
          {
            aggregatedSystem: {
              count: system.length
            },
            type: "aggregatedSystem"
          },
          ...rest
        ];
      } else {
        return [...system, ...rest];
      }
    }
  },
  methods: {
    toggleActive() {
      this.toggled = true;

      // if (!this.active) {
      //   document.addEventListener("click", this.handleOffMenuClick);
      // } else {
      //   document.removeEventListener("click", this.handleOffMenuClick);
      // }

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
          this.rawNotifications = notifications;
        })
        .catch(({ error_type: errorType }) => {
          this.rawNotifications = [];
          if (errorType === "not_logged_in") {
            this.loggedIn = false;
          }
        });
    },
    handleLogout: logout
  },
  created() {
    this.getNotifications();
  }
};
</script>

<style scoped lang="scss">
@import "./variables";
@import "./shared";

.Header__mobile {
  .ProfileDropdown__body {
    right: 0;
    width: 100%;
    border-left: none;
    border-right: none;
    border-radius: 0;

    &::before {
      right: 34px;
    }
  }
}

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

      .profile,
      .profile:hover {
        color: $btn-text !important;
        font-weight: 400;
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
