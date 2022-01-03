export type KeysOfType<Type, PropType> = { [Prop in keyof Type]: Type[Prop] extends PropType ? Prop : never }[keyof Type]
