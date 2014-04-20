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

    var Collision = (function () {
        function Collision(col, row, dir) {
            this.column = col;
            this.row = row;
            this.direction = dir;
        }
        return Collision;
    })();
    Labyrinthious.Collision = Collision;

    var CollisionDetection = (function () {
        function CollisionDetection() {
        }
        CollisionDetection.prototype.SetPosition = function (top, left) {
            this.currentTop = top;
            this.currentLeft = left;

            this.row = Math.floor((Math.abs(top + 43) / 83));
            this.col = Math.floor((Math.abs(left + 43) / 83));
        };

        CollisionDetection.prototype.GetCollisions = function () {
            return this.collisions;
        };

        CollisionDetection.prototype.GetDirections = function (newTop, newLeft) {
            var result = new Array();

            if (newTop > this.currentTop) {
                if ((newTop + 100) - ((this.row + 1) * 83) > 30) {
                    result.push(Direction.South);
                }
            }

            if (newTop < this.currentTop) {
                if (((this.row * 83) - newTop) > 30) {
                    result.push(Direction.North);
                }
            }

            if (newLeft < this.currentLeft) {
                if ((this.col * 83) - newLeft > 30) {
                    result.push(Direction.West);
                }
            }

            if (newLeft > this.currentLeft) {
                if (((newLeft + 100 - (this.col + 1) * 83)) > 30) {
                    result.push(Direction.East);
                }
            }

            return result;
        };

        CollisionDetection.prototype.CollisionDetected = function (top, left, directions) {
            var newRow = Math.floor((Math.abs(top + 43) / 83));
            var newCol = Math.floor((Math.abs(left + 43) / 83));

            this.collisions = new Array();

            for (var i = 0; i < directions.length; i++) {
                if ((walls[this.row + this.col * 6] & directions[i]) == 0) {
                    this.collisions.push(new Collision(this.col, this.row, directions[i]));
                }
            }

            if (newRow < this.row && (walls[this.row + this.col * 6] & Direction.North) == 0) {
                this.collisions.push(new Collision(this.col, this.row, Direction.North));
            }

            if (newRow > this.row && (walls[this.row + this.col * 6] & Direction.South) == 0) {
                this.collisions.push(new Collision(this.col, this.row, Direction.South));
            }

            if (newCol < this.col && (walls[this.row + this.col * 6] & Direction.West) == 0) {
                this.collisions.push(new Collision(this.col, this.row, Direction.West));
            }

            if (newCol > this.col && (walls[this.row + this.col * 6] & Direction.East) == 0) {
                this.collisions.push(new Collision(this.col, this.row, Direction.East));
            }

            return this.collisions.length > 0;
        };
        return CollisionDetection;
    })();
    Labyrinthious.CollisionDetection = CollisionDetection;
})(Labyrinthious || (Labyrinthious = {}));
//# sourceMappingURL=CollisionDetection.js.map
