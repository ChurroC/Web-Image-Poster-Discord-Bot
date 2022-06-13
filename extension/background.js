chrome.contextMenus.create({
    id: "sendImage",
    title: "Send Image",
    type: 'normal',
    contexts: ['image']
});

chrome.contextMenus.onClicked.addListener(async (item, tab) => {
    const { serverId } = await chrome.storage.sync.get('serverId')
    if (typeof(serverId) === 'undefined') return console.log('kghjo')
    chrome.storage.sync.set({ image: item.srcUrl });

    const response = await fetch('https://Web-Image-Poster-Discord-Bot.charanchandran.repl.co/new-message', {
        method: 'POST',
        body: JSON.stringify({server: serverId, image: item.srcUrl}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const responseText = await response.text();
    chrome.storage.sync.set({ responseText });
    const responseStatus = response.status;
    chrome.storage.sync.set({ responseStatus });
});



//use context menu on images. THen send it using fetch. If no guildId, then have error on popup.js. Also once fetch is done send repsonse with code.