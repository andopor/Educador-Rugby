import test from 'node:test';
import assert from 'node:assert/strict';
import { boards, sampleFrame } from '../js/plays.js';
import { sessions } from '../js/content.js';
const actor=(state,name)=>state.players.find(p=>p.name===name);

test('las jugadas enlazan posiciones y posesión sin saltos; todos los pases van atrás',()=>{
 for(const [key,frames] of Object.entries(boards))for(let i=0;i<frames.length;i++){
  const frame=frames[i],start=sampleFrame(frame,0),end=sampleFrame(frame,1);
  if(frame.passTo){
   assert.ok(actor(start,frame.passTo).y>=actor(start,frame.ball).y,`${key}/${i}: pase adelantado`);
   assert.equal(Object.keys(frame.moves).length,0,`${key}/${i}: el receptor corre antes de recibir`);
   assert.equal(sampleFrame(frame,.99).holder,frame.ball);
   assert.equal(end.holder,frame.passTo);
  }
  if(i+1<frames.length){
   const next=sampleFrame(frames[i+1],0);
   assert.deepEqual(end.players,next.players,`${key}/${i}: salto entre fases`);
   assert.equal(end.holder,next.holder,`${key}/${i}: cambio de posesión sin pase`);
   assert.deepEqual(end.ball,next.ball);
  }
 }
});
test('ningún apoyo avanza estando por delante del portador; quienes quedan adelantados se repliegan',()=>{
 for(const [key,frames] of Object.entries(boards))for(const [i,frame] of frames.entries()){
  if(frame.passTo)continue;
  let previous=sampleFrame(frame,0);
  for(let step=1;step<=400;step++){
   const state=sampleFrame(frame,step/400),holder=actor(state,state.holder);
   for(const player of state.players.filter(p=>p.name.startsWith('A')&&p.name!==state.holder)){
    const before=actor(previous,player.name);
    if(player.y<holder.y-.01){
     assert.ok(player.y>=before.y-1e-6,`${key}/${i}: ${player.name} avanza adelantado`);
     assert.ok(player.y>before.y,`${key}/${i}: ${player.name} no se repliega`);
    }
   }
   previous=state;
  }
 }
});
test('receptores de cruce y trenza buscan el centro después de recibir y recuperar el apoyo',()=>{
 for(const key of ['cruce','trenza'])for(const frame of boards[key].filter(f=>/centro/.test(f.title))){
  const start=sampleFrame(frame,0),end=sampleFrame(frame,1);
  const from=actor(start,start.holder),to=actor(end,end.holder);
  assert.ok(Math.abs(to.x-210)<Math.abs(from.x-210),`${key}: el receptor no busca el centro`);
  assert.ok(to.y<from.y,`${key}: el portador no avanza`);
 }
});
test('fijar al impar termina con A2 con balón superando a D2 por la banda',()=>{
 const end=sampleFrame(boards.impar.at(-1),1);
 assert.equal(end.holder,'A2');
 assert.ok(actor(end,'A2').y<actor(end,'D2').y);
 assert.ok(actor(end,'A2').x>actor(end,'D2').x+60);
 assert.ok(actor(end,'A1').y>actor(end,'A2').y);
});
test('las sesiones no repiten pizarras idénticas dentro de la misma zona',()=>{
 for(const session of sessions)assert.equal(new Set(session.diagrams).size,session.diagrams.length,session.title);
});
