namespace Labyrinthious.MazeGeneration
{
	public class MazeGenerator
	{
		public MazeGenerator()
		{
		}

		public Directions[,] GenerateMaze(int width, int height)
		{
			var algorithm = new RecursiveBacktracking(width, height);

			return algorithm.GenerateMaze();
		}
	}
}
