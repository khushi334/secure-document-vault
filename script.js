const API_BASE = "https://9y8y13kza5.execute-api.ap-south-1.amazonaws.com";

//const API_BASE = "https://9y8y13kza5.execute-api.ap-south-1.amazonaws.com";

// Load all files
async function loadFiles() {
  try {
    const res = await fetch(API_BASE + "/files");
    const files = await res.json();

    const list = document.getElementById("fileList");
    list.innerHTML = "";

    if (files.length === 0) {
      list.innerHTML = "<p>No files found</p>";
      return;
    }

    files.forEach(file => {
      const li = document.createElement("li");

      li.innerHTML = `
        <span>${file.name} (${file.size} bytes)</span>
        <div>
          ${ROLE === "admin" ? `<button onclick="downloadFile('${file.name}')">Download</button>` : ""}

          
        </div>
      `;

      list.appendChild(li);
    });

  } catch (error) {
    console.error("Error loading files:", error);
    alert("Error loading files");
  }
}


// Download file (FIXED with encoding)
async function downloadFile(name) {
  const res = await fetch(API_BASE + "/download?file=" + name + "&role=" + ROLE);
  const data = await res.json();

  window.open(data.url);
}

// Delete file
async function deleteFile(name) {
  try {
    console.log("Deleting:", name);

    const res = await fetch(
      API_BASE + "/delete?file=" + encodeURIComponent(name),
      { method: "DELETE" }
    );

    const data = await res.json();
    console.log(data);

    alert("Deleted successfully");
    loadFiles();

  } catch (err) {
    console.error(err);
  }
}