
const STORAGE_KEY = "vibewave_playlists";

const playlistForm = document.getElementById("playlistForm");
const playlistName = document.getElementById("playlistName");
const playlistDescription =
  document.getElementById("playlistDescription");
const playlistList = document.getElementById("playlistList");
const emptyMessage = document.getElementById("emptyMessage");
const statusMessage = document.getElementById("statusMessage");

function loadPlaylists() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

let playlists = loadPlaylists();

function savePlaylists() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(playlists));
}

function displayPlaylists() {
  playlistList.replaceChildren();
  emptyMessage.hidden = playlists.length > 0;

  playlists.forEach(playlist => {
    const card = document.createElement("article");
    card.className = "playlist-card";

    const title = document.createElement("h3");
    title.textContent = playlist.name;

    const description = document.createElement("p");
    description.textContent =
      playlist.description || "No description added.";

    const date = document.createElement("p");
    date.textContent = `Created: ${playlist.created}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Playlist";
    deleteButton.className = "delete-button";

    deleteButton.addEventListener("click", () => {
      if (!confirm(`Delete "${playlist.name}"?`)) return;

      playlists = playlists.filter(item => item.id !== playlist.id);

      try {
        savePlaylists();
        displayPlaylists();
        statusMessage.textContent = "Playlist deleted.";
      } catch {
        statusMessage.textContent = "Could not update saved playlists.";
      }
    });

    card.append(title, description, date, deleteButton);
    playlistList.appendChild(card);
  });
}

playlistForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = playlistName.value.trim();
  const description = playlistDescription.value.trim();

  if (!name) {
    statusMessage.textContent = "Enter a playlist name.";
    return;
  }

  playlists.push({
    id: `${Date.now()}-${Math.random()}`,
    name,
    description,
    created: new Date().toLocaleDateString()
  });

  try {
    savePlaylists();
    displayPlaylists();
    playlistForm.reset();
    statusMessage.textContent = "Playlist created successfully!";
  } catch {
    playlists.pop();
    statusMessage.textContent =
      "Could not save the playlist. Browser storage may be full.";
  }
});

displayPlaylists();
