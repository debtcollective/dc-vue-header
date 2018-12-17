<template>
  <div class="HamburgerDropdown">
    <button class="navbar-toggler" type="button" aria-label="Toggle navigation" @click="toggleActive">
      <span v-if="!active" class="navbar-toggler-icon" />
      <svg v-else width="34px" height="26px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="Canvas" fill="none">
          <g id="Vector">
            <path d="M 24 2.41714L 21.5829 0L 12 9.58286L 2.41714 0L 0 2.41714L 9.58286 12L 0 21.5829L 2.41714 24L 12 14.4171L 21.5829 24L 24 21.5829L 14.4171 12L 24 2.41714Z" fill="#2B2B2B"/>
          </g>
        </g>
      </svg>
    </button>
    
    <ul class="HamburgerDropdown__body" aria-label="submenu" :aria-hidden="(!active).toString()">
      <li v-for="link in links" :key="link.href" @click="toggleActive">
        <a :href="link.href" class="Dropdown__item" role="button" :onclick="link.onclick" :title="link.title">
          {{link.text}}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HamburgerDropdown",
  props: {
    links: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      active: false
    };
  },
  methods: {
    toggleActive() {
      this.active = !this.active;
    }
  }
};
</script>

<style scoped lang="scss">
@import "./variables";

.HamburgerDropdown {
  float: left;

  .navbar-toggler {
    padding: 0 0.75rem;
    font-size: 1.25rem;
    line-height: 1;
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    text-decoration: none;
    border: none;
    outline: none;

    &:not(:disabled):not(.disabled) {
      cursor: pointer;
    }

    &-icon {
      display: inline-block;
      width: 34px;
      height: 26px;
      vertical-align: middle;
      content: "";
      background: no-repeat center center;
      background-size: cover;
      background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='%232b2b2b' stroke-width='4' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
    }
  }

  &__body {
    z-index: 1;
    position: absolute;
    width: 100%;
    white-space: nowrap;
    padding: 0;
    right: 0;
    top: $header-height;
    list-style: none;
    background-color: $k-bg-tan;

    &[aria-hidden="true"] {
      display: none;
    }

    a {
      display: inline-block;
      padding: 1rem;
      width: 100%;
      color: $text-0;
      font-weight: 600;
      text-decoration: none;

      &:hover {
        text-decoration: none;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }

    li {
      &:not(:first-child) {
        border-top: 1px solid $text-4;
      }

      &:last-child {
        border-bottom: 1px solid $text-4;
      }
    }
  }
}
</style>
