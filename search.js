
const songs = [
  {
    title: "Dreams",
    artist: "VibeWave Artist",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "Midnight",
    artist: "VibeWave Artist",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    title: "New Beginnings",
    artist: "VibeWave Artist",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

const searchInput = document.getElementById("searchInput");
const resultsList = document.getElementById("resultsList");
const resultsHeading = document.getElementById("resultsHeading");
const noResults = document.getElementById("noResults");
const audioPlayer = document.getElementById("audioPlayer");
const nowPlaying = document.getElementById("nowPlaying");

function showSongs(searchText = "") {
  resultsList.innerHTML = "";

  const matches = songs.filter(song =>
    `${song.title} ${song.artist}`
      .toLowerCase()
      .includes(searchText.trim().toLowerCase())
  );

  resultsHeading.textContent = searchText.trim()
    ? "Search Results"
    : "Popular Music";

  noResults.hidden = matches.length > 0;

  matches.forEach(song => {
    const card = document.createElement("article");
    card.className = "song-card";

    const title = document.createElement("h3");
    title.textContent = song.title;

    const artist = document.createElement("p");
    artist.textContent = song.artist;

    const playButton = document.createElement("button");
    playButton.textContent = "Play Song";

    playButton.addEventListener("click", () => {
      audioPlayer.src = song.audio;
      nowPlaying.textContent =
        `Now playing: ${song.title} — ${song.artist}`;

      audioPlayer.play().catch(() => {
        nowPlaying.textContent =
          "Press Play on the audio player to start listening.";
      });
    });

    card.append(title, artist, playButton);
    resultsList.appendChild(card);
  });
}

searchInput.addEventListener("input", () => {
  showSongs(searchInput.value);
});

showSongs();
