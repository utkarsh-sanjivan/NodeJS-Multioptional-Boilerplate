# Build the JS server
echo 'π  Creating Javacript Application...'
node ./bin/createNodeApp.js --folder node-js-project
echo 'π Opening the application'
cd node-js-project
echo 'π Eslint Test'
npm run eslint:check
echo 'π Prettier Test'
npm run prettier:check
echo 'π» Test Cases'
npm run test
echo 'π¨π»βπ» Removing the application'
cd ..
rm -r  node-js-project

# Build the TS server
echo 'π  Creating Typescript Application...'
node ./bin/createNodeApp.js --folder node-ts-project --script ts
echo 'π Opening the application'
cd node-ts-project
echo 'π Eslint Test'
npm run eslint:check
echo 'π Prettier Test'
npm run prettier:check
echo 'π» Test Cases'
npm run test
echo 'π¨π»βπ» Removing the application'
cd ..
rm -r node-ts-project

# all done!
echo 'ππTests Passed successfullyπ―π―'