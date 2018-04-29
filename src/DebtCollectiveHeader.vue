<template>
  <div class="Header">
    <div class="Header__height Header__width sm-hide xs-hide">
      <h1 class="Header__logo" style="float: left">
        <a :href="logoLink">
          <img class="Header__logo-img" :src="logoUrl" />
          <div class="sr-only">The Debt Collective Homepage</div>
        </a>
      </h1>

      <div class="-fh" style="float: right;">
        <ul class="-fh list-reset">
          <li v-for="link in headerLinks" class="inline-block align-top -fh" :key="link.href">
            <div class="table -fh">
              <a
                :class="`Header__link table-cell align-middle -fh ${currentPath === link.href ? 'active' : ''}`"
                :href="link.href"
                :title="link.title"
                :onclick="link.onclick"
                >
                <p class="nav-item-wrapper">{{link.text}}</p>
              </a>
            </div>  
          </li>
          <li class="inline-block align-top -fh">
            <debt-collective-header-dropdown
              :links="dropdownLinks"
              style="margin-right: 1em"
            />
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

export default {
  components: { DebtCollectiveHeaderDropdown },
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
    }
  },
  data() {
    return {
      currentPath: window.location.pathname
    };
  }
};
</script>

<style scoped lang="scss">
@import "./variables";

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
}

.Header a,
.Header a:hover {
  text-decoration: none;
}

.Header .Dropdown__label {
  max-width: 150px;
}

.Header__height {
  height: 72px;
}

.Header__logo-img {
  display: block;
  height: 54px;
  margin: 9px 9px;
}

.Header__link {
  color: $text-0;
  font-weight: 600;
  height: 100%;
}

.Header__link.active {
  position: relative;
}

.Header__link.active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 0;
  border: 2px solid $dc-red;
  border-radius: 5px;
  width: 86%;
  background-color: $dc-red;
  transform: translateY(-16px) translateX(10px);
}

.Header__dropdown-item {
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

.nav-item-wrapper {
  padding: 6px 18px;
  border-radius: 4px;
  box-sizing: border-box;
}

.nav-item-wrapper:hover {
  border: 1px solid $text-3;
  padding-left: 17px;
  padding-right: 17px;
  color: $text-0 !important;
}

.active .nav-item-wrapper:hover {
  border: none;
  padding: 6px 18px;
}
</style>
