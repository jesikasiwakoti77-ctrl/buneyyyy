// 1. SET THE BIRTHDAY DATE (Friday, April 3rd, 2026)
const TARGET_DATE = new Date("April 3, 2026 00:00:00").getTime(); 

// 2. SET THE UNLOCK DATES FOR EACH LETTER
// These ensure the letters only open on these exact dates
const config = [
    { dayName: "S", unlockDate: new Date("March 29, 2026 00:00:00").getTime() }, // Sunday
    { dayName: "M", unlockDate: new Date("March 30, 2026 00:00:00").getTime() }, // Monday
    { dayName: "T", unlockDate: new Date("March 31, 2026 00:00:00").getTime() }, // Tuesday
    { dayName: "W", unlockDate: new Date("April 1, 2026 00:00:00").getTime() },  // Wednesday
    { dayName: "T", unlockDate: new Date("April 2, 2026 00:00:00").getTime() },  // Thursday
    { dayName: "F", unlockDate: new Date("April 3, 2026 00:00:00").getTime() }   // Friday
];

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
    const now = new Date().getTime(); // Current exact time
    
    container.innerHTML = ""; 

    for (let i = 0; i < config.length; i++) {
        const node = document.createElement("div");
        node.className = "day-btn";
        node.innerText = config[i].dayName;
        
        // CHECK: If current time is past the unlock time for this specific day
        if (now >= config[i].unlockDate) {
            node.onclick = () => openModal(i);
            
            // Highlight the most recent day
            const isToday = new Date().getDate() === new Date(config[i].unlockDate).getDate();
            if (isToday) {
                node.style.boxShadow = "0 0 15px #ff007f";
                node.style.borderColor = "#ff007f";
            }
        } else {
            node.classList.add("locked");
            node.onclick = () => {
                alert("This memory is still floating in the future. Come back on " + new Date(config[i].unlockDate).toLocaleDateString() + "!");
            };
        }
        container.appendChild(node);
    }
}

function openModal(index) {
    document.getElementById("modalText").innerText = messages[index];
    document.getElementById("modalTitle").innerText = "Fragment of Us • Day " + (index + 1);
    document.getElementById("modal").classList.remove("hidden");
    
    if (index === 5) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#ff007f', '#ffb7c5'] });
    }
}

function closeModal() {
    document.getElementById("modal").classList.add("hidden");
}

setInterval(updateCountdown, 1000);
setInterval(buildNodes, 60000); // Refresh buttons every minute
buildNodes();
updateCountdown();
