// Smooth loading progress animation
document.addEventListener("DOMContentLoaded", () => {
    let progress = 0;
    const fill = document.getElementById("progress-fill");
    const percent = document.getElementById("progress-percent");
    const loader = document.getElementById("loading-screen");

    const interval = setInterval(() => {
        if (progress < 70) {
            progress += Math.floor(Math.random() * 6) + 3;
        } else if (progress < 99) {
            progress += Math.floor(Math.random() * 4) + 1;
        } else {
            progress = 100;
        }

        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            percent.innerText = "100%";
            fill.style.width = "100%";

            // Fade out loading screen when complete
            setTimeout(() => {
                loader.classList.add("fade-out");
                setTimeout(() => {
                    loader.style.display = "none";
                    document.body.style.overflow = "auto";
                }, 800);
            }, 400);
        } else {
            percent.innerText = progress + "%";
            fill.style.width = progress + "%";
        }
    }, 40);
});
