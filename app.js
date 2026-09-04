document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Animates once and stays visible
            }
        });
    }, observerOptions);

    // Targets all elements marked with the reveal class
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
    // Target the element based on your chosen option
    // Use '.subject-image' for Pure Fade-In OR '.subject-image-wrapper' for Outer Wrapper Zoom
    const heroTarget = document.querySelector(".subject-image"); 

    if (heroTarget) {
        setTimeout(() => {
            heroTarget.classList.add("hero-active");
        }, 150); // Triggers smoothly right after page load
    }
});