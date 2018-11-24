using System.Collections.Generic;

namespace Common.Core.Data.Transformation
{
    public interface IBaseTransform<TTransform, TTransformTo>
    {
        TTransformTo TransForm(TTransform transform);        
    }

    /// <summary>
    /// Transform object to another object, or list objects to others list objects
    /// </summary>
    /// <typeparam name="TTransform">Input object</typeparam>
    /// <typeparam name="TTransformTo">Output object</typeparam>
    public abstract class BaseTransform<TTransform, TTransformTo> : IBaseTransform<TTransform, TTransformTo>
        where TTransformTo : class, new()
        where TTransform : class, new()
    {

        /// <summary>
        /// Transform single object
        /// </summary>
        /// <returns></returns>
        public virtual TTransformTo TransForm()
        {
            return new TTransformTo();
        }

        /// <summary>
        /// Transform single object and allow to transform list of objects
        /// </summary>
        /// <param name="transform">Input object</param>
        /// <returns></returns>
        public virtual TTransformTo TransForm(TTransform transform)
        {
            return new TTransformTo();
        }

        /// <summary>
        /// Transform list of objects
        /// </summary>
        /// <param name="transforms">Input list objects</param>
        /// <returns></returns>
        public List<TTransformTo> TransFormMany(List<TTransform> transforms)
        {
            var transFormMany = new List<TTransformTo>();
            transforms.ForEach(x =>
            {
                transFormMany.Add(TransForm(x));
            });
            return transFormMany;
        }
    }
}
