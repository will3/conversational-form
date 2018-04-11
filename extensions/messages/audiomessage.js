class AudioMessage {
	constructor(options) {
		options = options || {};
		this.source = options.source;
		this.autoplay = options.autoplay || false;
	}

	start(div) {
		div.classList.add("cf-attachment");

		const audio = $(`
			<audio preload="auto" 
				autoplay=${this.autoplay ? 1 : 0}>
				<source src=${this.source}> 
			</audio>`);
		const element = $(`
			<div class='cfx-audio cfx-vertical-margin'>
			</div>`);

		element.append(audio);
		$(div).append(element);

		audiojs.create(audio[0]);
	}
}

module.exports = AudioMessage;