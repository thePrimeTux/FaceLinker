// function goHome() {
//   window.location.href = '/';
// }

function confirmDelete() {
  return confirm("Are you sure you want to delete this image?");
}

function isImage(img){
  if (img && img.type.startsWith("image/")) {
    return true;
  } else {
    return false;
  }
}

function upload() {
  document.getElementById('upload_image').click()
  document.getElementById("loader1").style.display = "block";
}

function handleUpload() {
  var fileInput = document.getElementById('upload_image');

  var files = fileInput.files;

  var allImages = true;
  for (let i = 0; i < files.length; i++) {
    if (!isImage(files[i])) {
      allImages = false;
      break;
    }
  }
  
  if (allImages) {
    document.getElementById("loader1").style.display = "none";

    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
          formData.append('images', files[i]);
    }
    
    fetch('/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/admin';
        } else {
            console.error('Upload failed');
        }
    })
    .catch(error => console.error('Error:', error));
  } else {
    document.getElementById("loader1").style.display = "none";
    alert("Invalid File Type");
  }
}