/*
 * Author: Zoran Maksimovic
 * Date: 16.04.2012
 * 
 * http://www.agile-code.com
 * */
using System;
using System.Linq;
using System.Reflection;
using System.Linq.Expressions;

namespace GarageManagement.RepositoryInterface.Paging
{
    public static class QueryExtensions
    {
        public static IOrderedQueryable<TEntity> OrderBy<TEntity>(this IQueryable<TEntity> source, string orderByProperty, bool desc) where TEntity : class
        {
            string command = desc ? "OrderByDescending" : "OrderBy";

            if (orderByProperty.Contains("."))
                return source.OrderByNavigationProperty(orderByProperty, command); 
            else
                return source.OrderByScalarProperty(orderByProperty, command);
        }

        public static IOrderedQueryable<TEntity> ThenBy<TEntity>(this IQueryable<TEntity> source, string orderByProperty, bool desc) where TEntity : class
        {
            string command = desc ? "ThenByDescending" : "ThenBy";
            var type = typeof(TEntity);
            var property = type.GetProperty(orderByProperty, BindingFlags.Public | BindingFlags.Static | BindingFlags.Instance | BindingFlags.IgnoreCase);
            var parameter = Expression.Parameter(type, property.Name);
            var propertyAccess = Expression.MakeMemberAccess(parameter, property);
            var orderByExpression = Expression.Lambda(propertyAccess, parameter);
            var resultExpression = Expression.Call(typeof(Queryable), command, new Type[] { type, property.PropertyType }, source.Expression, Expression.Quote(orderByExpression));
            return (IOrderedQueryable<TEntity>)source.Provider.CreateQuery<TEntity>(resultExpression);
        }

        private static IOrderedQueryable<TEntity> OrderByScalarProperty<TEntity>(this IQueryable<TEntity> source, string orderByProperty, string command) where TEntity : class
        {
            var type = typeof(TEntity);
            var property = type.GetProperty(orderByProperty, BindingFlags.Public | BindingFlags.Static | BindingFlags.Instance | BindingFlags.IgnoreCase);
            var parameter = Expression.Parameter(type, property.Name);
            var propertyAccess = Expression.MakeMemberAccess(parameter, property);
            var orderByExpression = Expression.Lambda(propertyAccess, parameter);
            var resultExpression = Expression.Call(typeof(Queryable), command, new Type[] { type, property.PropertyType }, source.Expression, Expression.Quote(orderByExpression));
            return (IOrderedQueryable<TEntity>)source.Provider.CreateQuery<TEntity>(resultExpression);
        }

        private static IOrderedQueryable<TEntity> OrderByNavigationProperty<TEntity>(this IQueryable<TEntity> source, string orderByProperty, string command) where TEntity : class
        {
            var type = typeof(TEntity);

            var navigationProperties = orderByProperty.Split(new char[] { '.' }, StringSplitOptions.RemoveEmptyEntries);
            var parentPropertyName = navigationProperties.FirstOrDefault();
            var childPropertyName = navigationProperties.LastOrDefault();

            var parentProperty = type.GetProperty(parentPropertyName, BindingFlags.Public | BindingFlags.Static | BindingFlags.Instance | BindingFlags.IgnoreCase);

            var parentType = parentProperty.PropertyType;
            var childProperty = parentType.GetProperty(childPropertyName, BindingFlags.Public | BindingFlags.Static | BindingFlags.Instance | BindingFlags.IgnoreCase);

            var parameter = Expression.Parameter(parentType, childProperty.Name);
            var propertyAccess = Expression.MakeMemberAccess(parameter, childProperty);
            var orderByExpression = Expression.Lambda(propertyAccess, parameter);
            var resultExpression = Expression.Call(typeof(Queryable), command, new Type[] { parentType, childProperty.PropertyType }, source.Expression, Expression.Quote(orderByExpression));
            return (IOrderedQueryable<TEntity>)source.Provider.CreateQuery<TEntity>(resultExpression);
        }
    }
}
