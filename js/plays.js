// Datos didácticos y cronología explícita. Avanzar reduce la coordenada y.
const p=(name,x,y)=>({name,x,y});
const point=([x,y])=>({x,y});
const mix=(a,b,t)=>({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t});
export function curvePoint(points,t){
 let row=points.map(v=>({...v}));
 while(row.length>1)row=row.slice(0,-1).map((v,i)=>mix(v,row[i+1],t));
 return row[0];
}
export function sampleFrame(frame,progress){
 const t=Math.max(0,Math.min(1,progress));
 const players=frame.players.map(actor=>({...actor,...(frame.moves[actor.name]?curvePoint(frame.moves[actor.name],t):{})}));
 const from=players.find(actor=>actor.name===frame.ball);
 const to=players.find(actor=>actor.name===frame.passTo)||from;
 return {players,holder:frame.passTo&&t===1?frame.passTo:frame.ball,
  ball:from?mix(from,to,t):null};
}
function sequence(players,ball,steps){
 return steps.map(([title,caption,moves={},passTo=null])=>{
  const routes=Object.fromEntries(Object.entries(moves).map(([name,coords])=>{
   const actor=players.find(v=>v.name===name);
   return [name,[{x:actor.x,y:actor.y},...coords.map(point)]];
  }));
  const frame={title,caption,players:players.map(v=>({...v})),ball,moves:routes,passTo,duration:passTo?1400:2400};
  const end=sampleFrame(frame,1);players=end.players;ball=end.holder;
  return frame;
 });
}
const pair=[p('A1',120,180),p('A2',300,235)];
const trio=[p('A1',210,160),p('A2',80,220),p('A3',340,270)];
const two=[p('D1',140,90),p('D2',290,90),p('A1',140,240),p('A2',300,285)];
const one=[p('D1',210,85),p('A1',120,230),p('A2',300,280)];
const seek=['1 · Buscar el centro','A1 avanza con balón hacia el centro entre D1 y D2. A2 acompaña por detrás.',{A1:[[210,180]],A2:[[300,255]]}];
export const boards={
 pase:sequence(pair,'A1',[
  ['1 · Pasar y recibir','A1 pasa hacia atrás a A2. Nadie avanza durante el pase.',{},'A2'],
  ['2 · Recuperar la posición','A1 retrocede por detrás de A2 antes de volver a intervenir.',{A1:[[120,275]]}]
 ]),
 'pase-movimiento':sequence(pair,'A1',[
  ['1 · Avanzar con apoyo','A1 lleva el balón. A2 acompaña manteniéndose por detrás del portador.',{A1:[[150,140]],A2:[[300,210]]}],
  ['2 · Pasar','A1 pasa hacia atrás a A2. A2 recibe antes de avanzar.',{},'A2'],
  ['3 · Replegarse','A1 retrocede por detrás del nuevo portador; no continúa avanzando sin balón.',{A1:[[140,255]]}],
  ['4 · Recibir y buscar el centro','A2 avanza con balón hacia el centro. A1 acompaña desde una posición retrasada.',{A2:[[230,145]],A1:[[140,220]]}]
 ]),
 cruce:sequence(pair,'A1',[
  ['1 · Pasar','A1 pasa hacia atrás a A2, que espera para recibir.',{},'A2'],
  ['2 · Cruzar por detrás','A1 primero retrocede y cruza por detrás de A2. A2 conserva el balón mientras se recupera el apoyo.',{A1:[[110,300],[355,310],[355,275]]}],
  ['3 · Buscar el centro con balón','A2, que recibió, avanza hacia el centro. A1 acompaña sin adelantar al portador.',{A2:[[210,145]],A1:[[335,250]]}],
  ['4 · Enlazar otro pase','A2 pasa hacia atrás a A1, ya disponible como apoyo.',{},'A1'],
  ['5 · Volver a cruzar por detrás','A2 retrocede y cruza por detrás del nuevo portador A1.',{A2:[[210,310],[90,310],[90,290]]}],
  ['6 · Continuar por el centro','A1 avanza con balón hacia el centro. A2 mantiene profundidad para el siguiente pase.',{A1:[[210,180]],A2:[[90,270]]}]
 ]),
 trenza:sequence(trio,'A1',[
  ['1 · A1 pasa a A2','A2 recibe el pase hacia atrás; A3 espera como siguiente apoyo.',{},'A2'],
  ['2 · A1 cruza por detrás','A1 retrocede y cruza por detrás de A2, sin continuar avanzando por delante del balón.',{A1:[[210,310],[45,310],[45,265]]}],
  ['3 · A2 busca el centro','A2 avanza con balón hacia el centro. A1 y A3 acompañan por detrás.',{A2:[[180,145]],A1:[[45,245]],A3:[[335,215]]}],
  ['4 · A2 pasa a A3','A3 recibe por detrás del portador. Alternamos el lado del pase.',{},'A3'],
  ['5 · A2 cruza por detrás','A2 retrocede y cruza por detrás de A3 antes de volver a apoyar.',{A2:[[180,315],[375,315],[375,270]]}],
  ['6 · A3 busca el centro','A3 avanza con balón hacia el centro. A1 y A2 conservan profundidad.',{A3:[[240,140]],A1:[[90,210]],A2:[[375,255]]}],
  ['7 · A3 pasa a A1','A1 recibe el pase hacia atrás a la izquierda.',{},'A1'],
  ['8 · A3 cruza por detrás','A3 retrocede y cruza por detrás del nuevo portador A1.',{A3:[[240,315],[45,315],[45,270]]}],
  ['9 · A1 busca el centro','A1 avanza con balón hacia el centro. Los otros dos apoyos permanecen por detrás.',{A1:[[200,140]],A3:[[45,255]],A2:[[335,220]]}]
 ]),
 trio:sequence(trio,'A1',[
  ['1 · Pasar a A2','Elegimos el apoyo izquierdo, por detrás del portador.',{},'A2'],
  ['2 · Replegarse','A1 retrocede por detrás de A2. A3 mantiene su profundidad.',{A1:[[210,285]]}],
  ['3 · Recibir y buscar el centro','A2 avanza con balón al centro. Ambos apoyos permanecen por detrás.',{A2:[[180,145]],A1:[[210,265]],A3:[[340,240]]}]
 ]),
 'trio-derecha':sequence(trio,'A1',[
  ['1 · Pasar a A3','Elegimos el apoyo derecho, por detrás del portador.',{},'A3'],
  ['2 · Recuperar profundidad','A1 y A2 retroceden por detrás del nuevo portador antes de volver a intervenir.',{A1:[[210,300]],A2:[[80,310]]}],
  ['3 · Recibir y buscar el centro','A3 avanza con balón al centro. A1 y A2 mantienen profundidad.',{A3:[[240,145]],A1:[[210,275]],A2:[[80,285]]}]
 ]),
 'dos-uno':sequence(one,'A1',[
  ['1 · Leer y fijar','A1 avanza con balón. D1 se compromete con A1 y A2 acompaña por detrás. Respuesta defensiva ilustrativa.',{A1:[[185,160]],A2:[[300,245]],D1:[[185,105]]}],
  ['2 · Fijar y pasar','A1 libera a A2 con un pase hacia atrás antes del contacto.',{},'A2'],
  ['3 · Replegarse para apoyar','A1 retrocede por detrás de A2 antes de volver a participar.',{A1:[[145,285]]}],
  ['4 · Avanzar con balón','A2 avanza por el espacio libre. A1 acompaña por detrás.',{A2:[[300,65]],A1:[[180,230]]}]
 ]),
 'dos-uno-espacio':sequence(one,'A1',[
  ['1 · Leer al defensor','D1 protege a A2. A1 conserva el balón y observa el espacio libre. Respuesta defensiva ilustrativa.',{A1:[[185,160]],A2:[[300,245]],D1:[[280,110]]}],
  ['2 · Aprovechar el espacio','A1 avanza con balón por el espacio libre. A2 acompaña por detrás, sin adelantarse para recibir.',{A1:[[130,65]],A2:[[300,190]]}]
 ]),
 par:sequence(two,'A1',[
  seek,
  ['2 · Fijar al par y cruzar','A1 compromete a D1, su par inicial. A2 cruza por detrás de A1 para ofrecer apoyo. Respuesta defensiva ilustrativa.',{A1:[[190,175]],D1:[[170,120]],A2:[[250,310],[90,290],[90,225]]}],
  ['3 · Pasar al cruce','A2 recibe por detrás de A1. El pase no se dirige hacia delante.',{},'A2'],
  ['4 · Recuperar el apoyo','A1 retrocede por detrás de A2 antes de volver a intervenir.',{A1:[[240,275]]}],
  ['5 · Avanzar con balón','A2 aprovecha el espacio exterior tras el cruce. A1 acompaña por detrás.',{A2:[[90,55]],A1:[[230,235]]}]
 ]),
 impar:sequence(two,'A1',[
  seek,
  ['2 · Fijar al impar','A1 compromete a D2, el impar. A2 se abre hacia la banda manteniendo profundidad. Respuesta defensiva ilustrativa.',{A1:[[235,175]],D2:[[245,120]],A2:[[360,235]]}],
  ['3 · Pasar al apoyo exterior','A2 recibe por detrás del portador, abierto hacia la banda.',{},'A2'],
  ['4 · Recuperar el apoyo','A1 retrocede por detrás del nuevo portador A2.',{A1:[[230,280]]}],
  ['5 · Fijar al impar: superar por la banda','A2 avanza con balón por la banda y supera la altura de D2. A1 acompaña por detrás.',{A2:[[360,55]],A1:[[250,230]]}]
 ]),
 tap:sequence([p('D1',150,100),p('A1',150,180),p('A2',305,245)],'A1',[
  ['1 · Doble tap · Control y espacio','Aproximación controlada al portador, sin empujar ni agarrar. Adaptación escolar: el docente concreta el toque y el reinicio.',{D1:[[150,130]]}],
  ['2 · Continuidad acordada','Tras la señal y el reinicio que indique el docente, A1 pasa hacia atrás a A2. Este ejemplo no fija un reglamento oficial de doble tap.',{},'A2'],
  ['3 · Recuperar la posición','A1 retrocede por detrás de A2 para volver a apoyar.',{A1:[[150,285]]}]
 ]),
 equipo:sequence([p('D1',90,85),p('D2',210,85),p('D3',330,85),p('A1',175,170),p('A2',80,245),p('A3',325,235)],'A1',[
  ['1 · Avance y apoyos','A1 avanza con balón. A2 y A3 acompañan por detrás. Ejemplo guiado de 3×3.',{A1:[[210,145]],A2:[[80,225]],A3:[[380,215]]}],
  ['2 · Pasar al exterior','A3 recibe el pase hacia atrás. A2 permanece por detrás del nuevo portador.',{},'A3'],
  ['3 · Replegarse','A1 retrocede por detrás de A3 antes de volver a participar.',{A1:[[210,275]]}],
  ['4 · Continuar con apoyo','A3 avanza con balón por el exterior. A1 y A2 mantienen profundidad.',{A3:[[380,65]],A1:[[210,250]],A2:[[80,220]]}]
 ]),
 reglas:sequence(pair,'A1',[
  ['1 · Pase y posición','A2 recibe el pase hacia atrás. La línea marca la altura del portador o de quien acaba de jugar el balón.',{},'A2'],
  ['2 · Volver a estar en juego','Tras pasar, A1 ha quedado por delante: debe replegarse y no intervenir hasta recuperar una posición en juego.',{A1:[[120,280]]}]
 ]),
 circuito:sequence([p('D1',210,240),p('D2',210,155),p('D3',140,65),p('D4',285,65),p('A1',110,310),p('A2',300,335)],'A1',[
  ['Evaluación · 2×1 + 2×1 + 2×2','Esquema de organización, no una jugada. Dos líneas de 2×1 y una final de 2×2; las rotaciones se concretan en clase.']
 ])
};
boards.libre=boards.par;
export const choices={
 libre:[['par','Fijar al par · cruce'],['impar','Fijar al impar · banda']],
 trio:[['trio','Pase a A2'],['trio-derecha','Pase a A3']],
 'dos-uno':[['dos-uno','Fijar y pasar'],['dos-uno-espacio','Aprovechar el espacio']]
};
