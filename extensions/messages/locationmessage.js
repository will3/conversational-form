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