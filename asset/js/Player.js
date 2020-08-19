class Player{
    constructor(x, y, game){
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height =  40;
        this.maxBombCount = 1;
        this.bombLength = 1;
        this.position = this.getBlockPosition();
        this.direct ={ 
            Left: false,
            Right: false,
            Top: false,
            Bottom: false
        };
        this.live = true;

        this.bombDelay = true;
        this.speed = 2;

        this.game = game;
    }

    move({canvas, map}){
        for (const [key, value] of Object.entries(this.direct)) {
            let temp = {...this};
            if(value){
                this["move"+key](canvas);
            }
            let movedBlock = this.getBlockPosition();
            if(map[movedBlock.x][movedBlock.y] != 0 && map[movedBlock.x][movedBlock.y] != 3){
                this.x = temp.x;
                this.y = temp.y;
            }else{

            }

            this.game.fieldItems.forEach(item => {
                if(item.x == movedBlock.x && item.y == movedBlock.y){
                    this.getItem(item);
                } 
            });
        }
        
        this.position = this.getBlockPosition();
    }

    moveLeft({width, height}){
        this.x -= this.speed;
        if(this.x < 0)this.x = 0;
    }

    moveTop({width, height}){
        this.y -= this.speed;
        if(this.y < 0)this.y = 0;
    }

    moveRight({width, height}){
        this.x += this.speed;
        if(this.x + this.width > width)this.x = width - this.width;
    }

    moveBottom({width, height}){
        this.y += this.speed;
        if(this.y + this.height > height)this.y = height - this.height;
    }

    getBlockPosition(){
        let x = Math.floor((this.x + 15) / 50);
        let y = Math.floor((this.y + 20) / 50);

        return {x, y};
    }

    getItem(item){
        let idx = this.game.fieldItems.findIndex(i => i == item);
        this.game.fieldItems.splice(idx, 1);


        let rnd = Math.floor(Math.random() * 15);
        switch(rnd){
            case 0: 
            case 1: 
            case 2: 
            this.bombLength += 1;
            break;
            case 3: 
            case 4: 
            case 5: 
            this.maxBombCount += 1;
            break;
            case 6: 
            case 7: 
            case 8: 
            this.speed += 1;
            break;
            case 9: 
            this.bombLength *= 2;
            break;
            case 10: 
            this.maxBombCount *= 2;
            break;
            case 11: 
            this.speed *= 2;
            break;
        }
    }

    die(){
        this.live = false;
    }
}