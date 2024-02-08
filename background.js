function swapTab(tabs) {
  const thisURL = tabs[0].url

  if(thisURL.includes("github.io")) {
    // assume it's USERNAME.github.io/REPO/optional/more/paths/
    const re_io = /https:\/\/(.*?)\.github\.io\/([^\/]*)/g;
    const matches_io = [...thisURL.matchAll(re_io)];
    if (matches_io != null && matches_io[0].length == 3) {
      var new_repo_url = 'https://github.com/'+matches_io[0][1]+'/'+matches_io[0][2];
      browser.tabs.create({ url: new_repo_url });
    }
  } else if (thisURL.includes("github.com")) {
    // look for github.com/USERNAME/REPO
    const re_repo = /github\.com\/([^\/]*)\/([^\/]*)/g;
    const matches_repo = [...thisURL.matchAll(re_repo)];
    if (matches_repo != null && matches_repo[0].length == 3) {
      var new_io_url = 'https://'+matches_repo[0][1]+'.github.io/'+matches_repo[0][2];
      browser.tabs.create({ url: new_io_url });
    }
  }
}

function onError(error) {
  console.error(error)
}

browser.browserAction.onClicked.addListener(swapper)

function swapper() {
  browser.tabs
    .query({ currentWindow: true, active: true })
    .then(swapTab, onError);
};

