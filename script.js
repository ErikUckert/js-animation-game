window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 720;

    ctx.fillStyle = 'white';
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'white'

    class Player {
        constructor(game){
            this.game = game;
            this.collisionX = this.game.width * 0.5;
            this.collisionY = this.game.height * 0.5;
            this.collisionRadius = 30;
            this.speedX = 0;
            this.speedY = 0;
            this.dX = 0;
            this.dY = 0;
            this.speedModifier = 5;
            this.image = document.getElementById("bull");
            this.spriteWidth = 255;
            this.spriteHeight = 256;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.spriteX;
            this.spriteY;
            this.frameX = 0;
            this.frameY = 0;
            this.angle = 0;
        };
        draw(context){
            // code for drawing the player sprite
            context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.spriteX, this.spriteY, this.width, this.height);
            // code for drawing the circle
            if (this.game.debug == true) {
                context.beginPath();
                context.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
                context.save();
                context.globalAlpha = 0.5;
                context.fill();
                context.restore();
                context.stroke();   
            }
            // code for drawing the line of direction
            context.beginPath();
            context.moveTo(this.collisionX, this.collisionY);
            context.lineTo(this.game.mouse.x, this.game.mouse.y);
            context.stroke();
        };
        update(){
            // animation of the player sprite
            this.dX = this.game.mouse.x - this.collisionX;
            this.dY = this.game.mouse.y - this.collisionY;
            this.angle = Math.atan2(this.dY, this.dX);
            if (this.angle < -2.74 || this.angle > 2.74) {this.frameY = 6}
            else if (this.angle < -1.96) {this.frameY = 7}
            else if (this.angle < -1.17) {this.frameY = 0}
            else if (this.angle < -0.39) {this.frameY = 1}
            else if (this.angle < 0.39) {this.frameY = 2}
            else if (this.angle < 1.17) {this.frameY = 3}
            else if (this.angle < 1.96) {this.frameY = 4}
            else if (this.angle < 2.74) {this.frameY = 5}
            
            // updating the players position

            const distance = Math.hypot(this.dY, this.dX);
            // make sure player moves always at const speed
            if (distance > this.speedModifier){
                this.speedX = this.dX / distance || 0;
                this.speedY = this.dY / distance || 0;
            } else {
                this.speedX = 0;
                this.speedY = 0;
            }
            // update the new hitbox circle position
            this.collisionX += this.speedX * this.speedModifier;
            this.collisionY += this.speedY * this.speedModifier;
            // update the player sprite position
            this.spriteX = this.collisionX - this.width * 0.5;
            this.spriteY = this.collisionY - this.height * 0.5 - 100;
            // set horizontal boundaries for player movement
            if (this.collisionX < this.collisionRadius) {
                this.collisionX = this.collisionRadius;
            }
            else if (this.collisionX > this.game.width - this.collisionRadius) {
                this.collisionX = this.game.width - this.collisionRadius;
            }
            // set vertical boundaries for player movement
            if (this.collisionY < this.game.topMargin - this.collisionRadius) {
                this.collisionY = this.game.topMargin - this.collisionRadius;
            }
            else if (this.collisionY > this.game.height - this.collisionRadius) {
                this.collisionY = this.game.height - this.collisionRadius;
            }
            // check for collision with obstacles
            this.game.obstacles.forEach(obstacle => {
                let [collision, distance, sumOfRadii, dx, dy] = this.game.checkCollision(this, obstacle);
                if (collision) {
                    const unit_x = dx / distance;
                    const unit_y = dy / distance;
                    const pushBackValue = sumOfRadii + 1;
                    this.collisionX = obstacle.collisionX + pushBackValue * unit_x;
                    this.collisionY = obstacle.collisionY + pushBackValue * unit_y;
                }
                
            })
        };
    }

    class Obstacle {
        constructor(game){
            this.game = game;
            this.collisionX = Math.random() * this.game.width;
            this.collisionY = Math.random() * this.game.height;
            this.collisionRadius = 60;
            this.image = document.getElementById('obstacles');
            this.spriteWidth = 250;
            this.spriteHeight = 250;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.spriteX = this.collisionX - this.width * 0.5;
            this.spriteY = this.collisionY - this.height * 0.5 - 70;
            this.frameX = Math.floor(Math.random() * 4);
            this.frameY = Math.floor(Math.random() * 3)
        };
        draw(context){
            // drawing the obstacle sprite from the sprite sheet
            context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.spriteX, this.spriteY, this.width, this.height);
            // code for drawing the circle
            if (this.game.debug == true) {
                context.beginPath();
                context.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
                context.save();
                context.globalAlpha = 0.5;
                context.fill();
                context.restore();
                context.stroke();   
            }
        };
    }

    class Egg {
        constructor(game){
            this.game = game;
            this.collisionX = Math.random() * this.game.width;
            this.collisionY = Math.random() * this.game.height;
            this.collisionRadius = 40;
            this.image = document.getElementById('egg');
            this.spriteWidth = 110;
            this.spriteHeight = 135;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.spriteX = this.collisionX - this.width * 0.5;
            this.spriteY = this.collisionY - this.height * 0.5 -20;
        };
        draw(context){
            // drawing the obstacle sprite from the sprite sheet
            context.drawImage(this.image, this.spriteX, this.spriteY);
            // code for drawing the circle
            if (this.game.debug == true) {
                context.beginPath();
                context.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
                context.save();
                context.globalAlpha = 0.5;
                context.fill();
                context.restore();
                context.stroke();   
            }
        };
    }

    class Game {
        constructor(canvas){
            this.canvas = canvas;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.topMargin = 260;
            this.bottomMargin = 50;
            this.pathMargin = 60;
            this.debug = true;
            this.fps = 70;
            this.timer = 0;
            this.interval = 1000/this.fps;
            this.player = new Player(this);
            this.noOfObstacles = 10;
            this.obstacles = [];
            this.eggTimer = 0;
            this.eggInterval = 1000;
            this.maxEggs = 10;
            this.eggs = [];
            this.mouse = {
                x: this.width * 0.5,
                y: this.height * 0.5,
                pressed: false
            }

            // event listeners
            canvas.addEventListener('mousedown', (e) => {
                // using an arrow function -- (e) => {} -- here allows me to access
                // the properties of the
                // Game class because arrow functions remember their declarion postition
                // a normal function like -- function(e){} --
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
                this.mouse.pressed = true;
            })
            canvas.addEventListener('mouseup', (e) => {

                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
                this.mouse.pressed = false;
            })
            canvas.addEventListener('mousemove', (e) => {
                if (this.mouse.pressed){
                    this.mouse.x = e.offsetX;
                    this.mouse.y = e.offsetY;
                }
            })
            window.addEventListener('keydown', (e) => {
                if (e.key == 'd') {
                    this.debug = !this.debug;
                }
            })
        };
        render(context, deltaTime){
            if (this.timer > this.interval) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                this.player.draw(context);
                this.player.update();
                this.obstacles.forEach(obstacle => obstacle.draw(context));
                this.eggs.forEach(egg => egg.draw(context));
                this.timer = 0;   
            }
            this.timer += deltaTime;

            // add some eggs periodically´
            if (this.eggTimer > this.eggInterval && this.eggs.length < this.maxEggs) {
                this.addEgg();
                this.eggTimer = 0;
            }
            else {
                this.eggTimer += deltaTime;
            }
        }

        checkCollision(a, b){
            const dx = a.collisionX - b.collisionX;
            const dy = a.collisionY - b.collisionY;
            const distance = Math.hypot(dy, dx);
            const sumOfRadii = a.collisionRadius + b.collisionRadius;
            return [(distance < sumOfRadii), distance, sumOfRadii, dx, dy];
        }

        addEgg(){
            this.eggs.push(new Egg(this));
        }

        init(){
        // init the obstacles with a simple "brute force approach"
        let attempts = 0;
        while (this.obstacles.length < this.noOfObstacles && attempts < 500) {
            let testObstacle = new Obstacle(this);
            let overlap = false;
            this.obstacles.forEach(obstacle => {
                const dx = testObstacle.collisionX - obstacle.collisionX;
                const dy = testObstacle.collisionY - obstacle.collisionY;
                const distance = Math.hypot(dy, dx);
                const distanceBuffer = 150;
                const sumOfRadii = testObstacle.collisionRadius + obstacle.collisionRadius + distanceBuffer;
                if (distance < sumOfRadii) {
                    overlap = true;
                }
            });
            if (!overlap 
                && testObstacle.spriteX > 0 
                && testObstacle.spriteX < this.width - testObstacle.width
                && testObstacle.collisionY > this.topMargin + this.pathMargin
                && testObstacle.collisionY < this.height - this.bottomMargin - this.pathMargin) {
                this.obstacles.push(testObstacle);
            }
            attempts++;
        }
        };
    }

    const game = new Game(canvas);
    game.init();

    // animation loop
    let lastTime = 0;
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.render(ctx, deltaTime);
        window.requestAnimationFrame(animate);
    }

    animate(0);
})