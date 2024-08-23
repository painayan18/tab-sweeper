document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('cleanupButton').addEventListener('click', () => {
        chrome.tabs.query({}, function (tabs) {
            let groups = {};

            tabs.forEach((tab) => {
                let url = new URL(tab.url);
                let domain = url.hostname;

                if (!groups[domain]) {
                    groups[domain] = [];
                }

                groups[domain].push(tab.id);
            });

            Object.keys(groups).forEach((domain) => {
                chrome.tabs.group({ tabIds: groups[domain] });
            });
        });
    });
})