// 1. SET THE BIRTHDAY DATE
const TARGET_DATE = new Date("March 28, 2025 00:00:00").getTime(); 

const messages = [
    // Index 0 = Sunday
    "It’s been 6 years since we first met. You were just 12, and I’ve watched you grow into the most incredible person. Today starts your final week of being a kid. Let’s make it count.",
    
    // Index 1 = Monday
    "Being 4 years older than you is one of my favorite things. I get to see the world through your eyes while making sure I'm always here to catch you if you fall. 5 days to go, little sis.",
    
    // Index 2 = Tuesday
    "They say we don’t choose our family, but 6 years ago, we did. We chose to be sisters, and that bond is stronger than anything. 4 days until you officially join me in adulthood.",
    
    // Index 3 = Wednesday
    "Living with you for the last 9 months has been the best part of my year. Coming home to you makes every day better. 3 days left until my favorite roommate is officially 18!",
    
    // Index 4 = Thursday
    "Tonight is the last time I’ll say goodnight to you as a minor. Tomorrow, you wake up as an adult. I’m so proud of the woman you’ve become. See you on the other side of midnight.",
    
    // Index 5 = Friday
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
