using System;
using NHibernate;
using System.Data;
using System.Text;
using NHibernate.Dialect;
using NHibernate.Dialect.Function;
using NHibernate.Util;
using NHibernate.SqlCommand;

namespace Common.Core.Nhibernate.CustomDialect
{
    public class CoreDialect : MsSql2012Dialect
    {
        public CoreDialect()
        {
            RegisterSQLFunctions();
        }
        
        private void RegisterSQLFunctions()
        {
            RegisterFunction("GetFullPrice", new StandardSQLFunction("hdt.getfullPrice"));
            RegisterFunction("Upper", new StandardSQLFunction("UPPER", NHibernateUtil.String));
            RegisterFunction("Left", new StandardSQLFunction("LEFT", NHibernateUtil.String));
            RegisterFunction("Concat", new StandardSQLFunction("CONCAT", NHibernateUtil.String));
            RegisterFunction("GetDate", new StandardSQLFunction("GETDATE", NHibernateUtil.DateTime));
        }
    }
}
