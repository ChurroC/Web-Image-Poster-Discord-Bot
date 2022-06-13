(async () => {
    const { image } = await chrome.storage.sync.get('image')
    document.getElementById('image').src = image;

    const { responseText } = await chrome.storage.sync.get('responseText')
    document.getElementById('responseText').innerText = `Response: ${responseText}`;

    const { responseStatus } = await chrome.storage.sync.get('responseStatus')
    document.getElementById('responseStatus').innerText = `Code: ${responseStatus}`;
})()