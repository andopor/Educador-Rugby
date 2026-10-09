import { escape as esc } from './utils.js';

// Coordenadas del campo: avanzar es subir. Cada fase representa una intención,
// no una trayectoria obligatoria de la defensa.
const player = (name, x, y) => ({ name, x, y });
const path = (d, kind = 'run') => ({ d, kind });
const scene = (title, caption, players, paths = [], ball = null, extra = '') => ({ title, caption, players, paths, ball, extra });
const pair = [player('A1',110,185),player('A2',285,230)];
const defenders = [player('D1',145,90),player('D2',295,90)];

export const boards = {
 'pase': [scene('Pasar y recibir','A1 mira a A2 y pasa a sus manos. A2 está ligeramente por detrás.',pair,[path('M135 190L258 222','ball')],'A1')],
 'pase-movimiento': [scene('Pasar avanzando','Ambos avanzan. A2 mantiene una posición lateral y ligeramente retrasada para recibir.',[player('A1',110,195),player('A2',285,245)],[path('M110 164L110 90'),path('M285 214L285 140'),path('M138 202L257 237','ball')],'A1')],
 'cruce': [
  scene('1 · Pasar','A1 pasa a A2, situado al lado y ligeramente por detrás.',pair,[path('M137 192L258 223','ball')],'A1'),
  scene('2 · Avanzar y cruzar por detrás','A2 recibe y avanza. A1 cruza por detrás del recorrido de A2 y vuelve a ofrecer apoyo.',[player('A1',110,185),player('A2',285,230)],[path('M285 200L285 105'),path('M110 215C125 315 350 315 350 220')],'A2'),
  scene('3 · Volver a apoyar','A2 ha avanzado y A1 vuelve a estar disponible por detrás. Ahora pueden enlazar otro pase.',[player('A1',325,245),player('A2',230,145)],[path('M251 163L306 222','ball')],'A2')
 ],
 'trio':[scene('Tríos · Anchura y profundidad','El portador avanza y tiene dos apoyos escalonados. Los pases van al lado o hacia atrás.',[player('A1',210,145),player('A2',85,220),player('A3',335,245)],[path('M186 159L109 206','ball'),path('M233 164L310 227','ball')],'A1')],
 'trenza':[
  scene('1 · A1 pasa a A2','A1 pasa a la izquierda y cruza por detrás de A2. A2 recibe y avanza; A3 acompaña.',[player('A1',210,155),player('A2',85,210),player('A3',335,255)],[path('M185 164L110 198','ball'),path('M210 185C180 295 45 295 45 225'),path('M85 180L85 100')],'A1'),
  scene('2 · A2 pasa a A3','Con A2 ya avanzado, pasa a A3, que ofrece apoyo a su derecha. A2 cruza por detrás de A3.',[player('A1',55,265),player('A2',130,135),player('A3',300,200)],[path('M157 145L273 190','ball'),path('M130 165C170 310 360 310 360 225'),path('M300 170L300 95')],'A2'),
  scene('3 · A3 pasa a A1','A3 pasa al apoyo de la izquierda y cruza por detrás. Alternamos los lados para continuar la trenza.',[player('A1',145,205),player('A2',355,265),player('A3',290,130)],[path('M265 141L171 190','ball'),path('M290 160C240 310 85 310 85 230'),path('M145 175L145 95')],'A3')
 ],
 'dos-uno':[
  scene('1 · Leer al defensor','Solo hay un defensor. A1 avanza y A2 ofrece apoyo; ambos observan la respuesta de D1.',[player('D1',205,90),...pair],[path('M125 160L178 115')],'A1'),
  scene('2 · Fijar y pasar','Si D1 se compromete con A1, este pasa al apoyo libre. A2 mantiene profundidad para recibir.',[player('D1',150,100),player('A1',145,165),player('A2',300,220)],[path('M169 176L272 208','ball'),path('M300 190L300 110')],'A1'),
  scene('3 · Aprovechar el espacio','Si D1 protege al apoyo, A1 aprovecha el espacio para avanzar. A2 sigue acompañando.',[player('D1',280,105),...pair],[path('M110 155L110 80'),path('M285 200L285 150')],'A1')
 ],
 'par':[
  scene('1 · Buscar el centro','A1 busca con intención el centro entre D1 y D2. A2 observa a qué defensor compromete.',[...defenders,player('A1',145,225),player('A2',300,270)],[path('M151 195Q164 170 205 135')],'A1'),
  scene('2 · Fijar al par: cruzar por detrás','A1 compromete a D1, su par inicial. A2 cruza por detrás de A1 para ofrecer una nueva opción de pase.',[...defenders,player('A1',200,165),player('A2',300,245)],[path('M190 137L165 116'),path('M271 250C245 300 85 300 95 205'),path('M176 181L122 215','ball')],'A1')
 ],
 'impar':[
  scene('1 · Buscar el centro','A1 busca con intención el centro entre D1 y D2. A2 observa a qué defensor compromete.',[...defenders,player('A1',145,225),player('A2',300,270)],[path('M151 195Q164 170 205 135')],'A1'),
  scene('2 · Fijar al impar: abrirse','A1 compromete a D2, el impar. A2 se abre lateralmente, mantiene profundidad y ofrece una salida.',[...defenders,player('A1',220,165),player('A2',300,245)],[path('M240 142L274 111'),path('M324 245L378 245'),path('M246 177L365 225','ball')],'A1')
 ],
 'libre':[scene('2×2 · Leer y elegir','A1 busca el centro. Según la fijación, A2 decide: cruzar por detrás ante el par o abrirse ante el impar.',[...defenders,player('A1',145,215),player('A2',300,260)],[path('M154 186L207 140'),path('M274 269Q160 315 100 245'),path('M328 260L378 260')],'A1')],
 'tap':[scene('Doble tap · Control y espacio','D1 se aproxima al portador y realiza el doble tap acordado, sin empujar ni agarrar. El apoyo queda disponible.',[player('D1',165,110),player('A1',165,185),player('A2',305,245)],[path('M165 139L165 151'),path('M191 197L279 232','ball')],'A1')],
 'equipo':[scene('Juego · Avance y apoyos','Ejemplo de 3×3. Los atacantes buscan espacios y los defensores coordinan su posición. Las trayectorias se adaptan al juego.',[player('D1',90,85),player('D2',210,85),player('D3',330,85),player('A1',175,170),player('A2',80,245),player('A3',325,235)],[path('M182 141L195 115'),path('M198 181L300 224','ball'),path('M80 215L110 160')],'A1')],
 'circuito':[scene('Evaluación · 2×1 + 2×1 + 2×2','Dos líneas con un defensor y una línea final con dos. Esquema orientativo; disposición y rotaciones se concretan en clase.',[player('D1',210,240),player('D2',210,155),player('D3',140,65),player('D4',285,65),player('A1',110,310),player('A2',300,335)],[], 'A1','<text x="26" y="244" class="field-label">L1 · 2×1</text><text x="26" y="159" class="field-label">L2 · 2×1</text><text x="26" y="65" class="field-label">Final · 2×2</text>')],
 'reglas':[scene('Posición y control','A2 ofrece apoyo por detrás del portador. Controla la recepción y recolócate antes de intervenir.',[player('A1',155,165),player('A2',295,245)],[path('M180 181L271 229','ball')],'A1','<path d="M35 165H385" class="position-line"/><text x="35" y="135" class="field-label">Línea del portador</text>')]
};

