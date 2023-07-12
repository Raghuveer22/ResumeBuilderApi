const viewApp = require('./view-app');
const apiApp = require('./api-app');

const viewPort = 3000; // Port for the view app
const apiPort = 8080; // Port for the API app

// Start the view app server
viewApp.listen(viewPort, () => {
  console.log(`View app is running on port ${viewPort}`);
});

// Start the API app server
apiApp.listen(apiPort, () => {
  console.log(`API app is running on port ${apiPort}`);
});
