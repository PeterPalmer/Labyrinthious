using System;
using Microsoft.AspNet.SignalR;

namespace Labyrinthious.Cloud
{
	public interface ISignalHubClient
	{
		void Send(string name, string message);
		void PostOrientation(double pitch, double roll, double yaw);
		void DeviceConnected();
	}

	public class SignalHub : Hub, ISignalHubClient
	{
		public void Send(string name, string message)
		{
			// Call the addNewMessageToPage method to update clients.
			Clients.All.addNewMessageToPage(name, message);
		}

		public void PostOrientation(double pitch, double roll, double yaw)
		{
			this.Clients.AllExcept(this.Context.ConnectionId).PostOrientation(ToRadians(pitch), ToRadians(roll), ToRadians(yaw));
		}

		public void DeviceConnected()
		{
			this.Clients.AllExcept(this.Context.ConnectionId).DeviceConnected();
		}

		private double ToRadians(double value)
		{
			return (value / 360) * Math.PI * 2;
		}
	}
}