import { escape as esc } from './utils.js';
import { boards, choices, sampleFrame, curvePoint } from './plays.js';
export { boards } from './plays.js';
export const framesFor=figure=>boards[figure.dataset.variant || figure.dataset.board];
const phaseButtons=(frames,phase)=>frames.map((_,i)=>`<button type="button" data-phase-to="${i}" aria-pressed="${i===phase}">Paso ${i+1}</button>`).join('');
function routeD(points){
 const start=points[0],end=points.at(-1);
 const visible=Array.from({length:61},(_,i)=>curvePoint(points,i/60)).filter(v=>Math.hypot(v.x-start.x,v.y-start.y)>26&&Math.hypot(v.x-end.x,v.y-end.y)>26);
 return visible.map((v,i)=>`${i?'L':'M'}${v.x.toFixed(2)} ${v.y.toFixed(2)}`).join('');
}
export function field(frame,uid){
 const circuit=uid.includes('circuito'),height=circuit?390:350;
 const state=sampleFrame(frame,0),holder=state.players.find(p=>p.name===state.holder);
 const paths=Object.entries(frame.moves).map(([actor,points])=>`<path data-route="${actor}" d="${routeD(points)}" class="run-route" marker-end="url(#${uid}-run)"/>`).join('');
 const receiver=frame.players.find(p=>p.name===frame.passTo);
 const pass=receiver?`<path d="${routeD([holder,receiver])}" class="pass-route" marker-end="url(#${uid}-ball)"/>`:'';
 return `<svg viewBox="0 0 420 ${height}" role="img" aria-labelledby="${uid}-title ${uid}-desc"><title id="${uid}-title">${esc(frame.title)}</title><desc id="${uid}-desc">${esc(frame.caption)}</desc><defs><marker id="${uid}-run" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="#951c80" stroke-width="1.5"/></marker><marker id="${uid}-ball" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="#3e526c" stroke-width="1.5"/></marker></defs><rect x="8" y="8" width="404" height="${height-16}" rx="23" fill="#e2f3e9"/><path d="M25 50H395M25 ${height-50}H395" stroke="white" stroke-width="3"/><text x="210" y="34" text-anchor="middle" class="field-label">AVANCE ↑</text>${circuit?'<text x="26" y="244" class="field-label">L1 · 2×1</text><text x="26" y="159" class="field-label">L2 · 2×1</text><text x="26" y="65" class="field-label">Final · 2×2</text>':`<path data-position-line d="M25 ${holder.y}H395" class="position-line"/>`}${paths}${pass}${frame.players.map(p=>`<g data-player="${p.name}" transform="translate(${p.x} ${p.y})"><circle r="23" fill="${p.name.startsWith('D')?'#294c43':'#951c80'}" stroke="white" stroke-width="3"/><text y="5" fill="white" text-anchor="middle" font-size="14" font-weight="750">${p.name}</text></g>`).join('')}<ellipse data-ball cx="${holder.x+23}" cy="${holder.y+12}" rx="8" ry="5" transform="rotate(-35 ${holder.x+23} ${holder.y+12})" fill="#f4d787" stroke="#493b21"/></svg>`;
}
export function diagram(key,uid,{compact=false}={}){
 const frames=boards[key],options=choices[key],moving=frames.some(f=>Object.keys(f.moves).length||f.passTo);
 return `<figure class="diagram ${compact?'compact':''}" data-board="${key}" data-uid="${uid}" data-phase="0" ${options?`data-variant="${options[0][0]}"`:''}><div class="diagram-stage">${field(frames[0],uid)}</div><figcaption><strong class="diagram-title">${esc(frames[0].title)}</strong><p class="diagram-caption" aria-live="polite">${esc(frames[0].caption)}</p></figcaption>${options?`<label class="playback-choice">Jugada <select data-variant aria-label="Elegir jugada">${options.map(([value,label])=>`<option value="${value}">${esc(label)}</option>`).join('')}</select></label>`:''}<div class="phase-controls" aria-label="Fases del esquema">${frames.length>1?phaseButtons(frames,0):''}</div>${moving?'<div class="playback-controls"><button type="button" data-play aria-label="Reproducir jugada">▶ Reproducir</button><button type="button" data-restart aria-label="Volver al inicio de la jugada">↺ Inicio</button><label>Velocidad <select data-speed aria-label="Velocidad de la jugada"><option value="0.5">Lenta</option><option value="1" selected>Normal</option><option value="1.5">Rápida</option></select></label></div><p class="playback-status" role="status">Pulsa reproducir para recorrer la jugada.</p><p class="rule-status" data-rule-status>Apoya por detrás del portador.</p>':''}<div class="diagram-legend"><span>━━ Desplazamiento</span><span>┄┄ Pase</span>${moving?'<span>┄ Altura del portador o último pasador</span>':''}<span>● A: ataque · D: defensa</span></div></figure>`;
}
export function paintFrame(figure,progress){
 const frame=framesFor(figure)[Number(figure.dataset.phase)],state=sampleFrame(frame,progress);
 for(const actor of state.players)figure.querySelector(`[data-player="${actor.name}"]`).setAttribute('transform',`translate(${actor.x} ${actor.y})`);
 const ball=figure.querySelector('[data-ball]'),x=state.ball.x+23,y=state.ball.y+12;
 ball.setAttribute('cx',x);ball.setAttribute('cy',y);ball.setAttribute('transform',`rotate(-35 ${x} ${y})`);
 const holder=state.players.find(p=>p.name===state.holder);
 figure.querySelector('[data-position-line]')?.setAttribute('d',`M25 ${holder.y}H395`);
 const ahead=state.players.filter(p=>p.name.startsWith('A')&&p.name!==holder.name&&p.y<holder.y-0.01);
 const status=figure.querySelector('[data-rule-status]');
 if(status){status.textContent=ahead.length?`${ahead.map(p=>p.name).join(' y ')}: replegarse por detrás antes de intervenir.`:'Apoyos por detrás del portador.';status.dataset.retreat=String(ahead.length>0);}
}
export function updateDiagram(figure,phase){
 const frames=framesFor(figure),frame=frames[phase];if(!frame)return;
 figure.dataset.phase=String(phase);
 figure.querySelector('.diagram-stage').innerHTML=field(frame,figure.dataset.uid);
 figure.querySelector('.diagram-title').textContent=frame.title;
 figure.querySelector('.diagram-caption').textContent=frame.caption;
 const controls=figure.querySelector('.phase-controls');
 if(controls.children.length!==(frames.length>1?frames.length:0))controls.innerHTML=frames.length>1?phaseButtons(frames,phase):'';
 controls.querySelectorAll('[data-phase-to]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.phaseTo)===phase)));
 paintFrame(figure,0);
}
