'use strict';
console.log('Here is iframe');


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Get response in iframe, the request is from: ', request.from);
});
