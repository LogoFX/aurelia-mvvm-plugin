import { All, Args, Container, Factory, Impl, ImplOrAny, Lazy, NewInstance, Optional, Parent, PrimitiveOrDependencyCtor, ResolvedValue } from "aurelia-dependency-injection";

export function resolve<TBase, TResolver extends NewInstance<TBase> | Lazy<TBase> | Factory<TBase> | Optional<TBase> | Parent<TBase> | All<TBase>>(key: TResolver): ResolvedValue<TResolver>;
export function resolve<TBase, TImpl extends Impl<TBase> = Impl<TBase>, TArgs extends Args<TBase> = Args<TBase>>(key: PrimitiveOrDependencyCtor<TBase, TImpl, TArgs>): ImplOrAny<TImpl>;
export function resolve<TBase, TImpl extends Impl<TBase> = Impl<TBase>, TArgs extends Args<TBase> = Args<TBase>>(key: typeof Container): Container {
  return Container.instance.get(key);
}

// export const resolve = Container.instance.get;