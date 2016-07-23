/* eslint-env browser, jquery */

var chart = document.getElementById("chart");

$.getJSON('/tokes/d957040101a1a0c06b99b0a9')
	.then((data) => {
		data = data.map((toke) => ({
			x: new Date(toke.when),
			y: -toke.pressureDrop,
		}));

		new Chart(chart, {
			type: 'line',
			data: {
				data,
			},
		});
	});

