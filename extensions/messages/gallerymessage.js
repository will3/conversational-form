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