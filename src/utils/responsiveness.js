const toggleDropdownVisibility = dropdown => {
  // Only shows the dropdown if there is somthing within
  let links = dropdown.querySelectorAll("li");

  if (links.length > 0) {
    dropdown.style.display = "inline-block";
  } else {
    dropdown.style.display = "none";
  }
};

/**
 * Applies the "Priority+ Alt"
 * as was called by @bradfrost to a navigation
 *
 * @param {DOMElement} container idle the container that holds the navigation and its siblings
 */
export const priorityPattern = container => {
  const dropdown = container.querySelector("#more-item");
  const dropdownWidth = dropdown.getBoundingClientRect().width;
  const dropdownItemsCount = dropdown.querySelectorAll("li").length;

  const links = [
    ...container.querySelectorAll("nav ul > .nav-link:not(.hidden-nav-link)")
  ];
  let navLinksWidth = 0;

  links.filter(link => link.style.display !== "none").forEach(link => {
    const { width } = link.getBoundingClientRect();

    navLinksWidth += width;
  });

  const nav = container.querySelector(".Header__nav");
  const navContainerWidth = nav.getBoundingClientRect().width;
  let emptySpace = navContainerWidth - navLinksWidth;

  const latestItem = links.slice(-1)[0];
  const latestItemWidth = latestItem.getBoundingClientRect().width;

  if (dropdownItemsCount > 0) {
    // we now know the dropdown is being visible
    emptySpace = Math.ceil(emptySpace - dropdownWidth);
  }

  const firstOnDropdown = container.querySelector(".dropdown-item-extra");
  const firstOnDropdownWidth = firstOnDropdown
    ? +firstOnDropdown.dataset.width
    : 0;

  const allNavLinksWidth = navLinksWidth + firstOnDropdownWidth;

  if (emptySpace <= 0) {
    // move the latest item to the dropdown
    window.test = {
      dropdown,
      latestItem
    };
    dropdown
      .querySelector("ul")
      .insertAdjacentHTML(
        "afterbegin",
        `<li class="dropdown-item-extra" data-width=${latestItemWidth}>${
          latestItem.innerHTML
        }</li>`
      );

    // we hide the item that we just pretend to move
    latestItem.classList.add("hidden-nav-link");
  } else if (
    (firstOnDropdownWidth &&
      allNavLinksWidth + dropdownWidth < navContainerWidth) ||
    (dropdownItemsCount === 1 && allNavLinksWidth < navContainerWidth)
  ) {
    // put more latest item back
    container
      .querySelector(".hidden-nav-link")
      .classList.remove("hidden-nav-link");

    container
      .querySelector(".dropdown-container ul")
      .removeChild(firstOnDropdown);
  }

  toggleDropdownVisibility(dropdown);
};

/**
 * Binds the priorityPattern on window.onresize
 *
 * @param {DOMElement} container idle the container that holds the navigation and its siblings
 */
export const bindPriorityPattern = container => {
  _addEvent(window, "resize", () => {
    priorityPattern(container);
  });

  _addEvent(window, "load", () => {
    priorityPattern(container);
  });
};

/**
 * Avoid to include a library as JQuery or extra vue helper
 * to manage edge cases of the resize event. https://bit.ly/2BZiL0M
 */
const _addEvent = function(object, type, callback) {
  if (object == null || typeof object == "undefined") return;
  if (object.addEventListener) {
    object.addEventListener(type, callback, false);
  } else if (object.attachEvent) {
    object.attachEvent("on" + type, callback);
  } else {
    object["on" + type] = callback;
  }
};
