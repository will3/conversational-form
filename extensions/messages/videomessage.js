class VideoMessage {
	constructor(options) {
		options = options || {};
		this.source = options.source;
		this.autoplay = options.autoplay || false;
	}

	start(div) {
		div.classList.add("cf-attachment");

		const element = $(`
			<div class='cfx-video cfx-vertical-margin'>
			<video controls autoplay=${this.autoplay}>
				<source src=${this.source}> 
			</video>
			</div>`);

		$(div).append(element);
	}
}

module.exports = VideoMessage;