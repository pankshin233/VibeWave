
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

const songList = document.getElementById("songList");
const musicSearch = document.getElementById("musicSearch");
const audioPlayer = document.getElementById("audioPlayer");
const nowPlaying = document.getElementById("nowPlaying");
const emptyMessage = document.getElementById("emptyMessage");

function displaySongs(searchText = "") {
  songList.innerHTML = "";

  const filteredSongs = songs.filter(song =>
    `${song.title} ${song.artist}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  emptyMessage.hidden = filteredSongs.length !== 0;

  filteredSongs.forEach(song => {
    const card = document.createElement("article");
    card.className = "song-card";

    const title = document.createElement("h3");
    title.textContent = song.title;

    const artist = document.createElement("p");
    artist.textContent = song.artist;

    const button = document.createElement("button");
    button.textContent = "Play Song";

    button.addEventListener("click", () => {
      audioPlayer.src = song.audio;
      nowPlaying.textContent =
        `Now playing: ${song.title} — ${song.artist}`;

      audioPlayer.play().catch(() => {
        nowPlaying.textContent =
          "Press Play on the audio player to start listening.";
      });
    });

    card.append(title, artist, button);
    songList.appendChild(card);
  });
}

musicSearch.addEventListener("input", event => {
  displaySongs(event.target.value);
});

displaySongs();
