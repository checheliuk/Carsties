using System.Net;
using System.Net.Http.Json;
using AuctionService.Data;
using AuctionService.DTOs;
using Contracts;
using MassTransit.Testing;
using Microsoft.Extensions.DependencyInjection;

namespace AuctionService.IntegrationTests;

[Collection("Shared collection")]
public class AuctionBusTests(CustomWebAppFactory factory) : IAsyncLifetime
{
    private readonly HttpClient _httpClient = factory.CreateClient();
    private const string GT_ID = "afbee524-5972-4075-8800-7d1f9d7b0a0c";
    private ITestHarness _testHarness = factory.Services.GetTestHarness();
    
    [Fact]
    public async Task CreateAuction_WithValidObject_ShouldPublishAuctionCreated()
    {
        // arrange
        var auction = GetAuctionForCreate();
        _httpClient.SetFakeJwtBearerToken(AuthHelper.GetBearerForUser("bob"));
        
        // act 
        var response = await _httpClient.PostAsJsonAsync("api/auctions", auction);
        
        //assert
        response.EnsureSuccessStatusCode();
        Assert.True(await _testHarness.Published.Any<AuctionCreated>());
    }
    
    public Task InitializeAsync() => Task.CompletedTask;

    public Task DisposeAsync()
    {
        using var scope = factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AuctionDbContext>();
        DbHelper.ReinitDbForTests(db);
        return Task.CompletedTask;
    }
    
    private CreateAuctionDto GetAuctionForCreate() => new()
    {
        Make = "test",
        Model = "testModel",
        ImageUrl = "test",
        Color = "test",
        Mileage = 10,
        Year = 10,
        ReservePrice = 10
    };
}