/*
 * Author: Zoran Maksimovic
 * Date: 16.04.2012
 * 
 * http://www.agile-code.com
 * */
using System;
using System.Linq;

namespace GarageManagement.RepositoryInterface.Paging
{
    public class FieldSortCriteria<T> : ISortCriteria<T> where T : class
    {
        public string FieldName { get; set; }

        public SortDirection Direction { get; set; }

        public FieldSortCriteria()
        {
            this.Direction = SortDirection.Ascending;
        }

        public FieldSortCriteria(string name, SortDirection direction) : base()
        {
            FieldName = name;
            Direction = direction;
        }

        public IOrderedQueryable<T> ApplyOrdering(IQueryable<T> qry, Boolean useThenBy)
        {
            IOrderedQueryable<T> result = null;
            var descending = this.Direction == SortDirection.Descending;
            result = !useThenBy ? qry.OrderBy(FieldName, descending) : qry.ThenBy(FieldName, descending);
            return result;
        }
    }
}
