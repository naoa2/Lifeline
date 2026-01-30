// 無限計算のフリ
setInterval(() => {
    const div = document.createElement('div');
    div.innerText = `CALC: ${Math.random()} * ${Math.random()} = ${Math.random()}`;
    document.getElementById('calc-log').prepend(div);
}, 100);

// パスワード画面（Ctrl + Shift + 2）
window.addEventListener('keydown', e => {
    if(e.ctrlKey && e.shiftKey && e.key === '2') {
        const p = prompt("ACCESS KEY REQUIRED:");
        if(p === 'asdfghjk') {
            document.body.innerHTML = `
                <h1>ANALYSIS MENU</h1>
                <button onclick="loadModule('data_v1')">1P_MODE</button>
                <button onclick="loadModule('data_v2')">2P_MODE</button>
                <div id="game-stage"></div>
            `;
        }
    }
});

// ゲームを1つずつ読み込む魔法の命令
function loadModule(fileName) {
    const s = document.createElement('script');
    s.src = fileName + '.js'; // data_v1.js などを読み込む
    document.head.appendChild(s);
    // 読み込み終わったらゲームを起動する処理（各ファイルに書く）
}