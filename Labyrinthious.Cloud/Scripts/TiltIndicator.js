var canvas,
	width = 100,
	height = 100,
	frame_time = 20,
	ctx,
	vectors = [],
	perspective = 420,
	intervalId,
	socket,
	tilt = { Roll: 0.0, Pitch: 0.0, Yaw: 0.0 };

function setup() {
	canvas = document.getElementById('canvas');
	if (!canvas.getContext) {
		return;
	}

	ctx = canvas.getContext('2d');
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.strokeStyle = "rgb(110, 127, 144)";
	ctx.fillRect(0, 0, width, height);
	ctx.translate(width / 2, height / 2);
	ctx.lineWidth = 1;
	ctx.save();

	vectors.push(new Vector(-18, -2, 30, 18, -2, 30));
	vectors.push(new Vector(18, -2, 30, 18, 2, 30));
	vectors.push(new Vector(18, 2, 30, -18, 2, 30));
	vectors.push(new Vector(-18, 2, 30, -18, -2, 30));

	vectors.push(new Vector(-16, -2, 18, 16, -2, 18));
	vectors.push(new Vector(16, -2, 18, 16, -2, -18));
	vectors.push(new Vector(16, -2, -18, -16, -2, -18));
	vectors.push(new Vector(-16, -2, -18, -16, -2, 18));

	vectors.push(new Vector(-18, -2, -30, 18, -2, -30));
	vectors.push(new Vector(18, -2, -30, 18, 2, -30));
	vectors.push(new Vector(18, 2, -30, -18, 2, -30));
	vectors.push(new Vector(-18, 2, -30, -18, -2, -30));

	vectors.push(new Vector(-18, 2, 30, -18, 2, -30));
	vectors.push(new Vector(-18, -2, 30, -18, -2, -30));
	vectors.push(new Vector(18, -2, 30, 18, -2, -30));
	vectors.push(new Vector(18, 2, 30, 18, 2, -30));

	var kappa = 0.5522847498, zoffset = 24;
	vectors.push(new BezierCurve(4, -2, 0 + zoffset, 0, -2, 4 + zoffset, 4, -2, 4 * kappa + zoffset, 4 * kappa, -2, 4 + zoffset));
	vectors.push(new BezierCurve(0, -2, 4 + zoffset, -4, -2, 0 + zoffset, -4 * kappa, -2, 4 + zoffset, -4, -2, 4 * kappa + zoffset));
	vectors.push(new BezierCurve(-4, -2, 0 + zoffset, 0, -2, -4 + zoffset, -4, -2, -4 * kappa + zoffset, -4 * kappa, -2, -4 + zoffset));
	vectors.push(new BezierCurve(0, -2, -4 + zoffset, 4, -2, 0 + zoffset, 4 * kappa, -2, -4 + zoffset, 4, -2, -4 * kappa + zoffset));

	tick(0, 0, 0);
}

function tick(pitch, roll , yaw) {
	tilt.Pitch = pitch;
	tilt.Roll = roll;
	tilt.Yaw = yaw;

	ctx.clearRect(width / -2, height / -2, width, height);

	for (var i = 0; i < vectors.length; i++) {
		vectors[i].Draw();
	}
}

function Coordinate(x, y, z) {
	this.x = this.initialx = x;
	this.y = this.initialy = y;
	this.z = this.initialz = z;

	if (typeof (coordinate_prototype_called) === 'undefined') {
		coordinate_prototype_called = true;

		Coordinate.prototype.Roll = function (angle) {
			var oldX = this.x;
			this.x = this.x * Math.cos(angle) + this.y * Math.sin(angle);
			this.y = this.y * Math.cos(angle) - oldX * Math.sin(angle);
		};

		Coordinate.prototype.Pitch = function (angle) {
			var oldZ = this.z;
			this.z = this.z * Math.cos(angle) + this.y * Math.sin(angle);
			this.y = this.y * Math.cos(angle) - oldZ * Math.sin(angle);
		};

		Coordinate.prototype.Yaw = function (angle) {
			var oldX = this.x;
			this.x = this.x * Math.cos(angle) + this.z * Math.sin(angle);
			this.z = this.z * Math.cos(angle) - oldX * Math.sin(angle);
		};

		Coordinate.prototype.Tilt = function () {
			this.x = this.initialx;
			this.y = this.initialy;
			this.z = this.initialz;

			this.Roll(tilt.Roll * -1);
			this.Pitch(tilt.Pitch * -1);
			this.Yaw(tilt.Yaw);
		};

		Coordinate.prototype.ProjectedX = function () {
			return (perspective * this.x) / (perspective - this.z);
		};

		Coordinate.prototype.ProjectedY = function () {
			return (perspective * this.y) / (perspective - this.z);
		};
	}
}

function Vector(x1, y1, z1, x2, y2, z2) {
	this.start = new Coordinate(x1, y1, z1);
	this.end = new Coordinate(x2, y2, z2);

	if (typeof (vector_prototype_called) === 'undefined') {
		vector_prototype_called = true;
		Vector.prototype.Draw = function () {
			this.start.Tilt();
			this.end.Tilt();

			ctx.beginPath();
			ctx.moveTo(this.start.ProjectedX(), this.start.ProjectedY());
			ctx.lineTo(this.end.ProjectedX(), this.end.ProjectedY());
			ctx.stroke();
		};
	}
}

function BezierCurve(x1, y1, z1, x2, y2, z2, xc1, yc1, zc1, xc2, yc2, zc2) {
	this.start = new Coordinate(x1, y1, z1);
	this.end = new Coordinate(x2, y2, z2);
	this.ctrl1 = new Coordinate(xc1, yc1, zc1);
	this.ctrl2 = new Coordinate(xc2, yc2, zc2);

	if (typeof (bezierCurve_prototype_called) === 'undefined') {
		bezierCurve_prototype_called = true;
		BezierCurve.prototype.Draw = function () {
			this.start.Tilt();
			this.end.Tilt();
			this.ctrl1.Tilt();
			this.ctrl2.Tilt();

			ctx.beginPath();
			ctx.moveTo(this.start.ProjectedX(), this.start.ProjectedY());
			ctx.bezierCurveTo(this.ctrl1.ProjectedX(), this.ctrl1.ProjectedY(),
							  this.ctrl2.ProjectedX(), this.ctrl2.ProjectedY(),
							  this.end.ProjectedX(), this.end.ProjectedY());
			ctx.stroke();
		};
	}
}