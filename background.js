chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: "createpdf",
		title: "Сохранить точную копию как PDF",
		contexts: ["page"],
	});

	chrome.contextMenus.create({
		id: "createreadablepdf",
		title: "Сохранить как выделяемый PDF",
		contexts: ["page"],
	});
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
	if (info.menuItemId === "createpdf") {
		const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
		await chrome.tabs.sendMessage(tab.id, { action: "createCanvasPDF" });
	}

	if (info.menuItemId === "createreadablepdf") {
		console.log("click createreadblePDF");
	}
});
