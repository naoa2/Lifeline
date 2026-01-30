// latency_test.js - ネットワーク応答速度解析モジュール
function start_latency_analysis(container) {
    container.innerHTML = `
        <div style="color:#666; font-family:monospace; font-size:12px;">
            NETWORK_STRESS_TESTER v1.0<br>
            [STATUS]: <span id="test-status">STANDBY</span><br>
            [BEST_RESPONSE]: <span id="best-res">---</span> ms
        </div>
        <div id="trigger-area" style="width:300px; height:200px; background:#eee; border:2px solid #ccc; margin:10px 0; display:flex; align-items:center; justify-content:center; cursor:pointer; font-weight:bold; user-select:none;">
            CLICK_TO_INITIALIZE_TEST
        </div>
        <div id="logs" style="width:300px; height:100px; background:#f9f9f9; border:1px solid #ddd; overflow-y:auto; font-size:11px; padding:5px; font-family:monospace;">
            --- LATENCY_LOG_STREAM ---
        </div>
    `;

    const area = document.getElementById('trigger-area');
    const status = document.getElementById('test-status');
    const logs = document.getElementById('logs');
    const bestResDisp = document.getElementById('best-res');

    let startTime, timerId;
    let records = [];

    // テスト開始の仕組み
    area.onclick = () => {
        if (status.innerText === 'STANDBY' || status.innerText === 'TEST_COMPLETE') {
            ready();
        } else if (status.innerText === 'WAITING_FOR_SIGNAL') {
            // お手つき（早すぎ）
            clearTimeout(timerId);
            status.innerText = 'SIGNAL_INTERRUPTED';
            area.style.background = '#f8d7da';
            area.innerText = 'TOO_FAST_ERROR';
            setTimeout(ready, 1000);
        } else if (status.innerText === 'SIGNAL_ACTIVE') {
            // 成功（反応）
            const responseTime = Date.now() - startTime;
            finish(responseTime);
        }
    };

    function ready() {
        area.style.background = '#eee';
        area.innerText = 'WAIT_FOR_SIGNAL...';
        status.innerText = 'WAITING_FOR_SIGNAL';
        
        // 2秒〜5秒の間でランダムに信号を出す
        const delay = Math.random() * 3000 + 2000;
        timerId = setTimeout(() => {
            startTime = Date.now();
            area.style.background = '#0dff72';
            area.innerText = '--- RECEIVING_DATA ---';
            status.innerText = 'SIGNAL_ACTIVE';
        }, delay);
    }

    function finish(ms) {
        status.innerText = 'TEST_COMPLETE';
        area.style.background = '#fff';
        area.innerText = `${ms} ms`;
        
        // ランキング（ログ）に追加
        records.push(ms);
        records.sort((a, b) => a - b);
        bestResDisp.innerText = records[0];

        const logEntry = document.createElement('div');
        logEntry.innerText = `[${new Date().toLocaleTimeString()}] RES: ${ms}ms`;
        logs.prepend(logEntry);
    }
}
