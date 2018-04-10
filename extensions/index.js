const Card = require('./card');
const Gallery = require('./gallery');

const conversationalForm = cf.ConversationalForm.startTheConversation({
  formEl: document.getElementById("form"),
  context: document.getElementById("cf-context"),
  flowStepCallback: (dto, success, error) => {
      success();
  },
  submitCallback: () => {
  }
});

conversationalForm.addTags([
// {
// 	tag: "input",
// 	type: "date",
// 	"cf-questions": "Date?"
// },
// {
// 	tag: "input",
// 	type: "datetime-local",
// 	"cf-questions": "Date time?"
// },
// {
// 	tag: "input",
// 	type: "time",
// 	"cf-questions": "Time?"
// },
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

// "tag": "fieldset",
//     "type": "Radio buttons",
//     ]

conversationalForm.remapTagsAndStartFrom();

const card = new Card({
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

const gallery = new Gallery({
	cards: [ card, card ]
});

conversationalForm.addRobotChatResponse('gallery', gallery);


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