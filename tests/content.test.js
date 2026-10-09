import test from 'node:test';
import assert from 'node:assert/strict';
import { lessons, sessions, questions, criteria } from '../js/content.js';
import { csvCell } from '../js/utils.js';
test('recorrido completo y seis aspectos de evaluación acordados',()=>{
 assert.equal(lessons.length,6);assert.equal(sessions.length,6);
 assert.deepEqual(criteria.map(c=>c[0]),['Decisión','Precisión del pase y recepción','Continuidad','Avant','Fuera de juego','Defensa']);
 assert.match(sessions[5].steps.join(' '),/2×1 en dos líneas diferentes y 2×2 en la línea final/);
 for(const q of questions){assert.ok(q.answer>=0&&q.answer<q.options.length);assert.ok(q.explanation);}
});
test('la exportación conserva saltos y comillas y neutraliza fórmulas',()=>{
 assert.equal(csvCell('Pase "corto"\nbien'),'"Pase ""corto""\nbien"');
 assert.equal(csvCell('=1+1'),'"\'=1+1"');
 assert.equal(csvCell('  @SUM(A1)'),'"\'  @SUM(A1)"');
});

import { boards, diagram } from '../js/diagrams.js';
test('las tareas tienen escenas válidas y el 2×1 mantiene un solo defensor',()=>{
 for(const session of sessions)for(const key of session.diagrams)assert.ok(boards[key],`Falta el esquema ${key}`);
 for(const frame of boards['dos-uno']){
  assert.equal(frame.players.filter(p=>p.name.startsWith('D')).length,1);
  assert.equal(frame.players.filter(p=>p.name.startsWith('A')).length,2);
 }
 assert.match(boards.par[1].caption,/A2 cruza por detrás/);
 assert.match(boards.impar[1].caption,/A2 se abre.*banda/);
 const html=diagram('par','test-par')+diagram('impar','test-impar');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length,'IDs de SVG deben ser únicos entre pizarras');
});
