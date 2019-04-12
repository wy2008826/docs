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
    "revision": "8d61bc212ddf671db0f17f40e694bb99"
  },
  {
    "url": "assets/css/0.styles.1a4248fd.css",
    "revision": "2b499a87b9844d8cbc6ba3f47e632f6d"
  },
  {
    "url": "assets/fonts/iconfont.54cd4321.ttf",
    "revision": "54cd4321306620e76b2e0ae4c0cf93f9"
  },
  {
    "url": "assets/fonts/iconfont.55b0c673.woff",
    "revision": "55b0c6730034e90db7cbe6d52fc0a21b"
  },
  {
    "url": "assets/fonts/iconfont.d9a6740f.eot",
    "revision": "d9a6740f03b54b75c55d59867f9121c4"
  },
  {
    "url": "assets/img/iconfont.75259d5f.svg",
    "revision": "75259d5f7d61f5458bf6609dbf8eb0ab"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.fb0e58b8.js",
    "revision": "9ef25fe1a2c34c894dca4080aab4925b"
  },
  {
    "url": "assets/js/10.f1f21934.js",
    "revision": "b66147ebd693a0a96d776a5948c4ed56"
  },
  {
    "url": "assets/js/11.ee0958cb.js",
    "revision": "a5badf40d3edb6a52bc12ba7007aef5b"
  },
  {
    "url": "assets/js/12.c2cbc2bc.js",
    "revision": "b284a5da17687def0a709cac1a977b91"
  },
  {
    "url": "assets/js/13.256458d7.js",
    "revision": "920356f2357dff172af8beda8c903c1e"
  },
  {
    "url": "assets/js/14.d4abdbf9.js",
    "revision": "0ff6e2519e73c24316438bb46cfe77d3"
  },
  {
    "url": "assets/js/15.768c86df.js",
    "revision": "5ac5a22c98564390547b8c31035e5b04"
  },
  {
    "url": "assets/js/16.5431fb9d.js",
    "revision": "ae8f8179a50935ac7b8c95013c6b6622"
  },
  {
    "url": "assets/js/17.1681b395.js",
    "revision": "9e751b816b92165d00c488ab92f48652"
  },
  {
    "url": "assets/js/18.57b3524d.js",
    "revision": "6b7f8811b6ebc1afd36ecb1d56676367"
  },
  {
    "url": "assets/js/19.b5f4f705.js",
    "revision": "924c3bcc78e7deb4fc36f2b5ce6a0c94"
  },
  {
    "url": "assets/js/2.d1a8e32b.js",
    "revision": "278a289d992ec5248fc3b8fff6dca622"
  },
  {
    "url": "assets/js/20.b575386a.js",
    "revision": "507ffe6602c55ac2655b4a2546be1984"
  },
  {
    "url": "assets/js/21.e0ff8bb4.js",
    "revision": "5feeccae844bf30d19b14c3ae5e43723"
  },
  {
    "url": "assets/js/22.3ad13aec.js",
    "revision": "c58a255624d91e693a5036ab22aa202f"
  },
  {
    "url": "assets/js/23.1c991ae9.js",
    "revision": "6f87ec31e89739114afb264abb0c9a7d"
  },
  {
    "url": "assets/js/24.32c09892.js",
    "revision": "2413fb2ad6d1f2fd0a5750775cd68c51"
  },
  {
    "url": "assets/js/25.adff8faa.js",
    "revision": "13fd85986c80cd4d4033aff8c0af67da"
  },
  {
    "url": "assets/js/26.83519443.js",
    "revision": "6adae381f794cb835a6eb17650394277"
  },
  {
    "url": "assets/js/27.fccbb011.js",
    "revision": "7049f0293880e02d7c868e91b243e7af"
  },
  {
    "url": "assets/js/28.a4e71b08.js",
    "revision": "f0bf32b903647ef3cbbc47f229e50bac"
  },
  {
    "url": "assets/js/29.b8cf56eb.js",
    "revision": "8f25469c1ca2a3c874cff307dc89c843"
  },
  {
    "url": "assets/js/3.62a81943.js",
    "revision": "80338393590567a2970722cc73907fc0"
  },
  {
    "url": "assets/js/30.ef528b6d.js",
    "revision": "dc02c94049dee90fe3d0168a19f02086"
  },
  {
    "url": "assets/js/31.2ce429ee.js",
    "revision": "1705e50f3931e7baee7c53ac8ace3d1d"
  },
  {
    "url": "assets/js/32.4d3c2c8c.js",
    "revision": "598a6ba6bbc50d086c4a1f1f0e421363"
  },
  {
    "url": "assets/js/33.b4ec54a4.js",
    "revision": "730a06a945306f9775bd248ddb83c941"
  },
  {
    "url": "assets/js/34.9e37d62a.js",
    "revision": "ab54be588fd1c39b4c4651f2f019dca2"
  },
  {
    "url": "assets/js/35.3040014e.js",
    "revision": "7e465c60effc78099e3fcede855bddd9"
  },
  {
    "url": "assets/js/36.4a0f79b8.js",
    "revision": "a334ff54ef9b5b5615b4bb8321867ce2"
  },
  {
    "url": "assets/js/37.7d73d3b3.js",
    "revision": "1398a9ac034a2f0681f3a4c227584815"
  },
  {
    "url": "assets/js/4.d4ecbfa9.js",
    "revision": "71b6e57d3bf12b92ad43668aae72737c"
  },
  {
    "url": "assets/js/6.fb057e8f.js",
    "revision": "c519ac0e526546b4a9d04f8ba856f606"
  },
  {
    "url": "assets/js/7.05ccd263.js",
    "revision": "3beaa1efd87e620f868062624d464975"
  },
  {
    "url": "assets/js/8.82cecc2c.js",
    "revision": "9a3a53c7ff9980fd04fc9179a155b62e"
  },
  {
    "url": "assets/js/9.f111b7ea.js",
    "revision": "8411a3e7b1e4c8118b26e03acfcc87f7"
  },
  {
    "url": "assets/js/app.69004799.js",
    "revision": "b713b47616ffa436af83531dbf22b35e"
  },
  {
    "url": "comps/Button.html",
    "revision": "80127de4faff7911640e24e7b6e295df"
  },
  {
    "url": "comps/Input.html",
    "revision": "316a1b76b2d009b6ed23d7b6d27ea381"
  },
  {
    "url": "comps/Others.html",
    "revision": "a4d981d2f003a7e5d03a0db063555697"
  },
  {
    "url": "comps/Toast.html",
    "revision": "3012ae80d3a750baf7bdbd7044135ccf"
  },
  {
    "url": "css/components.html",
    "revision": "d617d146f9a4fe46451ead5229b15567"
  },
  {
    "url": "css/nameRule.html",
    "revision": "74ae41815cefb27e314be968dd174e18"
  },
  {
    "url": "css/problem.html",
    "revision": "c012578f5df156119a0583eb3ef389cb"
  },
  {
    "url": "css/uiRule.html",
    "revision": "52357bd38401d197a0f17d1012a75d8e"
  },
  {
    "url": "frontNewPerson/join.html",
    "revision": "d27d3d9765b1a6fa0d96ee1158e46aec"
  },
  {
    "url": "img/a.jpg",
    "revision": "8599cd1a93c020419d27c9f391590aa1"
  },
  {
    "url": "index.html",
    "revision": "14d892a6e5068c1aa7ff017e5e132465"
  },
  {
    "url": "index/index.html",
    "revision": "dfd3a4c19c1841471869ccd957a7bb56"
  },
  {
    "url": "scss/iconfont/iconfont.css",
    "revision": "e07b4806e46bc7bf1eb152934c85f519"
  },
  {
    "url": "scss/iconfont/iconfont.eot",
    "revision": "d9a6740f03b54b75c55d59867f9121c4"
  },
  {
    "url": "scss/iconfont/iconfont.svg",
    "revision": "75259d5f7d61f5458bf6609dbf8eb0ab"
  },
  {
    "url": "scss/iconfont/iconfont.ttf",
    "revision": "54cd4321306620e76b2e0ae4c0cf93f9"
  },
  {
    "url": "scss/iconfont/iconfont.woff",
    "revision": "55b0c6730034e90db7cbe6d52fc0a21b"
  },
  {
    "url": "scss/iconfont/iconfont.woff2",
    "revision": "7634e3386f290d54ab26df26c03d4963"
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
