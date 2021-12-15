let canvas = document.querySelector("#canvas")
let width = 600
let height = 600

canvas.width = width
canvas.height = height

let ctx = canvas.getContext('2d')
let blockSize = 30

let board=[
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
let keys = []
let items = []

//image of the walls and obstacles
let wall = new Image()
wall.src = 'images/zed.png'

//image of the player
let hero = new Image
hero.src = 'images/pernicek_dolu.png'

//images of the collectible objects
let darek2 = new Image()
darek2.src = "images/darek2.png"

let darek3 = new Image()
darek3.src = "images/darek3.png"

let hulka = new Image()
hulka.src = "images/hulka.png"

let hvezda = new Image()
hvezda.src = "images/hvezda.png"

let kapr = new Image()
kapr.src = "images/kapr.png"

let ponozky = new Image()
ponozky.src = "images/ponozky.png"

let rukavice = new Image()
rukavice.src  = 'images/rukavice.png'

let game = {
    scoreElement: document.getElementById("score"),
    score: 0
}

function generateBoard() {
for (let y= 0; y <board.length; y++){
    for (let x = 0; x <board[y].length; x++){
        if(board[y][x]===1){
            ctx.drawImage(wall, x*blockSize, y*blockSize, blockSize, blockSize)
        }
    }
}
for (let i = 0; i < items.length; i++) {
    ctx.drawImage(
    items[i].imageObject,
    items[i].x * blockSize,
    items[i].y * blockSize,
    blockSize,
    blockSize
    )
}
}

function createItems() {
    items.push({
        x: 1,
        y: 1,
        imageObject: darek2
    })

    items.push({
        x: 1,
        y: 15,
        imageObject: darek3
    })

    items.push({
        x: 14,
        y: 12,
        imageObject: hulka
    })

    items.push({
        x: 15,
        y: 18,
        imageObject: hvezda
    })

    items.push({
        x: 5,
        y: 11,
        imageObject: kapr
    })

    items.push({
        x: 15,
        y: 1,
        imageObject: ponozky
    })

    items.push({
        x: 9,
        y: 8,
        imageObject: rukavice
    })
}

function startGame () {
    createItems()
    draw()
}

//position of the player
let player = {
    x: 8,
    y: 1
}

function canMove(x,y){
    return (y >= 0 && y < board.length && x >= 0 && x < board[y].length && board[y][x] != 1)
}

function movement(){
    //arrow right
    if(keys['ArrowRight'] && canMove(player.x +1, player.y)){
        hero.src='images/pernicek_doprava.png'
        player.x++
        
    }

    //arrow left
    if(keys['ArrowLeft']&& canMove(player.x -1, player.y)){
        hero.src="images/pernicek_doleva.png"
        player.x--
        
    }

    //arrow up
    if(keys['ArrowUp']&& canMove(player.x, player.y -1)){
        hero.src= 'images/pernicek_nahoru.png'
        player.y--
        
    }

    //arrow down
    if(keys['ArrowDown']&& canMove(player.x, player.y +1)){
        hero.src="images/pernicek_dolu.png"
        player.y++
        
    }
}

function increaseScore() {
    game.score++
    game.scoreElement.textContent = `${game.score}/7`
}
function draw(){
    ctx.clearRect(player.x * blockSize, player.y * blockSize, blockSize, blockSize)
    generateBoard()
    movement()
    collect()
    ctx.drawImage(hero, player.x * blockSize, player.y*blockSize, blockSize, blockSize)
}

function collect() {
    for (let i = 0; i < items.length; i++) {
        console.log(player.x + " " + items[i].x);
        if (player.x == items[i].x && player.y == items[i].y) {
        items.splice(i, 1)
        increaseScore()
        }
    }
}


window.addEventListener('load', startGame )
document.body.addEventListener("keydown", function(e) {
    keys[e.code] = true
    draw()
})

document.body.addEventListener("keyup", function(e) {
    keys[e.code] = false 
    draw()
})

