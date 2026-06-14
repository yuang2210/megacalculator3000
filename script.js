const botao = document.getElementById("btn-calcular");
const input = document.getElementById("abcdefghjklmnop");
const resultado = document.getElementById("resultado");

function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { let t = b; b = a % b; a = t; }
    return a;
}

function decimalParaFracao(decimal) {
    if (decimal === 0) return [0, 1];

 const MAX_DEN = 20;
    const PRECISAO = 1e-8;
    

    let h0 = 1, h1 = a;
    let k0 = 0, k1 = 1;

    while (x > 1e-10 && k1 < 1000) {
        x = 1 / x;
        a = Math.floor(x);
        x = x - a;

        const h2 = a * h1 + h0;
        const k2 = a * k1 + k0;

        if (k2 > 1000) break;

        h0 = h1; h1 = h2;
        k0 = k1; k1 = k2;
    }

    return [h1, k1];
}

botao.addEventListener("click", function () {
    const valor = input.value.trim();

    if (valor.includes("/")) {
        const partes = valor.split("/");
        const num = parseInt(partes[0]);
        const den = parseInt(partes[1]);

        if (isNaN(num) || isNaN(den) || den === 0) {
            resultado.textContent = "Resultado: fração inválida";
            return;
        }

        const fracao = num / den;

        if (fracao < 0) {
            resultado.textContent = "Resultado: número negativo, sem raiz real";
            return;
        }

        const decimal = Math.sqrt(fracao);
        const [fn, fd] = decimalParaFracao(decimal);
        const frStr = fd === 1 ? String(fn) : fn + "/" + fd;

        resultado.textContent = "Resultado: " + frStr + " ≈ " + decimal.toFixed(4);

    } else if (parseFloat(valor) < 0) {
        resultado.textContent = "Resultado: número negativo, sem raiz real";

    } else {
        const numero = parseFloat(valor);
        if (isNaN(numero)) {
            resultado.textContent = "Resultado: entrada inválida";
            return;
        }
        const decimal = Math.sqrt(numero);
        const [fn, fd] = decimalParaFracao(decimal);
        const frStr = fd === 1 ? String(fn) : fn + "/" + fd;
        resultado.textContent = "Resultado: " + frStr + " ≈ " + decimal.toFixed(4);
    }
});
