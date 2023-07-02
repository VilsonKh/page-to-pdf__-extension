chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	const { jsPDF } = window.jspdf;

	if (request.action === "createCanvasPDF") {
		console.log("get message");
		html2canvas(document.body).then((canvas) => {
			let image = canvas.toDataURL("image/png");
			let documentPDF = new jsPDF({
				orientation: "p",
				unit: "px",
				format: "a4",
				putOnlyUsedFonts: true,
			});
			let canvasWidth = canvas.width;
			let canvasHeight = canvas.height;
			let pageWidth = documentPDF.internal.pageSize.getWidth();
			let pageHeight = documentPDF.internal.pageSize.getHeight();

			let ratio = canvasHeight / canvasWidth;

			let height = pageWidth * ratio;

			if (canvas.height > pageHeight) {
			}

			documentPDF.addImage(image, "JPEG", 0, 0, pageWidth, height);
			let title = document.title;
			let date = new Date().toJSON().slice(0, 10);
			documentPDF.save(title + "_" + date);
		});
	}
});
