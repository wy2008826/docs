/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "80cc2b95e9fcca8381f87ff8d6641504"
  },
  {
    "url": "aa.html",
    "revision": "5f2d9acb478e90c62a634a902f3d7402"
  },
  {
    "url": "assets/css/0.styles.0838d2fb.css",
    "revision": "ccfa1cd2be680e326229764b4a2d0b0d"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/2.c6a18c81.js",
    "revision": "b0dd26330410bad38dd18c0f76b5eded"
  },
  {
    "url": "assets/js/3.bd8e2ab0.js",
    "revision": "ad07cffe71950f62e9c95bf8d55f9703"
  },
  {
    "url": "assets/js/4.d6627195.js",
    "revision": "c8ce8da3c63206228289a95a81157960"
  },
  {
    "url": "assets/js/5.90d5f27c.js",
    "revision": "2ce808a80d5a10511fcc0b0ff44aa110"
  },
  {
    "url": "assets/js/6.9ed31d5f.js",
    "revision": "afdc7f0b99f5ec13a66e631648285d88"
  },
  {
    "url": "assets/js/7.1165f0d9.js",
    "revision": "88bdf9974790814db583e9304a50f330"
  },
  {
    "url": "assets/js/app.9fa08195.js",
    "revision": "f286166668f5a60b0ec457f7468163b1"
  },
  {
    "url": "css/index.html",
    "revision": "09eda6586910a6b03086f2da89cbc00e"
  },
  {
    "url": "img/a.jpg",
    "revision": "8599cd1a93c020419d27c9f391590aa1"
  },
  {
    "url": "index.html",
    "revision": "6b2e3134fff7290e665b37c349b88cda"
  },
  {
    "url": "index/index.html",
    "revision": "f00417b700d3690536f909f55f521965"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
