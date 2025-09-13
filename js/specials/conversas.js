// Conversas d’Alma — microinteracciones del logo + init AOS
(function(){
    const wrap = document.getElementById('caLogo');
    if (wrap){
      const maxTilt = 6; // grados
  
      wrap.addEventListener('mousemove', (e) => {
        const r = wrap.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;   // 0..1
        const y = (e.clientY - r.top) / r.height;   // 0..1
        const rx = (0.5 - y) * maxTilt;
        const ry = (x - 0.5) * maxTilt;
  
        wrap.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
        wrap.style.boxShadow = `0 18px 60px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.06)`;
        wrap.style.background = `
          linear-gradient(${(x*360)|0}deg, rgba(202,162,74,.24), rgba(20,21,26,1) 40%),
          linear-gradient(180deg,#14151a,#0f1012)`;
      });
  
      wrap.addEventListener('mouseleave', () => {
        wrap.style.transform = '';
        wrap.style.boxShadow = '';
        wrap.style.background = 'linear-gradient(180deg,#14151a,#0f1012)';
      });
    }
  
    // Init AOS si no está iniciado
    if (window.AOS && !document.documentElement.classList.contains('aos-initialized')){
      AOS.init({ once: true, duration: 700, offset: 80 });
      document.documentElement.classList.add('aos-initialized');
    }
  })();
  