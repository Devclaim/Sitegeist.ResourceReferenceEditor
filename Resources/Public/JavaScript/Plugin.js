(()=>{var zt=Object.create;var $e=Object.defineProperty;var Vt=Object.getOwnPropertyDescriptor;var qt=Object.getOwnPropertyNames;var Kt=Object.getPrototypeOf,Jt=Object.prototype.hasOwnProperty;var Yt=(e,t)=>()=>(e&&(t=e(e=0)),t);var ye=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Qt=(e,t,o,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of qt(t))!Jt.call(e,s)&&s!==o&&$e(e,s,{get:()=>t[s],enumerable:!(r=Vt(t,s))||r.enumerable});return e};var y=(e,t,o)=>(o=e!=null?zt(Kt(e)):{},Qt(t||!e||!e.__esModule?$e(o,"default",{value:e,enumerable:!0}):o,e));function F(e){return(...t)=>{if(window["@Neos:HostPluginAPI"]&&window["@Neos:HostPluginAPI"][`@${e}`])return window["@Neos:HostPluginAPI"][`@${e}`](...t);throw new Error("You are trying to read from a consumer api that hasn't been initialized yet!")}}var ee=Yt(()=>{});var B=ye((co,ze)=>{ee();ze.exports=F("vendor")().React});var re=ye((vo,qe)=>{ee();qe.exports=F("NeosProjectPackages")().NeosUiReduxStore});var Je=ye((xo,Ke)=>{ee();Ke.exports=F("vendor")().reduxSagaEffects});var J=ye((Co,Ze)=>{ee();Ze.exports=F("NeosProjectPackages")().ReactUiComponents});var Bt=ye((Sr,Ot)=>{ee();Ot.exports=F("NeosProjectPackages")().NeosUiEditors});var Ge=y(B());ee();var Xt=F("manifest"),Ve=Xt,{SynchronousRegistry:uo,SynchronousMetaRegistry:po}=F("NeosProjectPackages")().NeosUiRegistry;ee();var q=F("NeosProjectPackages")().NeosUiBackendConnectorDefault,{fetchWithErrorHandling:mo}=F("NeosProjectPackages")().NeosUiBackendConnector;var se=y(re()),Ee=y(Je()),De=null,Ye=e=>{let t=De;De=null,t&&e(t)},Qe=async(e,t,o,r)=>{let[s]=await q.get().q([r]).get();return s&&e.dispatch(se.actions.CR.Nodes.merge({[s.contextPath]:s})),new Promise(i=>{De={apply:n=>i(n),cancel:()=>i(null)},e.dispatch(se.actions.UI.NodeCreationDialog.open(t?.ui?.label??o,t?.ui?.creationDialog??{elements:{}},r,o))})};function*Xe(){yield(0,Ee.takeEvery)(se.actionTypes.UI.NodeCreationDialog.APPLY,e=>Ye(t=>t.apply(e?.payload??{}))),yield(0,Ee.takeEvery)([se.actionTypes.UI.NodeCreationDialog.CANCEL,se.actionTypes.UI.NodeCreationDialog.BACK],()=>Ye(e=>e.cancel()))}var $=y(B()),me=y(J());var ve=y(B());var et="Sitegeist.ResourceReferenceEditor",tt="Main",V=(e,t)=>t?e?.translate?e.translate(t):t:"",Zt=(e,t,o,r)=>e?.translate?e.translate(`${et}:${tt}:${t}`,o,r,et,tt):o,ot=e=>(t,o,r)=>Zt(e,t,o,r);var rt=ve.default.createContext(null),st=({registries:e,children:t})=>{let o=ve.default.useMemo(()=>({...e,t:ot(e.i18nRegistry)}),[e]);return ve.default.createElement(rt.Provider,{value:o},t)},k=()=>{let e=ve.default.useContext(rt);if(!e)throw new Error("[Sitegeist.ResourceReferenceEditor] The Neos UI registries are only available below RegistriesProvider.");return e};var Q=y(B());var Ue=y(re());var be=y(re()),eo=["Neos.Neos.Ui:UpdateNodeInfo","Neos.Neos.Ui:UpdateNodePreviewUrl","Neos.Neos.Ui:UpdateWorkspaceInfo","Neos.Neos.Ui:Success","Neos.Neos.Ui:Info","Neos.Neos.Ui:Warning","Neos.Neos.Ui:Error"],nt=(e,t)=>{if(typeof t!="string")return;let o=e.getState(),r=be.selectors.CR.Nodes.focusedNodePathSelector(o),s=o?.ui?.inspector?.valuesByNodePath?.[r]??{},i=Object.keys(s).filter(n=>s[n]!==void 0);i.length===1&&i[0]===t&&e.dispatch(be.actions.UI.Inspector.apply())},ne=(e,t)=>{let o=(t?.feedbacks??[]).filter(r=>eo.includes(r?.type));o.length>0&&e.dispatch(be.actions.ServerFeedback.handleServerFeedback({feedbacks:o}))},it=(e,t)=>(e?.feedbacks??[]).find(r=>r?.type==="Neos.Neos.Ui:UpdateNodeInfo")?.payload?.byContextPath?.[t]??null;var Oe=y(re()),xe=async e=>{let t=q.get().endpoints?.syncWorkspace;if(!t)return;let o=e.getState(),r=Oe.selectors.CR.Workspaces.personalWorkspaceNameSelector(o);if(typeof r!="string"||r==="")return;let s=await t(r,!1,Oe.selectors.CR.ContentDimensions.active(o));if(s&&typeof s=="object"&&"conflicts"in s)throw new Error("Your workspace could not be brought up to date with the live workspace, because some of your changes conflict with it. Resolve the conflicts from the workspace dialog, then try again.");if(s&&typeof s=="object"&&"error"in s)throw new Error(s.error?.message??"Your workspace could not be brought up to date with the live workspace.")};var to="Sitegeist.ResourceReferenceEditor:Resource",ke=(e,t,o)=>o.some(r=>e.isOfType?.(t,r)??t===r),oo=(e,t)=>!!e.isOfType?.(t,to),at=(e,t,o)=>(e.getAllowedChildNodeTypes?.(o)??[]).map(r=>({name:r,nodeType:e.getNodeType(r)})).filter(({name:r,nodeType:s})=>!!s&&s.abstract!==!0&&oo(e,r)).map(({name:r,nodeType:s})=>({nodeTypeName:r,label:V(t,s?.ui?.label)||r,icon:s?.ui?.icon})).sort((r,s)=>r.label.localeCompare(s.label)),Ne=e=>(e.items??[]).filter(t=>t.type==="editor"&&t.editor&&t.hidden!==!0),ct=(e,t)=>(e.getInspectorViewConfigurationFor(t)?.tabs??[]).map(r=>({...r,groups:(r.groups??[]).filter(s=>Ne(s).length>0)})).filter(r=>r.groups.length>0),lt=e=>{switch(e){case"integer":case"float":return 0;case"boolean":return!1;case"array":return[];default:return""}},dt=e=>Object.entries(e?.ui?.creationDialog?.elements??{}).filter(([,t])=>t?.ui?.editor&&t?.ui?.hidden!==!0).map(([t,o])=>({type:"editor",id:t,dataType:o.type,label:o.ui?.label??t,editor:o.ui.editor,editorOptions:o.ui.editorOptions,helpMessage:o.ui?.help,defaultValue:o.defaultValue,validation:o.validation})),ut=(e,t)=>{if(!Array.isArray(e.requiredProperties))return["(stale editor configuration - flush the Neos caches)"];let o=new Set(t.map(r=>r.id));return[...e.unsupportedRequiredProperties??[],...e.requiredProperties.filter(r=>!o.has(r.name)).map(r=>r.name)]},pt=(e,t)=>e?.properties?.[t]??e?.references?.[t],ft=e=>e.flatMap(t=>t.groups.flatMap(o=>Ne(o)));var Be=async(e,t,o)=>{if(!t)return e;let r=e;for(let[s,i]of Object.entries(t)){let n=o?.get(s);if(!n)throw new Error(`There is no registered save hook function for identifier ${s}`);r=await n(r,i)}return r},gt=async(e,t)=>{let o={};for(let[r,s]of Object.entries(e))o[r]=await Be(s.value,s.hooks,t);return o};var mt=(e,t,o,r)=>{let s={};for(let i of e){let n=pt(t,i.id)?.validation;if(!n)continue;let l=Object.keys(n).map(a=>{let c=r?.get(a);return c?c(o[i.id],n[a]):(console.warn(`[Sitegeist.ResourceReferenceEditor] Validator ${a} not found`),null)}).filter(Boolean);l.length>0&&(s[i.id]=l)}return s},Pe=e=>{if(e instanceof Error)return e.message;if(typeof e=="string")return e;let t=e?.message??e?.error;if(typeof t=="string")return t;try{return JSON.stringify(e)}catch{return String(e)}};var le="live",de=(e,t)=>{if(!t)return e;try{let o=JSON.parse(e);return o?.workspaceName===t?e:JSON.stringify({...o,workspaceName:t})}catch{return e}};var ht=(e,t)=>{let{store:o,nodeTypesRegistry:r,saveHooksRegistry:s,validatorsRegistry:i}=k(),[n,l]=Q.default.useState(null),[a,c]=Q.default.useState([]),[d,p]=Q.default.useState({}),[f,u]=Q.default.useState({}),[C,x]=Q.default.useState({}),[N,_]=Q.default.useState({}),w=r.getNodeType(n?.nodeType),z=ft(a),U=Object.keys(f).length>0,A=()=>{u({}),p({}),x({}),t()},T=Q.default.useRef(null),g=Q.default.useRef(f);g.current=f;let R=(h,P)=>{o.dispatch(Ue.actions.CR.Nodes.merge({[h.contextPath]:h}));let S=P?Object.fromEntries(Object.entries(g.current).map(([m,H])=>[m,H.value])):{};l(h),c(ct(r,h.nodeType)),p({...h.properties??{},...S})},v=async(h,P)=>{if(!P?.force&&T.current===h.contextPath)return;T.current=h.contextPath,A(),e.setError(null);let S=P?.force?null:o.getState()?.cr?.nodes?.byContextPath?.[h.contextPath];S&&R(S,!1);try{let[m]=await q.get().q([h.contextPath]).get();if(T.current!==h.contextPath)return;let H=m??S??h;if(S&&JSON.stringify(H)===JSON.stringify(S))return;R(H,!!S)}catch(m){if(T.current!==h.contextPath)return;S||(T.current=null),e.setError(Pe(m))}};return{node:n,nodeType:w,tabs:a,values:d,draft:f,hasChanges:U,validationErrors:C,isPanelOpen:(h,P)=>!!N[h]==!!P,togglePanel:h=>_(P=>({...P,[h]:!P[h]})),inspect:v,forget:()=>{T.current=null,l(null),c([]),A()},change:(h,P,S)=>{let m=n?.properties?.[h],H=!S&&(m===P||JSON.stringify(m)===JSON.stringify(P));u(M=>{if(H){let{[h]:Ie,...he}=M;return he}return{...M,[h]:{value:P,hooks:S}}}),p(M=>({...M,[h]:P})),x(M=>{if(!M[h])return M;let{[h]:Ie,...he}=M;return he})},patchProperty:(h,P)=>{l(S=>S&&{...S,properties:{...S.properties,[h]:P}}),p(S=>({...S,[h]:P}))},save:async()=>{if(!n)return;let h=mt(z,w,d,i);x(h),!(Object.keys(h).length>0)&&(t(),await e.run(async()=>{let P=await gt(f,s),S=de(n.contextPath,le),m=Object.entries(P).map(([Ie,he])=>({type:"Neos.Neos.Ui:Property",subject:S,payload:{propertyName:Ie,value:he}}));if(m.length===0){u({});return}let H=await q.get().endpoints.change(m);ne(o,H),u({});let M=it(H,S);M&&(e.patch(S,{label:M.label,properties:M.properties,tags:M.tags}),R(M,!1)),await xe(o),e.touch(),o.dispatch(Ue.actions.UI.ContentCanvas.reload()),!M&&(await e.reload(),await v(n,{force:!0}))},"save"))},discard:()=>{t(),u({}),x({}),p({...n?.properties??{}})}}};var yt=y(B()),vt=e=>{let t=!!e.options.multiple,{value:o,commit:r}=e,s=yt.default.useMemo(()=>Array.isArray(o)?o:o?[o]:[],[o]),i=c=>{if(!t){r(c);return}let d=Array.isArray(o)?o:[];d.includes(c)||r([...d,c])},n=c=>{if(!t){c.length>0&&r(c[0]);return}let d=Array.isArray(o)?o:[],p=c.filter(f=>!d.includes(f));p.length>0&&r([...d,...p])},l=c=>{let d=new Set(c);if(t||Array.isArray(o)){let p=Array.isArray(o)?o:[],f=p.filter(u=>!d.has(u));f.length!==p.length&&r(f);return}typeof o=="string"&&d.has(o)&&r("")};return{referenced:s,isMultiple:t,add:i,addMany:n,drop:l,toggle:c=>{if(s.includes(c)){l([c]);return}i(c)}}};var Fe=y(B());var wt=y(re());var Se=y(re()),Ae=e=>{let t=e?.core?.service?.nodes;return typeof t!="string"?"":t.replace(/\/neos\/service\/nodes\/?$/,"")},bt=async(e,t,o)=>{let r=e.getState(),s=r?.cr?.nodes?.documentNode??Se.selectors.CR.Nodes.focusedNodePathSelector(r);if(typeof s!="string")throw new Error("The node of the current editing session could not be resolved.");let i=new URLSearchParams({node:s,collection:t.collection});t.buttonLabel&&i.append("title",t.buttonLabel);let n=await fetch(`${Ae(o)}/neos/service/data-source/sitegeist-resource-collections?${i.toString()}`,{credentials:"include",headers:{Accept:"application/json"}}),l=await n.text();if(!n.ok)throw new Error(`The resource collection "${t.collection}" could not be resolved (HTTP ${n.status}). ${l.slice(0,500)}`);let a=null;try{a=JSON.parse(l)}catch{throw new Error(`The resource collection data source did not answer with JSON: ${l.slice(0,500)}`)}let c=a?.contextPath??a?.data?.contextPath;if(typeof c!="string")throw new Error(`The resource collection "${t.collection}" has no node address: ${l.slice(0,500)}`);return{contextPath:c}},xt=async(e,t,o)=>{if(o.length===0)return{};let r=e.getState(),s=r?.cr?.nodes?.documentNode??Se.selectors.CR.Nodes.focusedNodePathSelector(r);if(typeof s!="string")return{};let i=new URLSearchParams({node:s,nodes:o.join(",")}),n=await fetch(`${Ae(t)}/neos/service/data-source/sitegeist-resource-usage?${i.toString()}`,{credentials:"include",headers:{Accept:"application/json"}});if(!n.ok)return{};try{let l=await n.json();return l?.data??l??{}}catch{return{}}},_t=async(e,t,o,r)=>Le(e,t,r,{nodeTypes:o.nodeTypes??[o.resourceCreation.type]}),Le=async(e,t,o,r={})=>{let s=e.getState(),i=s?.cr?.nodes?.documentNode??Se.selectors.CR.Nodes.focusedNodePathSelector(s);if(typeof i!="string")return[];let n=new URLSearchParams({node:i,parent:o});r.nodeTypes?.length&&n.append("nodeTypes",r.nodeTypes.join(","));let l=await fetch(`${Ae(t)}/neos/service/data-source/sitegeist-resource-children?${n.toString()}`,{credentials:"include",headers:{Accept:"application/json"}}),a=await l.text();if(!l.ok)throw new Error(`The children of the resource could not be read (HTTP ${l.status}). `+a.slice(0,500));let c=JSON.parse(a);return c?.data??c??[]};var Rt=(e,t,o,r,s,i,n)=>{let{store:l,nodeTypesRegistry:a,saveHooksRegistry:c,t:d}=k(),p=e.options.resourceCreation,[f,u]=Fe.default.useState(null),[C,x]=Fe.default.useState(null),N=async g=>{i(),t.setError(null);let R=g?.nodeTypeName??p.type,v=a.getNodeType(R),b=dt(v);if(!g){let I=ut(p,b);if(I.length>0){t.setError(d("error.creationBlocked","{type} cannot be created here: {properties} must be provided on creation. Give these properties a default value, make them nullable, or promote them to the creation dialog (showInCreationDialog).",{type:R,properties:I.join(", ")}));return}}let D=g?.parentContextPath??(t.container??(await t.reload()).container).contextPath;if(b.length===0){await _({},R,D,!g);return}let O=await Qe(l,v,R,D);O!==null&&await _(O,R,D,!g)},_=async(g,R,v,b)=>{let D={};for(let[O,I]of Object.entries(g))D[O]=await Be(I.value,I.hooks,c);if(b)for(let O of p.requiredProperties??[])(D[O.name]===void 0||D[O.name]===null)&&(D[O.name]=lt(O.type));await t.run(async()=>{let O=await q.get().endpoints.change([{type:"Neos.Neos.Ui:CreateInto",subject:v,payload:{nodeType:R,data:D}}]);ne(l,O);let I=(O?.feedbacks??[]).find(H=>H?.type==="Neos.Neos.Ui:NodeCreated")?.payload;if(!I?.identifier)throw new Error(d("error.creationFailed","The resource could not be created."));b&&(await xe(l),o.add(I.identifier),nt(l,e.identifier)),t.touch();let[{resources:h},P]=await Promise.all([t.reload(),b?Promise.resolve(null):n(v)]),m=(P??h).find(H=>H.identifier===I.identifier);m&&await s.inspect(m)},"create")};return{create:N,duplicate:async g=>{g.length!==0&&await t.run(async()=>{let R=t.container??(await t.reload()).container,v=await q.get().endpoints.change(g.map(I=>({type:"Neos.Neos.Ui:CopyInto",subject:de(I.contextPath,le),payload:{parentContextPath:R.contextPath}})));ne(l,v);let b=(v?.feedbacks??[]).filter(I=>I?.type==="Neos.Neos.Ui:NodeCreated").map(I=>I?.payload?.identifier).filter(Boolean);t.touch();let{resources:D}=await t.reload(),O=D.find(I=>I.identifier===b[b.length-1]);r.leave(),O&&await s.inspect(O)},"duplicate")},setHidden:async(g,R)=>{g.length!==0&&await t.run(async()=>{let v=await q.get().endpoints.change(g.map(b=>({type:"Neos.Neos.Ui:Property",subject:de(b.contextPath,le),payload:{propertyName:"_hidden",value:R}})));ne(l,v),g.forEach(b=>t.patch(b.contextPath,{hidden:R})),s.node&&g.some(b=>b.contextPath===s.node.contextPath)&&s.patchProperty("_hidden",R),await xe(l),t.touch(),l.dispatch(wt.actions.UI.ContentCanvas.reload())},"hide")},requestRemoval:async g=>{if(g.length!==0){x(null),u(g);try{x(await xt(l,e.neos?.routes,g.map(R=>R.identifier)))}catch{x({})}}},remove:async g=>{u(null),await t.run(async()=>{let R=await q.get().endpoints.change(g.map(b=>({type:"Neos.Neos.Ui:RemoveNode",subject:de(b.contextPath,le),payload:{}})));ne(l,R),t.touch(),o.drop(g.map(b=>b.identifier));let v=g.map(b=>b.contextPath);r.forget(v),r.selection.length>0&&g.length>=r.selection.length&&r.leave(),s.node&&v.includes(s.node.contextPath)&&s.forget(),await t.reload()},"delete")},cancelRemoval:()=>u(null),pendingRemoval:f,pendingRemovalUsage:C}};var K=y(B());var Ct=e=>{let t=e?.get?.("dataLoaders")?.get?.("NodeLookup");t&&(t._lruCache=null)};var kt=(e,t,o)=>e.map(r=>r.contextPath===t?{...r,...o}:r.children?{...r,children:kt(r.children,t,o)}:r),Nt=(e,t)=>{let{store:o,globalRegistry:r}=k(),s=e.resourceCreation,[i,n]=K.default.useState(null),[l,a]=K.default.useState([]),[c,d]=K.default.useState(!1),[p,f]=K.default.useState(null),[u,C]=K.default.useState(null),[x,N]=K.default.useState(0),_=K.default.useRef(null),w=K.default.useCallback(async()=>{let U=`${o.getState()?.cr?.nodes?.documentNode??""}|${s.collection}`,A=_.current?.key===U?_.current.container:await bt(o,s,t);_.current={key:U,container:A};let T=await _t(o,t,e,A.contextPath);return n(A),a(T),{container:A,resources:T}},[s,e,t,o]),z=K.default.useCallback(async(U,A)=>{d(!0),f(A??null),C(null);try{return await U()}catch(T){C(Pe(T));return}finally{d(!1),f(null)}},[]);return{container:i,resources:l,isLoading:c,activity:p,error:u,setError:C,reload:w,run:z,version:x,touch:K.default.useCallback(()=>{Ct(r),N(U=>U+1)},[r]),patch:K.default.useCallback((U,A)=>a(T=>kt(T,U,A)),[])}};var _e=y(B());var Pt=(e,t)=>{let{store:o}=k(),[r,s]=_e.default.useState({}),i=_e.default.useRef(new Set),n=_e.default.useCallback(async f=>{let u=await Le(o,t,f);return s(C=>({...C,[f]:u})),u},[t,o]),l=f=>r[f.contextPath]??f.children,a=[],c=(f,u,C)=>f.flatMap(x=>{let N={resource:x,depth:u,ancestors:C},_=l(x);return _?_.length>0?[N,...c(_,u+1,[...C,x])]:[N]:(x.childCount&&a.push(x.contextPath),[N])}),d=c(e.resources,0,[]),p=a.join("|");return _e.default.useEffect(()=>{let f=a.filter(u=>!i.current.has(u));f.length!==0&&(f.forEach(u=>i.current.add(u)),e.run(async()=>{for(let u of f)await n(u)}))},[p,n]),{rows:d,reveal:async f=>(i.current.add(f),n(f))}};var we=y(B()),St=()=>{let[e,t]=we.default.useState(null),o=we.default.useRef(null),r=we.default.useCallback(()=>{o.current=null,t(null)},[]),s=we.default.useCallback((i,n)=>{if(!i||!n||o.current===i){r();return}o.current=i,t({id:i,element:n()})},[r]);return{secondaryInspector:e,render:s,close:r}};var ue=y(B()),Tt=e=>{let[t,o]=ue.default.useState(!1),[r,s]=ue.default.useState([]),i=ue.default.useCallback(()=>{o(!1),s([])},[]),n=ue.default.useCallback(a=>{s(c=>c.includes(a.contextPath)?c.filter(d=>d!==a.contextPath):[...c,a.contextPath])},[]),l=ue.default.useCallback(a=>{s(c=>c.filter(d=>!a.includes(d)))},[]);return{isSelecting:t,enter:(a=[])=>{s(a),o(!0)},leave:i,selection:r,selected:e.filter(a=>r.includes(a.contextPath)),toggle:n,pick:(a,c=[])=>{if(t){n(a);return}s([...c.filter(d=>d!==a.contextPath),a.contextPath]),o(!0)},setSelection:s,forget:l}};var It=`
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
        position: relative;
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
    /*
     * The filter looks and behaves like Neos' own TextInput: no border, the neutral
     * fill, and on focus no outline or glow - it turns white with dark text, the
     * way every field in the inspector does.
     */
    .sitegeist-resource-reference-editor__search {
        flex: 1;
        min-width: 0;
        box-sizing: border-box;
        height: var(--spacing-GoldenUnit, 40px);
        margin: 0;
        padding: 0 14px;
        border: 0;
        border-radius: 2px;
        background: var(--colors-ContrastNeutral, #323232);
        color: var(--colors-ContrastBrightest, #fff);
        font-family: 'Noto Sans', sans-serif;
        font-size: 14px;
        appearance: none;
    }
    .sitegeist-resource-reference-editor__search:focus {
        outline: 0;
        box-shadow: none;
        background: var(--colors-ContrastBrightest, #fff);
        color: var(--colors-ContrastDarkest, #141414);
    }
    .sitegeist-resource-reference-editor__search::placeholder {
        color: var(--colors-ContrastBright, #999);
    }
    .sitegeist-resource-reference-editor__search::-webkit-search-cancel-button {
        display: none;
    }
    .sitegeist-resource-reference-editor__list {
        flex: 1;
        min-height: 0;
        overflow: auto;
        display: flex;
        flex-direction: column;
    }
    .sitegeist-resource-reference-editor__item {
        position: relative;
        display: flex;
        align-items: center;
        gap: 12px;
        min-height: 56px;
        padding: 10px 12px;
        gap: 10px;
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
    /* A child is the same row as any other, stepped in and standing on slightly
       darker ground - the step and the ground are what say it belongs to the row
       above it. */
    .sitegeist-resource-reference-editor__item--child {
        background: #1c1c1c;
        background: color-mix(in srgb, #000 22%, var(--colors-ContrastDarker, #222));
    }
    /*
     * The line from a node down along its children. It covers the row's border as
     * well, so the lines of consecutive children join up; on the last child it stops
     * a little short of the bottom, so it reads as ending with that child.
     */
    .sitegeist-resource-reference-editor__guide {
        position: absolute;
        top: 0;
        bottom: -1px;
        width: 1px;
        margin-left: -0.5px;
        background: var(--colors-ContrastDark, #3f3f3f);
        pointer-events: none;
    }
    .sitegeist-resource-reference-editor__guide--end {
        bottom: 10%;
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
     * The New button carries a menu as soon as there is more than one thing to
     * create - the resource types of the collection, and the children the resource
     * that is open allows.
     */
    .sitegeist-resource-reference-editor__create-menu {
        position: relative;
        flex-shrink: 0;
    }
    .sitegeist-resource-reference-editor__create-options {
        position: absolute;
        top: calc(100% + 4px);
        right: 0;
        z-index: 3;
        min-width: 220px;
        display: flex;
        flex-direction: column;
        padding: 4px 0;
        border: 1px solid var(--colors-ContrastDark, #3f3f3f);
        background: var(--colors-ContrastDarker, #222);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
    }
    .sitegeist-resource-reference-editor__create-section:first-child {
        margin-top: 0;
        padding-top: 4px;
        border-top: 0;
    }
    .sitegeist-resource-reference-editor__create-section {
        padding: 8px 12px 4px;
        margin-top: 4px;
        border-top: 1px solid var(--colors-ContrastDark, #3f3f3f);
        color: var(--colors-ContrastBright, #999);
        font-size: 12px;
    }
    .sitegeist-resource-reference-editor__create-option {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border: 0;
        background: none;
        font: inherit;
        color: var(--colors-ContrastBrightest, #fff);
        text-align: left;
        cursor: pointer;
    }
    .sitegeist-resource-reference-editor__create-option:hover {
        background: var(--colors-ContrastNeutral, #323232);
    }
    /*
     * The dialog's close button, in the top right corner over the inspector. It is
     * exactly as high as the tab row next to it - a tab is a 1px top border and a
     * GoldenUnit high button, the row adds a 1px bottom border - and as wide, so it
     * stays square; its bottom border continues the row's.
     */
    .sitegeist-resource-reference-editor__close {
        --sitegeist-resource-tab-row: calc(var(--spacing-GoldenUnit, 40px) + 2px);
        position: absolute;
        top: 0;
        right: 0;
        z-index: 4;
        box-sizing: border-box;
        width: var(--sitegeist-resource-tab-row);
        height: var(--sitegeist-resource-tab-row);
        padding: 0;
        border: 0;
        border-left: 1px solid var(--colors-ContrastDark, #3f3f3f);
        border-bottom: 1px solid var(--colors-ContrastDark, #3f3f3f);
        background: var(--colors-ContrastDarkest, #141414);
        color: var(--colors-ContrastBrightest, #fff);
        font-size: 16px;
        cursor: pointer;
    }
    .sitegeist-resource-reference-editor__close:hover {
        background: var(--colors-PrimaryBlue, #00adee);
    }
    .sitegeist-resource-reference-editor__footer {
        flex-shrink: 0;
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
    /* As rightSideBar__section and propertyGroupLabel in the regular inspector. */
    .sitegeist-resource-reference-editor__group {
        border-bottom: 1px solid var(--colors-ContrastDark, #3f3f3f);
    }
    .sitegeist-resource-reference-editor__group-label {
        width: 100%;
        overflow-x: hidden;
        text-overflow: ellipsis;
        padding: 0 var(--spacing-GoldenUnit, 40px) 0 var(--spacing-Full, 16px);
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
     * Secondary editors (media browser, image cropper, link editor) cover the list
     * and leave the inspector next to them free, the way the regular secondary
     * inspector covers the content canvas. The box is positioned and sized, because
     * the media browser is an absolutely positioned, full size iframe - and it is
     * the only thing that scrolls, so there is one scrollbar, not one per layer.
     */
    .sitegeist-resource-reference-editor__secondary {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: var(--size-SidebarWidth, 320px);
        z-index: 2;
        overflow: auto;
        background: var(--colors-ContrastDarker, #222);
        border-right: 1px solid var(--colors-ContrastDark, #3f3f3f);
    }
    /* As the close button of the regular secondary inspector. */
    .sitegeist-resource-reference-editor__secondary-close {
        position: sticky;
        top: 0;
        float: right;
        z-index: 3;
        width: 40px;
        height: 40px;
        margin-bottom: -40px;
        padding: 0;
        border: 0;
        border-left: 1px solid var(--colors-ContrastDark, #3f3f3f);
        border-bottom: 1px solid var(--colors-ContrastDark, #3f3f3f);
        background: var(--colors-ContrastDark, #3f3f3f);
        color: var(--colors-ContrastBrightest, #fff);
        font-size: 18px;
        cursor: pointer;
    }
    .sitegeist-resource-reference-editor__secondary-close:hover {
        background: var(--colors-PrimaryBlue, #00adee);
    }
    .sitegeist-resource-reference-editor__state {
        padding: 24px;
        text-align: center;
        color: var(--colors-ContrastBright, #999);
    }
    .sitegeist-resource-reference-editor__error {
        color: var(--colors-Error, #ff460d);
    }
    /* The icon of the button whose action is running. */
    .sitegeist-resource-reference-editor__spinner {
        animation: sitegeist-resource-reference-editor-spin 0.8s linear infinite;
    }
    @keyframes sitegeist-resource-reference-editor-spin {
        to { transform: rotate(360deg); }
    }
    /*
     * The running bar above the list. It always takes its 2px, so the list does not
     * jump when it appears, and it only fades in after a moment - an action that is
     * done right away shows no bar at all instead of a flash.
     */
    .sitegeist-resource-reference-editor__progress {
        position: relative;
        height: 2px;
        overflow: hidden;
        opacity: 0;
        transition: opacity 0.15s;
    }
    .sitegeist-resource-reference-editor__progress--active {
        opacity: 1;
        transition-delay: 0.2s;
    }
    .sitegeist-resource-reference-editor__progress--active::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        width: 30%;
        background: var(--colors-PrimaryBlue, #00adee);
        animation: sitegeist-resource-reference-editor-progress 1s ease-in-out infinite;
    }
    @keyframes sitegeist-resource-reference-editor-progress {
        from { left: -30%; }
        to { left: 100%; }
    }
`;var W=y(B()),X=y(J());var ie=e=>!!e?.hidden||!!e?.tags?.disabled||!!e?.properties?._hidden;var Et=({resources:e,usage:t,onCancel:o,onHideInstead:r,onConfirm:s})=>{let{nodeTypesRegistry:i,t:n}=k(),l=e.every(a=>!!i.getNodeType(a.nodeType)?.properties?._hidden)&&!e.every(ie);return W.default.createElement(X.Dialog,{isOpen:!0,type:"warn",style:"narrow",title:e.length===1?n("removal.titleOne","Delete this resource?"):n("removal.title","Delete {count} resources?",{count:e.length}),onRequestClose:o,actions:[W.default.createElement(X.Button,{key:"cancel",type:"button",onClick:o},n("action.cancel","Cancel")),l?W.default.createElement(X.Button,{key:"hide",type:"button",style:"lighter",onClick:()=>r(e)},W.default.createElement(X.Icon,{icon:"eye-slash"})," ",n("action.hideInstead","Hide instead")):null,W.default.createElement(X.Button,{key:"delete",type:"button",style:"error",hoverStyle:"error",onClick:()=>s(e)},W.default.createElement(X.Icon,{icon:"trash"})," ",n("action.delete","Delete"))].filter(Boolean)},W.default.createElement("div",{className:"sitegeist-resource-reference-editor__confirmation"},W.default.createElement("ul",null,e.map(a=>{let c=t?.[a.identifier];return W.default.createElement("li",{key:a.contextPath},W.default.createElement("strong",null,a.label||a.identifier),t===null&&W.default.createElement("small",null,n("removal.checking","Checking references\u2026")),c&&c.count>0&&W.default.createElement("small",null,c.count===1?n("removal.referencedOnce","Referenced once"):n("removal.referenced","Referenced {count} times",{count:c.count}),c.documents.length>0?`: ${c.documents.join(", ")}`:""),t!==null&&!c?.count&&W.default.createElement("small",null,n("removal.notReferenced","Not referenced")))})),W.default.createElement("p",null,n("removal.explanation","Deleting removes the resource from the collection, and every document that references it loses that reference. Hiding it instead keeps those references intact."))))};var j=y(B()),Ce=y(J());var L=y(B()),Z=y(J());var je=y(B()),He=y(J()),ae=({icon:e,isBusy:t})=>t?je.default.createElement(He.Icon,{icon:"spinner",className:"sitegeist-resource-reference-editor__spinner"}):je.default.createElement(He.Icon,{icon:e});var Dt=({targets:e,selectableResources:t,selection:o,isSelecting:r,isLoading:s,activity:i,isMultiple:n,canUseSelection:l,selectionIsReferenced:a,path:c,onDuplicate:d,onSetHidden:p,onDelete:f,onSetSelection:u,onUseSelection:C,onUnuseSelection:x})=>{let{nodeTypesRegistry:N,t:_}=k(),w=e.length>0&&e.every(g=>!g.tethered),z=w&&e.every(ie),U=w&&e.every(g=>!!N.getNodeType(g.nodeType)?.properties?._hidden),A=t.length>0&&t.every(g=>o.includes(g.contextPath)),T=()=>r?o.length>0?_("selection.count","{count} selected",{count:o.length}):_("selection.hint","Click the resources to select them"):c.length>0?c.join(" \u203A "):_("action.noTarget","No resource selected");return L.default.createElement("div",{className:"sitegeist-resource-reference-editor__footer"},L.default.createElement("span",{className:"sitegeist-resource-reference-editor__footer-target"+(w?"":" sitegeist-resource-reference-editor__footer-target--empty")},T()),L.default.createElement("div",{className:"sitegeist-resource-reference-editor__footer-actions"},r&&L.default.createElement(Z.Button,{type:"button",style:"lighter",disabled:s||t.length===0,onClick:()=>u(A?[]:t.map(g=>g.contextPath))},A?_("action.deselectAll","Deselect all"):_("action.selectAll","Select all")),L.default.createElement(Z.Button,{type:"button",style:"lighter",disabled:s||!w,onClick:d},L.default.createElement(ae,{icon:"clone",isBusy:i==="duplicate"})," ",_("action.duplicate","Duplicate")),L.default.createElement(Z.Button,{type:"button",style:"lighter",disabled:s||!U,onClick:()=>p(!z)},L.default.createElement(ae,{icon:z?"eye":"eye-slash",isBusy:i==="hide"})," ",z?_("action.show","Show"):_("action.hide","Hide")),r&&n&&L.default.createElement(Z.Button,{className:"sitegeist-resource-reference-editor__bulk-use"+(a?" sitegeist-resource-reference-editor__bulk-use--remove":""),type:"button",style:"lighter",disabled:s||!l,onClick:a?x:C},a?L.default.createElement(L.default.Fragment,null,L.default.createElement(Z.Icon,{icon:"times"})," ",_("action.remove","Remove")):L.default.createElement(L.default.Fragment,null,L.default.createElement(Z.Icon,{icon:"check"})," ",_("action.use","Use"))),L.default.createElement(Z.Button,{type:"button",style:"error",hoverStyle:"error",disabled:s||!w,onClick:f},L.default.createElement(ae,{icon:"trash",isBusy:i==="delete"})," ",_("action.delete","Delete"))))};var Y=y(B()),fe=y(J());var ce=y(B()),pe=y(J());var Me=y(B()),Ut=y(Bt()),At=({item:e,node:t,value:o,hooks:r,isChanged:s,onChange:i,renderSecondaryInspector:n,validationErrors:l})=>Me.default.createElement("div",{className:"sitegeist-resource-reference-editor__field"},Me.default.createElement(Ut.EditorEnvelope,{identifier:e.id,label:e.label??e.id,editor:e.editor,options:e.editorOptions,value:o,hooks:r??null,node:t,propertyName:e.id,commit:(a,c)=>i(e.id,a,c),renderSecondaryInspector:n,validationErrors:l,helpMessage:e.helpMessage,helpThumbnail:e.helpThumbnail,highlight:!!s}));var ro={panel__headline:"sitegeist-resource-reference-editor__group-label"},Lt=({group:e,node:t,values:o,draft:r,isOpen:s,onToggle:i,onChange:n,renderSecondaryInspector:l,validationErrors:a})=>{let{i18nRegistry:c}=k();return ce.default.createElement(pe.ToggablePanel,{isOpen:s,onPanelToggle:i,className:"sitegeist-resource-reference-editor__group"},ce.default.createElement(pe.ToggablePanel.Header,{theme:ro},e.icon&&ce.default.createElement("div",{className:"sitegeist-resource-reference-editor__group-icon"},ce.default.createElement(pe.Icon,{icon:e.icon})),V(c,e.label)),ce.default.createElement(pe.ToggablePanel.Contents,null,Ne(e).map(d=>ce.default.createElement(At,{key:`${t?.contextPath??"new"}-${d.id}`,item:d,node:t,value:d.id==="_nodeType"?t?.nodeType:o[d.id],hooks:r[d.id]?.hooks,isChanged:!!r[d.id],onChange:n,renderSecondaryInspector:l,validationErrors:a[d.id]}))))};var Ft=({inspected:e,isLoading:t,renderSecondaryInspector:o})=>{let{i18nRegistry:r,t:s}=k();return Y.default.createElement("div",{className:"sitegeist-resource-reference-editor__inspector"},Y.default.createElement("div",{className:"sitegeist-resource-reference-editor__inspector-body"},e.node?e.tabs.length===0?Y.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},s("inspector.noConfiguration","This node type has no inspector configuration.")):Y.default.createElement(fe.Tabs,{className:"sitegeist-resource-reference-editor__tabs"},e.tabs.map(n=>Y.default.createElement(fe.Tabs.Panel,{key:n.id,id:n.id,icon:n.icon,tooltip:V(r,n.label)},n.groups.map(l=>Y.default.createElement(Lt,{key:l.id,group:l,node:e.node,values:e.values,draft:e.draft,isOpen:e.isPanelOpen(l.id,l.collapsed),onToggle:()=>e.togglePanel(l.id),onChange:e.change,renderSecondaryInspector:o,validationErrors:e.validationErrors}))))):Y.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},s("inspector.empty","Select a resource to edit its properties."))),e.node&&Y.default.createElement("div",{className:"sitegeist-resource-reference-editor__inspector-footer"},Y.default.createElement(fe.Button,{type:"button",style:"lighter",disabled:t||!e.hasChanges,onClick:e.discard},s("action.discard","Discard")),Y.default.createElement(fe.Button,{type:"button",style:"success",disabled:t||!e.hasChanges,onClick:e.save},s("action.apply","Apply"))))};var Te=y(B());var E=y(B()),te=y(J());var We=20,jt=({resource:e,isActive:t,isReferenced:o,isSelecting:r,isSelected:s,isUsable:i,depth:n,guides:l,onOpen:a,onToggleSelection:c,onPick:d,onToggleReference:p})=>{let{nodeTypesRegistry:f,i18nRegistry:u,t:C}=k(),x=f.getNodeType(e.nodeType),N=r?c:a,_=E.default.useRef(null);return E.default.useEffect(()=>{t&&_.current?.scrollIntoView({block:"nearest"})},[t]),E.default.createElement("div",{ref:_,role:"button",tabIndex:0,className:["sitegeist-resource-reference-editor__item",t&&!r?"sitegeist-resource-reference-editor__item--active":"",r&&s?"sitegeist-resource-reference-editor__item--selected":"",ie(e)?"sitegeist-resource-reference-editor__item--hidden":"",n>0?"sitegeist-resource-reference-editor__item--child":""].join(" "),style:n>0?{marginLeft:`${n*We}px`}:void 0,onMouseDown:w=>{w.shiftKey&&w.preventDefault()},onClick:w=>w.shiftKey?d():N(),onKeyDown:w=>{(w.key==="Enter"||w.key===" ")&&(w.preventDefault(),N())}},l.map(w=>E.default.createElement("span",{key:w.level,"aria-hidden":"true",className:"sitegeist-resource-reference-editor__guide"+(w.isEnd?" sitegeist-resource-reference-editor__guide--end":""),style:{left:`${-((n-w.level)*We)-We/2}px`}})),r&&E.default.createElement("span",{className:"sitegeist-resource-reference-editor__item-select"},E.default.createElement(te.CheckBox,{isChecked:s,onChange:c})),E.default.createElement(te.Icon,{icon:x?.ui?.icon??"file"}),E.default.createElement("div",{className:"sitegeist-resource-reference-editor__item-label"},E.default.createElement("strong",{className:e.label?"":"sitegeist-resource-reference-editor__item-unnamed"},e.label||V(u,x?.ui?.label)||e.identifier),E.default.createElement("small",null,V(u,x?.ui?.label)||e.nodeType)),E.default.createElement("span",{className:"sitegeist-resource-reference-editor__item-actions"+(r?" sitegeist-resource-reference-editor__item-actions--inert":"")},ie(e)&&E.default.createElement("span",{className:"sitegeist-resource-reference-editor__hidden-badge",title:C("resource.hiddenTitle","This resource is hidden")},E.default.createElement(te.Icon,{icon:"eye-slash"})," ",C("resource.hidden","Hidden")),i&&E.default.createElement("button",{type:"button",className:"sitegeist-resource-reference-editor__use"+(o?" sitegeist-resource-reference-editor__use--active":""),onClick:w=>{w.stopPropagation(),p()}},o?E.default.createElement(E.default.Fragment,null,E.default.createElement("span",{className:"sitegeist-resource-reference-editor__use-state"},E.default.createElement(te.Icon,{icon:"check"})," ",C("action.inUse","In use")),E.default.createElement("span",{className:"sitegeist-resource-reference-editor__use-action"},E.default.createElement(te.Icon,{icon:"times"})," ",C("action.remove","Remove"))):E.default.createElement(E.default.Fragment,null,E.default.createElement(te.Icon,{icon:"plus"})," ",C("action.use","Use")))))};var so=(e,t)=>{let{depth:o}=e[t],r=[];for(let s=1;s<=o;s++){let i=!1;for(let n=t+1;n<e.length&&e[n].depth>=s;n++)if(e[n].depth===s){i=!0;break}i?r.push({level:s,isEnd:!1}):s===o&&r.push({level:s,isEnd:!0})}return r},Ht=({rows:e,isLoading:t,activeContextPath:o,referencedIdentifiers:r,isSelecting:s,selection:i,usableNodeTypes:n,onOpen:l,onToggleSelection:a,onPick:c,onToggleReference:d})=>{let{nodeTypesRegistry:p,t:f}=k();return Te.default.createElement("div",{className:"sitegeist-resource-reference-editor__list"},e.length===0&&Te.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},t?f("list.loading","Loading\u2026"):f("list.empty","No resources found.")),e.map((u,C)=>Te.default.createElement(jt,{key:u.resource.contextPath,resource:u.resource,depth:u.depth,guides:so(e,C),isActive:o===u.resource.contextPath,isReferenced:r.includes(u.resource.identifier),isSelecting:s,isSelected:i.includes(u.resource.contextPath),isUsable:ke(p,u.resource.nodeType,n),onOpen:()=>l(u.resource),onToggleSelection:()=>a(u.resource),onPick:()=>c(u.resource),onToggleReference:()=>d(u.resource.identifier)})))};var oe=y(B()),ge=y(J());var G=y(B()),Re=y(J());var Mt=({groups:e,isDisabled:t,isBusy:o,onCreate:r})=>{let{t:s}=k(),[i,n]=G.default.useState(!1),l=G.default.useRef(null),a=e.flatMap(p=>p.options);G.default.useEffect(()=>{if(!i)return;let p=u=>{l.current?.contains(u.target)||n(!1)},f=u=>{u.key==="Escape"&&(u.stopPropagation(),n(!1))};return document.addEventListener("mousedown",p),document.addEventListener("keydown",f,!0),()=>{document.removeEventListener("mousedown",p),document.removeEventListener("keydown",f,!0)}},[i]);let c=p=>{n(!1),r(p)},d=p=>G.default.createElement("button",{key:(p.parentContextPath??"")+p.nodeTypeName,type:"button",role:"menuitem",className:"sitegeist-resource-reference-editor__create-option",onClick:()=>c(p)},G.default.createElement(Re.Icon,{icon:p.icon??"file"})," ",p.label);return a.length<=1?G.default.createElement(Re.Button,{type:"button",style:"lighter",disabled:t||a.length===0,title:a[0]?.label,onClick:()=>a[0]&&c(a[0])},G.default.createElement(ae,{icon:"plus",isBusy:o})," ",s("action.new","New")):G.default.createElement("div",{className:"sitegeist-resource-reference-editor__create-menu",ref:l},G.default.createElement(Re.Button,{type:"button",style:"lighter",disabled:t,"aria-haspopup":"menu","aria-expanded":i,onClick:()=>n(p=>!p)},G.default.createElement(ae,{icon:"plus",isBusy:o})," ",s("action.new","New")),i&&G.default.createElement("div",{className:"sitegeist-resource-reference-editor__create-options",role:"menu"},e.map(p=>G.default.createElement(G.default.Fragment,{key:p.label??""},p.label&&G.default.createElement("span",{className:"sitegeist-resource-reference-editor__create-section"},p.label),p.options.map(d)))))};var Wt=({filter:e,onFilter:t,isLoading:o,isCreating:r,isSelecting:s,canSelect:i,createGroups:n,onCreate:l,onEnterSelection:a,onLeaveSelection:c})=>{let{t:d}=k();return oe.default.createElement("div",{className:"sitegeist-resource-reference-editor__toolbar"},oe.default.createElement("input",{className:"sitegeist-resource-reference-editor__search",type:"search",value:e,placeholder:d("list.search","Filter resources"),onChange:p=>t(p.currentTarget.value)}),oe.default.createElement(Mt,{groups:n,isDisabled:o,isBusy:r,onCreate:l}),s?oe.default.createElement(ge.Button,{type:"button",style:"lighter",onClick:c},oe.default.createElement(ge.Icon,{icon:"check"})," ",d("action.done","Done")):oe.default.createElement(ge.Button,{type:"button",style:"lighter",disabled:o||!i,onClick:a},oe.default.createElement(ge.Icon,{icon:"list-check"})," ",d("action.selectMultiple","Select multiple")))};var Gt=({isOpen:e,onClose:t,collection:o,tree:r,inspected:s,selection:i,references:n,actions:l,creationType:a,usableNodeTypes:c,renderSecondaryInspector:d,secondaryInspector:p,onCloseSecondaryInspector:f})=>{let{nodeTypesRegistry:u,i18nRegistry:C,t:x}=k(),[N,_]=j.default.useState(""),w=N.trim().toLocaleLowerCase(),z=w===""?r.rows:r.rows.filter(m=>(m.resource.label??"").toLocaleLowerCase().includes(w)),U=z.map(m=>m.resource),A=m=>ke(u,m.nodeType,c),T=i.selected.filter(A),g=s.node?r.rows.find(m=>m.resource.contextPath===s.node.contextPath)??null:null,R=g?.resource??null,v=i.isSelecting?i.selected:R?[R]:[],b=g?[...g.ancestors,g.resource].map(m=>m.label):[],D=u.getNodeType(a),O=m=>at(u,C,m.nodeType).map(H=>({...H,parentContextPath:m.contextPath})),I=m=>x("action.createIn","In \u201C{name}\u201D",{name:m}),h=i.isSelecting?null:g,P=h?.ancestors[h.ancestors.length-1]??null,S=[P?{label:I(P.label),options:O(P)}:{options:[{nodeTypeName:a,label:V(C,D?.ui?.label)||a,icon:D?.ui?.icon}]},...h?[{label:I(h.resource.label),options:O(h.resource)}]:[]].filter(m=>m.options.length>0);return j.default.createElement(Ce.Dialog,{isOpen:e,title:"",style:"jumbo",onRequestClose:p?f:t,actions:[]},j.default.createElement("div",{className:"sitegeist-resource-reference-editor__layout"},j.default.createElement("button",{type:"button",className:"sitegeist-resource-reference-editor__close",title:x("action.close","Close"),"aria-label":x("action.close","Close"),onClick:t},j.default.createElement(Ce.Icon,{icon:"times"})),j.default.createElement("div",{className:"sitegeist-resource-reference-editor__content"},o.error&&j.default.createElement("div",{className:"sitegeist-resource-reference-editor__state sitegeist-resource-reference-editor__error"},o.error),j.default.createElement(Wt,{filter:N,onFilter:_,isLoading:o.isLoading,isCreating:o.activity==="create",isSelecting:i.isSelecting,canSelect:U.length>0,createGroups:S,onCreate:m=>l.create(m.parentContextPath?{parentContextPath:m.parentContextPath,nodeTypeName:m.nodeTypeName}:void 0),onEnterSelection:()=>i.enter(R?[R.contextPath]:[]),onLeaveSelection:i.leave}),j.default.createElement("div",{className:"sitegeist-resource-reference-editor__progress"+(o.isLoading?" sitegeist-resource-reference-editor__progress--active":""),"aria-hidden":"true"}),j.default.createElement(Ht,{rows:z,usableNodeTypes:c,isLoading:o.isLoading,activeContextPath:s.node?.contextPath,referencedIdentifiers:n.referenced,isSelecting:i.isSelecting,selection:i.selection,onOpen:s.inspect,onToggleSelection:i.toggle,onPick:m=>i.pick(m,R?[R.contextPath]:[]),onToggleReference:n.toggle}),j.default.createElement(Dt,{targets:v,selectableResources:U,selection:i.selection,isSelecting:i.isSelecting,isLoading:o.isLoading,activity:o.activity,isMultiple:n.isMultiple,path:b,canUseSelection:T.length>0,selectionIsReferenced:T.length>0&&T.every(m=>n.referenced.includes(m.identifier)),onDuplicate:()=>l.duplicate(v),onSetHidden:m=>l.setHidden(v,m),onDelete:()=>l.requestRemoval(v),onSetSelection:i.setSelection,onUseSelection:()=>{n.addMany(T.map(m=>m.identifier)),i.leave()},onUnuseSelection:()=>{n.drop(T.map(m=>m.identifier)),i.leave()}})),p&&j.default.createElement("div",{className:"sitegeist-resource-reference-editor__secondary"},j.default.createElement("button",{type:"button",className:"sitegeist-resource-reference-editor__secondary-close",title:x("action.close","Close"),onClick:f},j.default.createElement(Ce.Icon,{icon:"times"})),p),j.default.createElement(Ft,{inspected:s,isLoading:o.isLoading,renderSecondaryInspector:d})))};var $t=({ReferenceEditor:e,ReferencesEditor:t,...o})=>{let{i18nRegistry:r,nodeTypesRegistry:s,t:i}=k(),[n,l]=$.default.useState(!1),a=o.options.resourceCreation,c=St(),d=Nt(o.options,o.neos?.routes),p=Pt(d,o.neos?.routes),f=Tt(p.rows.map(v=>v.resource)),u=vt(o),C=ht(d,c.close),x=()=>l(!0),N=Rt(o,d,u,f,C,x,v=>p.reveal(v)),_=async()=>{x(),await d.run(()=>d.reload())},w=()=>{c.close(),l(!1)},z=v=>{if(!u.isMultiple)return v.closest('[class*="selectBoxHeader"]')&&u.referenced.length===1?u.referenced[0]:null;let b=v.closest('[class*="selectedOptions__innerPreview"]')?.closest("li"),D=b?.parentElement;return!b||!D?null:u.referenced[Array.prototype.indexOf.call(D.children,b)]??null},U=v=>{let b=v.target;if(!b||b.closest("input, button"))return;let D=z(b);if(!D)return;v.preventDefault(),v.stopPropagation(),x();let O=d.resources.find(I=>I.identifier===D);d.run(async()=>{if(O){await Promise.all([d.reload(),C.inspect(O)]);return}let{resources:I}=await d.reload(),h=I.find(P=>P.identifier===D);h&&await C.inspect(h)})},{resourceCreation:A,...T}=o.options,g=o.options.nodeTypes??[a.type],R=g.length===1?V(r,s.getNodeType(g[0])?.ui?.label):"";return $.default.createElement($.default.Fragment,null,$.default.createElement("style",null,It),$.default.createElement("div",{className:"sitegeist-resource-reference-editor__reference",style:{"--sitegeist-resource-type":JSON.stringify(R)},onClickCapture:U},u.isMultiple&&t?$.default.createElement(t,{key:d.version,...o,options:T}):$.default.createElement(e,{key:d.version,...o,options:T})),$.default.createElement("div",{className:"sitegeist-resource-reference-editor__actions"},$.default.createElement(me.Button,{className:"sitegeist-resource-reference-editor__create",type:"button",style:"lighter",disabled:o.options.disabled||d.isLoading,onClick:N.create,title:a.buttonLabel??i("action.createNew","Create new"),"aria-label":a.buttonLabel??i("action.createNew","Create new")},$.default.createElement(me.Icon,{icon:"plus"})),$.default.createElement(me.Button,{type:"button",style:"lighter",disabled:o.options.disabled||d.isLoading,onClick:_},$.default.createElement(me.Icon,{icon:"list"})," ",i("action.showAll","Show all"))),$.default.createElement(Gt,{isOpen:n,onClose:w,collection:d,tree:p,inspected:C,selection:f,references:u,actions:N,creationType:a.type,usableNodeTypes:g,renderSecondaryInspector:c.render,secondaryInspector:c.secondaryInspector?.element??null,onCloseSecondaryInspector:c.close}),N.pendingRemoval&&$.default.createElement(Et,{resources:N.pendingRemoval,usage:N.pendingRemovalUsage,onCancel:N.cancelRemoval,onHideInstead:v=>{N.cancelRemoval(),N.setHidden(v,!0)},onConfirm:N.remove}))};Ve("Sitegeist.ResourceReferenceEditor",{},(e,{store:t})=>{let o=e.get("inspector"),r=o?.get("editors"),s=o?.get("saveHooks"),i=e.get("validators"),n=r?.get("Neos.Neos/Inspector/Editors/ReferenceEditor"),l=r?.get("Neos.Neos/Inspector/Editors/ReferencesEditor"),a=e.get("@neos-project/neos-ui-contentrepository"),c=e.get("i18n");if(!r||!n?.component||!a){console.warn("[Sitegeist.ResourceReferenceEditor] Required Neos UI registries are missing.");return}e.get("sagas")?.set("Sitegeist.ResourceReferenceEditor/CreationDialog",{saga:Xe});let d={store:t,globalRegistry:e,nodeTypesRegistry:a,saveHooksRegistry:s,validatorsRegistry:i,i18nRegistry:c};r.set("Sitegeist.ResourceReferenceEditor/Inspector/Editors/ResourceReferenceEditor",{component:p=>Ge.default.createElement(st,{registries:d},Ge.default.createElement($t,{...p,ReferenceEditor:n.component,ReferencesEditor:l?.component}))})});})();
//# sourceMappingURL=Plugin.js.map
