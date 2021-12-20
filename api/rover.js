class Rover{
    constructor(x, y, direction) {
        this._x = x; //x position of the rover
        this._y = y; //y position of the rover
        this._direction = direction; //rover direction
        this.addends_array = [[-1, 0], [1, 0], [0, -1], [0, 1]]; //depending on rover position and given command, this is the array of the addends of the x and y current cell
        //to make a move
        this.direction_array = ['N', 'E', 'S', 'W']; //array of the possible rover directions
    }

    get x () {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get direction () {
        return this._direction;
    }

    set x (x) {
        this._x = x;
    }

    set y(y) {
        this._y = y;
    }

    set direction (direction) {
        this._direction = direction;
    }


    move (towards, surface) { //function that moves the rover, inputs: surface and towards(F or B)
        try {
            let cells = surface.length;
            let movement = -1;
            //dependig on the direction and the towards, the index of the addends array needed is given to movement variable
            if((this.direction === "N" && towards === "F") || (this.direction === "S" && towards === "B")) {
                movement = 0;
            } else if((this.direction === "N" && towards === "B") || (this.direction === "S" && towards === "F")) {
                movement = 1;
            } else if((this.direction === "W" && towards === "F") || (this.direction === "E" && towards === "B")) {
                movement = 2;
            } else if((this.direction === "E" && towards === "F") || (this.direction === "W" && towards === "B")) {
                movement = 3;
            }
            //if movement is not -1, x_destination and y_destination will be given the coordinates of the destination on the surface
            //if those destinations are out of the surface, ther are wrapped on the other edge of the surface (planets are spheres)
            //if there's no abstacle on the destination, the new coordinates of x and y of the rover are assigned, the 0 is returned
            //otherwise, 1 is returned
            if(movement !== -1) {
                let x_destination = parseInt(this.x) + parseInt(this.addends_array[movement][0]);
                let y_destination = parseInt(this.y) + parseInt(this.addends_array[movement][1]);
                if(x_destination < 0) {
                    x_destination = parseInt(cells) - parseInt(1);
                } else if(x_destination > cells - 1) {
                    x_destination = 0;
                } else if(y_destination < 0) {
                    y_destination = parseInt(cells) - parseInt(1);
                } else if(y_destination > cells - 1) {
                    y_destination = 0;
                }
                if(surface[x_destination][y_destination] !== 1) {
                    this.x = x_destination;
                    this.y = y_destination;
                    return 0;
                } else {
                    return 1;
                }   
            }
        } catch (error) {
            console.log(error);
            return error;
        }  
    }

    turn (turn) { //function that turns the rover to the passed direction
        try {
            //-1 is assigned if the rover turns left, otherwise 1 is assigned
            let addend = turn === 'L' ? -1 : 1;
            //the addend find is added to the index of the directions_array, to find the new direction
            let index = parseInt(this.direction_array.indexOf(this.direction)) + parseInt(addend);
            //if the new index is out of the array, it is normalized
            index = index === -1 ? 3 : index;
            index = index === 4 ? 0 : index;
            //the new direction is assigned
            this.direction = this.direction_array[index];
        } catch (error) {
            console.log(error);
        }
        
    } 

    queue (commands, surface) {// function that queues the commands passed through the array
        try {
            //for each command, the proper method (turn or move) is called
            //if 1 is returned, the rover has run into an obstacle
            //if i have no 1s returned, the rover has found no obstacles
            //the proper message is returned
            for(let i in commands) {
                if(commands[i] === 'L' || commands[i] === 'R' ? this.turn(commands[i]) : this.move(commands[i], surface) === 1) {
                    return "Ouch! I ran into an obstacle";
                }
            }
            return "I'm arrived";
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Rover;