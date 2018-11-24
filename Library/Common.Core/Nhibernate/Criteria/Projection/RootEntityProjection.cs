using System;
using NHibernate;
using System.Linq;
using NHibernate.Type;
using NHibernate.Engine;
using NHibernate.Metadata;
using NHibernate.Criterion;
using NHibernate.SqlCommand;
using System.Collections.Generic;

namespace Common.Core.Nhibernate.Criteria.Projection
{
    /// <summary>
    /// RootEntityProjection selects all the properties of the criteria’s root entity
    /// Source: https://weblogs.asp.net/ricardoperes/custom-nhibernate-criteria-projections
    /// </summary>
    public class RootEntityProjection : IProjection
    {
        private readonly List<String> aliases = new List<String>();
        private IType[] columnTypes = null;

        protected String[] GetPropertyNames(IClassMetadata classMetadata, ICriteriaQuery criteriaQuery)
        {
            var propertyNames = classMetadata.PropertyNames.Concat(new String[] { classMetadata.IdentifierPropertyName }).Zip(classMetadata.PropertyTypes.Concat(new IType[] { classMetadata.IdentifierType }), (x, y) => new Tuple<String, IType>(x, y)).ToDictionary(x => x.Item1, x => x.Item2).Where(x => !(x.Value is ComponentType) && !(x.Value is CollectionType)).Select(x => x.Key).ToArray();

            return (propertyNames);
        }

        #region IProjection Members

        String[] IProjection.Aliases
        {
            get
            {
                return (this.aliases.ToArray());
            }
        }

        string[] IProjection.GetColumnAliases(int position, ICriteria criteria, ICriteriaQuery criteriaQuery)
        {
            throw new NotImplementedException();
        }

        string[] IProjection.GetColumnAliases(string alias, int position, ICriteria criteria, ICriteriaQuery criteriaQuery)
        {
            return (this.aliases.ToArray());
        }

        TypedValue[] IProjection.GetTypedValues(ICriteria criteria, ICriteriaQuery criteriaQuery)
        {
            throw new NotImplementedException();
        }

        IType[] IProjection.GetTypes(String alias, ICriteria criteria, ICriteriaQuery criteriaQuery)
        {
            throw new NotImplementedException();
        }

        IType[] IProjection.GetTypes(ICriteria criteria, ICriteriaQuery criteriaQuery)
        {
            if (this.columnTypes == null)
            {
                var classMetadata = criteriaQuery.Factory.GetClassMetadata(criteria.GetRootEntityTypeIfAvailable());
                var propertyNames = this.GetPropertyNames(classMetadata, criteriaQuery);

                this.columnTypes = propertyNames.Select(x => classMetadata.GetPropertyType(x)).ToArray();
            }

            return (this.columnTypes);
        }

        Boolean IProjection.IsAggregate
        {
            get { return (false); }
        }

        Boolean IProjection.IsGrouped
        {
            get { return (false); }
        }

        SqlString IProjection.ToGroupSqlString(ICriteria criteria, ICriteriaQuery criteriaQuery, IDictionary<String, IFilter> enabledFilters)
        {
            throw new NotImplementedException();
        }

        SqlString IProjection.ToSqlString(ICriteria criteria, Int32 position, ICriteriaQuery criteriaQuery, IDictionary<String, IFilter> enabledFilters)
        {
            var classMetadata = criteriaQuery.Factory.GetClassMetadata(criteria.GetRootEntityTypeIfAvailable());
            var propertyNames = this.GetPropertyNames(classMetadata, criteriaQuery);
            var builder = new SqlStringBuilder();

            for (var i = 0; i < propertyNames.Length; ++i)
            {
                var propertyName = propertyNames[i];
                var columnName = criteriaQuery.GetColumn(criteria, propertyName);

                builder.Add(columnName);
                builder.Add(" as ");
                builder.Add(propertyName);

                this.aliases.Add(propertyName);

                if (i < propertyNames.Length - 1)
                {
                    builder.Add(", ");
                }
            }

            return (builder.ToSqlString());
        }

        #endregion
    }
}
