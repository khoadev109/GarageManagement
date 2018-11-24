using System;
using AutoMapper;
using System.Threading.Tasks;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using Microsoft.Owin.Security.Infrastructure;
using GarageManagement.Garage.Entity.Entities;
using static Common.Core.WebAPI.Authentication.TokenConfiguration;

namespace GarageManagement.Garage.WebAPI.Provider
{
    public class APIRefreshTokenProvider : IAuthenticationTokenProvider
    {
        public readonly IMapper _mapper;
        public readonly IRefreshTokenBusinessService _refreshTokenService;

        public APIRefreshTokenProvider(IMapper mapper, IRefreshTokenBusinessService refreshTokenService)
        {
            _mapper = mapper;
            _refreshTokenService = refreshTokenService;
        }

        public async Task CreateAsync(AuthenticationTokenCreateContext context)
        {
            var userId = context.Ticket.Properties.Dictionary["userId"];

            if (string.IsNullOrEmpty(userId))
                return;

            var refreshTokenGuid = Guid.NewGuid();
            var refreshTokenId = refreshTokenGuid.ToString("n");
            var refreshTokenLifeTime = RefreshTokenExpireTimeMinutes;

            var token = new RefreshToken()
            {
                ProtectedTicket = "",
                Token = refreshTokenId,
                UserId = int.Parse(userId),
                IssuedUtc = DateTime.UtcNow,
                ExpiresUtc = DateTime.UtcNow.AddMinutes(Convert.ToDouble(refreshTokenLifeTime))
            };

            context.Ticket.Properties.IssuedUtc = token.IssuedUtc;
            context.Ticket.Properties.ExpiresUtc = token.ExpiresUtc;

            token.ProtectedTicket = context.SerializeTicket();

            var tokenDTO = _mapper.Map<DTORefreshToken>(token);
            var result = await _refreshTokenService.AddRefreshTokenAsync(tokenDTO);
            if (!result.HasErrors)
            {
                context.SetToken(refreshTokenId);
            }
        }

        public async Task ReceiveAsync(AuthenticationTokenReceiveContext context)
        {
            var result = await _refreshTokenService.FindRefreshTokenAsync(context.Token);
            if (!result.HasErrors)
            {
                context.DeserializeTicket(result.Target.ProtectedTicket);
                var removedRefreshTokenResult = await _refreshTokenService.RemoveRefreshTokenAsync(result.Target);
            }
        }

        public void Create(AuthenticationTokenCreateContext context)
        {
            throw new NotImplementedException();
        }

        public void Receive(AuthenticationTokenReceiveContext context)
        {
            throw new NotImplementedException();
        }
    }
}
