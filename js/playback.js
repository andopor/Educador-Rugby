import { boards, updateDiagram } from './diagrams.js';

const active = new Map();
const duration = 4200;
const clamp = value => Math.max(0, Math.min(1, value));
const smooth = value => value * value * (3 - 2 * value);
const nearest = (players, point) => players.reduce((a, b) =>
 Math.hypot(a.x-point.x,a.y-point.y) < Math.hypot(b.x-point.x,b.y-point.y) ? a : b);
const framesFor = figure => boards[figure.dataset.variant || figure.dataset.board];

function label(figure, playing, message) {
 const button=figure.querySelector('[data-play]');
 if(!button)return;
 button.textContent=playing?'Ⅱ Pausa':'▶ Reproducir';
 button.setAttribute('aria-label',playing?'Pausar jugada':'Reproducir jugada');
 figure.querySelector('.playback-status').textContent=message;
}
export function stopPlayback(figure, reset=false) {
 const state=active.get(figure);
 if(state)cancelAnimationFrame(state.raf);
 active.delete(figure);
 if(reset)updateDiagram(figure,0);
 label(figure,false,reset?'Jugada en el inicio.':'Reproducción detenida.');
}
export function stopAllPlayback() {
 for(const figure of active.keys())stopPlayback(figure);
}
export function selectPhase(figure,phase) {
 stopPlayback(figure);
 updateDiagram(figure,phase);
 figure.dataset.finished='false';
 label(figure,false,'Paso seleccionado. Pulsa reproducir para verlo en movimiento.');
}

function tracks(figure, frame) {
 const svg=figure.querySelector('svg');
 const used=new Set();
 const runs=[...svg.querySelectorAll('[data-motion="run"]')].flatMap(path=>{
  const start=path.getPointAtLength(0);
  const actor=nearest(frame.players,start);
  if(used.has(actor.name))return [];
  used.add(actor.name);
  return [{path,start,length:path.getTotalLength(),actor,node:svg.querySelector(`[data-player="${actor.name}"]`)}];
 });
 const passes=[...svg.querySelectorAll('[data-motion="ball"]')];
 // Two pass arrows in the trio sketch are alternatives, not two simultaneous balls.
 const pass=passes[Number(figure.querySelector('[data-pass-option]')?.value)||0];
 const holder=frame.players.find(p=>p.name===frame.ball);
 const receiver=pass?nearest(frame.players.filter(p=>!p.name.startsWith('D')&&p!==holder),pass.getPointAtLength(pass.getTotalLength())):holder;
 return {runs,pass,holder,receiver,latePass:['par','impar'].includes(figure.dataset.variant || figure.dataset.board),ball:svg.querySelector('[data-ball]')};
}
function draw(track,progress) {
 const move=smooth(clamp(track.pass?(track.latePass?progress/.65:(progress-.35)/.65):progress));
 const positions=new Map();
 for(const run of track.runs){
  const point=run.path.getPointAtLength(run.length*move);
  const offset={x:point.x-run.start.x,y:point.y-run.start.y};
  run.node.setAttribute('transform',`translate(${offset.x} ${offset.y})`);
  positions.set(run.actor.name,offset);
 }
 if(!track.ball||!track.holder)return;
 const position=owner=>{const offset=positions.get(owner.name)||{x:0,y:0};return {x:owner.x+23+offset.x,y:owner.y+12+offset.y};};
 const from=position(track.holder),to=position(track.receiver);
 const passProgress=track.pass?clamp(track.latePass?(progress-.65)/.35:progress/.35):0;
 const fraction=smooth(passProgress);
 const x=from.x+(to.x-from.x)*fraction,y=from.y+(to.y-from.y)*fraction;
 track.ball.setAttribute('cx',x);track.ball.setAttribute('cy',y);
 track.ball.setAttribute('transform',`rotate(-35 ${x} ${y})`);
}
export function togglePlayback(figure) {
 let state=active.get(figure);
 if(state&&!state.paused){
  state.paused=true;cancelAnimationFrame(state.raf);
  label(figure,false,'En pausa. Pulsa reproducir para continuar.');return;
 }
 // Keep only one board moving, including boards hidden by navigation.
 for(const other of active.keys())if(other!==figure)stopPlayback(other);
 if(!state){
  if(figure.dataset.finished==='true')updateDiagram(figure,0);
  state={elapsed:0,paused:false,phase:Number(figure.dataset.phase),raf:0};
  state.track=tracks(figure,framesFor(figure)[state.phase]);
  active.set(figure,state);
 }
 state.paused=false;state.last=performance.now();
 label(figure,true,'Jugada en movimiento. Puedes pausarla para observar.');
 const tick=now=>{
  if(!figure.isConnected||figure.closest('.page')?.hidden||figure.closest('details:not([open])')){stopPlayback(figure);return;}
  state.elapsed+=(now-state.last)*Number(figure.querySelector('[data-speed]').value);state.last=now;
  draw(state.track,clamp(state.elapsed/duration));
  if(state.elapsed>=duration){
   // The two 2×1 outcomes are separate choices; never play one as the continuation of the other.
   if(figure.dataset.board!=='dos-uno'&&state.phase+1<framesFor(figure).length){
    state.phase++;state.elapsed=0;updateDiagram(figure,state.phase);
    state.track=tracks(figure,framesFor(figure)[state.phase]);
   }else{
    active.delete(figure);figure.dataset.finished='true';
    label(figure,false,'Jugada terminada. Puedes repetirla o elegir otro paso.');return;
   }
  }
  state.raf=requestAnimationFrame(tick);
 };
 state.raf=requestAnimationFrame(tick);
}
// Hidden tabs must not skip straight to the end when the user returns.
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopAllPlayback();});
