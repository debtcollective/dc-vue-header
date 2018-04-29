<template>
  <div class="table -fh">
    <div class="table-cell align-middle Dropdown">
      <button :class="`Dropdown__head ${active ? 'active' : ''}`" type="button" @click="() => active = !active">More 
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
          <a :href="link.href" class="Dropdown__item" role="button" :onclick="link.onclick" :title="link.title">
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
    handleDropdownClick() {
      this.active = !this.active;
    }
  }
};
</script>

<style scoped lang="scss">
@import "./variables";

.Dropdown {
  position: relative;
}

.Dropdown__head {
  background: none;
  border: none;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: 600;
  padding: 6px 18px;
  border-radius: 4px;
  box-sizing: border-box;
}

.Dropdown__head:hover,
.Dropdown__head.active {
  border: 1px solid $text-3;
  padding-left: 17px;
  padding-right: 17px;
  color: $text-0 !important;
}

.Dropdown__body {
  z-index: 1;
  position: absolute;
  min-width: 150%;
  white-space: nowrap;
  padding: 0;
  right: 0;
  list-style: none;
  background-color: $k-bg-tan;
  border-radius: 5px;
  border: 1px solid $text-3;

  &[aria-hidden="false"] {
    opacity: 1;
    transform: translate3d(0, 10px, 0);
    transition: opacity 100ms linear, transform 100ms ease-in;
  }

  &[aria-hidden="true"] {
    opacity: 0;
    transform: translate3d(0, 0, 0);
    transition: visibility 0ms linear 100ms opacity 100ms linear,
      transform 100ms ease-in;
  }

  a {
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
    padding: 1rem 0;

    &:not(:first-child) {
      border-top: 1px solid $text-4;
    }

    &:first-child {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    &:last-child {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
}
</style>
