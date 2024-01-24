using AuctionService.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddDbContext<AuctionDbContext>(opt =>
{
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
var app = builder.Build();
app.UseAuthentication();
app.MapControllers();
try { DbInitializer.InitDb(app); }
catch (Exception e) { Console.WriteLine(e); }
app.Run();