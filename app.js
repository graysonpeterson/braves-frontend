// =====================
// CONFIG
// =====================
const API_BASE = 'https://did-the-braves-win-today-production.up.railway.app';

const WIN_GIF = 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExc211ZjVjMTZvejV2aGlyMXpvM3k2NGdrdTkzbWZhdTE5YWhubmxweSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tfopMW5KpFMUrZgOiT/giphy.gif';
const LOSE_GIF = 'https://media1.tenor.com/m/syWhOHJkJPUAAAAd/sad-braves.gif';

const dateDisplay = document.getElementById("date-today");
const today = new Date();
dateDisplay.innerText = today.toLocaleDateString();

// =====================
// SATURDAY CITY CONNECT
// =====================
function isSaturday() {
  return today.getDay() === 6;
}

if (isSaturday()) {
  document.body.classList.add('city-connect');
}

// =====================
// RENDER FUNCTIONS
// =====================
function renderWin(data) {
  const hero = document.getElementById('hero');
  hero.innerHTML = `
    <p class="result-word">Sí</p>
    <div class="gif-circle">
      <img src="${WIN_GIF}" alt="Braves celebrating" />
    </div>
    <p class="result-detail">${data.braves_score}–${data.opponent_score} over the ${data.opponent}</p>
  `;

  const title = document.getElementById('title');
  title.innerHTML = `Sí — Braves Win`;
}

function renderLoss(data) {
  const hero = document.getElementById('hero');
  hero.innerHTML = `
    <p class="result-word">Nah</p>
    <div class="gif-circle">
      <img src="${LOSE_GIF}" alt="Braves sad" />
    </div>
    <p class="result-detail">${data.braves_score}–${data.opponent_score} to the ${data.opponent}</p>
  `;

  const title = document.getElementById('title');
  title.innerHTML = `Nah — Braves Lost`;
}

function renderNoGame(nextOpponent) {
  const hero = document.getElementById('hero');
  hero.innerHTML = `
    <p class="no-game">No game today.</p>
    ${nextOpponent
      ? `<p class="next-game">Next up: ${nextOpponent}</p>`
      : ''}
  `;
}

function renderInProgress(data) {
  const hero = document.getElementById('hero');

  if (data.status == "Live") {
    hero.innerHTML = `
    <p class="in-progress">Game in progress…</p>
    <p class="result-detail">vs ${data.opponent}</p>
  `;
  }
  else {
    hero.innerHTML = `
    <p class="preview">TBD...</p>
    <p class="result-detail">vs ${data.opponent}</p>
  `;
  }
  
}

function renderError() {
  const hero = document.getElementById('hero');
  hero.innerHTML = `
    <p class="no-game">Couldn't load game data.</p>
    <p class="next-game">Try refreshing.</p>
  `;
}

// =====================
// FETCH & ROUTE
// =====================
async function loadGame() {
  try {
    const res = await fetch(`${API_BASE}/today`);
    const data = await res.json();

    if (data.result === 'no_game') {
      // Try to get next game info
      try {
        const nextRes = await fetch(`${API_BASE}/next`);
        const nextData = await nextRes.json();
        const nextOpponent = nextData.opponent || null;
        renderNoGame(nextOpponent);
      } catch {
        renderNoGame(null);
      }
      return;
    }

    if (data.result === 'in_progress') {
      renderInProgress(data);
      return;
    }

    if (data.result === 'win') {
      renderWin(data);
      return;
    }

    if (data.result === 'loss') {
      renderLoss(data);
      return;
    }

  } catch (err) {
    console.error('API error:', err);
    renderError();
  }
}

// Kick it off
loadGame();
