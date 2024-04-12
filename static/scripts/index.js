var width = window.innerWidth;
var referenceImage
window.addEventListener('resize', handleResize);

function isImage(img){
    if (img && img.type.startsWith("image/")) {
        return true;
    } else {
        return false;
    }
}

function handleReferenceFile() {  
  document.getElementById("loader1").style.display = "block";
  var input = document.getElementById("upload_reference");
  var imagePreview = document.getElementById("referenceImage");
  reference_file = input.files[0];

  if (isImage(reference_file)) {
    var reader = new FileReader();
    reader.onload = function (event) {
      document.getElementById("loader1").style.display = "none";
      if (width > 660) {
        document.getElementById("left-container").style.left = "0%";
        document.getElementById("right-container").style.left = "50%";
      } else {
        document.getElementById("left-container").style.left = "0%";
        document.getElementById("right-container").style.left = "0%";
      }
      document.getElementById('referenceTitle').style.display = "block"
      document.getElementById("image-preview1").style.display = "flex";
      document.getElementById("submit-btn").disabled = false;
      imagePreview.src =  event.target.result;
    };
    reader.readAsDataURL(reference_file); // Read the file as data URL
  } else {
    if (width > 660) {
      document.getElementById("left-container").style.left = "25%";
      document.getElementById("right-container").style.left = "100%";
    } else {
      document.getElementById("left-container").style.left = "0%";
      document.getElementById("right-container").style.left = "0%";
    }
    document.getElementById('referenceTitle').style.display = "none"
    document.getElementById("loader1").style.display = "none";
    document.getElementById("image-preview1").style.display = "none";
    document.getElementById("submit-btn").disabled = true;
    alert("Invalid file type");
    imagePreview.src = "";
  }
}

function handleDetection() {
  document.getElementById("loader3").style.display = "block";
  document.getElementById('arrow-icon').style.display = "none";
}

function handleResize(){
  width = window.innerWidth;
  if (isImage(reference_file)) {
    if (width > 660) {
      document.getElementById("left-container").style.left = "0%";
      document.getElementById("right-container").style.left = "50%";
    } else if (width < 660) {
      document.getElementById("left-container").style.left = "0%";
      document.getElementById("right-container").style.left = "0%";
    }
  } else {
    if (width > 660) {
      document.getElementById("left-container").style.left = "0%";
      document.getElementById("right-container").style.left = "100%";
    } else if (width < 660) {
      document.getElementById("left-container").style.left = "0%";
      document.getElementById("right-container").style.left = "0%";
    }
  }
}