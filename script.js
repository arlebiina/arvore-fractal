const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

let startX = canvas.width / 2;
let startY = canvas.height * 0.9;
let scala = 1.0;
let mouseX = 0;
let mouseY = 0;

// Inicializa o desenho
Desenhar();

function drawBranch(x, y, length, angle, level, reduction, branchAngle) {
    if (level === 0) return;

    const rad = angle * Math.PI / 180;
    const x2 = x + length * Math.cos(rad);
    const y2 = y - length * Math.sin(rad);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = level;
    ctx.stroke();

    drawBranch(x2, y2, length * reduction, angle - branchAngle, level - 1, reduction, branchAngle);
    drawBranch(x2, y2, length * reduction, angle + branchAngle, level - 1, reduction, branchAngle);
}

function Desenhar() {
    const nivel = parseInt(document.getElementById("nivel").value);
    const angulo = parseFloat(document.getElementById("angulo").value);
    const fator = parseFloat(document.getElementById("fator").value);

    // Limpa o canvas e reseta transformações antes de desenhar
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Aplica a escala global
    ctx.scale(scala, scala);
    ctx.strokeStyle = "#00f";

    const length = 100;
    drawBranch(startX / scala, startY / scala, length, 90, nivel, fator, angulo);
}

// --- Funções de Controle ---

function Origem() {
    startX = canvas.width / 2;
    startY = canvas.height * 0.9;
    Desenhar();
}

function Apply() {
    scala = parseFloat(document.getElementById('scala').value);
    Desenhar();
}

function Plus() {
    scala = parseFloat(document.getElementById('scala').value);
    if (scala < 20) {
        scala = parseFloat((scala + 0.1).toFixed(1));
        document.getElementById('scala').value = scala;
        Desenhar();
    }
}

function Less() {
    scala = parseFloat(document.getElementById('scala').value);
    if (scala > 0.6) {
        scala = parseFloat((scala - 0.1).toFixed(1));
        document.getElementById('scala').value = scala;
        Desenhar();
    }
}

// --- Eventos de Mouse (Pan/Arraste) ---

canvas.addEventListener("mousedown", function (e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

canvas.addEventListener("mouseup", function (e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX_end = e.clientX - rect.left;
    const mouseY_end = e.clientY - rect.top;

    // Atualiza a posição inicial baseada no deslocamento do mouse
    startX += (mouseX_end - mouseX);
    startY += (mouseY_end - mouseY);
    
    Desenhar();
});

// --- Salvar Imagem ---

document.getElementById('btnSalvar').addEventListener('click', () => {
    const imagem = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imagem;
    link.download = 'arvore_fractal.png';
    link.click();
});
