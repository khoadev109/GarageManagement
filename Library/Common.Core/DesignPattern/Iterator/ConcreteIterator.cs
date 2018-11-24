using System.Collections.Generic;

namespace Common.Core.Extension.DesignPattern.Iterator
{
    public class ConcreteIterator<T> : IIterator<T>
    {
        private IAggregate<T> aggregate;

        private List<T> collection = new List<T>();  //the actual collection you are traversing
        private int pointer = 0;  //keeps track of the current position

        public ConcreteIterator(IAggregate<T> i)
        {
            aggregate = i;
        }

        T IIterator<T>.First()
        {
            //move pointer to the first element in the aggregate and return it
            pointer = 0;
            return collection[pointer];
        }

        T IIterator<T>.Next()
        {
            //move pointer to the next element in the aggregate and return it
            pointer++;
            return collection[pointer];
        }

        T IIterator<T>.CurrentItem()
        {
            //return the element that the pointer is pointing to
            return collection[pointer];
        }

        bool IIterator<T>.IsDone()
        {
            //return true if pointer is pointing to the last element, else return false
            return pointer == collection.Count - 1;
        }

        void IIterator<T>.AddItem(T item)
        {
            collection.Add(item);
        }
    }
}
