// Typing effect for baseline-cli demo
const lines = [
    '$ baseline capture',
    '$ baseline compare'
];
const typingEl = document.getElementById('cli-typing');
let lineIdx = 0;
let charIdx = 0;
let cursorSpan = null;
function typeLine() {
    if (lineIdx >= lines.length) return;
    const line = lines[lineIdx];
    if (charIdx < line.length) {
        typingEl.innerHTML = typingEl.innerHTML.replace(/<span class=\"cli-cursor\">.*?<\/span>$/, '');
        typingEl.innerHTML += line[charIdx];
        charIdx++;
        typingEl.innerHTML += '<span class="cli-cursor">█</span>';
        setTimeout(typeLine, 45);
    } else {
        // Finished line, wait, then new line and next command
        lineIdx++;
        charIdx = 0;
        if (lineIdx < lines.length) {
            setTimeout(() => {
                typingEl.innerHTML = typingEl.innerHTML.replace(/<span class=\"cli-cursor\">.*?<\/span>$/, '');
                typingEl.innerHTML += '<br><span class="cli-cursor">█</span>';
                typeLine();
            }, 500);
        } else {
            // All lines done, wait and restart
            setTimeout(() => {
                typingEl.innerHTML = '';
                lineIdx = 0;
                charIdx = 0;
                typeLine();
            }, 5000);
        }
    }
}
typeLine();

// Fetch and display Umami stats
async function showUmamiStats() {
  try {
    const res = await fetch('/api/umami-stats');
    const data = await res.json();
    document.getElementById('umami-today').textContent = data.visitors?.value ?? 'N/A';
  } catch (e) {
    document.getElementById('umami-today').textContent = 'N/A';
  }
}
showUmamiStats(); 