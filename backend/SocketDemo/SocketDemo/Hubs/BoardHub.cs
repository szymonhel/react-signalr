// // <copyright file="BoardHub.cs" company="CodePlus Software">
// // Copyright(c) 2022 All Right Reserved
// // </copyright>
// // <author>Szymon Hełmecki</author>
// // <date>10-01-2022</date>
// // <summary>BoardHub.cs</summary>

using Microsoft.AspNetCore.SignalR;
using SocketDemo.Models;

namespace SocketDemo.Hubs;

public class BoardHub: Hub<IBoardClient>
{
  public async Task SendMessage(BoardMessage message)
  {
    await Clients.All.ReceiveMessage(message);
  }
}