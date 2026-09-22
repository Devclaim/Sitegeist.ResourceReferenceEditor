import {ResourceNode} from '../types';

/** True when the resource carries the `disabled` subtree tag of its own. */
export const isHidden = (resource: ResourceNode | null | undefined): boolean =>
    Boolean(resource?.hidden)
    || Boolean(resource?.tags?.disabled)
    || Boolean(resource?.properties?._hidden);


