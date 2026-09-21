(()=>{var ho=Object.create;var ke=Object.defineProperty;var vo=Object.getOwnPropertyDescriptor;var Ro=Object.getOwnPropertyNames;var bo=Object.getPrototypeOf,xo=Object.prototype.hasOwnProperty;var No=(e,o)=>()=>(e&&(o=e(e=0)),o);var ge=(e,o)=>()=>(o||e((o={exports:{}}).exports,o),o.exports);var ko=(e,o,t,r)=>{if(o&&typeof o=="object"||typeof o=="function")for(let n of Ro(o))!xo.call(e,n)&&n!==t&&ke(e,n,{get:()=>o[n],enumerable:!(r=vo(o,n))||r.enumerable});return e};var p=(e,o,t)=>(t=e!=null?ho(bo(e)):{},ko(o||!e||!e.__esModule?ke(t,"default",{value:e,enumerable:!0}):t,e));function _(e){return(...o)=>{if(window["@Neos:HostPluginAPI"]&&window["@Neos:HostPluginAPI"][`@${e}`])return window["@Neos:HostPluginAPI"][`@${e}`](...o);throw new Error("You are trying to read from a consumer api that hasn't been initialized yet!")}}var V=No(()=>{});var x=ge((Do,we)=>{V();we.exports=_("vendor")().React});var j=ge((Ho,_e)=>{V();_e.exports=_("NeosProjectPackages")().ReactUiComponents});var X=ge((Go,De)=>{V();De.exports=_("NeosProjectPackages")().NeosUiReduxStore});var so=ge((Bt,no)=>{V();no.exports=_("NeosProjectPackages")().NeosUiEditors});var Ne=p(x());V();var wo=_("manifest"),Ce=wo,{SynchronousRegistry:Bo,SynchronousMetaRegistry:Uo}=_("NeosProjectPackages")().NeosUiRegistry;var I=p(x()),se=p(j());var ce=p(x());var Pe="Sitegeist.ResourceReferenceEditor",Se="Main",W=(e,o)=>o?e?.translate?e.translate(o):o:"",Co=(e,o,t,r)=>e?.translate?e.translate(`${Pe}:${Se}:${o}`,t,r,Pe,Se):t,Ie=e=>(o,t,r)=>Co(e,o,t,r);var Ee=ce.default.createContext(null),Te=({registries:e,children:o})=>{let t=ce.default.useMemo(()=>({...e,t:Ie(e.i18nRegistry)}),[e]);return ce.default.createElement(Ee.Provider,{value:t},o)},y=()=>{let e=ce.default.useContext(Ee);if(!e)throw new Error("[Sitegeist.ResourceReferenceEditor] The Neos UI registries are only available below RegistriesProvider.");return e};var z=p(x());V();var H=_("NeosProjectPackages")().NeosUiBackendConnectorDefault,{fetchWithErrorHandling:Wo}=_("NeosProjectPackages")().NeosUiBackendConnector;var ve=p(X());var de=p(X()),_o=["Neos.Neos.Ui:UpdateNodeInfo","Neos.Neos.Ui:UpdateNodePreviewUrl","Neos.Neos.Ui:UpdateWorkspaceInfo","Neos.Neos.Ui:Success","Neos.Neos.Ui:Info","Neos.Neos.Ui:Warning","Neos.Neos.Ui:Error"],Oe=(e,o)=>{if(typeof o!="string")return;let t=e.getState(),r=de.selectors.CR.Nodes.focusedNodePathSelector(t),n=t?.ui?.inspector?.valuesByNodePath?.[r]??{},a=Object.keys(n).filter(s=>n[s]!==void 0);a.length===1&&a[0]===o&&e.dispatch(de.actions.UI.Inspector.apply())},q=(e,o)=>{let t=(o?.feedbacks??[]).filter(r=>_o.includes(r?.type));t.length>0&&e.dispatch(de.actions.ServerFeedback.handleServerFeedback({feedbacks:t}))};var Be=e=>(e.nodeTypes??[e.resourceCreation.type]).map(o=>`[instanceof ${o}]`).join(","),fe=e=>(e.items??[]).filter(o=>o.type==="editor"&&o.editor&&o.hidden!==!0),Ue=(e,o)=>(e.getInspectorViewConfigurationFor(o)?.tabs??[]).map(r=>({...r,groups:(r.groups??[]).filter(n=>fe(n).length>0)})).filter(r=>r.groups.length>0),Po=e=>{switch(e){case"integer":case"float":return 0;case"boolean":return!1;case"array":return[];default:return""}},Ae=(e,o)=>{let t=o?.ui?.creationDialog?.elements??{},r={},n=[...e.unsupportedRequiredProperties??[]];if(!Array.isArray(e.requiredProperties))return{data:r,missing:["(stale editor configuration - flush the Neos caches)"]};for(let a of e.requiredProperties){if(!t[a.name]){n.push(a.name);continue}r[a.name]=Po(a.type)}return{data:r,missing:n}},Fe=(e,o)=>e?.properties?.[o]??e?.references?.[o],He=e=>e.flatMap(o=>o.groups.flatMap(t=>fe(t)));var So=async(e,o,t)=>{if(!o)return e;let r=e;for(let[n,a]of Object.entries(o)){let s=t?.get(n);if(!s)throw new Error(`There is no registered save hook function for identifier ${n}`);r=await s(r,a)}return r},je=async(e,o)=>{let t={};for(let[r,n]of Object.entries(e))t[r]=await So(n.value,n.hooks,o);return t};var Le=(e,o,t,r)=>{let n={};for(let a of e){let s=Fe(o,a.id)?.validation;if(!s)continue;let l=Object.keys(s).map(c=>{let i=r?.get(c);return i?i(t[a.id],s[c]):(console.warn(`[Sitegeist.ResourceReferenceEditor] Validator ${c} not found`),null)}).filter(Boolean);l.length>0&&(n[a.id]=l)}return n},$e=e=>{if(e instanceof Error)return e.message;if(typeof e=="string")return e;let o=e?.message??e?.error;if(typeof o=="string")return o;try{return JSON.stringify(e)}catch{return String(e)}};var Me=p(X()),Z=e=>{let o=e.getState(),t=o?.cr?.nodes?.documentNode;if(typeof t=="string")try{let r=JSON.parse(t)?.workspaceName;if(typeof r=="string")return r}catch{}return Me.selectors.CR.Workspaces.personalWorkspaceNameSelector(o)??null},ee=(e,o)=>{if(!o)return e;try{let t=JSON.parse(e);return t?.workspaceName===o?e:JSON.stringify({...t,workspaceName:o})}catch{return e}};var Ve=(e,o)=>{let{store:t,nodeTypesRegistry:r,saveHooksRegistry:n,validatorsRegistry:a}=y(),[s,l]=z.default.useState(null),[c,i]=z.default.useState([]),[d,g]=z.default.useState({}),[h,u]=z.default.useState({}),[N,b]=z.default.useState({}),[M,m]=z.default.useState({}),U=r.getNodeType(s?.nodeType),Y=He(c),v=Object.keys(h).length>0,k=()=>{u({}),g({}),b({}),o()},E=async f=>{k(),await e.run(async()=>{let[T]=await H.get().q([f.contextPath]).get(),A=T??f;t.dispatch(ve.actions.CR.Nodes.merge({[A.contextPath]:A})),l(A),i(Ue(r,A.nodeType)),g({...A.properties??{}})})};return{node:s,nodeType:U,tabs:c,values:d,draft:h,hasChanges:v,validationErrors:N,isPanelOpen:(f,T)=>!!M[f]==!!T,togglePanel:f=>m(T=>({...T,[f]:!T[f]})),inspect:E,forget:()=>{l(null),i([]),k()},change:(f,T,A)=>{let ie=s?.properties?.[f],ae=!A&&(ie===T||JSON.stringify(ie)===JSON.stringify(T));u(F=>{if(ae){let{[f]:yo,...he}=F;return he}return{...F,[f]:{value:T,hooks:A}}}),g(F=>({...F,[f]:T})),b(F=>{if(!F[f])return F;let{[f]:yo,...he}=F;return he})},save:async()=>{if(!s)return;let f=Le(Y,U,d,a);b(f),!(Object.keys(f).length>0)&&await e.run(async()=>{let T=await je(h,n),A=ee(s.contextPath,Z(t)),ie=Object.entries(T).map(([ae,F])=>({type:"Neos.Neos.Ui:Property",subject:A,payload:{propertyName:ae,value:F}}));if(ie.length>0){let ae=await H.get().endpoints.change(ie);q(t,ae),t.dispatch(ve.actions.UI.ContentCanvas.reload())}u({}),await e.reload(),await E(s)})},discard:()=>{u({}),b({}),g({...s?.properties??{}})}}};var We=p(x()),qe=e=>{let o=!!e.options.multiple,{value:t,commit:r}=e,n=We.default.useMemo(()=>Array.isArray(t)?t:t?[t]:[],[t]),a=i=>{if(!o){r(i);return}let d=Array.isArray(t)?t:[];d.includes(i)||r([...d,i])},s=i=>{if(!o){i.length>0&&r(i[0]);return}let d=Array.isArray(t)?t:[],g=i.filter(h=>!d.includes(h));g.length>0&&r([...d,...g])},l=i=>{let d=new Set(i);if(o||Array.isArray(t)){let g=Array.isArray(t)?t:[],h=g.filter(u=>!d.has(u));h.length!==g.length&&r(h);return}typeof t=="string"&&d.has(t)&&r("")};return{referenced:n,isMultiple:o,add:a,addMany:s,drop:l,toggle:i=>{if(n.includes(i)){l([i]);return}a(i)}}};var be=p(x());var Ye=p(X());var Re=p(X());var ze=e=>{let o=e?.core?.service?.nodes;return typeof o!="string"?"":o.replace(/\/neos\/service\/nodes\/?$/,"")},Ge=async(e,o,t)=>{let r=e.getState(),n=r?.cr?.nodes?.documentNode??Re.selectors.CR.Nodes.focusedNodePathSelector(r);if(typeof n!="string")throw new Error("The node of the current editing session could not be resolved.");let a=new URLSearchParams({node:n,collection:o.collection});o.buttonLabel&&a.append("title",o.buttonLabel);let s=await fetch(`${ze(t)}/neos/service/data-source/sitegeist-resource-collections?${a.toString()}`,{credentials:"include",headers:{Accept:"application/json"}}),l=await s.text();if(!s.ok)throw new Error(`The resource collection "${o.collection}" could not be resolved (HTTP ${s.status}). ${l.slice(0,500)}`);let c=null;try{c=JSON.parse(l)}catch{throw new Error(`The resource collection data source did not answer with JSON: ${l.slice(0,500)}`)}let i=c?.contextPath??c?.data?.contextPath;if(typeof i!="string")throw new Error(`The resource collection "${o.collection}" has no node address: ${l.slice(0,500)}`);return{contextPath:i}},Je=async(e,o,t)=>{if(t.length===0)return{};let r=e.getState(),n=r?.cr?.nodes?.documentNode??Re.selectors.CR.Nodes.focusedNodePathSelector(r);if(typeof n!="string")return{};let a=new URLSearchParams({node:n,nodes:t.join(",")}),s=await fetch(`${ze(o)}/neos/service/data-source/sitegeist-resource-usage?${a.toString()}`,{credentials:"include",headers:{Accept:"application/json"}});if(!s.ok)return{};try{let l=await s.json();return l?.data??l??{}}catch{return{}}},Ke=async(e,o)=>await H.get().q(o).find(Be(e)).get()??[];var Qe=(e,o,t,r,n,a)=>{let{store:s,nodeTypesRegistry:l,t:c}=y(),i=e.options.resourceCreation,[d,g]=be.default.useState(null),[h,u]=be.default.useState(null);return{create:async()=>{a(),o.setError(null);let{data:v,missing:k}=Ae(i,l.getNodeType(i.type));if(k.length>0){o.setError(c("error.creationBlocked","{type} cannot be created here: {properties} must be provided on creation. Give these properties a default value, make them nullable, or promote them to the creation dialog (showInCreationDialog).",{type:i.type,properties:k.join(", ")}));return}await o.run(async()=>{let E=o.container??(await o.reload()).container,D=await H.get().endpoints.change([{type:"Neos.Neos.Ui:CreateInto",subject:E.contextPath,payload:{nodeType:i.type,data:v}}]);q(s,D);let w=(D?.feedbacks??[]).find(f=>f?.type==="Neos.Neos.Ui:NodeCreated")?.payload;if(!w?.identifier)throw new Error(c("error.creationFailed","The resource could not be created."));t.add(w.identifier),Oe(s,e.identifier);let{resources:pe}=await o.reload(),Q=pe.find(f=>f.identifier===w.identifier);Q&&await n.inspect(Q)})},duplicate:async v=>{v.length!==0&&await o.run(async()=>{let k=Z(s),E=o.container??(await o.reload()).container,D=await H.get().endpoints.change(v.map(f=>({type:"Neos.Neos.Ui:CopyInto",subject:ee(f.contextPath,k),payload:{parentContextPath:E.contextPath}})));q(s,D);let w=(D?.feedbacks??[]).filter(f=>f?.type==="Neos.Neos.Ui:NodeCreated").map(f=>f?.payload?.identifier).filter(Boolean),{resources:pe}=await o.reload(),Q=pe.find(f=>f.identifier===w[w.length-1]);r.leave(),Q&&await n.inspect(Q)})},setHidden:async(v,k)=>{v.length!==0&&await o.run(async()=>{let E=Z(s),D=await H.get().endpoints.change(v.map(w=>({type:"Neos.Neos.Ui:Property",subject:ee(w.contextPath,E),payload:{propertyName:"_hidden",value:k}})));q(s,D),s.dispatch(Ye.actions.UI.ContentCanvas.reload()),await o.reload(),n.node&&v.some(w=>w.contextPath===n.node.contextPath)&&await n.inspect(n.node)})},requestRemoval:async v=>{if(v.length!==0){u(null),g(v);try{u(await Je(s,e.neos?.routes,v.map(k=>k.identifier)))}catch{u({})}}},remove:async v=>{g(null),await o.run(async()=>{let k=Z(s),E=await H.get().endpoints.change(v.map(w=>({type:"Neos.Neos.Ui:RemoveNode",subject:ee(w.contextPath,k),payload:{}})));q(s,E),t.drop(v.map(w=>w.identifier));let D=v.map(w=>w.contextPath);r.forget(D),r.selection.length>0&&v.length>=r.selection.length&&r.leave(),n.node&&D.includes(n.node.contextPath)&&n.forget(),await o.reload()})},cancelRemoval:()=>g(null),pendingRemoval:d,pendingRemovalUsage:h}};var G=p(x());var Xe=(e,o)=>{let{store:t}=y(),r=e.resourceCreation,[n,a]=G.default.useState(null),[s,l]=G.default.useState([]),[c,i]=G.default.useState(!1),[d,g]=G.default.useState(null),h=G.default.useCallback(async()=>{let N=await Ge(t,r,o),b=await Ke(e,N.contextPath);return a(N),l(b),{container:N,resources:b}},[r,e,o,t]),u=G.default.useCallback(async N=>{i(!0),g(null);try{return await N()}catch(b){g($e(b));return}finally{i(!1)}},[]);return{container:n,resources:s,isLoading:c,error:d,setError:g,reload:h,run:u}};var le=p(x()),Ze=()=>{let[e,o]=le.default.useState(null),t=le.default.useRef(null),r=le.default.useCallback(()=>{t.current=null,o(null)},[]),n=le.default.useCallback((a,s)=>{if(!a||!s||t.current===a){r();return}t.current=a,o({id:a,element:s()})},[r]);return{secondaryInspector:e,render:n,close:r}};var oe=p(x()),eo=e=>{let[o,t]=oe.default.useState(!1),[r,n]=oe.default.useState([]),a=oe.default.useCallback(()=>{t(!1),n([])},[]),s=oe.default.useCallback(c=>{n(i=>i.includes(c.contextPath)?i.filter(d=>d!==c.contextPath):[...i,c.contextPath])},[]),l=oe.default.useCallback(c=>{n(i=>i.filter(d=>!c.includes(d)))},[]);return{isSelecting:o,enter:()=>t(!0),leave:a,selection:r,selected:e.filter(c=>r.includes(c.contextPath)),toggle:s,setSelection:n,forget:l}};var oo=`
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
    .sitegeist-resource-reference-editor__layout {
        display: flex;
        align-items: stretch;
        height: 70vh;
    }
    .sitegeist-resource-reference-editor__content {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px;
        overflow: auto;
        background: var(--colors-ContrastDarkest, #141414);
    }
    .sitegeist-resource-reference-editor__search {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid var(--colors-ContrastDark, #3f3f3f);
        background: var(--colors-ContrastDarker, #222);
        color: var(--colors-ContrastBrightest, #fff);
        padding: 10px 12px;
        font: inherit;
    }
    .sitegeist-resource-reference-editor__list {
        display: flex;
        flex-direction: column;
        gap: 1px;
        background: var(--colors-ContrastDark, #3f3f3f);
    }
    .sitegeist-resource-reference-editor__item {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        min-height: 56px;
        padding: 10px 12px;
        border: 0;
        text-align: left;
        font: inherit;
        color: var(--colors-ContrastBrightest, #fff);
        background: var(--colors-ContrastDarker, #222);
        cursor: pointer;
    }
    .sitegeist-resource-reference-editor__item:hover {
        background: var(--colors-ContrastNeutral, #323232);
    }
    .sitegeist-resource-reference-editor__item--selected {
        background: var(--colors-ContrastNeutral, #323232);
        box-shadow: inset 3px 0 0 0 var(--colors-Success, #00a338);
    }
    .sitegeist-resource-reference-editor__item--active {
        background: var(--colors-ContrastNeutral, #323232);
        box-shadow: inset 2px 0 0 0 var(--colors-PrimaryBlue, #00adee);
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
    .sitegeist-resource-reference-editor__bulk {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 8px 12px;
        background: var(--colors-ContrastNeutral, #323232);
    }
    .sitegeist-resource-reference-editor__bulk-actions {
        display: flex;
        gap: 8px;
        flex-shrink: 0;
    }
    .sitegeist-resource-reference-editor__bulk-target {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
`;var P=p(x()),L=p(j());var J=e=>!!e?.tags?.disabled||!!e?.properties?._hidden;var to=({resources:e,usage:o,onCancel:t,onHideInstead:r,onConfirm:n})=>{let{nodeTypesRegistry:a,t:s}=y(),l=e.every(c=>!!a.getNodeType(c.nodeType)?.properties?._hidden)&&!e.every(J);return P.default.createElement(L.Dialog,{isOpen:!0,type:"warn",style:"narrow",title:e.length===1?s("removal.titleOne","Delete this resource?"):s("removal.title","Delete {count} resources?",{count:e.length}),onRequestClose:t,actions:[P.default.createElement(L.Button,{key:"cancel",type:"button",onClick:t},s("action.cancel","Cancel")),l?P.default.createElement(L.Button,{key:"hide",type:"button",style:"lighter",onClick:()=>r(e)},P.default.createElement(L.Icon,{icon:"eye-slash"})," ",s("action.hideInstead","Hide instead")):null,P.default.createElement(L.Button,{key:"delete",type:"button",style:"error",hoverStyle:"error",onClick:()=>n(e)},P.default.createElement(L.Icon,{icon:"trash"})," ",s("action.delete","Delete"))].filter(Boolean)},P.default.createElement("div",{className:"sitegeist-resource-reference-editor__confirmation"},P.default.createElement("ul",null,e.map(c=>{let i=o?.[c.identifier];return P.default.createElement("li",{key:c.contextPath},P.default.createElement("strong",null,c.label||c.identifier),o===null&&P.default.createElement("small",null,s("removal.checking","Checking references\u2026")),i&&i.count>0&&P.default.createElement("small",null,i.count===1?s("removal.referencedOnce","Referenced once"):s("removal.referenced","Referenced {count} times",{count:i.count}),i.documents.length>0?`: ${i.documents.join(", ")}`:""),o!==null&&!i?.count&&P.default.createElement("small",null,s("removal.notReferenced","Not referenced")))})),P.default.createElement("p",null,s("removal.explanation","Deleting removes the resource from the collection, and every document that references it loses that reference. Hiding it instead keeps those references intact."))))};var B=p(x()),ye=p(j());var R=p(x()),C=p(j());var ro=({targets:e,visibleResources:o,selection:t,isSelecting:r,isLoading:n,isMultiple:a,createLabel:s,onCreate:l,onDuplicate:c,onSetHidden:i,onDelete:d,onEnterSelection:g,onLeaveSelection:h,onSetSelection:u,onUseSelection:N,status:b})=>{let{nodeTypesRegistry:M,t:m}=y(),U=e.length>0,Y=U&&e.every(J),v=U&&e.every(E=>!!M.getNodeType(E.nodeType)?.properties?._hidden),k=t.length===o.length;return R.default.createElement("div",{className:"sitegeist-resource-reference-editor__bulk"},R.default.createElement("span",{className:"sitegeist-resource-reference-editor__bulk-target"},b),R.default.createElement("div",{className:"sitegeist-resource-reference-editor__bulk-actions"},R.default.createElement(C.Button,{type:"button",style:"lighter",disabled:n,onClick:l,title:s},R.default.createElement(C.Icon,{icon:"plus"})," ",m("action.new","New")),R.default.createElement(C.Button,{type:"button",style:"lighter",disabled:n||!U,onClick:c},R.default.createElement(C.Icon,{icon:"clone"})," ",m("action.duplicate","Duplicate")),R.default.createElement(C.Button,{type:"button",style:"lighter",disabled:n||!v,onClick:()=>i(!Y)},R.default.createElement(C.Icon,{icon:Y?"eye":"eye-slash"})," ",Y?m("action.show","Show"):m("action.hide","Hide")),R.default.createElement(C.Button,{type:"button",style:"error",hoverStyle:"error",disabled:n||!U,onClick:d},R.default.createElement(C.Icon,{icon:"trash"})," ",m("action.delete","Delete")),r?R.default.createElement(R.default.Fragment,null,R.default.createElement(C.Button,{type:"button",style:"lighter",disabled:n||o.length===0,onClick:()=>u(k?[]:o.map(E=>E.contextPath))},k?m("action.deselectAll","Deselect all"):m("action.selectAll","Select all")),a&&R.default.createElement(C.Button,{type:"button",style:"success",disabled:n||t.length===0,onClick:N},R.default.createElement(C.Icon,{icon:"check"})," ",m("action.use","Use")),R.default.createElement(C.Button,{type:"button",onClick:h},m("action.done","Done"))):R.default.createElement(C.Button,{type:"button",style:"lighter",disabled:n||o.length===0,onClick:g},R.default.createElement(C.Icon,{icon:"list-check"})," ",m("action.selectMultiple","Select multiple"))))};var O=p(x()),re=p(j());var K=p(x()),te=p(j());var xe=p(x()),io=p(so()),ao=({item:e,node:o,value:t,hooks:r,isChanged:n,onChange:a,renderSecondaryInspector:s,validationErrors:l})=>xe.default.createElement("div",{className:"sitegeist-resource-reference-editor__field"},xe.default.createElement(io.EditorEnvelope,{identifier:e.id,label:e.label??e.id,editor:e.editor,options:e.editorOptions,value:t,hooks:r??null,node:o,propertyName:e.id,commit:(c,i)=>a(e.id,c,i),renderSecondaryInspector:s,validationErrors:l,helpMessage:e.helpMessage,helpThumbnail:e.helpThumbnail,highlight:!!n}));var co=({group:e,node:o,values:t,draft:r,isOpen:n,onToggle:a,onChange:s,renderSecondaryInspector:l,validationErrors:c})=>{let{i18nRegistry:i}=y();return K.default.createElement(te.ToggablePanel,{isOpen:n,onPanelToggle:a},K.default.createElement(te.ToggablePanel.Header,null,e.icon&&K.default.createElement("div",{className:"sitegeist-resource-reference-editor__group-icon"},K.default.createElement(te.Icon,{icon:e.icon})),W(i,e.label)),K.default.createElement(te.ToggablePanel.Contents,null,fe(e).map(d=>K.default.createElement(ao,{key:`${o?.contextPath??"new"}-${d.id}`,item:d,node:o,value:d.id==="_nodeType"?o?.nodeType:t[d.id],hooks:r[d.id]?.hooks,isChanged:!!r[d.id],onChange:s,renderSecondaryInspector:l,validationErrors:c[d.id]}))))};var lo=({inspected:e,isLoading:o,renderSecondaryInspector:t})=>{let{i18nRegistry:r,t:n}=y();return O.default.createElement("div",{className:"sitegeist-resource-reference-editor__inspector"},O.default.createElement("div",{className:"sitegeist-resource-reference-editor__inspector-body"},e.node?e.tabs.length===0?O.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},n("inspector.noConfiguration","This node type has no inspector configuration.")):O.default.createElement(re.Tabs,{className:"sitegeist-resource-reference-editor__tabs"},e.tabs.map(s=>O.default.createElement(re.Tabs.Panel,{key:s.id,id:s.id,icon:s.icon,tooltip:W(r,s.label)},s.groups.map(l=>O.default.createElement(co,{key:l.id,group:l,node:e.node,values:e.values,draft:e.draft,isOpen:e.isPanelOpen(l.id,l.collapsed),onToggle:()=>e.togglePanel(l.id),onChange:e.change,renderSecondaryInspector:t,validationErrors:e.validationErrors}))))):O.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},n("inspector.empty","Select a resource to edit its properties."))),e.node&&O.default.createElement("div",{className:"sitegeist-resource-reference-editor__inspector-footer"},O.default.createElement(re.Button,{type:"button",style:"lighter",disabled:o||!e.hasChanges,onClick:e.discard},n("action.discard","Discard")),O.default.createElement(re.Button,{type:"button",style:"success",disabled:o||!e.hasChanges,onClick:e.save},n("action.apply","Apply"))))};var me=p(x());var S=p(x()),$=p(j());var uo=({resource:e,isActive:o,isReferenced:t,isSelecting:r,isSelected:n,onOpen:a,onToggleSelection:s,onToggleReference:l})=>{let{nodeTypesRegistry:c,i18nRegistry:i,t:d}=y(),g=c.getNodeType(e.nodeType),h=r?s:a;return S.default.createElement("div",{role:"button",tabIndex:0,className:["sitegeist-resource-reference-editor__item",o&&!r?"sitegeist-resource-reference-editor__item--active":"",r&&n?"sitegeist-resource-reference-editor__item--selected":"",J(e)?"sitegeist-resource-reference-editor__item--hidden":""].join(" "),onClick:h,onKeyDown:u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),h())}},r&&S.default.createElement("span",{className:"sitegeist-resource-reference-editor__item-select"},S.default.createElement($.CheckBox,{isChecked:n,onChange:s})),S.default.createElement($.Icon,{icon:g?.ui?.icon??"file"}),S.default.createElement("div",{className:"sitegeist-resource-reference-editor__item-label"},S.default.createElement("strong",null,e.label||W(i,g?.ui?.label)||e.identifier),S.default.createElement("small",null,W(i,g?.ui?.label)||e.nodeType)),!r&&S.default.createElement("span",{className:"sitegeist-resource-reference-editor__item-actions"},J(e)&&S.default.createElement("span",{className:"sitegeist-resource-reference-editor__hidden-badge",title:d("resource.hiddenTitle","This resource is hidden")},S.default.createElement($.Icon,{icon:"eye-slash"})," ",d("resource.hidden","Hidden")),S.default.createElement($.Button,{type:"button",style:t?"success":"lighter",title:t?d("resource.removeReference","Click to remove this reference"):void 0,onClick:u=>{u.stopPropagation(),l()}},t?S.default.createElement(S.default.Fragment,null,S.default.createElement($.Icon,{icon:"check"})," ",d("action.inUse","In use")):d("action.use","Use"))))};var po=({resources:e,isLoading:o,activeContextPath:t,referencedIdentifiers:r,isSelecting:n,selection:a,onOpen:s,onToggleSelection:l,onToggleReference:c})=>{let{t:i}=y();return me.default.createElement("div",{className:"sitegeist-resource-reference-editor__list"},e.length===0&&me.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},o?i("list.loading","Loading\u2026"):i("list.empty","No resources found.")),e.map(d=>me.default.createElement(uo,{key:d.contextPath,resource:d,isActive:t===d.contextPath,isReferenced:r.includes(d.identifier),isSelecting:n,isSelected:a.includes(d.contextPath),onOpen:()=>s(d),onToggleSelection:()=>l(d),onToggleReference:()=>c(d.identifier)})))};var go=({isOpen:e,onClose:o,collection:t,inspected:r,selection:n,references:a,actions:s,createLabel:l,renderSecondaryInspector:c})=>{let{t:i}=y(),[d,g]=B.default.useState(""),h=d.trim().toLocaleLowerCase(),u=h===""?t.resources:t.resources.filter(m=>(m.label??"").toLocaleLowerCase().includes(h)),N=r.node?t.resources.find(m=>m.contextPath===r.node.contextPath)??null:null,b=n.isSelecting?n.selected:N?[N]:[],M=()=>n.isSelecting?n.selection.length>0?i("selection.count","{count} selected",{count:n.selection.length}):i("selection.hint","Click the resources to select them"):N?N.label:u.length===1?i("list.countOne","1 resource"):i("list.count","{count} resources",{count:u.length});return B.default.createElement(ye.Dialog,{isOpen:e,title:i("dialog.title","Resources"),style:"jumbo",onRequestClose:o,actions:[B.default.createElement(ye.Button,{key:"close",type:"button",onClick:o},i("action.close","Close"))]},B.default.createElement("div",{className:"sitegeist-resource-reference-editor__layout"},B.default.createElement("div",{className:"sitegeist-resource-reference-editor__content"},t.error&&B.default.createElement("div",{className:"sitegeist-resource-reference-editor__state sitegeist-resource-reference-editor__error"},t.error),B.default.createElement("input",{className:"sitegeist-resource-reference-editor__search",type:"search",value:d,placeholder:i("list.search","Filter resources"),onChange:m=>g(m.currentTarget.value)}),B.default.createElement(ro,{targets:b,visibleResources:u,selection:n.selection,isSelecting:n.isSelecting,isLoading:t.isLoading,isMultiple:a.isMultiple,createLabel:l,status:M(),onCreate:s.create,onDuplicate:()=>s.duplicate(b),onSetHidden:m=>s.setHidden(b,m),onDelete:()=>s.requestRemoval(b),onEnterSelection:n.enter,onLeaveSelection:n.leave,onSetSelection:n.setSelection,onUseSelection:()=>{a.addMany(n.selected.map(m=>m.identifier)),n.leave()}}),B.default.createElement(po,{resources:u,isLoading:t.isLoading,activeContextPath:r.node?.contextPath,referencedIdentifiers:a.referenced,isSelecting:n.isSelecting,selection:n.selection,onOpen:r.inspect,onToggleSelection:n.toggle,onToggleReference:a.toggle})),B.default.createElement(lo,{inspected:r,isLoading:t.isLoading,renderSecondaryInspector:c})))};var ue=p(x()),ne=p(j());var fo=({children:e,onClose:o})=>{let{t}=y();return ue.default.createElement(ne.Dialog,{isOpen:!0,title:"",style:"jumbo",onRequestClose:o,actions:[ue.default.createElement(ne.Button,{key:"close",type:"button",style:"lighter",onClick:o},ue.default.createElement(ne.Icon,{icon:"times"})," ",t("action.close","Close"))]},ue.default.createElement("div",{className:"sitegeist-resource-reference-editor__secondary"},e))};var mo=({ReferenceEditor:e,ReferencesEditor:o,...t})=>{let{t:r}=y(),[n,a]=I.default.useState(!1),s=t.options.resourceCreation,l=Ze(),c=Xe(t.options,t.neos?.routes),i=eo(c.resources),d=qe(t),g=Ve(c,l.close),h=()=>a(!0),u=Qe(t,c,d,i,g,h),N=async()=>{h(),await c.run(()=>c.reload())},b=()=>{l.close(),a(!1)},{resourceCreation:M,...m}=t.options;return I.default.createElement(I.default.Fragment,null,I.default.createElement("style",null,oo),d.isMultiple&&o?I.default.createElement(o,{...t,options:m}):I.default.createElement(e,{...t,options:m}),I.default.createElement("div",{className:"sitegeist-resource-reference-editor__actions"},I.default.createElement(se.Button,{className:"sitegeist-resource-reference-editor__create",type:"button",style:"lighter",disabled:t.options.disabled||c.isLoading,onClick:u.create,title:s.buttonLabel??r("action.createNew","Create new"),"aria-label":s.buttonLabel??r("action.createNew","Create new")},I.default.createElement(se.Icon,{icon:"plus"})),I.default.createElement(se.Button,{type:"button",style:"lighter",disabled:t.options.disabled||c.isLoading,onClick:N},I.default.createElement(se.Icon,{icon:"list"})," ",r("action.showAll","Show all"))),I.default.createElement(go,{isOpen:n,onClose:b,collection:c,inspected:g,selection:i,references:d,actions:u,createLabel:s.buttonLabel,renderSecondaryInspector:l.render}),u.pendingRemoval&&I.default.createElement(to,{resources:u.pendingRemoval,usage:u.pendingRemovalUsage,onCancel:u.cancelRemoval,onHideInstead:U=>{u.cancelRemoval(),u.setHidden(U,!0)},onConfirm:u.remove}),l.secondaryInspector&&I.default.createElement(fo,{onClose:l.close},l.secondaryInspector.element))};Ce("Sitegeist.ResourceReferenceEditor",{},(e,{store:o})=>{let t=e.get("inspector"),r=t?.get("editors"),n=t?.get("saveHooks"),a=e.get("validators"),s=r?.get("Neos.Neos/Inspector/Editors/ReferenceEditor"),l=r?.get("Neos.Neos/Inspector/Editors/ReferencesEditor"),c=e.get("@neos-project/neos-ui-contentrepository"),i=e.get("i18n");if(!r||!s?.component||!c){console.warn("[Sitegeist.ResourceReferenceEditor] Required Neos UI registries are missing.");return}let d={store:o,nodeTypesRegistry:c,saveHooksRegistry:n,validatorsRegistry:a,i18nRegistry:i};r.set("Sitegeist.ResourceReferenceEditor/Inspector/Editors/ResourceReferenceEditor",{component:g=>Ne.default.createElement(Te,{registries:d},Ne.default.createElement(mo,{...g,ReferenceEditor:s.component,ReferencesEditor:l?.component}))})});})();
//# sourceMappingURL=Plugin.js.map
