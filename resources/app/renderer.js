const { ipcRenderer } = require('electron');

// Function to create a new tab
function createTab(url) {
  const tabId = 'tab-' + tabIdCounter;
  const tabElement = document.createElement('button');
  tabElement.classList.add('tab');
  tabElement.setAttribute('id', tabId);
  tabElement.textContent = url;
  tabElement.onclick = function() {
    switchTab(tabId);
  };
  document.getElementById('tabs').appendChild(tabElement);
  tabIdCounter++;
  return tabId;
}

// Function to switch to a tab
function switchTab(tabId) {
  const activeTab = document.querySelector('.tab.active');
  if (activeTab) {
    activeTab.classList.remove('active');
  }
  const tab = document.getElementById(tabId);
  tab.classList.add('active');
  const url = tab.textContent;
  loadURL(url);
}

// Function to handle navigation to a URL entered in the input field
function go() {
  const urlInput = document.getElementById('urlInput');
  const url = urlInput.value.trim(); // Remove leading/trailing whitespaces
  if (url) {
    const tabId = createTab(url);
    switchTab(tabId);
    urlInput.value = '';
  }
}

// Event listener to capture the "Enter" key press in the input field
document.getElementById('goButton').addEventListener('click', go);
document.getElementById('urlInput').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    go();
  }
});

// Function to load URL into webview
function loadURL(url) {
  ipcRenderer.send('loadURL', url);
}

// Variable to keep track of tab IDs
let tabIdCounter = 0;
