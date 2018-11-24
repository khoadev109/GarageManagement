using System;
using System.Linq;
using System.Linq.Expressions;

namespace Common.Core.Extension.DynamicExpression
{
    public static class ExpressionExtensions<T>
    {
        public static Expression<Func<TMember, T>> CreateGroupBySelect<TMember>(TMember member, string properties) where TMember : class
        {
            var parameter = Expression.Parameter(typeof(TMember), "x");
            var bindings = properties.Split(',')
                                     .Select(name => name.Trim())
                                     .Select(name => Expression.Bind(
                                        typeof(T).GetProperty(name),
                                        Expression.Property(parameter, name)
                                     ));

            var newMember = Expression.MemberInit(Expression.New(typeof(T)), bindings);
            return Expression.Lambda<Func<TMember, T>>(newMember, parameter);
        }

        public static Expression<Func<T, string>> GetGroupByKey(string[] properties)
        {
            var parameter = Expression.Parameter(typeof(T));
            var propertyExpressions = properties.Select(x => GetDeepPropertyExpression(parameter, x)).ToArray();

            Expression body = null;
            if (propertyExpressions.Length == 1)
            {
                body = propertyExpressions[0];
            }
            else
            {
                var separator = Expression.Constant(";");

                var concatMethod = typeof(string).GetMethod(
                    "Concat",
                    new[] { typeof(string), typeof(string), typeof(string) });

                body = propertyExpressions.Aggregate((x, y) => Expression.Call(concatMethod, x, separator, y));
            }

            return Expression.Lambda<Func<T, string>>(body, parameter);
        }

        private static Expression GetDeepPropertyExpression(Expression initialInstance, string property)
        {
            Expression result = null;
            foreach (var propertyName in property.Split('.'))
            {
                Expression instance = result == null ? initialInstance : result;
                result = Expression.Property(instance, propertyName);
            }
            return result;
        }
    }
}
