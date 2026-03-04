import DiceBox from "https://unpkg.com/@3d-dice/dice-box@1.1.3/dist/dice-box.es.min.js";
addEventListener("load", (event) => {


    ///Turn the dice into a big object. 

    var dice = {


        player: {

            Box: new DiceBox({
                assetPath: "assets/",
                origin: "https://unpkg.com/@3d-dice/dice-box@1.1.3/dist/",
                container: "#player-dice-box",
                theme: "default",
                themeColor: "#e26772",
                externalThemes: {
                    diceOfRolling: "https://www.unpkg.com/@3d-dice/theme-dice-of-rolling@0.2.1",
                },
                offscreen: true,
                scale: 10,
                // physics settings that must be set - defaults are buggy
                throwForce: 5,
                gravity: 1,
                mass: 1,
                spinForce: 6,
            }),

            value: 0,
            dice: [2, 0, 0, 0, 0],

        },


        enemy: {
            Box: new DiceBox({
                assetPath: "assets/",
                origin: "https://unpkg.com/@3d-dice/dice-box@1.1.3/dist/",
                container: "#enemy-dice-box",
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
            }),

            value: 0,
            dice: [2, 1, 0, 0, 0],

        },




        roll: async function (playerOrEnemy) {
    var diceToRoll = [];
    var dieAmt = 0;

    // Build the dice array
    for (let i = 0; i < playerOrEnemy.dice.length; i++) {
        dieAmt = playerOrEnemy.dice[i];
        if (dieAmt > 0) {
            switch (i) {
                case 0: diceToRoll.push(dieAmt + "d4"); break;
                case 1: diceToRoll.push(dieAmt + "d6"); break;
                case 2: diceToRoll.push(dieAmt + "d8"); break;
                case 3: diceToRoll.push(dieAmt + "d10"); break;
                case 4: diceToRoll.push(dieAmt + "d12"); break;
                case 5: diceToRoll.push(dieAmt + "d20"); break;
            }
        }
    }

    playerOrEnemy.value = 0;
    this.rolling = true;

    // 1. Setup the Promise FIRST
    var rollPromise = new Promise((resolve) => {
        playerOrEnemy.Box.onRollComplete = (rollResult) => {
            // rollResult is an array of die objects [{value: 4}, {value: 2}]
            let total = 0;
            for (let i = 0; i < rollResult.length; i++) {
                total += rollResult[i].value;
            }
            playerOrEnemy.value = total;
            this.rolling = false;
            resolve(); // This signal lets 'await rollPromise' proceed
        };
    });

    // 2. Trigger the roll
    playerOrEnemy.Box.roll(diceToRoll);

    // 3. Pause this method here
    await rollPromise;

    console.log("Roll is finished! Total value:", playerOrEnemy.value);
},







        init: function () {
            this.player.Box.init();
            this.enemy.Box.init();
        },




    }






    dice.init();



    ///We need to write a function to get the dice amount.
    ///Maybe let the player buy certain dice then 
    ///add it to there inventory which we will roll.

    //NOOOOO when you kill a enemy you take there dice
    ///But then what will be use gold on?
    ////Lets just stick to the simply die upgrade for now.

    ///gold will be used to upgrade die (buy), health, heal chance, 
    /// and base attack, 


    //We can use the ai to figure out apporprate pricing
    ///ratios.

    ////The player can buy dice, not upgrade. 
    ///The player will have an array of 6 numbers. 
    ///each number representing that many dice.
    ///1d4 + 1d6 + 1d8 + 1d10 + 1d12 + 1d20






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
        //When targeting the elements make sure to type innerHTML if updating the value.


        ///These need to be objects
        ///They all need to follow the same struture so we can use the small property names
        slain: {
            num: Number(document.getElementById("slainCount").innerHTML),
            element: document.getElementById("slainCount"),
        },
        gold: {
            num: Number(document.getElementById("goldCount").innerHTML),
            element: document.getElementById("goldCount"),
            update: function (num) {
                this.element.innerHTML = num;
                num = num;
            },
        },
        player: {
            healthNum: Number(document.getElementById("playerHealth").innerHTML),
            healthElement: document.getElementById("playerHealth"),
            damageNum: Number(document.getElementById("playerDamage").innerHTML),
            damageElement: document.getElementById("playerDamage"),
            updateHealth: function (num) {
                this.healthElement.innerHTML = num;
                num = num;
            },
            updateDamage: function (num) {
                this.damageElement.innerHTML = num;
                num = num;
            },
            dieIndex: 0,
            dieValue: 0,
        },
        enemy: {
            healthNum: Number(document.getElementById("enemyHealth").innerHTML),
            healthElement: document.getElementById("enemyHealth"),
            damageNum: Number(document.getElementById("enemyDamage").innerHTML),
            damageElement: document.getElementById("enemyDamage"),
            dieIndex: 0,
            updateHealth: function (num) {
                this.healthElement.innerHTML = num;
                num = num;
            },
            updateDamage: function (num) {
                this.damageElement.innerHTML = num;
                num = num;
            },
            dieValue: 0,
        },


        upgradeDie: function (card) {
        },




        applyDamage: function (damageTo, damageFrom) {
            damageTo.updateHealth(damageTo.healthNum -= damageFrom.damageNum);
            console.log(damageTo.healthNum);
            if (damageTo.healthNum <= 0) {
                return true;
            }
            else {
                return false;
            }
        },
    }

    console.log(stats.applyDamage(stats.enemy, stats.player));



    ///Listens for the action button to be pressed
    actionButtons.attackBtn.addEventListener('click', function () {
        enemyBox.roll(["4d20", "4d12", "4d10", "4d8", "4d6", "4d4"]);
        console.log("Button clicked! Attack");

    });





    ///Listens for the heal button to be pressed
    actionButtons.healBtn.addEventListener('click', async function () {
        await dice.roll(dice.player);
        console.log(dice.player.value);

        /* dice.playerBox.onRollComplete = (rollResult) => {
            console.log(rollResult.length);
            console.log(rollResult);
            for (let i = 0; i < rollResult.length; i++) {
                total += rollResult[i].value;
            };
            console.log(total);
        }; */


        /*     playerBox.onRollComplete = (rollResult) => {
        
                for()
        
                total+= rollResult.value;
                console.log(rollResult.value);
                console.log('die result', rollResult);
                  console.log(total);
        
            }; */

        console.log("Button clicked! Heal");
        // console.log("sdfds  " + total);
    });

    //listens for the dice roll button to be pressed.
    actionButtons.diceRollBtn.addEventListener('click', function () {
        playerBox.roll(["4d20", "4d12", "4d10", "4d8", "4d6", "4d4"]);
        console.log("Button clicked! Dice Roll");
    });







    ////add a event listener for when dice button is press and the other two.
    //// If dice is pressed make sure one of the other buttons has been pressed. 







    //For on load.
});
