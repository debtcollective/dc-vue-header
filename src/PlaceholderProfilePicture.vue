<template>
  <div :class="`${hasUnread ? 'unread' : ''}`">
    <svg width="40" height="40" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g id="Canvas" fill="none">
        <g id="Mask Group">
          <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
            <g id="profile-pic">
              <circle cx="20" cy="20" r="20" fill="#C4C4C4"/>
            </g>
          </mask>
          <g mask="url(#mask0)">
            <g id="profile-pic_2">
              <circle cx="20" cy="20" r="20" fill="#C4C4C4"/>
            </g>
            <g id="Group 8">
              <g id="Vector">
                <path d="M -5.82524e-09 11.8452C -5.82524e-09 5.30243 4.3185 9.44011e-07 9.64638 9.44011e-07L 18.3536 9.44011e-07C 23.6823 9.44011e-07 28 5.30243 28 11.8452" transform="translate(6 28.0156)" fill="#828282"/>
              </g>
              <g id="Vector_2">
                <path d="M 8.10482 16.0174C 12.581 16.0174 16.2096 12.4318 16.2096 8.00872C 16.2096 3.58563 12.581 0 8.10482 0C 3.62865 0 0 3.58563 0 8.00872C 0 12.4318 3.62865 16.0174 8.10482 16.0174Z" transform="translate(11.8945 8)" fill="#828282"/>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "PlaceholderProfilePicture",
  props: {
    hasUnread: {
      type: Boolean,
      required: false,
      default: false
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
</style>