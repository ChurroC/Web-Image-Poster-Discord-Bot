async function sendData() {
    const formData  = new FormData();

    let guildId
    chrome.storage.sync.get('guildIdsx', response => {
        if (typeof(response.guildId) === 'undefined') return console.log('kghjo')
        guildId = response.guildId;
    });
    console.log(guildId)

    formData.append(server, data[name]);
    
    const response = await fetch('https://Web-Image-Poster-Discord-Bot.charanchandran.repl.co/new-message', {
        method: 'POST',
        body: formData
    });
    console.log('response.status: ', response.status);
    
    // ...
    }

//sendData()

const contextMenuItem = {
    id: "sendImage",
    title: "Send Image",
    type: 'normal',
    contexts: ['image'],
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener((item, tab) => {
    const tld = item.menuItemId
    let url = new URL(`https://google.${tld}/search`)
    url.searchParams.set('q', item.selectionText)
    chrome.tabs.create({ url: url.href, index: tab.index + 1 });
  });

//use context menu on images. THen send it using fetch. If no guildId, then have error on popup.js. Also once fetch is done send repsonse with code.