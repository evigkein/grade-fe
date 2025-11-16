
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
    'index.csr.html': {size: 3917, hash: '3b3dac45666719d31cd9c93c841e2707380ea7c88a43aa352dfb5fb3cc554591', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1452, hash: '2218d8ae5bfd83010e42e0b8915fa45831cd74876df042eae1124fce26ad57b5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-5I2SSEDN.css': {size: 642537, hash: 'NcVrBTwc6+I', text: () => import('./assets-chunks/styles-5I2SSEDN_css.mjs').then(m => m.default)}
  },
};
