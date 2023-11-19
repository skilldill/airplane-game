const container = document.getElementById('container');

export function initResult(scores) {
    container.innerHTML = `
        <div class="resultScreen">
            <h2>Вы пролетели ${scores} миль</h2>
            <a href="/">
                <button>Играть снова</button>
            </a>
        </div>
    `
}