
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "route": "/"
  },
  {
    "renderMode": 0,
    "route": "/portfolio"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 3917, hash: '48eef5e650f1b0a67e91422d2d78df87a16547b90ed169ec9a52cb9d9bd5498b', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1452, hash: '9b19c70b65765f088d25f19e1855366d2163f37f39d7ecd76f6a1fd7ae8a17ec', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-5I2SSEDN.css': {size: 642537, hash: 'NcVrBTwc6+I', text: () => import('./assets-chunks/styles-5I2SSEDN_css.mjs').then(m => m.default)}
  },
};
