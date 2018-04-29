<template>
  <div class="Header">
    <div class="Header__height Header__width sm-hide xs-hide">
      <h1 class="Header__logo" style="float: left">
        <a :href="logoLink">
          <img class="Header__logo-img" :src="logoUrl" />
          <div class="sr-only">The Debt Collective Homepage</div>
        </a>
      </h1>

      <div class="mt16" style="float: right;">
        <ul class="list-reset">
          <li v-for="link in headerLinks" class="inline-block align-top" :key="link.href">
            <div class="">
              <a
                :class="`Header__link align-middle ${currentPath === link.href ? 'active' : ''}`"
                :href="link.href"
                :title="link.title"
                :onclick="link.onclick"
                >
                <p class="nav-item-wrapper">
                  {{link.text}}
                </p>
                <div class="active-underline" />
              </a>
            </div>  
          </li>
          <li class="inline-block align-top">
            <debt-collective-header-dropdown
              :links="dropdownLinks"
              style="margin-right: 1em"
            />
          </li>
          <li class="inline-block align-top">
            <profile-dropdown :user="user" v-if="user !== null"/>
            <a v-else class="Header__link align-middle">
              <p class="nav-item-wrapper">Login or Sign Up</p>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="Header__height Header__width md-hide lg-hide">
      Mobile header
    </div>
  </div>
</template>

<script>
import DebtCollectiveHeaderDropdown from "./Dropdown.vue";
import ProfileDropdown from "./ProfileDropdown.vue";
import { getCurrentUser } from "./services/ProfileService";

export default {
  components: { DebtCollectiveHeaderDropdown, ProfileDropdown },
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
    }
  },
  data() {
    return {
      currentPath: window.location.pathname,
      user: null
    };
  },
  created() {
    window["@@discourse-endpoint"] = this.discourseEndpoint;
    getCurrentUser()
      .then(u => (this.user = u))
      .catch(err => {
        if (err.error_type === "not_logged_in") {
          this.user = null;
        } else {
          console.error(err);
        }
      });
  }
};
</script>

<style scoped lang="scss">
@import "./variables";
@import "./shared";

.Header {
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  color: $text-0;
  border-bottom: 1px solid $text-4;
  background-color: #fcfbf7;
  font-family: "Libre Franklin", "Helvetica Neue", Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 0;

  .Dropdown__label {
    max-width: 150px;
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

    &.active {
      position: relative;

      .nav-item-wrapper {
        height: 36px;
      }

      .active-underline {
        border: 2px solid $dc-red;
        border-radius: 5px;
        background-color: $dc-red;
        margin: 0 5%;
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
}
</style>
