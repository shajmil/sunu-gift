const countsNeeded = 3;
let counts = 1;

const present = document.querySelector(".present");
present.addEventListener("click", () => {
    counts += 1;
    present.style.setProperty("--count", Math.ceil(counts / 2));
    present.classList.add("animate");
    setTimeout(() => {
        present.classList.remove("animate");
    }, 300);

    if (counts >= countsNeeded) {
        present.classList.add("open");
    }
});

const fireworksCanvas = document.querySelector("#fireworksCanvas");
const fireworksCtx = fireworksCanvas.getContext("2d");

let fireworks = [];

class Firework {
    constructor() {
        this.x = Math.random() * fireworksCanvas.width;
        this.y = Math.random() * fireworksCanvas.height;
        this.color = getRandomColor();
        this.radius = 2;
        this.speed = Math.random() * 3 + 2;
        this.angle = Math.random() * Math.PI * 2;
        this.gravity = 0.1;
        this.opacity = 1;
        this.life = true;
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        this.speed *= 0.98;
        this.radius *= 0.98;
        this.opacity -= 0.02;

        if (this.opacity <= 0) {
            this.life = false;
        }
    }

    draw() {
        fireworksCtx.save();
        fireworksCtx.globalCompositeOperation = "lighter";
        fireworksCtx.fillStyle = this.color;
        fireworksCtx.beginPath();
        fireworksCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        fireworksCtx.closePath();
        fireworksCtx.fill();
        fireworksCtx.restore();
    }
}

function createFirework() {
    const firework = new Firework();
    fireworks.push(firework);
}

function getRandomColor() {
    const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function updateFireworks() {
    for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        if (!fireworks[i].life) {
            fireworks.splice(i, 1);
        }
    }
}

function drawFireworks() {
    fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    for (let firework of fireworks) {
        firework.draw();
    }
}

function animateFireworks() {
    createFirework();
    updateFireworks();
    drawFireworks();
    requestAnimationFrame(animateFireworks);
}

function resizeFireworksCanvas() {
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
}

window.addEventListener("resize", () => {
    resizeFireworksCanvas();
    fireworks = []; // Reset fireworks on resize
});

resizeFireworksCanvas();
animateFireworks();