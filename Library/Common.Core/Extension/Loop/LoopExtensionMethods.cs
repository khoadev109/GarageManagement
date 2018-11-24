using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Core.Extension.Loop
{
    #region Extension Methods

    /// <summary>
    /// Handles looping through collections with additional details
    /// </summary>
    public static class LoopExtensionMethods
    {

        public static IEnumerable<T> Each<T>(this IEnumerable<T> collection,
            Action<ElementDetail<T>> each)
        {
            return LoopExtensionMethods
        .Each<T>(collection, 0, collection.Count(), each);
        }

        public static IEnumerable<T> Each<T>(this IEnumerable<T> collection,
            int start,
            Action<ElementDetail<T>> each)
        {
            return LoopExtensionMethods
        .Each<T>(collection, start, collection.Count(), each);
        }

        public static IEnumerable<T> Each<T>(this IEnumerable<T> collection,
            int start,
            int end,
            Action<ElementDetail<T>> each)
        {
            Action<ElementDetail<T>, T> handle = (detail, item) => { each(detail); };
            return LoopExtensionMethods
        .Each<T>(collection, start, end, handle);
        }

        public static IEnumerable<T> Each<T>(this IEnumerable<T> collection,
            Action<ElementDetail<T>, T> each)
        {
            return LoopExtensionMethods
        .Each<T>(collection, 0, collection.Count(), each);
        }

        public static IEnumerable<T> Each<T>(this IEnumerable<T> collection,
            int start,
            Action<ElementDetail<T>, T> each)
        {
            return LoopExtensionMethods
        .Each<T>(collection, start, collection.Count(), each);
        }

        public static IEnumerable<T> Each<T>(this IEnumerable<T> collection,
            int start,
            int end,
            Action<ElementDetail<T>, T> each)
        {

            //verify the ranges
            if (start < 0 || end > collection.Count())
            {
                throw new ArgumentOutOfRangeException();
            }

            //perform the work
            foreach (T value in collection)
            {
                each(new ElementDetail<T>(value, start++, end, collection), value);
                if (start == end) { break; }
            }
            return collection;
        }

    }

    #endregion

    #region Detail Information Class

    /// <summary>  
    /// Contains a summary of information about the item current in the loop  
    /// </summary>  
    public class ElementDetail<T>
    {

        #region Constructors

        internal ElementDetail(T value, int index, int total,
      IEnumerable<T> collection)
        {
            this.Value = value;
            this.Index = index;
            this.Total = total;
            this.Collection = collection;
        }

        #endregion

        #region Loop Information

        public int Index { get; private set; }

        public int Total { get; private set; }

        public T Value { get; private set; }

        public IEnumerable<T> Collection { get; private set; }

        #endregion

        #region Value Properties

        public T Previous
        {
            get
            {
                return !this.First
                    ? this.Collection.ElementAt(this.Index - 1)
                    : default(T);
            }
        }

        public T Next
        {
            get
            {
                return !this.Last
                    ? this.Collection.ElementAt(this.Index + 1)
                    : default(T);
            }
        }

        public bool Last
        {
            get { return this.Index == (this.Total - 1); }
        }

        public bool First
        {
            get { return this.Index == 0; }
        }

        public bool Outer
        {
            get { return this.First || this.Last; }
        }

        public bool Inner
        {
            get { return !this.Outer; }
        }

        public bool Even
        {
            get { return this.Index % 2 == 0; }
        }

        public bool Odd
        {
            get { return !this.Even; }
        }

        #endregion

        #region Collection Properties

        public int StepNumber
        {
            get { return this.Index + 1; }
        }

        public float PercentCompleted
        {
            get { return (((float)this.Index / (float)this.Total) * 100); }
        }

        public float PercentRemaining
        {
            get { return 100 - this.PercentCompleted; }
        }

        public int StepsCompleted
        {
            get { return this.Index; }
        }

        public int StepsRemaining
        {
            get { return this.Total - this.Index; }
        }

        #endregion

    }

    #endregion
}
