async function saveServer() {
    const serverId = document.getElementById("serverId").value;
    if (serverId.trim().length === 0) return alert("Please enter a server id");
    await chrome.storage.sync.set({ serverId });
    document.getElementById('message').innerText = "Server id saved";
}

document.getElementById("submit").addEventListener('click', saveServer);