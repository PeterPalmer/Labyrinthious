using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using Labyrinthious.Cloud.Models;
using Labyrinthious.MazeGeneration;
using WebGrease.Css.Extensions;

namespace Labyrinthious.Cloud.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			string serverUrl = string.Empty;

			if (Request.Url != null)
			{
				serverUrl = string.Format("{0}://{1}{2}", Request.Url.Scheme, Request.Url.Authority, Url.Content("~"));
			}

			if (String.CompareOrdinal(Request.Url.Authority, "localhost") == 0)
			{
				serverUrl = "http://192.168.1.77/labyrinthious/";
			}

			var model = new IndexModel();
			model.QRCodeContentget = Path.Combine(serverUrl, "Mobile");

			var maze = this.GenerateMaze();
			var vectors = MazeConverter.ToVectors(maze).ToList();
			vectors.ForEach(NormalizeCoordinates);
			model.Vectors = vectors;
			model.Walls = maze;

			return View(model);
		}

		public ActionResult Mobile()
		{
			return View();
		}

		public ActionResult Maze()
		{
			var maze = this.GenerateMaze();
			var vectors = MazeConverter.ToVectors(maze);
			vectors.ForEach(NormalizeCoordinates);

			return View(vectors);
		}

		public FileContentResult TypeDef()
		{
			var hubs = new Scripts.typings.Hubs();
			string definition = hubs.TransformText();

			return File(Encoding.UTF8.GetBytes(definition), "text/plain", "SignalHub.d.ts");
		}

		private Directions[,] GenerateMaze()
		{
			var generator = new MazeGenerator();
			var maze = generator.GenerateMaze(6, 6);

			return maze;
		}

		private void NormalizeCoordinates(Vector vector)
		{
			vector.StartX = vector.StartX * 500 / 6;
			vector.StartY = vector.StartY * 500 / 6;
			vector.EndX = vector.EndX * 500 / 6;
			vector.EndY = vector.EndY * 500 / 6;

			if (vector.StartX == 0) { vector.StartX = 1; }
			if (vector.EndX == 0) { vector.EndX = 1; }
			if (vector.StartY == 0) { vector.StartY = 1; }
			if (vector.EndY == 0) { vector.EndY = 1; }
		}
	}
}