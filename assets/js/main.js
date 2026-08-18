// 移动端菜单切换
document.getElementById('navToggle').addEventListener('click', function () {
  document.getElementById('navLinks').classList.toggle('open');
});

// 点击导航链接后自动收起移动端菜单
document.querySelectorAll('.nav-links a').forEach(function (link) {
  link.addEventListener('click', function () {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// 自动填充页脚年份
document.getElementById('year').textContent = new Date().getFullYear();
