(async () => {
    const { image } = await chrome.storage.sync.get('image')
    console.log(image)
    document.getElementById('image').src = image;

    const { responseText } = await chrome.storage.sync.get('responseText')
    console.log(responseText)
    document.getElementById('responseText').innerText = `Response: ${responseText}`;

    const { responseStatus } = await chrome.storage.sync.get('responseStatus')
    console.log(responseStatus)
    document.getElementById('responseStatus').innerText = `Code: ${responseStatus}`;
    
    chrome.action.setBadgeText({text: ''});
})()