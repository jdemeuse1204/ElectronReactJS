import * as React from 'react';
import { StateProvider, update } from '../common/context/StateProvider';

const defaultContext: IReactContext<IAppState> = {
    state: {
        Id: "Id",
        Name: ""
    },
    set: update
};

export const AppContext: React.Context<IReactContext<IAppState>> = React.createContext(defaultContext);

export class AppStateProvider extends StateProvider<IAppState> {

    constructor(props: any) {
        super(props, AppContext, defaultContext.state)
    }

}