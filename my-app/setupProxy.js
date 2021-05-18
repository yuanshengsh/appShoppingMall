const proxy = require("http-proxy-middleware");
 
module.exports = function(app) {
  app.use(
    proxy("/api", {
      target: "http://www.adaday.cn:8080/",
      changeOrigin: true
    })
  );
//   app.use(
//     proxy("/fans/**", {
//       target: "https://easy-mock.com/mock/5c0f31837214cf627b8d43f0/",
//       changeOrigin: true
//     })
//   );
  proxy.on('proxyReq', function onProxyReq(proxyReq, req, res) {
    console.log('proxyReq',proxyReq);
    console.log('req',req);
    console.log('res',res);
    proxyReq.setHeader('x-added', 'foobar');
  });
};
