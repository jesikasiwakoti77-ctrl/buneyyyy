// SET THE FRIDAY DATE (Example: Friday March 28th, 2025)
const TARGET_DATE = new Date("March 28, 2025 00:00:00").getTime(); 

const messages = [
    "It’s been 6 years since we first met. You were just 12, and I’ve watched you grow into the most incredible person. Today starts your final week of being a kid. Let’s make it count.",
    "Being 4 years older than you is one of my favorite things. I get to see the world through your eyes while making sure I'm always here to catch you if you fall. 5 days to go, little sis.",
    "They say we don’t choose our family, but 6 years ago, we did. We chose to be sisters, and that bond is stronger than anything. 4 days until you officially join me in adulthood.",
    "Living with you for the last 9 months has been the best part of my year. Coming home to you makes every day better. 3 days left until my favorite roommate is officially 18!",
    "Tonight is the last time I’ll say goodnight to you as a minor. Tomorrow, you wake up as an adult. I’m so proud of the woman you’ve become. See you on the other side of midnight.",
    "HAPPY 18th BIRTHDAY! From 12 to 18, I’ve had a front-row seat to your life, and it’s the best show I’ve ever seen. Welcome to adulthood—I’ll be right here to show you the way. I love you!"
];

function updateCountdown() {
    const now = new Date().getTime();
    const gap = TARGET_DATE - now;

    if (gap <= 0) {
        document.getElementById("timer").innerText = "LEVEL 18 UNLOCKED";
        document.getElementById("sphere").style.background = "#ff007f";
        return;
    }

    const h = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((gap % (1000 * 60)) / 1000);

    document.getElementById("timer").innerText = 
        `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function buildNodes() {
    const container = document.getElementById("dayNodes");
    const today = new Date().getDay(); // 0 is Sunday, 5 is Friday
    const dayNames = ["S", "M", "T", "W", "T", "F"];
    
    for (let i = 0; i <= 5; i++) {
        const node = document.createElement("div");
        node.className = "day-btn";
        node.innerText = dayNames[i];
        
        // Only unlocks the letter if it's that day or earlier
        if (i <= today) {
            node.onclick = () => openModal(i);
        } else {
            node.classList.add("locked");
        }
        container.appendChild(node);
    }
}

function openModal(index) {
    document.getElementById("modalText").innerText = messages[index];
    document.getElementById("modal").classList.remove("hidden");
    
    // Confetti only triggers on Friday's button (Index 5)
    if (index === 5) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#ff007f', '#ffb7c5'] });
    }
}

function closeModal() {
    document.getElementById("modal").classList.add("hidden");
}

setInterval(updateCountdown, 1000);
buildNodes();
