
var Canvas = document.getElementById("Canvas");
const context = Canvas.getContext("2d");

const gameWidth = window.innerWidth;
let sound = document.getElementById("sound");
let death = document.getElementById("death");
sound.volume = 0.2;
death.volume = 1;
var onClick = false;
var jumping = false;
var ok = true;
document.addEventListener("pointerdown", () => {onClick = true});
document.addEventListener("pointerup", () => {onClick = false});
document.addEventListener(["keydown"],(e) => {
    
    if (e.key == " ")
        onClick = true;
});

document.addEventListener("keyup", () => {
        onClick = false;
});


function colision(main, enemy){
    if (main.x + main.width >= enemy.x &&
        main.y + main.height >= enemy.y  &&
        enemy.x + enemy.width >= main.x &&
        enemy.y + enemy.height >= main.y 
    ){
        return true;
    }
    return false;
}

function component(name, x, y){
    this.Appearance = document.getElementById(name),
    this.x = x,
    this.y = y,
    this.Appearance.style.left = x + "px",
    this.Appearance.style.top = y + "px",
    this.height = this.Appearance.offsetHeight,
    this.width = this.Appearance.offsetWidth,
    this.Appearance.style.height = this.height + "px",
    this.Appearance.style.length = 40 + "px",
    this.vy = 0,
    this.move = function(){
        this.x -= 0.5; 
        this.Appearance.style.left = this.x + "%";
    },
    this.jump = function(){
        
       
        if (onClick && this.y == y){
            this.vy -= 12;
            
            sound.play();
        }
        if (onClick)
            this.vy += 0.3;
        else
            this.vy += 1;

        this.y += this.vy;
        if(this.y > y){
            jumping = false;
            this.y = y;
            this.vy = 0;
            sound.pause();
            sound.currentTime = 0;
        }
        this.Appearance.style.top = this.y + "px";
    }
};




main = new component("main", 50, 460);
const game = document.getElementById("box");
var picture = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg"];

function spawn() {
    for (let i = 1; i <= Math.floor(Math.random() * 4); ++i){
        const img = document.createElement("img");
        img.src =  picture[Math.floor(Math.random() * picture.length)];
        img.className = "enemy";

        let lheight = Math.floor(Math.random() * 40) + 30 ;
        img.style.height = (lheight + 6) + "px";
        img.style.width = "30px";

        let x = window.innerWidth + i * 30; 
        let groundY = 510; 
        let y = groundY - lheight;

        img.style.position = "absolute";
        img.style.left = x + "px";
        img.style.top = y + "px";

        game.appendChild(img);
        let obs = {
        el: img,
        x: x,
        y: y,
        width: img.offsetWidth,
        height: img.offsetHeight
    };

    const speed = 3; 
    
        const timer = setInterval(() => {
            obs.x -= speed;
            obs.el.style.left = obs.x + "px";

            if (obs.x + obs.width < 0) { 
                clearInterval(timer);
                obs.el.remove();
            } 
            if (colision(main, obs)){
                death.play();
                death.end
                ok = false;
                // return
                death.onended = function(){
                    window.location.assign("end.html");
                }
            }
            
        }, 16);
    }

    
}



function play(){
    if (ok)
        spawn();
}
setInterval(play, 900);


function loop(){
    if (ok){
        main.jump();
    }
    requestAnimationFrame(loop);
    
}
loop();

// function checkOrientation() {
//       if (window.innerWidth < window.innerHeight) {
//         rotateMsg.style.display = "flex"; // đang dọc
//       } else {
//         rotateMsg.style.display = "none"; // ngang
//       }
//     }

//     window.addEventListener("resize", checkOrientation);
//     window.addEventListener("orientationchange", checkOrientation);
//     checkOrientation();

//     // thử khóa landscape (chỉ hoạt động khi user gesture và trình duyệt hỗ trợ)
//     if (screen.orientation && screen.orientation.lock) {
//       screen.orientation.lock("landscape").catch(err => {
//         console.log("Không thể khóa orientation:", err);
//       });
// }