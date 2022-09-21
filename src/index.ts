

import ClsArquivo from "./clsArquivo";

let clsArquivo: ClsArquivo = new ClsArquivo()

clsArquivo.lerArquivo('alunos.txt').then(() => {
    console.log('Conseguir Calcular... Vou imprimir....')
}).catch(err => {
    console.log(err)
})