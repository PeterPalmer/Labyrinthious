using System.Collections.Generic;

namespace Labyrinthious.MazeGeneration
{
	public class MazeConverter
	{
		public static IEnumerable<Vector> ToVectors(Directions[,] grid)
		{
			List<Vector> vectors = new List<Vector>();

			AddVerticalVectors(grid, vectors);
			AddHorizontalVectors(grid, vectors);

			return vectors;
		}

		private static void AddVerticalVectors(Directions[,] grid, List<Vector> vectors)
		{
			Vector currentVector = null;
			for (int x = 0; x < grid.GetLength(0); x++)
			{
				for (int y = 0; y < grid.GetLength(1); y++)
				{
					if ((grid[x, y] & Directions.W) == 0)
					{
						if (currentVector == null)
						{
							currentVector = new Vector(x, y, x, y + 1);
						}

						currentVector.EndY = y + 1;
					}
					else
					{
						if (currentVector != null)
						{
							vectors.Add(currentVector);
							currentVector = null;
						}
					}
				}

				if (currentVector != null)
				{
					vectors.Add(currentVector);
					currentVector = null;
				}
			}

			int lastX = grid.GetLength(0) - 1;
			for (int y = 0; y < grid.GetLength(1); y++)
			{
				if ((grid[lastX, y] & Directions.E) == 0)
				{
					if (currentVector == null)
					{
						currentVector = new Vector(lastX + 1, y, lastX + 1, y);
					}

					currentVector.EndY = y + 1;
				}
				else
				{
					if (currentVector != null)
					{
						vectors.Add(currentVector);
						currentVector = null;
					}
				}
			}

			if (currentVector != null)
			{
				vectors.Add(currentVector);
			}
		}

		private static void AddHorizontalVectors(Directions[,] grid, List<Vector> vectors)
		{
			Vector currentVector = null;

			for (int y = 0; y < grid.GetLength(1); y++)
			{
				for (int x = 0; x < grid.GetLength(0); x++)
				{
					if ((grid[x, y] & Directions.N) == 0)
					{
						if (currentVector == null)
						{
							currentVector = new Vector(x, y, x + 1, y);
						}

						currentVector.EndX = x + 1;
					}
					else
					{
						if (currentVector != null)
						{
							vectors.Add(currentVector);
							currentVector = null;
						}
					}
				}

				if (currentVector != null)
				{
					vectors.Add(currentVector);
					currentVector = null;
				}
			}

			int lastY = grid.GetLength(1) - 1;
			for (int x = 0; x < grid.GetLength(0); x++)
			{
				if ((grid[x, lastY] & Directions.S) == 0)
				{
					if (currentVector == null)
					{
						currentVector = new Vector(x, lastY + 1, x, lastY + 1);
					}

					currentVector.EndX = x + 1;
				}
				else
				{
					if (currentVector != null)
					{
						vectors.Add(currentVector);
						currentVector = null;
					}
				}
			}

			if (currentVector != null)
			{
				vectors.Add(currentVector);
			}
		}
	}
}
