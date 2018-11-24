using Common.Core.Extension;
using System.ComponentModel;

namespace Common.Core.WebAPI.Authentication
{
    public enum TokenMessageType
    {
        [DefaultValue("error")]
        Error,
        [DefaultValue("invalid_grant")]
        Invalid,
        [DefaultValue("success")]
        Success
    }

    public static class TokenConfiguration
    {
        public static string TokenIssuer
        {
            get { return ConfigExtensions.GetAppSettingValueByString("Token:Issuer"); }
        }

        public static string TokenAudienceId
        {
            get { return ConfigExtensions.GetAppSettingValueByString("Token:AudienceId"); }
        }

        public static string TokenAudienceSecret
        {
            get { return ConfigExtensions.GetAppSettingValueByString("Token:AudienceSecret"); }
        }

        public static int TokenExpireTimeMinutes
        {
            get { return ConfigExtensions.GetAppSettingValueByInteger("Token:TokenExpireTimeMinutes"); }
        }

        public static int RefreshTokenExpireTimeMinutes
        {
            get { return ConfigExtensions.GetAppSettingValueByInteger("Token:RefreshTokenExpireTimeMinutes"); }
        }
    }
}
