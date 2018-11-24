using System;

namespace Common.Core.Extension
{
    public static class IntegerExtensions
    {
        public static long GetLength(long value)
        {
            if (value < 0)
                throw new ArgumentOutOfRangeException();
            if (value == 0)
                return 1;
            return (int)Math.Floor(Math.Log10(value)) + 1;
        }

        public static int GetFromString(string value)
        {
            try
            {
                return int.Parse(value);
            }
            catch (Exception exception)
            {
                return 0;
            }
        }
    }
}
