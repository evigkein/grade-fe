
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
    'index.csr.html': {size: 3936, hash: 'a80789696daa64864a80744731bfcebb94ca4c6111a1a4bb448cda35eb86500c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1452, hash: '4aab9287a0b40b414ff36dd0b6d977f2b03555265c0cfed974fc24988a1b3aa8', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-3POJYOKT.css': {size: 643600, hash: 'EiaBb5scRug', text: () => import('./assets-chunks/styles-3POJYOKT_css.mjs').then(m => m.default)}
  },
};
