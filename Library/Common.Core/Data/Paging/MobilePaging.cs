using NHibernate.Criterion;
using System.Collections.Generic;

namespace Common.Core.Data.Paging
{
    public enum PagingAction
    {
        Current,
        Next,
        Previous
    }

    public class PagingOption
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public string SortName { get; set; }
        public PagingAction Action { get; set; }
        public string OrderName { get; set; }
        public Order NhibernateOrder
        {
            get
            {
                var orderBy = Order.Asc(SortName);
                if (OrderName == "DESC")
                    orderBy = Order.Desc(SortName);
                return orderBy;
            }
        }
    }

    public class PagingRequest<TFilter> where TFilter : Dictionary<string, object>
    {
        public TFilter FilterConditions { get; set; }
        public PagingOption PagingOption { get; set; }

        public PagingRequest(PagingOption pagingOptionInput)
        {
            PagingOption = new PagingOption();

            PagingOption.Action = pagingOptionInput.Action;
            if (PagingOption.Action == PagingAction.Next)
                PagingOption.PageIndex = pagingOptionInput.PageIndex + 1;
            else if (PagingOption.Action == PagingAction.Previous)
                PagingOption.PageIndex = pagingOptionInput.PageIndex - 1;
            else
                PagingOption.PageIndex = pagingOptionInput.PageIndex;

            PagingOption.PageSize = pagingOptionInput.PageSize;
            PagingOption.SortName = pagingOptionInput.SortName;
            PagingOption.OrderName = !string.IsNullOrEmpty(pagingOptionInput.OrderName) ? pagingOptionInput.OrderName : "ASC";
        }
    }

    public class PagingResponse : PagingOption
    {
        public long TotalPages { get; set; }
        public int NextPage { get; set; }
        public int PreviousPage { get; set; }

        public PagingResponse(long totalPages, PagingOption pagingRequestOption)
        {
            TotalPages = totalPages;
            NextPage = PageIndex + 1;
            PreviousPage = PageIndex - 1;
            Action = pagingRequestOption.Action;
            PageSize = pagingRequestOption.PageSize;
            PageIndex = pagingRequestOption.PageIndex;
            SortName = pagingRequestOption.SortName;
            OrderName = pagingRequestOption.OrderName;
        }
    }
}
