class AudioMessage {
	constructor(options) {
		options = options || {};
		this.source = options.source;
		this.autoplay = options.autoplay;
	}

	start(div) {
		div.classList.add("cf-attachment");

		const element = $(`
			<div class='cfx-video cfx-vertical-margin'>
			<audio controls autoplay=${this.autoplay}>
				<source src=${this.source}> 
			</audio>
			</div>`);

		$(div).append(element);
	}
}

module.exports = AudioMessage;