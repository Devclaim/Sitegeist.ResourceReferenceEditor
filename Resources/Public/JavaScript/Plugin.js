(()=>{var jo=Object.create;var Le=Object.defineProperty;var Mo=Object.getOwnPropertyDescriptor;var Wo=Object.getOwnPropertyNames;var Vo=Object.getPrototypeOf,$o=Object.prototype.hasOwnProperty;var Go=(e,o)=>()=>(e&&(o=e(e=0)),o);var he=(e,o)=>()=>(o||e((o={exports:{}}).exports,o),o.exports);var qo=(e,o,t,r)=>{if(o&&typeof o=="object"||typeof o=="function")for(let s of Wo(o))!$o.call(e,s)&&s!==t&&Le(e,s,{get:()=>o[s],enumerable:!(r=Mo(o,s))||r.enumerable});return e};var f=(e,o,t)=>(t=e!=null?jo(Vo(e)):{},qo(o||!e||!e.__esModule?Le(t,"default",{value:e,enumerable:!0}):t,e));function O(e){return(...o)=>{if(window["@Neos:HostPluginAPI"]&&window["@Neos:HostPluginAPI"][`@${e}`])return window["@Neos:HostPluginAPI"][`@${e}`](...o);throw new Error("You are trying to read from a consumer api that hasn't been initialized yet!")}}var Y=Go(()=>{});var S=he((ot,He)=>{Y();He.exports=O("vendor")().React});var Z=he((dt,Me)=>{Y();Me.exports=O("NeosProjectPackages")().NeosUiReduxStore});var Ve=he((pt,We)=>{Y();We.exports=O("vendor")().reduxSagaEffects});var $=he((ht,ze)=>{Y();ze.exports=O("NeosProjectPackages")().ReactUiComponents});var So=he((vr,Po)=>{Y();Po.exports=O("NeosProjectPackages")().NeosUiEditors});var Fe=f(S());Y();var zo=O("manifest"),je=zo,{SynchronousRegistry:rt,SynchronousMetaRegistry:st}=O("NeosProjectPackages")().NeosUiRegistry;Y();var M=O("NeosProjectPackages")().NeosUiBackendConnectorDefault,{fetchWithErrorHandling:at}=O("NeosProjectPackages")().NeosUiBackendConnector;var ee=f(Z()),Se=f(Ve()),Te=null,$e=e=>{let o=Te;Te=null,o&&e(o)},Ge=async(e,o,t,r)=>{let[s]=await M.get().q([r]).get();return s&&e.dispatch(ee.actions.CR.Nodes.merge({[s.contextPath]:s})),new Promise(i=>{Te={apply:n=>i(n),cancel:()=>i(null)},e.dispatch(ee.actions.UI.NodeCreationDialog.open(o?.ui?.label??t,o?.ui?.creationDialog??{elements:{}},r,t))})};function*qe(){yield(0,Se.takeEvery)(ee.actionTypes.UI.NodeCreationDialog.APPLY,e=>$e(o=>o.apply(e?.payload??{}))),yield(0,Se.takeEvery)([ee.actionTypes.UI.NodeCreationDialog.CANCEL,ee.actionTypes.UI.NodeCreationDialog.BACK],()=>$e(e=>e.cancel()))}var U=f(S()),fe=f($());var ye=f(S());var Ke="Sitegeist.ResourceReferenceEditor",Je="Main",H=(e,o)=>o?e?.translate?e.translate(o):o:"",Ko=(e,o,t,r)=>e?.translate?e.translate(`${Ke}:${Je}:${o}`,t,r,Ke,Je):t,Ye=e=>(o,t,r)=>Ko(e,o,t,r);var Qe=ye.default.createContext(null),Xe=({registries:e,children:o})=>{let t=ye.default.useMemo(()=>({...e,t:Ye(e.i18nRegistry)}),[e]);return ye.default.createElement(Qe.Provider,{value:t},o)},R=()=>{let e=ye.default.useContext(Qe);if(!e)throw new Error("[Sitegeist.ResourceReferenceEditor] The Neos UI registries are only available below RegistriesProvider.");return e};var re=f(S());var De=f(Z());var ve=f(Z()),Jo=["Neos.Neos.Ui:UpdateNodeInfo","Neos.Neos.Ui:UpdateNodePreviewUrl","Neos.Neos.Ui:UpdateWorkspaceInfo","Neos.Neos.Ui:Success","Neos.Neos.Ui:Info","Neos.Neos.Ui:Warning","Neos.Neos.Ui:Error"],Ze=(e,o)=>{if(typeof o!="string")return;let t=e.getState(),r=ve.selectors.CR.Nodes.focusedNodePathSelector(t),s=t?.ui?.inspector?.valuesByNodePath?.[r]??{},i=Object.keys(s).filter(n=>s[n]!==void 0);i.length===1&&i[0]===o&&e.dispatch(ve.actions.UI.Inspector.apply())},oe=(e,o)=>{let t=(o?.feedbacks??[]).filter(r=>Jo.includes(r?.type));t.length>0&&e.dispatch(ve.actions.ServerFeedback.handleServerFeedback({feedbacks:t}))};var Ie=f(Z()),te=async e=>{let o=M.get().endpoints?.syncWorkspace;if(!o)return;let t=e.getState(),r=Ie.selectors.CR.Workspaces.personalWorkspaceNameSelector(t);if(typeof r!="string"||r==="")return;let s=await o(r,!1,Ie.selectors.CR.ContentDimensions.active(t));if(s&&typeof s=="object"&&"conflicts"in s)throw new Error("Your workspace could not be brought up to date with the live workspace, because some of your changes conflict with it. Resolve the conflicts from the workspace dialog, then try again.");if(s&&typeof s=="object"&&"error"in s)throw new Error(s.error?.message??"Your workspace could not be brought up to date with the live workspace.")};var Yo="Sitegeist.ResourceReferenceEditor:Resource",we=(e,o,t)=>t.some(r=>e.isOfType?.(o,r)??o===r),Qo=(e,o)=>!!e.isOfType?.(o,Yo),eo=(e,o,t)=>(e.getAllowedChildNodeTypes?.(t)??[]).map(r=>({name:r,nodeType:e.getNodeType(r)})).filter(({name:r,nodeType:s})=>!!s&&s.abstract!==!0&&Qo(e,r)).map(({name:r,nodeType:s})=>({nodeTypeName:r,label:H(o,s?.ui?.label)||r,icon:s?.ui?.icon})).sort((r,s)=>r.label.localeCompare(s.label)),Re=e=>(e.items??[]).filter(o=>o.type==="editor"&&o.editor&&o.hidden!==!0),oo=(e,o)=>(e.getInspectorViewConfigurationFor(o)?.tabs??[]).map(r=>({...r,groups:(r.groups??[]).filter(s=>Re(s).length>0)})).filter(r=>r.groups.length>0),to=e=>{switch(e){case"integer":case"float":return 0;case"boolean":return!1;case"array":return[];default:return""}},ro=e=>Object.entries(e?.ui?.creationDialog?.elements??{}).filter(([,o])=>o?.ui?.editor&&o?.ui?.hidden!==!0).map(([o,t])=>({type:"editor",id:o,dataType:t.type,label:t.ui?.label??o,editor:t.ui.editor,editorOptions:t.ui.editorOptions,helpMessage:t.ui?.help,defaultValue:t.defaultValue,validation:t.validation})),so=(e,o)=>{if(!Array.isArray(e.requiredProperties))return["(stale editor configuration - flush the Neos caches)"];let t=new Set(o.map(r=>r.id));return[...e.unsupportedRequiredProperties??[],...e.requiredProperties.filter(r=>!t.has(r.name)).map(r=>r.name)]},no=(e,o)=>e?.properties?.[o]??e?.references?.[o],io=e=>e.flatMap(o=>o.groups.flatMap(t=>Re(t)));var Ee=async(e,o,t)=>{if(!o)return e;let r=e;for(let[s,i]of Object.entries(o)){let n=t?.get(s);if(!n)throw new Error(`There is no registered save hook function for identifier ${s}`);r=await n(r,i)}return r},ao=async(e,o)=>{let t={};for(let[r,s]of Object.entries(e))t[r]=await Ee(s.value,s.hooks,o);return t};var co=(e,o,t,r)=>{let s={};for(let i of e){let n=no(o,i.id)?.validation;if(!n)continue;let a=Object.keys(n).map(d=>{let l=r?.get(d);return l?l(t[i.id],n[d]):(console.warn(`[Sitegeist.ResourceReferenceEditor] Validator ${d} not found`),null)}).filter(Boolean);a.length>0&&(s[i.id]=a)}return s},lo=e=>{if(e instanceof Error)return e.message;if(typeof e=="string")return e;let o=e?.message??e?.error;if(typeof o=="string")return o;try{return JSON.stringify(e)}catch{return String(e)}};var ae="live",ce=(e,o)=>{if(!o)return e;try{let t=JSON.parse(e);return t?.workspaceName===o?e:JSON.stringify({...t,workspaceName:o})}catch{return e}};var uo=(e,o)=>{let{store:t,nodeTypesRegistry:r,saveHooksRegistry:s,validatorsRegistry:i}=R(),[n,a]=re.default.useState(null),[d,l]=re.default.useState([]),[c,p]=re.default.useState({}),[u,b]=re.default.useState({}),[N,C]=re.default.useState({}),[g,k]=re.default.useState({}),D=r.getNodeType(n?.nodeType),J=io(d),L=Object.keys(u).length>0,j=()=>{b({}),p({}),C({}),o()},I=async m=>{j(),await e.run(async()=>{let[h]=await M.get().q([m.contextPath]).get(),y=h??m;t.dispatch(De.actions.CR.Nodes.merge({[y.contextPath]:y})),a(y),l(oo(r,y.nodeType)),p({...y.properties??{}})})};return{node:n,nodeType:D,tabs:d,values:c,draft:u,hasChanges:L,validationErrors:N,isPanelOpen:(m,h)=>!!g[m]==!!h,togglePanel:m=>k(h=>({...h,[m]:!h[m]})),inspect:I,forget:()=>{a(null),l([]),j()},change:(m,h,y)=>{let V=n?.properties?.[m],v=!y&&(V===h||JSON.stringify(V)===JSON.stringify(h));b(B=>{if(v){let{[m]:me,...Pe}=B;return Pe}return{...B,[m]:{value:h,hooks:y}}}),p(B=>({...B,[m]:h})),C(B=>{if(!B[m])return B;let{[m]:me,...Pe}=B;return Pe})},save:async()=>{if(!n)return;let m=co(J,D,c,i);C(m),!(Object.keys(m).length>0)&&await e.run(async()=>{let h=await ao(u,s),y=ce(n.contextPath,ae),V=Object.entries(h).map(([v,B])=>({type:"Neos.Neos.Ui:Property",subject:y,payload:{propertyName:v,value:B}}));if(V.length>0){let v=await M.get().endpoints.change(V);oe(t,v),await te(t),e.touch(),t.dispatch(De.actions.UI.ContentCanvas.reload())}b({}),await e.reload(),await I(n)})},discard:()=>{b({}),C({}),p({...n?.properties??{}})}}};var po=f(S()),go=e=>{let o=!!e.options.multiple,{value:t,commit:r}=e,s=po.default.useMemo(()=>Array.isArray(t)?t:t?[t]:[],[t]),i=l=>{if(!o){r(l);return}let c=Array.isArray(t)?t:[];c.includes(l)||r([...c,l])},n=l=>{if(!o){l.length>0&&r(l[0]);return}let c=Array.isArray(t)?t:[],p=l.filter(u=>!c.includes(u));p.length>0&&r([...c,...p])},a=l=>{let c=new Set(l);if(o||Array.isArray(t)){let p=Array.isArray(t)?t:[],u=p.filter(b=>!c.has(b));u.length!==p.length&&r(u);return}typeof t=="string"&&c.has(t)&&r("")};return{referenced:s,isMultiple:o,add:i,addMany:n,drop:a,toggle:l=>{if(s.includes(l)){a([l]);return}i(l)}}};var Be=f(S());var yo=f(Z());var Ce=f(Z()),Oe=e=>{let o=e?.core?.service?.nodes;return typeof o!="string"?"":o.replace(/\/neos\/service\/nodes\/?$/,"")},fo=async(e,o,t)=>{let r=e.getState(),s=r?.cr?.nodes?.documentNode??Ce.selectors.CR.Nodes.focusedNodePathSelector(r);if(typeof s!="string")throw new Error("The node of the current editing session could not be resolved.");let i=new URLSearchParams({node:s,collection:o.collection});o.buttonLabel&&i.append("title",o.buttonLabel);let n=await fetch(`${Oe(t)}/neos/service/data-source/sitegeist-resource-collections?${i.toString()}`,{credentials:"include",headers:{Accept:"application/json"}}),a=await n.text();if(!n.ok)throw new Error(`The resource collection "${o.collection}" could not be resolved (HTTP ${n.status}). ${a.slice(0,500)}`);let d=null;try{d=JSON.parse(a)}catch{throw new Error(`The resource collection data source did not answer with JSON: ${a.slice(0,500)}`)}let l=d?.contextPath??d?.data?.contextPath;if(typeof l!="string")throw new Error(`The resource collection "${o.collection}" has no node address: ${a.slice(0,500)}`);return{contextPath:l}},mo=async(e,o,t)=>{if(t.length===0)return{};let r=e.getState(),s=r?.cr?.nodes?.documentNode??Ce.selectors.CR.Nodes.focusedNodePathSelector(r);if(typeof s!="string")return{};let i=new URLSearchParams({node:s,nodes:t.join(",")}),n=await fetch(`${Oe(o)}/neos/service/data-source/sitegeist-resource-usage?${i.toString()}`,{credentials:"include",headers:{Accept:"application/json"}});if(!n.ok)return{};try{let a=await n.json();return a?.data??a??{}}catch{return{}}},ho=async(e,o,t,r)=>Ue(e,o,r,{nodeTypes:t.nodeTypes??[t.resourceCreation.type]}),Ue=async(e,o,t,r={})=>{let s=e.getState(),i=s?.cr?.nodes?.documentNode??Ce.selectors.CR.Nodes.focusedNodePathSelector(s);if(typeof i!="string")return[];let n=new URLSearchParams({node:i,parent:t});r.nodeTypes?.length&&n.append("nodeTypes",r.nodeTypes.join(","));let a=await fetch(`${Oe(o)}/neos/service/data-source/sitegeist-resource-children?${n.toString()}`,{credentials:"include",headers:{Accept:"application/json"}}),d=await a.text();if(!a.ok)throw new Error(`The children of the resource could not be read (HTTP ${a.status}). `+d.slice(0,500));let l=JSON.parse(d);return l?.data??l??[]};var vo=(e,o,t,r,s,i,n)=>{let{store:a,nodeTypesRegistry:d,saveHooksRegistry:l,t:c}=R(),p=e.options.resourceCreation,[u,b]=Be.default.useState(null),[N,C]=Be.default.useState(null),g=async x=>{i(),o.setError(null);let T=x?.nodeTypeName??p.type,w=d.getNodeType(T),_=ro(w);if(!x){let y=so(p,_);if(y.length>0){o.setError(c("error.creationBlocked","{type} cannot be created here: {properties} must be provided on creation. Give these properties a default value, make them nullable, or promote them to the creation dialog (showInCreationDialog).",{type:T,properties:y.join(", ")}));return}}let m=x?.parentContextPath??(o.container??(await o.reload()).container).contextPath;if(_.length===0){await k({},T,m,!x);return}let h=await Ge(a,w,T,m);h!==null&&await k(h,T,m,!x)},k=async(x,T,w,_)=>{let m={};for(let[h,y]of Object.entries(x))m[h]=await Ee(y.value,y.hooks,l);if(_)for(let h of p.requiredProperties??[])(m[h.name]===void 0||m[h.name]===null)&&(m[h.name]=to(h.type));await o.run(async()=>{let h=await M.get().endpoints.change([{type:"Neos.Neos.Ui:CreateInto",subject:w,payload:{nodeType:T,data:m}}]);oe(a,h);let y=(h?.feedbacks??[]).find(me=>me?.type==="Neos.Neos.Ui:NodeCreated")?.payload;if(!y?.identifier)throw new Error(c("error.creationFailed","The resource could not be created."));await te(a),o.touch(),_&&(t.add(y.identifier),Ze(a,e.identifier));let{resources:V}=await o.reload(),B=(_?V:await n(w)).find(me=>me.identifier===y.identifier);B&&await s.inspect(B)})};return{create:g,duplicate:async x=>{x.length!==0&&await o.run(async()=>{let T=o.container??(await o.reload()).container,w=await M.get().endpoints.change(x.map(y=>({type:"Neos.Neos.Ui:CopyInto",subject:ce(y.contextPath,ae),payload:{parentContextPath:T.contextPath}})));oe(a,w);let _=(w?.feedbacks??[]).filter(y=>y?.type==="Neos.Neos.Ui:NodeCreated").map(y=>y?.payload?.identifier).filter(Boolean);await te(a),o.touch();let{resources:m}=await o.reload(),h=m.find(y=>y.identifier===_[_.length-1]);r.leave(),h&&await s.inspect(h)})},setHidden:async(x,T)=>{x.length!==0&&await o.run(async()=>{let w=await M.get().endpoints.change(x.map(_=>({type:"Neos.Neos.Ui:Property",subject:ce(_.contextPath,ae),payload:{propertyName:"_hidden",value:T}})));oe(a,w),await te(a),o.touch(),a.dispatch(yo.actions.UI.ContentCanvas.reload()),await o.reload(),s.node&&x.some(_=>_.contextPath===s.node.contextPath)&&await s.inspect(s.node)})},requestRemoval:async x=>{if(x.length!==0){C(null),b(x);try{C(await mo(a,e.neos?.routes,x.map(T=>T.identifier)))}catch{C({})}}},remove:async x=>{b(null),await o.run(async()=>{let T=await M.get().endpoints.change(x.map(_=>({type:"Neos.Neos.Ui:RemoveNode",subject:ce(_.contextPath,ae),payload:{}})));oe(a,T),await te(a),o.touch(),t.drop(x.map(_=>_.identifier));let w=x.map(_=>_.contextPath);r.forget(w),r.selection.length>0&&x.length>=r.selection.length&&r.leave(),s.node&&w.includes(s.node.contextPath)&&s.forget(),await o.reload()})},cancelRemoval:()=>b(null),pendingRemoval:u,pendingRemovalUsage:N}};var z=f(S());var bo=e=>{let o=e?.get?.("dataLoaders")?.get?.("NodeLookup");o&&(o._lruCache=null)};var xo=(e,o)=>{let{store:t,globalRegistry:r}=R(),s=e.resourceCreation,[i,n]=z.default.useState(null),[a,d]=z.default.useState([]),[l,c]=z.default.useState(!1),[p,u]=z.default.useState(null),[b,N]=z.default.useState(0),C=z.default.useCallback(async()=>{let k=await fo(t,s,o),D=await ho(t,o,e,k.contextPath);return n(k),d(D),{container:k,resources:D}},[s,e,o,t]),g=z.default.useCallback(async k=>{c(!0),u(null);try{return await k()}catch(D){u(lo(D));return}finally{c(!1)}},[]);return{container:i,resources:a,isLoading:l,error:p,setError:u,reload:C,run:g,version:b,touch:z.default.useCallback(()=>{bo(r),N(k=>k+1)},[r])}};var be=f(S());var _o=(e,o)=>{let{store:t}=R(),[r,s]=be.default.useState({}),i=be.default.useRef(new Set),n=be.default.useCallback(async p=>{let u=await Ue(t,o,p);return s(b=>({...b,[p]:u})),u},[o,t]),a=p=>r[p.contextPath]??p.children,d=[],l=(p,u,b)=>p.flatMap(N=>{let C={resource:N,depth:u,ancestors:b},g=a(N);return g?g.length>0?[C,...l(g,u+1,[...b,N])]:[C]:(N.childCount&&d.push(N.contextPath),[C])}),c=l(e.resources,0,[]);return be.default.useEffect(()=>{let p=d.filter(u=>!i.current.has(u));p.length!==0&&(p.forEach(u=>i.current.add(u)),e.run(async()=>{for(let u of p)await n(u)}))}),{rows:c,reveal:async p=>(i.current.add(p),n(p))}};var xe=f(S()),wo=()=>{let[e,o]=xe.default.useState(null),t=xe.default.useRef(null),r=xe.default.useCallback(()=>{t.current=null,o(null)},[]),s=xe.default.useCallback((i,n)=>{if(!i||!n||t.current===i){r();return}t.current=i,o({id:i,element:n()})},[r]);return{secondaryInspector:e,render:s,close:r}};var le=f(S()),Ro=e=>{let[o,t]=le.default.useState(!1),[r,s]=le.default.useState([]),i=le.default.useCallback(()=>{t(!1),s([])},[]),n=le.default.useCallback(d=>{s(l=>l.includes(d.contextPath)?l.filter(c=>c!==d.contextPath):[...l,d.contextPath])},[]),a=le.default.useCallback(d=>{s(l=>l.filter(c=>!d.includes(c)))},[]);return{isSelecting:o,enter:(d=[])=>{s(d),t(!0)},leave:i,selection:r,selected:e.filter(d=>r.includes(d.contextPath)),toggle:n,setSelection:s,forget:a}};var Co=`
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
`;var A=f(S()),K=f($());var se=e=>!!e?.hidden||!!e?.tags?.disabled||!!e?.properties?._hidden;var No=({resources:e,usage:o,onCancel:t,onHideInstead:r,onConfirm:s})=>{let{nodeTypesRegistry:i,t:n}=R(),a=e.every(d=>!!i.getNodeType(d.nodeType)?.properties?._hidden)&&!e.every(se);return A.default.createElement(K.Dialog,{isOpen:!0,type:"warn",style:"narrow",title:e.length===1?n("removal.titleOne","Delete this resource?"):n("removal.title","Delete {count} resources?",{count:e.length}),onRequestClose:t,actions:[A.default.createElement(K.Button,{key:"cancel",type:"button",onClick:t},n("action.cancel","Cancel")),a?A.default.createElement(K.Button,{key:"hide",type:"button",style:"lighter",onClick:()=>r(e)},A.default.createElement(K.Icon,{icon:"eye-slash"})," ",n("action.hideInstead","Hide instead")):null,A.default.createElement(K.Button,{key:"delete",type:"button",style:"error",hoverStyle:"error",onClick:()=>s(e)},A.default.createElement(K.Icon,{icon:"trash"})," ",n("action.delete","Delete"))].filter(Boolean)},A.default.createElement("div",{className:"sitegeist-resource-reference-editor__confirmation"},A.default.createElement("ul",null,e.map(d=>{let l=o?.[d.identifier];return A.default.createElement("li",{key:d.contextPath},A.default.createElement("strong",null,d.label||d.identifier),o===null&&A.default.createElement("small",null,n("removal.checking","Checking references\u2026")),l&&l.count>0&&A.default.createElement("small",null,l.count===1?n("removal.referencedOnce","Referenced once"):n("removal.referenced","Referenced {count} times",{count:l.count}),l.documents.length>0?`: ${l.documents.join(", ")}`:""),o!==null&&!l?.count&&A.default.createElement("small",null,n("removal.notReferenced","Not referenced")))})),A.default.createElement("p",null,n("removal.explanation","Deleting removes the resource from the collection, and every document that references it loses that reference. Hiding it instead keeps those references intact."))))};var q=f(S()),ke=f($());var E=f(S()),W=f($());var ko=({targets:e,selectableResources:o,selection:t,isSelecting:r,isLoading:s,isMultiple:i,canUseSelection:n,selectionIsReferenced:a,path:d,onDuplicate:l,onSetHidden:c,onDelete:p,onSetSelection:u,onUseSelection:b,onUnuseSelection:N})=>{let{nodeTypesRegistry:C,t:g}=R(),k=e.length>0&&e.every(I=>!I.tethered),D=k&&e.every(se),J=k&&e.every(I=>!!C.getNodeType(I.nodeType)?.properties?._hidden),L=o.length>0&&o.every(I=>t.includes(I.contextPath)),j=()=>r?t.length>0?g("selection.count","{count} selected",{count:t.length}):g("selection.hint","Click the resources to select them"):d.length>0?d.join(" \u203A "):g("action.noTarget","No resource selected");return E.default.createElement("div",{className:"sitegeist-resource-reference-editor__footer"},E.default.createElement("span",{className:"sitegeist-resource-reference-editor__footer-target"+(k?"":" sitegeist-resource-reference-editor__footer-target--empty")},j()),E.default.createElement("div",{className:"sitegeist-resource-reference-editor__footer-actions"},r&&E.default.createElement(W.Button,{type:"button",style:"lighter",disabled:s||o.length===0,onClick:()=>u(L?[]:o.map(I=>I.contextPath))},L?g("action.deselectAll","Deselect all"):g("action.selectAll","Select all")),E.default.createElement(W.Button,{type:"button",style:"lighter",disabled:s||!k,onClick:l},E.default.createElement(W.Icon,{icon:"clone"})," ",g("action.duplicate","Duplicate")),E.default.createElement(W.Button,{type:"button",style:"lighter",disabled:s||!J,onClick:()=>c(!D)},E.default.createElement(W.Icon,{icon:D?"eye":"eye-slash"})," ",D?g("action.show","Show"):g("action.hide","Hide")),r&&i&&E.default.createElement(W.Button,{className:"sitegeist-resource-reference-editor__bulk-use"+(a?" sitegeist-resource-reference-editor__bulk-use--remove":""),type:"button",style:"lighter",disabled:s||!n,onClick:a?N:b},a?E.default.createElement(E.default.Fragment,null,E.default.createElement(W.Icon,{icon:"times"})," ",g("action.remove","Remove")):E.default.createElement(E.default.Fragment,null,E.default.createElement(W.Icon,{icon:"check"})," ",g("action.use","Use"))),E.default.createElement(W.Button,{type:"button",style:"error",hoverStyle:"error",disabled:s||!k,onClick:p},E.default.createElement(W.Icon,{icon:"trash"})," ",g("action.delete","Delete"))))};var G=f(S()),ue=f($());var ne=f(S()),de=f($());var Ae=f(S()),To=f(So()),Io=({item:e,node:o,value:t,hooks:r,isChanged:s,onChange:i,renderSecondaryInspector:n,validationErrors:a})=>Ae.default.createElement("div",{className:"sitegeist-resource-reference-editor__field"},Ae.default.createElement(To.EditorEnvelope,{identifier:e.id,label:e.label??e.id,editor:e.editor,options:e.editorOptions,value:t,hooks:r??null,node:o,propertyName:e.id,commit:(d,l)=>i(e.id,d,l),renderSecondaryInspector:n,validationErrors:a,helpMessage:e.helpMessage,helpThumbnail:e.helpThumbnail,highlight:!!s}));var Eo=({group:e,node:o,values:t,draft:r,isOpen:s,onToggle:i,onChange:n,renderSecondaryInspector:a,validationErrors:d})=>{let{i18nRegistry:l}=R();return ne.default.createElement(de.ToggablePanel,{isOpen:s,onPanelToggle:i},ne.default.createElement(de.ToggablePanel.Header,null,e.icon&&ne.default.createElement("div",{className:"sitegeist-resource-reference-editor__group-icon"},ne.default.createElement(de.Icon,{icon:e.icon})),H(l,e.label)),ne.default.createElement(de.ToggablePanel.Contents,null,Re(e).map(c=>ne.default.createElement(Io,{key:`${o?.contextPath??"new"}-${c.id}`,item:c,node:o,value:c.id==="_nodeType"?o?.nodeType:t[c.id],hooks:r[c.id]?.hooks,isChanged:!!r[c.id],onChange:n,renderSecondaryInspector:a,validationErrors:d[c.id]}))))};var Do=({inspected:e,isLoading:o,renderSecondaryInspector:t})=>{let{i18nRegistry:r,t:s}=R();return G.default.createElement("div",{className:"sitegeist-resource-reference-editor__inspector"},G.default.createElement("div",{className:"sitegeist-resource-reference-editor__inspector-body"},e.node?e.tabs.length===0?G.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},s("inspector.noConfiguration","This node type has no inspector configuration.")):G.default.createElement(ue.Tabs,{className:"sitegeist-resource-reference-editor__tabs"},e.tabs.map(n=>G.default.createElement(ue.Tabs.Panel,{key:n.id,id:n.id,icon:n.icon,tooltip:H(r,n.label)},n.groups.map(a=>G.default.createElement(Eo,{key:a.id,group:a,node:e.node,values:e.values,draft:e.draft,isOpen:e.isPanelOpen(a.id,a.collapsed),onToggle:()=>e.togglePanel(a.id),onChange:e.change,renderSecondaryInspector:t,validationErrors:e.validationErrors}))))):G.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},s("inspector.empty","Select a resource to edit its properties."))),e.node&&G.default.createElement("div",{className:"sitegeist-resource-reference-editor__inspector-footer"},G.default.createElement(ue.Button,{type:"button",style:"lighter",disabled:o||!e.hasChanges,onClick:e.discard},s("action.discard","Discard")),G.default.createElement(ue.Button,{type:"button",style:"success",disabled:o||!e.hasChanges,onClick:e.save},s("action.apply","Apply"))))};var Ne=f(S());var P=f(S()),Q=f($());var Oo=({resource:e,isActive:o,isReferenced:t,isSelecting:r,isSelected:s,isUsable:i,depth:n,onOpen:a,onToggleSelection:d,onToggleReference:l})=>{let{nodeTypesRegistry:c,i18nRegistry:p,t:u}=R(),b=c.getNodeType(e.nodeType),N=r?d:a,C=P.default.useRef(null);return P.default.useEffect(()=>{o&&C.current?.scrollIntoView({block:"nearest"})},[o]),P.default.createElement("div",{ref:C,role:"button",tabIndex:0,className:["sitegeist-resource-reference-editor__item",o&&!r?"sitegeist-resource-reference-editor__item--active":"",r&&s?"sitegeist-resource-reference-editor__item--selected":"",se(e)?"sitegeist-resource-reference-editor__item--hidden":"",n>0?"sitegeist-resource-reference-editor__item--child":""].join(" "),style:n>0?{marginLeft:`${n*20}px`}:void 0,onClick:N,onKeyDown:g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),N())}},r&&P.default.createElement("span",{className:"sitegeist-resource-reference-editor__item-select"},P.default.createElement(Q.CheckBox,{isChecked:s,onChange:d})),P.default.createElement(Q.Icon,{icon:b?.ui?.icon??"file"}),P.default.createElement("div",{className:"sitegeist-resource-reference-editor__item-label"},P.default.createElement("strong",{className:e.label?"":"sitegeist-resource-reference-editor__item-unnamed"},e.label||H(p,b?.ui?.label)||e.identifier),P.default.createElement("small",null,H(p,b?.ui?.label)||e.nodeType)),P.default.createElement("span",{className:"sitegeist-resource-reference-editor__item-actions"+(r?" sitegeist-resource-reference-editor__item-actions--inert":"")},se(e)&&P.default.createElement("span",{className:"sitegeist-resource-reference-editor__hidden-badge",title:u("resource.hiddenTitle","This resource is hidden")},P.default.createElement(Q.Icon,{icon:"eye-slash"})," ",u("resource.hidden","Hidden")),i&&P.default.createElement("button",{type:"button",className:"sitegeist-resource-reference-editor__use"+(t?" sitegeist-resource-reference-editor__use--active":""),onClick:g=>{g.stopPropagation(),l()}},t?P.default.createElement(P.default.Fragment,null,P.default.createElement("span",{className:"sitegeist-resource-reference-editor__use-state"},P.default.createElement(Q.Icon,{icon:"check"})," ",u("action.inUse","In use")),P.default.createElement("span",{className:"sitegeist-resource-reference-editor__use-action"},P.default.createElement(Q.Icon,{icon:"times"})," ",u("action.remove","Remove"))):P.default.createElement(P.default.Fragment,null,P.default.createElement(Q.Icon,{icon:"plus"})," ",u("action.use","Use")))))};var Uo=({rows:e,isLoading:o,activeContextPath:t,referencedIdentifiers:r,isSelecting:s,selection:i,usableNodeTypes:n,onOpen:a,onToggleSelection:d,onToggleReference:l})=>{let{nodeTypesRegistry:c,t:p}=R();return Ne.default.createElement("div",{className:"sitegeist-resource-reference-editor__list"},e.length===0&&Ne.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},o?p("list.loading","Loading\u2026"):p("list.empty","No resources found.")),e.map(u=>Ne.default.createElement(Oo,{key:u.resource.contextPath,resource:u.resource,depth:u.depth,isActive:t===u.resource.contextPath,isReferenced:r.includes(u.resource.identifier),isSelecting:s,isSelected:i.includes(u.resource.contextPath),isUsable:we(c,u.resource.nodeType,n),onOpen:()=>a(u.resource),onToggleSelection:()=>d(u.resource),onToggleReference:()=>l(u.resource.identifier)})))};var X=f(S()),pe=f($());var F=f(S()),ie=f($());var Bo=({groups:e,isDisabled:o,onCreate:t})=>{let{t:r}=R(),[s,i]=F.default.useState(!1),n=F.default.useRef(null),a=e.flatMap(c=>c.options);F.default.useEffect(()=>{if(!s)return;let c=u=>{n.current?.contains(u.target)||i(!1)},p=u=>{u.key==="Escape"&&(u.stopPropagation(),i(!1))};return document.addEventListener("mousedown",c),document.addEventListener("keydown",p,!0),()=>{document.removeEventListener("mousedown",c),document.removeEventListener("keydown",p,!0)}},[s]);let d=c=>{i(!1),t(c)},l=c=>F.default.createElement("button",{key:(c.parentContextPath??"")+c.nodeTypeName,type:"button",role:"menuitem",className:"sitegeist-resource-reference-editor__create-option",onClick:()=>d(c)},F.default.createElement(ie.Icon,{icon:c.icon??"file"})," ",c.label);return a.length<=1?F.default.createElement(ie.Button,{type:"button",style:"lighter",disabled:o||a.length===0,title:a[0]?.label,onClick:()=>a[0]&&d(a[0])},F.default.createElement(ie.Icon,{icon:"plus"})," ",r("action.new","New")):F.default.createElement("div",{className:"sitegeist-resource-reference-editor__create-menu",ref:n},F.default.createElement(ie.Button,{type:"button",style:"lighter",disabled:o,"aria-haspopup":"menu","aria-expanded":s,onClick:()=>i(c=>!c)},F.default.createElement(ie.Icon,{icon:"plus"})," ",r("action.new","New")),s&&F.default.createElement("div",{className:"sitegeist-resource-reference-editor__create-options",role:"menu"},e.map(c=>F.default.createElement(F.default.Fragment,{key:c.label??""},c.label&&F.default.createElement("span",{className:"sitegeist-resource-reference-editor__create-section"},c.label),c.options.map(l)))))};var Ao=({filter:e,onFilter:o,isLoading:t,isSelecting:r,canSelect:s,createGroups:i,onCreate:n,onEnterSelection:a,onLeaveSelection:d})=>{let{t:l}=R();return X.default.createElement("div",{className:"sitegeist-resource-reference-editor__toolbar"},X.default.createElement("input",{className:"sitegeist-resource-reference-editor__search",type:"search",value:e,placeholder:l("list.search","Filter resources"),onChange:c=>o(c.currentTarget.value)}),X.default.createElement(Bo,{groups:i,isDisabled:t,onCreate:n}),r?X.default.createElement(pe.Button,{type:"button",style:"lighter",onClick:d},X.default.createElement(pe.Icon,{icon:"check"})," ",l("action.done","Done")):X.default.createElement(pe.Button,{type:"button",style:"lighter",disabled:t||!s,onClick:a},X.default.createElement(pe.Icon,{icon:"list-check"})," ",l("action.selectMultiple","Select multiple")))};var Fo=({isOpen:e,onClose:o,collection:t,tree:r,inspected:s,selection:i,references:n,actions:a,creationType:d,usableNodeTypes:l,renderSecondaryInspector:c})=>{let{nodeTypesRegistry:p,i18nRegistry:u,t:b}=R(),[N,C]=q.default.useState(""),g=N.trim().toLocaleLowerCase(),k=g===""?r.rows:r.rows.filter(v=>(v.resource.label??"").toLocaleLowerCase().includes(g)),D=k.map(v=>v.resource),J=v=>we(p,v.nodeType,l),L=i.selected.filter(J),j=s.node?r.rows.find(v=>v.resource.contextPath===s.node.contextPath)??null:null,I=j?.resource??null,x=i.isSelecting?i.selected:I?[I]:[],T=j?[...j.ancestors,j.resource].map(v=>v.label):[],w=p.getNodeType(d),_=v=>eo(p,u,v.nodeType).map(B=>({...B,parentContextPath:v.contextPath})),m=v=>b("action.createIn","In \u201C{name}\u201D",{name:v}),h=i.isSelecting?null:j,y=h?.ancestors[h.ancestors.length-1]??null,V=[y?{label:m(y.label),options:_(y)}:{options:[{nodeTypeName:d,label:H(u,w?.ui?.label)||d,icon:w?.ui?.icon}]},...h?[{label:m(h.resource.label),options:_(h.resource)}]:[]].filter(v=>v.options.length>0);return q.default.createElement(ke.Dialog,{isOpen:e,title:"",style:"jumbo",onRequestClose:o,actions:[q.default.createElement(ko,{key:"actions",targets:x,selectableResources:D,selection:i.selection,isSelecting:i.isSelecting,isLoading:t.isLoading,isMultiple:n.isMultiple,path:T,canUseSelection:L.length>0,selectionIsReferenced:L.length>0&&L.every(v=>n.referenced.includes(v.identifier)),onDuplicate:()=>a.duplicate(x),onSetHidden:v=>a.setHidden(x,v),onDelete:()=>a.requestRemoval(x),onSetSelection:i.setSelection,onUseSelection:()=>{n.addMany(L.map(v=>v.identifier)),i.leave()},onUnuseSelection:()=>{n.drop(L.map(v=>v.identifier)),i.leave()}}),q.default.createElement(ke.Button,{key:"close",type:"button",onClick:o},b("action.close","Close"))]},q.default.createElement("div",{className:"sitegeist-resource-reference-editor__layout"},q.default.createElement("div",{className:"sitegeist-resource-reference-editor__content"},t.error&&q.default.createElement("div",{className:"sitegeist-resource-reference-editor__state sitegeist-resource-reference-editor__error"},t.error),q.default.createElement(Ao,{filter:N,onFilter:C,isLoading:t.isLoading,isSelecting:i.isSelecting,canSelect:D.length>0,createGroups:V,onCreate:v=>a.create(v.parentContextPath?{parentContextPath:v.parentContextPath,nodeTypeName:v.nodeTypeName}:void 0),onEnterSelection:()=>i.enter(I?[I.contextPath]:[]),onLeaveSelection:i.leave}),q.default.createElement(Uo,{rows:k,usableNodeTypes:l,isLoading:t.isLoading,activeContextPath:s.node?.contextPath,referencedIdentifiers:n.referenced,isSelecting:i.isSelecting,selection:i.selection,onOpen:s.inspect,onToggleSelection:i.toggle,onToggleReference:n.toggle})),q.default.createElement(Do,{inspected:s,isLoading:t.isLoading,renderSecondaryInspector:c})))};var _e=f(S()),ge=f($());var Lo=({children:e,onClose:o})=>{let{t}=R();return _e.default.createElement(ge.Dialog,{isOpen:!0,title:"",style:"jumbo",onRequestClose:o,actions:[_e.default.createElement(ge.Button,{key:"close",type:"button",style:"lighter",onClick:o},_e.default.createElement(ge.Icon,{icon:"times"})," ",t("action.close","Close"))]},_e.default.createElement("div",{className:"sitegeist-resource-reference-editor__secondary"},e))};var Ho=({ReferenceEditor:e,ReferencesEditor:o,...t})=>{let{i18nRegistry:r,nodeTypesRegistry:s,t:i}=R(),[n,a]=U.default.useState(!1),d=t.options.resourceCreation,l=wo(),c=xo(t.options,t.neos?.routes),p=_o(c,t.neos?.routes),u=Ro(p.rows.map(w=>w.resource)),b=go(t),N=uo(c,l.close),C=()=>a(!0),g=vo(t,c,b,u,N,C,w=>p.reveal(w)),k=async()=>{C(),await c.run(()=>c.reload())},D=()=>{l.close(),a(!1)},J=w=>{if(!b.isMultiple)return w.closest('[class*="selectBoxHeader"]')&&b.referenced.length===1?b.referenced[0]:null;let _=w.closest('[class*="selectedOptions__innerPreview"]')?.closest("li"),m=_?.parentElement;return!_||!m?null:b.referenced[Array.prototype.indexOf.call(m.children,_)]??null},L=w=>{let _=w.target;if(!_||_.closest("input, button"))return;let m=J(_);m&&(w.preventDefault(),w.stopPropagation(),C(),c.run(async()=>{let{resources:h}=await c.reload(),y=h.find(V=>V.identifier===m);y&&await N.inspect(y)}))},{resourceCreation:j,...I}=t.options,x=t.options.nodeTypes??[d.type],T=x.length===1?H(r,s.getNodeType(x[0])?.ui?.label):"";return U.default.createElement(U.default.Fragment,null,U.default.createElement("style",null,Co),U.default.createElement("div",{className:"sitegeist-resource-reference-editor__reference",style:{"--sitegeist-resource-type":JSON.stringify(T)},onClickCapture:L},b.isMultiple&&o?U.default.createElement(o,{key:c.version,...t,options:I}):U.default.createElement(e,{key:c.version,...t,options:I})),U.default.createElement("div",{className:"sitegeist-resource-reference-editor__actions"},U.default.createElement(fe.Button,{className:"sitegeist-resource-reference-editor__create",type:"button",style:"lighter",disabled:t.options.disabled||c.isLoading,onClick:g.create,title:d.buttonLabel??i("action.createNew","Create new"),"aria-label":d.buttonLabel??i("action.createNew","Create new")},U.default.createElement(fe.Icon,{icon:"plus"})),U.default.createElement(fe.Button,{type:"button",style:"lighter",disabled:t.options.disabled||c.isLoading,onClick:k},U.default.createElement(fe.Icon,{icon:"list"})," ",i("action.showAll","Show all"))),U.default.createElement(Fo,{isOpen:n,onClose:D,collection:c,tree:p,inspected:N,selection:u,references:b,actions:g,creationType:d.type,usableNodeTypes:x,renderSecondaryInspector:l.render}),g.pendingRemoval&&U.default.createElement(No,{resources:g.pendingRemoval,usage:g.pendingRemovalUsage,onCancel:g.cancelRemoval,onHideInstead:w=>{g.cancelRemoval(),g.setHidden(w,!0)},onConfirm:g.remove}),l.secondaryInspector&&U.default.createElement(Lo,{onClose:l.close},l.secondaryInspector.element))};je("Sitegeist.ResourceReferenceEditor",{},(e,{store:o})=>{let t=e.get("inspector"),r=t?.get("editors"),s=t?.get("saveHooks"),i=e.get("validators"),n=r?.get("Neos.Neos/Inspector/Editors/ReferenceEditor"),a=r?.get("Neos.Neos/Inspector/Editors/ReferencesEditor"),d=e.get("@neos-project/neos-ui-contentrepository"),l=e.get("i18n");if(!r||!n?.component||!d){console.warn("[Sitegeist.ResourceReferenceEditor] Required Neos UI registries are missing.");return}e.get("sagas")?.set("Sitegeist.ResourceReferenceEditor/CreationDialog",{saga:qe});let c={store:o,globalRegistry:e,nodeTypesRegistry:d,saveHooksRegistry:s,validatorsRegistry:i,i18nRegistry:l};r.set("Sitegeist.ResourceReferenceEditor/Inspector/Editors/ResourceReferenceEditor",{component:p=>Fe.default.createElement(Xe,{registries:c},Fe.default.createElement(Ho,{...p,ReferenceEditor:n.component,ReferencesEditor:a?.component}))})});})();
//# sourceMappingURL=Plugin.js.map
