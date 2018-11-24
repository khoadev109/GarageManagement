using System.Text;
using System.Security.Cryptography;
using System;

namespace Common.Core.Extension.Encode
{
    public static class EncodingExtensions
    {
        public static string EncodeMD5(string value)
        {
            var md5EncodedString = string.Empty;
            byte[] byteValues = System.Text.Encoding.UTF8.GetBytes(value);
            var md5Encode = MD5.Create();
            var hash = md5Encode.ComputeHash(byteValues);
            var stringBuilder = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
                stringBuilder.Append(hash[i].ToString("X2"));
            return stringBuilder.ToString();
        }

        public class Vigenere
        {

            static char[] keyTable = new char[26] { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

            private static string createCode(int length)
            {
                string code = "";
                int temp = 0;
                for (int i = 0; i < length; i++)
                {
                    temp = new Random().Next(26);
                    if (i == 0)
                        code += temp;
                    else
                        code += string.Concat("#", temp);
                }
                return code;
            }

            private static string getKey(string code)
            {
                string key = "";
                string[] arr = code.Split('#');
                int length = arr.Length;
                for (int i = 0; i < length; i++)
                {
                    key += keyTable[int.Parse(arr[i])];
                }

                return key;
            }

            private static string createKeyCode(int length)
            {
                string key = "";
                string code = "";
                try
                {
                    code = createCode(length);
                    key = getKey(code);
                }
                catch (Exception err)
                {
                    // TODO Auto-generated catch block	
                    return err.Message;
                }

                return key;
            }

            public static string Encrypt(string str)
            {
                str = StringExtensions.ConvertToUnsign(str);
                int length = str.Length;
                string keyStr = createKeyCode(length);
                var key = keyStr.ToCharArray();
                int y = key.Length;
                string c = "";
                int n = 0;
                int kt = 0;
                int temp = 0;
                for (int i = 0; i < length; i++)
                {
                    if (char.IsUpper(str[i]))
                    {
                        n = (int)str[i] - (int)'A';
                        for (int j = i; j < y; j++)
                        {
                            if (str[j] < 'A' || str[j] > 'Z')
                            {
                                c += str[i];
                                break;
                            }
                            if (j < length)
                            {
                                if (((int)key[j] + n) > 90)
                                {
                                    temp = 90 - (int)key[j];
                                    n -= temp;
                                    c += (char)((int)'A' + n - 1);
                                    break;
                                }
                                else
                                {
                                    kt = (int)key[j] + n;
                                    c += (char)kt;
                                    break;
                                }
                            }
                            else if (j >= length)
                                break;
                        }
                        if (i >= y)
                        {
                            c += str[i];
                        }
                    }
                    else
                    {
                        n = (int)str[i] - (int)'a';
                        for (int j = i; j < y; j++)
                        {
                            if (str[j] < 'a' || str[j] > 'z')
                            {
                                c += str[i];
                                break;
                            }
                            if (j < length)
                            {
                                key[j] = char.ToLower(key[j]);
                                if (((int)key[j] + n) > 122)
                                {
                                    temp = 122 - (int)key[j];
                                    n -= temp;
                                    c += (char)((int)'a' + n - 1);
                                    break;
                                }
                                else
                                {
                                    kt = (int)(key[j]) + n;
                                    c += (char)kt;
                                    break;
                                }
                            }
                            else if (j >= length)
                                break;
                        }
                        if (i >= y)
                        {
                            c += str[i];
                        }
                    }
                }

                keyStr = new string(key);
                return string.Concat(c, keyStr);
            }

            public static string Decrypt(string str)
            {
                str = StringExtensions.ConvertToUnsign(str);
                int length = str.Length;
                length = length / 2;
                string splitCode = str.Substring(0, length);
                string key = str.Substring(length);
                int y = key.Length;
                string result = "";
                int n = 0;
                for (int i = 0; i < length; i++)
                {
                    if (char.IsUpper(splitCode[i]))
                    {
                        if ((int)splitCode[i] < (int)key[i])
                            n = (90 - (int)key[i]) + ((int)splitCode[i] - (int)'A') + 1;
                        else
                            n = (int)splitCode[i] - (int)key[i];
                        if (n < 0)
                            n *= -1;
                        for (int j = i; j < y; j++)
                        {
                            if (splitCode[j] < 'A' || splitCode[j] > 'Z')
                            {
                                result += splitCode[i];
                                break;
                            }
                            if (j < length)
                            {
                                result += (char)((int)'A' + n);
                                break;
                            }
                            else if (j >= length)
                                break;
                        }
                        if (i >= y)
                        {
                            result += splitCode[i];
                        }
                    }
                    else
                    {
                        if ((int)splitCode[i] < (int)key[i])
                            n = (122 - (int)key[i]) + ((int)splitCode[i] - (int)'a') + 1;
                        else
                            n = (int)splitCode[i] - (int)key[i];
                        if (n < 0)
                            n *= -1;
                        for (int j = i; j < y; j++)
                        {
                            if (splitCode[j] < 'a' || splitCode[j] > 'z')
                            {
                                result += splitCode[i];
                                break;
                            }
                            if (j < length)
                            {
                                result += (char)((int)'a' + n);
                                break;
                            }
                            else if (j >= length)
                                break;
                        }
                        if (i >= y)
                        {
                            result += splitCode[i];
                        }
                    }
                }
                return result;
            }
        }
    }
}
