module Labyrinthious {

    declare var walls: number[];

    export class Direction {
        public static None: number = 0;
        public static North: number = 1;
        public static South: number = 2;
        public static East: number = 4;
        public static West: number = 8;
    }

    export class Collision {
        public column: number;
        public row: number;
        public direction: Direction;

        constructor(col: number, row: number, dir: Direction) {
            this.column = col;
            this.row = row;
            this.direction = dir;
        }
    }

    export class CollisionDetection {
        private currentTop: number;
        private currentLeft: number;
        private row: number;
        private col: number;
        private collisions: Collision[];

        public SetPosition(top: number, left: number): void {
            this.currentTop = top;
            this.currentLeft = left;

            this.row = Math.floor((Math.abs(top + 43) / 83));
            this.col = Math.floor((Math.abs(left + 43) / 83));
        }

        public GetCollisions(): Collision[] {
            return this.collisions;
        }

        public GetDirections(newTop: number, newLeft: number): number[] {
            var result: number[] = new Array<number>();

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
        }

        public CollisionDetected(top: number, left: number, directions: number[]): boolean {
            var newRow = Math.floor((Math.abs(top + 43) / 83));
            var newCol = Math.floor((Math.abs(left + 43) / 83));

            this.collisions = new Array<Collision>();

            //if (top < -20 || top > 420 || left < -20 || left > 420) {
            //    return true;
            //}

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
        }
    }

} 