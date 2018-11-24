using System;
using NHibernate;
using NHibernate.Criterion;
using NHibernate.Dialect.Function;

namespace Common.Core.Nhibernate.CustomDialect.DialectProjectionsExtensions
{
    public static class DateProjections
    {
        private const string DATE_DIFF_FORMAT = "DATEDIFF({0}, ?1, ?2)";
        
        public static IProjection DateDiff(string datepart, IProjection startDateProperty, IProjection endDateProperty)
        {
            string sqlFunctionTemplate = string.Format(DATE_DIFF_FORMAT, datepart);
            return Projections.SqlFunction(
                    new SQLFunctionTemplate(NHibernateUtil.Int32, sqlFunctionTemplate),
                                            NHibernateUtil.Int32, startDateProperty, endDateProperty);
        }
    }
}
