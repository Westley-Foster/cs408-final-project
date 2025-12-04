# CS408 - Final Project

## Project Spec

To start, I think that my general theme for this project will be something like a choose-your-own-adventure styled game or story. It would have to be a short choose-your-own-adventure because if it were a fully fletched-out choose-your-own-adventure, it would take way too long for this project (at least with juggling other classes at the same time). I'm thinking about making a few webpages to let the user get just a glimpse into choose-your-own-adventure-style games. My first thoughts on it are introducing the user to the fantasy world for the index.html page and then use the other pages for the more in-depth content.

As to what the project is going to do, it'll be an interactive story that the user can (hopefully) enjoy. The user will be walked through a story and will also be able to interact with said story--with more than just a "next page" button. I'm hoping to implement some features like an inventory system for items that the user can and/or will pick up along their journey. I'm also thinking about making a small battle scene or two that the user will have to survive, then I would also implement a separate health pool for the user too. If their hp runs out, maybe I'll send them to the previous page with an alert or updated paragraph on the previous page saying that they lost and to try again. A good idea too would be to make it so that the user can discard a health potion to regain their life points again. Now that I'm thinking about it as I write this, to make the fights less linear and predictable, I could add in a random chance to hit function, possibly based off of user and monster stats. If I'm really adventerous, I could also implement multiple character classes to choose from (like a knight, mage, etc.).

The target audience would be intended for the general public (although it's just for the professor and the class for now). However, it would be more of a subset of the general public, like for those who are actually interested in walking through a web-based game. 

Going off of what my ideas on what the project is going to do, the kind of data that would need to be managed would be the character's inventory system, their stats, and their hp pool. Of course, all of these would be held in different scripts or functions to make the data more manageable and easy to navigate (for me as a developer).

Stretch goals for this kind of project span far and wide. It goes without saying that I could go far enough as to make an entirely fleshed out story with several locations (like multiple cities, terrains, etc.), interactive characters, different weapons and spells, status effects, and more. A smaller step, though, would be to make custom art and graphics for the monsters encountered, player weapons and spells, a health bar for the player, and whatever else I can think of along the way.



## Project Wireframe

![wireframe](/img/wireframe1.png)
![wireframe](/img/wireframe2.png)
![wireframe](/img/wireframe3.png)
![wireframe](/img/wireframe4.png)
![wireframe](/img/wireframe5.png)
![wireframe](/img/wireframe6.png)

## Sources

- inventory.js
    - Wrote entirety of inventory.js with help from ChatGPT
    - Reworked inventory.js entirely with ChatGPT to fix inventory conflict issue between HTML pages (intro.html and quest.html to be exact)

- index.html
    - implemented using JavaScript and calling it into HTML entirely with help from ChatGPT

    - Formatting of table data (i.e. the classes and their description) with ChatGPT

    - Linking another HTML file with a button with reference to "HTML Links", https://www.w3schools.com/html/html_links.asp"

    - Using data attributes found with reference to "Use data attributes", https://developer.mozilla.org/en-US/docs/Web/HTML/How_to/Use_data_attributes and ChatGPT

- intro.html
    - Wrote code to create a table with inventory contents directly above the inventory button when clicked with help from ChatGPT.

- style.css
    - Centered table for class names and description with reference to "How TO - Center Tables", https://www.w3schools.com/howto/howto_css_table_center.asp

    - Center buttons beneath class names and descriptions found with help from ChatGPT

    - Aligning Continue button on bottom-right of screen found with Google's AI Overview

    - Styling <p> elements outside of the character classes table quickly fixed with ChatGPT

- character.js
    - Wrote entirety of character.js with help from ChatGPT

- itempickup.js
    - Wrote entirety of itempickup.js with help from ChatGPT

- Lambda Function Codesource on AWS (index.mjs)

    - Altered to increment item ID count and revert back when an item is dropped from the player's inventory. 
    
    Example: beforehand, if the player had healthPotion1 and healthPotion2, after dropping healthPotion2 and picking up another healthpotion would place healthPotion3 in the inventory. The Lambda function change decrements it back down to healthPotion2 to reduce confusion.