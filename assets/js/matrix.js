/**
 * Classe responsável pelo controle da matriz utilizada na rede neural
 * @todo em desenvolvimento
 * @param {number} rows quantidade de linhas
 * @param {number} columns quantidade de colunas
 * @author Bruno Nascimento <robertbrunotrabalho@gmail.com>
 */
class Matrix {
    constructor(rows = new Number, cols = new Number) {
        this.rows = rows;
        this.cols = cols;
        this.data = [];
        this.init();
    }
    /**
     * Cria a matriz a partir das linhas e colunas, com valores 0
     * @returns void
     */
    init = () => {
        let arr = [];
        for (let i = 0; i < this.rows; i++) {
            arr[i] = [];
            for (let j = 0; j < this.cols; j++) {
                arr[i][j] = 0;
            }
        }

        this.data = arr;
    }
    /**
     * Cria a matriz a partir das linhas e colunas, com valores randomicos
     * @returns void
     */
    randomize = () => {
        for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < this.data[i].length; j++) {
                this.data[i][j] = (Math.random() * 2 - 1);
            }
        }
    }

    /**
     * Calcula o valor da camada
     * @param {*} camada 
     * @param {*} valores 
     * @returns number
     */
    static calcWeights = (camada, valores) => {
        let soma = 0;
        camada.forEach((peso, j) => {
            valores[j].forEach((valor, k) => {
                soma += peso * valor;
            });
        });
        return soma;
    }

    /**
     * Calcula o valor das camadas
     * @param {*} pesos 
     * @param {*} valores
     * @returns matrix class
     */
    static multiply = (pesos, valores) => {
        if (pesos.cols !== valores.rows) {
            throw new Error('A quantidade de pesos precisa ser correspondente a quantidade de entradas');
        }
        let result = new Matrix(pesos.rows, valores.cols);
        const camadas = pesos.data;
        camadas.forEach((camada, i) => {
            result.data[i][0] = this.calcWeights(camada, valores.data);
        });
        console.log('Pesos adicionados');
        return result;
    }

    /**
     * Adiciona o valor do bias
     * @param {*} n 
     * @returns void
     */
    add = (bias) => {
        const camadas = bias.data;
        camadas.forEach((bias, i) => {
            bias.forEach((valor, j) => {
                this.data[i][j] += valor;
            });
        });
        console.log('Bias adicionado');
    }

    /**
     * Executa uma função ao percorrer a matriz
     * @param {*} func 
     * @returns void
     */
    map = (func) => {
        let camadas = this.data;
        camadas.forEach((camada, i) => {
            camada.forEach((valor, j) => {
                camada[j] = func(valor);
            });
            camadas[i] = camada;
        });

        this.data = camadas;
    }

    /**
     * Transforma um array em matriz de matrizes
     * @param {*} arr 
     * @returns Class
     */
    static fromArray(arr) {
        let m = new Matrix(arr.length, 1);
        for (let i = 0; i < arr.length; i++) {
            m.data[i][0] = arr[i];
        }
        console.log('Matriz simples convertida para matriz de matrizes');
        return m;
    }

    /**
     * Exibe o valor do this.data
     * @returns void
     */
    print = () => console.table(this.data);
}