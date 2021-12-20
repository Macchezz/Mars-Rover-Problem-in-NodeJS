let commands_array = []; 

async function post(data) {
    return axios.post(
        "http://localhost:3000",
        data,
        {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }
    ).then((response) => response.data)
}

document.getElementById('create').addEventListener('click', function(){
    let x = document.getElementById('x-coord').value;
    let y = document.getElementById('y-coord').value;
    let cells = document.getElementById('cells').value;
    let direction = document.getElementById('direction').value;
    init(x, y, cells, direction);
});
document.getElementById('forward').addEventListener('click', function(){
    add_command('F');
});
document.getElementById('backward').addEventListener('click', function(){
    add_command('B');
});
document.getElementById('right').addEventListener('click', function(){
    add_command('R');
});
document.getElementById('left').addEventListener('click', function(){
    add_command('L');
});
document.getElementById('clean').addEventListener('click', function(){
    clean();
});
document.getElementById('send').addEventListener('click', function(){
    send();
});

function createTable(surface, x, y, direction) {
    document.getElementById('content').innerHTML = "";
    let table = document.createElement('table');
    table.className = "table border mx-auto";
    let tbody = document.createElement('tbody');
    surface.forEach(function (row, index_x) {
        let tr = document.createElement('tr');
        row.forEach(function (item, index_y) {
            let td = document.createElement('td');
            if (item === 1) {
                item = "●";
            }  else if (item === 0) {
                item = "□";
            }
            td.innerHTML = item;
            td.id = index_x + ', ' + index_y;
            tr.append(td);
        });
        tbody.append(tr);
    });
    table.append(tbody);
    document.getElementById('content').append(table);
    let cell = document.getElementById(x + ', ' + y);
    if(direction === 'N'){
        cell.innerHTML = '▲';
    } else if(direction === 'E') {
        cell.innerHTML = '▶';
    } else if(direction === 'S') {
        cell.innerHTML = '▼';
    } else if(direction === 'W') {
        cell.innerHTML = '◀';
    } 
    document.getElementById('message').innerHTML = '';
}

function setRover(x, y, direction) {

}

function showCommands() {
    document.getElementById('commands').innerHTML = "";
    let commands_translation = {'F': 'Forward', 'B': 'Backward', 'L': 'Turn left', 'R': 'Turn right'}
    commands_array.forEach(function (command, item) {
        if(item !== 0) {
            document.getElementById('commands').innerHTML += ', ' + commands_translation[command];
        } else {
            document.getElementById('commands').innerHTML += commands_translation[command];
        }
    }) ;
}

function init(x, y, cells, direction) {
    let data = {'action': 'init', 'x': x - 1, 'y': y - 1, 'cells': cells, 'direction': direction};
    post(data)
        .then(resp => {
            if (resp.surface !== undefined) {
                console.log(resp);
                createTable(resp.surface, resp.x, resp.y, resp.direction);
                document.getElementById('commandButtons').style.display = "";
            } else {
                document.getElementById('message').innerHTML = '<h2>' + resp + '</h2>';
            }
        });
}

function add_command(command) {
    commands_array.push(command);
    showCommands();
}

function clean() {
    commands_array = [];
    showCommands();
}

function send() {
    if(commands_array.length !== 0){
        let data = {'action': 'queue', 'commands': commands_array};
        post(data)
            .then(resp => {
                createTable(resp.surface, resp.x, resp.y, resp.direction);
                document.getElementById('message').innerHTML = '<h2>' + resp.message + '</h2>';
                clean();
            });
    }
}

