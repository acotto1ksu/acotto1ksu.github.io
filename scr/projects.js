
fetch("dat/portfolioDat.json")
  .then(res => res.json())
  .then(json => {
    for (var gallerySection in json) {

      for (const galleryCard of json[gallerySection]) {
        galleryCard.parent = gallerySection;

        //Create gallery card
        var galleryCardDiv = document.createElement("div");
        galleryCardDiv.setAttribute("class", "GalleryCard");
        var galleryCardTitle = document.createElement("sub");
        galleryCardTitle.innerHTML = galleryCard.name;

        //Populate images for the gallery cards
        var galleryCardImage = document.createElement("img");
        galleryCardImage.setAttribute("class", "GalleryCardImage");
        if (galleryCard.src_thumb != undefined) {
          galleryCardImage.setAttribute("src", `res/gallery/${gallerySection}/${galleryCard.src_thumb}`);
        } else {
          galleryCardImage.setAttribute("src", `res/gallery/${gallerySection}/${galleryCard.src}`);
        }
        galleryCardImage.setAttribute("alt", `${galleryCard.desc} (${gallerySection})`);
        
        //Clicking on gallery cards
        galleryCardDiv.addEventListener("click", function () {
          // Set modal image source to full res image.
          modalImage.setAttribute("src", `res/gallery/${galleryCard.parent}/${galleryCard.src}`); 
          if (galleryCard.pixelate == true) {
            modalImage.style.imageRendering = "pixelated";
          } else {
            modalImage.style.imageRendering = "initial";
          }
      
          modalTitle.innerHTML = galleryCard.name;
          modalSubtitle.innerHTML = galleryCard.desc;  
          modal.style.display = "grid";
        });
  
        galleryCardDiv.appendChild(galleryCardImage);
        galleryCardDiv.appendChild(galleryCardTitle);
  
        //Append the card to the gallery.
        document.getElementById(`Gallery${gallerySection}`).appendChild(galleryCardDiv);
      }
    }
  });

//Modal elements
var modal = document.getElementById("ArtModal");
var body = document.querySelector("body");

var modalCard = document.querySelector(".ModalCard");
var modalImage = document.querySelector(".ModalImg");
var modalTitle = document.querySelector(".ModalTitle");
var modalSubtitle = document.querySelector(".ModalSub");
var modalClose = document.querySelector(".ModalClose");

//Modal close
modal.addEventListener("click", function (event) {
  if (
    event.target === modalClose ||
    event.target === modal
  ) {
    modal.style.display = "none"; 
    body.style.overflow = "initial";
  }
});

modalClose.addEventListener("click", function() {
  modal.style.display = "none"; 
  body.style.overflow = "initial";
});