botao = document.getElementById("btn-calcular");
const input = document.getElementById("abcdefghjklmnop");
const resultado = document.getElementById("resultado");

function gcd(a, b) {
    a = Math.abs(Math.round(a));
    b = Math.abs(Math.round(b));
    while (b) { let t = b; b = a % b; a = t; }
    reconstturn a;
}

function aproximarFracao(decimal) {
    // Algoritmo de frações contínuas — encontra a melhor fração aproximada
    const MAX_DEN = 20;
    const PRECISAO = 1e-8;

    let melhorNum = 1, melhorDen = 1;
    let menorErro = Math.abs(decimal - 1);

    for (let den = 1; den <= MAX_DEN; den++) {
        const num = Math.round(decimal * den);
        const erro = Math.abs(decimal - num / den);
        if (erro < menorErro) {
            menorErro = erro;
            melhorNum = num;
            melhorDen = den;
        }
        if (erro < PRECISAO) break;
    }

    const g = gcd(melhorNum, melhorDen);
    return [melhorNum / g, melhorDen / g];
}

function exibir(decimal) {
    if (isNaN(decimal) || !isFinite(decimal)) {
        return "erro no cálculo";
    }
    const [num, den] = aproximarFracao(decimal);
    const fracao = den === 1 ? String(num) : num + "/" + den;
    return fracao + " ≈ " + decimal.toFixed(4);
}

botao.addEventListener("click", function () {
    const valor = input.value.trim();

    // Fração: ex "3/4", "16/9"
    if (valor.includes("/")) {
        const partes = valor.split("/");
        const num = Number(partes[0]);
        const den = Number(partes[1]);

        if (isNaN(num) || isNaN(den) || den === 0) {
            resultado.textContent = "sua querida resposta🥰🥰🥰: fração inválida";
            return;
        }

        if (num / den < 0) {
            resultado.textContent = "sua querida resposta🥰🥰🥰: número negativo, sem raiz real";
            return;
        }

        resultado.textContent = "sua querida resposta🥰🥰🥰: " + exibir(Math.sqrt(num / den));

    // Número negativo
    } else if (Number(valor) < 0) {
        resultado.textContent = "sua querida resposta🥰🥰🥰: número negativo, sem raiz real";

    // Inteiro ou decimal positivo
    } else {
        const numero = Number(valor);
        if (isNaN(numero)) {
            resultado.textContent = "sua querida resposta🥰🥰🥰: entrada inválida";
            return;
        }
        resultado.textContent = "sua querida resposta🥰🥰🥰: " + exibir(Math.sqrt(numero));
    }
});
