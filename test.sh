# Build the JS server
echo '🛠 Creating Javacript Application...'
node ./bin/createNodeApp.js --folder node-js-project
echo '👁 Opening the application'
cd node-js-project
echo '📋 Eslint Test'
npm run eslint:check
echo '💋 Prettier Test'
npm run prettier:check
echo '💻 Test Cases'
npm run test
echo '👨🏻‍💻 Removing the application'
cd ..
rm -r  node-js-project

# Build the TS server
echo '🛠 Creating Typescript Application...'
node ./bin/createNodeApp.js --folder node-ts-project --script ts
echo '👁 Opening the application'
cd node-ts-project
echo '📋 Eslint Test'
npm run eslint:check
echo '💋 Prettier Test'
npm run prettier:check
echo '💻 Test Cases'
npm run test
echo '👨🏻‍💻 Removing the application'
cd ..
rm -r node-ts-project

# all done!
echo '🎉🎉Tests Passed successfully🎯🎯'