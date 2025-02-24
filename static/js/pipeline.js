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


// Hover Effect for Info Box (for All Sections with Bullet Points)
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".pipeline-section, .para-section"); // Select all sections
    const hoverBox = document.querySelector(".hover-text");

    sections.forEach(section => {
        section.addEventListener("mouseenter", function () {
            // Get the data-text attribute and format it as bullet points
            const hoverContent = section.getAttribute("data-text");

            if (hoverContent) {
                const bulletPoints = hoverContent
                    .split("\n") // Split text by new line
                    .map(item => `<li>${item.trim()}</li>`) // Wrap each line in <li> tags
                    .join(""); // Combine back into a list

                hoverBox.innerHTML = `<ul>${bulletPoints}</ul>`; // Set as unordered list
            }

            // Show hover box
            hoverBox.style.opacity = "1";
            hoverBox.style.visibility = "visible";
        });

        section.addEventListener("mouseleave", function () {
            // Hide hover box
            hoverBox.style.opacity = "0";
            hoverBox.style.visibility = "hidden";
        });
    });
});
