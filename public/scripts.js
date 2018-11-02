/* global $ */
document.getElementById("character_alien").addEventListener("click", function(){
    document.getElementById('fighter_type_text').innerHTML = "Ninja";
});

document.getElementById("character_ogre").addEventListener("click", function(){
    document.getElementById('fighter_type_text').innerHTML = "Ogre";
});

document.getElementById("character_old_man").addEventListener("click", function(){
    document.getElementById('fighter_type_text').innerHTML = "Old Man";
});

document.getElementById("character_pokemon").addEventListener("click", function(){
    document.getElementById('fighter_type_text').innerHTML = "Millenial";
});

document.getElementById("character_red_hair").addEventListener("click", function(){
    document.getElementById('fighter_type_text').innerHTML = "Fire Guy";
});

function begin_fight() {
    document.getElementById('winner_text').innerHTML = "";
    var playerName = document.getElementById("player_name").value;
    var characterType = document.getElementById('fighter_type_text').textContent;
    
    //Add the person to the db
    var me;
    var url = "addPlayer/" + playerName + "/" + characterType;
    $.getJSON(url,function(data) {
        console.log("me", data);
        me = data;
        
    
        //Get a random fighter
        var url = "getRandomPlayer";
        var them;
        $.getJSON(url,function(data) {
            console.log("them", data);
            them = data;
            
    
            //Then set the images
            var playerOneContainer = document.getElementById("player_one_container");
            var playerTwoContainer = document.getElementById("player_two_container");
            var playerOneImage = document.getElementById("player_one_image");
            var playerTwoImage = document.getElementById("player_two_image");
            
            var image1, image2;
            switch(me.char) {
                case("Ogre"):
                    image1 = "ogre.jpg";
                    break;
                case("Ninja"):
                    image1 = "alien.png";
                    break;
                case("Old Man"):
                    image1 = "old-man.png";
                    break;
                case("Millenial"):
                    image1 = "pokemon.gif";
                    break;
                case("Fire Guy"):
                    image1 = "red-hair.png";
                    break;
            }
            
            playerOneContainer.innerHTML = me.name;
            
            switch(them.char) {
                case("Ogre"):
                    image2 = "ogre.jpg";
                    break;
                case("Ninja"):
                    image2 = "alien.png";
                    break;
                case("Old Man"):
                    image2 = "old-man.png";
                    break;
                case("Millenial"):
                    image2 = "pokemon.gif";
                    break;
                case("Fire Guy"):
                    image2 = "red-hair.png";
                    break;
            }
            
            playerTwoContainer.innerHTML = them.name;
            
            //Determine the winner
            var countdownHtml = document.getElementById("countdown");
            $('#battle_button').hide();
            var countdown = 3;
            countdownHtml.innerHTML = countdown;
            var interval = setInterval(function() {
                if (countdown > 0) {
                    countdown--;
                    countdownHtml.innerHTML = countdown;
                } else {
                    countdownHtml.innerHTML = '';
                    clearInterval(interval);
                    $('#battle_button').show();
                    
                    //Decide winner and update screen
                    var winner = Math.floor(Math.random() * 100);
                    console.log('winner', winner);
                    if (winner < 50) {
                        document.getElementById('winner_text').innerHTML = me.name + " WINS!";
                    }
                    else {
                        document.getElementById('winner_text').innerHTML = them.name + " WINS!";
                    }
                }
            }, 1000);
        });
    });
}