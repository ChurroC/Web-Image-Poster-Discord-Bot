async function saveServer() {
    document.getElementById('message').innerText = ''
    const serverId = document.getElementById("serverId").value;
    if (serverId.trim().length === 0) {
        alert("Please enter a server id");
    } else {
        console.log('sef')
        await chrome.storage.sync.set({ serverId });
        document.getElementById('message').innerText += "Server id saved\n";
    }
    const userId = document.getElementById("userId").value;
    if (userId.trim().length === 0) {
        return alert("Please enter a user id");
    } else {
        await chrome.storage.sync.set({ userId });
        document.getElementById('message').innerText += "User id saved";
    }
}

document.getElementById("submit").addEventListener('click', saveServer);