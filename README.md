# How to run this project

Clone this project and run these commands

```javascript
npm install
npm run build
npm run test
```

You can import and run update function from dist/index.js

```javascript
const update = require('path/to/update');

update({a: 1}, {a: {$set: 2}} // {a: 2};
```

# TODO

- update $merge test cases
- update $splice test cases

- $refactoring update function
