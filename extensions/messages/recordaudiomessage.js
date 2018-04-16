class RecordAudioMessage {
	start(div) {
		const element = $(`<audio id="myAudio" class="video-js vjs-default-skin cfx-vertical-margin"></audio>`);

		$(div).append(element);

		setTimeout(() => {
			var player = videojs(element[0], {
			  controls: true,
        width: 600,
        height: 300,
        fluid: false,
        plugins: {
          wavesurfer: {
            src: "live",
            waveColor: "#36393b",
            progressColor: "#black",
            debug: true,
            cursorWidth: 1,
            msDisplayMax: 20,
            hideScrollbar: true
          },
          record: {
            audio: true,
            video: false,
            maxLength: 20,
            debug: true
          }
        }
			}, function() {
			    // print version information at startup
			    videojs.log('Using video.js', videojs.VERSION,
			        'with videojs-record', videojs.getPluginVersion('record'),
			        '+ videojs-wavesurfer', videojs.getPluginVersion('wavesurfer'),
			        'and recordrtc', RecordRTC.version);
			});
			
			// error handling
			player.on('deviceError', function() {
			  console.log('device error:', player.deviceErrorCode);
			});
			player.on('error', function(error) {
			  console.log('error:', error);
			});
			// user clicked the record button and started recording
			player.on('startRecord', function() {
			  console.log('started recording!');
			});
			// user completed recording and stream is available
			player.on('finishRecord', function() {
			    // the blob object contains the recorded data that
			    // can be downloaded by the user, stored on server etc.
			  console.log('finished recording: ', player.recordedData);
			});
		});
	}
}

module.exports = RecordAudioMessage;