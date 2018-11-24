using System.Collections.Generic;

namespace Common.Core.Extension.DesignPattern.Iterator
{
    public interface IAggregate<T>
    {
        IIterator<T> CreateIterator();
        List<T> GetAll();
        void AddItem(T item);
    }
}
