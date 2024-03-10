const width = 300;
const height = 300;
const radius = Math.min(width, height) / 2;

const svg = d3.select("#time-circle")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const startTime = prompt('시작 시간을 입력하세요 (0부터 23까지)');
        const endTime = prompt('종료 시간을 입력하세요 (0부터 23까지)');

        if (startTime >= 0 && endTime <= 23 && startTime < endTime) {
            const startAngle = (startTime / 24) * 2 * Math.PI;
            const endAngle = (endTime / 24) * 2 * Math.PI;

            const arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius)
                .startAngle(startAngle)
                .endAngle(endAngle);

            svg.append("path")
                .attr("d", arc)
                .attr("fill", colorScale(Math.random()))
                .append("title")
                .text(taskText);
        } else {
            alert('올바른 시간을 입력하세요.');
        }

        taskInput.value = '';
    } else {
        alert('할 일을 입력하세요.');
    }
}
