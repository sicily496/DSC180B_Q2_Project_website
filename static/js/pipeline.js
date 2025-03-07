document.addEventListener("DOMContentLoaded", function () {
    const mainFlow = [
        document.getElementById("arrow3"),
        document.getElementById("arrow1"),
        document.getElementById("section2"),
        document.getElementById("arrow2"),
        document.getElementById("section3"),
    ];

    const parallelFlow = [
        //document.getElementById("arrow3"), // L-Shaped Arrow (Appears at total time of main flow)
        document.getElementById("section4"),
    ];

    let lastVisibleIndex = -1; // Track last shown element
    const stepDelay = 800; // Delay between steps in Main Flow
    const totalParallelDelay = stepDelay * mainFlow.length; // Total delay for parallel flow

    function revealNextElement() {
        if (lastVisibleIndex < mainFlow.length - 1) {
            lastVisibleIndex++;

            // Show the next step in the **Main Flow**
            mainFlow[lastVisibleIndex].classList.add("visible");

            // Delay before showing the next elements
            setTimeout(revealNextElement, stepDelay);
        } else {
            // After all steps in Main Flow, show Parallel Flow
            setTimeout(() => {
                parallelFlow.forEach(element => element.classList.add("visible"));
            }, stepDelay); // Start right after Main Flow ends
        }
    }

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const triggerPosition = windowHeight * 0.8;

        if (document.getElementById("section1").getBoundingClientRect().top < triggerPosition && lastVisibleIndex === -1) {
            document.getElementById("section1").classList.add("visible"); // Show Section1
            setTimeout(revealNextElement, stepDelay); // Start the step-by-step animation
        }
    }

    // Run on scroll
    window.addEventListener("scroll", revealOnScroll);

    // Check if Section1 is already visible
    //revealOnScroll();
});


document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".pipeline-section, .para-section");
    const hoverBox = document.querySelector(".hover-text");

    sections.forEach(section => {
        // Handle touch start
        section.addEventListener("touchstart", function (event) {
            showHoverContent(this); // Call the function to show hover content
            event.preventDefault(); // Prevent the window from scrolling
        }, { passive: false });

        // Handle mouse enter
        section.addEventListener("mouseenter", function () {
            showHoverContent(this);
        });

        // Common function to set hover content
        function showHoverContent(target) {
            const hoverContent = target.getAttribute("data-text");
            if (hoverContent) {
                const bulletPoints = hoverContent.split("\n")
                    .map(item => `<li>${item.trim()}</li>`)
                    .join("");
                hoverBox.innerHTML = `<ul>${bulletPoints}</ul>`;
            }
            hoverBox.style.opacity = "1";
            hoverBox.style.visibility = "visible";
        }

        // Handle touch end and mouse leave
        section.addEventListener("touchend", hideHoverContent);
        section.addEventListener("mouseleave", hideHoverContent);

        // Common function to hide hover content
        function hideHoverContent() {
            hoverBox.style.opacity = "0";
            hoverBox.style.visibility = "hidden";
        }
    });
});

