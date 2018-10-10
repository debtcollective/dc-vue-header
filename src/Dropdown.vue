<template>
  <div>
    <div class="align-middle Dropdown">
      <button :class="`Dropdown__head nav-item-wrapper ${active ? 'active' : ''}`" type="button" @click="toggleActive">More 
        <svg width="16" height="11" viewBox="0 0 16 11" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Canvas" fill="none">
            <g id="Vector 2.5">
              <path d="M 0 6.35294L 6 0L 12 6.35294" stroke-width="3" transform="translate(2 8.35303) scale(1 -1)" stroke="#2B2B2B"/>
            </g>
          </g>
        </svg>
      </button>
      <ul class="Dropdown__body" aria-label="submenu" :aria-hidden="(!active).toString()">
        <li v-for="link in links" :key="link.href">
          <a :href="link.href" class="Dropdown__item" role="button" :onclick="link.onclick" :title="link.title" :rel="link.href[0] !== '/' ? 'noopener noreferrer' : ''">
            {{link.text}}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "DebtCollectiveHeaderDropdown",
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
      if (!this.active) {
        document.addEventListener("click", this.handleOffMenuClick);
      } else {
        document.removeEventListener("click", this.handleOffMenuClick);
      }

      this.active = !this.active;
    },
    handleOffMenuClick({ target: { classList } }) {
      // Any click on a menu item should close the menu, so we only care about
      // preventing duplicated toggles which the menu head is clicked
      if (!classList.contains("Dropdown__head")) this.toggleActive();
    }
  }
};
</script>

<style scoped lang="scss">
@import "./variables";
@import "./shared";

.Dropdown {
  position: relative;

  &__head {
    background: none;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    font-weight: 600;
    padding: 6px 18px;
    border-radius: 4px;
    box-sizing: border-box;
    border: none;

    &.active {
      padding: 9px 17px;
      border: 1px solid $text-3;
      color: $text-0 !important;
    }

    &:hover {
      cursor: pointer;
      padding: 6px 17px;
    }
  }

  &__body {
    z-index: 1;
    position: absolute;
    width: 20em;
    white-space: nowrap;
    padding: 0;
    right: 0;
    top: 44px;
    list-style: none;
    background-color: $k-bg-tan;
    border-radius: 8px;
    border: 1px solid $text-3;

    &[aria-hidden="true"] {
      display: none;
    }

    a {
      display: inline-block;
      padding: 1rem 1rem;
      width: 100%;

      /* Ensures the background color on hover does
       not extend outside the radius of the parent li */
      border-top-left-radius: inherit;
      border-top-right-radius: inherit;
      border-bottom-left-radius: inherit;
      border-bottom-right-radius: inherit;

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }

    li {
      &:not(:first-child) {
        border-top: 1px solid $text-4;
      }

      &:first-child {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }

      &:last-child {
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
      }
    }
  }
}
</style>
