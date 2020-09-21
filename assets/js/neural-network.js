
/**
 * Classe responsável pelo controle da da rede neural
 * @todo em desenvolvimento
 * @param {number} inputs valores de entradas
 * @param {number} hiddens quantidade de camadas ocultas
 * @param {number} outputs quantidade de resultados finais
 * @author Bruno Nascimento <robertbrunotrabalho@gmail.com>
 */
class NeuralNetwork {
    constructor(inputs, hiddens, outputs) {
        this.inputs = inputs;
        this.hiddens = hiddens;
        this.outputs = outputs;

        this.weights_ih = new Matrix(this.hiddens, this.inputs);
        this.weights_ih.randomize();

        this.weights_ho = new Matrix(this.outputs, this.hiddens);
        this.weights_ho.randomize();

        this.bias_h = new Matrix(this.hiddens, 1);
        this.bias_h.randomize();
        this.bias_o = new Matrix(this.outputs, 1);
        this.bias_o.randomize();
    }

    /**
     * Manda oss neurônios de entrada para à camada oculta
     * @param {*} input_arry 
     * @returns matrix class
     */
    inputToHidden = (input_arry) => {
        let inputs = Matrix.fromArray(input_arry);
        let hidden = Matrix.multiply(this.weights_ih, inputs);
        hidden.add(this.bias_h);
        hidden.map(sigmoid);
        return hidden;
    }

    /**
     * Manda os valores da camada oculta para o neurônio de saída
     * @param {*} hidden 
     * @returns matrix class
     */
    hiddenToOutput = (hidden) => {
        let output = Matrix.multiply(this.weights_ho, hidden);
        output.add(this.bias_o);
        output.map(sigmoid);
        return output;
    }

    /**
     * Processo de feedfoward
     * @param {*} input_arry 
     */
    feedfoward = (input_arry) => {
        try {
            const hidden = this.inputToHidden(input_arry);
            console.log('Movendo da camada oculta para a de saída');
            const output = this.hiddenToOutput(hidden);
            console.log('Rede neural finalizada');
            output.print();
        }
        catch (error) {
            console.log('Falha:', error.message);
        }
    }

}