
var ui = function (my, spec) {
	
	var my = my || {},
		spec = spec || {},
		that = {};
		
	my.rowsInput = $('input#rows');
	my.colsInput = $('input#cols');
	my.setupButton = $('button#setup');
	my.goButton = $('button#go');
	my.gameTable = $('table#game');
		
	my.life = {};
	
	my.speed = 100;
	
	my.setup = function() {
		var rows = my.rowsInput.val(),
			cols = my.colsInput.val(),
			n = cols * rows,
			i = 0,
			row;
	
		my.gameTable.html('');
		for(i = 0; i < n; i++) {
			if (i % cols == 0) {
				row = $("<tr></tr>")
					.appendTo(my.gameTable);
			}
			$("<td></td>")
				.attr("id", "n" + i)
				.appendTo(row);
		}
	};
	
	my.switchState = function() {
		var cell = $(this);
		if (cell.hasClass("on")) {
			cell.removeClass("on");
		} else {
			cell.addClass("on");
		}
	};
	
	my.getTable = function() {
		var cells = [],
			rows = my.rowsInput.val(),
			cols = my.colsInput.val(),
			n = cols * rows,
			i = 0;
			
		for (i = 0; i < n; i++) {
			cells.push($('#n' + i).hasClass('on'));
		}
		
		return cells;
	};
	
	my.callback = function(n, state) {
		var cell = $('#n' + n);
		cell.removeClass('on');
		if (state) {
			cell.addClass('on');
		}
	};
	
	my.life;
	my.lifeTimer;
	
	my.action = function() {
		var cols = my.colsInput.val(),
			spec,
			myLife;
		
		if (typeof my.lifeTimer === "number") {
			window.clearInterval(my.lifeTimer);
			delete my.lifeTimer;
		} else {	
			spec = {
					rowLength : cols,
					cells : my.getTable(),
					callback: my.callback
				};
		
			myLife = life({}, spec);
			my.lifeTimer = window.setInterval(myLife.evolve, my.speed);
		}
	};
		
	that.init = function() {
		my.setupButton.click(my.setup);
		my.goButton.click(my.action);
		
		$("td", my.gameTable).live("click", my.switchState);
	};
	
	return that;
};

$(document).ready(function() {
	ui().init();
});