function encodeAndDecodeMessages() {
	const buttons = document.getElementsByTagName('button');
	const textareas = document.getElementsByTagName('textarea');
	buttons[0].addEventListener('click', encode);
	buttons[1].addEventListener('click', decode);

	function encode() {
		const decodedMessage = textareas[0].value
			.split('')
			.map((char) => char.charCodeAt(0) + 1)
			.map((char) => String.fromCharCode(char))
			.join('');

		textareas[1].value = decodedMessage;
		textareas[0].value = '';
	}

	function decode() {
		const decodedMessage = textareas[1].value
			.split('')
			.map((char) => char.charCodeAt(0) - 1)
			.map((char) => String.fromCharCode(char))
			.join('');

		textareas[1].value = decodedMessage;
		textareas[0].value = '';
	}
}
