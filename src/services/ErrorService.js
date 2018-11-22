/* global Sentry */
/* eslint no-console: 0 */

const defaultOpts = { level: "warning" };

export const captureMessage = (errorMessage, data, opts = defaultOpts) => {
  // Consider update if more than one object needs to be added into the scope
  const extraKey = Object.keys(data)[0];
  const extraData = data[extraKey];

  console.warn(errorMessage, extraData);

  Sentry.withScope(scope => {
    scope.setLevel(opts.level);
    scope.setExtra(`${extraKey}`, extraData);

    Sentry.captureMessage(errorMessage);
  });
};
