const navbar = document.getElementById("mainNav");
const navMenu = document.getElementById("navMenu");
const toTop = document.querySelector(".to-top");

const onScroll = () => {
    const y = window.scrollY;
    navbar.classList.toggle("scrolled", y > 24);
    toTop.classList.toggle("visible", y > 600);
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const closeMenu = () => {
    if (navMenu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
    }
};

document.querySelectorAll("#navMenu .nav-link").forEach(link => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("click", event => {
    if (!navbar.contains(event.target)) {
        closeMenu();
    }
});

document.getElementById("year").textContent = new Date().getFullYear();

if ("IntersectionObserver" in window) {
    const targets = [];

    document.querySelectorAll(".page-section .section-head, .page-section .timeline-item, .page-section .row").forEach(el => {
        if (el.classList.contains("row")) {
            [...el.children].forEach((col, i) => {
                col.style.transitionDelay = `${(i % 4) * 90}ms`;
                targets.push(col);
            });
        } else {
            targets.push(el);
        }
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    targets.forEach(el => {
        el.classList.add("reveal");
        observer.observe(el);
    });
}
