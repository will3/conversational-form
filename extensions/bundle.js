(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const CardMessage = require('./messages/cardmessage');
const GalleryMessage = require('./messages/gallerymessage');
const VideoMessage = require('./messages/videomessage');
const AudioMessage = require('./messages/audiomessage');
const LocationMessage = require('./messages/locationmessage');
const RecordVideoMessage = require('./messages/recordvideomessage');
const TakePhotoMessage = require('./messages/takephotomessage');
const RecordAudioMessage = require('./messages/recordaudiomessage');

const conversationalForm = cf.ConversationalForm.startTheConversation({
  formEl: document.getElementById("form"),
  context: document.getElementById("cf-context"),
  flowStepCallback: (dto, success, error) => {
    success();	
  },
  submitCallback: () => {
  }
});

const card = new CardMessage({
	title: 'title',
	detail: 'detail',
	image: 'http://via.placeholder.com/350x150',
	buttons: [{
		title: 'a',
		onClick: () => {
			alert('a');
		}
	}, {
		title: 'b',
		onClick: () => {
			alert('b');
		}
	}]
});

// conversationalForm.addMessage({
// 	isRobot: true,
// 	response: 'user thinking not supported',
// 	responseTime: Infinity
// });

conversationalForm.addMessage({
	isRobot: true,
	attachment: card
});

// conversationalForm.addMessage({
// 	isRobot: true,
// 	response: 'gallery',
// 	attachment: new GalleryMessage({
// 		cards: [ card, card ]
// 	})
// });

// conversationalForm.addMessage({
// 	isRobot: true,
// 	response: 'video',
// 	attachment: new VideoMessage({
// 		source: 'https://vjs.zencdn.net/v/oceans.mp4'
// 	})
// });

// conversationalForm.addMessage({
// 	isRobot: true,
// 	response: 'audio',
// 	attachment: new AudioMessage({
// 		source: 'https://raw.githubusercontent.com/anars/blank-audio/master/10-minutes-of-silence.mp3'
// 	})
// });

// conversationalForm.addMessage({
// 	isRobot: true,
// 	response: 'share your current location?',
// 	attachment: new LocationMessage({
// 		onLocationSuccess: (position) => {
// 			console.log(position);
// 		}
// 	})
// });

// conversationalForm.addMessage({
// 	isRobot: true,
// 	response: 'take photo',
// 	attachment: new TakePhotoMessage({})
// });

// conversationalForm.addMessage({
// 	isRobot: true,
// 	response: 'record video',
// 	attachment: new RecordVideoMessage({})
// });

// conversationalForm.addMessage({
// 	isRobot: true,
// 	response: 'record audio',
// 	attachment: new RecordAudioMessage({})
// });

// conversationalForm.addTags([{
// 	tag: "input",
// 	type: "date",
// 	"cf-questions": "date?"
// }]);

// conversationalForm.addTags([{
// 	tag: "input",
// 	type: "datetime-local",
// 	"cf-questions": "datetime?"
// }]);

// conversationalForm.addTags([{
// 	tag: "input",
// 	type: "time",
// 	"cf-questions": "time?"
// }]);

// conversationalForm.remapTagsAndStartFrom();
},{"./messages/audiomessage":2,"./messages/cardmessage":3,"./messages/gallerymessage":4,"./messages/locationmessage":5,"./messages/recordaudiomessage":6,"./messages/recordvideomessage":7,"./messages/takephotomessage":8,"./messages/videomessage":9}],2:[function(require,module,exports){
class AudioMessage {
	constructor(options) {
		options = options || {};
		this.source = options.source;
		this.autoplay = options.autoplay || false;
	}

	start(div) {
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
},{}],3:[function(require,module,exports){
class CardMessage {
	constructor(options) {
		options = options || {};
		this.title = options.title || '';
		this.detail = options.detail || '';
		this.buttons = options.buttons || [];
		this.image = options.image || '';
	}

	start(div) {
		this.buildElement(div, true);
	}

	buildElement(div, isAttachment) {
		const element = $(
		`<div class='cfx-card'>
			<div class='cfx-card-image cfx-bottom-line'>
				<img src='${this.image}'/>
			</div>
			<div class='cfx-title-container cfx-bottom-line'>
				<div class='cfx-title'>${this.title}</div>
				<div class='cfx-detail'>${this.detail}</div>
			</div>
		</div>`);

		if (isAttachment) {
			element.addClass('cfx-vertical-margin');
		}

		const buttons = this.buttons.map((b, index) => {
			const className = index == this.buttons.length - 1 ? 'cfx-button' : 'cfx-bottom-line cfx-button';
			const e = $(`<div class='${className}'>${b.title}</div>`);
			e.on('click', () => {
				b.onClick();
			});
			return e;
		});

		element.append(buttons);

		$(div).append(element);
	}
};

module.exports = CardMessage;
},{}],4:[function(require,module,exports){
// TODO user gallery not aligned properly
class GalleryMessage {
	constructor(options) {
		this.cards = options.cards || [];
	}

	start(div) {
		div.classList.add("cf-nested-scroll");
		const element = $(`<div class='cfx-gallery cfx-vertical-margin'>
			<div class='cfx-gallery-content'></div>
			</div>`);

		const cards = this.cards.map((card) => {
			const e = $(`<div class='cfx-gallery-card'></div>`);
			card.buildElement(e[0], false);
			return e;
		});

		$('.cfx-gallery-content', element).append(cards);

		$(div).append(element);
	}
}

module.exports = GalleryMessage;
},{}],5:[function(require,module,exports){
class LocationMessage {
	constructor(params) {
		params = params || {};
		this.onLocationSuccess = params.onLocationSuccess;
		this.onLocationError = params.onLocationError;
	}

	start(div) {
		const element = $(`<div class='cfx-button cfx-button-rounded cfx-vertical-margin'>
			<div class="glyphicon glyphicon-map-marker" />
			Share your current location
		</div>`);

		element.on('click', () => {
			navigator.geolocation.getCurrentPosition(this.onLocationSuccess, this.onLocationError);
		});

		$(div).append(element);
	}
}

module.exports = LocationMessage;
},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
class RecordVideoMessage {
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
						audio: false,
						video: true,
						maxLength: 10,
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

module.exports = RecordVideoMessage;
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
class VideoMessage {
	constructor(options) {
		options = options || {};
		this.source = options.source;
		this.autoplay = options.autoplay || false;
	}

	start(div) {
		const video = $(`
			<video class="video-js vjs-default-skin">
				<source src=${this.source}> 
			</video>`);
		
		const element = $(`
			<div class='cfx-video cfx-vertical-margin'>
			</div>`);

		element.append(video);

		$(div).append(element);

		var player = videojs(video[0], {
			controls: true,
		});
	}
}

module.exports = VideoMessage;
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm1lc3NhZ2VzL2F1ZGlvbWVzc2FnZS5qcyIsIm1lc3NhZ2VzL2NhcmRtZXNzYWdlLmpzIiwibWVzc2FnZXMvZ2FsbGVyeW1lc3NhZ2UuanMiLCJtZXNzYWdlcy9sb2NhdGlvbm1lc3NhZ2UuanMiLCJtZXNzYWdlcy9yZWNvcmRhdWRpb21lc3NhZ2UuanMiLCJtZXNzYWdlcy9yZWNvcmR2aWRlb21lc3NhZ2UuanMiLCJtZXNzYWdlcy90YWtlcGhvdG9tZXNzYWdlLmpzIiwibWVzc2FnZXMvdmlkZW9tZXNzYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBDYXJkTWVzc2FnZSA9IHJlcXVpcmUoJy4vbWVzc2FnZXMvY2FyZG1lc3NhZ2UnKTtcbmNvbnN0IEdhbGxlcnlNZXNzYWdlID0gcmVxdWlyZSgnLi9tZXNzYWdlcy9nYWxsZXJ5bWVzc2FnZScpO1xuY29uc3QgVmlkZW9NZXNzYWdlID0gcmVxdWlyZSgnLi9tZXNzYWdlcy92aWRlb21lc3NhZ2UnKTtcbmNvbnN0IEF1ZGlvTWVzc2FnZSA9IHJlcXVpcmUoJy4vbWVzc2FnZXMvYXVkaW9tZXNzYWdlJyk7XG5jb25zdCBMb2NhdGlvbk1lc3NhZ2UgPSByZXF1aXJlKCcuL21lc3NhZ2VzL2xvY2F0aW9ubWVzc2FnZScpO1xuY29uc3QgUmVjb3JkVmlkZW9NZXNzYWdlID0gcmVxdWlyZSgnLi9tZXNzYWdlcy9yZWNvcmR2aWRlb21lc3NhZ2UnKTtcbmNvbnN0IFRha2VQaG90b01lc3NhZ2UgPSByZXF1aXJlKCcuL21lc3NhZ2VzL3Rha2VwaG90b21lc3NhZ2UnKTtcbmNvbnN0IFJlY29yZEF1ZGlvTWVzc2FnZSA9IHJlcXVpcmUoJy4vbWVzc2FnZXMvcmVjb3JkYXVkaW9tZXNzYWdlJyk7XG5cbmNvbnN0IGNvbnZlcnNhdGlvbmFsRm9ybSA9IGNmLkNvbnZlcnNhdGlvbmFsRm9ybS5zdGFydFRoZUNvbnZlcnNhdGlvbih7XG4gIGZvcm1FbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtXCIpLFxuICBjb250ZXh0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNmLWNvbnRleHRcIiksXG4gIGZsb3dTdGVwQ2FsbGJhY2s6IChkdG8sIHN1Y2Nlc3MsIGVycm9yKSA9PiB7XG4gICAgc3VjY2VzcygpO1x0XG4gIH0sXG4gIHN1Ym1pdENhbGxiYWNrOiAoKSA9PiB7XG4gIH1cbn0pO1xuXG5jb25zdCBjYXJkID0gbmV3IENhcmRNZXNzYWdlKHtcblx0dGl0bGU6ICd0aXRsZScsXG5cdGRldGFpbDogJ2RldGFpbCcsXG5cdGltYWdlOiAnaHR0cDovL3ZpYS5wbGFjZWhvbGRlci5jb20vMzUweDE1MCcsXG5cdGJ1dHRvbnM6IFt7XG5cdFx0dGl0bGU6ICdhJyxcblx0XHRvbkNsaWNrOiAoKSA9PiB7XG5cdFx0XHRhbGVydCgnYScpO1xuXHRcdH1cblx0fSwge1xuXHRcdHRpdGxlOiAnYicsXG5cdFx0b25DbGljazogKCkgPT4ge1xuXHRcdFx0YWxlcnQoJ2InKTtcblx0XHR9XG5cdH1dXG59KTtcblxuLy8gY29udmVyc2F0aW9uYWxGb3JtLmFkZE1lc3NhZ2Uoe1xuLy8gXHRpc1JvYm90OiB0cnVlLFxuLy8gXHRyZXNwb25zZTogJ3VzZXIgdGhpbmtpbmcgbm90IHN1cHBvcnRlZCcsXG4vLyBcdHJlc3BvbnNlVGltZTogSW5maW5pdHlcbi8vIH0pO1xuXG5jb252ZXJzYXRpb25hbEZvcm0uYWRkTWVzc2FnZSh7XG5cdGlzUm9ib3Q6IHRydWUsXG5cdGF0dGFjaG1lbnQ6IGNhcmRcbn0pO1xuXG4vLyBjb252ZXJzYXRpb25hbEZvcm0uYWRkTWVzc2FnZSh7XG4vLyBcdGlzUm9ib3Q6IHRydWUsXG4vLyBcdHJlc3BvbnNlOiAnZ2FsbGVyeScsXG4vLyBcdGF0dGFjaG1lbnQ6IG5ldyBHYWxsZXJ5TWVzc2FnZSh7XG4vLyBcdFx0Y2FyZHM6IFsgY2FyZCwgY2FyZCBdXG4vLyBcdH0pXG4vLyB9KTtcblxuLy8gY29udmVyc2F0aW9uYWxGb3JtLmFkZE1lc3NhZ2Uoe1xuLy8gXHRpc1JvYm90OiB0cnVlLFxuLy8gXHRyZXNwb25zZTogJ3ZpZGVvJyxcbi8vIFx0YXR0YWNobWVudDogbmV3IFZpZGVvTWVzc2FnZSh7XG4vLyBcdFx0c291cmNlOiAnaHR0cHM6Ly92anMuemVuY2RuLm5ldC92L29jZWFucy5tcDQnXG4vLyBcdH0pXG4vLyB9KTtcblxuLy8gY29udmVyc2F0aW9uYWxGb3JtLmFkZE1lc3NhZ2Uoe1xuLy8gXHRpc1JvYm90OiB0cnVlLFxuLy8gXHRyZXNwb25zZTogJ2F1ZGlvJyxcbi8vIFx0YXR0YWNobWVudDogbmV3IEF1ZGlvTWVzc2FnZSh7XG4vLyBcdFx0c291cmNlOiAnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2FuYXJzL2JsYW5rLWF1ZGlvL21hc3Rlci8xMC1taW51dGVzLW9mLXNpbGVuY2UubXAzJ1xuLy8gXHR9KVxuLy8gfSk7XG5cbi8vIGNvbnZlcnNhdGlvbmFsRm9ybS5hZGRNZXNzYWdlKHtcbi8vIFx0aXNSb2JvdDogdHJ1ZSxcbi8vIFx0cmVzcG9uc2U6ICdzaGFyZSB5b3VyIGN1cnJlbnQgbG9jYXRpb24/Jyxcbi8vIFx0YXR0YWNobWVudDogbmV3IExvY2F0aW9uTWVzc2FnZSh7XG4vLyBcdFx0b25Mb2NhdGlvblN1Y2Nlc3M6IChwb3NpdGlvbikgPT4ge1xuLy8gXHRcdFx0Y29uc29sZS5sb2cocG9zaXRpb24pO1xuLy8gXHRcdH1cbi8vIFx0fSlcbi8vIH0pO1xuXG4vLyBjb252ZXJzYXRpb25hbEZvcm0uYWRkTWVzc2FnZSh7XG4vLyBcdGlzUm9ib3Q6IHRydWUsXG4vLyBcdHJlc3BvbnNlOiAndGFrZSBwaG90bycsXG4vLyBcdGF0dGFjaG1lbnQ6IG5ldyBUYWtlUGhvdG9NZXNzYWdlKHt9KVxuLy8gfSk7XG5cbi8vIGNvbnZlcnNhdGlvbmFsRm9ybS5hZGRNZXNzYWdlKHtcbi8vIFx0aXNSb2JvdDogdHJ1ZSxcbi8vIFx0cmVzcG9uc2U6ICdyZWNvcmQgdmlkZW8nLFxuLy8gXHRhdHRhY2htZW50OiBuZXcgUmVjb3JkVmlkZW9NZXNzYWdlKHt9KVxuLy8gfSk7XG5cbi8vIGNvbnZlcnNhdGlvbmFsRm9ybS5hZGRNZXNzYWdlKHtcbi8vIFx0aXNSb2JvdDogdHJ1ZSxcbi8vIFx0cmVzcG9uc2U6ICdyZWNvcmQgYXVkaW8nLFxuLy8gXHRhdHRhY2htZW50OiBuZXcgUmVjb3JkQXVkaW9NZXNzYWdlKHt9KVxuLy8gfSk7XG5cbi8vIGNvbnZlcnNhdGlvbmFsRm9ybS5hZGRUYWdzKFt7XG4vLyBcdHRhZzogXCJpbnB1dFwiLFxuLy8gXHR0eXBlOiBcImRhdGVcIixcbi8vIFx0XCJjZi1xdWVzdGlvbnNcIjogXCJkYXRlP1wiXG4vLyB9XSk7XG5cbi8vIGNvbnZlcnNhdGlvbmFsRm9ybS5hZGRUYWdzKFt7XG4vLyBcdHRhZzogXCJpbnB1dFwiLFxuLy8gXHR0eXBlOiBcImRhdGV0aW1lLWxvY2FsXCIsXG4vLyBcdFwiY2YtcXVlc3Rpb25zXCI6IFwiZGF0ZXRpbWU/XCJcbi8vIH1dKTtcblxuLy8gY29udmVyc2F0aW9uYWxGb3JtLmFkZFRhZ3MoW3tcbi8vIFx0dGFnOiBcImlucHV0XCIsXG4vLyBcdHR5cGU6IFwidGltZVwiLFxuLy8gXHRcImNmLXF1ZXN0aW9uc1wiOiBcInRpbWU/XCJcbi8vIH1dKTtcblxuLy8gY29udmVyc2F0aW9uYWxGb3JtLnJlbWFwVGFnc0FuZFN0YXJ0RnJvbSgpOyIsImNsYXNzIEF1ZGlvTWVzc2FnZSB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblx0XHR0aGlzLnNvdXJjZSA9IG9wdGlvbnMuc291cmNlO1xuXHRcdHRoaXMuYXV0b3BsYXkgPSBvcHRpb25zLmF1dG9wbGF5IHx8IGZhbHNlO1xuXHR9XG5cblx0c3RhcnQoZGl2KSB7XG5cdFx0Y29uc3QgYXVkaW8gPSAkKGBcblx0XHRcdDxhdWRpbyBwcmVsb2FkPVwiYXV0b1wiIFxuXHRcdFx0XHRhdXRvcGxheT0ke3RoaXMuYXV0b3BsYXkgPyAxIDogMH0+XG5cdFx0XHRcdDxzb3VyY2Ugc3JjPSR7dGhpcy5zb3VyY2V9PiBcblx0XHRcdDwvYXVkaW8+YCk7XG5cdFx0Y29uc3QgZWxlbWVudCA9ICQoYFxuXHRcdFx0PGRpdiBjbGFzcz0nY2Z4LWF1ZGlvIGNmeC12ZXJ0aWNhbC1tYXJnaW4nPlxuXHRcdFx0PC9kaXY+YCk7XG5cblx0XHRlbGVtZW50LmFwcGVuZChhdWRpbyk7XG5cdFx0JChkaXYpLmFwcGVuZChlbGVtZW50KTtcblxuXHRcdGF1ZGlvanMuY3JlYXRlKGF1ZGlvWzBdKTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEF1ZGlvTWVzc2FnZTsiLCJjbGFzcyBDYXJkTWVzc2FnZSB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblx0XHR0aGlzLnRpdGxlID0gb3B0aW9ucy50aXRsZSB8fCAnJztcblx0XHR0aGlzLmRldGFpbCA9IG9wdGlvbnMuZGV0YWlsIHx8ICcnO1xuXHRcdHRoaXMuYnV0dG9ucyA9IG9wdGlvbnMuYnV0dG9ucyB8fCBbXTtcblx0XHR0aGlzLmltYWdlID0gb3B0aW9ucy5pbWFnZSB8fCAnJztcblx0fVxuXG5cdHN0YXJ0KGRpdikge1xuXHRcdHRoaXMuYnVpbGRFbGVtZW50KGRpdiwgdHJ1ZSk7XG5cdH1cblxuXHRidWlsZEVsZW1lbnQoZGl2LCBpc0F0dGFjaG1lbnQpIHtcblx0XHRjb25zdCBlbGVtZW50ID0gJChcblx0XHRgPGRpdiBjbGFzcz0nY2Z4LWNhcmQnPlxuXHRcdFx0PGRpdiBjbGFzcz0nY2Z4LWNhcmQtaW1hZ2UgY2Z4LWJvdHRvbS1saW5lJz5cblx0XHRcdFx0PGltZyBzcmM9JyR7dGhpcy5pbWFnZX0nLz5cblx0XHRcdDwvZGl2PlxuXHRcdFx0PGRpdiBjbGFzcz0nY2Z4LXRpdGxlLWNvbnRhaW5lciBjZngtYm90dG9tLWxpbmUnPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPSdjZngtdGl0bGUnPiR7dGhpcy50aXRsZX08L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz0nY2Z4LWRldGFpbCc+JHt0aGlzLmRldGFpbH08L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PmApO1xuXG5cdFx0aWYgKGlzQXR0YWNobWVudCkge1xuXHRcdFx0ZWxlbWVudC5hZGRDbGFzcygnY2Z4LXZlcnRpY2FsLW1hcmdpbicpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGJ1dHRvbnMgPSB0aGlzLmJ1dHRvbnMubWFwKChiLCBpbmRleCkgPT4ge1xuXHRcdFx0Y29uc3QgY2xhc3NOYW1lID0gaW5kZXggPT0gdGhpcy5idXR0b25zLmxlbmd0aCAtIDEgPyAnY2Z4LWJ1dHRvbicgOiAnY2Z4LWJvdHRvbS1saW5lIGNmeC1idXR0b24nO1xuXHRcdFx0Y29uc3QgZSA9ICQoYDxkaXYgY2xhc3M9JyR7Y2xhc3NOYW1lfSc+JHtiLnRpdGxlfTwvZGl2PmApO1xuXHRcdFx0ZS5vbignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRcdGIub25DbGljaygpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gZTtcblx0XHR9KTtcblxuXHRcdGVsZW1lbnQuYXBwZW5kKGJ1dHRvbnMpO1xuXG5cdFx0JChkaXYpLmFwcGVuZChlbGVtZW50KTtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYXJkTWVzc2FnZTsiLCIvLyBUT0RPIHVzZXIgZ2FsbGVyeSBub3QgYWxpZ25lZCBwcm9wZXJseVxuY2xhc3MgR2FsbGVyeU1lc3NhZ2Uge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0dGhpcy5jYXJkcyA9IG9wdGlvbnMuY2FyZHMgfHwgW107XG5cdH1cblxuXHRzdGFydChkaXYpIHtcblx0XHRkaXYuY2xhc3NMaXN0LmFkZChcImNmLW5lc3RlZC1zY3JvbGxcIik7XG5cdFx0Y29uc3QgZWxlbWVudCA9ICQoYDxkaXYgY2xhc3M9J2NmeC1nYWxsZXJ5IGNmeC12ZXJ0aWNhbC1tYXJnaW4nPlxuXHRcdFx0PGRpdiBjbGFzcz0nY2Z4LWdhbGxlcnktY29udGVudCc+PC9kaXY+XG5cdFx0XHQ8L2Rpdj5gKTtcblxuXHRcdGNvbnN0IGNhcmRzID0gdGhpcy5jYXJkcy5tYXAoKGNhcmQpID0+IHtcblx0XHRcdGNvbnN0IGUgPSAkKGA8ZGl2IGNsYXNzPSdjZngtZ2FsbGVyeS1jYXJkJz48L2Rpdj5gKTtcblx0XHRcdGNhcmQuYnVpbGRFbGVtZW50KGVbMF0sIGZhbHNlKTtcblx0XHRcdHJldHVybiBlO1xuXHRcdH0pO1xuXG5cdFx0JCgnLmNmeC1nYWxsZXJ5LWNvbnRlbnQnLCBlbGVtZW50KS5hcHBlbmQoY2FyZHMpO1xuXG5cdFx0JChkaXYpLmFwcGVuZChlbGVtZW50KTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbGxlcnlNZXNzYWdlOyIsImNsYXNzIExvY2F0aW9uTWVzc2FnZSB7XG5cdGNvbnN0cnVjdG9yKHBhcmFtcykge1xuXHRcdHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcblx0XHR0aGlzLm9uTG9jYXRpb25TdWNjZXNzID0gcGFyYW1zLm9uTG9jYXRpb25TdWNjZXNzO1xuXHRcdHRoaXMub25Mb2NhdGlvbkVycm9yID0gcGFyYW1zLm9uTG9jYXRpb25FcnJvcjtcblx0fVxuXG5cdHN0YXJ0KGRpdikge1xuXHRcdGNvbnN0IGVsZW1lbnQgPSAkKGA8ZGl2IGNsYXNzPSdjZngtYnV0dG9uIGNmeC1idXR0b24tcm91bmRlZCBjZngtdmVydGljYWwtbWFyZ2luJz5cblx0XHRcdDxkaXYgY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLW1hcC1tYXJrZXJcIiAvPlxuXHRcdFx0U2hhcmUgeW91ciBjdXJyZW50IGxvY2F0aW9uXG5cdFx0PC9kaXY+YCk7XG5cblx0XHRlbGVtZW50Lm9uKCdjbGljaycsICgpID0+IHtcblx0XHRcdG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24odGhpcy5vbkxvY2F0aW9uU3VjY2VzcywgdGhpcy5vbkxvY2F0aW9uRXJyb3IpO1xuXHRcdH0pO1xuXG5cdFx0JChkaXYpLmFwcGVuZChlbGVtZW50KTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExvY2F0aW9uTWVzc2FnZTsiLCJjbGFzcyBSZWNvcmRBdWRpb01lc3NhZ2Uge1xuXHRzdGFydChkaXYpIHtcblx0XHRjb25zdCBlbGVtZW50ID0gJChgPGF1ZGlvIGlkPVwibXlBdWRpb1wiIGNsYXNzPVwidmlkZW8tanMgdmpzLWRlZmF1bHQtc2tpbiBjZngtdmVydGljYWwtbWFyZ2luXCI+PC9hdWRpbz5gKTtcblxuXHRcdCQoZGl2KS5hcHBlbmQoZWxlbWVudCk7XG5cblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdHZhciBwbGF5ZXIgPSB2aWRlb2pzKGVsZW1lbnRbMF0sIHtcblx0XHRcdCAgY29udHJvbHM6IHRydWUsXG4gICAgICAgIHdpZHRoOiA2MDAsXG4gICAgICAgIGhlaWdodDogMzAwLFxuICAgICAgICBmbHVpZDogZmFsc2UsXG4gICAgICAgIHBsdWdpbnM6IHtcbiAgICAgICAgICB3YXZlc3VyZmVyOiB7XG4gICAgICAgICAgICBzcmM6IFwibGl2ZVwiLFxuICAgICAgICAgICAgd2F2ZUNvbG9yOiBcIiMzNjM5M2JcIixcbiAgICAgICAgICAgIHByb2dyZXNzQ29sb3I6IFwiI2JsYWNrXCIsXG4gICAgICAgICAgICBkZWJ1ZzogdHJ1ZSxcbiAgICAgICAgICAgIGN1cnNvcldpZHRoOiAxLFxuICAgICAgICAgICAgbXNEaXNwbGF5TWF4OiAyMCxcbiAgICAgICAgICAgIGhpZGVTY3JvbGxiYXI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlY29yZDoge1xuICAgICAgICAgICAgYXVkaW86IHRydWUsXG4gICAgICAgICAgICB2aWRlbzogZmFsc2UsXG4gICAgICAgICAgICBtYXhMZW5ndGg6IDIwLFxuICAgICAgICAgICAgZGVidWc6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cblx0XHRcdH0sIGZ1bmN0aW9uKCkge1xuXHRcdFx0ICAgIC8vIHByaW50IHZlcnNpb24gaW5mb3JtYXRpb24gYXQgc3RhcnR1cFxuXHRcdFx0ICAgIHZpZGVvanMubG9nKCdVc2luZyB2aWRlby5qcycsIHZpZGVvanMuVkVSU0lPTixcblx0XHRcdCAgICAgICAgJ3dpdGggdmlkZW9qcy1yZWNvcmQnLCB2aWRlb2pzLmdldFBsdWdpblZlcnNpb24oJ3JlY29yZCcpLFxuXHRcdFx0ICAgICAgICAnKyB2aWRlb2pzLXdhdmVzdXJmZXInLCB2aWRlb2pzLmdldFBsdWdpblZlcnNpb24oJ3dhdmVzdXJmZXInKSxcblx0XHRcdCAgICAgICAgJ2FuZCByZWNvcmRydGMnLCBSZWNvcmRSVEMudmVyc2lvbik7XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0Ly8gZXJyb3IgaGFuZGxpbmdcblx0XHRcdHBsYXllci5vbignZGV2aWNlRXJyb3InLCBmdW5jdGlvbigpIHtcblx0XHRcdCAgY29uc29sZS5sb2coJ2RldmljZSBlcnJvcjonLCBwbGF5ZXIuZGV2aWNlRXJyb3JDb2RlKTtcblx0XHRcdH0pO1xuXHRcdFx0cGxheWVyLm9uKCdlcnJvcicsIGZ1bmN0aW9uKGVycm9yKSB7XG5cdFx0XHQgIGNvbnNvbGUubG9nKCdlcnJvcjonLCBlcnJvcik7XG5cdFx0XHR9KTtcblx0XHRcdC8vIHVzZXIgY2xpY2tlZCB0aGUgcmVjb3JkIGJ1dHRvbiBhbmQgc3RhcnRlZCByZWNvcmRpbmdcblx0XHRcdHBsYXllci5vbignc3RhcnRSZWNvcmQnLCBmdW5jdGlvbigpIHtcblx0XHRcdCAgY29uc29sZS5sb2coJ3N0YXJ0ZWQgcmVjb3JkaW5nIScpO1xuXHRcdFx0fSk7XG5cdFx0XHQvLyB1c2VyIGNvbXBsZXRlZCByZWNvcmRpbmcgYW5kIHN0cmVhbSBpcyBhdmFpbGFibGVcblx0XHRcdHBsYXllci5vbignZmluaXNoUmVjb3JkJywgZnVuY3Rpb24oKSB7XG5cdFx0XHQgICAgLy8gdGhlIGJsb2Igb2JqZWN0IGNvbnRhaW5zIHRoZSByZWNvcmRlZCBkYXRhIHRoYXRcblx0XHRcdCAgICAvLyBjYW4gYmUgZG93bmxvYWRlZCBieSB0aGUgdXNlciwgc3RvcmVkIG9uIHNlcnZlciBldGMuXG5cdFx0XHQgIGNvbnNvbGUubG9nKCdmaW5pc2hlZCByZWNvcmRpbmc6ICcsIHBsYXllci5yZWNvcmRlZERhdGEpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWNvcmRBdWRpb01lc3NhZ2U7IiwiY2xhc3MgUmVjb3JkVmlkZW9NZXNzYWdlIHtcblx0c3RhcnQoZGl2KSB7XG5cdFx0Y29uc3QgZWxlbWVudCA9ICQoYDx2aWRlbyBpZD1cIm15SW1hZ2VcIiBjbGFzcz1cInZpZGVvLWpzIHZqcy1kZWZhdWx0LXNraW4gY2Z4LXZlcnRpY2FsLW1hcmdpblwiPjwvdmlkZW8+YCk7XG5cblx0XHQkKGRpdikuYXBwZW5kKGVsZW1lbnQpO1xuXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHR2YXIgcGxheWVyID0gdmlkZW9qcyhlbGVtZW50WzBdLCB7XG5cdFx0ICAgIGNvbnRyb2xzOiB0cnVlLFxuXHRcdCAgICB3aWR0aDogMzIwLFxuXHRcdCAgICBoZWlnaHQ6IDI0MCxcblx0XHQgICAgZmx1aWQ6IGZhbHNlLFxuXHRcdCAgICBjb250cm9sQmFyOiB7XG5cdFx0ICAgICAgICB2b2x1bWVQYW5lbDogZmFsc2UsXG5cdFx0ICAgICAgICBmdWxsc2NyZWVuVG9nZ2xlOiBmYWxzZVxuXHRcdCAgICB9LFxuXHRcdCAgICBwbHVnaW5zOiB7XG5cdFx0XHRcdFx0cmVjb3JkOiB7XG5cdFx0XHRcdFx0XHRhdWRpbzogZmFsc2UsXG5cdFx0XHRcdFx0XHR2aWRlbzogdHJ1ZSxcblx0XHRcdFx0XHRcdG1heExlbmd0aDogMTAsXG5cdFx0XHRcdFx0XHRkZWJ1ZzogdHJ1ZVxuXHRcdFx0XHRcdH1cblx0XHQgICAgfVxuXHRcdFx0fSk7XG5cblx0XHRcdHBsYXllci5vbignZGV2aWNlRXJyb3InLCBmdW5jdGlvbigpIHtcblx0XHRcdCAgICBjb25zb2xlLndhcm4oJ2RldmljZSBlcnJvcjonLCBwbGF5ZXIuZGV2aWNlRXJyb3JDb2RlKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRwbGF5ZXIub24oJ2Vycm9yJywgZnVuY3Rpb24oZXJyb3IpIHtcblx0XHRcdCAgICBjb25zb2xlLmxvZygnZXJyb3I6JywgZXJyb3IpO1xuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdHBsYXllci5vbignZmluaXNoUmVjb3JkJywgZnVuY3Rpb24oKSB7XG5cdFx0XHQgICAgY29uc29sZS5sb2coJ3NuYXBzaG90IHJlYWR5OiAnLCBwbGF5ZXIucmVjb3JkZWREYXRhKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVjb3JkVmlkZW9NZXNzYWdlOyIsImNsYXNzIFRha2VQaG90b01lc3NhZ2Uge1xuXHRzdGFydChkaXYpIHtcblx0XHRjb25zdCBlbGVtZW50ID0gJChgPHZpZGVvIGlkPVwibXlJbWFnZVwiIGNsYXNzPVwidmlkZW8tanMgdmpzLWRlZmF1bHQtc2tpbiBjZngtdmVydGljYWwtbWFyZ2luXCI+PC92aWRlbz5gKTtcblxuXHRcdCQoZGl2KS5hcHBlbmQoZWxlbWVudCk7XG5cblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdHZhciBwbGF5ZXIgPSB2aWRlb2pzKGVsZW1lbnRbMF0sIHtcblx0XHQgICAgY29udHJvbHM6IHRydWUsXG5cdFx0ICAgIHdpZHRoOiAzMjAsXG5cdFx0ICAgIGhlaWdodDogMjQwLFxuXHRcdCAgICBmbHVpZDogZmFsc2UsXG5cdFx0ICAgIGNvbnRyb2xCYXI6IHtcblx0XHQgICAgICAgIHZvbHVtZVBhbmVsOiBmYWxzZSxcblx0XHQgICAgICAgIGZ1bGxzY3JlZW5Ub2dnbGU6IGZhbHNlXG5cdFx0ICAgIH0sXG5cdFx0ICAgIHBsdWdpbnM6IHtcblx0XHQgICAgICAgIHJlY29yZDoge1xuXHRcdCAgICAgICAgICAgIGltYWdlOiB0cnVlLFxuXHRcdCAgICAgICAgICAgIGRlYnVnOiB0cnVlXG5cdFx0ICAgICAgICB9XG5cdFx0ICAgIH1cblx0XHRcdH0pO1xuXG5cdFx0XHRwbGF5ZXIub24oJ2RldmljZUVycm9yJywgZnVuY3Rpb24oKSB7XG5cdFx0XHQgICAgY29uc29sZS53YXJuKCdkZXZpY2UgZXJyb3I6JywgcGxheWVyLmRldmljZUVycm9yQ29kZSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0cGxheWVyLm9uKCdlcnJvcicsIGZ1bmN0aW9uKGVycm9yKSB7XG5cdFx0XHQgICAgY29uc29sZS5sb2coJ2Vycm9yOicsIGVycm9yKTtcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHRwbGF5ZXIub24oJ2ZpbmlzaFJlY29yZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0ICAgIGNvbnNvbGUubG9nKCdzbmFwc2hvdCByZWFkeTogJywgcGxheWVyLnJlY29yZGVkRGF0YSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRha2VQaG90b01lc3NhZ2U7IiwiY2xhc3MgVmlkZW9NZXNzYWdlIHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHRcdHRoaXMuc291cmNlID0gb3B0aW9ucy5zb3VyY2U7XG5cdFx0dGhpcy5hdXRvcGxheSA9IG9wdGlvbnMuYXV0b3BsYXkgfHwgZmFsc2U7XG5cdH1cblxuXHRzdGFydChkaXYpIHtcblx0XHRjb25zdCB2aWRlbyA9ICQoYFxuXHRcdFx0PHZpZGVvIGNsYXNzPVwidmlkZW8tanMgdmpzLWRlZmF1bHQtc2tpblwiPlxuXHRcdFx0XHQ8c291cmNlIHNyYz0ke3RoaXMuc291cmNlfT4gXG5cdFx0XHQ8L3ZpZGVvPmApO1xuXHRcdFxuXHRcdGNvbnN0IGVsZW1lbnQgPSAkKGBcblx0XHRcdDxkaXYgY2xhc3M9J2NmeC12aWRlbyBjZngtdmVydGljYWwtbWFyZ2luJz5cblx0XHRcdDwvZGl2PmApO1xuXG5cdFx0ZWxlbWVudC5hcHBlbmQodmlkZW8pO1xuXG5cdFx0JChkaXYpLmFwcGVuZChlbGVtZW50KTtcblxuXHRcdHZhciBwbGF5ZXIgPSB2aWRlb2pzKHZpZGVvWzBdLCB7XG5cdFx0XHRjb250cm9sczogdHJ1ZSxcblx0XHR9KTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFZpZGVvTWVzc2FnZTsiXX0=
