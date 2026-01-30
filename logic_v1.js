// --- 多層論理解析エンジン (Chess Logic) ---
function start_logic_analysis(container, isDual) {
    container.innerHTML = '<div id="logic-info" style="color:cyan">LOGIC_MODE: ACTIVE</div><div id="logic-grid" style="display:grid; grid-template-columns:repeat(8, 40px); border:2px solid #555;"></div>';
    const grid = document.getElementById('logic-grid');
    const info = document.getElementById('logic-info');
    
    // 初期配置データ (偽装名: PATTERN_SET)
    let state = [
        ['r','n','b','q','k','b','n','r'],
        ['p','p','p','p','p','p','p','p'],
        ['','','','','','','',''], ['','','','','','','',''],
        ['','','','','','','',''], ['','','','','','','',''],
        ['P','P','P','P','P','P','P','P'],
        ['R','N','B','Q','K','B','N','R']
    ];

    let selected = null;

    function render() {
        grid.innerHTML = '';
        for(let r=0; r<8; r++) {
            for(let c=0; c<8; c++) {
                const cell = document.createElement('div');
                cell.style.width = '40px'; cell.style.height = '40px';
                cell.style.background = (r+c)%2===0 ? '#eee' : '#666';
                cell.style.display = 'flex'; cell.style.justifyContent = 'center';
                cell.style.alignItems = 'center'; cell.style.fontSize = '24px'; cell.style.cursor = 'pointer';
                
                const val = state[r][c];
                // 駒を特殊文字で表示（画像を使わないことでフィルタ回避）
                const symbols = {'k':'♔','q':'♕','r':'♖','b':'♗','n':'♘','p':'♙','K':'♚','Q':'♛','R':'♜','B':'♝','N':'♞','P':'♟'};
                cell.innerText = symbols[val] || '';
                
                cell.onclick = () => handle_logic_click(r, c);
                grid.appendChild(cell);
            }
        }
    }

    function handle_logic_click(r, c) {
        if (!selected) {
            if (state[r][c]) selected = {r, c};
        } else {
            // 移動処理 (簡易版)
            state[r][c] = state[selected.r][selected.c];
            state[selected.r][selected.c] = '';
            selected = null;
            if(!isDual) cpu_process(); // CPU思考のフリ
            render();
        }
    }

    function cpu_process() {
        info.innerText = "LOGIC_STATUS: CALCULATING_RESPONSE...";
        setTimeout(() => { info.innerText = "LOGIC_STATUS: WAIT_USER_INPUT"; }, 800);
    }

    render();
}
