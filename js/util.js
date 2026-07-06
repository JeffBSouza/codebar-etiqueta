function copiarTextoValue(elementId) {
    const element = document.getElementById(elementId);
    if (!element || element.innerText === '—') return;
    let rawText = element.innerText.replace('R$', '').replace('Kg', '').trim();
    navigator.clipboard.writeText(rawText).then(() => {
        alert('Copiado para a área de transferência: ' + rawText);
    });
}
function copiarElementoText(elementId) {
    const element = document.getElementById(elementId);
    if (!element || element.innerText === '—') return;
    navigator.clipboard.writeText(element.innerText.trim()).then(() => {
        alert('Copiado: ' + element.innerText.trim());
    });
}