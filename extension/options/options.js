(async () => {
    const colorPicker = document.createElement("input");
    colorPicker.type = "color";
    const { color } = await chrome.storage.sync.get('color');
    colorPicker.value = color;
    colorPicker.addEventListener('input', event => {
        chrome.storage.sync.set({ 'color': event.target.value });
    })
    document.body.insertBefore(colorPicker, document.body.firstChild);
})();