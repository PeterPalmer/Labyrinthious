using System;

namespace Labyrinthious.MazeGeneration
{
	[Flags]
	public enum Directions
	{
		N = 1,
		S = 2,
		E = 4,
		W = 8
	}
}
