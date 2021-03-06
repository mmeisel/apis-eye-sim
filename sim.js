/*globals d3:true */

var apisEyeSim = function (target) {
    var self = {};

    var _element = typeof target == 'string' ? d3.select(target) : target;
    var _frameDuration = 500;
    var _fadeDuration = 250;
    var _iteration = 0;
    var _frameTimer = null;
    var _renderer;
    
    self.renderer = function (r) {
        if (!arguments.length) return _renderer;
        _renderer = r;
        return self;
    };

    self.rows = function () {
        return 13;
    };
    
    self.cols = function () {
        return 9;
    };
    
    self.iteration = function () {
        return _iteration;
    };
    
    self.isInBounds = function (row, col) {
        var rowMin = 0;
        var rowMax = 12;
    
        if (col === 0 || col === 8) {
            rowMin = 3;
            rowMax = 9;
        }
        else if (col === 1 || col === 7) {
            rowMin = 1;
            rowMax = 11;
        }
    
        return row >= rowMin && row <= rowMax && col >= 0 && col <= 8;
    };
    
    self.emptyMatrix = function () {
        var matrix = [];
    
        for (var y = 0; y < self.rows(); ++y) {
            matrix[y] = [];
        
            for (var x = 0; x < self.cols(); ++x) {
                matrix[y][x] = { r: 0, g: 0, b: 0 };
            }
        }
    
        return matrix;
    };
    
    self.frameDuration = function (duration) {
        if (!arguments.length) return _frameDuration;
        _frameDuration = duration;
        self.stop().start();
        return self;
    };

    self.fadeDuration = function (duration) {
        if (!arguments.length) return _fadeDuration;
        _fadeDuration = duration;
        return self;
    };
    
    self.start = function () {
        var rows = _element.selectAll('g').data(_renderer());
    
        rows.enter().append('g');
    
        var dots = rows.selectAll('circle').data(function (r) { return r; });
    
        dots.enter().append('circle').attr('r', function (d, col, row) {
            return self.isInBounds(row, col) ? 10 : 2;
        })
        .attr('cx', function (c, i) { return (i + 1) * 30; })
        .attr('cy', function (c, i, j) { return (j + 1) * 30; });
    
        dots.transition().duration(_fadeDuration).attr('fill', function (c) {
            return 'rgb(' + c.r + ',' + c.g + ',' + c.b + ')';
        });
        
        if (!_frameTimer) {
            _frameTimer = setInterval(self.start, _frameDuration);
        }
        _iteration += 1;
        return self;
    };
    
    self.stop = function () {
        _frameTimer = clearInterval(_frameTimer);
        _iteration = 0;
        return self;
    };
    
    // Default renderer
    _renderer = self.emptyMatrix;
    return self;
};
