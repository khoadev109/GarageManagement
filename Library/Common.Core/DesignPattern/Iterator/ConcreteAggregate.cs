using System.Collections.Generic;

namespace Common.Core.Extension.DesignPattern.Iterator
{
    public class ConcreteAggregate<T> : IAggregate<T>
    {
        private IIterator<T> iterator;

        public ConcreteAggregate()
        {
            (this as IAggregate<T>).CreateIterator();  //create the iterator
        }

        IIterator<T> IAggregate<T>.CreateIterator()
        {
            //create iterator if not already done
            if (iterator == null)
                iterator = new ConcreteIterator<T>(this);
            return iterator;
        }

        List<T> IAggregate<T>.GetAll()
        {
            List<T> list = new List<T>();
            list.Add(iterator.First());
            while (!iterator.IsDone())
            {
                list.Add(iterator.Next());
            }
            return list;
        }

        void IAggregate<T>.AddItem(T item)
        {
            iterator.AddItem(item);
        }
    }
}
