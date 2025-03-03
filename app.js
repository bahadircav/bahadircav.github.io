console.log("Initializing Tableau Dashboard...");

// Declare viz variable globally
let viz;

// Tableau Public URL (Check if it's accessible)
const url = "https://public.tableau.com/views/EffectsofClimateChangeonArabicaCoffeeProductionandPriceinBrazil/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link";

// Get the viz container
const vizContainer = document.getElementById("vizContainer");

// Tableau options for better performance
const options = {
    hideTabs: true,
    width: "100%",
    height: "600px",  // Adjust for responsive sizing
    device: "desktop", // Optimized for desktop performance
    onFirstInteraction: function () {
        console.log("Tableau dashboard is now interactive!");
    },
};

// Function to load the Tableau dashboard
function loadViz() {
    if (!viz && vizContainer) {
        console.log("Loading Tableau visualization...");
        try {
            viz = new tableau.Viz(vizContainer, url, options);
        } catch (error) {
            console.error("🚨 Failed to load Tableau dashboard:", error);
        }
    }
}

// Ensure Tableau loads after DOM is fully ready
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(loadViz, 500);  // Delay by 500ms to ensure smooth loading
});

// Export PDF function
function generatePDF() {
    if (viz) {
        viz.showExportPDFDialog();
    } else {
        console.warn("⚠ Tableau visualization is not loaded yet.");
    }
}

// Export Image function
function generateImage() {
    if (viz) {
        viz.showExportImageDialog();
    } else {
        console.warn("⚠ Tableau visualization is not loaded yet.");
    }
}

// Add event listeners for export buttons
document.getElementById("exportPDF")?.addEventListener("click", generatePDF);
document.getElementById("exportImage")?.addEventListener("click", generateImage);

console.log("✅ Tableau Dashboard script loaded successfully.");
