# js-animation-game
![Preview Image](./src/preview.jpg)

This repository containes the code for a nice and fun browser game, entirely written in javascript.
It will have nice sprites, animations and even simple physics.

## How to run this game
Just try it [online](https://erikuckert.github.io/js-animation-game/) or clone to your local drive and open the [index.html](index.html) with your webbrowser.

## State of the game
<span style="color:#FF5733">**BETA**</span>

This game is all about the blue bull and his quest to save it's hatchlings. The player must push the eggs into the safe forrest because the open fields are roamed by some hungry green watcher frogs. When larvas are hatching from the eggs, they will getting eaten soon by them.
The player must prevent that by carefuly pushing the eggs (and fastly pushing the larvas) to the save forrest.

The next state will be the **RELEASE 1.0** state. Here you can expect extended gameplay and a lot more animations.

**Expect new features**
- Larvas will hatch from eggs!
- Your goal is to protect these larvas - why? Because green watcher enemies likes larvas, yummmi! :meat_on_bone:

You can expect this happen in march 2023. Stay tuned!

## Changelog

**Updates 06.03.2023 BETA RELEASE**

![mushroom Image](./src/orange_mushroom.png) 

- Beta release is here!
- You can win (& lose!) the game and restart it
- All the gameplay in implemented:
    - You can push eggs, larvas end enemies
    - Enemies will try to eat your larvas on contact
    - You will win the game after saving certain larvas and lose it when you let to much of them getting eaten by the enemies
- More green watcher enemies are coming to the forrest and thus more variations of them should be visible to the player!

**Updates 05.03.2023**
- Particle effects are added, when a larva is eaten by the green watcher enemies

**Updates 04.03.2023**
- Larvas are now get physics and react to obstacles (player can push them around like eggs)
- Green watcher enemies can (and will!) eat our precious larvas on contact
- A basic score board is available - when larvas reach the safe and cosy forrest, you get one point
- Particle effects are added - when a larva has successfuly reached the safe forrest, a swarm of fireflies is startled

**Updates 02.03.2023 ALPHA RELEASE**
- Enemies gets simple physics & react to obstacles: 
    - Pushing eggs around
    - find their way around obstacles
    - can be pushed by the player
- Welcome to the larvas!

![Larva Image](./src/larva_4.png) 

- They are now hatching from the eggs and try to find there way to the forrest.
- They ignore obstacles for now and directly move the upper region of the game map
- Two debug features for these larvas where added - a hatchtimer and their collision circles

**Updates 24.02.2023**
- Eggs have collision physics & can be pushed around by the player
- game objects like obstacles, player or eggs are drawn based on the vertical position, so that a 3D illusion is created
- The game has basic enemy creatures which fly through the forrest

**Updates 21.02.2023**
- Add a simple static sprite for the player character "blue bull" centered over the player hitbox circle
- Animated sprite for the player character for eight directions while moving
- Simple debug mode - by pressing "D" in keyboard the player can hide / show the hitboxes
- Horizontal & vertical boundaries 

**Updates 20.02.2023**
- Fantasy themed background (magic forrest sprite)
- a player placeholder circle spawning in the middle of the map
- random obstacles (also placeholder circles)
- player can move with the mouse by clicking on the map or holding the mouse button down
- a simple line is showing the direction the player is moving
- obstacle placing follows simple rules to always match the game area and let enough space for the player to move around them
- obstacles have random sprites from the sprite sheet and thus more variance
- basic collision detection between player and obstacles and display a collision to the js console
- simulate basic physics by making obstacles solid and let player move around them automaticaly instead of crossing them


## Credits
This game is based on the awesome work of [Frantisek Dvorak](https://www.youtube.com/@Frankslaboratory/featured).
It will initially use also his sprites but will eventually evolve with some other sprites or different mechanics.