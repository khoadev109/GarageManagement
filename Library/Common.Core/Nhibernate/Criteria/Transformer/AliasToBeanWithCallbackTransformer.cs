using System;
using System.Collections;
using NHibernate.Transform;

namespace Common.Core.Nhibernate.CustomExtension.Transformer
{
    // <summary>
    /// A result transformer that calls a callback after successfully transforming a result row 
    /// into an instance of T
    /// </summary>
    /// <typeparam name="T">The result type</typeparam>
    public class AliasToBeanWithCallbackTransformer<T> : IResultTransformer
    {
        private readonly Action<T> callback;
        private readonly AliasToBeanResultTransformer aliasToBeanTransformer;

        public AliasToBeanWithCallbackTransformer(Action<T> callback)
        {
            this.callback = callback;
            this.aliasToBeanTransformer = new AliasToBeanResultTransformer(typeof(T));
        }

        public IList TransformList(IList collection)
        {
            return this.aliasToBeanTransformer.TransformList(collection);
        }

        public object TransformTuple(object[] tuple, string[] aliases)
        {
            object result = this.aliasToBeanTransformer.TransformTuple(tuple, aliases);
            // Call the callback before returning the result.
            callback((T)result);
            return result;
        }
    }
}
