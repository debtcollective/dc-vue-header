<template>
  <div :class="`ProfilePicture__img-container ${hasUnread ? 'unread' : ''}`">
    <img :src="avatar" :title="username" />
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

.ProfilePicture__img-container {
  img {
    width: 32px;
    height: 32px;

    @media (max-width: 52em) {
      width: 34px;
      height: 34px;
    }
  }
}

.unread {
  position: relative;

  &::before {
    content: "";
    position: absolute;
    border: 8px solid $red-orange;
    border-radius: 100%;
    left: -5px;
    top: -5px;
  }
}

img {
  border-radius: 50%; // this is what makes it a circle
}
</style>