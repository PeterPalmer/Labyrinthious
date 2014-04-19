using System;
using System.Drawing.Imaging;
using System.IO;
using System.Web;
using System.Web.Mvc;
using ZXing;
using ZXing.Common;

namespace Labyrinthious.Cloud.Extensions
{
	public static class HtmlHelperExtensions
	{
		public static IHtmlString GenerateRelayQrCode(this HtmlHelper html, string content, int height = 250, int width = 250, int margin = 0)
		{
			var barcodeWriter = new BarcodeWriter
			{
				Format = BarcodeFormat.QR_CODE,
				Options = new EncodingOptions
				{
					Height = height,
					Width = width,
					Margin = margin
				}
			};

			using (var bitmap = barcodeWriter.Write(content))
			using (var stream = new MemoryStream())
			{
				bitmap.Save(stream, ImageFormat.Gif);

				var img = new TagBuilder("img");
				img.MergeAttribute("alt", "your alt tag");
				img.Attributes.Add("src", String.Format("data:image/gif;base64,{0}",
					Convert.ToBase64String(stream.ToArray())));

				return MvcHtmlString.Create(img.ToString(TagRenderMode.SelfClosing));
			}
		}
	}
}