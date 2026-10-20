
const STORAGE_KEY = "vibewave_library";

const songList = document.getElementById("songList");
const emptyMessage = document.getElementById("emptyMessage");
const addSongForm = document.getElementById("addSongForm");
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const songUrl = document.getElementById("songUrl");
const statusMessage = document.getElementById("statusMessage");
const clearButton = document.getElementById("clearButton");
const audioPlayer = document.getElementById("audioPlayer");
const nowPlaying = document.getElementById("nowPlaying");

function loadSongs() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

let songs = loadSongs();

function saveSongs() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(songs));
}

function playSong(song) {
  audioPlayer.src = song.url;
  nowPlaying.textContent = `Now playing: ${song.title} — ${song.artist}`;

  audioPlayer.play().catch(() => {
    nowPlaying.textContent =
      "Audio could not start. Check the URL and press Play.";
  });
}

function displaySongs() {
  songList.replaceChildren();
  emptyMessage.hidden = songs.length > 0;

  songs.forEach(song => {
    const card = document.createElement("article");
    card.className = "song-card";

    const title = document.createElement("h3");
    title.textContent = song.title;

    const artist = document.createElement("p");
    artist.textContent = song.artist;

    const playButton = document.createElement("button");
    playButton.textContent = "Play";
    playButton.addEventListener("click", () => playSong(song));

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove-button";

    removeButton.addEventListener("click", () => {
      songs = songs.filter(item => item.id !== song.id);
      saveSongs();
      displaySongs();
      statusMessage.textContent = "Song removed from your library.";
    });

    card.append(title, artist, playButton, removeButton);
    songList.appendChild(card);
  });
}

addSongForm.addEventListener("submit", event => {
  event.preventDefault();

  const title = songTitle.value.trim();
  const artist = songArtist.value.trim();
  const url = songUrl.value.trim();

  if (!title || !artist || !url) {
    statusMessage.textContent = "Please fill in all fields.";
    return;
  }

  songs.push({
    id: `${Date.now()}-${Math.random()}`,
    title,
    artist,
    url
  });

  try {
    saveSongs();
    displaySongs();
    addSongForm.reset();
    statusMessage.textContent = "Song added successfully!";
  } catch {
    songs.pop();
    statusMessage.textContent =
      "Could not save the song. Your browser storage may be full.";
  }
});

clearButton.addEventListener("click", () => {
  if (!confirm("Remove every song from this library?")) return;

  songs = [];
  saveSongs();
  displaySongs();
  statusMessage.textContent = "Library cleared.";
});

displaySongs();
