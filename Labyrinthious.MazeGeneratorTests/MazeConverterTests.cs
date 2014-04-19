using System.Collections.Generic;
using System.Linq;
using Labyrinthious.MazeGeneration;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Labyrinthious.MazeGeneratorTests
{
	[TestClass]
	public class MazeConverterTests
	{
		[TestMethod]
		public void ToVectors_ConvertsDirectionsToVectors()
		{
			Directions[,] maze = new Directions[3, 3];
			maze[0, 0] = Directions.S | Directions.E;
			maze[0, 1] = Directions.E | Directions.N;
			maze[0, 2] = Directions.E;
			maze[1, 0] = Directions.W | Directions.E;
			maze[1, 1] = Directions.W | Directions.E;
			maze[1, 2] = Directions.W | Directions.E;
			maze[2, 0] = Directions.W;
			maze[2, 1] = Directions.W | Directions.S;
			maze[2, 2] = Directions.W | Directions.N;

			IEnumerable<Vector> vectors = MazeConverter.ToVectors(maze);

			Assert.IsTrue(vectors.Contains(new Vector(0, 0, 0, 3), new VectorComparer()));
			Assert.IsTrue(vectors.Contains(new Vector(1, 1, 3, 1), new VectorComparer()));
			Assert.IsTrue(vectors.Contains(new Vector(0, 2, 2, 2), new VectorComparer()));
			Assert.IsTrue(vectors.Contains(new Vector(0, 3, 3, 3), new VectorComparer()));
		}
	}

	class VectorComparer : IEqualityComparer<Vector>
	{
		public bool Equals(Vector vector1, Vector vector2)
		{
			return vector1.StartX == vector2.StartX &&
				   vector1.StartY == vector2.StartY &&
				   vector1.EndX == vector2.EndX &&
				   vector1.EndY == vector2.EndY;
		}

		public int GetHashCode(Vector vector)
		{
			return (vector.StartX + vector.StartY + vector.EndX + vector.EndY).GetHashCode();
		}
	}
}
