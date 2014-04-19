using System.Web.Optimization;

namespace Labyrinthious.Cloud
{
	public class BundleConfig
	{
		// For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
		public static void RegisterBundles(BundleCollection bundles)
		{
			bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
						"~/Scripts/jquery-{version}.js"));

			bundles.Add(new StyleBundle("~/Content/css").Include(
			"~/Content/site.css"));

			// Set EnableOptimizations to false for debugging. For more information,
			BundleTable.EnableOptimizations = true;
		}
	}
}
