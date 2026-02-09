const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const card = document.querySelector(".card");

const DODGE_DISTANCE = 15; // px range
let canMove = true;

function moveNoButton() {
    if (!canMove) return;
    canMove = false;

    setTimeout(() => {
        canMove = true;
    }, 150);

    const cardRect = card.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const padding = 10;

    // Horizontal bounds (inside card)
    const minX = padding;
    const maxX = cardRect.width - btnRect.width - padding - 10;

    // Vertical bounds (below YES button)
    const minY = yesRect.bottom - cardRect.top - 40;
    const maxY = cardRect.height - btnRect.height - padding - 170;

    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;

    noBtn.style.position = "absolute";
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

// Desktop: proximity detection
document.addEventListener("mousemove", (e) => {
    const btnRect = noBtn.getBoundingClientRect();

    const bufferRect = {
        left: btnRect.left - DODGE_DISTANCE,
        right: btnRect.right + DODGE_DISTANCE,
        top: btnRect.top - DODGE_DISTANCE,
        bottom: btnRect.bottom + DODGE_DISTANCE
    };

    const isNear =
        e.clientX > bufferRect.left &&
        e.clientX < bufferRect.right &&
        e.clientY > bufferRect.top &&
        e.clientY < bufferRect.bottom;

    if (isNear) {
        moveNoButton();
    }
});

// Mobile fallback
noBtn.addEventListener("touchstart", moveNoButton);

// YES click → success page
yesBtn.addEventListener("click", () => {
    window.location.href = "sheSaidYes.html";
});
