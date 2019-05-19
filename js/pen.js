class Pen {
	constuctor(mouseX1, mouseY1, mouseX2, mouseY2) {
		this.isDrawing = false;
		this.isErasing = false;
		this.color;
		this.backgroundColor;
		this.stroke;
		this.mouseX1 = mouseX1;
		this.mouseY1 = mouseY1;
		this.mouseX2 = mouseX2;
		this.mouseY2 = mouseY2;
	}
	setXY1(mouseX1, mouseY1) {
		this.mouseX1 = mouseX1;
		this.mouseY1 = mouseY1;
	}
	setXY2(mouseX2, mouseY2) {
		this.mouseX2 = mouseX2;
		this.mouseY2 = mouseY2;
	}
	setColor(color) {
		this.color = color;
	}
	setStroke(stroke) {
		this.stroke = stroke;
	}
	draw() {
		ctx.strokeStyle = this.color;
		ctx.lineWidth = this.stroke;
		ctx.beginPath();
		ctx.moveTo(this.mouseX1, this.mouseY1);
		ctx.lineTo(this.mouseX2, this.mouseY2);
		ctx.closePath();
		ctx.stroke();
	}
	colorfullCanvas() {
		let gradient = ctx2.createLinearGradient(50, 50, 250, 250);
		gradient.addColorStop(0,"#000000");
		gradient.addColorStop(0.15,"#7E5835");
		gradient.addColorStop(0.30,"#FF0000");
		gradient.addColorStop(0.45,"#FEE347"); 
		gradient.addColorStop(0.60,"#32CD32");
		gradient.addColorStop(0.70,"#ADD8E6");
		gradient.addColorStop(0.85,"#5472AE");
		gradient.addColorStop(1,"#FFFFFF");    
		ctx2.fillStyle = gradient;            // Affectation au remplissage
		ctx2.fillRect(0,0,canvasColor.width,canvasColor.height);
	}
	pickerColor(mouseX, mouseY) {
		let mapPixel = ctx2.getImageData(mouseX, mouseY, 1, 1);
		this.color = `rgba(${mapPixel.data[0]}, ${mapPixel.data[1]}, ${mapPixel.data[2]}, ${mapPixel.data[3]})`;
	}
	paintFull() {
		ctx.fillStyle = this.color;
		this.backgroundColor = this.color;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
	erasePart() {
		ctx.fillStyle = this.backgroundColor;
		console.log(this.backgroundColor);
		ctx.fillRect(this.mouseX1, this.mouseY1, 20, 20);
	}
}