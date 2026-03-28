// 1. SET THE BIRTHDAY DATE (Friday at Midnight)
const TARGET_DATE = new Date("April,03 2026 00:00:00").getTime(); 

const messages = [
    "It’s been 6 years since we first met. You were just 12, and I’ve watched you grow into the most incredible person. Today starts your final week of being a kid. Let’s make it count.", // Sunday
    "Being 4 years older than you is one of my favorite things. I get to see the world through your eyes while making sure I'm always here to catch you if you fall. 5 days to go, little sis.", // Monday
    "They say we don’t choose our family, but 6 years ago, we did. We chose to be sisters, and that bond is stronger than anything. 4 days until you officially join me in adulthood.", // Tuesday
    "Living with you for the last 9 months has been the best part of my year. Coming home to you makes every day better. 3 days left until my favorite roommate is officially 18!", // Wednesday
    "Tonight is the last time I’ll say goodnight to you as a minor. Tomorrow, you wake up as an adult. I’m so proud of the woman you’ve become. See you on the other side of midnight.", // Thursday
    "HAPPY 18th BIRTHDAY! From 12 to 18, I’ve had a front-row seat to your life, and it’s the best show I’ve ever seen. Welcome to adulthood—I’ll be right here to show you the way. I love you!" // Friday
];

function updateCountdown() {
    const now = new Date().getTime();
    const gap = TARGET_DATE - now;

    if (gap <= 0) {
        document.getElementById("timer").innerText = "LEVEL 18 UNLOCKED";
        document.getElementById("sphere").style.background = "#ff007f";
        document.getElementById("sphere").style.boxShadow = "0 0 50px #ff007f";
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
    const today = new Date().getDay(); // Sunday is 0, Monday is 1... Friday is 5
    const dayNames = ["S", "M", "T", "W", "T", "F"];
    
    container.innerHTML = ""; // Clear for refresh

    for (let i = 0; i <= 5; i++) {
        const node = document.createElement("div");
        node.className = "day-btn";
        node.innerText = dayNames[i];
        
        // UNLOCK LOGIC: If the day is today OR in the past, let her open it
        if (i <= today) {
            node.onclick = () => openModal(i);
            
            // Visual feedback: Make the 'Current' day glow more than 'Past' days
            if (i === today) {
                node.style.boxShadow = "0 0 15px #ff007f";
                node.style.borderColor = "#ff007f";
            }
        } else {
            // FUTURE DAYS: Stay locked
            node.classList.add("locked");
            node.onclick = () => {
                alert("Patience, sis! This memory isn't ready yet. ✨");
            };
        }
        container.appendChild(node);
    }
}

function openModal(index) {
    document.getElementById("modalText").innerText = messages[index];
    document.getElementById("modalTitle").innerText = "Fragment of Us • " + (index + 1);
    document.getElementById("modal").classList.remove("hidden");
    
    // Friday celebration
    if (index === 5) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#ff007f', '#ffb7c5'] });
    }
}

function closeModal() {
    document.getElementById("modal").classList.add("hidden");
}

// Initial Run
setInterval(updateCountdown, 1000);
buildNodes();

// Check every hour to see if the day has changed (unlocks the next button at midnight)
setInterval(buildNodes, 3600000);
