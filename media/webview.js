(function(){
    const vscode = typeof acquireVsCodeApi === 'function' ? acquireVsCodeApi() : undefined;
    const chibi = document.getElementById('chibi');
    const fx = document.getElementById('fx-canvas');
  
    const state = {
      mode: 'idle',
      cfg: { sizePx: 128, opacity: 0.95, corner: 'bottomRight', offset: { x: -16, y: -16 }, reducedMotion: 'system', minimalMode: false, enabled: true }
    };
  
    function applyConfig(cfg){
      if (!cfg) return;
      state.cfg = {
        sizePx: cfg.get ? cfg.get('sizePx') : (cfg.sizePx ?? 128),
        opacity: cfg.get ? cfg.get('opacity') : (cfg.opacity ?? 0.95),
        corner: cfg.get ? cfg.get('corner') : (cfg.corner ?? 'bottomRight'),
        offset: cfg.get ? cfg.get('offset') : (cfg.offset ?? {x:-16,y:-16}),
        reducedMotion: cfg.get ? cfg.get('reducedMotion') : (cfg.reducedMotion ?? 'system'),
        minimalMode: cfg.get ? cfg.get('minimalMode') : (cfg.minimalMode ?? false),
        enabled: cfg.get ? cfg.get('enabled') : (cfg.enabled ?? true)
      };
      document.documentElement.style.setProperty('--size', state.cfg.sizePx + 'px');
      document.documentElement.style.setProperty('--opacity', state.cfg.opacity + '');
      chibi.classList.toggle('minimal', !!state.cfg.minimalMode);
      
      // Apply positioning based on configuration
      const position = state.cfg.corner || 'center';
      
      // Remove all position classes
      chibi.classList.remove('center', 'bottomRight', 'bottomLeft', 'topRight', 'topLeft');
      
      // Add the appropriate position class
      chibi.classList.add(position);
      
      document.body.style.display = state.cfg.enabled ? 'block' : 'none';
    }
  
    function setMode(next){
      if (state.mode === next) return;
      ['idle','thinking','typing','cheer','error'].forEach(m => chibi.classList.remove(m));
      chibi.classList.add(next);
      state.mode = next;
      if (next === 'cheer' && window.__confetti) window.__confetti.burst(fx);
    }
  
    function handleMessage(ev){
      const { type, value } = ev.data || {};
      switch(type){
        case 'config': return applyConfig(value);
        case 'aiStart': return setMode('thinking');
        case 'aiPartial': return setMode('typing');
        case 'aiDone': setMode('cheer'); setTimeout(() => setMode('idle'), 1000); return;
        case 'aiError': setMode('error'); setTimeout(() => setMode('idle'), 1200); return;
        case 'toggle': state.cfg.enabled = !state.cfg.enabled; return applyConfig(state.cfg);
      }
    }
    window.addEventListener('message', handleMessage);
  
    // Optional sprite backgrounds if present
    const base = document.currentScript?.src?.split('/').slice(0, -1).join('/') || '.';
    const sprites = { idle: `${base}/sprites/idle.png`, thinking: `${base}/sprites/thinking.png`, typing: `${base}/sprites/typing.png`, cheer: `${base}/sprites/cheer.png`, error: `${base}/sprites/error.png` };
    const _setMode = setMode;
    setMode = function(next){ if (sprites[next]) chibi.style.backgroundImage = `url('${sprites[next]}')`; return _setMode(next); };
  
    applyConfig(state.cfg);
    setMode('idle');
  })();