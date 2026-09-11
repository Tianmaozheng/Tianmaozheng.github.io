// violet博客 - 全局导航
// 新增/修改菜单只改这个数组即可，无需动各页面 HTML
const navList = [
    { name: "Home",  file: "index.html" },
    { name: "Blog",  file: "articles.html" },
    { name: "Work",  file: "projects.html" },
    { name: "About", file: "about.html" },
    { name: "Book",  file: "books.html" },
    { name: "Guest", file: "guestbook.html" },
    { name: "AI",    file: "ai_chat.html" },
    { name: "Game",  file: "index.html", dir: "games/" },
];

(function () {
    // 每个页面在 <div id="main-menu" data-nav-base="..."></div> 上声明路径前缀
    // 根目录页面：data-nav-base=""        → url = index.html / html/xxx.html
    // html/ 下页面：data-nav-base=""       → url = ../index.html / xxx.html
    // games/ 下页面：data-nav-base="../"   → url = ../../index.html / ../html/xxx.html
    // 为简化：用 data-nav-level 标记层级（0=根, 1=html/, 2=games/）
    const container = document.getElementById("main-menu");
    if (!container) return;

    const level = parseInt(container.getAttribute("data-nav-level") || "1", 10);

    // 根据层级生成每个菜单项的最终 URL
    function urlFor(item) {
        // item 可显式指定 dir，否则默认 html/
        const isHome = item.file === "index.html" && !item.dir;
        const isGamesRoot = item.dir === "games/";

        if (level === 0) {
            // 根目录页面：index.html
            if (isHome) return "index.html";
            if (isGamesRoot) return "games/index.html";
            return "html/" + item.file;
        }
        if (level === 1) {
            // html/ 下页面
            if (isHome) return "../index.html";
            if (isGamesRoot) return "../games/index.html";
            return item.file;
        }
        if (level === 2) {
            // games/ 下页面
            if (isHome) return "../../index.html";
            if (isGamesRoot) return "index.html";
            return "../html/" + item.file;
        }
        return item.file;
    }

    // 取当前文件名，匹配高亮
    const fileName = window.location.pathname.split('/').pop() || "index.html";

    let htmlStr = "";
    navList.forEach(item => {
        const url = urlFor(item);
        const itemFileName = url.split('/').pop();
        const activeClass = (itemFileName === fileName) ? " nav" : "";
        htmlStr += `<li class="magical btn${activeClass}" onclick="window.location.href='${url}'">${item.name}</li>`;
    });
    container.innerHTML = htmlStr;
})();
