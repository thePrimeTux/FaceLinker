function download() {
  const link = document.createElement("a");
  link.href = '/zip_files';
  // link.setAttribute("download", "files.zip");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function goHome() {
  window.location.href = '/';
}

