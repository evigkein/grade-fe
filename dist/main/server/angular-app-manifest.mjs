
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
    "route": "/payment"
  },
  {
    "renderMode": 0,
    "route": "/account"
  },
  {
    "renderMode": 0,
    "route": "/account/transactions"
  },
  {
    "renderMode": 0,
    "route": "/taxi"
  },
  {
    "renderMode": 0,
    "route": "/taxi/*"
  },
  {
    "renderMode": 0,
    "route": "/booking"
  },
  {
    "renderMode": 0,
    "route": "/booking/*"
  },
  {
    "renderMode": 0,
    "route": "/reviews"
  },
  {
    "renderMode": 0,
    "route": "/faq"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 4072, hash: 'e2efd7bb050a2c47e681d32fcb9da92b60492a84caf6a2042944d243ad461326', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1511, hash: 'ba10c8bf8242edb5cba2a6e503e3ea56e1555d5acace9749dfeab9b4df242814', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-ZR2TEJ2D.css': {size: 640087, hash: 'vudyp64lq64', text: () => import('./assets-chunks/styles-ZR2TEJ2D_css.mjs').then(m => m.default)}
  },
};
