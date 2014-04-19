using Labyrinthious.MazeGeneration;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Labyrinthious.MazeGeneratorTests
{
	[TestClass]
	public class RecursiveBacktrackingTest
	{
		[TestMethod]
		public void GenerateMaze_ResultIsNotEmpty()
		{
			var algorithm = new RecursiveBacktracking(10, 10);

			var grid = algorithm.GenerateMaze();

			bool everyCellIsEmpty = true;
			for (int x = 0; x < grid.GetLength(0); x++)
			{
				for (int y = 0; y < grid.GetLength(1); y++)
				{
					if (grid[x, y] != 0)
					{
						everyCellIsEmpty = false;
						break;
					}
				}
			}

			Assert.IsFalse(everyCellIsEmpty);
		}
	}
}
