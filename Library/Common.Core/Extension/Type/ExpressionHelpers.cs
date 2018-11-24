using System.Linq.Expressions;

namespace Common.Core.Extension
{
    public class ExpressionHelpers
    {
        /// <summary>
        /// Get property name from a member expression.
        /// </summary>
        /// <param name="expression"></param>
        /// <returns></returns>
        public static string GetProperty(Expression expression)
        {
            if (IsConversion(expression) && expression is UnaryExpression)
            {
                var memberExpression = ((UnaryExpression)expression).Operand as MemberExpression;
                return memberExpression.Member.Name;
            }
            if (expression is MemberExpression)
            {
                var memberExpression = (MemberExpression)expression;
                return memberExpression.Member.Name;
            }
            return string.Empty;
        }

        private static bool IsConversion(Expression exp)
        {
            return (exp.NodeType == ExpressionType.Convert || exp.NodeType == ExpressionType.ConvertChecked);
        }
    }
}
