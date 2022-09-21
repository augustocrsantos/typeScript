import fs from 'node:fs/promises'
import { ExportToCsv } from 'export-to-csv';

const SEPARADOR_INPUT_COLUNA: string = ' '
const SEPARADOR_INPUT_REGISTRO: string = '\r\n'
const MEDIA_APROVACAO: number = 7

interface rsAlunoInterface {
    matricula: number
    nome: string
    nota1: number
    nota2: number
    nota3: number
    media: number
    situacao: string
}

export default class ClsArquivo {

    private rsAlunos: Array<rsAlunoInterface> = []

    public lerArquivo(caminho: string): Promise<boolean> {

        return fs.readFile(caminho).then(rs => {

            this.tratarRegistros(rs.toString().split(SEPARADOR_INPUT_REGISTRO))

            return true

        }).catch((err) => {

            throw ('Erro na Leitura: '.concat(err.message))

        })

    }

    private tratarRegistros(registros: Array<string>): void {

        registros.forEach(aluno => {
            // Transformação da Linha em Registro de Strings
            let registro: Array<string> = aluno.split(SEPARADOR_INPUT_COLUNA)

            let tmpRegistro: rsAlunoInterface = {
                matricula: parseInt(registro[0]),
                nome: registro[1],
                nota1: parseInt(registro[2]),
                nota2: parseInt(registro[3]),
                nota3: parseInt(registro[4]),
                media: 0,
                situacao: ''
            }

            tmpRegistro.media = (tmpRegistro.nota1 + tmpRegistro.nota2 + tmpRegistro.nota3) / 3
            tmpRegistro.media = parseFloat(tmpRegistro.media.toFixed(2))

            tmpRegistro.situacao = tmpRegistro.media >= MEDIA_APROVACAO ? 'Aprovado' : 'Reprovado'

            this.rsAlunos.push(tmpRegistro)

        })
         this.geraCsv(this.rsAlunos);
        console.log(this.rsAlunos)

    }
    private geraCsv (dados : rsAlunoInterface[]){
        const options = { 
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true, 
            showTitle: true,
            title: ' bomba',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
            
          };
         
        const csvExporter = new ExportToCsv(options);
         
        csvExporter.generateCsv(dados);
    }


}