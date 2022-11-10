chrome.contextMenus.create({
    id: "sendImage",
    title: "Send Image",
    type: 'normal',
    contexts: ['image']
});

chrome.contextMenus.onClicked.addListener(async (item, tab) => {
    chrome.storage.sync.set({ image: item.srcUrl });
    const { serverId } = await chrome.storage.sync.get('serverId')
    if (typeof(serverId) === 'undefined') {
        chrome.storage.sync.set({ responseStatus: 'No Server Id' });
        return chrome.storage.sync.set({ responseText: 'Go into options to set it.' });
    }
    const { userId } = await chrome.storage.sync.get('userId')
    if (typeof(userId) === 'undefined') {
        chrome.storage.sync.set({ responseStatus: 'No User Id' });
        return chrome.storage.sync.set({ responseText: 'Go into options to set it.' });
    }
    //https://Web-Image-Poster-Discord-Bot.charanchandran.repl.co/
    const response = await fetch('https://51hcsp.sse.codesandbox.io/new-message', {
        method: 'POST',
        body: JSON.stringify({server: serverId, channel: userId, image: item.srcUrl}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const responseText = await response.text();
    chrome.storage.sync.set({ responseText });
    const responseStatus = response.status;
    if (responseStatus !== 200) {
        chrome.action.setBadgeText({ text: 'grr' });
        chrome.action.setBadgeBackgroundColor({ color: '#F00' });
    }
    chrome.storage.sync.set({ responseStatus });
    console.log('jko')
});