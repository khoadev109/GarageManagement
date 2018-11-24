using System;

namespace Common.Core.AutoGenerate
{
    public enum NumberUnitType
    {
        Large,
        Medium,
        Small,
        Tiny
    }

    public static class IdentityGenerate
    {
        public static string GetNumberGenerate(string identity)
        {
            var segments = identity.Split(new char[] { '-' }, StringSplitOptions.RemoveEmptyEntries);
            return segments[segments.Length - 1];
        }

        public static string Create(long currentNumber, string[] prefixes, NumberUnitType numberUnitType)
        {
            var symbolPrefix = string.Join("-", prefixes);
            var generateIdentity = $"{symbolPrefix}-{CreateGenerateNumber(currentNumber + 1, numberUnitType)}";
            return generateIdentity;
        }

        private static string CreateGenerateNumber(double numberGenerate, NumberUnitType numberUnitType)
        {
            string numberIdentityGenerate = string.Empty;

            if (numberUnitType == NumberUnitType.Large)
                numberIdentityGenerate = numberGenerate.ToString("000000");

            if (numberUnitType == NumberUnitType.Medium)
                numberIdentityGenerate = numberGenerate.ToString("00000");

            if (numberUnitType == NumberUnitType.Small)
                numberIdentityGenerate = numberGenerate.ToString("000");

            if (numberUnitType == NumberUnitType.Tiny)
                numberIdentityGenerate = numberGenerate.ToString("00");

            return numberIdentityGenerate;
        }
    }
}
