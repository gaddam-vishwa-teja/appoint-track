
const backgroundOverlay = document.querySelector('.background-overlay');
const colors = ['#6c567b', '#355c7d', '#c06c84', '#f67280', '#f8b195', '#a8dadc', '#457b9d', '#1d3557'];
let colorIndex = 0;

function changeBackgroundColor() {
    backgroundOverlay.style.backgroundColor = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
}

// Change background color every 3 seconds (adjust as needed)
setInterval(changeBackgroundColor, 3000);

// Initial background color set on load (optional, as it's set in CSS)
changeBackgroundColor();
