using SocketDemo.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
  options.AddPolicy("ClientPermission", policy =>
  {
    policy.AllowAnyHeader()
      .AllowAnyMethod()
      .WithOrigins("http://localhost:3000")
      .AllowCredentials();
  });
});

var app = builder.Build();

app.UseRouting();
app.UseEndpoints (z =>
{
  z.MapControllers();
  z.MapHub<BoardHub>("/hubs/board");
});
app.UseCors("ClientPermission");
app.Run();