/* eslint no-undef: 0 */

(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
      ? define(factory)
      : (global.APP_CONFIG = factory());
})(this, function() {
  return {
    SENTRY_DSN: "SENTRY_DSN"
  };
});
