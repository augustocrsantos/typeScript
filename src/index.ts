

import ClsArquivo from "./clsArquivo";

let clsArquivo: ClsArquivo = new ClsArquivo()

clsArquivo.lerArquivo('alunos.txt').then(() => {
    console.log('Calculo OK, imprimindo..')
}).catch(err => {
    console.log(err)
})
