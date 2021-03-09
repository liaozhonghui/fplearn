requirejs.config({
  paths: {
    ramda: 'https://cdnjs.cloudflare.com/ajax/libs/ramda/0.13.0/ramda.min',
    jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min'
  }
});

// 使用require.js进行加载js脚本
require([
  'ramda',
  'jquery'
], function (_, $) {
  // 栈打印
  const trace = _.curry(function (tag, x) {
    console.log(tag, x);
    return x;
  });
  // 不纯的函数处理
  const Impure = {
    getJSON: _.curry(function (callback, url) {
      $.getJSON(url, callback);
    }),
    setHtml: _.curry(function (sel, html) {
      $(sel).html(html);
    })
  };
  const img = function (url) {
    return $('<img />', { src: url });
  };
  // Pure

  // url:: String-> URL
  const url = function (term) {
    return 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + term + '&format=json&jsoncallback=?';
  };

  // const app = _.compose(Impure.getJSON(trace('response')), url);

  // 声明式代码
  const mediaUrl = _.compose(_.prop('m'), _.prop('media'));
  const mediaToImg = _.compose(img, mediaUrl);
  const images = _.compose(_.map(mediaToImg), _.prop('items'));
  const renderImages = _.compose(Impure.setHtml('body'), images);
  // Impure.getJSON(renderImages) = (url) => {
  //     $.getJSON(url, callback);
  // }
  const app = _.compose(Impure.getJSON(renderImages), url);

  app('cats');

});
