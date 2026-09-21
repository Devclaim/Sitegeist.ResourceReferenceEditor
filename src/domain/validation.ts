import React from 'react';

import {InspectorItem} from '../types';
import {declarationFor} from './nodeTypes';

/**
 * Runs the node type's validators exactly like the inspector does: the returned
 * messages are kept as they are. Neos validators return React elements
 * (`<I18n id="..."/>`), so turning them into strings yields "[object Object]".
 */
export const validateItems = (
    items: InspectorItem[],
    nodeType: any,
    values: Record<string, unknown>,
    validatorsRegistry: any
): Record<string, React.ReactNode[]> => {
    const errors: Record<string, React.ReactNode[]> = {};

    for (const item of items) {
        const validation = declarationFor(nodeType, item.id)?.validation;

        if (!validation) {
            continue;
        }

        const messages = Object.keys(validation)
            .map(identifier => {
                const validator = validatorsRegistry?.get(identifier);

                if (!validator) {
                    console.warn(`[Sitegeist.ResourceReferenceEditor] Validator ${identifier} not found`);

                    return null;
                }

                return validator(values[item.id], validation[identifier]);
            })
            .filter(Boolean);

        if (messages.length > 0) {
            errors[item.id] = messages;
        }
    }

    return errors;
};


/** Error objects are not always Errors - a rejected endpoint hands back a payload. */
export const messageOf = (exception: unknown): string => {
    if (exception instanceof Error) {
        return exception.message;
    }

    if (typeof exception === 'string') {
        return exception;
    }

    const message = (exception as any)?.message ?? (exception as any)?.error;
    if (typeof message === 'string') {
        return message;
    }

    try {
        return JSON.stringify(exception);
    } catch (serializationError) {
        return String(exception);
    }
};

