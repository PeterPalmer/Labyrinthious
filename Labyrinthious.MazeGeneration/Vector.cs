namespace Labyrinthious.MazeGeneration
{
	public class Vector
	{
		public Vector()
		{
		}

		public Vector(int x1, int y1, int x2, int y2)
		{
			this.StartX = x1;
			this.StartY = y1;
			this.EndX = x2;
			this.EndY = y2;
		}

		public int StartX { get; set; }
		public int StartY { get; set; }
		public int EndX { get; set; }
		public int EndY { get; set; }
	}
}
