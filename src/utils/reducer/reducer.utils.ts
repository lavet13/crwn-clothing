import { AnyAction } from 'redux';

// type predicate is kind of like a function that verifies whether a specific argument that it receives
// is going to be a narrower type or not.
/*
type Alien = {
  fly: () => {};
};

type Human = {
  speak: () => void;
};

// entity is Human is narrowing the type
function isHuman(entity: Human | Alien): entity is Human {
  return (entity as Human).speak !== undefined;
}

const Josh: Human = {
  speak: () => {},
};

if(isHuman(Josh)) {
  Josh.speak()
}
*/

// intersection types(joining of two different types)
/*
type Human = {
  name: string;
};

type Alien = {
  fly: () => void;
};

type Hybrid = Human & Alien; // & - intersection keyword(type literal)

const Josh: Hybrid = {
  name: 'josh',
  fly: () => {},
};
*/

// return types(to get return type from a function and then set it to something, use a return type literal)
/*
type Human = {
  name: string;
};
type MyFunc = () => Human;

type MyReturn = ReturnType<MyFunc>;
*/

// type guards
// matchable type is a type we ourselves implement(it's an extension on action creator)

type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>['type'];
  match(action: AnyAction): action is ReturnType<AC>;
};

export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;

export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;

  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
