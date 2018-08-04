<template>
  <div :class="`${hasUnread ? 'unread' : ''}`">
    <img width="40px" height="40px" :src="avatar" :title="username" />
  </div>
</template>

<script>
import {
  assertCurrentUser,
  currentUsername,
  currentUserAvatarUrl
} from "./services/service";

export default {
  name: "ProfilePicture",
  props: {
    hasUnread: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  beforeCreate() {
    assertCurrentUser();
  },
  data() {
    return {
      avatar: currentUserAvatarUrl(),
      username: currentUsername()
    }
  }
};
</script>

<style scoped lang="scss">
@import "./variables";

.unread::before {
  content: "";
  position: absolute;
  border: 7px solid $dc-red;
  border-radius: 100%;
  right: 3.25rem;
}

img {
  border-radius: 50%; // this is what makes it a circle
}
</style>