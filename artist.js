
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

const artistSongs = document.getElementById("artistSongs");
const songCount = document.getElementById("songCount");
const followButton = document.getElementById("followButton");
const audioPlayer = document.getElementById("audioPlayer");
const nowPlaying = document.getElementById("nowPlaying");

const FOLLOW_KEY = "vibewave_following_artist";
let isFollowing = localStorage.getItem(FOLLOW_KEY) === "true";

function updateFollowButton() {
  followButton.textContent = isFollowing ? "Following ✓" : "Follow Artist";
}

function displaySongs() {
  artistSongs.replaceChildren();
  songCount.textContent = `${songs.length} songs`;

  songs.forEach(song => {
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
    artistSongs.appendChild(card);
  });
}

followButton.addEventListener("click", () => {
  isFollowing = !isFollowing;
  localStorage.setItem(FOLLOW_KEY, String(isFollowing));
  updateFollowButton();
});

displaySongs();
updateFollowButton();
