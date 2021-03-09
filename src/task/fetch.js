const { compose, prop, head } = require('ramda');
const fetch = require('node-fetch');

const url = function (term) {
  return 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + term + '&format=json';
};

fetch('http://api.flickr.com/services/feeds/photos_public.gne?tags=video')
  .then(res => {
    // const firstTitle = compose(prop('title'), head, prop('items'));
    // console.log(firstTitle(res));
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });
