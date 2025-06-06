const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const textInput = document.getElementById('text');
const patternInput = document.getElementById('pattern');

let text, pattern;

function startVisualization() {
    text = textInput.value;
    pattern = patternInput.value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    visualizeBruteForce();
}

function drawText() {
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';

    for (let i = 0; i < text.length; i++) {
        ctx.fillText(text[i], 50 + i * 20, 50);
    }

    for (let j = 0; j < pattern.length; j++) {
        ctx.fillText(pattern[j], 50 + j * 20, 100);
    }
}

function drawComparison(index) {
    ctx.clearRect(0, 70, canvas.width, 30);  // Clear previous comparison
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'red';

    for (let i = 0; i < pattern.length; i++) {
        if (text[index + i] === pattern[i]) {
            ctx.fillStyle = 'green';
        } else {
            ctx.fillStyle = 'red';
        }
        ctx.fillText(pattern[i], 50 + (index + i) * 20, 100);
    }
}

async function visualizeBruteForce() {
    drawText();
    for (let i = 0; i <= text.length - pattern.length; i++) {
        drawComparison(i);
        await new Promise(r => setTimeout(r, 500)); // Wait 500ms for visualization
        let match = true;
        for (let j = 0; j < pattern.length; j++) {
            if (text[i + j] !== pattern[j]) {
                match = false;
                break;
            }
        }
        if (match) {
            ctx.fillStyle = 'blue';
            for (let k = 0; k < pattern.length; k++) {
                ctx.fillText(pattern[k], 50 + (i + k) * 20, 100);
            }
            break;
        }
    }
}