export function field(frame, uid) {
 const isCircuit=uid.includes('circuito');
 const height=isCircuit?390:350;
 return `<svg viewBox="0 0 420 ${height}" role="img" aria-labelledby="${uid}-title ${uid}-desc"><title id="${uid}-title">${esc(frame.title)}</title><desc id="${uid}-desc">${esc(frame.caption)}</desc><defs><marker id="${uid}-run" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="#951c80" stroke-width="1.5"/></marker><marker id="${uid}-ball" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="#3e526c" stroke-width="1.5"/></marker></defs><rect x="8" y="8" width="404" height="${height-16}" rx="23" fill="#e2f3e9"/><path d="M25 50H395M25 ${height-50}H395" stroke="white" stroke-width="3"/><text x="210" y="34" text-anchor="middle" class="field-label">AVANCE ↑</text>${frame.extra}${frame.paths.map(p=>`<path data-motion="${p.kind}" d="${p.d}" fill="none" stroke="${p.kind==='ball'?'#3e526c':'#951c80'}" stroke-width="3" ${p.kind==='ball'?'stroke-dasharray="7 6"':''} marker-end="url(#${uid}-${p.kind})"/>`).join('')}${frame.players.map(p=>`<g data-player="${p.name}"><circle cx="${p.x}" cy="${p.y}" r="23" fill="${p.name.startsWith('D')?'#294c43':'#951c80'}" stroke="white" stroke-width="3"/><text x="${p.x}" y="${p.y+5}" fill="white" text-anchor="middle" font-size="14" font-weight="750">${p.name}</text></g>${frame.ball===p.name?`<ellipse data-ball cx="${p.x+23}" cy="${p.y+12}" rx="8" ry="5" transform="rotate(-35 ${p.x+23} ${p.y+12})" fill="#f4d787" stroke="#493b21"/>`:''}`).join('')}</svg>`;
}

