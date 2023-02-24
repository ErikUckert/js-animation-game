# js-animation-game
![Preview Image](./src/preview.jpg)

This repository containes the code for a nice and fun browser game, entirely written in javascript.
It will have nice sprites, animations and even simple physics.

## State of the game
<span style="color:#FF5733">**PRE-ALPHA**</span>

Currently there is now playable version of the game.
You can open it and maybe move things around but there is no actual game right now.

The next state will be the **ALPHA** state. Here you can expect basic gameplay (limited to core principles and with lots of bugs) for the first time.
You can expect this happen in late february 2023. Stay tuned!

## Changelog

**Updates 24.02.2023**
- Eggs have collision physics & can be pushed around by the player
- game objects like obstacles, player or eggs are drawn based on the vertical position, so that a 3D illusion is created
- The game has basic enemy creates which fly through the forrest

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

## How to run this game
Just try it [online](https://erikuckert.github.io/js-animation-game/) or clone to your local drive and open the [index.html](index.html) with your webbrowser.

## Credits
This game is based on the awesome work of [Frantisek Dvorak](https://www.youtube.com/@Frankslaboratory/featured).
It will initially use also his sprites but will eventually evolve with some other sprites or different mechanics.