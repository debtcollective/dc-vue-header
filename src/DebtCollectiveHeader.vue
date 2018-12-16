<template>
  <div class="Header">
    <div class="Header__height Header__width sm-hide xs-hide">
      <h1 class="Header__logo" style="float: left">
        <a :href="logoLink">
          <img class="Header__logo-img" :src="logoUrl" />
          <div class="sr-only">The Debt Collective Homepage</div>
        </a>
      </h1>

      <div style="display: flex; justify-content: flex-end;">
        <nav class="Header__nav">
          <ul class="list-reset">
            <li v-for="link in filteredHeaderLinks" class="inline-block align-top nav-link nav-item" :key="link.href">
              <div class="">
                <a
                  :class="`Header__link align-middle ${currentPath === link.href ? 'active' : ''}`"
                  :href="link.href"
                  :title="link.title"
                  :onclick="link.onclick"
                  :rel="link.href[0] !== '/' ? 'noopener noreferrer' : ''"
                  >
                  <p class="nav-item-wrapper">
                    {{link.text}}
                  </p>
                  <div class="active-underline" />
                </a>
              </div>  
            </li>
            <li id="more-item" class="inline-block align-top nav-item" style="display: none;">
              <debt-collective-header-dropdown
                :links="filteredDropdownLinks"
                style="margin-right: 1em"
              />
            </li>
          </ul>
        </nav>
        <div id="session-item" class="inline-block align-top nav-item" v-if="user !== null">
          <profile-dropdown />
        </div>
        <div id="session-item" class="inline-block align-top nav-item" v-else>
          <a class="Header__link align-middle" :href="loginEndpoint || `${discourseEndpoint}/login`" rel="noopener noreferrer">
            <p class="nav-item-wrapper md-hide">Login or Sign up</p>
            <p class="nav-item-wrapper lg-hide">Login</p>
        </div>
      </div>
    </div>

    <div class="Header__height Header__mobile md-hide lg-hide">
      <hamburger-dropdown :links="[...filteredHeaderLinks, ...filteredDropdownLinks]"/>

      <h1 :class="`Header__logo ${user !== null ? '-logged-in' : ''}`" style="margin: auto">
        <a :href="logoLink">
          <img class="Header__logo-img" :src="logoUrl" />
          <div class="sr-only">The Debt Collective Homepage</div>
        </a>
      </h1>

      <div>
        <profile-dropdown v-if="user !== null" style="float: right" />
        <a v-else class="Header__link align-middle" :href="loginEndpoint || `${discourseEndpoint}/login`" rel="noopener noreferrer">
          <p class="nav-item-wrapper xs-hide">Login or Sign up</p>
          <p class="nav-item-wrapper sm-hide">Login</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import DebtCollectiveHeaderDropdown from "./Dropdown.vue";
import ProfileDropdown from "./ProfileDropdown.vue";
import HamburgerDropdown from "./HamburgerDropdown.vue";
import { getCurrentUser, getCsrfToken } from "./services/ProfileService";
import { discourseEndpoint } from "./services/service"; // eslint-disable-line no-unused-vars
import filterLinks from "./utils/filterLinks";
import { bindPriorityPattern } from "./utils/responsiveness";

export default {
  components: {
    DebtCollectiveHeaderDropdown,
    ProfileDropdown,
    HamburgerDropdown
  },
  name: "DebtCollectiveHeader",
  props: {
    logoUrl: {
      type: String,
      default:
        "https://s3.amazonaws.com/tds-static/img/debtcollective/0.0.1/DC-logo_FULL_WHITE@3x.png"
    },
    logoLink: {
      type: String,
      default: "/"
    },
    headerLinks: {
      type: Array,
      required: true
    },
    dropdownLinks: {
      type: Array,
      required: true
    },
    avatarUrl: {
      type: String
    },
    discourseEndpoint: {
      type: String,
      required: true
    },
    toolsEndpoint: {
      type: String,
      required: true
    },
    loginEndpoint: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      currentPath: window.location.pathname,
      user: null
    };
  },
  computed: {
    filteredDropdownLinks() {
      return filterLinks(this.dropdownLinks)(this.user);
    },
    filteredHeaderLinks() {
      return filterLinks(this.headerLinks)(this.user);
    }
  },
  created() {
    this.computeUser();
  },
  mounted() {
    this.bindPriorityPattern();
  },
  methods: {
    computeUser() {
      window["@@discourse-endpoint"] = this.discourseEndpoint;
      window["@@tools-endpoint"] = this.toolsEndpoint;
      getCurrentUser()
        .then(({ user }) => {
          this.user = user;
          return getCsrfToken();
        })
        .catch(err => {
          console.error(err);
        });
    },
    bindPriorityPattern() {
      // https://bit.ly/2QzILIm
      bindPriorityPattern(this.$el);
    }
  }
};
</script>

<style scoped lang="scss">
@import "./variables";
@import "./shared";

#session-item a {
  display: flex;
  height: 100%;
  align-items: center;
}

.Header {
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  color: $text-0;
  border-bottom: 1px solid $color--header-border;
  background-color: $color--header-bg;
  font-family: "Libre Franklin", "Helvetica Neue", Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 0;

  .Dropdown__label {
    max-width: 150px;
  }

  &__nav {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
    height: 100%;

    .hidden-nav-link {
      display: none;
    }

    .dropdown-container {
      height: 100%;
      display: flex;
      align-items: center;
    }

    .nav-item a {
      display: flex;
      align-items: center;
    }
  }

  &__height {
    height: 72px;
  }

  &__logo-img {
    display: block;
    height: 54px;
    margin: 9px 9px;
  }

  &__link {
    color: $text-0;
    font-weight: 600;
    height: 100%;
    position: relative;

    &.active {

      .active-underline {
        background-color: $dc-red;
        border-radius: 5px;
        border: 2px solid $dc-red;
        bottom: 18px;
        left: 0;
        margin: 0 5%;
        position: absolute;
        right: 0;
      }
    }
  }

  &__dropdown-item {
    display: block;
    width: 100%;
    padding: 0.25em 1.75em;
    border: none;
    font: inherit;
    font-weight: 500;
    text-align: left;
    color: $text-0;
    cursor: pointer;
    transition: color 260ms;
  }

  &__mobile {
    display: flex;
    align-items: center;
    justify-content: space-around;

    .Header {
      &__logo {
        @media (max-width: 40em) {
          padding-left: 5%;
        }

        &:not(.-logged-in) {
          @media (min-width: 40em) and (max-width: 52em) {
            padding-left: 10%;
          }
        }
      }
    }
  }
}
</style>
