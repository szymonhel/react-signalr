// // <copyright file="IBoardHub.cs" company="CodePlus Software">
// // Copyright(c) 2022 All Right Reserved
// // </copyright>
// // <author>Szymon Hełmecki</author>
// // <date>10-01-2022</date>
// // <summary>IBoardHub.cs</summary>

using SocketDemo.Models;

namespace SocketDemo.Hubs;

public interface IBoardClient
{
  Task ReceiveMessage(BoardMessage message);
}