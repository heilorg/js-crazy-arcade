const BLOCK_SIZE = 50;
const SUB_BLOCK_SIZE = 14;
const COLOR_DATA = {
    BOARD: "#73cd1e",
    PLAYER: [
        "#3273FF",
        "#FF3838"
    ],
    BLOCK: [
        [
            "#ff4523",
            "#bb2403"
        ],
        [
            "#ff8515",
            "#bd5b00"
        ],
        [
            "#646362",
            "#4d4d4d"
        ],
        [
            "#258a00",
            "#175800"
        ],
    ],
    BUBBLE: "#38FCFF",
    ITEM: "#F5F77F"
}

class App{
    constructor(){
        this.DOM = {};
        this.DOM.canvas = document.getElementById('canvas');
        this.DOM.startBtn = document.querySelector("#startBtn");
        this.DOM.time = document.querySelector("#time");
        this.ctx = canvas.getContext('2d');

        this.game = new Game(this);
    }

    init(){
        this.DOM.startBtn.addEventListener('click', () => {
            if(!this.game.started){
                this.game.start();
            }
        });

        window.addEventListener('keydown', (e) => {
            if(this.game.started){
                this.game.keyEvent(e.keyCode, true);
                this.drawBoard();
            }
        });
        window.addEventListener('keyup', (e) => {
            if(this.game.started){
                this.game.keyEvent(e.keyCode, false);
                this.drawBoard();
            }
        });
    }
    
    drawBoard(){
        if(!this.game.started){
            return;
        }
        this.ctx.fillStyle = COLOR_DATA["BOARD"];
        this.ctx.fillRect(0, 0, 750, 650);

        this.game.players.forEach((player, idx) => {
            if(player.live){
                this.ctx.fillStyle = COLOR_DATA["PLAYER"][idx];
                this.ctx.fillRect(player.x, player.y, player.width, player.height);
            }
        });

        for(let i = 0; i < 15; i++)
            for(let j = 0; j < 13; j++)
                if(this.game.map[i][j] != 0)
                    if(this.game.map[i][j] == 1 && (i + j) % 2 == 0){
                        this.drawBlock({x : i, y : j, blockCode : 0});
                    }else if(this.game.map[i][j] == 1 && (i + j) % 2 == 1){
                        this.drawBlock({x : i, y : j, blockCode : 1});
                    }else{
                        this.drawBlock({x : i, y : j, blockCode : this.game.map[i][j]});
                    }

        this.game.bubbles.forEach((bubble) => {
            this.ctx.beginPath();
            this.ctx.fillStyle = COLOR_DATA.BUBBLE;
            this.ctx.arc(bubble.x * BLOCK_SIZE + BLOCK_SIZE / 2, bubble.y * BLOCK_SIZE + BLOCK_SIZE / 2, 20, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.closePath();
        })

        this.game.fieldItems.forEach((item) => {
            this.ctx.beginPath();
            this.ctx.fillStyle = COLOR_DATA.ITEM;
            this.ctx.arc(item.x * BLOCK_SIZE + BLOCK_SIZE / 2, item.y * BLOCK_SIZE + BLOCK_SIZE / 2, 10, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.closePath();
        });
    }

    drawBombTrace(bombTraces){
        bombTraces.forEach((bombTrace) => {
            bombTrace.forEach((position) => {
                this.ctx.fillStyle = COLOR_DATA["BUBBLE"];
                this.ctx.fillRect(position.x * BLOCK_SIZE, position.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            });
        });
    }


    drawBlock({x, y, blockCode}){
        this.ctx.fillStyle = COLOR_DATA["BLOCK"][blockCode][0];
        this.ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

        this.ctx.fillStyle = COLOR_DATA["BLOCK"][blockCode][1];
        this.ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE + (BLOCK_SIZE - SUB_BLOCK_SIZE), BLOCK_SIZE, SUB_BLOCK_SIZE);
    }

    drawTime(second){
        this.DOM.time.innerText = Math.floor(second / 60) + ":" + ((second % 60) < 10 ? "0" + (second % 60) : (second % 60) );
    }
}


window.onload = () => {
    let app = new App();
    app.init();
}

// 할 일 정리
// 아이템
// 물풍선 가두기