
// 层级约定同 nav.js：0=根目录, 1=html/, 2=games/

const footerFriends = [
    { name: "About", file: "about.html" },
    { name: "GitHub", url: "https://github.com/Tianmaozheng", external: true },
];

(function () {
    const container = document.querySelector(".footer");
    if (!container) return;

    const level = parseInt(container.getAttribute("data-nav-level") || "1", 10);

    // 根据层级生成 About 的相对路径；GitHub 为绝对 URL 无需处理
    function urlFor(item) {
        if (item.external) return item.url;
        if (level === 0) return "html/" + item.file;       // 根目录
        if (level === 1) return item.file;                 // html/
        if (level === 2) return "../html/" + item.file;    // games/
        return item.file;
    }

    let friendsHtml = "";
    footerFriends.forEach(item => {
        const url = urlFor(item);
        const ext = item.external ? ' target="_blank"' : "";
        friendsHtml += `<a href="${url}"${ext}>${item.name}</a>`;
    });

    container.innerHTML = `
        <div class="footer-content">
            <div class="copyright">
                <div>© 2026 <a href="https://github.com/Tianmaozheng" target="_blank">violet</a> All Rights Reserved.</div>
            </div>
            <div class="friends">
                ${friendsHtml}
            </div>
        </div>`;
})();
