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

conversationalForm.addTags([{
	tag: "input",
	type: "date",
	"cf-questions": "date?"
}]);

conversationalForm.addTags([{
	tag: "input",
	type: "datetime-local",
	"cf-questions": "datetime?"
}]);

conversationalForm.addTags([{
	tag: "input",
	type: "time",
	"cf-questions": "time?"
}]);

conversationalForm.start();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy5ucG0vX25weC80MzE2NS9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm1lc3NhZ2VzL2F1ZGlvbWVzc2FnZS5qcyIsIm1lc3NhZ2VzL2NhcmRtZXNzYWdlLmpzIiwibWVzc2FnZXMvZ2FsbGVyeW1lc3NhZ2UuanMiLCJtZXNzYWdlcy9sb2NhdGlvbm1lc3NhZ2UuanMiLCJtZXNzYWdlcy9yZWNvcmRhdWRpb21lc3NhZ2UuanMiLCJtZXNzYWdlcy9yZWNvcmR2aWRlb21lc3NhZ2UuanMiLCJtZXNzYWdlcy90YWtlcGhvdG9tZXNzYWdlLmpzIiwibWVzc2FnZXMvdmlkZW9tZXNzYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBDYXJkTWVzc2FnZSA9IHJlcXVpcmUoJy4vbWVzc2FnZXMvY2FyZG1lc3NhZ2UnKTtcbmNvbnN0IEdhbGxlcnlNZXNzYWdlID0gcmVxdWlyZSgnLi9tZXNzYWdlcy9nYWxsZXJ5bWVzc2FnZScpO1xuY29uc3QgVmlkZW9NZXNzYWdlID0gcmVxdWlyZSgnLi9tZXNzYWdlcy92aWRlb21lc3NhZ2UnKTtcbmNvbnN0IEF1ZGlvTWVzc2FnZSA9IHJlcXVpcmUoJy4vbWVzc2FnZXMvYXVkaW9tZXNzYWdlJyk7XG5jb25zdCBMb2NhdGlvbk1lc3NhZ2UgPSByZXF1aXJlKCcuL21lc3NhZ2VzL2xvY2F0aW9ubWVzc2FnZScpO1xuY29uc3QgUmVjb3JkVmlkZW9NZXNzYWdlID0gcmVxdWlyZSgnLi9tZXNzYWdlcy9yZWNvcmR2aWRlb21lc3NhZ2UnKTtcbmNvbnN0IFRha2VQaG90b01lc3NhZ2UgPSByZXF1aXJlKCcuL21lc3NhZ2VzL3Rha2VwaG90b21lc3NhZ2UnKTtcbmNvbnN0IFJlY29yZEF1ZGlvTWVzc2FnZSA9IHJlcXVpcmUoJy4vbWVzc2FnZXMvcmVjb3JkYXVkaW9tZXNzYWdlJyk7XG5cbmNvbnN0IGNvbnZlcnNhdGlvbmFsRm9ybSA9IGNmLkNvbnZlcnNhdGlvbmFsRm9ybS5zdGFydFRoZUNvbnZlcnNhdGlvbih7XG4gIGZvcm1FbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtXCIpLFxuICBjb250ZXh0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNmLWNvbnRleHRcIiksXG4gIGZsb3dTdGVwQ2FsbGJhY2s6IChkdG8sIHN1Y2Nlc3MsIGVycm9yKSA9PiB7XG4gICAgc3VjY2VzcygpO1x0XG4gIH0sXG4gIHN1Ym1pdENhbGxiYWNrOiAoKSA9PiB7XG4gIH1cbn0pO1xuXG5jb25zdCBjYXJkID0gbmV3IENhcmRNZXNzYWdlKHtcblx0dGl0bGU6ICd0aXRsZScsXG5cdGRldGFpbDogJ2RldGFpbCcsXG5cdGltYWdlOiAnaHR0cDovL3ZpYS5wbGFjZWhvbGRlci5jb20vMzUweDE1MCcsXG5cdGJ1dHRvbnM6IFt7XG5cdFx0dGl0bGU6ICdhJyxcblx0XHRvbkNsaWNrOiAoKSA9PiB7XG5cdFx0XHRhbGVydCgnYScpO1xuXHRcdH1cblx0fSwge1xuXHRcdHRpdGxlOiAnYicsXG5cdFx0b25DbGljazogKCkgPT4ge1xuXHRcdFx0YWxlcnQoJ2InKTtcblx0XHR9XG5cdH1dXG59KTtcblxuLy8gY29udmVyc2F0aW9uYWxGb3JtLmFkZE1lc3NhZ2Uoe1xuLy8gXHRpc1JvYm90OiB0cnVlLFxuLy8gXHRyZXNwb25zZTogJ3VzZXIgdGhpbmtpbmcgbm90IHN1cHBvcnRlZCcsXG4vLyBcdHJlc3BvbnNlVGltZTogSW5maW5pdHlcbi8vIH0pO1xuXG5jb252ZXJzYXRpb25hbEZvcm0uYWRkTWVzc2FnZSh7XG5cdGlzUm9ib3Q6IHRydWUsXG5cdGF0dGFjaG1lbnQ6IGNhcmRcbn0pO1xuXG4vLyBjb252ZXJzYXRpb25hbEZvcm0uYWRkTWVzc2FnZSh7XG4vLyBcdGlzUm9ib3Q6IHRydWUsXG4vLyBcdHJlc3BvbnNlOiAnZ2FsbGVyeScsXG4vLyBcdGF0dGFjaG1lbnQ6IG5ldyBHYWxsZXJ5TWVzc2FnZSh7XG4vLyBcdFx0Y2FyZHM6IFsgY2FyZCwgY2FyZCBdXG4vLyBcdH0pXG4vLyB9KTtcblxuLy8gY29udmVyc2F0aW9uYWxGb3JtLmFkZE1lc3NhZ2Uoe1xuLy8gXHRpc1JvYm90OiB0cnVlLFxuLy8gXHRyZXNwb25zZTogJ3ZpZGVvJyxcbi8vIFx0YXR0YWNobWVudDogbmV3IFZpZGVvTWVzc2FnZSh7XG4vLyBcdFx0c291cmNlOiAnaHR0cHM6Ly92anMuemVuY2RuLm5ldC92L29jZWFucy5tcDQnXG4vLyBcdH0pXG4vLyB9KTtcblxuLy8gY29udmVyc2F0aW9uYWxGb3JtLmFkZE1lc3NhZ2Uoe1xuLy8gXHRpc1JvYm90OiB0cnVlLFxuLy8gXHRyZXNwb25zZTogJ2F1ZGlvJyxcbi8vIFx0YXR0YWNobWVudDogbmV3IEF1ZGlvTWVzc2FnZSh7XG4vLyBcdFx0c291cmNlOiAnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2FuYXJzL2JsYW5rLWF1ZGlvL21hc3Rlci8xMC1taW51dGVzLW9mLXNpbGVuY2UubXAzJ1xuLy8gXHR9KVxuLy8gfSk7XG5cbi8vIGNvbnZlcnNhdGlvbmFsRm9ybS5hZGRNZXNzYWdlKHtcbi8vIFx0aXNSb2JvdDogdHJ1ZSxcbi8vIFx0cmVzcG9uc2U6ICdzaGFyZSB5b3VyIGN1cnJlbnQgbG9jYXRpb24/Jyxcbi8vIFx0YXR0YWNobWVudDogbmV3IExvY2F0aW9uTWVzc2FnZSh7XG4vLyBcdFx0b25Mb2NhdGlvblN1Y2Nlc3M6IChwb3NpdGlvbikgPT4ge1xuLy8gXHRcdFx0Y29uc29sZS5sb2cocG9zaXRpb24pO1xuLy8gXHRcdH1cbi8vIFx0fSlcbi8vIH0pO1xuXG4vLyBjb252ZXJzYXRpb25hbEZvcm0uYWRkTWVzc2FnZSh7XG4vLyBcdGlzUm9ib3Q6IHRydWUsXG4vLyBcdHJlc3BvbnNlOiAndGFrZSBwaG90bycsXG4vLyBcdGF0dGFjaG1lbnQ6IG5ldyBUYWtlUGhvdG9NZXNzYWdlKHt9KVxuLy8gfSk7XG5cbi8vIGNvbnZlcnNhdGlvbmFsRm9ybS5hZGRNZXNzYWdlKHtcbi8vIFx0aXNSb2JvdDogdHJ1ZSxcbi8vIFx0cmVzcG9uc2U6ICdyZWNvcmQgdmlkZW8nLFxuLy8gXHRhdHRhY2htZW50OiBuZXcgUmVjb3JkVmlkZW9NZXNzYWdlKHt9KVxuLy8gfSk7XG5cbi8vIGNvbnZlcnNhdGlvbmFsRm9ybS5hZGRNZXNzYWdlKHtcbi8vIFx0aXNSb2JvdDogdHJ1ZSxcbi8vIFx0cmVzcG9uc2U6ICdyZWNvcmQgYXVkaW8nLFxuLy8gXHRhdHRhY2htZW50OiBuZXcgUmVjb3JkQXVkaW9NZXNzYWdlKHt9KVxuLy8gfSk7XG5cbmNvbnZlcnNhdGlvbmFsRm9ybS5hZGRUYWdzKFt7XG5cdHRhZzogXCJpbnB1dFwiLFxuXHR0eXBlOiBcImRhdGVcIixcblx0XCJjZi1xdWVzdGlvbnNcIjogXCJkYXRlP1wiXG59XSk7XG5cbmNvbnZlcnNhdGlvbmFsRm9ybS5hZGRUYWdzKFt7XG5cdHRhZzogXCJpbnB1dFwiLFxuXHR0eXBlOiBcImRhdGV0aW1lLWxvY2FsXCIsXG5cdFwiY2YtcXVlc3Rpb25zXCI6IFwiZGF0ZXRpbWU/XCJcbn1dKTtcblxuY29udmVyc2F0aW9uYWxGb3JtLmFkZFRhZ3MoW3tcblx0dGFnOiBcImlucHV0XCIsXG5cdHR5cGU6IFwidGltZVwiLFxuXHRcImNmLXF1ZXN0aW9uc1wiOiBcInRpbWU/XCJcbn1dKTtcblxuY29udmVyc2F0aW9uYWxGb3JtLnN0YXJ0KCk7IiwiY2xhc3MgQXVkaW9NZXNzYWdlIHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHRcdHRoaXMuc291cmNlID0gb3B0aW9ucy5zb3VyY2U7XG5cdFx0dGhpcy5hdXRvcGxheSA9IG9wdGlvbnMuYXV0b3BsYXkgfHwgZmFsc2U7XG5cdH1cblxuXHRzdGFydChkaXYpIHtcblx0XHRjb25zdCBhdWRpbyA9ICQoYFxuXHRcdFx0PGF1ZGlvIHByZWxvYWQ9XCJhdXRvXCIgXG5cdFx0XHRcdGF1dG9wbGF5PSR7dGhpcy5hdXRvcGxheSA/IDEgOiAwfT5cblx0XHRcdFx0PHNvdXJjZSBzcmM9JHt0aGlzLnNvdXJjZX0+IFxuXHRcdFx0PC9hdWRpbz5gKTtcblx0XHRjb25zdCBlbGVtZW50ID0gJChgXG5cdFx0XHQ8ZGl2IGNsYXNzPSdjZngtYXVkaW8gY2Z4LXZlcnRpY2FsLW1hcmdpbic+XG5cdFx0XHQ8L2Rpdj5gKTtcblxuXHRcdGVsZW1lbnQuYXBwZW5kKGF1ZGlvKTtcblx0XHQkKGRpdikuYXBwZW5kKGVsZW1lbnQpO1xuXG5cdFx0YXVkaW9qcy5jcmVhdGUoYXVkaW9bMF0pO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQXVkaW9NZXNzYWdlOyIsImNsYXNzIENhcmRNZXNzYWdlIHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHRcdHRoaXMudGl0bGUgPSBvcHRpb25zLnRpdGxlIHx8ICcnO1xuXHRcdHRoaXMuZGV0YWlsID0gb3B0aW9ucy5kZXRhaWwgfHwgJyc7XG5cdFx0dGhpcy5idXR0b25zID0gb3B0aW9ucy5idXR0b25zIHx8IFtdO1xuXHRcdHRoaXMuaW1hZ2UgPSBvcHRpb25zLmltYWdlIHx8ICcnO1xuXHR9XG5cblx0c3RhcnQoZGl2KSB7XG5cdFx0dGhpcy5idWlsZEVsZW1lbnQoZGl2LCB0cnVlKTtcblx0fVxuXG5cdGJ1aWxkRWxlbWVudChkaXYsIGlzQXR0YWNobWVudCkge1xuXHRcdGNvbnN0IGVsZW1lbnQgPSAkKFxuXHRcdGA8ZGl2IGNsYXNzPSdjZngtY2FyZCc+XG5cdFx0XHQ8ZGl2IGNsYXNzPSdjZngtY2FyZC1pbWFnZSBjZngtYm90dG9tLWxpbmUnPlxuXHRcdFx0XHQ8aW1nIHNyYz0nJHt0aGlzLmltYWdlfScvPlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8ZGl2IGNsYXNzPSdjZngtdGl0bGUtY29udGFpbmVyIGNmeC1ib3R0b20tbGluZSc+XG5cdFx0XHRcdDxkaXYgY2xhc3M9J2NmeC10aXRsZSc+JHt0aGlzLnRpdGxlfTwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPSdjZngtZGV0YWlsJz4ke3RoaXMuZGV0YWlsfTwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9kaXY+YCk7XG5cblx0XHRpZiAoaXNBdHRhY2htZW50KSB7XG5cdFx0XHRlbGVtZW50LmFkZENsYXNzKCdjZngtdmVydGljYWwtbWFyZ2luJyk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgYnV0dG9ucyA9IHRoaXMuYnV0dG9ucy5tYXAoKGIsIGluZGV4KSA9PiB7XG5cdFx0XHRjb25zdCBjbGFzc05hbWUgPSBpbmRleCA9PSB0aGlzLmJ1dHRvbnMubGVuZ3RoIC0gMSA/ICdjZngtYnV0dG9uJyA6ICdjZngtYm90dG9tLWxpbmUgY2Z4LWJ1dHRvbic7XG5cdFx0XHRjb25zdCBlID0gJChgPGRpdiBjbGFzcz0nJHtjbGFzc05hbWV9Jz4ke2IudGl0bGV9PC9kaXY+YCk7XG5cdFx0XHRlLm9uKCdjbGljaycsICgpID0+IHtcblx0XHRcdFx0Yi5vbkNsaWNrKCk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBlO1xuXHRcdH0pO1xuXG5cdFx0ZWxlbWVudC5hcHBlbmQoYnV0dG9ucyk7XG5cblx0XHQkKGRpdikuYXBwZW5kKGVsZW1lbnQpO1xuXHR9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhcmRNZXNzYWdlOyIsIi8vIFRPRE8gdXNlciBnYWxsZXJ5IG5vdCBhbGlnbmVkIHByb3Blcmx5XG5jbGFzcyBHYWxsZXJ5TWVzc2FnZSB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHR0aGlzLmNhcmRzID0gb3B0aW9ucy5jYXJkcyB8fCBbXTtcblx0fVxuXG5cdHN0YXJ0KGRpdikge1xuXHRcdGRpdi5jbGFzc0xpc3QuYWRkKFwiY2YtbmVzdGVkLXNjcm9sbFwiKTtcblx0XHRjb25zdCBlbGVtZW50ID0gJChgPGRpdiBjbGFzcz0nY2Z4LWdhbGxlcnkgY2Z4LXZlcnRpY2FsLW1hcmdpbic+XG5cdFx0XHQ8ZGl2IGNsYXNzPSdjZngtZ2FsbGVyeS1jb250ZW50Jz48L2Rpdj5cblx0XHRcdDwvZGl2PmApO1xuXG5cdFx0Y29uc3QgY2FyZHMgPSB0aGlzLmNhcmRzLm1hcCgoY2FyZCkgPT4ge1xuXHRcdFx0Y29uc3QgZSA9ICQoYDxkaXYgY2xhc3M9J2NmeC1nYWxsZXJ5LWNhcmQnPjwvZGl2PmApO1xuXHRcdFx0Y2FyZC5idWlsZEVsZW1lbnQoZVswXSwgZmFsc2UpO1xuXHRcdFx0cmV0dXJuIGU7XG5cdFx0fSk7XG5cblx0XHQkKCcuY2Z4LWdhbGxlcnktY29udGVudCcsIGVsZW1lbnQpLmFwcGVuZChjYXJkcyk7XG5cblx0XHQkKGRpdikuYXBwZW5kKGVsZW1lbnQpO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gR2FsbGVyeU1lc3NhZ2U7IiwiY2xhc3MgTG9jYXRpb25NZXNzYWdlIHtcblx0Y29uc3RydWN0b3IocGFyYW1zKSB7XG5cdFx0cGFyYW1zID0gcGFyYW1zIHx8IHt9O1xuXHRcdHRoaXMub25Mb2NhdGlvblN1Y2Nlc3MgPSBwYXJhbXMub25Mb2NhdGlvblN1Y2Nlc3M7XG5cdFx0dGhpcy5vbkxvY2F0aW9uRXJyb3IgPSBwYXJhbXMub25Mb2NhdGlvbkVycm9yO1xuXHR9XG5cblx0c3RhcnQoZGl2KSB7XG5cdFx0Y29uc3QgZWxlbWVudCA9ICQoYDxkaXYgY2xhc3M9J2NmeC1idXR0b24gY2Z4LWJ1dHRvbi1yb3VuZGVkIGNmeC12ZXJ0aWNhbC1tYXJnaW4nPlxuXHRcdFx0PGRpdiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tbWFwLW1hcmtlclwiIC8+XG5cdFx0XHRTaGFyZSB5b3VyIGN1cnJlbnQgbG9jYXRpb25cblx0XHQ8L2Rpdj5gKTtcblxuXHRcdGVsZW1lbnQub24oJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0bmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbih0aGlzLm9uTG9jYXRpb25TdWNjZXNzLCB0aGlzLm9uTG9jYXRpb25FcnJvcik7XG5cdFx0fSk7XG5cblx0XHQkKGRpdikuYXBwZW5kKGVsZW1lbnQpO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTG9jYXRpb25NZXNzYWdlOyIsImNsYXNzIFJlY29yZEF1ZGlvTWVzc2FnZSB7XG5cdHN0YXJ0KGRpdikge1xuXHRcdGNvbnN0IGVsZW1lbnQgPSAkKGA8YXVkaW8gaWQ9XCJteUF1ZGlvXCIgY2xhc3M9XCJ2aWRlby1qcyB2anMtZGVmYXVsdC1za2luIGNmeC12ZXJ0aWNhbC1tYXJnaW5cIj48L2F1ZGlvPmApO1xuXG5cdFx0JChkaXYpLmFwcGVuZChlbGVtZW50KTtcblxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0dmFyIHBsYXllciA9IHZpZGVvanMoZWxlbWVudFswXSwge1xuXHRcdFx0ICBjb250cm9sczogdHJ1ZSxcbiAgICAgICAgd2lkdGg6IDYwMCxcbiAgICAgICAgaGVpZ2h0OiAzMDAsXG4gICAgICAgIGZsdWlkOiBmYWxzZSxcbiAgICAgICAgcGx1Z2luczoge1xuICAgICAgICAgIHdhdmVzdXJmZXI6IHtcbiAgICAgICAgICAgIHNyYzogXCJsaXZlXCIsXG4gICAgICAgICAgICB3YXZlQ29sb3I6IFwiIzM2MzkzYlwiLFxuICAgICAgICAgICAgcHJvZ3Jlc3NDb2xvcjogXCIjYmxhY2tcIixcbiAgICAgICAgICAgIGRlYnVnOiB0cnVlLFxuICAgICAgICAgICAgY3Vyc29yV2lkdGg6IDEsXG4gICAgICAgICAgICBtc0Rpc3BsYXlNYXg6IDIwLFxuICAgICAgICAgICAgaGlkZVNjcm9sbGJhcjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVjb3JkOiB7XG4gICAgICAgICAgICBhdWRpbzogdHJ1ZSxcbiAgICAgICAgICAgIHZpZGVvOiBmYWxzZSxcbiAgICAgICAgICAgIG1heExlbmd0aDogMjAsXG4gICAgICAgICAgICBkZWJ1ZzogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXHRcdFx0fSwgZnVuY3Rpb24oKSB7XG5cdFx0XHQgICAgLy8gcHJpbnQgdmVyc2lvbiBpbmZvcm1hdGlvbiBhdCBzdGFydHVwXG5cdFx0XHQgICAgdmlkZW9qcy5sb2coJ1VzaW5nIHZpZGVvLmpzJywgdmlkZW9qcy5WRVJTSU9OLFxuXHRcdFx0ICAgICAgICAnd2l0aCB2aWRlb2pzLXJlY29yZCcsIHZpZGVvanMuZ2V0UGx1Z2luVmVyc2lvbigncmVjb3JkJyksXG5cdFx0XHQgICAgICAgICcrIHZpZGVvanMtd2F2ZXN1cmZlcicsIHZpZGVvanMuZ2V0UGx1Z2luVmVyc2lvbignd2F2ZXN1cmZlcicpLFxuXHRcdFx0ICAgICAgICAnYW5kIHJlY29yZHJ0YycsIFJlY29yZFJUQy52ZXJzaW9uKTtcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHQvLyBlcnJvciBoYW5kbGluZ1xuXHRcdFx0cGxheWVyLm9uKCdkZXZpY2VFcnJvcicsIGZ1bmN0aW9uKCkge1xuXHRcdFx0ICBjb25zb2xlLmxvZygnZGV2aWNlIGVycm9yOicsIHBsYXllci5kZXZpY2VFcnJvckNvZGUpO1xuXHRcdFx0fSk7XG5cdFx0XHRwbGF5ZXIub24oJ2Vycm9yJywgZnVuY3Rpb24oZXJyb3IpIHtcblx0XHRcdCAgY29uc29sZS5sb2coJ2Vycm9yOicsIGVycm9yKTtcblx0XHRcdH0pO1xuXHRcdFx0Ly8gdXNlciBjbGlja2VkIHRoZSByZWNvcmQgYnV0dG9uIGFuZCBzdGFydGVkIHJlY29yZGluZ1xuXHRcdFx0cGxheWVyLm9uKCdzdGFydFJlY29yZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0ICBjb25zb2xlLmxvZygnc3RhcnRlZCByZWNvcmRpbmchJyk7XG5cdFx0XHR9KTtcblx0XHRcdC8vIHVzZXIgY29tcGxldGVkIHJlY29yZGluZyBhbmQgc3RyZWFtIGlzIGF2YWlsYWJsZVxuXHRcdFx0cGxheWVyLm9uKCdmaW5pc2hSZWNvcmQnLCBmdW5jdGlvbigpIHtcblx0XHRcdCAgICAvLyB0aGUgYmxvYiBvYmplY3QgY29udGFpbnMgdGhlIHJlY29yZGVkIGRhdGEgdGhhdFxuXHRcdFx0ICAgIC8vIGNhbiBiZSBkb3dubG9hZGVkIGJ5IHRoZSB1c2VyLCBzdG9yZWQgb24gc2VydmVyIGV0Yy5cblx0XHRcdCAgY29uc29sZS5sb2coJ2ZpbmlzaGVkIHJlY29yZGluZzogJywgcGxheWVyLnJlY29yZGVkRGF0YSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlY29yZEF1ZGlvTWVzc2FnZTsiLCJjbGFzcyBSZWNvcmRWaWRlb01lc3NhZ2Uge1xuXHRzdGFydChkaXYpIHtcblx0XHRjb25zdCBlbGVtZW50ID0gJChgPHZpZGVvIGlkPVwibXlJbWFnZVwiIGNsYXNzPVwidmlkZW8tanMgdmpzLWRlZmF1bHQtc2tpbiBjZngtdmVydGljYWwtbWFyZ2luXCI+PC92aWRlbz5gKTtcblxuXHRcdCQoZGl2KS5hcHBlbmQoZWxlbWVudCk7XG5cblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdHZhciBwbGF5ZXIgPSB2aWRlb2pzKGVsZW1lbnRbMF0sIHtcblx0XHQgICAgY29udHJvbHM6IHRydWUsXG5cdFx0ICAgIHdpZHRoOiAzMjAsXG5cdFx0ICAgIGhlaWdodDogMjQwLFxuXHRcdCAgICBmbHVpZDogZmFsc2UsXG5cdFx0ICAgIGNvbnRyb2xCYXI6IHtcblx0XHQgICAgICAgIHZvbHVtZVBhbmVsOiBmYWxzZSxcblx0XHQgICAgICAgIGZ1bGxzY3JlZW5Ub2dnbGU6IGZhbHNlXG5cdFx0ICAgIH0sXG5cdFx0ICAgIHBsdWdpbnM6IHtcblx0XHRcdFx0XHRyZWNvcmQ6IHtcblx0XHRcdFx0XHRcdGF1ZGlvOiBmYWxzZSxcblx0XHRcdFx0XHRcdHZpZGVvOiB0cnVlLFxuXHRcdFx0XHRcdFx0bWF4TGVuZ3RoOiAxMCxcblx0XHRcdFx0XHRcdGRlYnVnOiB0cnVlXG5cdFx0XHRcdFx0fVxuXHRcdCAgICB9XG5cdFx0XHR9KTtcblxuXHRcdFx0cGxheWVyLm9uKCdkZXZpY2VFcnJvcicsIGZ1bmN0aW9uKCkge1xuXHRcdFx0ICAgIGNvbnNvbGUud2FybignZGV2aWNlIGVycm9yOicsIHBsYXllci5kZXZpY2VFcnJvckNvZGUpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHBsYXllci5vbignZXJyb3InLCBmdW5jdGlvbihlcnJvcikge1xuXHRcdFx0ICAgIGNvbnNvbGUubG9nKCdlcnJvcjonLCBlcnJvcik7XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0cGxheWVyLm9uKCdmaW5pc2hSZWNvcmQnLCBmdW5jdGlvbigpIHtcblx0XHRcdCAgICBjb25zb2xlLmxvZygnc25hcHNob3QgcmVhZHk6ICcsIHBsYXllci5yZWNvcmRlZERhdGEpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWNvcmRWaWRlb01lc3NhZ2U7IiwiY2xhc3MgVGFrZVBob3RvTWVzc2FnZSB7XG5cdHN0YXJ0KGRpdikge1xuXHRcdGNvbnN0IGVsZW1lbnQgPSAkKGA8dmlkZW8gaWQ9XCJteUltYWdlXCIgY2xhc3M9XCJ2aWRlby1qcyB2anMtZGVmYXVsdC1za2luIGNmeC12ZXJ0aWNhbC1tYXJnaW5cIj48L3ZpZGVvPmApO1xuXG5cdFx0JChkaXYpLmFwcGVuZChlbGVtZW50KTtcblxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0dmFyIHBsYXllciA9IHZpZGVvanMoZWxlbWVudFswXSwge1xuXHRcdCAgICBjb250cm9sczogdHJ1ZSxcblx0XHQgICAgd2lkdGg6IDMyMCxcblx0XHQgICAgaGVpZ2h0OiAyNDAsXG5cdFx0ICAgIGZsdWlkOiBmYWxzZSxcblx0XHQgICAgY29udHJvbEJhcjoge1xuXHRcdCAgICAgICAgdm9sdW1lUGFuZWw6IGZhbHNlLFxuXHRcdCAgICAgICAgZnVsbHNjcmVlblRvZ2dsZTogZmFsc2Vcblx0XHQgICAgfSxcblx0XHQgICAgcGx1Z2luczoge1xuXHRcdCAgICAgICAgcmVjb3JkOiB7XG5cdFx0ICAgICAgICAgICAgaW1hZ2U6IHRydWUsXG5cdFx0ICAgICAgICAgICAgZGVidWc6IHRydWVcblx0XHQgICAgICAgIH1cblx0XHQgICAgfVxuXHRcdFx0fSk7XG5cblx0XHRcdHBsYXllci5vbignZGV2aWNlRXJyb3InLCBmdW5jdGlvbigpIHtcblx0XHRcdCAgICBjb25zb2xlLndhcm4oJ2RldmljZSBlcnJvcjonLCBwbGF5ZXIuZGV2aWNlRXJyb3JDb2RlKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRwbGF5ZXIub24oJ2Vycm9yJywgZnVuY3Rpb24oZXJyb3IpIHtcblx0XHRcdCAgICBjb25zb2xlLmxvZygnZXJyb3I6JywgZXJyb3IpO1xuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdHBsYXllci5vbignZmluaXNoUmVjb3JkJywgZnVuY3Rpb24oKSB7XG5cdFx0XHQgICAgY29uc29sZS5sb2coJ3NuYXBzaG90IHJlYWR5OiAnLCBwbGF5ZXIucmVjb3JkZWREYXRhKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVGFrZVBob3RvTWVzc2FnZTsiLCJjbGFzcyBWaWRlb01lc3NhZ2Uge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cdFx0dGhpcy5zb3VyY2UgPSBvcHRpb25zLnNvdXJjZTtcblx0XHR0aGlzLmF1dG9wbGF5ID0gb3B0aW9ucy5hdXRvcGxheSB8fCBmYWxzZTtcblx0fVxuXG5cdHN0YXJ0KGRpdikge1xuXHRcdGNvbnN0IHZpZGVvID0gJChgXG5cdFx0XHQ8dmlkZW8gY2xhc3M9XCJ2aWRlby1qcyB2anMtZGVmYXVsdC1za2luXCI+XG5cdFx0XHRcdDxzb3VyY2Ugc3JjPSR7dGhpcy5zb3VyY2V9PiBcblx0XHRcdDwvdmlkZW8+YCk7XG5cdFx0XG5cdFx0Y29uc3QgZWxlbWVudCA9ICQoYFxuXHRcdFx0PGRpdiBjbGFzcz0nY2Z4LXZpZGVvIGNmeC12ZXJ0aWNhbC1tYXJnaW4nPlxuXHRcdFx0PC9kaXY+YCk7XG5cblx0XHRlbGVtZW50LmFwcGVuZCh2aWRlbyk7XG5cblx0XHQkKGRpdikuYXBwZW5kKGVsZW1lbnQpO1xuXG5cdFx0dmFyIHBsYXllciA9IHZpZGVvanModmlkZW9bMF0sIHtcblx0XHRcdGNvbnRyb2xzOiB0cnVlLFxuXHRcdH0pO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVmlkZW9NZXNzYWdlOyJdfQ==
