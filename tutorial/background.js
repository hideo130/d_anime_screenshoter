let color = '#3aa757';
console.log('call background')
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

// chrome.tabs.onActivated.addListener(function (activeInfo) {
//     chrome.tabs.get(activeInfo.tabId, function (tab) {
//         y = tab.url;
//         console.log("hello!:", y);

//         var xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function () {
//             if (this.readyState == 4 && this.status == 200) {
//                 console.log(this.responseText);
//             }
//         };
//         console.log("kitakita");
//         xhttp.open("POST", "http://127.0.0.1:2525/send_url");
//         xhttp.send("url=" + y);

//     });
// });
