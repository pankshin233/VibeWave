
const menuBtn = document.getElementById("menuBtn");
const navigation = document.getElementById("navigation");

menuBtn.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  menuBtn.textContent = isOpen ? "✕" : "☰";
});

navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.textContent = "☰";
  });
});

document.getElementById("year").textContent =
  new Date().getFullYear();

const songs = [
  {
    title: "Midnight Vibes",
    artist: "Demo Artist One",
    mood: "Afrobeats",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "Golden Moments",
    artist: "Demo Artist Two",
    mood: "Gospel",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    title: "Blue Dreams",
    artist: "Demo Artist Three",
    mood: "R&B",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    title: "Higher Energy",
    artist: "Demo Artist Four",
    mood: "Hip-Hop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  }
];

const featuredSongs = document.getElementById("featuredSongs");
const audioPlayer = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
let currentSong = null;

featuredSongs.innerHTML = songs.map((song, index) => `
  <article class="song">
    <div class="cover">♫</div>
    <h3>${song.title}</h3>
    <p>${song.artist} · ${song.mood}</p>
    <button data-index="${index}">▶ Play</button>
  </article>
`).join("");

featuredSongs.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", async () => {
    const song = songs[Number(button.dataset.index)];
    currentSong = song;

    document.getElementById("currentTitle").textContent =
      song.title;
    document.getElementById("currentArtist").textContent =
      song.artist;

    if (audioPlayer.src !== song.audio) {
      audioPlayer.src = song.audio;
    }

    try {
      await audioPlayer.play();
      playBtn.textContent = "Ⅱ";
    } catch {
      alert("Unable to play the preview. Check your internet connection.");
    }
  });
});

playBtn.addEventListener("click", async () => {
  if (!currentSong) {
    featuredSongs.querySelector("button")?.click();
    return;
  }

  if (audioPlayer.paused) {
    try {
      await audioPlayer.play();
      playBtn.textContent = "Ⅱ";
    } catch {
      alert("Playback failed. Please try again.");
    }
  } else {
    audioPlayer.pause();
    playBtn.textContent = "▶";
  }
});

audioPlayer.addEventListener("ended", () => {
  playBtn.textContent = "▶";
});
