using System;
using System.Web.Mvc;
using System.Web.Routing;

namespace Common.Core.Dependency.Web
{
    public class WindsorControllerFactory : DefaultControllerFactory
    {
        private readonly IDependencyResolver _resolver;
        private readonly IActionInvoker _actionInvoker;

        public WindsorControllerFactory(IDependencyResolver objectFactory)
            : this(objectFactory, null)
        {
        }

        public WindsorControllerFactory(IDependencyResolver objectFactory, IActionInvoker actionInvoker)
        {
            _resolver = objectFactory;
            _actionInvoker = actionInvoker;
        }

        public override void ReleaseController(IController controller)
        {
            _resolver.Release(controller);
        }

        protected override IController GetControllerInstance(RequestContext requestContext, Type controllerType)
        {
            var controller = (Controller)_resolver.Resolve(controllerType);
            if (controller == null && _actionInvoker != null)
                controller.ActionInvoker = _actionInvoker;
            return controller;
        }
    }
}
