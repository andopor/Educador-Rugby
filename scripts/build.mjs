import { mkdir, cp, rm } from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});
for(const file of ['index.html','css','js','assets','GUIA_DOCENTE.md'])await cp(file,`dist/${file}`,{recursive:true});
console.log('Web preparada en dist/');
