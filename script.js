function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const timeCircle = document.getElementById('time-circle');
        const segments = document.querySelectorAll('.segment');

        const taskSegment = document.createElement('div');
        taskSegment.className = 'segment';
        taskSegment.style.background = getRandomColor();

        const startTime = prompt('시작 시간을 입력하세요 (0부터 23까지)');
        const endTime = prompt('종료 시간을 입력하세요 (0부터 23까지)');

        if (startTime >= 0 && endTime <= 23 && startTime < endTime) {
            const startDegree = (startTime / 24) * 360;
            const endDegree = (endTime / 24) * 360;

            taskSegment.style.transform = `rotate(${startDegree}deg)`;
            taskSegment.style.width = `${endDegree - startDegree}deg`;

            taskSegment.innerText = taskText;
            timeCircle.appendChild(taskSegment);
        } else {
            alert('올바른 시간을 입력하세요.');
        }

        taskInput.value = '';
    } else {
        alert('할 일을 입력하세요.');
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
