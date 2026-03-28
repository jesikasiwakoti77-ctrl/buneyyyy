// 1. SET THE TARGET DATE (Example: Friday, March 29)
const BIRTHDAY_DATE = new Date("April,03 2024 00:00:00").getTime(); 

const messages = [
    "Sunday: The final countdown begins. 6 days until you turn 18.",
    "Monday: A new week for a new chapter. 5 days to go.",
    "Tuesday: Remember how far you've come. 4 days to go.",
    "Wednesday: The energy is shifting. 3 days left.",
    "Thursday: The last sunset of your childhood. Tomorrow is the day.",
    "FRIDAY: HAPPY 18th BIRTHDAY! You are officially an adult now. I love you!"
];

function updateCountdown() {
    const now = new Date().getTime();
    const gap = BIRTHDAY_DATE - now;

    const d = Math.floor(gap / (1000 * 60 * 60 * 24));
    const h = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((gap % (1000 * 60)) / 1000);

    document.getElementById("timer").innerText = `${h}h ${m}m ${s}s`;

    if (gap < 0) {
        document.getElementById("timer").innerText = "HAPPY BIRTHDAY!";
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#ff007f', '#ffb7c5'] });
    }
}

function buildNodes() {
    const container = document.getElementById("dayNodes");
    const today = new Date().getDay(); // 0 is Sun, 5 is Fri
    
    // We only care about Sun(0) to Fri(5)
    for (let i = 0; i <= 5; i++) {
        const node = document.createElement("div");
        node.className = "day-circle";
        node.innerText = ["S", "M", "T", "W", "T", "F"][i];
        
        if (i <= today) {
            node.onclick = () => openModal(i);
        } else {
            node.classList.add("locked");
        }
        container.appendChild(node);
    }
}

function openModal(index) {
    document.getElementById("modalTitle").innerText = "Memory Fragment";
    document.getElementById("modalText").innerText = messages[index];
    document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("modal").classList.add("hidden");
}

setInterval(updateCountdown, 1000);
buildNodes();