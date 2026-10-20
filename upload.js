
const uploadForm = document.getElementById("uploadForm");
const audioFile = document.getElementById("audioFile");
const fileInfo = document.getElementById("fileInfo");
const statusMessage = document.getElementById("statusMessage");

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

audioFile.addEventListener("change", () => {
  const file = audioFile.files[0];

  statusMessage.textContent = "";

  if (!file) {
    fileInfo.textContent = "Select an audio file from your device.";
    return;
  }

  if (!file.type.startsWith("audio/")) {
    fileInfo.textContent = "Please select a valid audio file.";
    audioFile.value = "";
    return;
  }

  if (file.size > MAX_FILE_SIZE) {
    fileInfo.textContent = "File is too large. Maximum size is 10 MB.";
    audioFile.value = "";
    return;
  }

  fileInfo.textContent =
    `Selected: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
});

uploadForm.addEventListener("submit", event => {
  event.preventDefault();

  const file = audioFile.files[0];

  if (!file) {
    statusMessage.textContent = "Please select an audio file.";
    return;
  }

  if (!file.type.startsWith("audio/") ||
      file.size > MAX_FILE_SIZE) {
    statusMessage.textContent =
      "Choose an audio file no larger than 10 MB.";
    return;
  }

  const song = {
    title: document.getElementById("songTitle").value.trim(),
    artist: document.getElementById("artistName").value.trim(),
    genre: document.getElementById("genre").value,
    fileName: file.name,
    fileSize: file.size
  };

  if (!song.title || !song.artist || !song.genre) {
    statusMessage.textContent = "Complete all required fields.";
    return;
  }

  console.log("Song details ready for upload:", song);

  statusMessage.textContent =
    "Validation successful! Server upload is not connected yet.";
});
