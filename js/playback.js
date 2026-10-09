import { framesFor, updateDiagram, paintFrame } from './diagrams.js';
const active=new Map();
function label(figure,playing,message){
 const button=figure.querySelector('[data-play]');if(!button)return;
 button.textContent=playing?'Ⅱ Pausa':'▶ Reproducir';
 button.setAttribute('aria-label',playing?'Pausar jugada':'Reproducir jugada');
 figure.querySelector('.playback-status').textContent=message;
}
export function stopPlayback(figure,reset=false){
 const state=active.get(figure);if(state)cancelAnimationFrame(state.raf);
 active.delete(figure);
 if(reset){updateDiagram(figure,0);figure.dataset.finished='false';}
 label(figure,false,reset?'Jugada en el inicio.':'Reproducción detenida.');
}
export function stopAllPlayback(){for(const figure of active.keys())stopPlayback(figure);}
export function selectPhase(figure,phase){
 stopPlayback(figure);updateDiagram(figure,phase);figure.dataset.finished='false';
 label(figure,false,'Paso seleccionado. Reproducir continúa desde aquí.');
}
export function togglePlayback(figure){
 let state=active.get(figure);
 if(state&&!state.paused){state.paused=true;cancelAnimationFrame(state.raf);label(figure,false,'En pausa. Pulsa reproducir para continuar.');return;}
 for(const other of active.keys())if(other!==figure)stopPlayback(other);
 if(!state){
  if(figure.dataset.finished==='true')updateDiagram(figure,0);
  // Restart a stopped phase from its actual initial positions, never from an inferred route.
  updateDiagram(figure,Number(figure.dataset.phase));
  state={elapsed:0,phase:Number(figure.dataset.phase),raf:0};active.set(figure,state);
 }
 state.paused=false;state.last=performance.now();label(figure,true,'Jugada en movimiento. Puedes pausarla para observar.');
 const tick=now=>{
  if(!figure.isConnected||figure.closest('.page')?.hidden||figure.closest('details:not([open])')){stopPlayback(figure);return;}
  state.elapsed+=(now-state.last)*Number(figure.querySelector('[data-speed]').value);state.last=now;
  const frames=framesFor(figure),duration=frames[state.phase].duration;
  paintFrame(figure,Math.min(1,state.elapsed/duration));
  if(state.elapsed>=duration){
   if(state.phase+1<frames.length){state.elapsed-=duration;state.phase++;updateDiagram(figure,state.phase);}
   else{active.delete(figure);figure.dataset.finished='true';label(figure,false,'Jugada terminada. Puedes repetirla o elegir otro paso.');return;}
  }
  state.raf=requestAnimationFrame(tick);
 };
 state.raf=requestAnimationFrame(tick);
}
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopAllPlayback();});
