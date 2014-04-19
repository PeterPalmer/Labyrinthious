using System.Collections.Generic;
using Labyrinthious.MazeGeneration;

namespace Labyrinthious.Cloud.Models
{
	public class IndexModel
	{
		public string QRCodeContentget { get; set; }

		public IEnumerable<Vector> Vectors { get; set; }

		public Directions[,] Walls { get; set; }
	}
}