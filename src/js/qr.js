document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('formqr');
	const linkInput = document.getElementById('link');
	const contenedorQR = document.getElementById('contenedorQR');

	form.addEventListener('submit', (event) => {
		event.preventDefault();

		const linkValue = linkInput.value.trim();
		if (!linkValue) {
			alert('Por favor, ingrese un texto o URL válido.');
			return;
		}

		contenedorQR.innerHTML = '';
		const qrcode = new QRCode(contenedorQR, {
			text: linkValue,
			width: 128,
			height: 128,
		});
	});
});