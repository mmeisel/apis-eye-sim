window.onload = function () {
    var sim = apisEyeSim('#eye').frameDuration(200).fadeDuration(0);
    
    var trueSpiral = function () {
        var matrix = sim.emptyMatrix();
        var x = 0, y = 0, dx = 0, dy = -1, swap;
        var colorOff = { r: 0, g: 0, b: 0 };
        var colorOn = { r: 255, g: 255, b: 255 };
        var on = false;
        
        for (var i = 0; i < 81; ++i) {
            if (-sim.cols()/2 < x && x <= sim.cols()/2 && -sim.rows()/2 < y && y <= sim.rows()/2) {
                var rowVar = (sim.iteration() % 2 == 0) ? x : y;
                var colVar = (sim.iteration() % 2 == 0) ? y : x;
                var row = Math.floor(rowVar + sim.rows() / 2);
                var col = Math.floor(colVar + sim.cols() / 2);
                
                if (sim.iteration() % 4 == 1 || sim.iteration() % 4 == 2) {
                    col = sim.cols() - col - 1;
                }
                if (sim.iteration() % 4 == 2 || sim.iteration() % 4 == 3) {
                    row = sim.rows() - row - 1;
                }
                
                matrix[row][col] = on ? colorOn : colorOff;
            }
            if (x == y || (x < 0 && x == -y) || (x > 0 && x == 1-y)) {
                swap = dx;
                dx = -dy;
                dy = swap;
                if (dx == 1 && dy == 0) {
                    on = !on;
                }
            }
            x += dx;
            y += dy;
        }
        
        return matrix;
    };

    sim.renderer(trueSpiral).start();
};
