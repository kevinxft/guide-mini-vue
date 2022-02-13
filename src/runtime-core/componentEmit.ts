import { toHandlerKey, camelize } from '../shared/index'

export function emit(instance, event, ...args) {
  console.log("emit", event);
  const { props } = instance;

  // TPP
  const handlerName = toHandlerKey(camelize(event));
  console.log("handlerName", handlerName);
  const handler = props[handlerName];
  handler && handler(args);
}

