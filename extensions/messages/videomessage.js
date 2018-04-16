class VideoMessage {
	constructor(options) {
		options = options || {};
		this.source = options.source;
		this.autoplay = options.autoplay || false;
	}

	start(div) {
		const video = $(`
			<video class="video-js vjs-default-skin"
				autoplay=${this.autoplay ? 1 : 0}>
				<source src=${this.source}> 
			</video>`);
		
		const element = $(`
			<div class='cfx-video cfx-vertical-margin'>
			</div>`);

		element.append(video);

		$(div).append(element);

		var player = videojs(video[0]);
	}
}

module.exports = VideoMessage;