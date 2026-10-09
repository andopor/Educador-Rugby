import { lessons, sessions, questions, criteria } from './content.js';
import { escape as esc, csvCell } from './utils.js';
import { diagram, updateDiagram } from './diagrams.js';
import { togglePlayback, stopPlayback, stopAllPlayback, selectPhase } from './playback.js';
const $ = id => document.getElementById(id);
let lessonIndex = 0, questionIndex = 0, answers = [];
const pages = [...document.querySelectorAll('.page')];
function focusTitle(container) { const title = container.querySelector('h1,h2'); if(title){title.tabIndex=-1;title.focus({preventScroll:true});} }
function route(focus = true) {
  stopAllPlayback();
  const hash = location.hash.slice(1);
  if(hash==='main'){if(focus)$('main').focus();return;}
  const active = pages.find(page=>page.id===hash)||pages[0];
  pages.forEach(page=>page.hidden=page!==active);
  document.querySelectorAll('.header nav a').forEach(a=>{if(a.hash==='#'+active.id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  document.title = `${active.id==='inicio'?'Educador Rugby':document.querySelector(`.header nav a[href="#${active.id}"]`).textContent} · 1.º ESO`;
  if(focus){focusTitle(active);window.scrollTo({top:0,behavior:'instant'});}
}
function renderLesson(focus=false){
  stopAllPlayback();
  $('lesson-nav').innerHTML=lessons.map((l,i)=>`<button class="lesson-tab" data-lesson="${i}" aria-pressed="${i===lessonIndex}"><b>0${i+1}</b><span>${esc(l.title)}<small>${esc(l.subtitle)}</small></span></button>`).join('');
  const l=lessons[lessonIndex];
  $('lesson-content').innerHTML=`<span class="eyebrow">LECCIÓN ${lessonIndex+1} DE ${lessons.length}</span><h2>${esc(l.title)}</h2><p class="lesson-lead">${esc(l.lead)}</p><ol class="lesson-steps">${l.steps.map(step=>`<li>${esc(step)}</li>`).join('')}</ol><p class="notice">${esc(l.note)}</p><div class="actions">${lessonIndex<lessons.length-1?'<button class="button primary" id="next-lesson">Siguiente lección →</button>':'<a class="button primary" href="#practica">Ahora, practica →</a>'}</div>`;
  renderLessonBoard();
  if(focus)focusTitle($('lesson-content'));
}
function renderQuiz(focus=false){
 if(questionIndex===questions.length){const correct=answers.filter(Boolean).length;$('quiz').innerHTML=`<span class="eyebrow">RETO COMPLETADO</span><h2>Cada intento te ayuda a aprender.</h2><div class="score">${correct} / ${questions.length}</div><p>Respuestas correctas. La decisión, el pase y la defensa se observan jugando.</p><div class="actions"><button class="button primary" id="restart-quiz">Volver a intentarlo</button><a class="button" href="#aprende">Repasar las lecciones</a></div>`;}
 else{const q=questions[questionIndex];$('quiz').innerHTML=`<span class="eyebrow">PREGUNTA ${questionIndex+1} DE ${questions.length}</span><div class="progress"><span style="width:${questionIndex/questions.length*100}%"></span></div><h2>${esc(q.prompt)}</h2><div class="choices">${q.options.map((o,i)=>`<button class="choice" data-answer="${i}">${esc(o)}</button>`).join('')}</div><div id="feedback" role="status"></div>`;}
 if(focus)focusTitle($('quiz'));
}
const lessonBoards = [
 {title:'Un pase que conecta', keys:['pase','pase-movimiento']},
 {title:'Pasar, cruzar y volver a apoyar', keys:['cruce','trenza']},
 {title:'Dos atacantes. Un defensor.', keys:['dos-uno']},
 {title:'Buscar el centro y leer la fijación', keys:['par','impar']},
 {title:'Defender con doble tap', keys:['tap']},
 {title:'Controlar el balón y la posición', keys:['reglas']}
];
function renderLessonBoard(){
 const config=lessonBoards[lessonIndex];
 $('lesson-board').innerHTML=`<div class="board-heading"><span class="eyebrow">PIZARRA · ${esc(lessons[lessonIndex].title)}</span><h2>${esc(config.title)}</h2><p>Pulsa Reproducir para ver el balón y a los jugadores en movimiento. Puedes pausar, cambiar la velocidad o revisar cada paso. Las pausas separan las acciones para aprender; en juego se enlazan.</p></div><div class="board-grid">${config.keys.map((key,i)=>diagram(key,`lesson-${lessonIndex}-${key}-${i}`)).join('')}</div>`;
}
$('sessions').innerHTML=sessions.map((s,i)=>`<details class="session" ${i===0?'open':''}><summary><span>0${i+1}</span>${esc(s.title)}</summary><div class="session-body"><p><strong>Objetivo:</strong> ${esc(s.goal)}</p><ul>${s.steps.map(step=>`<li>${esc(step)}</li>`).join('')}</ul><h3 class="session-diagrams-title">La práctica, de un vistazo.</h3><div class="practice-diagrams">${s.diagrams.map((key,j)=>diagram(key,`practice-${i}-${key}-${j}`,{compact:true})).join('')}</div><p class="notice"><strong>Ajuste:</strong> ${esc(s.adjust)}</p></div></details>`).join('');
const lineLabels=['Línea 1 · 2×1','Línea 2 · 2×1','Línea final · 2×2'];
$('assessment').innerHTML=criteria.map(([name,description],i)=>`<tr><th scope="row">${esc(name)}<small>${esc(description)}</small></th>${lineLabels.map((line,j)=>`<td><textarea id="obs-${i}-${j}" aria-label="${esc(name)} · ${esc(line)}" placeholder="Evidencia o No observado"></textarea></td>`).join('')}</tr>`).join('');
function download(){
 const rows=[['Aspecto',...lineLabels],...criteria.map(([name],i)=>[name,...lineLabels.map((_,j)=>$(`obs-${i}-${j}`).value)])];
 const csv='\uFEFF'+rows.map(row=>row.map(csvCell).join(';')).join('\r\n');
 const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='observacion-rugby.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 $('observation-status').textContent='Descarga solicitada. Comprueba el archivo antes de iniciar una nueva observación.';
}
document.addEventListener('click',event=>{
 const button=event.target.closest('button');if(!button)return;
 if(button.dataset.lesson!==undefined){lessonIndex=Number(button.dataset.lesson);renderLesson(true);}
 if(button.id==='next-lesson'){lessonIndex++;renderLesson(true);}
 if(button.dataset.phaseTo!==undefined)selectPhase(button.closest('[data-board]'),Number(button.dataset.phaseTo));
 if(button.hasAttribute('data-play'))togglePlayback(button.closest('[data-board]'));
 if(button.hasAttribute('data-restart')){const figure=button.closest('[data-board]');stopPlayback(figure,true);figure.dataset.finished='false';}
 if(button.dataset.answer!==undefined&&answers.length===questionIndex){
  const selected=Number(button.dataset.answer),q=questions[questionIndex];answers.push(selected===q.answer);
  document.querySelectorAll('[data-answer]').forEach(b=>{b.disabled=true;if(Number(b.dataset.answer)===q.answer){b.classList.add('correct');b.textContent='Correcta: '+b.textContent;}else if(b===button){b.classList.add('incorrect');b.textContent='Tu respuesta: '+b.textContent;}});
  $('feedback').innerHTML=`<p class="notice"><strong>${selected===q.answer?'¡Bien pensado!':'Vamos a repasarlo.'}</strong> ${esc(q.explanation)}</p><button id="next-question" class="button primary">${questionIndex===questions.length-1?'Ver resultado':'Siguiente pregunta →'}</button>`;
  $('next-question').focus({preventScroll:true});
 }
 if(button.id==='next-question'){questionIndex++;renderQuiz(true);}
 if(button.id==='restart-quiz'){questionIndex=0;answers=[];renderQuiz(true);}
 if(button.id==='download')download();
 if(button.id==='reset-observation'){
  const fields=[...document.querySelectorAll('#assessment textarea')];
  if(fields.some(f=>f.value)&&!window.confirm('¿Borrar las anotaciones actuales? Descarga la ficha primero si quieres conservarlas.'))return;
  fields.forEach(f=>f.value='');$('observation-status').textContent='Ficha vacía para una nueva observación.';fields[0].focus();
 }
 if(button.id==='print')window.print();
});
document.addEventListener('change',event=>{
 if(event.target.matches('[data-variant]')){
  const figure=event.target.closest('[data-board]');stopPlayback(figure);
  if(event.target.matches('[data-variant]'))figure.dataset.variant=event.target.value;
  updateDiagram(figure,0);figure.dataset.finished='false';
 }
});
window.addEventListener('hashchange',()=>route());renderLesson();renderQuiz();route(false);
