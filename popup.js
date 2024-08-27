// wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // listener for sweepButton
    document.getElementById('sweepButton').addEventListener('click', () => {
        chrome.tabs.query({}, function (tabs) {
            let groups = {};

            tabs.forEach((tab) => {
                let url = new URL(tab.url);

                // extract hostname from URL
                let domain = url.hostname;

                // extract domain name from URL
                // let domainName = domain.replace('www','').split('.')[0];

                let domainName = domain.startsWith('www') ? domain.substring(4) : domain;
                domainName = domainName.split('.')[0];

                // add domain to groups if it doesn't exist
                if (!groups[domainName]) {
                    groups[domainName] = [];
                }

                groups[domainName].push(tab.id);
            });

            Object.keys(groups).forEach((domainName) => {
                chrome.tabs.group({ tabIds: groups[domainName] }, function(groupId) {
                    if (chrome.tabGroups && chrome.tabGroups.update) {
                        // set group title to domain name
                        chrome.tabGroups.update(groupId, {title: domainName});
                    }
                });
            });
        });
    });
})