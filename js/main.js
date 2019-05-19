let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
// récupère les données style du canvas
let styleCanvas = window.getComputedStyle(canvas);

let user = new Pen();

// met la couleur par défault dans le background user white
window.addEventListener("load", ()=> {
	user.backgroundColor = "white";
});

// quand le bouton de la souris est enfoncé
canvas.addEventListener("mousedown", (event)=> {
	user.isDrawing = true;
	let mouseX1 = event.clientX - canvas.getBoundingClientRect().left - parseInt(styleCanvas.borderLeftWidth);  //.offsetTop fait la même chose
	let mouseY1 = event.clientY - canvas.getBoundingClientRect().top - parseInt(styleCanvas.borderTopWidth);
	user.setXY1(mouseX1, mouseY1);
});

// quand la souris bouge
canvas.addEventListener("mousemove", (event)=> {
	if(!user.isDrawing) return;
	let mouseX2 = event.clientX - canvas.getBoundingClientRect().left - parseInt(styleCanvas.borderLeftWidth);
	let mouseY2 = event.clientY - canvas.getBoundingClientRect().top - parseInt(styleCanvas.borderTopWidth);
	user.setXY2(mouseX2, mouseY2);
	if (!user.isErasing) {
		user.draw();
	} else {
		user.erasePart();
	}
	let mouseX1 = mouseX2;
	let mouseY1 = mouseY2;
	user.setXY1(mouseX1,mouseY1);
	
});

// quand le bouton de la souris est relacher
canvas.addEventListener("mouseup", ()=>user.isDrawing = false);

// la gomme
let eraseElt = document.getElementById("eraser");
eraseElt.addEventListener("click", ()=> {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// les boutons couleur et le changement de couleur
let colorButtonElt = document.querySelectorAll("#couleur a");
for (let i = 0; i < colorButtonElt.length; i++) {
	colorButtonElt[i].addEventListener("click", function() {
		user.setColor(this.name);
	});
}

// les boutons de l'épaisseur du trait
let strokeElt = document.querySelectorAll("#trait button");
for (let i = 0; i < strokeElt.length; i++) {
	strokeElt[i].addEventListener("click", function() {
		user.setStroke(this.name);
	});
}

// pipette & canvas color
// pipette
let pipetteElt = document.getElementById("pipette");
// convas
let canvasColor = document.getElementById("colorCanvas");
let styleCanvas2 = window.getComputedStyle(colorCanvas);
let ctx2 = colorCanvas.getContext("2d");

// quand je clique sur la pipette
pipetteElt.addEventListener("click", function() {
	canvasColor.classList.toggle("hiden");
	user.colorfullCanvas();
});

// quand je clique sur le canvas
colorCanvas.addEventListener("click", function(event) {
	let mouseX = event.clientX - colorCanvas.getBoundingClientRect().left - parseInt(styleCanvas2.borderLeftWidth);  //.offsetTop fait la même chose
	let mouseY = event.clientY - colorCanvas.getBoundingClientRect().top - parseInt(styleCanvas2.borderTopWidth);
	user.pickerColor(mouseX, mouseY);
});

// sceau de peinture
let bucketPaint = document.getElementById("bucket");

bucketPaint.addEventListener("click", function() {
	user.paintFull();
});

// gomme qu'une partie selectionner
let eraserPart = document.getElementById("eraserPart");

eraserPart.addEventListener("click", function() {
	if (!user.isErasing) {
		user.isErasing = true;
	}
});

// crayon 
let pencil = document.getElementById("pencil");

pencil.addEventListener("click", function() {
	if (user.isErasing) {
		user.isErasing = false;
	}
});