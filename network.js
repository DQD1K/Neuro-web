class neuralNetwork {
    constructor() {

    this.maxsize = 8;

    this.neuron = new Array(this.maxsize).fill().map(() => new Array(this.maxsize).fill(0.0));
    this.weight = new Array(this.maxsize).fill().map(() => new Array(this.maxsize).fill().map(() => new Array(this.maxsize).fill(0.0)));
    this.addb = new Array(this.maxsize).fill().map(() => new Array(this.maxsize).fill(0.0));

    this.active_layers = 4;
    this.active_neurons = [4, 4, 4, 3, 0, 0, 0, 0];

    this.func_activ = "sigm";

    this.lr = 0.500;
    }

    abs(x)
    {
        if (x >= 0) return x;
        else return -x;
    }
    
    sigm(x) {
        return 1 / (1 + Math.exp(-x));
    }
    
    pr_sigm(x) {
        return x * (1 - x);
    }
    
    tanh(x) {
        return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
    }
    
    pr_tanh(x) {
        return 1 - Math.pow(this.tanh(x), 2);
    }
    
    relu(x) {
        return Math.max(0, x);
    }
    
    pr_relu(x) {
        return x > 0 ? 1 : 0;
    }
    
    actv_function(x)
    {
        if (this.func_activ == "sigm") return this.sigm(x);
        if (this.func_activ == "tanh") return this.tanh(x);
        if (this.func_activ == "relu") return this.relu(x);
    }

    pr_actv_function(x)
    {
        if (this.func_activ == "sigm") return this.pr_sigm(x);
        if (this.func_activ == "tanh") return this.pr_tanh(x);
        if (this.func_activ == "relu") return this.pr_relu(x);
    }
    
    randomize()
    {
        for (var i = 0; i < this.maxsize; i++)
        {
            for (var j = 0; j < this.maxsize; j++)
            {
                for (var k = 0; k < this.maxsize; k++)
                {
                    this.weight[i][j][k] = (Math.random() * 10.0)-5.0;
                    this.addb[i][j] = (Math.random() * 10.0)-5.0;
                }
            }
        }
    }
    
    iteration(input) {
        for (let i = 0; i < this.active_layers - 1; i++) {
            for (let j = 0; j < this.active_neurons[i + 1]; j++) {
                let sum = 0;
                for (let k = 0; k < this.active_neurons[i]; k++) {
                    sum += input[k] * this.weight[i][k][j];
                }
                this.neuron[i + 1][j] = this.actv_function(sum + this.addb[i][j]);
            }
            input = this.neuron[i + 1];
        }
        return input;
    }
    
    learn(input, target) {
        let error = target.map((value, index) => value - this.neuron[this.active_layers - 1][index]);
        for (let i = this.active_layers - 1; i > 0; i--) {
            let weights_delta = error.map((value, index) => value * this.pr_actv_function(this.neuron[i][index]));
            let new_error = new Array(this.active_neurons[i - 1]).fill(0);
            for (let j = 0; j < this.active_neurons[i]; j++) {
                for (let k = 0; k < this.active_neurons[i - 1]; k++) {
                    this.weight[i - 1][k][j] += this.lr * weights_delta[j] * this.neuron[i - 1][k];
                    new_error[k] += weights_delta[j] * this.weight[i - 1][k][j];
                }
                this.addb[i - 1][j] += this.lr * weights_delta[j];
            }
            error = new_error;
        }
    }

    do_bool(x)
    {
        if (x >= 0.5) return 1;
        else return 0;
    }
    
    get_error(input,target)
    {
    let error = 0.0;

    for (let i = 0; i < target.length; i++)
    {
        let result = this.iteration(input[i]);
        for (let j = 0; j < target[i].length; j++)
        {
            error += Math.abs(result[j] - target[i][j]);
        }
    }
    
    return error/input.length;
    }

    normal_output(output) 
    {
        return output.slice(0, this.active_neurons[this.active_layers-1]);
    }
    
    }
    
    let network = new neuralNetwork();
    
    network.randomize();
    
    let I = [
    [0, 0, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
    [0, 0, 1, 1],
    [0, 1, 0, 0],
    [0, 1, 0, 1],
    [0, 1, 1, 0],
    [0, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 1],
    [1, 0, 1, 0],
    [1, 0, 1, 1],
    [1, 1, 0, 0],
    [1, 1, 0, 1],
    [1, 1, 1, 0],
    [1, 1, 1, 1]
    ];
    
    //чётное?
    //делится на три?
    //x или y и (не(w) или z)
    let O = [
    [0,1,0],
    [1,0,0],
    [0,0,0],
    [1,1,0],
    [0,0,1],
    [1,0,0],
    [0,1,1],
    [1,0,1],
    [0,0,1],
    [1,1,1],
    [0,0,1],
    [1,0,1],
    [0,1,1],
    [1,0,1],
    [0,0,1],
    [1,1,1]
    ];

    for (let i = 0; i < I.length; i++) {
        console.log(network.normal_output(network.iteration(I[i])));
        }
    console.log(network.get_error(I,O));
    console.log();
    
    for (let epoch = 0; epoch < 1000; epoch++) {
    for (let i = 0; i < I.length; i++) {
    let input = I[i];
    let target = O[i];
    let output = network.iteration(input);
    network.learn(input, target);
    }
    }
    
    for (let i = 0; i < I.length; i++) {
        console.log(network.normal_output(network.iteration(I[i])));
        }
    console.log(network.get_error(I,O));
    console.log();
