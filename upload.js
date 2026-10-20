
const uploadForm = document.getElementById("uploadForm");
const audioFile = document.getElementById("audioFile");
const fileInfo = document.getElementById("fileInfo");
const statusMessage = document.getElementById("statusMessage");
const uploadButton = document.getElementById("uploadButton");

const MAX_FILE_SIZE = 10 * 1024 * 1024;

audioFile.addEventListener("change", () => {
  const file = audioFile.files[0];
  statusMessage.textContent = "";

  if (!file) {
    fileInfo.textContent = "Select an audio file.";
    return;
  }

  if (!file.type.startsWith("audio/")) {
    statusMessage.textContent = "Choose a valid audio file.";
    audioFile.value = "";
    return;
  }

  if (file.size > MAX_FILE_SIZE) {
    statusMessage.textContent = "Maximum file size is 10 MB.";
    audioFile.value = "";
    return;
  }

  fileInfo.textContent =
    `Selected: ${file.name} (${(file.size / 1048576).toFixed(2)} MB)`;
});

uploadForm.addEventListener("submit", async event => {
  event.preventDefault();

  const title = document.getElementById("songTitle").value.trim();
  const artist = document.getElementById("artistName").value.trim();
  const genre = document.getElementById("genre").value;
  const file = audioFile.files[0];

  if (!title || !artist || !genre || !file) {
    statusMessage.textContent = "Please complete every field.";
    return;
  }

  if (!file.type.startsWith("audio/") || file.size > MAX_FILE_SIZE) {
    statusMessage.textContent =
      "Choose an audio file no larger than 10 MB.";
    return;
  }

  uploadButton.disabled = true;
  statusMessage.textContent = "Checking your sign-in...";

  let uploadedPath = null;

  try {
    const { data: authData, error: authError } =
      await supabaseClient.auth.getUser();

    if (authError || !authData.user) {
      throw new Error("Please sign in before uploading music.");
    }

    const user = authData.user;
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${user.id}/${crypto.randomUUID()}-${safeName}`;

    statusMessage.textContent = "Uploading audio file...";

    const { error: storageError } = await supabaseClient.storage
      .from("music-files")
      .upload(path, file, {
        contentType: file.type,
        upsert: false
      });

    if (storageError) throw storageError;
    uploadedPath = path;

    statusMessage.textContent = "Saving song details...";

    const { error: databaseError } = await supabaseClient
      .from("songs")
      .insert({
        user_id: user.id,
        title,
        artist,
        genre,
        storage_path: path
      });

    if (databaseError) throw databaseError;

    statusMessage.textContent =
      "Success! Your song has been uploaded and saved.";

    uploadForm.reset();
    fileInfo.textContent = "Select an audio file from your device.";

  } catch (error) {
    console.error("Music upload error:", error);

    if (uploadedPath) {
      await supabaseClient.storage
        .from("music-files")
        .remove([uploadedPath]);
    }

    statusMessage.textContent =
      error.message || "Upload failed. Please try again.";
  } finally {
    uploadButton.disabled = false;
  }
});
