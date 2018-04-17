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

conversationalForm.addMessage({
	isRobot: false,
	response: 'user thinking not supported',
	responseTime: Infinity
});

conversationalForm.addMessage({
	isRobot: false,
	response: 'card',
	attachment: card
});

conversationalForm.addMessage({
	isRobot: false,
	response: 'gallery',
	attachment: new GalleryMessage({
		cards: [ card, card ]
	})
});

conversationalForm.addMessage({
	isRobot: false,
	response: 'video',
	attachment: new VideoMessage({
		source: 'https://vjs.zencdn.net/v/oceans.mp4'
	})
});

conversationalForm.addMessage({
	isRobot: false,
	response: 'audio',
	attachment: new AudioMessage({
		source: 'https://raw.githubusercontent.com/anars/blank-audio/master/10-minutes-of-silence.mp3'
	})
});

conversationalForm.addMessage({
	isRobot: false,
	response: 'share your current location?',
	attachment: new LocationMessage({
		onLocationSuccess: (position) => {
			console.log(position);
		}
	})
});

conversationalForm.addMessage({
	isRobot: false,
	response: 'take photo',
	attachment: new TakePhotoMessage({})
});

conversationalForm.addMessage({
	isRobot: false,
	response: 'record video',
	attachment: new RecordVideoMessage({})
});

conversationalForm.addMessage({
	isRobot: false,
	response: 'record audio',
	attachment: new RecordAudioMessage({})
});

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

conversationalForm.remapTagsAndStartFrom();