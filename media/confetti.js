(function(){
    function burst(canvas){
      const ctx = canvas.getContext('2d');
      const W = canvas.width, H = canvas.height;
      const pieces = Array.from({length: 24}, () => ({
        x: W-40 + Math.random()*30,
        y: H-40 + Math.random()*30,
        vx: -2 + Math.random()*4,
        vy: -4 - Math.random()*3,
        life: 30 + Math.random()*20
      }));
      let t = 0;
      function step(){
        t++;
        ctx.clearRect(0,0,W,H);
        pieces.forEach(p => {
          p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.life -= 1;
          ctx.globalAlpha = Math.max(0, p.life/50);
          ctx.fillRect(p.x, p.y, 3, 3);
        });
        if (t < 60) requestAnimationFrame(step); else ctx.clearRect(0,0,W,H);
      }
      step();
    }
    window.__confetti = { burst };
  })();