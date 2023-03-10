window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 720;

    ctx.fillStyle = 'white';
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
    ctx.font = '40px Bangers';
    ctx.textAlign = 'center';

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
            this.image = document.getElementById('bull');
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
        restart(){
            this.collisionX = this.game.width * 0.5;
            this.collisionY = this.game.height * 0.5;
            this.spriteX = this.collisionX - this.width * 0.5;
            this.spriteY = this.collisionY - this.height * 0.5 - 100;
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
            this.frameY = Math.floor(Math.random() * 3);
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
        update() {
            // add animation here later
        };
    }
    class Egg {
        constructor(game){
            this.game = game;
            this.collisionRadius = 40;
            this.margin = this.collisionRadius * 2
            this.collisionX = this.margin + (Math.random() * (this.game.width - this.margin * 2));
            this.collisionY = this.margin + this.game.topMargin + (Math.random() * (this.game.height - this.margin * 2 - this.game.topMargin));
            this.image = document.getElementById('egg');
            this.spriteWidth = 110;
            this.spriteHeight = 135;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.spriteX;
            this.spriteY;
            this.hatchTimer = 0;
            this.hatchIntervall = 10000;
            this.markedForDeletion = false;
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
                const displayTimer = (this.hatchTimer / 1000).toFixed(0);
                context.fillText(displayTimer, this.collisionX, this.collisionY - this.collisionRadius * 2.5);
            }
        };
        update(deltaTime){
            this.spriteX = this.collisionX - this.width * 0.5;
            this.spriteY = this.collisionY - this.height * 0.5 -20;
            // collision handling
            let collisionObjects = [this.game.player, ...this.game.obstacles, ...this.game.enemies];
            collisionObjects.forEach(object => {
                let [collision, distance, sumOfRadii, dx, dy] = this.game.checkCollision(this, object);
                if (collision) {
                    let unit_x = dx / distance;
                    let unit_y = dy / distance;
                    this.collisionX = object.collisionX + (sumOfRadii + 1) * unit_x;
                    this.collisionY = object.collisionY + (sumOfRadii + 1) * unit_y;                    
                }
            })
            //hatching handling
            if (this.hatchTimer > this.hatchIntervall || this.collisionY < this.game.topMargin) {
                this.game.hatchlings.push(new Larva(this.game, this.collisionX, this.collisionY));
                this.markedForDeletion = true;
                this.game.removeGameObjects();
            } else {
                this.hatchTimer += deltaTime;
            }
        };
    }
    class Enemy {
        constructor(game) {
            this.game = game;
            this.collisionRadius = 30;
            this.speedX = Math.random() * 3 + 0.5;
            this.image = document.getElementById('toads');
            this.spriteHeight = 260;
            this.spriteWidth = 140;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.collisionX = this.game.width + this.width + Math.random() * this.game.width * 0.5;
            this.collisionY = this.game.topMargin + (Math.random() * (this.game.height - this.game.topMargin));
            this.spriteX;
            this.spriteY;
            this.frameX = 0;
            this.frameY = Math.floor(Math.random() * 4)
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
        update(){
            this.spriteX = this.collisionX - this.width * 0.5;
            this.spriteY = this.collisionY - this.height * 0.5 - 100;
            this.collisionX -= this.speedX;
            if (this.spriteX + this.width < 0 && !this.game.gameOver) {
                this.collisionX = this.game.width + this.width + Math.random() * this.game.width * 0.5;
                this.collisionY = this.game.topMargin + (Math.random() * (this.game.height - this.game.topMargin));
                this.frameY = Math.floor(Math.random() * 4)
            }
            let collisionObjects = [this.game.player, ...this.game.obstacles];
            collisionObjects.forEach(object => {
                let [collision, distance, sumOfRadii, dx, dy] = this.game.checkCollision(this, object);
                if (collision) {
                    let unit_x = dx / distance;
                    let unit_y = dy / distance;
                    this.collisionX = object.collisionX + (sumOfRadii + 1) * unit_x;
                    this.collisionY = object.collisionY + (sumOfRadii + 1) * unit_y;                    
                }
            })
        };
    }
    class Larva {
        constructor(game, x, y){
            this.game = game;
            this.collisionX  = x;
            this.collisionY = y;
            this.collisionRadius = 30;
            this.image = document.getElementById("larva");
            this.spriteHeight = 150;
            this.spriteWidth = 150;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.spriteX;
            this.spriteY;
            this.speedY = 1 + Math.random();
            this.frameX = Math.floor(Math.random() * 1);
            this.frameY = Math.floor(Math.random() * 2)
        }
        draw(context){
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
        }
        update(){
            this.collisionY -= this.speedY;
            this.spriteX = this.collisionX - this.width * 0.5;
            this.spriteY = this.collisionY - this.height * 0.5 - 50;
            //check if moved to safety
            if (this.collisionY < this.game.topMargin) {
                this.markedForDeletion = true;
                this.game.removeGameObjects();
                if (!this.game.gameOver) {
                    this.game.score++;
                } 
                for (let index = 0; index < 3; index++) {
                    this.game.particles.push(new Firefly(this.game, this.collisionX, this.collisionY, 'yellow'));
                }
            }
            // collision handling (objects)
            let collisionObjects = [this.game.player, ...this.game.obstacles, ...this.game.eggs];
            collisionObjects.forEach(object => {
                let [collision, distance, sumOfRadii, dx, dy] = this.game.checkCollision(this, object);
                if (collision) {
                    let unit_x = dx / distance;
                    let unit_y = dy / distance;
                    this.collisionX = object.collisionX + (sumOfRadii + 1) * unit_x;
                    this.collisionY = object.collisionY + (sumOfRadii + 1) * unit_y;                    
                }
            })
            // collision handling (enemies)
            this.game.enemies.forEach(enemy =>{
                if (this.game.checkCollision(this, enemy)[0] && !this.game.gameOver) {
                    this.markedForDeletion = true;
                    this.game.removeGameObjects();
                    this.game.lostHatchlings++;
                    for (let index = 0; index < 5; index++) {
                        this.game.particles.push(new Spark(this.game, this.collisionX, this.collisionY, 'red'));
                    }
                }
            });
        }
    }
    class Particle {
        constructor(game, x, y, color){
            this.game = game;
            this.collisionX = x;
            this.collisionY = y;
            this.color = color;
            this.radius = Math.floor(Math.random()) * 10 + 5;
            this.speedX = Math.random() * 6 - 3;
            this.speedY = Math.random() * 2 + 0.5;
            this.angle = 0;
            this.va = Math.random() * 0.1 + 0.01;
            this.markedForDeletion = false;
        }
        draw(context){
            context.save();
            context.fillStyle = this.color;
            context.beginPath();
            context.arc(this.collisionX, this.collisionY, this.radius, 0, Math.PI * 2);
            context.fill();
            context.stroke();
            context.restore();
        }
    }
    class Firefly extends Particle {
        update(){
            this.angle += this.va;
            this.collisionX += Math.cos(this.angle) * this.speedX;
            this.collisionY -= this.speedY;
            if (this.collisionY < 0 - this.radius) {
                this.markedForDeletion = true;
                this.game.removeGameObjects();
            }
        }
    }
    class Spark extends Particle {
        update(){
            this.angle += this.va * 0.5;
            this.collisionX -= Math.cos(this.angle) * this.speedX;
            this.collisionY -= Math.sin(this.angle) * this.speedY;
            if (this.radius > 0.1) {
                this.radius -= 0.05;
            }
            if (this.radius < 0.2) {
                this.markedForDeletion = true;
                this.game.removeGameObjects();
            }
        }
    }
    class Game {
        constructor(canvas){
            this.canvas = canvas;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.topMargin = 260;
            this.bottomMargin = 50;
            this.pathMargin = 60;
            this.debug = false;
            this.fps = 70;
            this.timer = 0;
            this.score = 0;
            this.lostHatchlings = 0;
            this.interval = 1000/this.fps;
            this.gameObjects = [];
            this.particles = [];
            this.player = new Player(this);
            this.noOfObstacles = 10;
            this.obstacles = [];
            this.eggTimer = 0;
            this.eggInterval = 1000;
            this.maxEggs = 5;
            this.eggs = [];
            this.hatchlings = [];
            this.enemies = [];
            this.maxEnemies = 5;
            this.winningScore = 20;
            this.gameOver = false;
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
                };
                if (e.key == 'r') {
                    this.restart();
                }
            })
        };
        render(context, deltaTime){
            if (this.timer > this.interval) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                this.gameObjects = [...this.eggs, ...this.obstacles, ...this.enemies, this.player, ...this.hatchlings, ...this.particles];
                // sort game objects by vertical position
                this.gameObjects.sort((a, b) => {
                    return a.collisionY - b.collisionY;
                });
                this.gameObjects.forEach(object => {
                    object.draw(context);
                    object.update(deltaTime);
                });
                this.timer = 0;   
            }
            this.timer += deltaTime;

            // add some eggs periodically??
            if (this.eggTimer > this.eggInterval && this.eggs.length < this.maxEggs && !this.gameOver) {
                this.addEgg();
                this.eggTimer = 0;
            }
            else {
                this.eggTimer += deltaTime;
            }
            // draw status text for score
            context.save();
            context.textAlign = 'left';
            context.fillText('Score' + ' ' + this.score, 25, 50);
            if (this.debug) {
                context.fillText('Lost Hatchlings' + ' ' + this.lostHatchlings, 25, 100);
            }
            context.restore();
            // win / lose message
            if (this.score >= this.winningScore) {
                this.gameOver = true;
                context.save();
                context.fillStyle = 'rgba(0,0,0,0.5)';
                context.fillRect(0, 0, this.width, this.height);
                context.fillStyle = 'white';
                context.textAlign = 'center';
                context.shadowOffsetX = 4;
                context.shadowOffsetY = 4;
                context.shadowColor = 'black';
                let message1;
                let message2;
                if (this.lostHatchlings <= 5) {
                    //winning
                    message1 = 'You WIN!'
                    message2 = 'Great leader of your kind...'
                } else {
                    //losing
                    message1 = 'Survivor...'
                    message2 = 'You protected your kind...some of them at least...'
                }
                context.font = '130px Bangers';
                context.fillText(message1, this.width * 0.5, this.height * 0.5);
                context.font = '40px Bangers';
                context.fillText(message2, this.width * 0.5, this.height * 0.5 + 100);
                context.fillText('Final Score' + ' ' + this.score, this.width * 0.5, this.height * 0.5 + 150);
                context.fillText('Press R to play again', this.width * 0.5, this.height * 0.5 + 200);
                context.restore();
            }

        };
        checkCollision(a, b){
            const dx = a.collisionX - b.collisionX;
            const dy = a.collisionY - b.collisionY;
            const distance = Math.hypot(dy, dx);
            const sumOfRadii = a.collisionRadius + b.collisionRadius;
            return [(distance < sumOfRadii), distance, sumOfRadii, dx, dy];
        };
        addEgg(){
            this.eggs.push(new Egg(this));
        };
        addEnemy(){
            this.enemies.push(new Enemy(this));
        };
        removeGameObjects(){
            this.eggs = this.eggs.filter(object => !object.markedForDeletion);
            this.hatchlings = this.hatchlings.filter(object => !object.markedForDeletion);
            this.particles = this.particles.filter(object => !object.markedForDeletion);
        };
        restart() {
            this.player.restart();
            this.eggs = [];
            this.hatchlings = [];
            this.enemies = [];
            this.obstacles = [];
            this.mouse = {
                x: this.width * 0.5,
                y: this.height * 0.5,
                pressed: false
            }
            this.score = 0;
            this.lostHatchlings = 0;
            this.gameOver = false;
            this.init();
        };
        init(){
            // init the enemies
            for (let index = 0; index < this.maxEnemies; index++) {
                this.addEnemy();
                
            }
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