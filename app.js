console.log("Initializing Tableau Dashboard...");

// Declare viz variable globally
let viz;

// Tableau Public URL (Ensure it's accessible)
const url = "https://public.tableau.com/views/EffectsofClimateChangeonArabicaCoffeeProductionandPriceinBrazil/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link";

// Get DOM elements
const vizContainer = document.getElementById("vizContainer");
const exportPDF = document.getElementById("exportPDF");
const exportImage = document.getElementById("exportImage");

// Tableau options with accessibility optimizations
const options = {
    hideTabs: true,
    device: "desktop", // Optimized for desktop performance
    onFirstInteraction: function () {
        console.log("Dashboard is now interactive!");
        const workbook = viz.getWorkbook();
        const activeSheet = workbook.getActiveSheet();
    },
};

// Load Tableau viz only when it enters the viewport (lazy loading for performance)
function loadViz() {
    if (!viz) {
        console.log("Loading Tableau visualization...");
        viz = new tableau.Viz(vizContainer, url, options);
    }
}

// Lazy load when the user scrolls
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                loadViz();
                observer.disconnect(); // Load only once
            }
        });
    },
    { rootMargin: "50px" }
);
observer.observe(vizContainer);

// Export PDF function
function generatePDF() {
    if (viz) {
        viz.showExportPDFDialog();
    } else {
        console.warn("Tableau visualization is not loaded yet.");
    }
}

// Export Image function
function generateImage() {
    if (viz) {
        viz.showExportImageDialog();
    } else {
        console.warn("Tableau visualization is not loaded yet.");
    }
}

// Event listeners for export buttons
exportPDF?.addEventListener("click", generatePDF);
exportImage?.addEventListener("click", generateImage);

// Improve accessibility
exportPDF.setAttribute("aria-label", "Export dashboard as PDF");
exportImage.setAttribute("aria-label", "Export dashboard as an image");

console.log("Tableau Dashboard script initialized successfully.");
