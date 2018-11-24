using NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Core.Data.SqlLog
{
    public class SQLDebugOutput : EmptyInterceptor, IInterceptor
    {
        public override NHibernate.SqlCommand.SqlString OnPrepareStatement(NHibernate.SqlCommand.SqlString sql)
        {
            System.Diagnostics.Debug.WriteLine("NH: " + sql);

            return base.OnPrepareStatement(sql);
        }
    }
}
