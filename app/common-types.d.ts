declare type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>
};
declare interface IReactContext<T> {
    state: T;
    set: (appState:DeepPartial<T>) => void;
}

declare interface IKeyBinding {
    sequence: string;
    name: string;
    type: string;
}

declare interface IAppState {
    waiting: {

    },
    settings: {
        keybindings: IKeyBinding[]
    }
}