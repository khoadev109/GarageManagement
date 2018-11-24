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
    /// AssociationEntityProjection selects all the properties of any joined entity, selected by its alias.
    /// Source: https://weblogs.asp.net/ricardoperes/custom-nhibernate-criteria-projections
    /// </summary>
    public class AssociationEntityProjection : IProjection
    {
        private IType[] columnTypes = null;
        private readonly Type rootEntity = null;
        private readonly String alias = null;

        protected String[] GetPropertyNames(IClassMetadata classMetadata, ICriteriaQuery criteriaQuery)
        {
            var propertyNames = classMetadata.PropertyNames.Except(criteriaQuery.Factory.GetAllCollectionMetadata().Where(x => x.Key.StartsWith(String.Concat(classMetadata.EntityName, "."))).Select(x => x.Key.Split('.').Last())).Concat(new String[] { classMetadata.IdentifierPropertyName }).ToArray();

            return (propertyNames);
        }

        public AssociationEntityProjection(Type rootEntity, String alias)
        {
            this.rootEntity = rootEntity;
            this.alias = alias;
        }

        private readonly List<String> aliases = new List<String>();

        #region IProjection Members

        String[] IProjection.Aliases
        {
            get
            {
                return (this.aliases.ToArray());
            }
        }

        public string[] GetColumnAliases(int position, ICriteria criteria, ICriteriaQuery criteriaQuery)
        {
            throw new NotImplementedException();
        }

        public string[] GetColumnAliases(string alias, int position, ICriteria criteria, ICriteriaQuery criteriaQuery)
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
                var classMetadata = criteriaQuery.Factory.GetClassMetadata(this.rootEntity);
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
            var classMetadata = criteriaQuery.Factory.GetClassMetadata(this.rootEntity);
            var propertyNames = this.GetPropertyNames(classMetadata, criteriaQuery);
            var builder = new SqlStringBuilder();

            for (var i = 0; i < propertyNames.Length; ++i)
            {
                var propertyName = propertyNames[i];
                var subcriteria = criteria.GetCriteriaByAlias(this.alias);
                var columnName = criteriaQuery.GetColumn(subcriteria, propertyName);

                builder.Add(columnName);
                builder.Add(" as ");
                builder.Add(propertyName);

                this.aliases.Add(propertyName);

                if (i < propertyNames.Length - 1)
                    builder.Add(", ");
            }
            return (builder.ToSqlString());
        }

        #endregion
    }

    public class AssociationEntityProjection<T> : AssociationEntityProjection
    {
        public AssociationEntityProjection(string alias) : base(typeof(T), alias) { }
    }
}
