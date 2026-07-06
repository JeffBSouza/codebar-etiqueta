// LÓGICA DE CONTROLE DAS ABAS
function switchTab(event, tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.currentTarget.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// INTEGRAÇÃO COM AS SUAS FUNÇÕES ORIGINAIS
function processar() {
    // [COLE AQUI O SEU CÓDIGO INTERNO ORIGINAL DA FUNÇÃO PROCESSAR]
    // Abaixo uma simulação apenas para manter a execução visual ativa:
    const codigo = document.getElementById('codigo').value;
    document.getElementById('resProd').innerText = codigo || "-";
    document.getElementById('resCodInf').innerText = document.getElementById('codInformado').value || "-";
}

function limparCampos() {
    // [COLE AQUI O SEU CÓDIGO INTERNO ORIGINAL DA FUNÇÃO LIMPAR]
    document.getElementById('codigo').value = '';
    document.getElementById('codInformado').value = '';
    document.getElementById('iniProd').value = '';
    document.getElementById('tamProd').value = '';
    document.getElementById('iniPreco').value = '';
    document.getElementById('tamPreco').value = '';
    document.getElementById('resProd').innerText = '-';
    document.getElementById('resPreco').innerText = '-';
    document.getElementById('resCodInf').innerText = '-';
}


// LÓGICA DA NOVA ABA (CALCULA PESO/PREÇO ITEM KG)
const pesoProd = document.getElementById('pesoProd');
const precoKg = document.getElementById('precoKg');
const precoFinalInput = document.getElementById('precoFinalInput');
const tolGeral = document.getElementById('tolGeral');
const tolItem = document.getElementById('tolItem');

// Escuta as alterações em tempo real em qualquer input da nova aba
const inputsCalculo = [pesoProd, precoKg, precoFinalInput, tolGeral, tolItem];
inputsCalculo.forEach(input => {
    input.addEventListener('input', executarCalculosDinamicos);
});

function executarCalculosDinamicos() {
    const P = parseFloat(pesoProd.value);
    const K = parseFloat(precoKg.value);
    const F = parseFloat(precoFinalInput.value);
    const TG = parseFloat(tolGeral.value);
    const TI = parseFloat(tolItem.value);

    // 1. CALCULO GERA PREÇO
    const blocoPreco = document.getElementById('bloco-gera-preco');
    const resPreco = document.getElementById('resGeraPreco');
    if (!isNaN(P) && !isNaN(K) && P > 0 && K > 0) {
        const resultado = P * K;
        resPreco.innerHTML = `Peso * Preço do KG = R$ ${resultado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        blocoPreco.classList.remove('cloudy');
    } else {
        blocoPreco.classList.add('cloudy');
    }

    // 2. CALCULO GERA PESO (Executado automaticamente)
    const blocoPeso = document.getElementById('bloco-gera-peso');
    const resPeso = document.getElementById('resGeraPeso');
    if (!isNaN(F) && !isNaN(K) && F > 0 && K > 0) {
        const resultado = F / K;
        resPeso.innerHTML = `Preço Final / Preço KG = Peso (${resultado.toFixed(3).replace('.', ',')} kg)`;
        blocoPeso.classList.remove('cloudy');
    } else {
        blocoPeso.classList.add('cloudy');
    }

    // 3. TOLERANCIA PRODUTO (GERAL)
    const blocoTolGeral = document.getElementById('bloco-tol-geral');
    const resTolGeral = document.getElementById('resTolGeral');
    if (!isNaN(TG) && !isNaN(P) && P > 0) {
        const pesoMaxGeral = P * (1 + TG / 100);
        resTolGeral.innerHTML = `Tolerância Geral (${TG}%) + Peso Produto = Peso aceito: ${pesoMaxGeral.toFixed(3).replace('.', ',')} kg`;
        blocoTolGeral.classList.remove('cloudy');
    } else {
        blocoTolGeral.classList.add('cloudy');
    }

    // 4. TOLERANCIA PRODUTO (ITEM)
    const blocoTolItem = document.getElementById('bloco-tol-item');
    const resTolItem = document.getElementById('resTolItem');
    if (!isNaN(TI) && !isNaN(P) && P > 0) {
        const pesoMaxItem = P * (1 + TI / 100);
        resTolItem.innerHTML = `Tolerância Item (${TI}%) + Peso Produto = Peso aceito: ${pesoMaxItem.toFixed(3).replace('.', ',')} kg`;
        blocoTolItem.classList.remove('cloudy');
    } else {
        blocoTolItem.classList.add('cloudy');
    }
}
