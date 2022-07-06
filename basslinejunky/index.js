
for(var i=0;i<document.querySelectorAll(".drum").length;i++)
{
    document.querySelectorAll(".drum")[i].addEventListener("click",function ()
    {
    //    var audio = new Audio("sounds/tom-1.mp3");
    //    audio.play();

        makeSound(this.innerHTML);
        buttonAnimation(this.innerHTML);
    });
}

document.addEventListener("keydown", function(event)
{
    makeSound(event.key);
    buttonAnimation(event.key);
});

function makeSound(key)
{
    switch(key)
        {
            case "w":
                var audio = new Audio("sounds/tom-1.mp3");
                break;
            case "i":
                var audio = new Audio("sounds/tom-2.mp3");
                break;
            case "l":
                var audio = new Audio("sounds/tom-3.mp3");
                break;
            case "k":
                var audio = new Audio("sounds/tom-4.mp3");
                break;
            case "x":
                var audio = new Audio("sounds/snare.mp3");
                break;
            case "n":
                var audio = new Audio("sounds/crash.mp3");
                break;
            case "s":
                var audio = new Audio("sounds/kick-bass.mp3");
                break;
	    case "o":
                var audio = new Audio("sounds/soundx.mp3");
                break;
	    case "z":
                var audio = new Audio("sounds/soundy.mp3");
                break;
            default:
                console.log("this.innerHTML");
                break;
        }
        audio.play();
}

function buttonAnimation(currentKey)
{
    var activeButton = document.querySelector("."+currentKey);
    activeButton.classList.add("pressed");
    setTimeout(function () {
        activeButton.classList.remove("pressed")
    },100);
}
