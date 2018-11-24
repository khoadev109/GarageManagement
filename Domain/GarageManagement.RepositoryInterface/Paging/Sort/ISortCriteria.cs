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
    public enum SortDirection
    {
        Ascending = 0,
        Descending = 1
    }

    public interface ISortCriteria<T>
    {
        SortDirection Direction { get; set; }
        IOrderedQueryable<T> ApplyOrdering(IQueryable<T> query, Boolean useThenBy);
    }
}
