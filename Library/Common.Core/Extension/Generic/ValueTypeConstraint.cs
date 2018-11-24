namespace Common.Core.Extension.Generic
{
    public class ValueTypeConstraint<T> { }

    public class StringTypeConstraint : ValueTypeConstraint<string> { }

    public class IntTypeConstraint : ValueTypeConstraint<int> { }
}
