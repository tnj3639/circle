document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('myCanvas');
    const context = canvas.getContext('2d');
    let isDrawing = false;

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        draw(e);
    });

    canvas.addEventListener('mousemove', (e) => {
        if (isDrawing) {
            draw(e);
        }
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
        context.beginPath();
    });

    const exportBtn = document.getElementById('exportBtn');
    exportBtn.addEventListener('click', exportCanvasAsJpg);

    function draw(e) {
        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop;

        context.lineWidth = 2;
        context.lineCap = 'round';
        context.strokeStyle = '#000';

        context.lineTo(x, y);
        context.stroke();
        context.beginPath();
        context.moveTo(x, y);
    }

    function exportCanvasAsJpg() {
        html2canvas(canvas).then((canvasImg) => {
            const imgData = canvasImg.toDataURL('image/jpeg');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'my_drawing.jpg';
            link.click();
        });
    }
});
