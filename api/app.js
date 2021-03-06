const express = require('express') //express is used
const bodyParser = require('body-parser'); //body parser is used to read the post parameters
const Rover = require('./rover'); //the rover class is set
const Planet = require('./planet'); //the planet class is set
const cors = require('cors'); //cors is used
const app = express();
const port = 3000;
app.use(cors()); 
let rover = 0;
let planet = 0;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', (req, res) => {
    const action = req.body.action; //the passed action is read

    //if the action is init, i pass the parameters to the classes to initialize the rover and the planet
    //otherwise, the commands array is passed to queue function
    //the current parameters are sent back to the client
    if(action === "init") {
        let x = req.body.x;
        let y = req.body.y;
        let cells = req.body.cells;
        let direction = req.body.direction;
        planet = new Planet(cells);
        rover = new Rover(x, y, direction);
        let init_result = planet.init(x, y);
        init_result === 0 ? res.send({'surface': planet.surface, 'x': rover.x, 'y': rover.y, 'direction': rover.direction}) : res.send(init_result);
    } else if(action === 'queue') {
        if (rover !== 0 && planet !== 0) {
            let commands = req.body.commands;
            let message = rover.queue(commands, planet.surface);
            res.send({'surface': planet.surface, 'x': rover.x, 'y': rover.y, 'message': message, 'direction': rover.direction});
        }
    }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));