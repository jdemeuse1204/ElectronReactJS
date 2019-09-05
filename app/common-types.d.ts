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

declare interface IDataPayload {
    url: string;
}

declare interface IKeyBinding {
    name:string;
    sequence: string;
    type: "url";
    data: DeepPartial<IDataPayload>;
}

declare interface IAppState {
    waiting: {
        showMessage: boolean;
        message:string;
        isWaiting: boolean;
        isThinking: boolean;
    },
    settings: {
        keybindings: IKeyBinding[]
    }
}

declare interface IBrowserCommand {
    name: string;
    sequence: string;
    type: "browsercommand" | "closebrowser",
    action: {
        type: "sendkey",
        payload: string; 
    }
}

declare interface IKeyBindUrlLoader extends IKeyBinding {
    commands: IBrowserCommand[]
}