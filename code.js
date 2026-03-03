import DiceBox from "https://unpkg.com/@3d-dice/dice-box@1.1.3/dist/dice-box.es.min.js";
addEventListener("load", (event) => {







let Box = new DiceBox({
  assetPath: "assets/",
  origin: "https://unpkg.com/@3d-dice/dice-box@1.1.3/dist/",
  container: "#dice-box",
  theme: "diceOfRolling",
  themeColor: "#feea03",
  externalThemes: {
    diceOfRolling: "https://www.unpkg.com/@3d-dice/theme-dice-of-rolling@0.2.1",
  },
  offscreen: true,
  scale: 6,
  // physics settings that must be set - defaults are buggy
  throwForce: 5,
  gravity: 1,
  mass: 1,
  spinForce: 6,
});


Box.init().then(async (world) => {
  Box.roll(["4d20", "4d12", "4d10", "4d8", "4d6", "4d4"]);
});




document.querySelector("body").style.backgroundColor = "blue";


var actionButtons = {
    attackDown: false,
    healDown: false,
    diceRoll: false,
    attackBtn: document.getElementById('attackButton'),
    healBtn: document.getElementById('healbutton'),
    diceRollBtn: document.getElementById('diceButton'),
}

///Use this to apply to stats. 
const standardDice = ["d4", "d6", "d8", "d10", "d12", "d20"];




var stats = {
    slainCount: 0,
    slainCountElement: document.getElementById("slainCount").innerHTML,
    goldCount: 0,
    goldCountElement: document.getElementById("goldCount").innerHTML,
    playerHealth: 0,
    playerHealthElement: document.getElementById("playerHealth").innerHTML,
    playerDamage: 0,
    playerDamageElement: document.getElementById("playerDamage").innerHTML,
    enemyHealth: 0,
    playerDamageElement: document.getElementById("playerDamage").innerHTML,
   
    playerdie: 0, ///Index to access for roll from standard dice
    enemyDamage: 0,
    
    upgradeDie: function(){

    },




    applyDamage: function(damageTo, damageFrom){
        this.damageTo -= this.damageFrom;
    },
}


        stats.goldCountElement = 55; 


///Listens for the action button to be pressed
actionButtons.attackBtn.addEventListener('click', function() {
     Box.roll(["4d20", "4d12", "4d10", "4d8", "4d6", "4d4"]);
    console.log("Button clicked! Attack");

});

///Listens for the heal button to be pressed
actionButtons.healBtn.addEventListener('click', function() {
    console.log("Button clicked! Heal");

});

//listens for the dice roll button to be pressed.
actionButtons.diceRollBtn.addEventListener('click', function() {
     Box.roll(["4d20", "4d12", "4d10", "4d8", "4d6", "4d4"]);
    console.log("Button clicked! Dice Roll");
});







////add a event listener for when dice button is press and the other two.
//// If dice is pressed make sure one of the other buttons has been pressed. 







//For on load.
});
