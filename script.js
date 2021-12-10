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
let keys=[]

let wall = new Image()
wall.src = 'images/zed.png'

function generateBoard() {
for (let y= 0; y <board.length; y++){
    for (let x = 0; x <board[y].length; x++){
        if(board[y][x]===1){
            ctx.drawImage(wall, x*blockSize, y*blockSize, blockSize, blockSize)
        }
    }
}}

//position of the player
let player = {
    x: 8,
    y: 1
}

//image of the player
let hero = new Image
hero.src = 'images/pernicek_dolu.png'


function movement(){
    //arrow right
    if(keys['ArrowRight']){
        hero.src='images/pernicek_doprava.png'
        player.x++
        
    }

    //arrow left
    if(keys['ArrowLeft']){
        hero.src="images/pernicek_doleva.png"
        player.x--
        
    }

    //arrow up
    if(keys['ArrowUp']){
        hero.src= 'images/pernicek_nahoru.png'
        player.y--
        
    }

    //arrow down
    if(keys['ArrowDown']){
        hero.src="images/pernicek_dolu.png"
        player.y++
        
    }
}
function draw(){
    ctx.clearRect(player.x * blockSize, player.y * blockSize, blockSize, blockSize)
    generateBoard()
    movement()
    ctx.drawImage(hero, player.x * blockSize, player.y*blockSize, blockSize, blockSize)
}

window.addEventListener('load', draw )
document.body.addEventListener("keydown", function(e) {
    keys[e.code] = true
    draw()
})

document.body.addEventListener("keyup", function(e) {
    keys[e.code] = false 
    draw()
})

