const CardMessage = require('./messages/cardmessage');
const GalleryMessage = require('./messages/gallerymessage');
const VideoMessage = require('./messages/videomessage');
const AudioMessage = require('./messages/audiomessage');

const conversationalForm = cf.ConversationalForm.startTheConversation({
  formEl: document.getElementById("form"),
  context: document.getElementById("cf-context"),
  flowStepCallback: (dto, success, error) => {
      success();
  },
  submitCallback: () => {
  }
});

function init() {

conversationalForm.addTags([
{
	tag: "input",
	type: "date",
	"cf-questions": "Date?"
},
{
	tag: "input",
	type: "datetime-local",
	"cf-questions": "Date time?"
},
{
	tag: "input",
	type: "time",
	"cf-questions": "Time?"
}
]);

conversationalForm.addTags([
{
	tag: "fieldset",
	type: "Radio buttons",
  "cf-questions": "Share your location?",
	"children":[
	{
	"tag": "input",
	"type": "radio",
	"name": "radio-buttons-1",
	"cf-label": "Yes"
	},
	{
	"tag": "input",
	"type": "radio",
	"name": "radio-buttons-1",
	"cf-label": "No"
	}]
}
]);

conversationalForm.remapTagsAndStartFrom();

conversationalForm.showThinking();

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

conversationalForm.addRobotChatResponse('card', card);

const gallery = new GalleryMessage({
	cards: [ card, card ]
});

conversationalForm.addRobotChatResponse('gallery', gallery);


const video = new VideoMessage({
	source: 'http://techslides.com/demos/sample-videos/small.mp4'
});

conversationalForm.addRobotChatResponse('video', video);

const audio = new AudioMessage({
	source: 'https://raw.githubusercontent.com/anars/blank-audio/master/10-minutes-of-silence.mp3'
});

conversationalForm.addRobotChatResponse('audio', audio);

// DONE
// 
// TODO
// 
// Date mask
// Date time mask
// Time mask
// Location
// Image Capture
// Video Capture
// Audio Capture
// 
// Image Message
// Card Message
// Text Card
// Gallery
// Video
// Audio
// Document
// Delay
// Progress
// Results

};

init();