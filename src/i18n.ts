/**
 * Every string the editor shows goes through the Neos i18n registry, so this
 * package's own XLIFF files (Resources/Private/Translations) and the labels that
 * come out of node type configuration are translated the same way.
 *
 * The package registers itself for auto inclusion in Settings.yaml, which is what
 * puts its translation unit into the backend's xliff.json:
 *
 *     Neos.Neos.userInterface.translation.autoInclude.'Sitegeist.ResourceReferenceEditor': [Main]
 */

const PACKAGE_KEY = 'Sitegeist.ResourceReferenceEditor';
const SOURCE_NAME = 'Main';

/**
 * Translates a label that comes from configuration - node type labels, group and
 * tab labels - which already carry their own fully qualified translation id.
 */
export const translate = (i18nRegistry: any, label?: string | null): string => {
    if (!label) {
        return '';
    }

    return i18nRegistry?.translate ? i18nRegistry.translate(label) : label;
};

/**
 * Translates one of this package's own labels. The English wording is passed as the
 * fallback, so the editor stays readable even when the translations have not been
 * compiled into the backend's xliff.json yet.
 */
export const label = (
    i18nRegistry: any,
    id: string,
    fallback: string,
    parameters?: Record<string, unknown>
): string => {
    if (!i18nRegistry?.translate) {
        return fallback;
    }

    return i18nRegistry.translate(
        `${PACKAGE_KEY}:${SOURCE_NAME}:${id}`,
        fallback,
        parameters,
        PACKAGE_KEY,
        SOURCE_NAME
    );
};

/** A translator bound to one registry, so components do not pass it around. */
export type Translator = (id: string, fallback: string, parameters?: Record<string, unknown>) => string;

export const translatorFor = (i18nRegistry: any): Translator =>
    (id, fallback, parameters) => label(i18nRegistry, id, fallback, parameters);
