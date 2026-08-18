/*
 * 站点浮动导航：回到主页 + 收藏本站
 * 由 my-website 全站共用，注入到每个 HTML 的 </body> 前。
 * - 非主页显示「← 回到主页」（链接 index.html）
 * - 所有页面显示「★ 收藏本站」（浏览器禁止 JS 直接加书签，故点击弹出 Ctrl/Cmd+D 提示）
 */
(function () {
  // 1) 注入样式（自包含，不依赖外部 CSS）
  var css = [
    '.sn-bar{position:fixed;right:18px;bottom:18px;display:flex;flex-direction:column;gap:10px;z-index:9999}',
    '.sn-btn{display:inline-flex;align-items:center;gap:6px;background:#0a66c2;color:#fff;border:0;border-radius:999px;',
    '  padding:11px 16px;font-size:14px;font-weight:600;cursor:pointer;box-shadow:0 4px 14px rgba(10,102,194,.35);',
    '  text-decoration:none;font-family:inherit;line-height:1;transition:.15s ease}',
    '.sn-btn:hover{background:#095396;transform:translateY(-2px)}',
    '.sn-btn.star{background:#0e7c66}',
    '.sn-btn.star:hover{background:#0b6654}',
    '.sn-toast{position:fixed;left:50%;bottom:90px;transform:translateX(-50%) translateY(8px);background:#1f2329;color:#fff;',
    '  padding:12px 18px;border-radius:10px;font-size:14px;z-index:10000;box-shadow:0 6px 20px rgba(0,0,0,.3);',
    '  opacity:0;transition:.25s ease;pointer-events:none;max-width:92vw;text-align:center;line-height:1.7}',
    '.sn-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}',
    '.sn-toast kbd{background:#3a3f47;border-radius:5px;padding:2px 7px;font-family:inherit;font-size:13px;margin:0 2px}',
    '@media (max-width:520px){.sn-btn{padding:10px 13px;font-size:13px}.sn-bar{right:12px;bottom:12px}}'
  ].join('\n');
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  // 2) 判断是否为首页（/ 或 /index.html 或 file://.../index.html）
  var isHome = /(^|\/)(index\.html)?$/.test(location.pathname);

  // 3) 浮动按钮栏
  var bar = document.createElement('div');
  bar.className = 'sn-bar';

  if (!isHome) {
    var home = document.createElement('a');
    home.className = 'sn-btn';
    home.href = 'index.html';
    home.innerHTML = '← 回到主页';
    bar.appendChild(home);
  }

  var star = document.createElement('button');
  star.className = 'sn-btn star';
  star.type = 'button';
  star.innerHTML = '★ 收藏本站';
  star.addEventListener('click', function () {
    var url = 'https://ai-chin-a.space';
    var title = document.title || '至强 CPU 参数库';
    // 旧版 IE/Edge 支持 AddFavorite；现代浏览器会失败，落到提示
    try {
      if (window.external && typeof window.external.AddFavorite === 'function') {
        window.external.AddFavorite(url, title);
        return;
      }
    } catch (e) { /* 忽略，走下面的提示 */ }
    var isMac = /mac|iphone|ipad|ipod/i.test(navigator.platform || navigator.userAgent);
    var hotkey = isMac
      ? '<kbd>⌘</kbd>+<kbd>D</kbd>'
      : '<kbd>Ctrl</kbd>+<kbd>D</kbd>';
    showToast('按 ' + hotkey + ' 将 <b>' + url + '</b> 加入收藏夹');
  });
  bar.appendChild(star);

  document.body.appendChild(bar);

  // 4) 提示 toast
  var toast;
  function showToast(html) {
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'sn-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = html;
    // 强制重绘以触发过渡
    void toast.offsetWidth;
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () {
      toast.classList.remove('show');
    }, 3800);
  }
})();
