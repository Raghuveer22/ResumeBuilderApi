const viewApp = require('./viewApp');
const apiApp = require('./apiApp');

const viewPort = 3000;
const apiPort = 8080;

viewApp.listen(viewPort, () => {
  console.log(`View app is running on port ${viewPort}`);
});

apiApp.listen(apiPort, () => {
  console.log(`API app is running on port ${apiPort}`);
});
