import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

/* eslint-disable no-console */

const port = 3001;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static('dist'));


const attributes = [{
  metadataName: "Country",
  id: "country",
  operator: [
    "Equals",
    "IN"
  ],
  metadataType: "DROPDOWN"
}, {
  metadataName: "Language",
  id: "language",
  operator: [
    "Equals",
    "IN"
  ],
  metadataType: "DROPDOWN"
}, {
  metadataName: "Stores",
  id: "stores",
  operator: [
    "Equals",
    "IN"
  ],
  metadataType: "TEXTAREA"
}, {
  metadataName: "Segments",
  id: "segments",
  operator: [
    "Equals"
  ],
  metadataType: "DROPDOWN"
}];
const values = {
  country: [{
    id: "CZ",
    value: "Czech Republic"
  }, {
    id: "HU",
    value: "Hungary"
  }, {
    id: "MY",
    value: "Malaysia"
  }, {
    id: "PL",
    value: "Poland"
  }, {
    id: "SK",
    value: "Slovakia"
  }, {
    id: "TH",
    value: "Thailand"
  }],
  language: [{
    id: "cs_CZ",
    value: "Czech"
  }, {
    id: "en_GB",
    value: "English"
  }, {
    id: "hu_HU",
    value: "Hungarian"
  }, {
    id: "ms_MY",
    value: "Malay"
  }, {
    id: "pl_PL",
    value: "Polish"
  }, {
    id: "sk_SK",
    value: "Slovak"
  }, {
    id: "th_TH",
    value: "Thai"
  }],
  stores: [{
    storeName: "Tesco London",
    storeId: "1",
    storeRegion: "London"
  }, {
    storeName: "Tesco Reading",
    storeId: "2",
    storeRegion: "Reading"
  }],
  segments: [{
    id: "anonymousCustomer",
    value: "Anonymous Customer"
  }, {
    id: "knownCustomer",
    value: "Known Customer"
  }, {
    id: "firstTimeShopper",
    value: "First Time Shopper"
  }]
};

app.get('/magnoliaAuthor/.rest/target/v1/values/:id', function(req, res){
  const id = req.params.id;
  res.setHeader('content-type', 'text/javascript');
  res.send(values[id]);
});

app.get('/magnoliaAuthor/.rest/target/v1/keys', function(req, res){
  res.setHeader('content-type', 'text/javascript');
  res.send(attributes);
});

app.get('/magnoliaAuthor/.rest/rules/v1/rules/permission/GHS-UK/fts', function(req, res){
  res.setHeader('content-type', 'text/javascript');
  res.send({
    writePermission: true
  });
});


app.get('/', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
