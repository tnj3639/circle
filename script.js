document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('myCanvas');
    const context = canvas.getContext('2d');
    let isDrawing = false;
    const tasks = []; // 할 일 목록을 저장하는 배열

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

    const addTaskBtn = document.getElementById('addTaskBtn');
    addTaskBtn.addEventListener('click', addTask);

    function draw(e) {
        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop;

        context.clearRect(0, 0, canvas.width, canvas.height);

        drawNumbers(); // 숫자를 그리는 함수 호출

        // 각 할 일을 동그라미에 표시
        for (let i = 0; i < tasks.length; i++) {
            context.beginPath();
            context.arc(canvas.width / 2, canvas.height / 2, 20, 0, 2 * Math.PI);
            context.fillStyle = '#FFFF00'; // 노란색으로 설정
            context.fill();
            context.stroke();

            // 숫자를 중앙에 표시
            context.fillStyle = '#000';
            context.font = '12px Arial';
            context.fillText(i.toString(), canvas.width / 2 - 5, canvas.height / 2 + 4);
        }
    }

    function drawNumbers() {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        for (let i = 0; i <= 23; i++) {
            const angle = (i / 24) * (2 * Math.PI);
            const radius = canvas.width / 2 - 20;

            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            context.fillStyle = '#000';
            context.font = '12px Arial';
            context.fillText(i.toString(), x, y);
        }
    }

    function addTask() {
        const taskInput = document.getElementById('taskInput');
        const taskList = document.getElementById('taskList');
        const taskText = taskInput.value;

        if (taskText.trim() !== '') {
            tasks.push(taskText);

            // 할 일 목록을 화면에 표시
            const taskItem = document.createElement('li');
            taskItem.textContent = taskText;
            taskList.appendChild(taskItem);

            taskInput.value = ''; // 입력 폼 초기화

            // 할 일을 추가하면 동그라미에 반영
            draw();
        }
    }

    function exportCanvasAsJpg() {
        html2canvas(canvas).then((canvasImg) => {
            const imgData = canvasImg.toDataURL('image/jpeg');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'task_list.jpg';
            link.click();
        });
    }
});
