/**
 * The Neos UI host modules are provided by the Neos backend at runtime and mapped
 * to the host by esbuild (see `extensibilityMap`), so they ship no types. They are
 * declared here so the package can be type checked on its own.
 */
declare module '@neos-project/neos-ui-extensibility' {
    const manifest: (
        identifier: string,
        options: Record<string, unknown>,
        bootstrap: (globalRegistry: any, services: any) => void
    ) => void;
    export default manifest;
}

declare module '@neos-project/neos-ui-backend-connector' {
    const backend: {get: () => any};
    export default backend;
}

declare module '@neos-project/neos-ui-redux-store' {
    export const actions: any;
    export const actionTypes: any;
    export const selectors: any;
}

declare module 'redux-saga/effects' {
    export const takeEvery: any;
}

declare module '@neos-project/react-ui-components' {
    export const Button: any;
    export const CheckBox: any;
    export const Dialog: any;
    export const Icon: any;
    export const Tabs: any;
    export const ToggablePanel: any;
}

declare module '@neos-project/neos-ui-editors' {
    export const EditorEnvelope: any;
}
