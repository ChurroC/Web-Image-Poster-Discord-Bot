//https://developer.chrome.com/docs/extensions/mv3/getstarted/#options
let color = '#3aa757';

chrome.runtime.onInstalled.addListener(async () => {
    await chrome.storage.sync.set({ color });
    console.log('Default background color set to %cgreen', `color: ${color}`);
});