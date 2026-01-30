// logic_v2.js - Structured Array Sync Module
function start_shogi_analysis(container) {
    let syncRate = 1;
    container.innerHTML = `
        <div style="background:#eee; padding:5px; font-size:11px; border:1px solid #ccc;">
            DATA_SYNC_RATE: <input type="range" min="1" max="3" value="1" onchange="window.syncR=this.value">
        </div>
        <div id="array-grid" style="display:grid; grid-template-columns:repeat(9, 32px); background:#f9f9f9; border:1px solid #999; margin-top:5px;"></div>
    `;

    const grid = document.getElementById('array-grid');
    let nodes = Array.from({length: 9}, () => Array(9).fill(''));
    // 初期化 (小文字=CPU, 大文字=USER)
    nodes[0] = ['l','n','s','g','k','g','s','n','l'];
    nodes[2] = Array(9).fill('p');
    nodes[6] = Array(9).fill('P');
    nodes[8] = ['L','N','S','G','K','G','S','N','L'];

    function syncUI() {
        grid.innerHTML = '';
        nodes.forEach((row, r) => row.forEach((val, c) => {
            const cell = document.createElement('div');
            cell.style = `width:32px;height:32px;border:0.5px solid #ccc;text-align:center;line-height:32px;font-size:12px;cursor:pointer;background:${val===''?'#fff':'#eef'}`;
            cell.style.color = (val && val === val.toLowerCase()) ? '#a00' : '#000';
            cell.innerText = val ? `[${val.toUpperCase()}]` : '';
            cell.onclick = () => {
                if(window.ptr) {
                    nodes[r][c] = nodes[window.ptr.r][window.ptr.c];
                    nodes[window.ptr.r][window.ptr.c] = '';
                    window.ptr = null;
                    syncUI();
                    setTimeout(autoCompute, 500);
                } else if(nodes[r][c] !== '' && nodes[r][c] === nodes[r][c].toUpperCase()) {
                    window.ptr = {r, c};
                }
            };
            grid.appendChild(cell);
        }));
    }

    function autoCompute() {
        // 簡易演算ロジック
        const cpuNodes = [];
        nodes.forEach((row, r) => row.forEach((v, c) => { if (v !== '' && v === v.toLowerCase()) cpuNodes.push({r, c}); }));
        const p = cpuNodes[Math.floor(Math.random() * cpuNodes.length)];
        if(p.r + 1 < 9) {
            nodes[p.r+1][p.c] = nodes[p.r][p.c];
            nodes[p.r][p.c] = '';
        }
        syncUI();
    }
    syncUI();
}
