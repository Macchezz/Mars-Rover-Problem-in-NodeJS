# Mars-Rover-Problem-in-NodeJS
My solution for Mars Rover problem in NodeJS
This is my solution for the Mars Rover problem. 
Text: You’re part of the team that explores Mars by sending remotely controlled vehicles to the surface of the planet. Develop an API that translates the commands sent from earth to instructions that are understood by the rover.

Requirements

                • You are given the initial starting point (x,y) of a rover and the direction (N,S,E,W) it is facing.
                • The rover receives a character array of commands.
                • Implement commands that move the rover forward/backward (f,b).
                • Implement commands that turn the rover left/right (l,r).
                • Implement wrapping from one edge of the grid to another. (planets are spheres after all)
                • Implement obstacle detection before each move to a new square. If a given sequence of commands encounters an obstacle, the rover moves up to the last possible point, aborts the sequence and reports the obstacle.

The api is written in Javascript with Nodejs framework, you can find it in the api folder.
You can test the api with the index.html page, that draws a matrix and sends the data to the api.
In order to do that, run app.js locally on your pc and open index.html with your browser.
