

life = function (my, spec) {
	
	var my = my || {},
		spec = spec || {},
		that = {};
		
	my.gridDim = spec.gridDim || 0;
	my.cells = spec.cells || {};
		
	that.initGrid = function(n) {
		my.gridDim = n;
	};
	
	that.gridSize = function() {
		return my.gridDim * my.gridDim;
	};
	
	that.setCells = function(cells) {
		my.cells = cells;
	};
	
	that.isAlive = function(x, y) {
		if (x < 0 || x >= my.gridDim || y < 0 || y >= my.gridDim) {
			return false;
		}
		var result = my.cells[x + y * my.gridDim];
		
		return result;
	}
	
	that.countLiveNeighbours = function(x,y) {
		var count = 0,
			i = 0,
			j = 0;
			
		for(i = -1; i<=1; i++) {
			for(j = -1; j<=1; j++) {
				if(!(i==0 && j==0)) {
					var result = that.isAlive(x+i, y+j) ? 1 : 0;
					count += result;
				}
			}
		}
		return count;
	}
	
	return that;		
};
