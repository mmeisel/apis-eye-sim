window.onload = function () {
    var sim = apisEyeSim('#eye').frameDuration(50).fadeDuration(25);
    
    var trueSpiral = function () {
        var matrix = sim.emptyMatrix();
        var x = 0, y = 0, dx = 0, dy = -1, swap;
        var r = 255,
            g = 0,
            b = 0;
        var on = true;
        
        for (var i = 0; i < Math.pow(Math.max(sim.rows(), sim.cols()), 2); ++i) {
            if (-sim.cols()/2 < x && x <= sim.cols()/2 && -sim.rows()/2 < y && y <= sim.rows()/2) {
                matrix[Math.floor(y + sim.rows() / 2)][Math.floor(x + sim.cols() / 2)] = {
                    r: on ? (i < (sim.iteration() % 150) ? 255 : 0) : 0,
                    g: g,
                    b: b
                };
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
