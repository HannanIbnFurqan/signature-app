const colorPicker = document.getElementById("colorPicker");
const convasColor = document.getElementById("convasColor");
const convas = document.getElementById("myConvas");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const fontPicker = document.getElementById("fontPicker");
const retrieveButton = document.getElementById("retrieveButton");

const ctx = convas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Set initial canvas properties
ctx.lineWidth = 5; // Set initial line thickness
ctx.strokeStyle = "#000000"; // Set initial stroke color

// Update the drawing color based on color picker input
colorPicker.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value;  // Set line color
    ctx.fillStyle = e.target.value;    // Set fill color
});

// Start drawing when mouse is pressed
convas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

// Draw lines as mouse moves
convas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);         // Move to previous position
        ctx.lineTo(e.offsetX, e.offsetY); // Draw a line to current position
        ctx.stroke();                     // Actually draw the line

        // Update lastX and lastY to the current position
        lastX = e.offsetX;
        lastY = e.offsetY;
    }
});

// Stop drawing when mouse is released
convas.addEventListener('mouseup', () => {
    isDrawing = false;
});

// Stop drawing when mouse leaves the canvas area
convas.addEventListener('mouseout', () => {
    isDrawing = false;
});

// Change the background color of the canvas
convasColor.addEventListener('change', (e) => {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, convas.width, convas.height);  // Fill the entire canvas
});

// Change the line width based on the font picker
fontPicker.addEventListener('change', (e) => {
    ctx.lineWidth = e.target.value;
});

// Clear the canvas
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, convas.width, convas.height);  // Clear the canvas
});

// Save and download the canvas as an image
saveButton.addEventListener('click', () => {
    const imageURL = convas.toDataURL("image/png");    // Save the canvas as a data URL
    let link = document.createElement('a');
    link.href = imageURL;
    link.download = 'my-canvas.png';                   // Set the download filename
    link.click();                                      // Trigger the download
});

// Retrieve saved canvas from localStorage
retrieveButton.addEventListener('click', () => {
    const savedCanvas = localStorage.getItem('canvasContent');
    if (savedCanvas) {
        let img = new Image();
        img.src = savedCanvas;
        img.onload = () => {
            ctx.drawImage(img, 0, 0);   // Draw the saved image onto the canvas
        };
    }
});
