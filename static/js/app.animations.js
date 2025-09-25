const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
const bgVideo = document.getElementById('bgVideo');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

bgVideo.style.width = `${width}px`;

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    bgVideo.style.width = `${width}px`;
    bgVideo.style.height = `${height}px`;
});



// let animationId;
// let isVisible = true;
// const observer = new IntersectionObserver(entries => {
//   entries.forEach(entry => {
//     if(entry.intersectionRatio >= 0.8){
//       if(!isVisible){
//         isVisible = true;
//         animate();
//       }
//     } else {
//       isVisible = false;
//       cancelAnimationFrame(animationId);
//     }
//   });
// }, { threshold: 1 });

// observer.observe(canvas);

class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * 100;
        this.y = Math.random() * 100;
        this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2;
        this.speed = Math.random() * 6 + 4;
        this.length = Math.random() * 120 + 50;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.color = `rgba(255,255,255,${this.opacity})`;
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.opacity -= 0.005;
        if (this.opacity <= 0 || this.x > width + this.length || this.y > height + this.length) {
            this.reset();
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        const grad = ctx.createLinearGradient(-this.length, 0, 0, 0);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(1, this.color);
        ctx.fillStyle = grad;
        ctx.fillRect(-this.length, -1, this.length, 2);
        ctx.fillStyle = this.color;
        ctx.fillRect(0, -1, 2, 2);
        ctx.restore();
    }
}

// const starCount = 5;
// const stars = [];
// for(let i=0;i<starCount;i++){
//     stars.push(new Star());
// }

// let lastTime = performance.now();
// function animate(now) {
//     if(!isVisible) {
//         return;
//         document.getElementById('stars').style.display = 'none';
//     }else {
//         document.getElementById('stars').style.display = 'block';
//     }
//     const delta = now - lastTime;
//     lastTime = now;

//     ctx.clearRect(0,0,width,height);
//     for(const star of stars){
//         star.update(delta);
//         star.draw(ctx);
//     }
//     requestAnimationFrame(animate);
// }

// animate(performance.now());