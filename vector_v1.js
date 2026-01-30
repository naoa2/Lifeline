// ベクトル衝突解析モジュール (Vector Collision)
function start_vector_analysis(container, isDual) {
    container.innerHTML = '<canvas id="vc" width="400" height="300" style="border:2px solid cyan; background:#000;"></canvas>';
    const canvas = document.getElementById('vc');
    const ctx = canvas.getContext('2d');
    
    let b = {x:200, y:150, vx:3, vy:3}; // ボール
    let p1 = 120, p2 = 120; // パドル位置

    function loop() {
        ctx.fillStyle = '#000'; ctx.fillRect(0,0,400,300);
        ctx.fillStyle = '#fff';
        ctx.fillRect(10, p1, 10, 60); // Player 1
        ctx.fillRect(380, p2, 10, 60); // Player 2 / CPU
        ctx.fillRect(b.x, b.y, 8, 8); // Ball

        b.x += b.vx; b.y += b.vy;
        if(b.y<0 || b.y>290) b.vy *= -1;
        if(b.x<20 && b.y>p1 && b.y<p1+60) b.vx *= -1.1;
        if(b.x>370 && b.y>p2 && b.y<p2+60) b.vx *= -1.1;
        if(b.x<0 || b.x>400) { b.x=200; b.y=150; b.vx=3; }
        
        // CPUの動き (isDualがfalseの時だけ自動追従)
        if(!isDual) p2 += (b.y - (p2+30)) * 0.1;

        requestAnimationFrame(loop);
    }
    loop();
}
