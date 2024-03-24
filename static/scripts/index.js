var reference_file
var target_files

function isImage(img){
    if (img && img.type.startsWith("image/")) {
        return true;
    } else {
        return false;
    }
}

function enableSubmit(){
    if (reference_file && target_files){
        if (isImage(reference_file)) {
                var allImages = true;
                for (let i = 0; i < target_files.length; i++) {
                    if (!isImage(target_files[i])) {
                        allImages = false;
                        break;
                    }
                }
                if (allImages) {
                    console.log(target_files)
                    document.getElementById("submit-btn").disabled = false
                } else {
                document.getElementById("submit-btn").disabled = true
                }

        } else {
            document.getElementById("submit-btn").disabled = true
        }
    } else {
        document.getElementById("submit-btn").disabled = true
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
      document.getElementById("left-container").style.left = "0%";
      document.getElementById("right-container").style.left = "50%";
      document.getElementById("image-preview1").style.display = "flex";
      imagePreview.src =  event.target.result;
    };
    reader.readAsDataURL(reference_file); // Read the file as data URL
  } else {
    document.getElementById("loader1").style.display = "none";
    document.getElementById("image-preview1").style.display = "none";
    document.getElementById("left-container").style.left = "25%";
    document.getElementById("right-container").style.left = "100%";
    alert("Invalid file type");
    imagePreview.src = "";
  }
  enableSubmit();
}

function handleTargetFile() {
  document.getElementById("loader2").style.display = "block";
  var input = document.getElementById("upload_target");
  target_files = input.files;

  // Check if all files are image files
  var allImages = true;
  for (let i = 0; i < target_files.length; i++) {
    if (!isImage(target_files[i])) {
      allImages = false;
      break;
    }
  }
  if (target_files.length === 1){
    count = '1 Image'
  } else{
    count = target_files.length + ` Images`
  }

  if (allImages) {
    document.getElementById("loader2").style.display = "none";
    document.getElementById("count").innerHTML = count;
    document.getElementById("information").style.display = 'inline-block';
  } else {
    document.getElementById("information").style.display = 'none';
    document.getElementById("loader2").style.display = "none";
    alert("Invalid File Type");
  }
  enableSubmit();
}

function handleDetection() {
  document.getElementById("loader3").style.display = "block";
  document.getElementById('arrow-icon').style.display = "none";
}