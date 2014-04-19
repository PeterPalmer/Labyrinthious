/// <reference path="typings/jquery.d.ts" />
/// <reference path="typings/signalr.d.ts" />
/// <reference path="typings/signalhub.d.ts" />

var Labyrinthious;
(function (Labyrinthious) {
    var Direction = (function () {
        function Direction() {
        }
        Direction.None = 0;
        Direction.North = 1;
        Direction.South = 2;
        Direction.East = 4;
        Direction.West = 8;
        return Direction;
    })();
    Labyrinthious.Direction = Direction;

    var App = (function () {
        function App() {
            var _this = this;
            this.canvasTop = -7;
            this.canvasLeft = -7;
            this.currentCol = 0;
            this.currentRow = 0;
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

            setup();
        }
        App.prototype.MoveCanvas = function (pitch, roll) {
            var previousTop = this.canvasTop, previousLeft = this.canvasLeft;

            this.canvasTop += Math.round(pitch + pitch + pitch + pitch / -0.06);
            this.canvasLeft += Math.round(roll + roll + roll + roll / 0.15);

            this.KeepInBounds();

            var row = Math.floor((Math.abs(this.canvasTop + 43) / 83));
            var col = Math.floor((Math.abs(this.canvasLeft + 43) / 83));

            var directions = this.GetDirection(previousTop, this.canvasTop, previousLeft, this.canvasLeft, row, col);

            if (this.CollisionDetected(this.canvasTop, this.canvasLeft, row, col, directions)) {
                this.canvasTop = previousTop;
                this.canvasLeft = previousLeft;
            }

            $("#canvas").css("top", this.canvasTop + "px");
            $("#canvas").css("left", this.canvasLeft + "px");
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

        App.prototype.CollisionDetected = function (top, left, row, col, directions) {
            if (top < -20 || top > 420 || left < -20 || left > 420) {
                return true;
            }

            for (var i = 0; i < directions.length; i++) {
                if ((walls[this.currentRow + this.currentCol * 6] & directions[i]) == 0) {
                    return true;
                }
            }

            if (row < this.currentRow && (walls[this.currentRow + this.currentCol * 6] & Direction.North) == 0) {
                return true;
            }

            if (row > this.currentRow && (walls[this.currentRow + this.currentCol * 6] & Direction.South) == 0) {
                return true;
            }

            if (col < this.currentCol && (walls[this.currentRow + this.currentCol * 6] & Direction.West) == 0) {
                return true;
            }

            if (col > this.currentCol && (walls[this.currentRow + this.currentCol * 6] & Direction.East) == 0) {
                return true;
            }

            this.currentCol = col;
            this.currentRow = row;

            return false;
        };

        App.prototype.GetDirection = function (oldTop, newTop, oldLeft, newLeft, row, col) {
            var result = new Array();

            if (newTop > oldTop) {
                if ((newTop + 100) - ((row + 1) * 83) > 30) {
                    result.push(Direction.South);
                }
            }

            if (newTop < oldTop) {
                if (((row * 83) - newTop) > 30) {
                    result.push(Direction.North);
                }
            }

            if (newLeft < oldLeft) {
                if ((col * 83) - newLeft > 30) {
                    result.push(Direction.West);
                }
            }

            if (newLeft > oldLeft) {
                if (((newLeft + 100 - (col + 1) * 83)) > 30) {
                    result.push(Direction.East);
                }
            }

            return result;
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
