// contentScript.js
console.log('Here is contentScript');

createIframe();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Get response in contentScript, the request is from: ', request.from);
});

// 透過下面的程式碼可以注入 iframe
function createIframe() {
    // STEP 1：建立一個 `div`，並將它 `append` 在網頁內
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    
    // STEP 2：建立一個 `iframe` 元素，`src` 的地方透過
    // `chrome.runtime.getURL(<檔案名稱>)` 載入 extension 內部的檔案
    const iframe = document.createElement('iframe');
    iframe.id = 'iframe-in-root';
    iframe.allow = 'microphone;camera;';
  iframe.sandbox = 'allow-scripts allow-same-origin allow-forms';
  iframe.setAttribute('allowFullScreen', '');
  iframe.scrolling = 'no';
  iframe.style.cssText = `
  width: 100%;
  height: 100%;
  border: 0;
  margin: 0;
  z-index: 2147483647;
  border: 1px solid #EAEAEA;
  filter: none;
  display: block;
  `;

  console.log('Here is contentScript');
  
  // ⚠️ 重點：src 要帶入的連結是 chrome extension 內部的網址
  iframe.src = chrome.runtime.getURL('template.html');
  console.log('Here is contentScript');
  
  root.style.cssText = `
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 2147483647;
  
  `;
  // pointer-events: none;
  // STEP 3：將 iframe 元素掛載到 root 元素內
  root.prepend(iframe);
}