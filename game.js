var gamePattern = [];
var userClickedPattern = [];
var buttonColours= ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //flash en boton random
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    //sonido en ese boton
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level "+level)
}

//Ve cual boton fue cliqueado, y guarda el valor de su id en userChosenColor
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //sonido del color del boton al ser clickeado por la funcion playSound
    playSound(userChosenColour);
    //llama la funcion animatePress al boton clickeado (le agrega y saca la clase pressed)
    animatePress(userChosenColour);
    checkAnswer((userClickedPattern.length)-1);
});

//funcion que toma un nombre (que van a ser colores) y reproduce sus sonidos
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

//funcion que toma un nombre (que van a ser colores) y agrega y luego saca la clase pressed al boton de ese nombre
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

//cuando una tecla es presionada, se llama a la funcion nextSequence
$(document).keydown(function(){
    if (!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    } 
});

//como referirse al ultimo elemento de un array:
// gamePattern[(gamePattern.length)-1];
// userClickedPattern[(userClickedPattern.length)-1];

//comparar los inputs del usuario y los esperados.


function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(nextSequence,1000);
        }
        
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}