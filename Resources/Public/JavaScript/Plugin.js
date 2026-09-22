(()=>{var Oo=Object.create;var Te=Object.defineProperty;var Uo=Object.getOwnPropertyDescriptor;var Bo=Object.getOwnPropertyNames;var Ao=Object.getPrototypeOf,Fo=Object.prototype.hasOwnProperty;var Lo=(e,o)=>()=>(e&&(o=e(e=0)),o);var ge=(e,o)=>()=>(o||e((o={exports:{}}).exports,o),o.exports);var Ho=(e,o,t,s)=>{if(o&&typeof o=="object"||typeof o=="function")for(let r of Bo(o))!Fo.call(e,r)&&r!==t&&Te(e,r,{get:()=>o[r],enumerable:!(s=Uo(o,r))||s.enumerable});return e};var u=(e,o,t)=>(t=e!=null?Oo(Ao(e)):{},Ho(o||!e||!e.__esModule?Te(t,"default",{value:e,enumerable:!0}):t,e));function P(e){return(...o)=>{if(window["@Neos:HostPluginAPI"]&&window["@Neos:HostPluginAPI"][`@${e}`])return window["@Neos:HostPluginAPI"][`@${e}`](...o);throw new Error("You are trying to read from a consumer api that hasn't been initialized yet!")}}var q=Lo(()=>{});var N=ge((zo,De)=>{q();De.exports=P("vendor")().React});var J=ge((ot,Ue)=>{q();Ue.exports=P("NeosProjectPackages")().NeosUiReduxStore});var Ae=ge((rt,Be)=>{q();Be.exports=P("vendor")().reduxSagaEffects});var j=ge((at,je)=>{q();je.exports=P("NeosProjectPackages")().ReactUiComponents});var wo=ge((ar,_o)=>{q();_o.exports=P("NeosProjectPackages")().NeosUiEditors});var Ee=u(N());q();var jo=P("manifest"),Oe=jo,{SynchronousRegistry:Ko,SynchronousMetaRegistry:Jo}=P("NeosProjectPackages")().NeosUiRegistry;q();var U=P("NeosProjectPackages")().NeosUiBackendConnectorDefault,{fetchWithErrorHandling:Xo}=P("NeosProjectPackages")().NeosUiBackendConnector;var Y=u(J()),xe=u(Ae()),Re=null,Fe=e=>{let o=Re;Re=null,o&&e(o)},Le=async(e,o,t,s)=>{let[r]=await U.get().q([s]).get();return r&&e.dispatch(Y.actions.CR.Nodes.merge({[r.contextPath]:r})),new Promise(c=>{Re={apply:n=>c(n),cancel:()=>c(null)},e.dispatch(Y.actions.UI.NodeCreationDialog.open(o?.ui?.label??t,o?.ui?.creationDialog??{elements:{}},s,t))})};function*He(){yield(0,xe.takeEvery)(Y.actionTypes.UI.NodeCreationDialog.APPLY,e=>Fe(o=>o.apply(e?.payload??{}))),yield(0,xe.takeEvery)([Y.actionTypes.UI.NodeCreationDialog.CANCEL,Y.actionTypes.UI.NodeCreationDialog.BACK],()=>Fe(e=>e.cancel()))}var E=u(N()),de=u(j());var fe=u(N());var We="Sitegeist.ResourceReferenceEditor",Me="Main",W=(e,o)=>o?e?.translate?e.translate(o):o:"",Wo=(e,o,t,s)=>e?.translate?e.translate(`${We}:${Me}:${o}`,t,s,We,Me):t,Ve=e=>(o,t,s)=>Wo(e,o,t,s);var $e=fe.default.createContext(null),qe=({registries:e,children:o})=>{let t=fe.default.useMemo(()=>({...e,t:Ve(e.i18nRegistry)}),[e]);return fe.default.createElement($e.Provider,{value:t},o)},_=()=>{let e=fe.default.useContext($e);if(!e)throw new Error("[Sitegeist.ResourceReferenceEditor] The Neos UI registries are only available below RegistriesProvider.");return e};var Z=u(N());var Ne=u(J());var me=u(J()),Mo=["Neos.Neos.Ui:UpdateNodeInfo","Neos.Neos.Ui:UpdateNodePreviewUrl","Neos.Neos.Ui:UpdateWorkspaceInfo","Neos.Neos.Ui:Success","Neos.Neos.Ui:Info","Neos.Neos.Ui:Warning","Neos.Neos.Ui:Error"],ze=(e,o)=>{if(typeof o!="string")return;let t=e.getState(),s=me.selectors.CR.Nodes.focusedNodePathSelector(t),r=t?.ui?.inspector?.valuesByNodePath?.[s]??{},c=Object.keys(r).filter(n=>r[n]!==void 0);c.length===1&&c[0]===o&&e.dispatch(me.actions.UI.Inspector.apply())},Q=(e,o)=>{let t=(o?.feedbacks??[]).filter(s=>Mo.includes(s?.type));t.length>0&&e.dispatch(me.actions.ServerFeedback.handleServerFeedback({feedbacks:t}))};var ke=u(J()),X=async e=>{let o=U.get().endpoints?.syncWorkspace;if(!o)return;let t=e.getState(),s=ke.selectors.CR.Workspaces.personalWorkspaceNameSelector(t);if(typeof s!="string"||s==="")return;let r=await o(s,!1,ke.selectors.CR.ContentDimensions.active(t));if(r&&typeof r=="object"&&"conflicts"in r)throw new Error("Your workspace could not be brought up to date with the live workspace, because some of your changes conflict with it. Resolve the conflicts from the workspace dialog, then try again.");if(r&&typeof r=="object"&&"error"in r)throw new Error(r.error?.message??"Your workspace could not be brought up to date with the live workspace.")};var Ge=e=>(e.nodeTypes??[e.resourceCreation.type]).map(o=>`[instanceof ${o}]`).join(","),ve=e=>(e.items??[]).filter(o=>o.type==="editor"&&o.editor&&o.hidden!==!0),Ke=(e,o)=>(e.getInspectorViewConfigurationFor(o)?.tabs??[]).map(s=>({...s,groups:(s.groups??[]).filter(r=>ve(r).length>0)})).filter(s=>s.groups.length>0),Je=e=>{switch(e){case"integer":case"float":return 0;case"boolean":return!1;case"array":return[];default:return""}},Ye=e=>Object.entries(e?.ui?.creationDialog?.elements??{}).filter(([,o])=>o?.ui?.editor&&o?.ui?.hidden!==!0).map(([o,t])=>({type:"editor",id:o,dataType:t.type,label:t.ui?.label??o,editor:t.ui.editor,editorOptions:t.ui.editorOptions,helpMessage:t.ui?.help,defaultValue:t.defaultValue,validation:t.validation})),Qe=(e,o)=>{if(!Array.isArray(e.requiredProperties))return["(stale editor configuration - flush the Neos caches)"];let t=new Set(o.map(s=>s.id));return[...e.unsupportedRequiredProperties??[],...e.requiredProperties.filter(s=>!t.has(s.name)).map(s=>s.name)]},Xe=(e,o)=>e?.properties?.[o]??e?.references?.[o],Ze=e=>e.flatMap(o=>o.groups.flatMap(t=>ve(t)));var Ce=async(e,o,t)=>{if(!o)return e;let s=e;for(let[r,c]of Object.entries(o)){let n=t?.get(r);if(!n)throw new Error(`There is no registered save hook function for identifier ${r}`);s=await n(s,c)}return s},eo=async(e,o)=>{let t={};for(let[s,r]of Object.entries(e))t[s]=await Ce(r.value,r.hooks,o);return t};var oo=(e,o,t,s)=>{let r={};for(let c of e){let n=Xe(o,c.id)?.validation;if(!n)continue;let d=Object.keys(n).map(l=>{let a=s?.get(l);return a?a(t[c.id],n[l]):(console.warn(`[Sitegeist.ResourceReferenceEditor] Validator ${l} not found`),null)}).filter(Boolean);d.length>0&&(r[c.id]=d)}return r},to=e=>{if(e instanceof Error)return e.message;if(typeof e=="string")return e;let o=e?.message??e?.error;if(typeof o=="string")return o;try{return JSON.stringify(e)}catch{return String(e)}};var se="live",ne=(e,o)=>{if(!o)return e;try{let t=JSON.parse(e);return t?.workspaceName===o?e:JSON.stringify({...t,workspaceName:o})}catch{return e}};var ro=(e,o)=>{let{store:t,nodeTypesRegistry:s,saveHooksRegistry:r,validatorsRegistry:c}=_(),[n,d]=Z.default.useState(null),[l,a]=Z.default.useState([]),[i,y]=Z.default.useState({}),[g,R]=Z.default.useState({}),[p,f]=Z.default.useState({}),[w,O]=Z.default.useState({}),B=s.getNodeType(n?.nodeType),te=Ze(l),K=Object.keys(g).length>0,re=()=>{R({}),y({}),f({}),o()},b=async x=>{re(),await e.run(async()=>{let[v]=await U.get().q([x.contextPath]).get(),I=v??x;t.dispatch(Ne.actions.CR.Nodes.merge({[I.contextPath]:I})),d(I),a(Ke(s,I.nodeType)),y({...I.properties??{}})})};return{node:n,nodeType:B,tabs:l,values:i,draft:g,hasChanges:K,validationErrors:p,isPanelOpen:(x,v)=>!!w[x]==!!v,togglePanel:x=>O(v=>({...v,[x]:!v[x]})),inspect:b,forget:()=>{d(null),a([]),re()},change:(x,v,I)=>{let ue=n?.properties?.[x],pe=!I&&(ue===v||JSON.stringify(ue)===JSON.stringify(v));R(H=>{if(pe){let{[x]:Do,...we}=H;return we}return{...H,[x]:{value:v,hooks:I}}}),y(H=>({...H,[x]:v})),f(H=>{if(!H[x])return H;let{[x]:Do,...we}=H;return we})},save:async()=>{if(!n)return;let x=oo(te,B,i,c);f(x),!(Object.keys(x).length>0)&&await e.run(async()=>{let v=await eo(g,r),I=ne(n.contextPath,se),ue=Object.entries(v).map(([pe,H])=>({type:"Neos.Neos.Ui:Property",subject:I,payload:{propertyName:pe,value:H}}));if(ue.length>0){let pe=await U.get().endpoints.change(ue);Q(t,pe),await X(t),e.touch(),t.dispatch(Ne.actions.UI.ContentCanvas.reload())}R({}),await e.reload(),await b(n)})},discard:()=>{R({}),f({}),y({...n?.properties??{}})}}};var so=u(N()),no=e=>{let o=!!e.options.multiple,{value:t,commit:s}=e,r=so.default.useMemo(()=>Array.isArray(t)?t:t?[t]:[],[t]),c=a=>{if(!o){s(a);return}let i=Array.isArray(t)?t:[];i.includes(a)||s([...i,a])},n=a=>{if(!o){a.length>0&&s(a[0]);return}let i=Array.isArray(t)?t:[],y=a.filter(g=>!i.includes(g));y.length>0&&s([...i,...y])},d=a=>{let i=new Set(a);if(o||Array.isArray(t)){let y=Array.isArray(t)?t:[],g=y.filter(R=>!i.has(R));g.length!==y.length&&s(g);return}typeof t=="string"&&i.has(t)&&s("")};return{referenced:r,isMultiple:o,add:c,addMany:n,drop:d,toggle:a=>{if(r.includes(a)){d([a]);return}c(a)}}};var Pe=u(N());var uo=u(J());var Se=u(J());var io=e=>{let o=e?.core?.service?.nodes;return typeof o!="string"?"":o.replace(/\/neos\/service\/nodes\/?$/,"")},ao=async(e,o,t)=>{let s=e.getState(),r=s?.cr?.nodes?.documentNode??Se.selectors.CR.Nodes.focusedNodePathSelector(s);if(typeof r!="string")throw new Error("The node of the current editing session could not be resolved.");let c=new URLSearchParams({node:r,collection:o.collection});o.buttonLabel&&c.append("title",o.buttonLabel);let n=await fetch(`${io(t)}/neos/service/data-source/sitegeist-resource-collections?${c.toString()}`,{credentials:"include",headers:{Accept:"application/json"}}),d=await n.text();if(!n.ok)throw new Error(`The resource collection "${o.collection}" could not be resolved (HTTP ${n.status}). ${d.slice(0,500)}`);let l=null;try{l=JSON.parse(d)}catch{throw new Error(`The resource collection data source did not answer with JSON: ${d.slice(0,500)}`)}let a=l?.contextPath??l?.data?.contextPath;if(typeof a!="string")throw new Error(`The resource collection "${o.collection}" has no node address: ${d.slice(0,500)}`);return{contextPath:a}},co=async(e,o,t)=>{if(t.length===0)return{};let s=e.getState(),r=s?.cr?.nodes?.documentNode??Se.selectors.CR.Nodes.focusedNodePathSelector(s);if(typeof r!="string")return{};let c=new URLSearchParams({node:r,nodes:t.join(",")}),n=await fetch(`${io(o)}/neos/service/data-source/sitegeist-resource-usage?${c.toString()}`,{credentials:"include",headers:{Accept:"application/json"}});if(!n.ok)return{};try{let d=await n.json();return d?.data??d??{}}catch{return{}}},lo=async(e,o)=>await U.get().q(o).find(Ge(e)).get()??[];var po=(e,o,t,s,r,c)=>{let{store:n,nodeTypesRegistry:d,saveHooksRegistry:l,t:a}=_(),i=e.options.resourceCreation,[y,g]=Pe.default.useState(null),[R,p]=Pe.default.useState(null),f=async()=>{c(),o.setError(null);let b=d.getNodeType(i.type),C=Ye(b),m=Qe(i,C);if(m.length>0){o.setError(a("error.creationBlocked","{type} cannot be created here: {properties} must be provided on creation. Give these properties a default value, make them nullable, or promote them to the creation dialog (showInCreationDialog).",{type:i.type,properties:m.join(", ")}));return}if(C.length===0){await w({});return}let h=o.container??(await o.reload()).container,T=await Le(n,b,i.type,h.contextPath);T!==null&&await w(T)},w=async b=>{let C={};for(let[m,h]of Object.entries(b))C[m]=await Ce(h.value,h.hooks,l);for(let m of i.requiredProperties??[])(C[m.name]===void 0||C[m.name]===null)&&(C[m.name]=Je(m.type));await o.run(async()=>{let m=o.container??(await o.reload()).container,h=await U.get().endpoints.change([{type:"Neos.Neos.Ui:CreateInto",subject:m.contextPath,payload:{nodeType:i.type,data:C}}]);Q(n,h);let T=(h?.feedbacks??[]).find(I=>I?.type==="Neos.Neos.Ui:NodeCreated")?.payload;if(!T?.identifier)throw new Error(a("error.creationFailed","The resource could not be created."));await X(n),o.touch(),t.add(T.identifier),ze(n,e.identifier);let{resources:x}=await o.reload(),v=x.find(I=>I.identifier===T.identifier);v&&await r.inspect(v)})};return{create:f,duplicate:async b=>{b.length!==0&&await o.run(async()=>{let C=o.container??(await o.reload()).container,m=await U.get().endpoints.change(b.map(v=>({type:"Neos.Neos.Ui:CopyInto",subject:ne(v.contextPath,se),payload:{parentContextPath:C.contextPath}})));Q(n,m);let h=(m?.feedbacks??[]).filter(v=>v?.type==="Neos.Neos.Ui:NodeCreated").map(v=>v?.payload?.identifier).filter(Boolean);await X(n),o.touch();let{resources:T}=await o.reload(),x=T.find(v=>v.identifier===h[h.length-1]);s.leave(),x&&await r.inspect(x)})},setHidden:async(b,C)=>{b.length!==0&&await o.run(async()=>{let m=await U.get().endpoints.change(b.map(h=>({type:"Neos.Neos.Ui:Property",subject:ne(h.contextPath,se),payload:{propertyName:"_hidden",value:C}})));Q(n,m),await X(n),o.touch(),n.dispatch(uo.actions.UI.ContentCanvas.reload()),await o.reload(),r.node&&b.some(h=>h.contextPath===r.node.contextPath)&&await r.inspect(r.node)})},requestRemoval:async b=>{if(b.length!==0){p(null),g(b);try{p(await co(n,e.neos?.routes,b.map(C=>C.identifier)))}catch{p({})}}},remove:async b=>{g(null),await o.run(async()=>{let C=await U.get().endpoints.change(b.map(h=>({type:"Neos.Neos.Ui:RemoveNode",subject:ne(h.contextPath,se),payload:{}})));Q(n,C),await X(n),o.touch(),t.drop(b.map(h=>h.identifier));let m=b.map(h=>h.contextPath);s.forget(m),s.selection.length>0&&b.length>=s.selection.length&&s.leave(),r.node&&m.includes(r.node.contextPath)&&r.forget(),await o.reload()})},cancelRemoval:()=>g(null),pendingRemoval:y,pendingRemovalUsage:R}};var M=u(N());var go=e=>{let o=e?.get?.("dataLoaders")?.get?.("NodeLookup");o&&(o._lruCache=null)};var fo=(e,o)=>{let{store:t,globalRegistry:s}=_(),r=e.resourceCreation,[c,n]=M.default.useState(null),[d,l]=M.default.useState([]),[a,i]=M.default.useState(!1),[y,g]=M.default.useState(null),[R,p]=M.default.useState(0),f=M.default.useCallback(async()=>{let O=await ao(t,r,o),B=await lo(e,O.contextPath);return n(O),l(B),{container:O,resources:B}},[r,e,o,t]),w=M.default.useCallback(async O=>{i(!0),g(null);try{return await O()}catch(B){g(to(B));return}finally{i(!1)}},[]);return{container:c,resources:d,isLoading:a,error:y,setError:g,reload:f,run:w,version:R,touch:M.default.useCallback(()=>{go(s),p(O=>O+1)},[s])}};var he=u(N()),mo=()=>{let[e,o]=he.default.useState(null),t=he.default.useRef(null),s=he.default.useCallback(()=>{t.current=null,o(null)},[]),r=he.default.useCallback((c,n)=>{if(!c||!n||t.current===c){s();return}t.current=c,o({id:c,element:n()})},[s]);return{secondaryInspector:e,render:r,close:s}};var ie=u(N()),ho=e=>{let[o,t]=ie.default.useState(!1),[s,r]=ie.default.useState([]),c=ie.default.useCallback(()=>{t(!1),r([])},[]),n=ie.default.useCallback(l=>{r(a=>a.includes(l.contextPath)?a.filter(i=>i!==l.contextPath):[...a,l.contextPath])},[]),d=ie.default.useCallback(l=>{r(a=>a.filter(i=>!l.includes(i)))},[]);return{isSelecting:o,enter:(l=[])=>{r(l),t(!0)},leave:c,selection:s,selected:e.filter(l=>s.includes(l.contextPath)),toggle:n,setSelection:r,forget:d}};var yo=`
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
    .sitegeist-resource-reference-editor__creation {
        padding: 16px;
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
`;var D=u(N()),V=u(j());var ee=e=>!!e?.tags?.disabled||!!e?.properties?._hidden;var vo=({resources:e,usage:o,onCancel:t,onHideInstead:s,onConfirm:r})=>{let{nodeTypesRegistry:c,t:n}=_(),d=e.every(l=>!!c.getNodeType(l.nodeType)?.properties?._hidden)&&!e.every(ee);return D.default.createElement(V.Dialog,{isOpen:!0,type:"warn",style:"narrow",title:e.length===1?n("removal.titleOne","Delete this resource?"):n("removal.title","Delete {count} resources?",{count:e.length}),onRequestClose:t,actions:[D.default.createElement(V.Button,{key:"cancel",type:"button",onClick:t},n("action.cancel","Cancel")),d?D.default.createElement(V.Button,{key:"hide",type:"button",style:"lighter",onClick:()=>s(e)},D.default.createElement(V.Icon,{icon:"eye-slash"})," ",n("action.hideInstead","Hide instead")):null,D.default.createElement(V.Button,{key:"delete",type:"button",style:"error",hoverStyle:"error",onClick:()=>r(e)},D.default.createElement(V.Icon,{icon:"trash"})," ",n("action.delete","Delete"))].filter(Boolean)},D.default.createElement("div",{className:"sitegeist-resource-reference-editor__confirmation"},D.default.createElement("ul",null,e.map(l=>{let a=o?.[l.identifier];return D.default.createElement("li",{key:l.contextPath},D.default.createElement("strong",null,l.label||l.identifier),o===null&&D.default.createElement("small",null,n("removal.checking","Checking references\u2026")),a&&a.count>0&&D.default.createElement("small",null,a.count===1?n("removal.referencedOnce","Referenced once"):n("removal.referenced","Referenced {count} times",{count:a.count}),a.documents.length>0?`: ${a.documents.join(", ")}`:""),o!==null&&!a?.count&&D.default.createElement("small",null,n("removal.notReferenced","Not referenced")))})),D.default.createElement("p",null,n("removal.explanation","Deleting removes the resource from the collection, and every document that references it loses that reference. Hiding it instead keeps those references intact."))))};var L=u(N()),_e=u(j());var S=u(N()),A=u(j());var bo=({targets:e,visibleResources:o,selection:t,isSelecting:s,isLoading:r,isMultiple:c,selectionIsReferenced:n,onDuplicate:d,onSetHidden:l,onDelete:a,onSetSelection:i,onUseSelection:y,onUnuseSelection:g})=>{let{nodeTypesRegistry:R,t:p}=_(),f=e.length>0,w=f&&e.every(ee),O=f&&e.every(K=>!!R.getNodeType(K.nodeType)?.properties?._hidden),B=t.length===o.length,te=()=>s?t.length>0?p("selection.count","{count} selected",{count:t.length}):p("selection.hint","Click the resources to select them"):f?e[0].label:p("action.noTarget","No resource selected");return S.default.createElement("div",{className:"sitegeist-resource-reference-editor__footer"},S.default.createElement("span",{className:"sitegeist-resource-reference-editor__footer-target"+(f?"":" sitegeist-resource-reference-editor__footer-target--empty")},te()),S.default.createElement("div",{className:"sitegeist-resource-reference-editor__footer-actions"},s&&S.default.createElement(A.Button,{type:"button",style:"lighter",disabled:r||o.length===0,onClick:()=>i(B?[]:o.map(K=>K.contextPath))},B?p("action.deselectAll","Deselect all"):p("action.selectAll","Select all")),S.default.createElement(A.Button,{type:"button",style:"lighter",disabled:r||!f,onClick:d},S.default.createElement(A.Icon,{icon:"clone"})," ",p("action.duplicate","Duplicate")),S.default.createElement(A.Button,{type:"button",style:"lighter",disabled:r||!O,onClick:()=>l(!w)},S.default.createElement(A.Icon,{icon:w?"eye":"eye-slash"})," ",w?p("action.show","Show"):p("action.hide","Hide")),s&&c&&S.default.createElement(A.Button,{className:"sitegeist-resource-reference-editor__bulk-use"+(n?" sitegeist-resource-reference-editor__bulk-use--remove":""),type:"button",style:"lighter",disabled:r||t.length===0,onClick:n?g:y},n?S.default.createElement(S.default.Fragment,null,S.default.createElement(A.Icon,{icon:"times"})," ",p("action.remove","Remove")):S.default.createElement(S.default.Fragment,null,S.default.createElement(A.Icon,{icon:"check"})," ",p("action.use","Use"))),S.default.createElement(A.Button,{type:"button",style:"error",hoverStyle:"error",disabled:r||!f,onClick:a},S.default.createElement(A.Icon,{icon:"trash"})," ",p("action.delete","Delete"))))};var F=u(N()),ce=u(j());var oe=u(N()),ae=u(j());var Ie=u(N()),xo=u(wo()),Ro=({item:e,node:o,value:t,hooks:s,isChanged:r,onChange:c,renderSecondaryInspector:n,validationErrors:d})=>Ie.default.createElement("div",{className:"sitegeist-resource-reference-editor__field"},Ie.default.createElement(xo.EditorEnvelope,{identifier:e.id,label:e.label??e.id,editor:e.editor,options:e.editorOptions,value:t,hooks:s??null,node:o,propertyName:e.id,commit:(l,a)=>c(e.id,l,a),renderSecondaryInspector:n,validationErrors:d,helpMessage:e.helpMessage,helpThumbnail:e.helpThumbnail,highlight:!!r}));var ko=({group:e,node:o,values:t,draft:s,isOpen:r,onToggle:c,onChange:n,renderSecondaryInspector:d,validationErrors:l})=>{let{i18nRegistry:a}=_();return oe.default.createElement(ae.ToggablePanel,{isOpen:r,onPanelToggle:c},oe.default.createElement(ae.ToggablePanel.Header,null,e.icon&&oe.default.createElement("div",{className:"sitegeist-resource-reference-editor__group-icon"},oe.default.createElement(ae.Icon,{icon:e.icon})),W(a,e.label)),oe.default.createElement(ae.ToggablePanel.Contents,null,ve(e).map(i=>oe.default.createElement(Ro,{key:`${o?.contextPath??"new"}-${i.id}`,item:i,node:o,value:i.id==="_nodeType"?o?.nodeType:t[i.id],hooks:s[i.id]?.hooks,isChanged:!!s[i.id],onChange:n,renderSecondaryInspector:d,validationErrors:l[i.id]}))))};var Co=({inspected:e,isLoading:o,renderSecondaryInspector:t})=>{let{i18nRegistry:s,t:r}=_();return F.default.createElement("div",{className:"sitegeist-resource-reference-editor__inspector"},F.default.createElement("div",{className:"sitegeist-resource-reference-editor__inspector-body"},e.node?e.tabs.length===0?F.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},r("inspector.noConfiguration","This node type has no inspector configuration.")):F.default.createElement(ce.Tabs,{className:"sitegeist-resource-reference-editor__tabs"},e.tabs.map(n=>F.default.createElement(ce.Tabs.Panel,{key:n.id,id:n.id,icon:n.icon,tooltip:W(s,n.label)},n.groups.map(d=>F.default.createElement(ko,{key:d.id,group:d,node:e.node,values:e.values,draft:e.draft,isOpen:e.isPanelOpen(d.id,d.collapsed),onToggle:()=>e.togglePanel(d.id),onChange:e.change,renderSecondaryInspector:t,validationErrors:e.validationErrors}))))):F.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},r("inspector.empty","Select a resource to edit its properties."))),e.node&&F.default.createElement("div",{className:"sitegeist-resource-reference-editor__inspector-footer"},F.default.createElement(ce.Button,{type:"button",style:"lighter",disabled:o||!e.hasChanges,onClick:e.discard},r("action.discard","Discard")),F.default.createElement(ce.Button,{type:"button",style:"success",disabled:o||!e.hasChanges,onClick:e.save},r("action.apply","Apply"))))};var be=u(N());var k=u(N()),z=u(j());var No=({resource:e,isActive:o,isReferenced:t,isSelecting:s,isSelected:r,onOpen:c,onToggleSelection:n,onToggleReference:d})=>{let{nodeTypesRegistry:l,i18nRegistry:a,t:i}=_(),y=l.getNodeType(e.nodeType),g=s?n:c,R=k.default.useRef(null);return k.default.useEffect(()=>{o&&R.current?.scrollIntoView({block:"nearest"})},[o]),k.default.createElement("div",{ref:R,role:"button",tabIndex:0,className:["sitegeist-resource-reference-editor__item",o&&!s?"sitegeist-resource-reference-editor__item--active":"",s&&r?"sitegeist-resource-reference-editor__item--selected":"",ee(e)?"sitegeist-resource-reference-editor__item--hidden":""].join(" "),onClick:g,onKeyDown:p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),g())}},s&&k.default.createElement("span",{className:"sitegeist-resource-reference-editor__item-select"},k.default.createElement(z.CheckBox,{isChecked:r,onChange:n})),k.default.createElement(z.Icon,{icon:y?.ui?.icon??"file"}),k.default.createElement("div",{className:"sitegeist-resource-reference-editor__item-label"},k.default.createElement("strong",{className:e.label?"":"sitegeist-resource-reference-editor__item-unnamed"},e.label||W(a,y?.ui?.label)||e.identifier),k.default.createElement("small",null,W(a,y?.ui?.label)||e.nodeType)),k.default.createElement("span",{className:"sitegeist-resource-reference-editor__item-actions"+(s?" sitegeist-resource-reference-editor__item-actions--inert":"")},ee(e)&&k.default.createElement("span",{className:"sitegeist-resource-reference-editor__hidden-badge",title:i("resource.hiddenTitle","This resource is hidden")},k.default.createElement(z.Icon,{icon:"eye-slash"})," ",i("resource.hidden","Hidden")),k.default.createElement("button",{type:"button",className:"sitegeist-resource-reference-editor__use"+(t?" sitegeist-resource-reference-editor__use--active":""),onClick:p=>{p.stopPropagation(),d()}},t?k.default.createElement(k.default.Fragment,null,k.default.createElement("span",{className:"sitegeist-resource-reference-editor__use-state"},k.default.createElement(z.Icon,{icon:"check"})," ",i("action.inUse","In use")),k.default.createElement("span",{className:"sitegeist-resource-reference-editor__use-action"},k.default.createElement(z.Icon,{icon:"times"})," ",i("action.remove","Remove"))):k.default.createElement(k.default.Fragment,null,k.default.createElement(z.Icon,{icon:"plus"})," ",i("action.use","Use")))))};var So=({resources:e,isLoading:o,activeContextPath:t,referencedIdentifiers:s,isSelecting:r,selection:c,onOpen:n,onToggleSelection:d,onToggleReference:l})=>{let{t:a}=_();return be.default.createElement("div",{className:"sitegeist-resource-reference-editor__list"},e.length===0&&be.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},o?a("list.loading","Loading\u2026"):a("list.empty","No resources found.")),e.map(i=>be.default.createElement(No,{key:i.contextPath,resource:i,isActive:t===i.contextPath,isReferenced:s.includes(i.identifier),isSelecting:r,isSelected:c.includes(i.contextPath),onOpen:()=>n(i),onToggleSelection:()=>d(i),onToggleReference:()=>l(i.identifier)})))};var $=u(N()),G=u(j());var Po=({filter:e,onFilter:o,isLoading:t,isSelecting:s,canSelect:r,createLabel:c,onCreate:n,onEnterSelection:d,onLeaveSelection:l})=>{let{t:a}=_();return $.default.createElement("div",{className:"sitegeist-resource-reference-editor__toolbar"},$.default.createElement("input",{className:"sitegeist-resource-reference-editor__search",type:"search",value:e,placeholder:a("list.search","Filter resources"),onChange:i=>o(i.currentTarget.value)}),$.default.createElement(G.Button,{type:"button",style:"lighter",disabled:t,onClick:n,title:c},$.default.createElement(G.Icon,{icon:"plus"})," ",a("action.new","New")),s?$.default.createElement(G.Button,{type:"button",style:"lighter",onClick:l},$.default.createElement(G.Icon,{icon:"check"})," ",a("action.done","Done")):$.default.createElement(G.Button,{type:"button",style:"lighter",disabled:t||!r,onClick:d},$.default.createElement(G.Icon,{icon:"list-check"})," ",a("action.selectMultiple","Select multiple")))};var Io=({isOpen:e,onClose:o,collection:t,inspected:s,selection:r,references:c,actions:n,createLabel:d,renderSecondaryInspector:l})=>{let{t:a}=_(),[i,y]=L.default.useState(""),g=i.trim().toLocaleLowerCase(),R=g===""?t.resources:t.resources.filter(w=>(w.label??"").toLocaleLowerCase().includes(g)),p=s.node?t.resources.find(w=>w.contextPath===s.node.contextPath)??null:null,f=r.isSelecting?r.selected:p?[p]:[];return L.default.createElement(_e.Dialog,{isOpen:e,title:"",style:"jumbo",onRequestClose:o,actions:[L.default.createElement(bo,{key:"actions",targets:f,visibleResources:R,selection:r.selection,isSelecting:r.isSelecting,isLoading:t.isLoading,isMultiple:c.isMultiple,selectionIsReferenced:r.selected.length>0&&r.selected.every(w=>c.referenced.includes(w.identifier)),onDuplicate:()=>n.duplicate(f),onSetHidden:w=>n.setHidden(f,w),onDelete:()=>n.requestRemoval(f),onSetSelection:r.setSelection,onUseSelection:()=>{c.addMany(r.selected.map(w=>w.identifier)),r.leave()},onUnuseSelection:()=>{c.drop(r.selected.map(w=>w.identifier)),r.leave()}}),L.default.createElement(_e.Button,{key:"close",type:"button",onClick:o},a("action.close","Close"))]},L.default.createElement("div",{className:"sitegeist-resource-reference-editor__layout"},L.default.createElement("div",{className:"sitegeist-resource-reference-editor__content"},t.error&&L.default.createElement("div",{className:"sitegeist-resource-reference-editor__state sitegeist-resource-reference-editor__error"},t.error),L.default.createElement(Po,{filter:i,onFilter:y,isLoading:t.isLoading,isSelecting:r.isSelecting,canSelect:R.length>0,createLabel:d,onCreate:n.create,onEnterSelection:()=>r.enter(p?[p.contextPath]:[]),onLeaveSelection:r.leave}),L.default.createElement(So,{resources:R,isLoading:t.isLoading,activeContextPath:s.node?.contextPath,referencedIdentifiers:c.referenced,isSelecting:r.isSelecting,selection:r.selection,onOpen:s.inspect,onToggleSelection:r.toggle,onToggleReference:c.toggle})),L.default.createElement(Co,{inspected:s,isLoading:t.isLoading,renderSecondaryInspector:l})))};var ye=u(N()),le=u(j());var Eo=({children:e,onClose:o})=>{let{t}=_();return ye.default.createElement(le.Dialog,{isOpen:!0,title:"",style:"jumbo",onRequestClose:o,actions:[ye.default.createElement(le.Button,{key:"close",type:"button",style:"lighter",onClick:o},ye.default.createElement(le.Icon,{icon:"times"})," ",t("action.close","Close"))]},ye.default.createElement("div",{className:"sitegeist-resource-reference-editor__secondary"},e))};var To=({ReferenceEditor:e,ReferencesEditor:o,...t})=>{let{i18nRegistry:s,nodeTypesRegistry:r,t:c}=_(),[n,d]=E.default.useState(!1),l=t.options.resourceCreation,a=mo(),i=fo(t.options,t.neos?.routes),y=ho(i.resources),g=no(t),R=ro(i,a.close),p=()=>d(!0),f=po(t,i,g,y,R,p),w=async()=>{p(),await i.run(()=>i.reload())},O=()=>{a.close(),d(!1)},B=m=>{if(!g.isMultiple)return m.closest('[class*="selectBoxHeader"]')&&g.referenced.length===1?g.referenced[0]:null;let h=m.closest('[class*="selectedOptions__innerPreview"]')?.closest("li"),T=h?.parentElement;return!h||!T?null:g.referenced[Array.prototype.indexOf.call(T.children,h)]??null},te=m=>{let h=m.target;if(!h||h.closest("input, button"))return;let T=B(h);T&&(m.preventDefault(),m.stopPropagation(),p(),i.run(async()=>{let{resources:x}=await i.reload(),v=x.find(I=>I.identifier===T);v&&await R.inspect(v)}))},{resourceCreation:K,...re}=t.options,b=t.options.nodeTypes??[l.type],C=b.length===1?W(s,r.getNodeType(b[0])?.ui?.label):"";return E.default.createElement(E.default.Fragment,null,E.default.createElement("style",null,yo),E.default.createElement("div",{className:"sitegeist-resource-reference-editor__reference",style:{"--sitegeist-resource-type":JSON.stringify(C)},onClickCapture:te},g.isMultiple&&o?E.default.createElement(o,{key:i.version,...t,options:re}):E.default.createElement(e,{key:i.version,...t,options:re})),E.default.createElement("div",{className:"sitegeist-resource-reference-editor__actions"},E.default.createElement(de.Button,{className:"sitegeist-resource-reference-editor__create",type:"button",style:"lighter",disabled:t.options.disabled||i.isLoading,onClick:f.create,title:l.buttonLabel??c("action.createNew","Create new"),"aria-label":l.buttonLabel??c("action.createNew","Create new")},E.default.createElement(de.Icon,{icon:"plus"})),E.default.createElement(de.Button,{type:"button",style:"lighter",disabled:t.options.disabled||i.isLoading,onClick:w},E.default.createElement(de.Icon,{icon:"list"})," ",c("action.showAll","Show all"))),E.default.createElement(Io,{isOpen:n,onClose:O,collection:i,inspected:R,selection:y,references:g,actions:f,createLabel:l.buttonLabel,renderSecondaryInspector:a.render}),f.pendingRemoval&&E.default.createElement(vo,{resources:f.pendingRemoval,usage:f.pendingRemovalUsage,onCancel:f.cancelRemoval,onHideInstead:m=>{f.cancelRemoval(),f.setHidden(m,!0)},onConfirm:f.remove}),a.secondaryInspector&&E.default.createElement(Eo,{onClose:a.close},a.secondaryInspector.element))};Oe("Sitegeist.ResourceReferenceEditor",{},(e,{store:o})=>{let t=e.get("inspector"),s=t?.get("editors"),r=t?.get("saveHooks"),c=e.get("validators"),n=s?.get("Neos.Neos/Inspector/Editors/ReferenceEditor"),d=s?.get("Neos.Neos/Inspector/Editors/ReferencesEditor"),l=e.get("@neos-project/neos-ui-contentrepository"),a=e.get("i18n");if(!s||!n?.component||!l){console.warn("[Sitegeist.ResourceReferenceEditor] Required Neos UI registries are missing.");return}e.get("sagas")?.set("Sitegeist.ResourceReferenceEditor/CreationDialog",{saga:He});let i={store:o,globalRegistry:e,nodeTypesRegistry:l,saveHooksRegistry:r,validatorsRegistry:c,i18nRegistry:a};s.set("Sitegeist.ResourceReferenceEditor/Inspector/Editors/ResourceReferenceEditor",{component:y=>Ee.default.createElement(qe,{registries:i},Ee.default.createElement(To,{...y,ReferenceEditor:n.component,ReferencesEditor:d?.component}))})});})();
//# sourceMappingURL=Plugin.js.map
