using System;
using System.Collections.Generic;

namespace Labyrinthious.MazeGeneration
{
	public class RecursiveBacktracking : IMazeAlgorithm
	{
		private readonly Directions[,] _grid;
		private readonly Random _random;

		private readonly Dictionary<Directions, int> _directionX = new Dictionary<Directions, int>
		{
			{Directions.N, 0},
			{Directions.E, 1},
			{Directions.S, 0},
			{Directions.W, -1},
		};

		private readonly Dictionary<Directions, int> _directionY = new Dictionary<Directions, int>
		{
			{Directions.N, -1},
			{Directions.E, 0},
			{Directions.S, 1},
			{Directions.W, 0},
		};

		private readonly Dictionary<Directions, Directions> _opposite = new Dictionary<Directions, Directions>
		{
			{Directions.N, Directions.S},
			{Directions.E, Directions.W},
			{Directions.S, Directions.N},
			{Directions.W, Directions.E},
		};

		public RecursiveBacktracking(int width, int height)
		{
			_grid = new Directions[width, height];
			_random = new Random();
		}

		public Directions[,] GenerateMaze()
		{
			this.CarvePassage(0, 0);

			return _grid;
		}

		private void CarvePassage(int fromX, int fromY)
		{
			var directions = RandomizeDirections();

			foreach (var direction in directions)
			{
				int toX = fromX + this._directionX[direction];
				int toY = fromY + this._directionY[direction];

				if (IsValidMove(fromX, fromY, toX, toY))
				{
					_grid[fromX, fromY] |= direction;
					_grid[toX, toY] |= _opposite[direction];
					CarvePassage(toX, toY);
				}
			}
		}

		private bool IsValidMove(int fromX, int fromY, int toX, int toY)
		{
			if (toX < 0 || toX >= _grid.GetLength(0) || toY < 0 || toY >= _grid.GetLength(1))
			{
				return false;
			}

			if (_grid[toX, toY] != 0)
			{
				return false;
			}

			return true;
		}

		private Stack<Directions> RandomizeDirections()
		{
			var sortedDirections = new List<Directions>
			{
				Directions.N,
				Directions.E,
				Directions.S,
				Directions.W
			};

			var randomDirections = new Stack<Directions>();
			for (int i = 0; i < 4; i++)
			{
				int index = _random.Next(sortedDirections.Count);
				randomDirections.Push(sortedDirections[index]);
				sortedDirections.RemoveAt(index);
			}

			return randomDirections;
		}
	}
}