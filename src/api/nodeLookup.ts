/**
 * Neos resolves the label of a referenced node through its "NodeLookup" data
 * loader, which keeps the answers in an LRU cache of 500 entries, keyed by the
 * node's identifier. Renaming a resource therefore has no effect on any reference
 * field until the backend is reloaded - the editor may re-ask, but it is handed the
 * cached answer.
 *
 * The cache has no public invalidation, so the loader is made to build a new one:
 * its `_lru()` creates the cache when it is missing. Only the cached labels are
 * lost, and they are re-read on the next lookup.
 */
export const invalidateNodeLookupCache = (globalRegistry: any): void => {
    const dataLoader = globalRegistry?.get?.('dataLoaders')?.get?.('NodeLookup');

    if (dataLoader) {
        dataLoader._lruCache = null;
    }
};
