import {DraftValue} from '../types';

/**
 * Editors may hand over save hooks together with their value (the image editor
 * creates its variant this way). They have to run before the value is sent.
 */
export const applySaveHooks = async (
    value: unknown,
    hooks: Record<string, unknown> | undefined,
    saveHooksRegistry: any
): Promise<unknown> => {
    if (!hooks) {
        return value;
    }

    let result = value;
    for (const [identifier, hookOptions] of Object.entries(hooks)) {
        const hook = saveHooksRegistry?.get(identifier);

        if (!hook) {
            throw new Error(`There is no registered save hook function for identifier ${identifier}`);
        }

        result = await hook(result, hookOptions);
    }

    return result;
};


/** Resolves the properties the user touched - used when saving an existing node. */
export const resolveDraft = async (
    draft: Record<string, DraftValue>,
    saveHooksRegistry: any
): Promise<Record<string, unknown>> => {
    const resolved: Record<string, unknown> = {};

    for (const [propertyName, draftValue] of Object.entries(draft)) {
        resolved[propertyName] = await applySaveHooks(draftValue.value, draftValue.hooks, saveHooksRegistry);
    }

    return resolved;
};