export function diagram(key, uid, {compact=false}={}) {
 const frames=boards[key];
 return `<figure class="diagram ${compact?'compact':''}" data-board="${key}" data-uid="${uid}" data-phase="0"><div class="diagram-stage">${field(frames[0],uid)}</div><figcaption><strong class="diagram-title">${esc(frames[0].title)}</strong><p class="diagram-caption" aria-live="polite">${esc(frames[0].caption)}</p></figcaption>${frames.length>1?`<div class="phase-controls" aria-label="Fases del esquema">${frames.map((_,i)=>`<button data-phase-to="${i}" aria-pressed="${i===0}">Paso ${i+1}</button>`).join('')}</div>`:''}${frames.some(frame=>frame.paths.length)?`${key==='libre'?'<label class="playback-choice">Decisión <select data-variant aria-label="Elegir fijación"><option value="par">Fijar al par · cruce</option><option value="impar">Fijar al impar · apertura</option></select></label>':''}${key==='trio'?'<label class="playback-choice">Pase <select data-pass-option aria-label="Elegir apoyo"><option value="0">Al apoyo A2</option><option value="1">Al apoyo A3</option></select></label>':''}<div class="playback-controls"><button type="button" data-play aria-label="Reproducir ${esc(frames[0].title)}">▶ Reproducir</button><button type="button" data-restart aria-label="Volver al inicio de la jugada">↺ Inicio</button><label>Velocidad <select data-speed aria-label="Velocidad de la jugada"><option value="0.5">Lenta</option><option value="1" selected>Normal</option><option value="1.5">Rápida</option></select></label></div><p class="playback-status" role="status">Pulsa reproducir para ver este paso en movimiento.</p>`:''}${key==='dos-uno'?'<p class="playback-status">Elige qué observar: paso 1, lectura; paso 2, fijar y pasar; paso 3, avanzar por el espacio libre. Son alternativas según la defensa.</p>':''}<div class="diagram-legend"><span>━━ Desplazamiento</span><span>┄┄ Pase</span><span>● A: ataque · D: defensa</span></div></figure>`;
}
export function updateDiagram(figure, phase) {
 const frame=boards[figure.dataset.variant || figure.dataset.board][phase];
 if(!frame)return;
 figure.dataset.phase=String(phase);
 figure.querySelector('.diagram-stage').innerHTML=field(frame,figure.dataset.uid);
 figure.querySelector('.diagram-title').textContent=frame.title;
 figure.querySelector('.diagram-caption').textContent=frame.caption;
 figure.querySelectorAll('[data-phase-to]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.phaseTo)===phase)));
}
