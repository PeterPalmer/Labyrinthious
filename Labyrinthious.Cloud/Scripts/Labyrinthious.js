/// <reference path="typings/jquery.d.ts" />
/// <reference path="typings/signalr.d.ts" />
/// <reference path="typings/signalhub.d.ts" />
/// <reference path="collisiondetection.ts" />

Array.prototype["remove"] = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

var Labyrinthious;
(function (Labyrinthious) {
    var App = (function () {
        function App() {
            var _this = this;
            this.canvasTop = -7;
            this.canvasLeft = -7;
            this.currentCol = 0;
            this.currentRow = 0;
            this.collisionLines = new Array();
            this.hub = $.connection.signalHub;
            $.connection.hub.start().done(function () {
            });

            this.hub.client.postOrientation = function (pitch, roll, yaw) {
                tick(pitch, roll, yaw);
                _this.MoveCanvas(pitch, roll);
            };

            $.connection.signalHub.client.deviceConnected = function () {
                $("#qrCode").hide();
                $("#infoText").hide();
                $("#canvas").show();
                $("#maze").show();
            };

            this.detector = new Labyrinthious.CollisionDetection();

            setInterval(this.CheckLines, 333);

            setup();
        }
        App.prototype.CheckLines = function () {
            for (var i = 0; i < mainApp.collisionLines.length; i++) {
                var age = jQuery.data(mainApp.collisionLines[i], "age");
                age++;
                if (age > 3) {
                    $(mainApp.collisionLines[i]).remove();
                    mainApp.collisionLines.remove(i, i);
                    continue;
                }
                jQuery.data(mainApp.collisionLines[i], "age", age);
            }
        };

        App.prototype.MoveCanvas = function (pitch, roll) {
            var previousTop = this.canvasTop, previousLeft = this.canvasLeft;

            this.canvasTop += Math.round(pitch + pitch + pitch + pitch / -0.06);
            this.canvasLeft += Math.round(roll + roll + roll + roll / 0.15);

            this.KeepInBounds();

            var directions = this.detector.GetDirections(this.canvasTop, this.canvasLeft);

            if (this.detector.CollisionDetected(this.canvasTop, this.canvasLeft, directions)) {
                this.MarkCollisions(this.detector.GetCollisions());
                this.canvasTop = previousTop;
                this.canvasLeft = previousLeft;
            }

            $("#canvas").css("top", this.canvasTop + "px");
            $("#canvas").css("left", this.canvasLeft + "px");

            this.detector.SetPosition(this.canvasTop, this.canvasLeft);
        };

        App.prototype.KeepInBounds = function () {
            if (this.canvasTop < -20) {
                this.canvasTop = -20;
            }
            if (this.canvasLeft < -20) {
                this.canvasLeft = -20;
            }
            if (this.canvasTop > 420) {
                this.canvasTop = 420;
            }
            if (this.canvasLeft > 420) {
                this.canvasLeft = 420;
            }
        };

        App.prototype.MarkCollisions = function (collisions) {
            for (var i = 0; i < collisions.length; i++) {
                var line;

                if (collisions[i].direction == Labyrinthious.Direction.North) {
                    line = this.CreateLine(collisions[i].column, collisions[i].row, collisions[i].column + 1, collisions[i].row);
                } else if (collisions[i].direction == Labyrinthious.Direction.South) {
                    line = this.CreateLine(collisions[i].column, collisions[i].row + 1, collisions[i].column + 1, collisions[i].row + 1);
                } else if (collisions[i].direction == Labyrinthious.Direction.West) {
                    line = this.CreateLine(collisions[i].column, collisions[i].row, collisions[i].column, collisions[i].row + 1);
                } else if (collisions[i].direction == Labyrinthious.Direction.East) {
                    line = this.CreateLine(collisions[i].column + 1, collisions[i].row, collisions[i].column + 1, collisions[i].row + 1);
                }

                if (this.LineExists(line)) {
                    continue;
                }

                line.setAttribute("stroke", "red");
                this.collisionLines.push(line);
                $("svg").append(line);
            }
        };

        App.prototype.CreateLine = function (x1, y1, x2, y2) {
            var line = document.createElementNS("http://www.w3.org/2000/svg", "line");

            line.setAttribute("x1", (x1 * 83).toString());
            line.setAttribute("y1", (y1 * 83).toString());
            line.setAttribute("x2", (x2 * 83).toString());
            line.setAttribute("y2", (y2 * 83).toString());
            jQuery.data(line, "age", 0);
            return line;
        };

        App.prototype.LineExists = function (line) {
            for (var i = 0; i < this.collisionLines.length; i++) {
                if (line.getAttribute("x1") == this.collisionLines[i].getAttribute("x1") && line.getAttribute("y1") == this.collisionLines[i].getAttribute("y1") && line.getAttribute("x2") == this.collisionLines[i].getAttribute("x2") && line.getAttribute("y2") == this.collisionLines[i].getAttribute("y2")) {
                    return true;
                }
            }

            return false;
        };
        return App;
    })();
    Labyrinthious.App = App;
})(Labyrinthious || (Labyrinthious = {}));

var mainApp;

$(function () {
    mainApp = new Labyrinthious.App();
});
//# sourceMappingURL=Labyrinthious.js.map
