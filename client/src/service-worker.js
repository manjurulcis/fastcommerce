workbox.setConfig({ debug: true });

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

// Single app navigation route
workbox.routing.registerNavigationRoute(
  workbox.precaching.getCacheKeyForURL("/index.html"),
  {
    blacklist: [new RegExp("/admin/*"), new RegExp("/api/*")]
  }
);

workbox.routing.registerRoute(
  new RegExp("/api/products/*"),
  new workbox.strategies.CacheFirst({
    cacheName: "products",
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 5 * 60
      })
    ]
  })
);

// Images
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "images"
  })
);
