let uploadedImage;

const imageDropType = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

const imageDropArea = document.getElementById("imageDropZone");

imageDropArea.addEventListener("dragenter", (event) => {
  event.preventDefault();
  event.target.classList.add("hightLight");
});

imageDropArea.addEventListener("dragleave", (event) => {
  event.preventDefault();
  event.target.classList.remove("hightLight");
});

imageDropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  event.target.classList.add("hightLight");
});

imageDropArea.addEventListener("drop", async (event) => {
  event.preventDefault();
  event.target.classList.remove("hightLight");
  console.log(event.dataTransfer.files[0]);
  if (!imageDropType.includes(event.dataTransfer.files[0].type)) {
    console.log("not supported type");
    return;
  }

  const imageReader = document.getElementById("image_reader");
  imageReader.textContent = event.dataTransfer.files[0].name;

  const imgSource = await loadImageFromFile(event.dataTransfer.files[0]);
  const imgElement = document.createElement("img");
  imgElement.src = imgSource;
  event.target.append(imgElement);
});

imageDropArea.addEventListener("dragend", (event) => {
  event.target.classList.remove("hightLight");
});

console.log(imageDropArea);

const loadImageFromFile = (imagePath) => {
  const fileReader = new FileReader();
  const promise = new Promise((resolve, reject) => {
    fileReader.onload = (e) => resolve(e.target.result);
    fileReader.onError = (error) => reject(error);
  });

  fileReader.readAsDataURL(imagePath);
  return promise;
};
