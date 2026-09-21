/**
 * The dialog's styles. They are inlined into a <style> element next to the editor
 * rather than shipped as a stylesheet, so the package needs no resource inclusion
 * and the rules travel with the component that needs them.
 */

export const styles = `
    /*
     * Neos puts the node's breadcrumb under a referenced node. For a resource that
     * is its path in the resource subtree - the same for every resource of a
     * collection - so it is replaced by the resource type, which is what the list
     * in the dialog shows as well. The text is hidden rather than the element, so
     * the line keeps its styling and the item keeps its height.
     */
    .sitegeist-resource-reference-editor__reference
        [class*="multiLineWithThumbnail__secondaryLabel"] {
        font-size: 0;
    }
    .sitegeist-resource-reference-editor__reference
        [class*="multiLineWithThumbnail__secondaryLabel"]::after {
        content: var(--sitegeist-resource-type, "");
        font-size: var(--fontSize-Small, 12px);
    }
    .sitegeist-resource-reference-editor__actions {
        display: flex;
        gap: 8px;
        margin-top: 8px;
    }
    /* The create button carries no label, so it is squared off around its icon. */
    .sitegeist-resource-reference-editor__create {
        flex: 0 0 auto;
        width: 36px;
        min-width: 36px;
        padding-left: 0;
        padding-right: 0;
        text-align: center;
    }
    /*
     * While the inspector holds unapplied changes, Neos covers the content area
     * with an overlay that catches every click (and asks what to do with those
     * changes). The resource dialog is not the content area, so it stays on top
     * of that overlay.
     *
     * Every dialog opened afterwards - the link editor, the media browser, the
     * unapplied-changes prompt - is a later sibling in the body and has to stay
     * on top of the resource dialog in turn. All Neos dialogs share one z-index,
     * so without this they would end up behind it.
     */
    [role="dialog"]:has(.sitegeist-resource-reference-editor__layout) {
        z-index: var(--zIndex-SecondaryInspectorElevated, 60);
    }
    [role="dialog"]:has(.sitegeist-resource-reference-editor__layout) ~ [role="dialog"] {
        z-index: calc(var(--zIndex-SecondaryInspectorElevated, 60) + 1);
    }
    /*
     * The dialog itself must not scroll - only the list and the inspector do. Neos'
     * dialog body scrolls by default (overflow-y: auto on .dialog__body) and its
     * contents are capped at 80vh, so the body is turned into a flex box of a fixed
     * height that shrinks with the dialog instead of growing a scrollbar of its own.
     */
    .dialog__body:has(> .sitegeist-resource-reference-editor__layout) {
        display: flex;
        overflow: hidden;
        height: 70vh;
        min-height: 0;
    }
    /* The title row of the dialog, which carries no title here. */
    div:has(> .dialog__body > .sitegeist-resource-reference-editor__layout) > div:first-child {
        display: none;
    }
    .sitegeist-resource-reference-editor__layout {
        flex: 1;
        min-height: 0;
        display: flex;
        align-items: stretch;
    }
    .sitegeist-resource-reference-editor__content {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 16px;
        overflow: hidden;
        background: var(--colors-ContrastDarkest, #141414);
    }
    .sitegeist-resource-reference-editor__search {
        flex: 1;
        min-width: 0;
        box-sizing: border-box;
        border: 1px solid var(--colors-ContrastDark, #3f3f3f);
        background: var(--colors-ContrastDarker, #222);
        color: var(--colors-ContrastBrightest, #fff);
        padding: 10px 12px;
        font: inherit;
    }
    .sitegeist-resource-reference-editor__list {
        flex: 1;
        min-height: 0;
        overflow: auto;
        display: flex;
        flex-direction: column;
    }
    .sitegeist-resource-reference-editor__item {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        min-height: 56px;
        padding: 10px 12px;
        border: 0;
        border-bottom: 1px solid var(--colors-ContrastDark, #3f3f3f);
        text-align: left;
        font: inherit;
        color: var(--colors-ContrastBrightest, #fff);
        background: var(--colors-ContrastDarker, #222);
        cursor: pointer;
    }
    .sitegeist-resource-reference-editor__item:last-child {
        border-bottom: 0;
    }
    /*
     * Three states have to stay apart: the row under the cursor, the row open in the
     * inspector, and a row that is picked. Hover stays a neutral lift, while the two
     * states that mean something are tinted in their own colour - the plain
     * background is declared first for browsers without color-mix().
     */
    .sitegeist-resource-reference-editor__item:hover {
        background: var(--colors-ContrastNeutral, #323232);
    }
    .sitegeist-resource-reference-editor__item--active {
        background: var(--colors-ContrastNeutral, #323232);
        background: color-mix(
            in srgb,
            var(--colors-PrimaryBlue, #00adee) 12%,
            var(--colors-ContrastDarker, #222)
        );
        box-shadow: inset 3px 0 0 0 var(--colors-PrimaryBlue, #00adee);
    }
    .sitegeist-resource-reference-editor__item--active:hover {
        background: color-mix(
            in srgb,
            var(--colors-PrimaryBlue, #00adee) 20%,
            var(--colors-ContrastNeutral, #323232)
        );
    }
    .sitegeist-resource-reference-editor__item--selected {
        background: var(--colors-ContrastNeutral, #323232);
        background: color-mix(
            in srgb,
            var(--colors-Success, #00a338) 14%,
            var(--colors-ContrastDarker, #222)
        );
        box-shadow: inset 3px 0 0 0 var(--colors-Success, #00a338);
    }
    .sitegeist-resource-reference-editor__item--selected:hover {
        background: color-mix(
            in srgb,
            var(--colors-Success, #00a338) 24%,
            var(--colors-ContrastNeutral, #323232)
        );
    }
    .sitegeist-resource-reference-editor__item-label {
        flex: 1;
        min-width: 0;
    }
    .sitegeist-resource-reference-editor__item-label strong,
    .sitegeist-resource-reference-editor__item-label small {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .sitegeist-resource-reference-editor__item-label small {
        color: var(--colors-ContrastBright, #999);
        margin-top: 3px;
    }
    /* A resource whose node label is empty is named by its type, as a placeholder. */
    .sitegeist-resource-reference-editor__item-unnamed {
        font-style: italic;
        color: var(--colors-ContrastBright, #999);
    }
    .sitegeist-resource-reference-editor__toolbar {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
    }
    /*
     * The actions live in the dialog's own footer row, next to its close button:
     * Neos lays that row out right aligned, so it is turned into a flex
     * row and our entry - the first one - is given the free space on the left.
     */
    div:has(> .dialog__body > .sitegeist-resource-reference-editor__layout)
        > div:last-child {
        display: flex;
        align-items: center;
        gap: 8px;
        /* The row sits on the edge of the dialog otherwise. */
        padding: 0 16px 16px;
    }
    /*
     * Our entry is held to the width of the list column, so the actions line up
     * under the list and the dialog's close button stays under the inspector.
     */
    div:has(> .dialog__body > .sitegeist-resource-reference-editor__layout)
        > div:last-child > span:first-child {
        flex: 1;
        min-width: 0;
        max-width: calc(100% - var(--size-SidebarWidth, 320px));
    }
    div:has(> .dialog__body > .sitegeist-resource-reference-editor__layout)
        > div:last-child > span:last-child {
        margin-left: auto;
    }
    .sitegeist-resource-reference-editor__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
    }
    .sitegeist-resource-reference-editor__footer-actions {
        display: flex;
        gap: 8px;
        flex-shrink: 0;
    }
    /* The bulk equivalent of the control in the rows, in the same colours. */
    .sitegeist-resource-reference-editor__footer-actions
        .sitegeist-resource-reference-editor__bulk-use {
        color: var(--colors-Success, #00a338);
    }
    .sitegeist-resource-reference-editor__footer-actions
        .sitegeist-resource-reference-editor__bulk-use--remove {
        color: var(--colors-Warn, #ff8700);
    }
    .sitegeist-resource-reference-editor__footer-target {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .sitegeist-resource-reference-editor__footer-target--empty {
        color: var(--colors-ContrastBright, #999);
    }
    .sitegeist-resource-reference-editor__item-select {
        display: flex;
        align-items: center;
    }
    .sitegeist-resource-reference-editor__item-actions {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
    }
    /*
     * The control that puts a resource into the edited property. It is quiet rather
     * than hidden - no button chrome, muted until the resource is in use - so the
     * list reads as a list. The minimum width keeps the row from twitching when the
     * label changes under the cursor.
     */
    .sitegeist-resource-reference-editor__use {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        min-width: 7em;
        padding: 4px 8px;
        border: 0;
        border-radius: 2px;
        background: var(--colors-ContrastDark, #3f3f3f);
        font: inherit;
        color: var(--colors-ContrastBright, #999);
        cursor: pointer;
    }
    .sitegeist-resource-reference-editor__use--active {
        color: var(--colors-Success, #00a338);
    }
    .sitegeist-resource-reference-editor__use:hover {
        color: var(--colors-ContrastBrightest, #fff);
    }
    .sitegeist-resource-reference-editor__use--active:hover {
        color: var(--colors-Warn, #ff8700);
    }
    /* In use at rest, what a click would do under the cursor. */
    .sitegeist-resource-reference-editor__use-action {
        display: none;
    }
    .sitegeist-resource-reference-editor__use:hover
        .sitegeist-resource-reference-editor__use-state {
        display: none;
    }
    .sitegeist-resource-reference-editor__use:hover
        .sitegeist-resource-reference-editor__use-action {
        display: inline-flex;
        align-items: center;
        gap: 6px;
    }
    .sitegeist-resource-reference-editor__use-state {
        display: inline-flex;
        align-items: center;
        gap: 6px;
    }
    /* While selecting, the whole row is one target - nothing in it takes a click. */
    .sitegeist-resource-reference-editor__item-actions--inert {
        pointer-events: none;
    }
    /*
     * A hidden resource reads like one - but only its name is dimmed, so the badge
     * that says so keeps its contrast.
     */
    .sitegeist-resource-reference-editor__item--hidden
        .sitegeist-resource-reference-editor__item-label,
    .sitegeist-resource-reference-editor__item--hidden > svg {
        opacity: .5;
    }
    .sitegeist-resource-reference-editor__hidden-badge {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 2px 8px;
        border-radius: 2px;
        white-space: nowrap;
        color: var(--colors-ContrastBrightest, #fff);
        background: var(--colors-Warn, #ff8700);
    }
    .sitegeist-resource-reference-editor__confirmation {
        padding: 16px;
    }
    .sitegeist-resource-reference-editor__confirmation ul {
        list-style: none;
        margin: 0 0 12px;
        padding: 0;
    }
    .sitegeist-resource-reference-editor__confirmation li {
        display: flex;
        flex-direction: column;
        margin-bottom: 8px;
    }
    .sitegeist-resource-reference-editor__confirmation li small {
        color: var(--colors-ContrastBright, #999);
        margin-top: 2px;
    }
    .sitegeist-resource-reference-editor__inspector {
        flex: 0 0 var(--size-SidebarWidth, 320px);
        width: var(--size-SidebarWidth, 320px);
        display: flex;
        flex-direction: column;
        background: var(--colors-ContrastDarker, #222);
        border-left: 1px solid var(--colors-ContrastDark, #3f3f3f);
        overflow: hidden;
    }
    .sitegeist-resource-reference-editor__inspector-body {
        flex: 1;
        min-height: 0;
        display: flex;
        overflow: hidden;
    }
    .sitegeist-resource-reference-editor__tabs {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-width: 0;
        height: 100%;
        background: var(--colors-ContrastDarker, #222);
    }
    .sitegeist-resource-reference-editor__inspector-footer {
        display: flex;
        gap: 1px;
        border-top: 1px solid var(--colors-ContrastDark, #3f3f3f);
    }
    .sitegeist-resource-reference-editor__inspector-footer > * {
        flex: 1;
    }
    .sitegeist-resource-reference-editor__group-icon {
        width: 2em;
        display: inline-block;
        text-align: center;
        margin-left: -5px;
    }
    .sitegeist-resource-reference-editor__field {
        padding-bottom: var(--spacing-Full, 16px);
    }
    /*
     * Secondary editors (media browser, image cropper) are rendered the way the
     * regular secondary inspector renders them: the media browser is an absolutely
     * positioned, full size iframe, so it needs a positioned box with a real height.
     */
    .sitegeist-resource-reference-editor__secondary {
        position: relative;
        height: 75vh;
        overflow: auto;
        background: var(--colors-ContrastDarker, #222);
    }
    .sitegeist-resource-reference-editor__state {
        padding: 24px;
        text-align: center;
        color: var(--colors-ContrastBright, #999);
    }
    .sitegeist-resource-reference-editor__error {
        color: var(--colors-Error, #ff460d);
    }
`;

