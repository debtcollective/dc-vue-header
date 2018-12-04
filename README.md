# dc-vue-header

This repo unifies the various Debt Collective websites under a single, responsive, header.

## Interfacing with Discourse

In order for this header to do it's job, our Discourse instance (used for SSO, notifications, messages, etc.) must be properly configured for CORS from each of the services implementing this header. Configuring Discourse for the header to work consists of three parts:

1.  Adding each service to the CORS list in Discourse
2.  Starting Discourse with the `DISCOURSE_ENABLE_CORS` environment variable set to `true`
3.  Installing the [discourse-utilities](https://github.com/debtcollective/discourse-utilities) plugin which adds the `X-Discourse-Username` header as an allowed header for the front-end to consume.

When implementing the header, you must pass in three things:

1.  The Discourse instance's base URL without a trailing `/` (`discourse-endpoint`)
2.  A configuration array of the links to display in the header (`header-links`)
3.  A configuration array of the links to hide in the "More" dropdown (`dropdown-links`)

The latter two are order-specific and when collapsed into the mobile view, the header links will come before the dropdown links in the hamburger menu.

You must also keep in mind that the Vue component shoud load _as soon as possible_ in order to reduce the amount of time it takes for the component to mount & make the first requests to Discourse for user profile information and notifications. In the dispute-tools, for instance, this consists of placing the script to mount the DebtCollectiveHeader component onto the outlet _right after the node we mount it to_.

The easiest way to include this into a service is to use the script and CSS in the Debt Collective static S3 bucket. These are automatically deployed the Circle CI configuration when master is pushed to, so they're always up to date with master (provided you use the latest version, which is configured as an environment variable in Circle CI itself):

```html
<script src="https://s3.amazonaws.com/tds-static/js/dc-vue-header/0.0.1/index.min.js"></script>
<link rel="stylesheet" href="https://s3.amazonaws.com/tds-static/css/dc-vue-header/0.0.1/index.min.css" />
```

Then to implement the header somewhere, you just have to something like:

```html
<div id="debt-collective-header"></div>

<script>
  new Vue({
    el: '#debt-collective-header',
    render(h) {
      return h('debt-collective-header', {
        attrs: {
          'header-links': [
            { text: 'Dispute Your Debt', href: '/dispute-tools' },
            { text: 'Campaigns', href: '#campaigns' },
            { text: 'Events', href: '#events' },
          ],
          'dropdown-links': [
            { text: 'News', href: '#news' },
            { text: 'Dispute Your Debt', href: '#dispute-your-debt', onclick: 'window.loggit()' },
            { text: 'About the Debt Collective', href: '#about' },
            { text: 'Community Wiki', href: '#wiki' },
            { text: 'Medicare For All', href: '#m4a' },
          ],
          'discourse-endpoint': discourseEndpoint,
        },
      });
    }
  });
</script>
```

## Developing this repo

### Set up

You need discourse running with CORS enabled:

```
DISCOURSE_ENABLE_CORS=true bundle exec rails server
```

Make sure nothing is running on port 8080 (for example, `dispute-tools`).

```
yarn install
```

Once you have the configuration file, update the example values in order to activate things like Sentry.

### Iterating

The best way to iterate is:

```
# builds the component and puts it in the public folder with a demo page
yarn build
# ran in repo root will serve the demo page (https://github.com/indexzero/http-server)
node_modules/.bin/http-server
```

You need to rebuild each time and make sure to clear your cache. At this point the expected behavior is that running the Discourse instance and then this application whenever you log in into Discourse the header will get updated.

In case of any issue with the expected behavior check the console for error, typically the CORS may be set wrongly or you should refresh both pages (localhost:3000 and localhost:8080)