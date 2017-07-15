# Kenyan Election Predictor on Map
[Demo](https://kenyanelectionpredictor.herokuapp.com)

### OVERIVEW
This is a simple React + D3 + Express App intended to assist people looking to play around counties and see if their candidate can win.

* a lightweight webpack config (for development and production)
* Heroku-ready deployment setup
* Currently just has 2 Presidential candidates.

### UP & RUNNING
* Install dependencies
`$ npm install` or `$ yarn`

* Fire up a development server:
* `$ npm run dev`

Once the server is running, you can visit `http://localhost:8080/`

### Linting
_This assumes you have eslint and eslint-watch installed. If you don't, run the following:_
```
$ npm i -g eslint eslint-watch
```
or if you need permissions:
```
$ sudo npm i -g eslint eslint-watch
```

To run the linter once:
```
$ npm run lint
```

To run the watch task:
```
$ npm run lint:watch
```

### Testing

To run the tests:
```
$ npm test
```

### Production Build

To build your production assets and run the server:
```
$ npm start
```

### DEPLOYING TO HEROKU
This app is set up for deployment to Heroku!

_This assumes you have already have a Heroku account and have the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed_
```
$ heroku login
$ heroku create -a name-of-your-app
$ git push heroku master
$ heroku open
```

Heroku will follow the `build` command in your `package.json` and compile assets with `webpack.prod.config.js`. It runs the Express web server in `server.js`.

If you're unfamiliar with Heroku deployment (or just need a refresher), they have a really great walkthrough [here](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction).
