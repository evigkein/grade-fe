import './polyfills.server.mjs';
function a(r,n,e){let i=e?.field??"_id",t=`${n?.[i]??r}`;return e?.isDeep?JSON.stringify(n):t}export{a};
