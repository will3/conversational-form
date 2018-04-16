class TakePhotoMessage {
	start(div) {
		const element = $(`<video id="myImage" class="video-js vjs-default-skin cfx-vertical-margin"></video>`);

		$(div).append(element);

		setTimeout(() => {
			var player = videojs(element[0], {
		    controls: true,
		    width: 320,
		    height: 240,
		    fluid: false,
		    controlBar: {
		        volumePanel: false,
		        fullscreenToggle: false
		    },
		    plugins: {
		        record: {
		            image: true,
		            debug: true
		        }
		    }
			});

			player.on('deviceError', function() {
			    console.warn('device error:', player.deviceErrorCode);
			});

			player.on('error', function(error) {
			    console.log('error:', error);
			});
			
			player.on('finishRecord', function() {
			    console.log('snapshot ready: ', player.recordedData);
			});
		});
	}
}

module.exports = TakePhotoMessage;