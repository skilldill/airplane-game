const container = document.getElementById('container');

export function initResult(scores) {
    container.innerHTML = `
        <div class="resultScreen">
            <h2>Вы пролетели ${scores} миль</h2>
            <button onclick="location.reload()">Играть снова</button>
        </div>
    `
}