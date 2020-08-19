class Bubble{
    constructor(x, y, bombLength, playerIdx, game){
        this.x = x;
        this.y = y;
        this.bombLength = bombLength;
        this.playerIdx = playerIdx;
        this.game = game;
        this.bombTrace = [];

        this.timer = setTimeout(() => {
            this.game.deleteBubble(this);
            this.bomb();
        }, 3000);

    }

    bomb(){
        clearTimeout(this.timer);
        this.game.bombBlock({x : this.x, y : this.y, self: true});
        this.bombTrace.push({x: this.x, y : this.y});
        for(let i = 1; i <= this.bombLength; i++){
            let movex = -1;
            let xx = this.x + movex * i;
            if(xx < 0)break;
            if(this.game.bombBlock({x: xx, y : this.y, self: false})){
                break;
            }
            this.bombTrace.push({x: xx, y : this.y});
        }
        for(let i = 1; i <= this.bombLength; i++){
            let movex = 1;
            let xx = this.x + movex * i;
            if(xx >= this.game.map.length)break;
            if(this.game.bombBlock({x: xx, y : this.y, self: false})){
                break;
            }
            this.bombTrace.push({x: xx, y : this.y});
        }
        for(let i = 1; i <= this.bombLength; i++){
            let movey = -1;
            let yy = this.y + movey * i;
            if(yy < 0)break;
            if(this.game.bombBlock({x: this.x, y : yy, self: false})){
                break;
            }
            this.bombTrace.push({x: this.x, y : yy});
        }
        for(let i = 1; i <= this.bombLength; i++){
            let movey = 1;
            let yy = this.y + movey * i;
            if(yy >= this.game.map[0].length)break;
            if(this.game.bombBlock({x: this.x, y : yy, self: false})){
                break;
            }
            this.bombTrace.push({x: this.x, y : yy});
        }
        
        this.bombAnimation();
    }

    bombAnimation(){
        this.game.bombTraces.push(this.bombTrace);
        setTimeout(() => {
            let btIdx = this.game.bombTraces.findIndex((arr) => arr == this.bombTrace);
            this.game.bombTraces.splice(btIdx, 1);
        }, 300);
    }
}