// ===== GET CANVAS =====
const inputCanvas = document.getElementById("inputCanvas");
const outputCanvas = document.getElementById("outputCanvas");

const inCtx = inputCanvas.getContext("2d");
const outCtx = outputCanvas.getContext("2d");

// ===== DRAW GRID =====
function drawGrid(ctx, canvas) {
    ctx.strokeStyle = "#333";

    for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// ===== AXES =====
function drawAxes(ctx, canvas) {
    ctx.strokeStyle = "#888";

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);

    ctx.moveTo(50, 0);
    ctx.lineTo(50, canvas.height);

    ctx.stroke();
}

// ===== SIGNAL FUNCTION =====
function signal(t, type, A, f, p) {
    switch(type) {
        case "sine": return A * Math.sin(f * t + p);
        case "square": return A * Math.sign(Math.sin(f * t));
        case "triangle": return A * (2/Math.PI) * Math.asin(Math.sin(f*t));
        case "sawtooth": return A * (t % (2*Math.PI));
        case "step": return t >= 0 ? A : 0;
        case "impulse": return Math.abs(t) < 0.05 ? A * 10 : 0;
        case "exp": return A * Math.exp(-t);
        case "dc": return A;
        default: return 0;
    }
}

// ===== CLEAR + DRAW BASE =====
function resetCanvas(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas);
    drawAxes(ctx, canvas);
}

// ===== PLOT INPUT SIGNALS =====
function plot() {

    resetCanvas(inCtx, inputCanvas);

    // ✅ GET ELEMENTS PROPERLY
    let A1 = +document.getElementById("amp").value;
    let f1 = +document.getElementById("freq").value * 
             +document.getElementById("unit").value;
    let p1 = +document.getElementById("phase").value;
    let t1 = document.getElementById("wave").value;

    let A2 = +document.getElementById("amp2").value;
    let f2 = +document.getElementById("freq2").value;
    let p2 = +document.getElementById("phase2").value;
    let t2 = document.getElementById("wave2").value;

    // ===== SIGNAL 1 =====
    inCtx.beginPath();

    for (let x = 0; x < inputCanvas.width; x++) {
        let t = (x - 50) * 0.02;
        let y = signal(t, t1, A1, f1, p1);
        inCtx.lineTo(x, inputCanvas.height/2 - y*20);
    }

    inCtx.strokeStyle = "#00d4ff";
    inCtx.stroke();

    // ===== SIGNAL 2 =====
    inCtx.beginPath();

    for (let x = 0; x < inputCanvas.width; x++) {
        let t = (x - 50) * 0.02;
        let y = signal(t, t2, A2, f2, p2);
        inCtx.lineTo(x, inputCanvas.height/2 - y*20);
    }

    inCtx.strokeStyle = "#00ff88";
    inCtx.stroke();
}
   function drawGrid(ctx, canvas) {

    ctx.strokeStyle = "#333";

    for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function drawAxes(ctx, canvas) {

    ctx.strokeStyle = "#888";

    ctx.beginPath();
    ctx.moveTo(0, canvas.height/2);
    ctx.lineTo(canvas.width, canvas.height/2);

    ctx.moveTo(50, 0);
    ctx.lineTo(50, canvas.height);

    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.fillText("Time →", canvas.width - 60, canvas.height/2 - 10);
    ctx.fillText("Amplitude ↑", 60, 20);
}
let legend = document.getElementById("legend");
legend.innerHTML = "";

let colors = ["#00d4ff", "#00ff88", "#ff4444", "#ffaa00", "#bb86fc"];
let colorIndex = 0;
let color = colors[colorIndex % colors.length];
ctx.strokeStyle = color;
ctx.stroke();

legend.innerHTML += `<span style="color:${color}">Signal ${i}</span> `;
colorIndex++;

// ===== CONVOLUTION =====
function convolution() {

    resetCanvas(outCtx, outputCanvas);

    let x = [];
    let h = [];
    let y = [];

    let A1 = +amp.value;
    let f1 = +freq.value;
    let p1 = +phase.value;
    let t1 = wave.value;

    let A2 = +amp2.value;
    let f2 = +freq2.value;
    let p2 = +phase2.value;
    let t2 = wave2.value;

    // Generate signals
    for (let i = 0; i < 200; i++) {
        let t = i * 0.05;
        x[i] = signal(t, t1, A1, f1, p1);
        h[i] = signal(t, t2, A2, f2, p2);
    }
    let ctx = outputCanvas.getContext("2d");
ctx.clearRect(0,0,400,250);

drawGrid(ctx, outputCanvas);
drawAxes(ctx, outputCanvas);

    // Convolution
    for (let n = 0; n < 200; n++) {
        y[n] = 0;
        for (let k = 0; k < n; k++) {
            y[n] += x[k] * h[n - k];
        }
    }

    // Plot result (purple)
    outCtx.beginPath();

    for (let i = 0; i < y.length; i++) {
        outCtx.lineTo(i*2, outputCanvas.height/2 - y[i]*10);
    }

    outCtx.strokeStyle = "#bb86fc";
    outCtx.stroke();
}