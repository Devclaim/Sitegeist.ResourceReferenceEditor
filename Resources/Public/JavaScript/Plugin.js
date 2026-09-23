(()=>{var Oo=Object.create;var xt=Object.defineProperty;var Ao=Object.getOwnPropertyDescriptor;var Bo=Object.getOwnPropertyNames;var Mo=Object.getPrototypeOf,Uo=Object.prototype.hasOwnProperty;var Lo=(e,t)=>()=>(e&&(t=e(e=0)),t);var De=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Fo=(e,t,o,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Bo(t))!Uo.call(e,n)&&n!==o&&xt(e,n,{get:()=>t[n],enumerable:!(r=Ao(t,n))||r.enumerable});return e};var R=(e,t,o)=>(o=e!=null?Oo(Mo(e)):{},Fo(t||!e||!e.__esModule?xt(o,"default",{value:e,enumerable:!0}):o,e));function j(e){return(...t)=>{if(window["@Neos:HostPluginAPI"]&&window["@Neos:HostPluginAPI"][`@${e}`])return window["@Neos:HostPluginAPI"][`@${e}`](...t);throw new Error("You are trying to read from a consumer api that hasn't been initialized yet!")}}var ie=Lo(()=>{});var M=De((lr,_t)=>{ie();_t.exports=j("vendor")().React});var me=De((br,Nt)=>{ie();Nt.exports=j("NeosProjectPackages")().NeosUiReduxStore});var Ct=De((xr,kt)=>{ie();kt.exports=j("vendor")().reduxSagaEffects});var J=De((kr,Et)=>{ie();Et.exports=j("NeosProjectPackages")().ReactUiComponents});var po=De((Bn,uo)=>{ie();uo.exports=j("NeosProjectPackages")().NeosUiEditors});var wt=R(M());ie();var jo=j("manifest"),Rt=jo,{SynchronousRegistry:pr,SynchronousMetaRegistry:fr}=j("NeosProjectPackages")().NeosUiRegistry;ie();var q=j("NeosProjectPackages")().NeosUiBackendConnectorDefault,{fetchWithErrorHandling:hr}=j("NeosProjectPackages")().NeosUiBackendConnector;var he=R(me()),Je=R(Ct()),Xe=null,Pt=e=>{let t=Xe;Xe=null,t&&e(t)},Tt=async(e,t,o,r)=>{let[n]=await q.get().q([r]).get();return n&&e.dispatch(he.actions.CR.Nodes.merge({[n.contextPath]:n})),new Promise(i=>{Xe={apply:s=>i(s),cancel:()=>i(null)},e.dispatch(he.actions.UI.NodeCreationDialog.open(t?.ui?.label??o,t?.ui?.creationDialog??{elements:{}},r,o))})};function*St(){yield(0,Je.takeEvery)(he.actionTypes.UI.NodeCreationDialog.APPLY,e=>Pt(t=>t.apply(e?.payload??{}))),yield(0,Je.takeEvery)([he.actionTypes.UI.NodeCreationDialog.CANCEL,he.actionTypes.UI.NodeCreationDialog.BACK],()=>Pt(e=>e.cancel()))}var V=R(M()),Ee=R(J());var Oe=R(M());var It="Sitegeist.ResourceReferenceEditor",Dt="Main",Y=(e,t)=>t?e?.translate?e.translate(t):t:"",Ho=(e,t,o,r)=>e?.translate?e.translate(`${It}:${Dt}:${t}`,o,r,It,Dt):o,Ot=e=>(t,o,r)=>Ho(e,t,o,r);var At=Oe.default.createContext(null),Bt=({registries:e,children:t})=>{let o=Oe.default.useMemo(()=>({...e,t:Ot(e.i18nRegistry)}),[e]);return Oe.default.createElement(At.Provider,{value:o},t)},D=()=>{let e=Oe.default.useContext(At);if(!e)throw new Error("[Sitegeist.ResourceReferenceEditor] The Neos UI registries are only available below RegistriesProvider.");return e};var Z=R(M());var et=R(me());var Ae=R(me()),Wo=["Neos.Neos.Ui:UpdateNodeInfo","Neos.Neos.Ui:UpdateNodePreviewUrl","Neos.Neos.Ui:UpdateWorkspaceInfo","Neos.Neos.Ui:Success","Neos.Neos.Ui:Info","Neos.Neos.Ui:Warning","Neos.Neos.Ui:Error"],Mt=(e,t)=>{if(typeof t!="string")return;let o=e.getState(),r=Ae.selectors.CR.Nodes.focusedNodePathSelector(o),n=o?.ui?.inspector?.valuesByNodePath?.[r]??{},i=Object.keys(n).filter(s=>n[s]!==void 0);i.length===1&&i[0]===t&&e.dispatch(Ae.actions.UI.Inspector.apply())},ae=(e,t)=>{let o=(t?.feedbacks??[]).filter(r=>Wo.includes(r?.type));o.length>0&&e.dispatch(Ae.actions.ServerFeedback.handleServerFeedback({feedbacks:o}))},Ut=(e,t)=>(e?.feedbacks??[]).find(r=>r?.type==="Neos.Neos.Ui:UpdateNodeInfo")?.payload?.byContextPath?.[t]??null;var Qe=R(me()),Be=async e=>{let t=q.get().endpoints?.syncWorkspace;if(!t)return;let o=e.getState(),r=Qe.selectors.CR.Workspaces.personalWorkspaceNameSelector(o);if(typeof r!="string"||r==="")return;let n=await t(r,!1,Qe.selectors.CR.ContentDimensions.active(o));if(n&&typeof n=="object"&&"conflicts"in n)throw new Error("Your workspace could not be brought up to date with the live workspace, because some of your changes conflict with it. Resolve the conflicts from the workspace dialog, then try again.");if(n&&typeof n=="object"&&"error"in n)throw new Error(n.error?.message??"Your workspace could not be brought up to date with the live workspace.")};var $o="Sitegeist.ResourceReferenceEditor:Resource",ze=(e,t,o)=>o.some(r=>e.isOfType?.(t,r)??t===r),zo=(e,t)=>!!e.isOfType?.(t,$o),Lt=(e,t,o)=>(e.getAllowedChildNodeTypes?.(o)??[]).map(r=>({name:r,nodeType:e.getNodeType(r)})).filter(({name:r,nodeType:n})=>!!n&&n.abstract!==!0&&zo(e,r)).map(({name:r,nodeType:n})=>({nodeTypeName:r,label:Y(t,n?.ui?.label)||r,icon:n?.ui?.icon})).sort((r,n)=>r.label.localeCompare(n.label)),Ge=e=>(e.items??[]).filter(t=>t.type==="editor"&&t.editor&&t.hidden!==!0),Ft=(e,t)=>(e.getInspectorViewConfigurationFor(t)?.tabs??[]).map(r=>({...r,groups:(r.groups??[]).filter(n=>Ge(n).length>0)})).filter(r=>r.groups.length>0),jt=e=>{switch(e){case"integer":case"float":return 0;case"boolean":return!1;case"array":return[];default:return""}},Ht=e=>Object.entries(e?.ui?.creationDialog?.elements??{}).filter(([,t])=>t?.ui?.editor&&t?.ui?.hidden!==!0).map(([t,o])=>({type:"editor",id:t,dataType:o.type,label:o.ui?.label??t,editor:o.ui.editor,editorOptions:o.ui.editorOptions,helpMessage:o.ui?.help,defaultValue:o.defaultValue,validation:o.validation})),Wt=(e,t)=>{if(!Array.isArray(e.requiredProperties))return["(stale editor configuration - flush the Neos caches)"];let o=new Set(t.map(r=>r.id));return[...e.unsupportedRequiredProperties??[],...e.requiredProperties.filter(r=>!o.has(r.name)).map(r=>r.name)]},$t=(e,t)=>e?.properties?.[t]??e?.references?.[t],zt=e=>e.flatMap(t=>t.groups.flatMap(o=>Ge(o)));var Ze=async(e,t,o)=>{if(!t)return e;let r=e;for(let[n,i]of Object.entries(t)){let s=o?.get(n);if(!s)throw new Error(`There is no registered save hook function for identifier ${n}`);r=await s(r,i)}return r},Gt=async(e,t)=>{let o={};for(let[r,n]of Object.entries(e))o[r]=await Ze(n.value,n.hooks,t);return o};var Vt=(e,t,o,r)=>{let n={};for(let i of e){let s=$t(t,i.id)?.validation;if(!s)continue;let c=Object.keys(s).map(a=>{let d=r?.get(a);return d?d(o[i.id],s[a]):(console.warn(`[Sitegeist.ResourceReferenceEditor] Validator ${a} not found`),null)}).filter(Boolean);c.length>0&&(n[i.id]=c)}return n},Ve=e=>{if(e instanceof Error)return e.message;if(typeof e=="string")return e;let t=e?.message??e?.error;if(typeof t=="string")return t;try{return JSON.stringify(e)}catch{return String(e)}};var ce="live",de=(e,t)=>{if(!t)return e;try{let o=JSON.parse(e);return o?.workspaceName===t?e:JSON.stringify({...o,workspaceName:t})}catch{return e}};var qt=(e,t)=>{let{store:o,nodeTypesRegistry:r,saveHooksRegistry:n,validatorsRegistry:i}=D(),[s,c]=Z.default.useState(null),[a,d]=Z.default.useState([]),[u,p]=Z.default.useState({}),[f,m]=Z.default.useState({}),[k,x]=Z.default.useState({}),[N,C]=Z.default.useState({}),O=r.getNodeType(s?.nodeType),B=zt(a),E=Object.keys(f).length>0,I=()=>{m({}),p({}),x({}),t()},P=Z.default.useRef(null),h=Z.default.useRef(f);h.current=f;let W=(g,y)=>{o.dispatch(et.actions.CR.Nodes.merge({[g.contextPath]:g}));let S=y?Object.fromEntries(Object.entries(h.current).map(([v,U])=>[v,U.value])):{};c(g),d(Ft(r,g.nodeType)),p({...g.properties??{},...S})},l=async(g,y)=>{if(!y?.force&&P.current===g.contextPath)return;P.current=g.contextPath,I(),e.setError(null);let S=y?.force?null:o.getState()?.cr?.nodes?.byContextPath?.[g.contextPath];S&&W(S,!1);try{let[v]=await q.get().q([g.contextPath]).get();if(P.current!==g.contextPath)return;let U=v??S??g;if(S&&JSON.stringify(U)===JSON.stringify(S))return;W(U,!!S)}catch(v){if(P.current!==g.contextPath)return;S||(P.current=null),e.setError(Ve(v))}};return{node:s,nodeType:O,tabs:a,values:u,draft:f,hasChanges:E,validationErrors:k,isPanelOpen:(g,y)=>!!N[g]==!!y,togglePanel:g=>C(y=>({...y,[g]:!y[g]})),inspect:l,forget:()=>{P.current=null,c(null),d([]),I()},change:(g,y,S)=>{let v=s?.properties?.[g],U=!S&&(v===y||JSON.stringify(v)===JSON.stringify(y));m(L=>{if(U){let{[g]:ge,...Ie}=L;return Ie}return{...L,[g]:{value:y,hooks:S}}}),p(L=>({...L,[g]:y})),x(L=>{if(!L[g])return L;let{[g]:ge,...Ie}=L;return Ie})},patchProperty:(g,y)=>{c(S=>S&&{...S,properties:{...S.properties,[g]:y}}),p(S=>({...S,[g]:y}))},save:async()=>{if(!s)return;let g=Vt(B,O,u,i);x(g),!(Object.keys(g).length>0)&&(t(),await e.run(async()=>{let y=await Gt(f,n),S=de(s.contextPath,ce),v=Object.entries(y).map(([ge,Ie])=>({type:"Neos.Neos.Ui:Property",subject:S,payload:{propertyName:ge,value:Ie}}));if(v.length===0){m({});return}let U=await q.get().endpoints.change(v);ae(o,U),m({});let L=Ut(U,S);L&&(e.patch(S,{label:L.label,properties:L.properties,tags:L.tags}),W(L,!1)),await Be(o),e.touch(),o.dispatch(et.actions.UI.ContentCanvas.reload()),!L&&(await e.reload(),await l(s,{force:!0}))},"save"))},discard:()=>{t(),m({}),x({}),p({...s?.properties??{}})}}};var Yt=R(M()),Kt=e=>{let t=!!e.options.multiple,{value:o,commit:r}=e,n=Yt.default.useMemo(()=>Array.isArray(o)?o:o?[o]:[],[o]),i=d=>{if(!t){r(d);return}let u=Array.isArray(o)?o:[];u.includes(d)||r([...u,d])},s=d=>{if(!t){d.length>0&&r(d[0]);return}let u=Array.isArray(o)?o:[],p=d.filter(f=>!u.includes(f));p.length>0&&r([...u,...p])},c=d=>{let u=new Set(d);if(t||Array.isArray(o)){let p=Array.isArray(o)?o:[],f=p.filter(m=>!u.has(m));f.length!==p.length&&r(f);return}typeof o=="string"&&u.has(o)&&r("")};return{referenced:n,isMultiple:t,add:i,addMany:s,drop:c,toggle:d=>{if(n.includes(d)){c([d]);return}i(d)}}};var rt=R(M());var Zt=R(me());var qe=R(me()),tt=e=>{let t=e?.core?.service?.nodes;return typeof t!="string"?"":t.replace(/\/neos\/service\/nodes\/?$/,"")},Jt=async(e,t,o)=>{let r=e.getState(),n=r?.cr?.nodes?.documentNode??qe.selectors.CR.Nodes.focusedNodePathSelector(r);if(typeof n!="string")throw new Error("The node of the current editing session could not be resolved.");let i=new URLSearchParams({node:n,collection:t.collection});t.buttonLabel&&i.append("title",t.buttonLabel);let s=await fetch(`${tt(o)}/neos/service/data-source/sitegeist-resource-collections?${i.toString()}`,{credentials:"include",headers:{Accept:"application/json"}}),c=await s.text();if(!s.ok)throw new Error(`The resource collection "${t.collection}" could not be resolved (HTTP ${s.status}). ${c.slice(0,500)}`);let a=null;try{a=JSON.parse(c)}catch{throw new Error(`The resource collection data source did not answer with JSON: ${c.slice(0,500)}`)}let d=a?.contextPath??a?.data?.contextPath;if(typeof d!="string")throw new Error(`The resource collection "${t.collection}" has no node address: ${c.slice(0,500)}`);return{contextPath:d}},Xt=async(e,t,o)=>{if(o.length===0)return{};let r=e.getState(),n=r?.cr?.nodes?.documentNode??qe.selectors.CR.Nodes.focusedNodePathSelector(r);if(typeof n!="string")return{};let i=new URLSearchParams({node:n,nodes:o.join(",")}),s=await fetch(`${tt(t)}/neos/service/data-source/sitegeist-resource-usage?${i.toString()}`,{credentials:"include",headers:{Accept:"application/json"}});if(!s.ok)return{};try{let c=await s.json();return c?.data??c??{}}catch{return{}}},Qt=async(e,t,o,r)=>ot(e,t,r,{nodeTypes:o.nodeTypes??[o.resourceCreation.type]}),ot=async(e,t,o,r={})=>{let n=e.getState(),i=n?.cr?.nodes?.documentNode??qe.selectors.CR.Nodes.focusedNodePathSelector(n);if(typeof i!="string")return[];let s=new URLSearchParams({node:i,parent:o});r.nodeTypes?.length&&s.append("nodeTypes",r.nodeTypes.join(","));let c=await fetch(`${tt(t)}/neos/service/data-source/sitegeist-resource-children?${s.toString()}`,{credentials:"include",headers:{Accept:"application/json"}}),a=await c.text();if(!c.ok)throw new Error(`The children of the resource could not be read (HTTP ${c.status}). `+a.slice(0,500));let d=JSON.parse(a);return d?.data??d??[]};var eo=(e,t,o,r,n,i,s,c)=>{let{store:a,nodeTypesRegistry:d,saveHooksRegistry:u,t:p}=D(),f=e.options.resourceCreation,[m,k]=rt.default.useState(null),[x,N]=rt.default.useState(null),C=async l=>{i(),t.setError(null);let b=l?.nodeTypeName??f.type,w=d.getNodeType(b),_=Ht(w);if(!l){let y=Wt(f,_);if(y.length>0){t.setError(p("error.creationBlocked","{type} cannot be created here: {properties} must be provided on creation. Give these properties a default value, make them nullable, or promote them to the creation dialog (showInCreationDialog).",{type:b,properties:y.join(", ")}));return}}let T=l?.parentContextPath??(t.container??(await t.reload()).container).contextPath;if(_.length===0){await O({},b,T,!l);return}let g=await Tt(a,w,b,T);g!==null&&await O(g,b,T,!l)},O=async(l,b,w,_)=>{let T={};for(let[g,y]of Object.entries(l))T[g]=await Ze(y.value,y.hooks,u);if(_)for(let g of f.requiredProperties??[])(T[g.name]===void 0||T[g.name]===null)&&(T[g.name]=jt(g.type));await t.run(async()=>{let g=await q.get().endpoints.change([{type:"Neos.Neos.Ui:CreateInto",subject:w,payload:{nodeType:b,data:T}}]);ae(a,g);let y=(g?.feedbacks??[]).find(ge=>ge?.type==="Neos.Neos.Ui:NodeCreated")?.payload;if(!y?.identifier)throw new Error(p("error.creationFailed","The resource could not be created."));_&&(await Be(a),o.add(y.identifier),Mt(a,e.identifier)),t.touch();let[{resources:S},v]=await Promise.all([t.reload(),_?Promise.resolve(null):s(w)]),L=(v??S).find(ge=>ge.identifier===y.identifier);L&&await n.inspect(L)},"create")};return{create:C,move:async(l,b,w,_)=>{l.contextPath!==b.contextPath&&(t.reorder(l.contextPath,b.contextPath,w),c(l.contextPath,b.contextPath,w),await t.run(async()=>{try{let T=await q.get().endpoints.change([{type:w==="before"?"Neos.Neos.Ui:MoveBefore":"Neos.Neos.Ui:MoveAfter",subject:de(l.contextPath,ce),payload:{siblingDomAddress:{contextPath:de(b.contextPath,ce)}}}]);if(ae(a,T),!(T?.feedbacks??[]).some(y=>y?.type==="Neos.Neos.Ui:UpdateNodeInfo"))throw new Error(p("error.moveFailed","The resource could not be moved."))}catch(T){throw await Promise.all([t.reload(),_?s(_):Promise.resolve([])]),T}},"move"))},duplicate:async l=>{l.length!==0&&await t.run(async()=>{let b=t.container??(await t.reload()).container,w=await q.get().endpoints.change(l.map(y=>({type:"Neos.Neos.Ui:CopyInto",subject:de(y.contextPath,ce),payload:{parentContextPath:b.contextPath}})));ae(a,w);let _=(w?.feedbacks??[]).filter(y=>y?.type==="Neos.Neos.Ui:NodeCreated").map(y=>y?.payload?.identifier).filter(Boolean);t.touch();let{resources:T}=await t.reload(),g=T.find(y=>y.identifier===_[_.length-1]);r.leave(),g&&await n.inspect(g)},"duplicate")},setHidden:async(l,b)=>{l.length!==0&&await t.run(async()=>{let w=await q.get().endpoints.change(l.map(_=>({type:"Neos.Neos.Ui:Property",subject:de(_.contextPath,ce),payload:{propertyName:"_hidden",value:b}})));ae(a,w),l.forEach(_=>t.patch(_.contextPath,{hidden:b})),n.node&&l.some(_=>_.contextPath===n.node.contextPath)&&n.patchProperty("_hidden",b),await Be(a),t.touch(),a.dispatch(Zt.actions.UI.ContentCanvas.reload())},"hide")},requestRemoval:async l=>{if(l.length!==0){N(null),k(l);try{N(await Xt(a,e.neos?.routes,l.map(b=>b.identifier)))}catch{N({})}}},remove:async l=>{k(null),await t.run(async()=>{let b=await q.get().endpoints.change(l.map(_=>({type:"Neos.Neos.Ui:RemoveNode",subject:de(_.contextPath,ce),payload:{}})));ae(a,b),t.touch(),o.drop(l.map(_=>_.identifier));let w=l.map(_=>_.contextPath);r.forget(w),r.selection.length>0&&l.length>=r.selection.length&&r.leave(),n.node&&w.includes(n.node.contextPath)&&n.forget(),await t.reload()},"delete")},cancelRemoval:()=>k(null),pendingRemoval:m,pendingRemovalUsage:x}};var K=R(M());var to=e=>{let t=e?.get?.("dataLoaders")?.get?.("NodeLookup");t&&(t._lruCache=null)};var nt=(e,t,o,r)=>{let n=e.findIndex(c=>c.contextPath===t);if(n<0||!e.some(c=>c.contextPath===o))return null;let i=e.filter((c,a)=>a!==n),s=i.findIndex(c=>c.contextPath===o);return i.splice(r==="before"?s:s+1,0,e[n]),i},st=(e,t,o,r)=>nt(e,t,o,r)??e.map(n=>n.children?{...n,children:st(n.children,t,o,r)}:n);var oo=(e,t,o)=>e.map(r=>r.contextPath===t?{...r,...o}:r.children?{...r,children:oo(r.children,t,o)}:r),ro=(e,t)=>{let{store:o,globalRegistry:r}=D(),n=e.resourceCreation,[i,s]=K.default.useState(null),[c,a]=K.default.useState([]),[d,u]=K.default.useState(!1),[p,f]=K.default.useState(null),[m,k]=K.default.useState(null),[x,N]=K.default.useState(0),C=K.default.useRef(null),O=K.default.useCallback(async()=>{let E=`${o.getState()?.cr?.nodes?.documentNode??""}|${n.collection}`,I=C.current?.key===E?C.current.container:await Jt(o,n,t);C.current={key:E,container:I};let P=await Qt(o,t,e,I.contextPath);return s(I),a(P),{container:I,resources:P}},[n,e,t,o]),B=K.default.useCallback(async(E,I)=>{u(!0),f(I??null),k(null);try{return await E()}catch(P){k(Ve(P));return}finally{u(!1),f(null)}},[]);return{container:i,resources:c,isLoading:d,activity:p,error:m,setError:k,reload:O,run:B,version:x,touch:K.default.useCallback(()=>{to(r),N(E=>E+1)},[r]),patch:K.default.useCallback((E,I)=>a(P=>oo(P,E,I)),[]),reorder:K.default.useCallback((E,I,P)=>a(h=>st(h,E,I,P)),[])}};var Me=R(M());var no=(e,t)=>{let{store:o}=D(),[r,n]=Me.default.useState({}),i=Me.default.useRef(new Set),s=Me.default.useCallback(async f=>{let m=await ot(o,t,f);return n(k=>({...k,[f]:m})),m},[t,o]),c=f=>r[f.contextPath]??f.children,a=[],d=(f,m,k)=>f.flatMap(x=>{let N={resource:x,depth:m,ancestors:k},C=c(x);return C?C.length>0?[N,...d(C,m+1,[...k,x])]:[N]:(x.childCount&&a.push(x.contextPath),[N])}),u=d(e.resources,0,[]),p=a.join("|");return Me.default.useEffect(()=>{let f=a.filter(m=>!i.current.has(m));f.length!==0&&(f.forEach(m=>i.current.add(m)),e.run(async()=>{for(let m of f)await s(m)}))},[p,s]),{rows:u,reveal:async f=>(i.current.add(f),s(f)),reorder:(f,m,k)=>n(x=>Object.fromEntries(Object.entries(x).map(([N,C])=>[N,nt(C,f,m,k)??C])))}};var Ue=R(M()),so=()=>{let[e,t]=Ue.default.useState(null),o=Ue.default.useRef(null),r=Ue.default.useCallback(()=>{o.current=null,t(null)},[]),n=Ue.default.useCallback((i,s)=>{if(!i||!s||o.current===i){r();return}o.current=i,t({id:i,element:s()})},[r]);return{secondaryInspector:e,render:n,close:r}};var Re=R(M()),io=e=>{let[t,o]=Re.default.useState(!1),[r,n]=Re.default.useState([]),i=Re.default.useCallback(()=>{o(!1),n([])},[]),s=Re.default.useCallback(a=>{n(d=>d.includes(a.contextPath)?d.filter(u=>u!==a.contextPath):[...d,a.contextPath])},[]),c=Re.default.useCallback(a=>{n(d=>d.filter(u=>!a.includes(u)))},[]);return{isSelecting:t,enter:(a=[])=>{n(a),o(!0)},leave:i,selection:r,selected:e.filter(a=>r.includes(a.contextPath)),toggle:s,pick:(a,d=[])=>{if(t){s(a);return}n([...d.filter(u=>u!==a.contextPath),a.contextPath]),o(!0)},setSelection:n,forget:c}};var ao=`
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
    /*
     * The row being dragged moves through the list with the others while the browser
     * shows its picture under the pointer - it is marked as the gap it will fill.
     */
    .sitegeist-resource-reference-editor__item--dragged {
        opacity: 0.35;
        outline: 1px dashed var(--colors-PrimaryBlue, #00adee);
        outline-offset: -1px;
    }
    .sitegeist-resource-reference-editor__item[draggable="true"]:active {
        cursor: grabbing;
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
`;var $=R(M()),ee=R(J());var ye=e=>!!e?.hidden||!!e?.tags?.disabled||!!e?.properties?._hidden;var co=({resources:e,usage:t,onCancel:o,onHideInstead:r,onConfirm:n})=>{let{nodeTypesRegistry:i,t:s}=D(),c=e.every(a=>!!i.getNodeType(a.nodeType)?.properties?._hidden)&&!e.every(ye);return $.default.createElement(ee.Dialog,{isOpen:!0,type:"warn",style:"narrow",title:e.length===1?s("removal.titleOne","Delete this resource?"):s("removal.title","Delete {count} resources?",{count:e.length}),onRequestClose:o,actions:[$.default.createElement(ee.Button,{key:"cancel",type:"button",onClick:o},s("action.cancel","Cancel")),c?$.default.createElement(ee.Button,{key:"hide",type:"button",style:"lighter",onClick:()=>r(e)},$.default.createElement(ee.Icon,{icon:"eye-slash"})," ",s("action.hideInstead","Hide instead")):null,$.default.createElement(ee.Button,{key:"delete",type:"button",style:"error",hoverStyle:"error",onClick:()=>n(e)},$.default.createElement(ee.Icon,{icon:"trash"})," ",s("action.delete","Delete"))].filter(Boolean)},$.default.createElement("div",{className:"sitegeist-resource-reference-editor__confirmation"},$.default.createElement("ul",null,e.map(a=>{let d=t?.[a.identifier];return $.default.createElement("li",{key:a.contextPath},$.default.createElement("strong",null,a.label||a.identifier),t===null&&$.default.createElement("small",null,s("removal.checking","Checking references\u2026")),d&&d.count>0&&$.default.createElement("small",null,d.count===1?s("removal.referencedOnce","Referenced once"):s("removal.referenced","Referenced {count} times",{count:d.count}),d.documents.length>0?`: ${d.documents.join(", ")}`:""),t!==null&&!d?.count&&$.default.createElement("small",null,s("removal.notReferenced","Not referenced")))})),$.default.createElement("p",null,s("removal.explanation","Deleting removes the resource from the collection, and every document that references it loses that reference. Hiding it instead keeps those references intact."))))};var H=R(M()),$e=R(J());var F=R(M()),te=R(J());var it=R(M()),at=R(J()),ve=({icon:e,isBusy:t})=>t?it.default.createElement(at.Icon,{icon:"spinner",className:"sitegeist-resource-reference-editor__spinner"}):it.default.createElement(at.Icon,{icon:e});var lo=({targets:e,selectableResources:t,selection:o,isSelecting:r,isLoading:n,activity:i,isMultiple:s,canUseSelection:c,selectionIsReferenced:a,path:d,onDuplicate:u,onSetHidden:p,onDelete:f,onSetSelection:m,onUseSelection:k,onUnuseSelection:x})=>{let{nodeTypesRegistry:N,t:C}=D(),O=e.length>0&&e.every(h=>!h.tethered),B=O&&e.every(ye),E=O&&e.every(h=>!!N.getNodeType(h.nodeType)?.properties?._hidden),I=t.length>0&&t.every(h=>o.includes(h.contextPath)),P=()=>r?o.length>0?C("selection.count","{count} selected",{count:o.length}):C("selection.hint","Click the resources to select them"):d.length>0?d.join(" \u203A "):C("action.noTarget","No resource selected");return F.default.createElement("div",{className:"sitegeist-resource-reference-editor__footer"},F.default.createElement("span",{className:"sitegeist-resource-reference-editor__footer-target"+(O?"":" sitegeist-resource-reference-editor__footer-target--empty")},P()),F.default.createElement("div",{className:"sitegeist-resource-reference-editor__footer-actions"},r&&F.default.createElement(te.Button,{type:"button",style:"lighter",disabled:n||t.length===0,onClick:()=>m(I?[]:t.map(h=>h.contextPath))},I?C("action.deselectAll","Deselect all"):C("action.selectAll","Select all")),F.default.createElement(te.Button,{type:"button",style:"lighter",disabled:n||!O,onClick:u},F.default.createElement(ve,{icon:"clone",isBusy:i==="duplicate"})," ",C("action.duplicate","Duplicate")),F.default.createElement(te.Button,{type:"button",style:"lighter",disabled:n||!E,onClick:()=>p(!B)},F.default.createElement(ve,{icon:B?"eye":"eye-slash",isBusy:i==="hide"})," ",B?C("action.show","Show"):C("action.hide","Hide")),r&&s&&F.default.createElement(te.Button,{className:"sitegeist-resource-reference-editor__bulk-use"+(a?" sitegeist-resource-reference-editor__bulk-use--remove":""),type:"button",style:"lighter",disabled:n||!c,onClick:a?x:k},a?F.default.createElement(F.default.Fragment,null,F.default.createElement(te.Icon,{icon:"times"})," ",C("action.remove","Remove")):F.default.createElement(F.default.Fragment,null,F.default.createElement(te.Icon,{icon:"check"})," ",C("action.use","Use"))),F.default.createElement(te.Button,{type:"button",style:"error",hoverStyle:"error",disabled:n||!O,onClick:f},F.default.createElement(ve,{icon:"trash",isBusy:i==="delete"})," ",C("action.delete","Delete"))))};var X=R(M()),ke=R(J());var be=R(M()),Ne=R(J());var ct=R(M()),fo=R(po()),go=({item:e,node:t,value:o,hooks:r,isChanged:n,onChange:i,renderSecondaryInspector:s,validationErrors:c})=>ct.default.createElement("div",{className:"sitegeist-resource-reference-editor__field"},ct.default.createElement(fo.EditorEnvelope,{identifier:e.id,label:e.label??e.id,editor:e.editor,options:e.editorOptions,value:o,hooks:r??null,node:t,propertyName:e.id,commit:(a,d)=>i(e.id,a,d),renderSecondaryInspector:s,validationErrors:c,helpMessage:e.helpMessage,helpThumbnail:e.helpThumbnail,highlight:!!n}));var Go={panel__headline:"sitegeist-resource-reference-editor__group-label"},mo=({group:e,node:t,values:o,draft:r,isOpen:n,onToggle:i,onChange:s,renderSecondaryInspector:c,validationErrors:a})=>{let{i18nRegistry:d}=D();return be.default.createElement(Ne.ToggablePanel,{isOpen:n,onPanelToggle:i,className:"sitegeist-resource-reference-editor__group"},be.default.createElement(Ne.ToggablePanel.Header,{theme:Go},e.icon&&be.default.createElement("div",{className:"sitegeist-resource-reference-editor__group-icon"},be.default.createElement(Ne.Icon,{icon:e.icon})),Y(d,e.label)),be.default.createElement(Ne.ToggablePanel.Contents,null,Ge(e).map(u=>be.default.createElement(go,{key:`${t?.contextPath??"new"}-${u.id}`,item:u,node:t,value:u.id==="_nodeType"?t?.nodeType:o[u.id],hooks:r[u.id]?.hooks,isChanged:!!r[u.id],onChange:s,renderSecondaryInspector:c,validationErrors:a[u.id]}))))};var ho=({inspected:e,isLoading:t,renderSecondaryInspector:o})=>{let{i18nRegistry:r,t:n}=D();return X.default.createElement("div",{className:"sitegeist-resource-reference-editor__inspector"},X.default.createElement("div",{className:"sitegeist-resource-reference-editor__inspector-body"},e.node?e.tabs.length===0?X.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},n("inspector.noConfiguration","This node type has no inspector configuration.")):X.default.createElement(ke.Tabs,{className:"sitegeist-resource-reference-editor__tabs"},e.tabs.map(s=>X.default.createElement(ke.Tabs.Panel,{key:s.id,id:s.id,icon:s.icon,tooltip:Y(r,s.label)},s.groups.map(c=>X.default.createElement(mo,{key:c.id,group:c,node:e.node,values:e.values,draft:e.draft,isOpen:e.isPanelOpen(c.id,c.collapsed),onToggle:()=>e.togglePanel(c.id),onChange:e.change,renderSecondaryInspector:o,validationErrors:e.validationErrors}))))):X.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},n("inspector.empty","Select a resource to edit its properties."))),e.node&&X.default.createElement("div",{className:"sitegeist-resource-reference-editor__inspector-footer"},X.default.createElement(ke.Button,{type:"button",style:"lighter",disabled:t||!e.hasChanges,onClick:e.discard},n("action.discard","Discard")),X.default.createElement(ke.Button,{type:"button",style:"success",disabled:t||!e.hasChanges,onClick:e.save},n("action.apply","Apply"))))};var se=R(M());var ut=new Set,z=new WeakMap,xe=new WeakMap,ne=new WeakMap,Le=new WeakMap,dt=new WeakMap,pt=new WeakMap,we=new WeakMap,Pe=new WeakMap,Ce=new WeakSet,le,gt=0,mt=0,re="__aa_tgt",Fe="__aa_del",Ye="__aa_new",bo=e=>{let t=Jo(e);t&&t.forEach(o=>Xo(o))},Vo=e=>{e.forEach(t=>{t.target===le&&Yo(),z.has(t.target)&&_e(t.target)})};function qo(e){let t=Le.get(e);t?.disconnect();let o=z.get(e),r=0,n=5;o||(o=Te(e),z.set(e,o));let{offsetWidth:i,offsetHeight:s}=le,a=[o.top-n,i-(o.left+n+o.width),s-(o.top+n+o.height),o.left-n].map(u=>`${-1*Math.floor(u)}px`).join(" "),d=new IntersectionObserver(()=>{++r>1&&_e(e)},{root:le,threshold:1,rootMargin:a});d.observe(e),Le.set(e,d)}function _e(e){clearTimeout(Pe.get(e));let t=Ke(e),o=je(t)?500:t.duration;Pe.set(e,setTimeout(async()=>{let r=ne.get(e);try{await r?.finished,z.set(e,Te(e)),qo(e)}catch{}},o))}function Yo(){clearTimeout(Pe.get(le)),Pe.set(le,setTimeout(()=>{ut.forEach(e=>ft(e,t=>wo(()=>_e(t))))},100))}function Ko(e){setTimeout(()=>{pt.set(e,setInterval(()=>wo(_e.bind(null,e)),2e3))},Math.round(2e3*Math.random()))}function wo(e){typeof requestIdleCallback=="function"?requestIdleCallback(()=>e()):requestAnimationFrame(()=>e())}var oe,xo=typeof window<"u"&&"ResizeObserver"in window;xo&&(le=document.documentElement,new MutationObserver(bo),oe=new ResizeObserver(Vo),window.addEventListener("scroll",()=>{mt=window.scrollY,gt=window.scrollX}),oe.observe(le));function Jo(e){return e.reduce((r,n)=>[...r,...Array.from(n.addedNodes),...Array.from(n.removedNodes)],[]).every(r=>r.nodeName==="#comment")?!1:e.reduce((r,n)=>{if(r===!1)return!1;if(n.target instanceof Element){if(lt(n.target),!r.has(n.target)){r.add(n.target);for(let i=0;i<n.target.children.length;i++){let s=n.target.children.item(i);if(s){if(Fe in s)return!1;lt(n.target,s),r.add(s)}}}if(n.removedNodes.length)for(let i=0;i<n.removedNodes.length;i++){let s=n.removedNodes[i];if(Fe in s)return!1;s instanceof Element&&(r.add(s),lt(n.target,s),xe.set(s,[n.previousSibling,n.nextSibling]))}}return r},new Set)}function lt(e,t){!t&&!(re in e)?Object.defineProperty(e,re,{value:e}):t&&!(re in t)&&Object.defineProperty(t,re,{value:e})}function Xo(e){var t;let o=e.isConnected,r=z.has(e);o&&xe.has(e)&&xe.delete(e),ne.has(e)&&((t=ne.get(e))===null||t===void 0||t.cancel()),Ye in e?yo(e):r&&o?Zo(e):r&&!o?er(e):yo(e)}function Q(e){return Number(e.replace(/[^0-9.\-]/g,""))}function Qo(e){let t=e.parentElement;for(;t;){if(t.scrollLeft||t.scrollTop)return{x:t.scrollLeft,y:t.scrollTop};t=t.parentElement}return{x:0,y:0}}function Te(e){let t=e.getBoundingClientRect(),{x:o,y:r}=Qo(e);return{top:t.top+r,left:t.left+o,width:t.width,height:t.height}}function _o(e,t,o){let r=t.width,n=t.height,i=o.width,s=o.height,c=getComputedStyle(e);if(c.getPropertyValue("box-sizing")==="content-box"){let d=Q(c.paddingTop)+Q(c.paddingBottom)+Q(c.borderTopWidth)+Q(c.borderBottomWidth),u=Q(c.paddingLeft)+Q(c.paddingRight)+Q(c.borderRightWidth)+Q(c.borderLeftWidth);r-=u,i-=u,n-=d,s-=d}return[r,i,n,s].map(Math.round)}function Ke(e){return re in e&&we.has(e[re])?we.get(e[re]):{duration:250,easing:"ease-in-out"}}function Ro(e){if(re in e)return e[re]}function ht(e){let t=Ro(e);return t?Ce.has(t):!1}function ft(e,...t){t.forEach(o=>o(e,we.has(e)));for(let o=0;o<e.children.length;o++){let r=e.children.item(o);r&&t.forEach(n=>n(r,we.has(r)))}}function yt(e){return Array.isArray(e)?e:[e]}function je(e){return typeof e=="function"}function Zo(e){let t=z.get(e),o=Te(e);if(!ht(e))return z.set(e,o);let r;if(!t)return;let n=Ke(e);if(typeof n!="function"){let i=t.left-o.left,s=t.top-o.top,[c,a,d,u]=_o(e,t,o),p={transform:`translate(${i}px, ${s}px)`},f={transform:"translate(0, 0)"};c!==a&&(p.width=`${c}px`,f.width=`${a}px`),d!==u&&(p.height=`${d}px`,f.height=`${u}px`),r=e.animate([p,f],{duration:n.duration,easing:n.easing})}else{let[i]=yt(n(e,"remain",t,o));r=new Animation(i),r.play()}ne.set(e,r),z.set(e,o),r.addEventListener("finish",()=>_e(e),{once:!0})}function yo(e){Ye in e&&delete e[Ye];let t=Te(e);z.set(e,t);let o=Ke(e);if(!ht(e))return;let r;if(typeof o!="function")r=e.animate([{transform:"scale(.98)",opacity:0},{transform:"scale(0.98)",opacity:0,offset:.5},{transform:"scale(1)",opacity:1}],{duration:o.duration*1.5,easing:"ease-in"});else{let[n]=yt(o(e,"add",t));r=new Animation(n),r.play()}ne.set(e,r),r.addEventListener("finish",()=>_e(e),{once:!0})}function vo(e,t){var o;e.remove(),z.delete(e),xe.delete(e),ne.delete(e),(o=Le.get(e))===null||o===void 0||o.disconnect(),setTimeout(()=>{if(Fe in e&&delete e[Fe],Object.defineProperty(e,Ye,{value:!0,configurable:!0}),t&&e instanceof HTMLElement)for(let r in t)e.style[r]=""},0)}function er(e){var t;if(!xe.has(e)||!z.has(e))return;let[o,r]=xe.get(e);Object.defineProperty(e,Fe,{value:!0,configurable:!0});let n=window.scrollX,i=window.scrollY;if(r&&r.parentNode&&r.parentNode instanceof Element?r.parentNode.insertBefore(e,r):o&&o.parentNode?o.parentNode.appendChild(e):(t=Ro(e))===null||t===void 0||t.appendChild(e),!ht(e))return vo(e);let[s,c,a,d]=or(e),u=Ke(e),p=z.get(e);(n!==gt||i!==mt)&&tr(e,n,i,u);let f,m={position:"absolute",top:`${s}px`,left:`${c}px`,width:`${a}px`,height:`${d}px`,margin:"0",pointerEvents:"none",transformOrigin:"center",zIndex:"100"};if(!je(u))Object.assign(e.style,m),f=e.animate([{transform:"scale(1)",opacity:1},{transform:"scale(.98)",opacity:0}],{duration:u.duration,easing:"ease-out"});else{let[k,x]=yt(u(e,"remove",p));x?.styleReset!==!1&&(m=x?.styleReset||m,Object.assign(e.style,m)),f=new Animation(k),f.play()}ne.set(e,f),f.addEventListener("finish",()=>vo(e,m),{once:!0})}function tr(e,t,o,r){let n=gt-t,i=mt-o,s=document.documentElement.style.scrollBehavior;if(getComputedStyle(le).scrollBehavior==="smooth"&&(document.documentElement.style.scrollBehavior="auto"),window.scrollTo(window.scrollX+n,window.scrollY+i),!e.parentElement)return;let a=e.parentElement,d=a.clientHeight,u=a.clientWidth,p=performance.now();function f(){requestAnimationFrame(()=>{if(!je(r)){let m=d-a.clientHeight,k=u-a.clientWidth;p+r.duration>performance.now()?(window.scrollTo({left:window.scrollX-k,top:window.scrollY-m}),d=a.clientHeight,u=a.clientWidth,f()):document.documentElement.style.scrollBehavior=s}})}f()}function or(e){let t=z.get(e),[o,,r]=_o(e,t,Te(e)),n=e.parentElement;for(;n&&(getComputedStyle(n).position==="static"||n instanceof HTMLBodyElement);)n=n.parentElement;n||(n=document.body);let i=getComputedStyle(n),s=z.get(n)||Te(n),c=Math.round(t.top-s.top)-Q(i.borderTopWidth),a=Math.round(t.left-s.left)-Q(i.borderLeftWidth);return[c,a,o,r]}function No(e,t={}){if(xo&&oe&&!(window.matchMedia("(prefers-reduced-motion: reduce)").matches&&!je(t)&&!t.disrespectUserMotionPreference)){Ce.add(e),getComputedStyle(e).position==="static"&&Object.assign(e.style,{position:"relative"}),ft(e,_e,Ko,s=>oe?.observe(s)),je(t)?we.set(e,t):we.set(e,{duration:250,easing:"ease-in-out",...t});let i=new MutationObserver(bo);i.observe(e,{childList:!0}),dt.set(e,i),ut.add(e)}return Object.freeze({parent:e,enable:()=>{Ce.add(e)},disable:()=>{Ce.delete(e)},isEnabled:()=>Ce.has(e),destroy:()=>{Ce.delete(e),ut.delete(e),we.delete(e);let r=dt.get(e);r?.disconnect(),dt.delete(e),ft(e,n=>{oe?.unobserve(n);let i=ne.get(n);try{i?.cancel()}catch{}ne.delete(n);let s=Le.get(n);s?.disconnect(),Le.delete(n);let c=pt.get(n);c&&clearInterval(c),pt.delete(n);let a=Pe.get(n);a&&clearTimeout(a),Pe.delete(n),z.delete(n),xe.delete(n)})}})}var A=R(M()),ue=R(J());var vt=20,ko=({resource:e,isActive:t,isReferenced:o,isSelecting:r,isSelected:n,isUsable:i,depth:s,guides:c,onOpen:a,onToggleSelection:d,onPick:u,onToggleReference:p,isDraggable:f,isDragged:m,onDragStart:k,onDragEnd:x,onMoveByKey:N})=>{let{nodeTypesRegistry:C,i18nRegistry:O,t:B}=D(),E=C.getNodeType(e.nodeType),I=r?d:a,P=A.default.useRef(null);return A.default.useEffect(()=>{t&&P.current?.scrollIntoView({block:"nearest"})},[t]),A.default.createElement("div",{ref:P,role:"button",tabIndex:0,className:["sitegeist-resource-reference-editor__item",t&&!r?"sitegeist-resource-reference-editor__item--active":"",r&&n?"sitegeist-resource-reference-editor__item--selected":"",ye(e)?"sitegeist-resource-reference-editor__item--hidden":"",s>0?"sitegeist-resource-reference-editor__item--child":"",m?"sitegeist-resource-reference-editor__item--dragged":""].join(" "),"data-context-path":e.contextPath,draggable:f,onDragStart:h=>{h.dataTransfer.effectAllowed="move",h.dataTransfer.setData("text/plain",e.label??""),k(h.clientY)},onDragEnd:x,style:s>0?{marginLeft:`${s*vt}px`}:void 0,onMouseDown:h=>{h.shiftKey&&h.preventDefault()},onClick:h=>h.shiftKey?u():I(),onKeyDown:h=>{if(h.altKey&&(h.key==="ArrowUp"||h.key==="ArrowDown")){h.preventDefault(),N(h.key==="ArrowUp"?-1:1);return}(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),I())}},c.map(h=>A.default.createElement("span",{key:h.level,"aria-hidden":"true",className:"sitegeist-resource-reference-editor__guide"+(h.isEnd?" sitegeist-resource-reference-editor__guide--end":""),style:{left:`${-((s-h.level)*vt)-vt/2}px`}})),r&&A.default.createElement("span",{className:"sitegeist-resource-reference-editor__item-select"},A.default.createElement(ue.CheckBox,{isChecked:n,onChange:d})),A.default.createElement(ue.Icon,{icon:E?.ui?.icon??"file"}),A.default.createElement("div",{className:"sitegeist-resource-reference-editor__item-label"},A.default.createElement("strong",{className:e.label?"":"sitegeist-resource-reference-editor__item-unnamed"},e.label||Y(O,E?.ui?.label)||e.identifier),A.default.createElement("small",null,Y(O,E?.ui?.label)||e.nodeType)),A.default.createElement("span",{className:"sitegeist-resource-reference-editor__item-actions"+(r?" sitegeist-resource-reference-editor__item-actions--inert":"")},ye(e)&&A.default.createElement("span",{className:"sitegeist-resource-reference-editor__hidden-badge",title:B("resource.hiddenTitle","This resource is hidden")},A.default.createElement(ue.Icon,{icon:"eye-slash"})," ",B("resource.hidden","Hidden")),i&&A.default.createElement("button",{type:"button",className:"sitegeist-resource-reference-editor__use"+(o?" sitegeist-resource-reference-editor__use--active":""),onClick:h=>{h.stopPropagation(),p()}},o?A.default.createElement(A.default.Fragment,null,A.default.createElement("span",{className:"sitegeist-resource-reference-editor__use-state"},A.default.createElement(ue.Icon,{icon:"check"})," ",B("action.inUse","In use")),A.default.createElement("span",{className:"sitegeist-resource-reference-editor__use-action"},A.default.createElement(ue.Icon,{icon:"times"})," ",B("action.remove","Remove"))):A.default.createElement(A.default.Fragment,null,A.default.createElement(ue.Icon,{icon:"plus"})," ",B("action.use","Use")))))};var rr=(e,t)=>{let{depth:o}=e[t],r=[];for(let n=1;n<=o;n++){let i=!1;for(let s=t+1;s<e.length&&e[s].depth>=n;s++)if(e[s].depth===n){i=!0;break}i?r.push({level:n,isEnd:!1}):n===o&&r.push({level:n,isEnd:!0})}return r},He=e=>e.ancestors[e.ancestors.length-1]?.contextPath??null,Po=(e,t)=>e.depth===t.depth&&He(e)===He(t),Co=(e,t)=>{let o=t+1;for(;o<e.length&&e[o].depth>e[t].depth;)o++;return[t,o]},pe=(e,t)=>e.findIndex(o=>o.resource.contextPath===t),nr=(e,t,o,r)=>{let[n,i]=Co(e,pe(e,t)),s=e.slice(n,i),c=[...e.slice(0,n),...e.slice(i)],a=pe(c,o),d=r==="before"?a:Co(c,a)[1];return[...c.slice(0,d),...s,...c.slice(d)]},sr=4,ir=(e,t,o,r)=>{let n=e[pe(e,t)],i=e[pe(e,o)];if(!n||!i||t===o||!Po(i,n))return null;let s=pe(e,o)<pe(e,t);return s!==(r==="up")?null:nr(e,t,o,s?"before":"after")},bt=(e,t)=>e.filter(o=>Po(o,t)),To=({rows:e,isLoading:t,activeContextPath:o,referencedIdentifiers:r,isSelecting:n,selection:i,usableNodeTypes:s,onOpen:c,onToggleSelection:a,onPick:d,onToggleReference:u,canReorder:p,onMove:f})=>{let{nodeTypesRegistry:m,t:k}=D(),x=se.default.useRef(null),[N,C]=se.default.useState(null),[O,B]=se.default.useState(null),E=O??e,I=se.default.useRef({y:0,direction:null});se.default.useEffect(()=>{x.current&&No(x.current,{duration:160,easing:"ease-out"})},[]);let P=(l,b)=>{let w=l[pe(l,b)],_=e[pe(e,b)];if(!w||!_)return;let T=bt(e,_).map(U=>U.resource.contextPath),g=bt(l,w);if(T.join("|")===g.map(U=>U.resource.contextPath).join("|"))return;let y=g.findIndex(U=>U.resource.contextPath===b),S=g[y+1],v=g[y-1];S?f(w.resource,S.resource,"before",He(w)):v&&f(w.resource,v.resource,"after",He(w))},h=()=>{C(null),B(null)},W=(l,b)=>{let w=bt(e,l),_=w.findIndex(g=>g.resource.contextPath===l.resource.contextPath),T=w[_+b];T&&f(l.resource,T.resource,b<0?"before":"after",He(l))};return se.default.createElement("div",{ref:x,className:"sitegeist-resource-reference-editor__list",onDragOver:l=>{if(!N)return;l.preventDefault(),l.dataTransfer.dropEffect="move";let b=l.clientY-I.current.y;Math.abs(b)>=sr&&(I.current={y:l.clientY,direction:b<0?"up":"down"});let{direction:w}=I.current,_=l.target.closest?.("[data-context-path]")?.getAttribute("data-context-path");if(_&&w){let T=ir(E,N,_,w);T&&B(T)}},onDrop:l=>{l.preventDefault(),N&&O&&P(O,N),h()}},E.length===0&&se.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},t?k("list.loading","Loading\u2026"):k("list.empty","No resources found.")),E.map((l,b)=>se.default.createElement(ko,{key:l.resource.contextPath,resource:l.resource,depth:l.depth,guides:rr(E,b),isActive:o===l.resource.contextPath,isReferenced:r.includes(l.resource.identifier),isSelecting:n,isSelected:i.includes(l.resource.contextPath),isUsable:ze(m,l.resource.nodeType,s),isDraggable:p&&!l.resource.tethered,isDragged:N===l.resource.contextPath,onDragStart:w=>{I.current={y:w,direction:null},C(l.resource.contextPath),B(e)},onDragEnd:h,onMoveByKey:w=>{p&&!l.resource.tethered&&W(l,w)},onOpen:()=>c(l.resource),onToggleSelection:()=>a(l.resource),onPick:()=>d(l.resource),onToggleReference:()=>u(l.resource.identifier)})))};var fe=R(M()),Se=R(J());var G=R(M()),We=R(J());var So=({groups:e,isDisabled:t,isBusy:o,onCreate:r})=>{let{t:n}=D(),[i,s]=G.default.useState(!1),c=G.default.useRef(null),a=e.flatMap(p=>p.options);G.default.useEffect(()=>{if(!i)return;let p=m=>{c.current?.contains(m.target)||s(!1)},f=m=>{m.key==="Escape"&&(m.stopPropagation(),s(!1))};return document.addEventListener("mousedown",p),document.addEventListener("keydown",f,!0),()=>{document.removeEventListener("mousedown",p),document.removeEventListener("keydown",f,!0)}},[i]);let d=p=>{s(!1),r(p)},u=p=>G.default.createElement("button",{key:(p.parentContextPath??"")+p.nodeTypeName,type:"button",role:"menuitem",className:"sitegeist-resource-reference-editor__create-option",onClick:()=>d(p)},G.default.createElement(We.Icon,{icon:p.icon??"file"})," ",p.label);return a.length<=1?G.default.createElement(We.Button,{type:"button",style:"lighter",disabled:t||a.length===0,title:a[0]?.label,onClick:()=>a[0]&&d(a[0])},G.default.createElement(ve,{icon:"plus",isBusy:o})," ",n("action.new","New")):G.default.createElement("div",{className:"sitegeist-resource-reference-editor__create-menu",ref:c},G.default.createElement(We.Button,{type:"button",style:"lighter",disabled:t,"aria-haspopup":"menu","aria-expanded":i,onClick:()=>s(p=>!p)},G.default.createElement(ve,{icon:"plus",isBusy:o})," ",n("action.new","New")),i&&G.default.createElement("div",{className:"sitegeist-resource-reference-editor__create-options",role:"menu"},e.map(p=>G.default.createElement(G.default.Fragment,{key:p.label??""},p.label&&G.default.createElement("span",{className:"sitegeist-resource-reference-editor__create-section"},p.label),p.options.map(u)))))};var Eo=({filter:e,onFilter:t,isLoading:o,isCreating:r,isSelecting:n,canSelect:i,createGroups:s,onCreate:c,onEnterSelection:a,onLeaveSelection:d})=>{let{t:u}=D();return fe.default.createElement("div",{className:"sitegeist-resource-reference-editor__toolbar"},fe.default.createElement("input",{className:"sitegeist-resource-reference-editor__search",type:"search",value:e,placeholder:u("list.search","Filter resources"),onChange:p=>t(p.currentTarget.value)}),fe.default.createElement(So,{groups:s,isDisabled:o,isBusy:r,onCreate:c}),n?fe.default.createElement(Se.Button,{type:"button",style:"lighter",onClick:d},fe.default.createElement(Se.Icon,{icon:"check"})," ",u("action.done","Done")):fe.default.createElement(Se.Button,{type:"button",style:"lighter",disabled:o||!i,onClick:a},fe.default.createElement(Se.Icon,{icon:"list-check"})," ",u("action.selectMultiple","Select multiple")))};var Io=({isOpen:e,onClose:t,collection:o,tree:r,inspected:n,selection:i,references:s,actions:c,creationType:a,usableNodeTypes:d,renderSecondaryInspector:u,secondaryInspector:p,onCloseSecondaryInspector:f})=>{let{nodeTypesRegistry:m,i18nRegistry:k,t:x}=D(),[N,C]=H.default.useState(""),O=N.trim().toLocaleLowerCase(),B=O===""?r.rows:r.rows.filter(v=>(v.resource.label??"").toLocaleLowerCase().includes(O)),E=B.map(v=>v.resource),I=v=>ze(m,v.nodeType,d),P=i.selected.filter(I),h=n.node?r.rows.find(v=>v.resource.contextPath===n.node.contextPath)??null:null,W=h?.resource??null,l=i.isSelecting?i.selected:W?[W]:[],b=h?[...h.ancestors,h.resource].map(v=>v.label):[],w=m.getNodeType(a),_=v=>Lt(m,k,v.nodeType).map(U=>({...U,parentContextPath:v.contextPath})),T=v=>x("action.createIn","In \u201C{name}\u201D",{name:v}),g=i.isSelecting?null:h,y=g?.ancestors[g.ancestors.length-1]??null,S=[y?{label:T(y.label),options:_(y)}:{options:[{nodeTypeName:a,label:Y(k,w?.ui?.label)||a,icon:w?.ui?.icon}]},...g?[{label:T(g.resource.label),options:_(g.resource)}]:[]].filter(v=>v.options.length>0);return H.default.createElement($e.Dialog,{isOpen:e,title:"",style:"jumbo",onRequestClose:p?f:t,actions:[]},H.default.createElement("div",{className:"sitegeist-resource-reference-editor__layout"},H.default.createElement("button",{type:"button",className:"sitegeist-resource-reference-editor__close",title:x("action.close","Close"),"aria-label":x("action.close","Close"),onClick:t},H.default.createElement($e.Icon,{icon:"times"})),H.default.createElement("div",{className:"sitegeist-resource-reference-editor__content"},o.error&&H.default.createElement("div",{className:"sitegeist-resource-reference-editor__state sitegeist-resource-reference-editor__error"},o.error),H.default.createElement(Eo,{filter:N,onFilter:C,isLoading:o.isLoading,isCreating:o.activity==="create",isSelecting:i.isSelecting,canSelect:E.length>0,createGroups:S,onCreate:v=>c.create(v.parentContextPath?{parentContextPath:v.parentContextPath,nodeTypeName:v.nodeTypeName}:void 0),onEnterSelection:()=>i.enter(W?[W.contextPath]:[]),onLeaveSelection:i.leave}),H.default.createElement("div",{className:"sitegeist-resource-reference-editor__progress"+(o.isLoading?" sitegeist-resource-reference-editor__progress--active":""),"aria-hidden":"true"}),H.default.createElement(To,{rows:B,usableNodeTypes:d,isLoading:o.isLoading,activeContextPath:n.node?.contextPath,referencedIdentifiers:s.referenced,isSelecting:i.isSelecting,selection:i.selection,onOpen:n.inspect,onToggleSelection:i.toggle,onPick:v=>i.pick(v,W?[W.contextPath]:[]),onToggleReference:s.toggle,canReorder:O===""&&!i.isSelecting&&!o.isLoading,onMove:c.move}),H.default.createElement(lo,{targets:l,selectableResources:E,selection:i.selection,isSelecting:i.isSelecting,isLoading:o.isLoading,activity:o.activity,isMultiple:s.isMultiple,path:b,canUseSelection:P.length>0,selectionIsReferenced:P.length>0&&P.every(v=>s.referenced.includes(v.identifier)),onDuplicate:()=>c.duplicate(l),onSetHidden:v=>c.setHidden(l,v),onDelete:()=>c.requestRemoval(l),onSetSelection:i.setSelection,onUseSelection:()=>{s.addMany(P.map(v=>v.identifier)),i.leave()},onUnuseSelection:()=>{s.drop(P.map(v=>v.identifier)),i.leave()}})),p&&H.default.createElement("div",{className:"sitegeist-resource-reference-editor__secondary"},H.default.createElement("button",{type:"button",className:"sitegeist-resource-reference-editor__secondary-close",title:x("action.close","Close"),onClick:f},H.default.createElement($e.Icon,{icon:"times"})),p),H.default.createElement(ho,{inspected:n,isLoading:o.isLoading,renderSecondaryInspector:u})))};var Do=({ReferenceEditor:e,ReferencesEditor:t,...o})=>{let{i18nRegistry:r,nodeTypesRegistry:n,t:i}=D(),[s,c]=V.default.useState(!1),a=o.options.resourceCreation,d=so(),u=ro(o.options,o.neos?.routes),p=no(u,o.neos?.routes),f=io(p.rows.map(l=>l.resource)),m=Kt(o),k=qt(u,d.close),x=()=>c(!0),N=eo(o,u,m,f,k,x,l=>p.reveal(l),p.reorder),C=async()=>{x(),await u.run(()=>u.reload())},O=()=>{d.close(),c(!1)},B=l=>{if(!m.isMultiple)return l.closest('[class*="selectBoxHeader"]')&&m.referenced.length===1?m.referenced[0]:null;let b=l.closest('[class*="selectedOptions__innerPreview"]')?.closest("li"),w=b?.parentElement;return!b||!w?null:m.referenced[Array.prototype.indexOf.call(w.children,b)]??null},E=l=>{let b=l.target;if(!b||b.closest("input, button"))return;let w=B(b);if(!w)return;l.preventDefault(),l.stopPropagation(),x();let _=u.resources.find(T=>T.identifier===w);u.run(async()=>{if(_){await Promise.all([u.reload(),k.inspect(_)]);return}let{resources:T}=await u.reload(),g=T.find(y=>y.identifier===w);g&&await k.inspect(g)})},{resourceCreation:I,...P}=o.options,h=o.options.nodeTypes??[a.type],W=h.length===1?Y(r,n.getNodeType(h[0])?.ui?.label):"";return V.default.createElement(V.default.Fragment,null,V.default.createElement("style",null,ao),V.default.createElement("div",{className:"sitegeist-resource-reference-editor__reference",style:{"--sitegeist-resource-type":JSON.stringify(W)},onClickCapture:E},m.isMultiple&&t?V.default.createElement(t,{key:u.version,...o,options:P}):V.default.createElement(e,{key:u.version,...o,options:P})),V.default.createElement("div",{className:"sitegeist-resource-reference-editor__actions"},V.default.createElement(Ee.Button,{className:"sitegeist-resource-reference-editor__create",type:"button",style:"lighter",disabled:o.options.disabled||u.isLoading,onClick:N.create,title:a.buttonLabel??i("action.createNew","Create new"),"aria-label":a.buttonLabel??i("action.createNew","Create new")},V.default.createElement(Ee.Icon,{icon:"plus"})),V.default.createElement(Ee.Button,{type:"button",style:"lighter",disabled:o.options.disabled||u.isLoading,onClick:C},V.default.createElement(Ee.Icon,{icon:"list"})," ",i("action.showAll","Show all"))),V.default.createElement(Io,{isOpen:s,onClose:O,collection:u,tree:p,inspected:k,selection:f,references:m,actions:N,creationType:a.type,usableNodeTypes:h,renderSecondaryInspector:d.render,secondaryInspector:d.secondaryInspector?.element??null,onCloseSecondaryInspector:d.close}),N.pendingRemoval&&V.default.createElement(co,{resources:N.pendingRemoval,usage:N.pendingRemovalUsage,onCancel:N.cancelRemoval,onHideInstead:l=>{N.cancelRemoval(),N.setHidden(l,!0)},onConfirm:N.remove}))};Rt("Sitegeist.ResourceReferenceEditor",{},(e,{store:t})=>{let o=e.get("inspector"),r=o?.get("editors"),n=o?.get("saveHooks"),i=e.get("validators"),s=r?.get("Neos.Neos/Inspector/Editors/ReferenceEditor"),c=r?.get("Neos.Neos/Inspector/Editors/ReferencesEditor"),a=e.get("@neos-project/neos-ui-contentrepository"),d=e.get("i18n");if(!r||!s?.component||!a){console.warn("[Sitegeist.ResourceReferenceEditor] Required Neos UI registries are missing.");return}e.get("sagas")?.set("Sitegeist.ResourceReferenceEditor/CreationDialog",{saga:St});let u={store:t,globalRegistry:e,nodeTypesRegistry:a,saveHooksRegistry:n,validatorsRegistry:i,i18nRegistry:d};r.set("Sitegeist.ResourceReferenceEditor/Inspector/Editors/ResourceReferenceEditor",{component:p=>wt.default.createElement(Bt,{registries:u},wt.default.createElement(Do,{...p,ReferenceEditor:s.component,ReferencesEditor:c?.component}))})});})();
//# sourceMappingURL=Plugin.js.map
