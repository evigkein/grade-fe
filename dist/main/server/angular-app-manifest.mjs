
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
    'index.csr.html': {size: 3560, hash: '2d7ff4b64d06730bf777911eb3a21bedd22ceebb80d8e9e12a253893ab12cf90', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1095, hash: '55748d0eb52ff969eaf36de13565a6a05f7e353144a284322dd17d08c378cc04', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-6YLQLOXP.css': {size: 642541, hash: 'z8Cu6XhSbLQ', text: () => import('./assets-chunks/styles-6YLQLOXP_css.mjs').then(m => m.default)}
  },
};
