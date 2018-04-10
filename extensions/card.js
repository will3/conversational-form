class Card {
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
		if (isAttachment) {
			div.classList.add("cf-attachment");	
		}

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

module.exports = Card;