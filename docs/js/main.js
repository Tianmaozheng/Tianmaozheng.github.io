// violet's blog - main.js (based on asorn.cn live version, trimmed & guarded)
var timeoutId;

// magical 鼠标跟随光效
window.addEventListener("mousemove", (function (e) {
    document.querySelectorAll(".magical").forEach((function (t) {
        t.querySelector(".show") || t.insertAdjacentHTML("beforeend", "<div class='show'></div>");
        const n = t.getBoundingClientRect(),
            o = e.clientX - n.left,
            c = e.clientY - n.top;
        t.style.setProperty("--mouse-x", `${o}px`),
            t.style.setProperty("--mouse-y", `${c}px`);
        const i = t.querySelector(".show");
        i && (i.style.opacity = o >= 0 && o <= t.clientWidth && c >= 0 && c <= t.clientHeight ? 1 : 0)
    }))
}));

// 邮箱复制（关于页）
document.addEventListener("DOMContentLoaded", (function () {
    var e = document.getElementById("emailCopied");
    e && e.addEventListener("click", (function () {
        function e() {
            var e = document.getElementsByClassName("copied")[0];
            e.style.opacity = 1, timeoutId = setTimeout((function () { e.style.opacity = 0 }), 1e3)
        }
        function t(t) {
            var n = document.createElement("input");
            n.value = t, document.body.appendChild(n), n.select(), document.execCommand("copy"), document.body.removeChild(n), e()
        }
        clearTimeout(timeoutId),
            navigator.clipboard && navigator.clipboard.writeText
                ? navigator.clipboard.writeText(this.textContent).then((function () { e() })).catch((function () { t(this.textContent) }))
                : t(this.textContent)
    }))
}));

// 移动端菜单面板
document.addEventListener("DOMContentLoaded", (function () {
    const e = document.getElementById("main-menu"),
        t = document.getElementById("menu-panel-content"),
        n = document.getElementById("menu-panel"),
        o = document.getElementById("menu-expand-child");
    if (!e || !t || !n || !o) return;
    t.innerHTML = e.innerHTML,
        o.addEventListener("click", (function () {
            n.classList.add("active"),
                document.body.classList.add("no-scroll"),
                t.querySelectorAll("li").forEach((function (e) {
                    e.classList.remove("magical", "btn"), e.classList.add("active-item")
                }))
        }));
    const c = document.querySelector(".menu-close-btn");
    function i() {
        n.classList.remove("active"),
            document.body.classList.remove("no-scroll"),
            setTimeout((function () {
                t.querySelectorAll("li").forEach((function (e) {
                    e.classList.remove("active-item"), e.classList.add("magical", "btn")
                }))
            }), 300)
    }
    c && c.addEventListener("click", (function (e) { e.stopPropagation(), i() })),
        n.addEventListener("click", (function (e) { e.target.classList.contains("menu-close-btn") || i() })),
        window.addEventListener("resize", (function () { window.innerWidth > 968 && i() }))
}));

// 眼睛跟随鼠标动画
document.addEventListener("DOMContentLoaded", (function () {
    function e(e, t) {
        let n = 0;
        return function (...o) {
            const c = (new Date).getTime();
            c - n >= t && (n = c, e.apply(this, o))
        }
    }
    const t = document.querySelectorAll(".eye");
    t.length && document.addEventListener("mousemove", e((function (e) {
        t.forEach((function (t) {
            const n = t.getBoundingClientRect(),
                o = n.left + n.width / 2,
                c = n.top + n.height / 2,
                i = Math.atan2(e.clientY - c, e.clientX - o),
                l = Math.min(n.width / 4, n.height / 4);
            t.querySelector(".pupil").style.transform = `translate(-50%, -50%) translate(${Math.cos(i) * l}px, ${Math.sin(i) * l}px)`
        }))
    }), 16))
}));

// 顶部导航滚动模糊
document.addEventListener("DOMContentLoaded", (function () {
    const n = document.getElementById("headscrollbg");
    if (!n) return;
    window.onscroll = function () {
        window.scrollY > 0
            ? (n.style.backdropFilter = "blur(4px)", n.style.webkitBackdropFilter = "blur(4px)")
            : (n.style.backdropFilter = "blur(0px)", n.style.webkitBackdropFilter = "blur(0px)")
    }
}));

// 入场动画（.load-pro 元素进入视口时添加 .visible）
document.addEventListener("DOMContentLoaded", (function () {
    function o(e, t, n) {
        e.forEach((function (e) { e.isIntersecting && n(e.target, t) }))
    }
    const c = new IntersectionObserver((function (e, t) {
        o(e, t, (function (e, t) { e.classList.add("visible"), t.unobserve(e) }))
    }), { root: null, rootMargin: "0px", threshold: .02 });
    document.querySelectorAll(".load-pro").forEach((function (e) { c.observe(e) }))
}));

// 项目筛选（Work 页）
document.addEventListener("DOMContentLoaded", (function () {
    const m = document.querySelectorAll(".work-filter-btn"),
        y = document.querySelectorAll(".work-filter-scope");
    m.forEach((function (e) {
        e.addEventListener("click", (function () {
            m.forEach((function (b) { b.classList.remove("active") })),
                e.classList.add("active");
            const t = e.dataset.filter;
            y.forEach((function (b) {
                "all" === t || b.classList.contains(`category-${t}`)
                    ? b.classList.remove("hidden")
                    : b.classList.add("hidden")
            }))
        }))
    }))
}));

// 阅读进度条（.scroll-thumb 存在时启用）
document.addEventListener("DOMContentLoaded", (function () {
    function e(e, t) {
        let n = 0;
        return function (...o) {
            const c = (new Date).getTime();
            c - n >= t && (n = c, e.apply(this, o))
        }
    }
    const r = document.querySelector(".scroll-thumb");
    if (!r) return;
    window.addEventListener("scroll", e((function () {
        const e = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
        r.style.height = `${e}%`
    }), 16))
}));
