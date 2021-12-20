class Planet {
    constructor(cells) {
        this.cells = cells; //the surface is a matrix made of cells x cells
        this._surface = []; //declaration of the surface
    }
    
    /*
    *the cells could be: 
    *0 -> the terrain which the rover can pass through
    *1 -> the obstacle
    */
    init (x, y) {//surface initialization, randomly insterting terrain and obstacles, then the cell of the rover is set to 0, because it can't be an obstacle
        try {
            if(x < this.cells && x >= 0 && y < parseInt(this.cells) && y >= 0) {
                for(let i = 0; i < parseInt(this.cells); i++) {
                    this.surface[i] = [];
                    for(let j = 0; j < parseInt(this.cells); j++) {
                        this.surface[i][j] = Math.floor(Math.random() * 2);
                    }
                }
                this.surface[parseInt(x)][parseInt(y)] = 0;//this cell can't be an obstacle
                return 0;
            } else {
                return "The rover has to be placed on the planet";
            }
        } catch (error) {
            console.log(error);
        }
    };

    get surface () {
        return this._surface;
    }
}

module.exports = Planet;