// 行列演算用モジュール (Matrix Logic)
function start_matrix_analysis(container, isDual) {
    const SHAPES = [null, [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]], [[2,0,0],[2,2,2],[0,0,0]], [[0,0,3],[3,3,3],[0,0,0]], [[4,4],[4,4]], [[5,5,0],[0,5,5],[0,0,0]], [[0,6,6],[6,6,0],[0,0,0]], [[0,7,0],[7,7,7],[0,0,0]]];
    const COLORS = [null, '#00d2ff', '#ff8e0d', '#3a47ff', '#ffe138', '#ff007f', '#0dff72', '#f538ff'];

    class MatrixEngine {
        constructor(parent) {
            this.canvas = document.createElement('canvas');
            this.canvas.width = 240; this.canvas.height = 480;
            this.ctx = this.canvas.getContext('2d');
            this.ctx.scale(24, 24);
            this.canvas.style.border = "2px solid #00d2ff";
            parent.appendChild(this.canvas);
            this.grid = Array.from({length: 20}, () => Array(10).fill(0));
            this.pos = {x: 3, y: 0};
            this.active = SHAPES[Math.floor(Math.random()*7)+1];
            this.timer = 0;
            this.run();
        }
        draw() {
            this.ctx.fillStyle = '#000'; this.ctx.fillRect(0,0,10,20);
            this.grid.forEach((r,y)=>r.forEach((v,x)=>{ if(v){this.ctx.fillStyle=COLORS[v]; this.ctx.fillRect(x,y,1,1);}}));
            this.active.forEach((r,y)=>r.forEach((v,x)=>{ if(v){this.ctx.fillStyle=COLORS[v]; this.ctx.fillRect(x+this.pos.x,y+this.pos.y,1,1);}}));
        }
        run() {
            setInterval(() => { this.pos.y++; this.draw(); }, 800);
        }
    }
    container.innerHTML = ''; // 画面クリア
    new MatrixEngine(container);
    if(isDual) new MatrixEngine(container);
}
