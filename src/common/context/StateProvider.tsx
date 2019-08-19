import * as React from 'react';
import { merge } from 'lodash';

export const update = (state: DeepPartial<any>) => void (0);

export abstract class StateProvider<T> extends React.Component implements IReactContext<T> {

    private appContext: React.Context<IReactContext<T>>;
    state:T;

    constructor(props: any, defaultContext: React.Context<IReactContext<T>>, defaultState: T) {
        super(props); // need to pass the same props that constructor passes, otherwise we get an error
        this.state = defaultState;
        this.appContext = defaultContext;
    }

    set = (appState: DeepPartial<T>) => {
        // if there are nested objects on state, we need to merge those nested objects
        // otherwise they will be overwritten the way setState works
        this.setState(merge(this.state, appState));
    }

    render() {
        const context = this.appContext;
        return (<context.Provider value={{state:this.state, set:this.set}}>{this.props.children}</context.Provider>);
    }
}