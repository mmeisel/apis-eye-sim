var beeEye = function () {
    var matrix = sim.emptyMatrix();
    var n;
    
    for (var i = 0; i < sim.rows(); ++i) {
        for (var j = 0; j < sim.cols(); ++j) {
            var gradX = 1 - (Math.abs(sim.rows() / 2 - i) / (sim.rows() / 2));
            var gradY = 1 - (Math.abs(sim.cols() / 2 - j) / (sim.cols() / 2));
            
            if (sim.iteration() % 4 == 0) {
                matrix[i][j] = {
                    r: Math.round((i % 2 == j % 2) ? 255 : (100 + 100 * gradX)),
                    g: Math.round((i % 2 == j % 2) ? 255 : (200 * gradY)),
                    b: Math.round((i % 2 == j % 2) ? 255 : 0)
                };
            }
            else if (sim.iteration() % 4 == 1) {
                matrix[i][j] = {
                    r: Math.round((i % 2 == j % 2) ? 255 : (100 + 100 * gradY)),
                    g: Math.round((i % 2 == j % 2) ? 255 : (200 * gradX)),
                    b: Math.round((i % 2 == j % 2) ? 255 : 0)
                };
            }
            else if (sim.iteration() % 4 == 2) {
                matrix[i][j] = {
                    r: Math.round((i % 2 != j % 2) ? 255 : (100 + 100 * gradY)),
                    g: Math.round((i % 2 == j % 2) ? 255 : (200 * gradX)),
                    b: Math.round((i % 2 == j % 2) ? 255 : 0)
                };
            }
            else {
                matrix[i][j] = {
                    r: Math.round((i % 2 != j % 2) ? 255 : (100 + 100 * gradX)),
                    g: Math.round((i % 2 == j % 2) ? 255 : (200 * gradY)),
                    b: Math.round((i % 2 == j % 2) ? 255 : 0)
                };
            }
        }
    }
    
    return matrix;
};

var sim = apisEyeSim('#eye').frameDuration(500).fadeDuration(250).renderer(beeEye).start();
