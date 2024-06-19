const { warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');
const { InjectManifest } = require('workbox-webpack-plugin');

// The precacheAndRoute() method takes an array of URLs to precache. The self._WB_MANIFEST is an array that contains the list of URLs to precache.
precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});


registerRoute(
  ({ request }) => request.mode === 'navigate', pageCache);

// Set up asset cache
registerRoute(
  // Here we define the callback function that will filter the requests we want to cache (in this case, JS and CSS files)
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    // Name of the cache storage.
    cacheName: 'asset-cache',
    plugins: [
      // This plugin will cache responses with these headers to a maximum-age of 30 days
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, //30 Days
      })
    ],
  })
);

const nextConfig = {
  webpack(config, options) {
    if (!options.isServer) {
      const workboxPlugin = new InjectManifest({
        swSrc: "./src/service-worker/index.ts",
        swDest: "../public/service-worker.js",
        // In dev, exclude everything.
        // This avoids irrelevant warnings about chunks being too large for caching.
        // In non-dev, use the default `exclude` option, don't override.
        ...(options.dev ? { exclude: [/./] } : undefined),
      })
      if (options.dev) {
        // Suppress the "InjectManifest has been called multiple times" warning by reaching into
        // the private properties of the plugin and making sure it never ends up in the state
        // where it makes that warning.
        // https://github.com/GoogleChrome/workbox/blob/v6/packages/workbox-webpack-plugin/src/inject-manifest.ts#L260-L282
        Object.defineProperty(workboxPlugin, "alreadyCalled", {
          get() {
            return false
          },
          set() {
            // do nothing; the internals try to set it to true, which then results in a warning
            // on the next run of webpack.
          },
        })
      }
      config.plugins.push(workboxPlugin)
    }
    return config
  }
}
