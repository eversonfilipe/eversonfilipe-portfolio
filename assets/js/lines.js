/**
 * lines.js — Canvas de malha tecnológica interativa 2D
 * Reage ao mouse e touch, conectando nós.
 */
(function initLines() {
  'use strict';

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const ctx = canvas.getContext('2d');
  let W, H, nodes, raf;

  // Mouse tracking
  let mouse = { x: null, y: null, radius: 180 };

  const CONFIG = {
    nodeCount: window.innerWidth < 768 ? 40 : 90,
    maxDist: 150,
    nodeColor: 'rgba(182, 204, 215, 0.65)',
    lineColorMist: 'rgba(182, 204, 215, {a})',
    lineColorElectric: 'rgba(35, 61, 255, {a})',
    speed: 0.35,
    nodeRadius: 1.5,
    electricRatio: 0.25, // 25% das linhas
  };

  function resize() {
    W = canvas.width = canvas.parentElement.offsetWidth;
    H = canvas.height = canvas.parentElement.offsetHeight;
  }

  function createNode() {
    const angle = Math.random() * Math.PI * 2;
    const speed = CONFIG.speed * (0.4 + Math.random() * 0.6);
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed
    };
  }

  function init() {
    resize();
    nodes = Array.from({ length: CONFIG.nodeCount }, createNode);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Update positions & Mouse Interaction
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;

      // Mouse interaction (Repulsion)
      if (mouse.x != null && mouse.y != null) {
        let dx = mouse.x - n.x;
        let dy = mouse.y - n.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const forceDirectionX = dx / dist;
          const forceDirectionY = dy / dist;
          const force = (mouse.radius - dist) / mouse.radius;
          const push = force * 2.5; // repulsao suave
          n.x -= forceDirectionX * push;
          n.y -= forceDirectionY * push;
        }
      }
    }

    // Draw lines
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.maxDist) {
          const alpha = (1 - dist / CONFIG.maxDist) * 0.25; // opacidade suave
          const useElectric = ((i + j) % Math.round(1 / CONFIG.electricRatio)) === 0;
          const template = useElectric ? CONFIG.lineColorElectric : CONFIG.lineColorMist;
          
          ctx.strokeStyle = template.replace('{a}', alpha.toFixed(3));
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      // Draw line to mouse
      if (mouse.x != null && mouse.y != null) {
        const dx = nodes[i].x - mouse.x;
        const dy = nodes[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.45;
          ctx.strokeStyle = CONFIG.lineColorElectric.replace('{a}', alpha.toFixed(3));
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, CONFIG.nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = CONFIG.nodeColor;
      ctx.fill();
    }

    raf = requestAnimationFrame(draw);
  }

  function start() {
    if(!nodes) init();
    if(!raf) draw();
  }

  function stop() {
    if (raf) {
      cancelAnimationFrame(raf);
      raf = null;
    }
  }

  // Observers e Eventos
  const heroSection = document.getElementById('hero');
  
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    heroSection.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    heroSection.addEventListener('touchmove', (e) => {
      if(e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    }, {passive: true});

    heroSection.addEventListener('touchend', () => {
      mouse.x = null;
      mouse.y = null;
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries[0].isIntersecting ? start() : stop();
  }, { threshold: 0 });
  
  observer.observe(canvas);

  window.addEventListener('resize', () => {
    resize();
    const newCount = window.innerWidth < 768 ? 40 : 90;
    if (nodes && newCount !== CONFIG.nodeCount) {
      CONFIG.nodeCount = newCount;
      if(nodes.length > CONFIG.nodeCount) nodes.length = CONFIG.nodeCount;
      while(nodes.length < CONFIG.nodeCount) nodes.push(createNode());
    }
    if (nodes) {
      nodes.forEach(n => {
        n.x = Math.min(n.x, W);
        n.y = Math.min(n.y, H);
      });
    }
  });

})();
