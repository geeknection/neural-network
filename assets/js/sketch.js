function setup() {
    createCanvas(500, 500);
    background(0);

    //Exemplo: vamos verificar se uma pessoa gosta de animes ou não
    //@todo 1 corresponde a gosta de animes, 0 corresponde à não gosta de animes
    let inputs = [1, 0];//valores para calcular
    let nn = new NeuralNetwork(2, 3, 1);
    nn.feedfoward(inputs);
}

function draw() {

}