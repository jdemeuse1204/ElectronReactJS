import { Indexable } from "./indexable";

export const mergeAndTranslateSettings = (appSettings: IAppSettings, environmentSettings: DeepPartial<IAppSettings>): IAppSettings => {

    let indexableAppSettings: Indexable = <any>appSettings;
    let indexableEnvironmentSettings: Indexable = <any>environmentSettings;

    // merge the environment settings into the global settings
    for(let prop in indexableEnvironmentSettings) {
        indexableAppSettings[prop] = indexableEnvironmentSettings[prop];
    }

    let result: any = {};

    // stringify the settings
    for(let prop in indexableAppSettings) {
        result[prop] = JSON.stringify(indexableAppSettings[prop]);
    }

    return result;
}