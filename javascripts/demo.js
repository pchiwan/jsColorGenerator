

$(document).ready(function () {

	var viewModel = function () {

		var self = this;

		var limit = 16;

		var colGen = new jsColorGenerator({
			//avoidDarks: true,
			//avoidLights: true
		});

		this.colors1 = ko.observableArray([]);
		this.colors2 = ko.observableArray([]);
		this.colors3 = ko.observableArray([]);
		this.colorsDemo = ko.observableArray([]);	

		function refreshColors () {
			var temp = [];
			for (var i = 0; i < limit; i++) {
				temp.push(colGen.getColor());
			}
			return temp;
		}

		this.refreshAll = function () {
			self.colors1(refreshColors());
			self.colors2(refreshColors());
			self.colors3(refreshColors());
		};

		return this;
	}();

	viewModel.refreshAll();

	//apply ko bindings
	ko.applyBindings(viewModel, $('body')[0]);

});