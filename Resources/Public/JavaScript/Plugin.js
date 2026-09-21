(()=>{var Ro=Object.create;var Se=Object.defineProperty;var wo=Object.getOwnPropertyDescriptor;var ko=Object.getOwnPropertyNames;var No=Object.getPrototypeOf,Co=Object.prototype.hasOwnProperty;var So=(e,o)=>()=>(e&&(o=e(e=0)),o);var he=(e,o)=>()=>(o||e((o={exports:{}}).exports,o),o.exports);var Po=(e,o,t,s)=>{if(o&&typeof o=="object"||typeof o=="function")for(let r of ko(o))!Co.call(e,r)&&r!==t&&Se(e,r,{get:()=>o[r],enumerable:!(s=wo(o,r))||s.enumerable});return e};var u=(e,o,t)=>(t=e!=null?Ro(No(e)):{},Po(o||!e||!e.__esModule?Se(t,"default",{value:e,enumerable:!0}):t,e));function T(e){return(...o)=>{if(window["@Neos:HostPluginAPI"]&&window["@Neos:HostPluginAPI"][`@${e}`])return window["@Neos:HostPluginAPI"][`@${e}`](...o);throw new Error("You are trying to read from a consumer api that hasn't been initialized yet!")}}var K=So(()=>{});var R=he((Fo,Pe)=>{K();Pe.exports=T("vendor")().React});var W=he(($o,Ee)=>{K();Ee.exports=T("NeosProjectPackages")().ReactUiComponents});var te=he((Xo,Ae)=>{K();Ae.exports=T("NeosProjectPackages")().NeosUiReduxStore});var lo=he((qt,co)=>{K();co.exports=T("NeosProjectPackages")().NeosUiEditors});var Ce=u(R());K();var Io=T("manifest"),Ie=Io,{SynchronousRegistry:Ho,SynchronousMetaRegistry:jo}=T("NeosProjectPackages")().NeosUiRegistry;var P=u(R()),de=u(W());var pe=u(R());var Te="Sitegeist.ResourceReferenceEditor",De="Main",$=(e,o)=>o?e?.translate?e.translate(o):o:"",Eo=(e,o,t,s)=>e?.translate?e.translate(`${Te}:${De}:${o}`,t,s,Te,De):t,Oe=e=>(o,t,s)=>Eo(e,o,t,s);var Be=pe.default.createContext(null),Ue=({registries:e,children:o})=>{let t=pe.default.useMemo(()=>({...e,t:Oe(e.i18nRegistry)}),[e]);return pe.default.createElement(Be.Provider,{value:t},o)},h=()=>{let e=pe.default.useContext(Be);if(!e)throw new Error("[Sitegeist.ResourceReferenceEditor] The Neos UI registries are only available below RegistriesProvider.");return e};var X=u(R());K();var F=T("NeosProjectPackages")().NeosUiBackendConnectorDefault,{fetchWithErrorHandling:Ko}=T("NeosProjectPackages")().NeosUiBackendConnector;var Re=u(te());var ge=u(te()),To=["Neos.Neos.Ui:UpdateNodeInfo","Neos.Neos.Ui:UpdateNodePreviewUrl","Neos.Neos.Ui:UpdateWorkspaceInfo","Neos.Neos.Ui:Success","Neos.Neos.Ui:Info","Neos.Neos.Ui:Warning","Neos.Neos.Ui:Error"],Fe=(e,o)=>{if(typeof o!="string")return;let t=e.getState(),s=ge.selectors.CR.Nodes.focusedNodePathSelector(t),r=t?.ui?.inspector?.valuesByNodePath?.[s]??{},c=Object.keys(r).filter(n=>r[n]!==void 0);c.length===1&&c[0]===o&&e.dispatch(ge.actions.UI.Inspector.apply())},Y=(e,o)=>{let t=(o?.feedbacks??[]).filter(s=>To.includes(s?.type));t.length>0&&e.dispatch(ge.actions.ServerFeedback.handleServerFeedback({feedbacks:t}))};var xe=u(te()),Q=async e=>{let o=F.get().endpoints?.syncWorkspace;if(!o)return;let t=e.getState(),s=xe.selectors.CR.Workspaces.personalWorkspaceNameSelector(t);if(typeof s!="string"||s==="")return;let r=await o(s,!1,xe.selectors.CR.ContentDimensions.active(t));if(r&&typeof r=="object"&&"conflicts"in r)throw new Error("Your workspace could not be brought up to date with the live workspace, because some of your changes conflict with it. Resolve the conflicts from the workspace dialog, then try again.");if(r&&typeof r=="object"&&"error"in r)throw new Error(r.error?.message??"Your workspace could not be brought up to date with the live workspace.")};var Le=e=>(e.nodeTypes??[e.resourceCreation.type]).map(o=>`[instanceof ${o}]`).join(","),ye=e=>(e.items??[]).filter(o=>o.type==="editor"&&o.editor&&o.hidden!==!0),He=(e,o)=>(e.getInspectorViewConfigurationFor(o)?.tabs??[]).map(s=>({...s,groups:(s.groups??[]).filter(r=>ye(r).length>0)})).filter(s=>s.groups.length>0),Do=e=>{switch(e){case"integer":case"float":return 0;case"boolean":return!1;case"array":return[];default:return""}},je=(e,o)=>{let t=o?.ui?.creationDialog?.elements??{},s={},r=[...e.unsupportedRequiredProperties??[]];if(!Array.isArray(e.requiredProperties))return{data:s,missing:["(stale editor configuration - flush the Neos caches)"]};for(let c of e.requiredProperties){if(!t[c.name]){r.push(c.name);continue}s[c.name]=Do(c.type)}return{data:s,missing:r}},Me=(e,o)=>e?.properties?.[o]??e?.references?.[o],We=e=>e.flatMap(o=>o.groups.flatMap(t=>ye(t)));var Oo=async(e,o,t)=>{if(!o)return e;let s=e;for(let[r,c]of Object.entries(o)){let n=t?.get(r);if(!n)throw new Error(`There is no registered save hook function for identifier ${r}`);s=await n(s,c)}return s},$e=async(e,o)=>{let t={};for(let[s,r]of Object.entries(e))t[s]=await Oo(r.value,r.hooks,o);return t};var Ve=(e,o,t,s)=>{let r={};for(let c of e){let n=Me(o,c.id)?.validation;if(!n)continue;let l=Object.keys(n).map(d=>{let i=s?.get(d);return i?i(t[c.id],n[d]):(console.warn(`[Sitegeist.ResourceReferenceEditor] Validator ${d} not found`),null)}).filter(Boolean);l.length>0&&(r[c.id]=l)}return r},qe=e=>{if(e instanceof Error)return e.message;if(typeof e=="string")return e;let o=e?.message??e?.error;if(typeof o=="string")return o;try{return JSON.stringify(e)}catch{return String(e)}};var re="live",se=(e,o)=>{if(!o)return e;try{let t=JSON.parse(e);return t?.workspaceName===o?e:JSON.stringify({...t,workspaceName:o})}catch{return e}};var ze=(e,o)=>{let{store:t,nodeTypesRegistry:s,saveHooksRegistry:r,validatorsRegistry:c}=h(),[n,l]=X.default.useState(null),[d,i]=X.default.useState([]),[a,f]=X.default.useState({}),[g,y]=X.default.useState({}),[p,m]=X.default.useState({}),[x,O]=X.default.useState({}),B=s.getNodeType(n?.nodeType),oe=We(d),v=Object.keys(g).length>0,N=()=>{y({}),f({}),m({}),o()},I=async b=>{N(),await e.run(async()=>{let[S]=await F.get().q([b.contextPath]).get(),A=S??b;t.dispatch(Re.actions.CR.Nodes.merge({[A.contextPath]:A})),l(A),i(He(s,A.nodeType)),f({...A.properties??{}})})};return{node:n,nodeType:B,tabs:d,values:a,draft:g,hasChanges:v,validationErrors:p,isPanelOpen:(b,S)=>!!x[b]==!!S,togglePanel:b=>O(S=>({...S,[b]:!S[b]})),inspect:I,forget:()=>{l(null),i([]),N()},change:(b,S,A)=>{let le=n?.properties?.[b],ue=!A&&(le===S||JSON.stringify(le)===JSON.stringify(S));y(M=>{if(ue){let{[b]:xo,..._e}=M;return _e}return{...M,[b]:{value:S,hooks:A}}}),f(M=>({...M,[b]:S})),m(M=>{if(!M[b])return M;let{[b]:xo,..._e}=M;return _e})},save:async()=>{if(!n)return;let b=Ve(oe,B,a,c);m(b),!(Object.keys(b).length>0)&&await e.run(async()=>{let S=await $e(g,r),A=se(n.contextPath,re),le=Object.entries(S).map(([ue,M])=>({type:"Neos.Neos.Ui:Property",subject:A,payload:{propertyName:ue,value:M}}));if(le.length>0){let ue=await F.get().endpoints.change(le);Y(t,ue),await Q(t),e.touch(),t.dispatch(Re.actions.UI.ContentCanvas.reload())}y({}),await e.reload(),await I(n)})},discard:()=>{y({}),m({}),f({...n?.properties??{}})}}};var Ge=u(R()),Je=e=>{let o=!!e.options.multiple,{value:t,commit:s}=e,r=Ge.default.useMemo(()=>Array.isArray(t)?t:t?[t]:[],[t]),c=i=>{if(!o){s(i);return}let a=Array.isArray(t)?t:[];a.includes(i)||s([...a,i])},n=i=>{if(!o){i.length>0&&s(i[0]);return}let a=Array.isArray(t)?t:[],f=i.filter(g=>!a.includes(g));f.length>0&&s([...a,...f])},l=i=>{let a=new Set(i);if(o||Array.isArray(t)){let f=Array.isArray(t)?t:[],g=f.filter(y=>!a.has(y));g.length!==f.length&&s(g);return}typeof t=="string"&&a.has(t)&&s("")};return{referenced:r,isMultiple:o,add:c,addMany:n,drop:l,toggle:i=>{if(r.includes(i)){l([i]);return}c(i)}}};var ke=u(R());var Ze=u(te());var we=u(te());var Ke=e=>{let o=e?.core?.service?.nodes;return typeof o!="string"?"":o.replace(/\/neos\/service\/nodes\/?$/,"")},Ye=async(e,o,t)=>{let s=e.getState(),r=s?.cr?.nodes?.documentNode??we.selectors.CR.Nodes.focusedNodePathSelector(s);if(typeof r!="string")throw new Error("The node of the current editing session could not be resolved.");let c=new URLSearchParams({node:r,collection:o.collection});o.buttonLabel&&c.append("title",o.buttonLabel);let n=await fetch(`${Ke(t)}/neos/service/data-source/sitegeist-resource-collections?${c.toString()}`,{credentials:"include",headers:{Accept:"application/json"}}),l=await n.text();if(!n.ok)throw new Error(`The resource collection "${o.collection}" could not be resolved (HTTP ${n.status}). ${l.slice(0,500)}`);let d=null;try{d=JSON.parse(l)}catch{throw new Error(`The resource collection data source did not answer with JSON: ${l.slice(0,500)}`)}let i=d?.contextPath??d?.data?.contextPath;if(typeof i!="string")throw new Error(`The resource collection "${o.collection}" has no node address: ${l.slice(0,500)}`);return{contextPath:i}},Qe=async(e,o,t)=>{if(t.length===0)return{};let s=e.getState(),r=s?.cr?.nodes?.documentNode??we.selectors.CR.Nodes.focusedNodePathSelector(s);if(typeof r!="string")return{};let c=new URLSearchParams({node:r,nodes:t.join(",")}),n=await fetch(`${Ke(o)}/neos/service/data-source/sitegeist-resource-usage?${c.toString()}`,{credentials:"include",headers:{Accept:"application/json"}});if(!n.ok)return{};try{let l=await n.json();return l?.data??l??{}}catch{return{}}},Xe=async(e,o)=>await F.get().q(o).find(Le(e)).get()??[];var eo=(e,o,t,s,r,c)=>{let{store:n,nodeTypesRegistry:l,t:d}=h(),i=e.options.resourceCreation,[a,f]=ke.default.useState(null),[g,y]=ke.default.useState(null);return{create:async()=>{c(),o.setError(null);let{data:v,missing:N}=je(i,l.getNodeType(i.type));if(N.length>0){o.setError(d("error.creationBlocked","{type} cannot be created here: {properties} must be provided on creation. Give these properties a default value, make them nullable, or promote them to the creation dialog (showInCreationDialog).",{type:i.type,properties:N.join(", ")}));return}await o.run(async()=>{let I=o.container??(await o.reload()).container,w=await F.get().endpoints.change([{type:"Neos.Neos.Ui:CreateInto",subject:I.contextPath,payload:{nodeType:i.type,data:v}}]);Y(n,w);let E=(w?.feedbacks??[]).find(b=>b?.type==="Neos.Neos.Ui:NodeCreated")?.payload;if(!E?.identifier)throw new Error(d("error.creationFailed","The resource could not be created."));await Q(n),o.touch(),t.add(E.identifier),Fe(n,e.identifier);let{resources:U}=await o.reload(),C=U.find(b=>b.identifier===E.identifier);C&&await r.inspect(C)})},duplicate:async v=>{v.length!==0&&await o.run(async()=>{let N=o.container??(await o.reload()).container,I=await F.get().endpoints.change(v.map(C=>({type:"Neos.Neos.Ui:CopyInto",subject:se(C.contextPath,re),payload:{parentContextPath:N.contextPath}})));Y(n,I);let w=(I?.feedbacks??[]).filter(C=>C?.type==="Neos.Neos.Ui:NodeCreated").map(C=>C?.payload?.identifier).filter(Boolean);await Q(n),o.touch();let{resources:E}=await o.reload(),U=E.find(C=>C.identifier===w[w.length-1]);s.leave(),U&&await r.inspect(U)})},setHidden:async(v,N)=>{v.length!==0&&await o.run(async()=>{let I=await F.get().endpoints.change(v.map(w=>({type:"Neos.Neos.Ui:Property",subject:se(w.contextPath,re),payload:{propertyName:"_hidden",value:N}})));Y(n,I),await Q(n),o.touch(),n.dispatch(Ze.actions.UI.ContentCanvas.reload()),await o.reload(),r.node&&v.some(w=>w.contextPath===r.node.contextPath)&&await r.inspect(r.node)})},requestRemoval:async v=>{if(v.length!==0){y(null),f(v);try{y(await Qe(n,e.neos?.routes,v.map(N=>N.identifier)))}catch{y({})}}},remove:async v=>{f(null),await o.run(async()=>{let N=await F.get().endpoints.change(v.map(w=>({type:"Neos.Neos.Ui:RemoveNode",subject:se(w.contextPath,re),payload:{}})));Y(n,N),await Q(n),o.touch(),t.drop(v.map(w=>w.identifier));let I=v.map(w=>w.contextPath);s.forget(I),s.selection.length>0&&v.length>=s.selection.length&&s.leave(),r.node&&I.includes(r.node.contextPath)&&r.forget(),await o.reload()})},cancelRemoval:()=>f(null),pendingRemoval:a,pendingRemovalUsage:g}};var V=u(R());var oo=e=>{let o=e?.get?.("dataLoaders")?.get?.("NodeLookup");o&&(o._lruCache=null)};var to=(e,o)=>{let{store:t,globalRegistry:s}=h(),r=e.resourceCreation,[c,n]=V.default.useState(null),[l,d]=V.default.useState([]),[i,a]=V.default.useState(!1),[f,g]=V.default.useState(null),[y,p]=V.default.useState(0),m=V.default.useCallback(async()=>{let O=await Ye(t,r,o),B=await Xe(e,O.contextPath);return n(O),d(B),{container:O,resources:B}},[r,e,o,t]),x=V.default.useCallback(async O=>{a(!0),g(null);try{return await O()}catch(B){g(qe(B));return}finally{a(!1)}},[]);return{container:c,resources:l,isLoading:i,error:f,setError:g,reload:m,run:x,version:y,touch:V.default.useCallback(()=>{oo(s),p(O=>O+1)},[s])}};var fe=u(R()),ro=()=>{let[e,o]=fe.default.useState(null),t=fe.default.useRef(null),s=fe.default.useCallback(()=>{t.current=null,o(null)},[]),r=fe.default.useCallback((c,n)=>{if(!c||!n||t.current===c){s();return}t.current=c,o({id:c,element:n()})},[s]);return{secondaryInspector:e,render:r,close:s}};var ne=u(R()),so=e=>{let[o,t]=ne.default.useState(!1),[s,r]=ne.default.useState([]),c=ne.default.useCallback(()=>{t(!1),r([])},[]),n=ne.default.useCallback(d=>{r(i=>i.includes(d.contextPath)?i.filter(a=>a!==d.contextPath):[...i,d.contextPath])},[]),l=ne.default.useCallback(d=>{r(i=>i.filter(a=>!d.includes(a)))},[]);return{isSelecting:o,enter:(d=[])=>{r(d),t(!0)},leave:c,selection:s,selected:e.filter(d=>s.includes(d.contextPath)),toggle:n,setSelection:r,forget:l}};var no=`
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
`;var D=u(R()),q=u(W());var Z=e=>!!e?.tags?.disabled||!!e?.properties?._hidden;var io=({resources:e,usage:o,onCancel:t,onHideInstead:s,onConfirm:r})=>{let{nodeTypesRegistry:c,t:n}=h(),l=e.every(d=>!!c.getNodeType(d.nodeType)?.properties?._hidden)&&!e.every(Z);return D.default.createElement(q.Dialog,{isOpen:!0,type:"warn",style:"narrow",title:e.length===1?n("removal.titleOne","Delete this resource?"):n("removal.title","Delete {count} resources?",{count:e.length}),onRequestClose:t,actions:[D.default.createElement(q.Button,{key:"cancel",type:"button",onClick:t},n("action.cancel","Cancel")),l?D.default.createElement(q.Button,{key:"hide",type:"button",style:"lighter",onClick:()=>s(e)},D.default.createElement(q.Icon,{icon:"eye-slash"})," ",n("action.hideInstead","Hide instead")):null,D.default.createElement(q.Button,{key:"delete",type:"button",style:"error",hoverStyle:"error",onClick:()=>r(e)},D.default.createElement(q.Icon,{icon:"trash"})," ",n("action.delete","Delete"))].filter(Boolean)},D.default.createElement("div",{className:"sitegeist-resource-reference-editor__confirmation"},D.default.createElement("ul",null,e.map(d=>{let i=o?.[d.identifier];return D.default.createElement("li",{key:d.contextPath},D.default.createElement("strong",null,d.label||d.identifier),o===null&&D.default.createElement("small",null,n("removal.checking","Checking references\u2026")),i&&i.count>0&&D.default.createElement("small",null,i.count===1?n("removal.referencedOnce","Referenced once"):n("removal.referenced","Referenced {count} times",{count:i.count}),i.documents.length>0?`: ${i.documents.join(", ")}`:""),o!==null&&!i?.count&&D.default.createElement("small",null,n("removal.notReferenced","Not referenced")))})),D.default.createElement("p",null,n("removal.explanation","Deleting removes the resource from the collection, and every document that references it loses that reference. Hiding it instead keeps those references intact."))))};var j=u(R()),be=u(W());var k=u(R()),L=u(W());var ao=({targets:e,visibleResources:o,selection:t,isSelecting:s,isLoading:r,isMultiple:c,selectionIsReferenced:n,onDuplicate:l,onSetHidden:d,onDelete:i,onSetSelection:a,onUseSelection:f,onUnuseSelection:g})=>{let{nodeTypesRegistry:y,t:p}=h(),m=e.length>0,x=m&&e.every(Z),O=m&&e.every(v=>!!y.getNodeType(v.nodeType)?.properties?._hidden),B=t.length===o.length,oe=()=>s?t.length>0?p("selection.count","{count} selected",{count:t.length}):p("selection.hint","Click the resources to select them"):m?e[0].label:p("action.noTarget","No resource selected");return k.default.createElement("div",{className:"sitegeist-resource-reference-editor__footer"},k.default.createElement("span",{className:"sitegeist-resource-reference-editor__footer-target"+(m?"":" sitegeist-resource-reference-editor__footer-target--empty")},oe()),k.default.createElement("div",{className:"sitegeist-resource-reference-editor__footer-actions"},s&&k.default.createElement(L.Button,{type:"button",style:"lighter",disabled:r||o.length===0,onClick:()=>a(B?[]:o.map(v=>v.contextPath))},B?p("action.deselectAll","Deselect all"):p("action.selectAll","Select all")),k.default.createElement(L.Button,{type:"button",style:"lighter",disabled:r||!m,onClick:l},k.default.createElement(L.Icon,{icon:"clone"})," ",p("action.duplicate","Duplicate")),k.default.createElement(L.Button,{type:"button",style:"lighter",disabled:r||!O,onClick:()=>d(!x)},k.default.createElement(L.Icon,{icon:x?"eye":"eye-slash"})," ",x?p("action.show","Show"):p("action.hide","Hide")),s&&c&&k.default.createElement(L.Button,{className:"sitegeist-resource-reference-editor__bulk-use"+(n?" sitegeist-resource-reference-editor__bulk-use--remove":""),type:"button",style:"lighter",disabled:r||t.length===0,onClick:n?g:f},n?k.default.createElement(k.default.Fragment,null,k.default.createElement(L.Icon,{icon:"times"})," ",p("action.remove","Remove")):k.default.createElement(k.default.Fragment,null,k.default.createElement(L.Icon,{icon:"check"})," ",p("action.use","Use"))),k.default.createElement(L.Button,{type:"button",style:"error",hoverStyle:"error",disabled:r||!m,onClick:i},k.default.createElement(L.Icon,{icon:"trash"})," ",p("action.delete","Delete"))))};var H=u(R()),ae=u(W());var ee=u(R()),ie=u(W());var Ne=u(R()),uo=u(lo()),po=({item:e,node:o,value:t,hooks:s,isChanged:r,onChange:c,renderSecondaryInspector:n,validationErrors:l})=>Ne.default.createElement("div",{className:"sitegeist-resource-reference-editor__field"},Ne.default.createElement(uo.EditorEnvelope,{identifier:e.id,label:e.label??e.id,editor:e.editor,options:e.editorOptions,value:t,hooks:s??null,node:o,propertyName:e.id,commit:(d,i)=>c(e.id,d,i),renderSecondaryInspector:n,validationErrors:l,helpMessage:e.helpMessage,helpThumbnail:e.helpThumbnail,highlight:!!r}));var go=({group:e,node:o,values:t,draft:s,isOpen:r,onToggle:c,onChange:n,renderSecondaryInspector:l,validationErrors:d})=>{let{i18nRegistry:i}=h();return ee.default.createElement(ie.ToggablePanel,{isOpen:r,onPanelToggle:c},ee.default.createElement(ie.ToggablePanel.Header,null,e.icon&&ee.default.createElement("div",{className:"sitegeist-resource-reference-editor__group-icon"},ee.default.createElement(ie.Icon,{icon:e.icon})),$(i,e.label)),ee.default.createElement(ie.ToggablePanel.Contents,null,ye(e).map(a=>ee.default.createElement(po,{key:`${o?.contextPath??"new"}-${a.id}`,item:a,node:o,value:a.id==="_nodeType"?o?.nodeType:t[a.id],hooks:s[a.id]?.hooks,isChanged:!!s[a.id],onChange:n,renderSecondaryInspector:l,validationErrors:d[a.id]}))))};var fo=({inspected:e,isLoading:o,renderSecondaryInspector:t})=>{let{i18nRegistry:s,t:r}=h();return H.default.createElement("div",{className:"sitegeist-resource-reference-editor__inspector"},H.default.createElement("div",{className:"sitegeist-resource-reference-editor__inspector-body"},e.node?e.tabs.length===0?H.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},r("inspector.noConfiguration","This node type has no inspector configuration.")):H.default.createElement(ae.Tabs,{className:"sitegeist-resource-reference-editor__tabs"},e.tabs.map(n=>H.default.createElement(ae.Tabs.Panel,{key:n.id,id:n.id,icon:n.icon,tooltip:$(s,n.label)},n.groups.map(l=>H.default.createElement(go,{key:l.id,group:l,node:e.node,values:e.values,draft:e.draft,isOpen:e.isPanelOpen(l.id,l.collapsed),onToggle:()=>e.togglePanel(l.id),onChange:e.change,renderSecondaryInspector:t,validationErrors:e.validationErrors}))))):H.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},r("inspector.empty","Select a resource to edit its properties."))),e.node&&H.default.createElement("div",{className:"sitegeist-resource-reference-editor__inspector-footer"},H.default.createElement(ae.Button,{type:"button",style:"lighter",disabled:o||!e.hasChanges,onClick:e.discard},r("action.discard","Discard")),H.default.createElement(ae.Button,{type:"button",style:"success",disabled:o||!e.hasChanges,onClick:e.save},r("action.apply","Apply"))))};var ve=u(R());var _=u(R()),G=u(W());var mo=({resource:e,isActive:o,isReferenced:t,isSelecting:s,isSelected:r,onOpen:c,onToggleSelection:n,onToggleReference:l})=>{let{nodeTypesRegistry:d,i18nRegistry:i,t:a}=h(),f=d.getNodeType(e.nodeType),g=s?n:c,y=_.default.useRef(null);return _.default.useEffect(()=>{o&&y.current?.scrollIntoView({block:"nearest"})},[o]),_.default.createElement("div",{ref:y,role:"button",tabIndex:0,className:["sitegeist-resource-reference-editor__item",o&&!s?"sitegeist-resource-reference-editor__item--active":"",s&&r?"sitegeist-resource-reference-editor__item--selected":"",Z(e)?"sitegeist-resource-reference-editor__item--hidden":""].join(" "),onClick:g,onKeyDown:p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),g())}},s&&_.default.createElement("span",{className:"sitegeist-resource-reference-editor__item-select"},_.default.createElement(G.CheckBox,{isChecked:r,onChange:n})),_.default.createElement(G.Icon,{icon:f?.ui?.icon??"file"}),_.default.createElement("div",{className:"sitegeist-resource-reference-editor__item-label"},_.default.createElement("strong",{className:e.label?"":"sitegeist-resource-reference-editor__item-unnamed"},e.label||$(i,f?.ui?.label)||e.identifier),_.default.createElement("small",null,$(i,f?.ui?.label)||e.nodeType)),_.default.createElement("span",{className:"sitegeist-resource-reference-editor__item-actions"+(s?" sitegeist-resource-reference-editor__item-actions--inert":"")},Z(e)&&_.default.createElement("span",{className:"sitegeist-resource-reference-editor__hidden-badge",title:a("resource.hiddenTitle","This resource is hidden")},_.default.createElement(G.Icon,{icon:"eye-slash"})," ",a("resource.hidden","Hidden")),_.default.createElement("button",{type:"button",className:"sitegeist-resource-reference-editor__use"+(t?" sitegeist-resource-reference-editor__use--active":""),onClick:p=>{p.stopPropagation(),l()}},t?_.default.createElement(_.default.Fragment,null,_.default.createElement("span",{className:"sitegeist-resource-reference-editor__use-state"},_.default.createElement(G.Icon,{icon:"check"})," ",a("action.inUse","In use")),_.default.createElement("span",{className:"sitegeist-resource-reference-editor__use-action"},_.default.createElement(G.Icon,{icon:"times"})," ",a("action.remove","Remove"))):_.default.createElement(_.default.Fragment,null,_.default.createElement(G.Icon,{icon:"plus"})," ",a("action.use","Use")))))};var ho=({resources:e,isLoading:o,activeContextPath:t,referencedIdentifiers:s,isSelecting:r,selection:c,onOpen:n,onToggleSelection:l,onToggleReference:d})=>{let{t:i}=h();return ve.default.createElement("div",{className:"sitegeist-resource-reference-editor__list"},e.length===0&&ve.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},o?i("list.loading","Loading\u2026"):i("list.empty","No resources found.")),e.map(a=>ve.default.createElement(mo,{key:a.contextPath,resource:a,isActive:t===a.contextPath,isReferenced:s.includes(a.identifier),isSelecting:r,isSelected:c.includes(a.contextPath),onOpen:()=>n(a),onToggleSelection:()=>l(a),onToggleReference:()=>d(a.identifier)})))};var z=u(R()),J=u(W());var yo=({filter:e,onFilter:o,isLoading:t,isSelecting:s,canSelect:r,createLabel:c,onCreate:n,onEnterSelection:l,onLeaveSelection:d})=>{let{t:i}=h();return z.default.createElement("div",{className:"sitegeist-resource-reference-editor__toolbar"},z.default.createElement("input",{className:"sitegeist-resource-reference-editor__search",type:"search",value:e,placeholder:i("list.search","Filter resources"),onChange:a=>o(a.currentTarget.value)}),z.default.createElement(J.Button,{type:"button",style:"lighter",disabled:t,onClick:n,title:c},z.default.createElement(J.Icon,{icon:"plus"})," ",i("action.new","New")),s?z.default.createElement(J.Button,{type:"button",style:"lighter",onClick:d},z.default.createElement(J.Icon,{icon:"check"})," ",i("action.done","Done")):z.default.createElement(J.Button,{type:"button",style:"lighter",disabled:t||!r,onClick:l},z.default.createElement(J.Icon,{icon:"list-check"})," ",i("action.selectMultiple","Select multiple")))};var vo=({isOpen:e,onClose:o,collection:t,inspected:s,selection:r,references:c,actions:n,createLabel:l,renderSecondaryInspector:d})=>{let{t:i}=h(),[a,f]=j.default.useState(""),g=a.trim().toLocaleLowerCase(),y=g===""?t.resources:t.resources.filter(x=>(x.label??"").toLocaleLowerCase().includes(g)),p=s.node?t.resources.find(x=>x.contextPath===s.node.contextPath)??null:null,m=r.isSelecting?r.selected:p?[p]:[];return j.default.createElement(be.Dialog,{isOpen:e,title:"",style:"jumbo",onRequestClose:o,actions:[j.default.createElement(ao,{key:"actions",targets:m,visibleResources:y,selection:r.selection,isSelecting:r.isSelecting,isLoading:t.isLoading,isMultiple:c.isMultiple,selectionIsReferenced:r.selected.length>0&&r.selected.every(x=>c.referenced.includes(x.identifier)),onDuplicate:()=>n.duplicate(m),onSetHidden:x=>n.setHidden(m,x),onDelete:()=>n.requestRemoval(m),onSetSelection:r.setSelection,onUseSelection:()=>{c.addMany(r.selected.map(x=>x.identifier)),r.leave()},onUnuseSelection:()=>{c.drop(r.selected.map(x=>x.identifier)),r.leave()}}),j.default.createElement(be.Button,{key:"close",type:"button",onClick:o},i("action.close","Close"))]},j.default.createElement("div",{className:"sitegeist-resource-reference-editor__layout"},j.default.createElement("div",{className:"sitegeist-resource-reference-editor__content"},t.error&&j.default.createElement("div",{className:"sitegeist-resource-reference-editor__state sitegeist-resource-reference-editor__error"},t.error),j.default.createElement(yo,{filter:a,onFilter:f,isLoading:t.isLoading,isSelecting:r.isSelecting,canSelect:y.length>0,createLabel:l,onCreate:n.create,onEnterSelection:()=>r.enter(p?[p.contextPath]:[]),onLeaveSelection:r.leave}),j.default.createElement(ho,{resources:y,isLoading:t.isLoading,activeContextPath:s.node?.contextPath,referencedIdentifiers:c.referenced,isSelecting:r.isSelecting,selection:r.selection,onOpen:s.inspect,onToggleSelection:r.toggle,onToggleReference:c.toggle})),j.default.createElement(fo,{inspected:s,isLoading:t.isLoading,renderSecondaryInspector:d})))};var me=u(R()),ce=u(W());var bo=({children:e,onClose:o})=>{let{t}=h();return me.default.createElement(ce.Dialog,{isOpen:!0,title:"",style:"jumbo",onRequestClose:o,actions:[me.default.createElement(ce.Button,{key:"close",type:"button",style:"lighter",onClick:o},me.default.createElement(ce.Icon,{icon:"times"})," ",t("action.close","Close"))]},me.default.createElement("div",{className:"sitegeist-resource-reference-editor__secondary"},e))};var _o=({ReferenceEditor:e,ReferencesEditor:o,...t})=>{let{i18nRegistry:s,nodeTypesRegistry:r,t:c}=h(),[n,l]=P.default.useState(!1),d=t.options.resourceCreation,i=ro(),a=to(t.options,t.neos?.routes),f=so(a.resources),g=Je(t),y=ze(a,i.close),p=()=>l(!0),m=eo(t,a,g,f,y,p),x=async()=>{p(),await a.run(()=>a.reload())},O=()=>{i.close(),l(!1)},B=E=>{if(!g.isMultiple)return E.closest('[class*="selectBoxHeader"]')&&g.referenced.length===1?g.referenced[0]:null;let U=E.closest('[class*="selectedOptions__innerPreview"]')?.closest("li"),C=U?.parentElement;return!U||!C?null:g.referenced[Array.prototype.indexOf.call(C.children,U)]??null},oe=E=>{let U=E.target;if(!U||U.closest("input, button"))return;let C=B(U);C&&(E.preventDefault(),E.stopPropagation(),p(),a.run(async()=>{let{resources:b}=await a.reload(),S=b.find(A=>A.identifier===C);S&&await y.inspect(S)}))},{resourceCreation:v,...N}=t.options,I=t.options.nodeTypes??[d.type],w=I.length===1?$(s,r.getNodeType(I[0])?.ui?.label):"";return P.default.createElement(P.default.Fragment,null,P.default.createElement("style",null,no),P.default.createElement("div",{className:"sitegeist-resource-reference-editor__reference",style:{"--sitegeist-resource-type":JSON.stringify(w)},onClickCapture:oe},g.isMultiple&&o?P.default.createElement(o,{key:a.version,...t,options:N}):P.default.createElement(e,{key:a.version,...t,options:N})),P.default.createElement("div",{className:"sitegeist-resource-reference-editor__actions"},P.default.createElement(de.Button,{className:"sitegeist-resource-reference-editor__create",type:"button",style:"lighter",disabled:t.options.disabled||a.isLoading,onClick:m.create,title:d.buttonLabel??c("action.createNew","Create new"),"aria-label":d.buttonLabel??c("action.createNew","Create new")},P.default.createElement(de.Icon,{icon:"plus"})),P.default.createElement(de.Button,{type:"button",style:"lighter",disabled:t.options.disabled||a.isLoading,onClick:x},P.default.createElement(de.Icon,{icon:"list"})," ",c("action.showAll","Show all"))),P.default.createElement(vo,{isOpen:n,onClose:O,collection:a,inspected:y,selection:f,references:g,actions:m,createLabel:d.buttonLabel,renderSecondaryInspector:i.render}),m.pendingRemoval&&P.default.createElement(io,{resources:m.pendingRemoval,usage:m.pendingRemovalUsage,onCancel:m.cancelRemoval,onHideInstead:E=>{m.cancelRemoval(),m.setHidden(E,!0)},onConfirm:m.remove}),i.secondaryInspector&&P.default.createElement(bo,{onClose:i.close},i.secondaryInspector.element))};Ie("Sitegeist.ResourceReferenceEditor",{},(e,{store:o})=>{let t=e.get("inspector"),s=t?.get("editors"),r=t?.get("saveHooks"),c=e.get("validators"),n=s?.get("Neos.Neos/Inspector/Editors/ReferenceEditor"),l=s?.get("Neos.Neos/Inspector/Editors/ReferencesEditor"),d=e.get("@neos-project/neos-ui-contentrepository"),i=e.get("i18n");if(!s||!n?.component||!d){console.warn("[Sitegeist.ResourceReferenceEditor] Required Neos UI registries are missing.");return}let a={store:o,globalRegistry:e,nodeTypesRegistry:d,saveHooksRegistry:r,validatorsRegistry:c,i18nRegistry:i};s.set("Sitegeist.ResourceReferenceEditor/Inspector/Editors/ResourceReferenceEditor",{component:f=>Ce.default.createElement(Ue,{registries:a},Ce.default.createElement(_o,{...f,ReferenceEditor:n.component,ReferencesEditor:l?.component}))})});})();
//# sourceMappingURL=Plugin.js.map
