(()=>{var Oo=Object.create;var xt=Object.defineProperty;var Mo=Object.getOwnPropertyDescriptor;var Bo=Object.getOwnPropertyNames;var Ao=Object.getPrototypeOf,Uo=Object.prototype.hasOwnProperty;var Lo=(e,t)=>()=>(e&&(t=e(e=0)),t);var De=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Fo=(e,t,o,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Bo(t))!Uo.call(e,n)&&n!==o&&xt(e,n,{get:()=>t[n],enumerable:!(r=Mo(t,n))||r.enumerable});return e};var R=(e,t,o)=>(o=e!=null?Oo(Ao(e)):{},Fo(t||!e||!e.__esModule?xt(o,"default",{value:e,enumerable:!0}):o,e));function W(e){return(...t)=>{if(window["@Neos:HostPluginAPI"]&&window["@Neos:HostPluginAPI"][`@${e}`])return window["@Neos:HostPluginAPI"][`@${e}`](...t);throw new Error("You are trying to read from a consumer api that hasn't been initialized yet!")}}var ae=Lo(()=>{});var L=De((dr,_t)=>{ae();_t.exports=W("vendor")().React});var he=De((br,Ct)=>{ae();Ct.exports=W("NeosProjectPackages")().NeosUiReduxStore});var kt=De((xr,Nt)=>{ae();Nt.exports=W("vendor")().reduxSagaEffects});var X=De((Nr,Et)=>{ae();Et.exports=W("NeosProjectPackages")().ReactUiComponents});var po=De((Bn,uo)=>{ae();uo.exports=W("NeosProjectPackages")().NeosUiEditors});var wt=R(L());ae();var jo=W("manifest"),Rt=jo,{SynchronousRegistry:pr,SynchronousMetaRegistry:fr}=W("NeosProjectPackages")().NeosUiRegistry;ae();var K=W("NeosProjectPackages")().NeosUiBackendConnectorDefault,{fetchWithErrorHandling:hr}=W("NeosProjectPackages")().NeosUiBackendConnector;var ye=R(he()),Je=R(kt()),Xe=null,Pt=e=>{let t=Xe;Xe=null,t&&e(t)},Tt=async(e,t,o,r)=>{let[n]=await K.get().q([r]).get();return n&&e.dispatch(ye.actions.CR.Nodes.merge({[n.contextPath]:n})),new Promise(s=>{Xe={apply:i=>s(i),cancel:()=>s(null)},e.dispatch(ye.actions.UI.NodeCreationDialog.open(t?.ui?.label??o,t?.ui?.creationDialog??{elements:{}},r,o))})};function*St(){yield(0,Je.takeEvery)(ye.actionTypes.UI.NodeCreationDialog.APPLY,e=>Pt(t=>t.apply(e?.payload??{}))),yield(0,Je.takeEvery)([ye.actionTypes.UI.NodeCreationDialog.CANCEL,ye.actionTypes.UI.NodeCreationDialog.BACK],()=>Pt(e=>e.cancel()))}var z=R(L()),Ie=R(X());var Oe=R(L());var It="Sitegeist.ResourceReferenceEditor",Dt="Main",J=(e,t)=>t?e?.translate?e.translate(t):t:"",Ho=(e,t,o,r)=>e?.translate?e.translate(`${It}:${Dt}:${t}`,o,r,It,Dt):o,Ot=e=>(t,o,r)=>Ho(e,t,o,r);var Mt=Oe.default.createContext(null),Bt=({registries:e,children:t})=>{let o=Oe.default.useMemo(()=>({...e,t:Ot(e.i18nRegistry)}),[e]);return Oe.default.createElement(Mt.Provider,{value:o},t)},I=()=>{let e=Oe.default.useContext(Mt);if(!e)throw new Error("[Sitegeist.ResourceReferenceEditor] The Neos UI registries are only available below RegistriesProvider.");return e};var ee=R(L());var et=R(he());var Me=R(he()),Wo=["Neos.Neos.Ui:UpdateNodeInfo","Neos.Neos.Ui:UpdateNodePreviewUrl","Neos.Neos.Ui:UpdateWorkspaceInfo","Neos.Neos.Ui:Success","Neos.Neos.Ui:Info","Neos.Neos.Ui:Warning","Neos.Neos.Ui:Error"],At=(e,t)=>{if(typeof t!="string")return;let o=e.getState(),r=Me.selectors.CR.Nodes.focusedNodePathSelector(o),n=o?.ui?.inspector?.valuesByNodePath?.[r]??{},s=Object.keys(n).filter(i=>n[i]!==void 0);s.length===1&&s[0]===t&&e.dispatch(Me.actions.UI.Inspector.apply())},ce=(e,t)=>{let o=(t?.feedbacks??[]).filter(r=>Wo.includes(r?.type));o.length>0&&e.dispatch(Me.actions.ServerFeedback.handleServerFeedback({feedbacks:o}))},Ut=(e,t)=>(e?.feedbacks??[]).find(r=>r?.type==="Neos.Neos.Ui:UpdateNodeInfo")?.payload?.byContextPath?.[t]??null;var Qe=R(he()),Be=async e=>{let t=K.get().endpoints?.syncWorkspace;if(!t)return;let o=e.getState(),r=Qe.selectors.CR.Workspaces.personalWorkspaceNameSelector(o);if(typeof r!="string"||r==="")return;let n=await t(r,!1,Qe.selectors.CR.ContentDimensions.active(o));if(n&&typeof n=="object"&&"conflicts"in n)throw new Error("Your workspace could not be brought up to date with the live workspace, because some of your changes conflict with it. Resolve the conflicts from the workspace dialog, then try again.");if(n&&typeof n=="object"&&"error"in n)throw new Error(n.error?.message??"Your workspace could not be brought up to date with the live workspace.")};var $o="Sitegeist.ResourceReferenceEditor:Resource",ze=(e,t,o)=>o.some(r=>e.isOfType?.(t,r)??t===r),zo=(e,t)=>!!e.isOfType?.(t,$o),Lt=(e,t,o)=>(e.getAllowedChildNodeTypes?.(o)??[]).map(r=>({name:r,nodeType:e.getNodeType(r)})).filter(({name:r,nodeType:n})=>!!n&&n.abstract!==!0&&zo(e,r)).map(({name:r,nodeType:n})=>({nodeTypeName:r,label:J(t,n?.ui?.label)||r,icon:n?.ui?.icon})).sort((r,n)=>r.label.localeCompare(n.label)),Ge=e=>(e.items??[]).filter(t=>t.type==="editor"&&t.editor&&t.hidden!==!0),Ft=(e,t)=>(e.getInspectorViewConfigurationFor(t)?.tabs??[]).map(r=>({...r,groups:(r.groups??[]).filter(n=>Ge(n).length>0)})).filter(r=>r.groups.length>0),jt=e=>{switch(e){case"integer":case"float":return 0;case"boolean":return!1;case"array":return[];default:return""}},Ht=e=>Object.entries(e?.ui?.creationDialog?.elements??{}).filter(([,t])=>t?.ui?.editor&&t?.ui?.hidden!==!0).map(([t,o])=>({type:"editor",id:t,dataType:o.type,label:o.ui?.label??t,editor:o.ui.editor,editorOptions:o.ui.editorOptions,helpMessage:o.ui?.help,defaultValue:o.defaultValue,validation:o.validation})),Wt=(e,t)=>{if(!Array.isArray(e.requiredProperties))return["(stale editor configuration - flush the Neos caches)"];let o=new Set(t.map(r=>r.id));return[...e.unsupportedRequiredProperties??[],...e.requiredProperties.filter(r=>!o.has(r.name)).map(r=>r.name)]},$t=(e,t)=>e?.properties?.[t]??e?.references?.[t],zt=e=>e.flatMap(t=>t.groups.flatMap(o=>Ge(o)));var Ze=async(e,t,o)=>{if(!t)return e;let r=e;for(let[n,s]of Object.entries(t)){let i=o?.get(n);if(!i)throw new Error(`There is no registered save hook function for identifier ${n}`);r=await i(r,s)}return r},Gt=async(e,t)=>{let o={};for(let[r,n]of Object.entries(e))o[r]=await Ze(n.value,n.hooks,t);return o};var Vt=(e,t,o,r)=>{let n={};for(let s of e){let i=$t(t,s.id)?.validation;if(!i)continue;let c=Object.keys(i).map(a=>{let l=r?.get(a);return l?l(o[s.id],i[a]):(console.warn(`[Sitegeist.ResourceReferenceEditor] Validator ${a} not found`),null)}).filter(Boolean);c.length>0&&(n[s.id]=c)}return n},Ve=e=>{if(e instanceof Error)return e.message;if(typeof e=="string")return e;let t=e?.message??e?.error;if(typeof t=="string")return t;try{return JSON.stringify(e)}catch{return String(e)}};var le="live",de=(e,t)=>{if(!t)return e;try{let o=JSON.parse(e);return o?.workspaceName===t?e:JSON.stringify({...o,workspaceName:t})}catch{return e}};var qt=(e,t)=>{let{store:o,nodeTypesRegistry:r,saveHooksRegistry:n,validatorsRegistry:s}=I(),[i,c]=ee.default.useState(null),[a,l]=ee.default.useState([]),[u,p]=ee.default.useState({}),[f,m]=ee.default.useState({}),[N,_]=ee.default.useState({}),[C,D]=ee.default.useState({}),O=r.getNodeType(i?.nodeType),S=zt(a),M=Object.keys(f).length>0,k=()=>{m({}),p({}),_({}),t()},P=ee.default.useRef(null),y=ee.default.useRef(f);y.current=f;let A=(g,v)=>{o.dispatch(et.actions.CR.Nodes.merge({[g.contextPath]:g}));let T=v?Object.fromEntries(Object.entries(y.current).map(([U,F])=>[U,F.value])):{};c(g),l(Ft(r,g.nodeType)),p({...g.properties??{},...T})},d=async(g,v)=>{if(!v?.force&&P.current===g.contextPath)return;P.current=g.contextPath,k(),e.setError(null);let T=v?.force?null:o.getState()?.cr?.nodes?.byContextPath?.[g.contextPath];T&&A(T,!1);try{let[U]=await K.get().q([g.contextPath]).get();if(P.current!==g.contextPath)return;let F=U??T??g;if(T&&JSON.stringify(F)===JSON.stringify(T))return;A(F,!!T)}catch(U){if(P.current!==g.contextPath)return;T||(P.current=null),e.setError(Ve(U))}};return{node:i,nodeType:O,tabs:a,values:u,draft:f,hasChanges:M,validationErrors:N,isPanelOpen:(g,v)=>!!C[g]==!!v,togglePanel:g=>D(v=>({...v,[g]:!v[g]})),inspect:d,forget:()=>{P.current=null,c(null),l([]),k()},change:(g,v,T)=>{let U=i?.properties?.[g],F=!T&&(U===v||JSON.stringify(U)===JSON.stringify(v));m(j=>{if(F){let{[g]:x,...me}=j;return me}return{...j,[g]:{value:v,hooks:T}}}),p(j=>({...j,[g]:v})),_(j=>{if(!j[g])return j;let{[g]:x,...me}=j;return me})},patchProperty:(g,v)=>{c(T=>T&&{...T,properties:{...T.properties,[g]:v}}),p(T=>({...T,[g]:v}))},save:async()=>{if(!i)return;let g=Vt(S,O,u,s);_(g),!(Object.keys(g).length>0)&&(t(),await e.run(async()=>{let v=await Gt(f,n),T=de(i.contextPath,le),U=Object.entries(v).map(([x,me])=>({type:"Neos.Neos.Ui:Property",subject:T,payload:{propertyName:x,value:me}}));if(U.length===0){m({});return}let F=await K.get().endpoints.change(U);ce(o,F),m({});let j=Ut(F,T);j&&(e.patch(T,{label:j.label,properties:j.properties,tags:j.tags}),A(j,!1)),await Be(o),e.touch(),o.dispatch(et.actions.UI.ContentCanvas.reload()),!j&&(await e.reload(),await d(i,{force:!0}))},"save"))},discard:()=>{t(),m({}),_({}),p({...i?.properties??{}})}}};var Yt=R(L()),Kt=e=>{let t=!!e.options.multiple,{value:o,commit:r}=e,n=Yt.default.useMemo(()=>Array.isArray(o)?o:o?[o]:[],[o]),s=l=>{if(!t){r(l);return}let u=Array.isArray(o)?o:[];u.includes(l)||r([...u,l])},i=l=>{if(!t){l.length>0&&r(l[0]);return}let u=Array.isArray(o)?o:[],p=l.filter(f=>!u.includes(f));p.length>0&&r([...u,...p])},c=l=>{let u=new Set(l);if(t||Array.isArray(o)){let p=Array.isArray(o)?o:[],f=p.filter(m=>!u.has(m));f.length!==p.length&&r(f);return}typeof o=="string"&&u.has(o)&&r("")};return{referenced:n,isMultiple:t,add:s,addMany:i,drop:c,toggle:l=>{if(n.includes(l)){c([l]);return}s(l)}}};var rt=R(L());var Zt=R(he());var qe=R(he()),tt=e=>{let t=e?.core?.service?.nodes;return typeof t!="string"?"":t.replace(/\/neos\/service\/nodes\/?$/,"")},Jt=async(e,t,o)=>{let r=e.getState(),n=r?.cr?.nodes?.documentNode??qe.selectors.CR.Nodes.focusedNodePathSelector(r);if(typeof n!="string")throw new Error("The node of the current editing session could not be resolved.");let s=new URLSearchParams({node:n,collection:t.collection});t.buttonLabel&&s.append("title",t.buttonLabel);let i=await fetch(`${tt(o)}/neos/service/data-source/sitegeist-resource-collections?${s.toString()}`,{credentials:"include",headers:{Accept:"application/json"}}),c=await i.text();if(!i.ok)throw new Error(`The resource collection "${t.collection}" could not be resolved (HTTP ${i.status}). ${c.slice(0,500)}`);let a=null;try{a=JSON.parse(c)}catch{throw new Error(`The resource collection data source did not answer with JSON: ${c.slice(0,500)}`)}let l=a?.contextPath??a?.data?.contextPath;if(typeof l!="string")throw new Error(`The resource collection "${t.collection}" has no node address: ${c.slice(0,500)}`);return{contextPath:l,canManage:!!(a?.canManage??a?.data?.canManage)}},Xt=async(e,t,o)=>{if(o.length===0)return{};let r=e.getState(),n=r?.cr?.nodes?.documentNode??qe.selectors.CR.Nodes.focusedNodePathSelector(r);if(typeof n!="string")return{};let s=new URLSearchParams({node:n,nodes:o.join(",")}),i=await fetch(`${tt(t)}/neos/service/data-source/sitegeist-resource-usage?${s.toString()}`,{credentials:"include",headers:{Accept:"application/json"}});if(!i.ok)return{};try{let c=await i.json();return c?.data??c??{}}catch{return{}}},Qt=async(e,t,o,r)=>ot(e,t,r,{nodeTypes:o.nodeTypes??[o.resourceCreation.type]}),ot=async(e,t,o,r={})=>{let n=e.getState(),s=n?.cr?.nodes?.documentNode??qe.selectors.CR.Nodes.focusedNodePathSelector(n);if(typeof s!="string")return[];let i=new URLSearchParams({node:s,parent:o});r.nodeTypes?.length&&i.append("nodeTypes",r.nodeTypes.join(","));let c=await fetch(`${tt(t)}/neos/service/data-source/sitegeist-resource-children?${i.toString()}`,{credentials:"include",headers:{Accept:"application/json"}}),a=await c.text();if(!c.ok)throw new Error(`The children of the resource could not be read (HTTP ${c.status}). `+a.slice(0,500));let l=JSON.parse(a);return l?.data??l??[]};var eo=(e,t,o,r,n,s,i,c)=>{let{store:a,nodeTypesRegistry:l,saveHooksRegistry:u,t:p}=I(),f=e.options.resourceCreation,[m,N]=rt.default.useState(null),[_,C]=rt.default.useState(null),D=async d=>{s(),t.setError(null);let h=d?.nodeTypeName??f.type,b=l.getNodeType(h),w=Ht(b);if(!d){let v=Wt(f,w);if(v.length>0){t.setError(p("error.creationBlocked","{type} cannot be created here: {properties} must be provided on creation. Give these properties a default value, make them nullable, or promote them to the creation dialog (showInCreationDialog).",{type:h,properties:v.join(", ")}));return}}let E=d?.parentContextPath??(t.container??(await t.reload()).container).contextPath;if(w.length===0){await O({},h,E,!d);return}let g=await Tt(a,b,h,E);g!==null&&await O(g,h,E,!d)},O=async(d,h,b,w)=>{let E={};for(let[g,v]of Object.entries(d))E[g]=await Ze(v.value,v.hooks,u);if(w)for(let g of f.requiredProperties??[])(E[g.name]===void 0||E[g.name]===null)&&(E[g.name]=jt(g.type));await t.run(async()=>{let g=await K.get().endpoints.change([{type:"Neos.Neos.Ui:CreateInto",subject:b,payload:{nodeType:h,data:E}}]);ce(a,g);let v=(g?.feedbacks??[]).find(x=>x?.type==="Neos.Neos.Ui:NodeCreated")?.payload;if(!v?.identifier)throw new Error(p("error.creationFailed","The resource could not be created."));w&&(await Be(a),o.add(v.identifier),At(a,e.identifier)),t.touch();let[{resources:T},U]=await Promise.all([t.reload(),w?Promise.resolve(null):i(b)]),j=(U??T).find(x=>x.identifier===v.identifier);j&&await n.inspect(j)},"create")};return{create:D,move:async(d,h,b,w)=>{d.contextPath!==h.contextPath&&(t.reorder(d.contextPath,h.contextPath,b),c(d.contextPath,h.contextPath,b),await t.run(async()=>{try{let E=await K.get().endpoints.change([{type:b==="before"?"Neos.Neos.Ui:MoveBefore":"Neos.Neos.Ui:MoveAfter",subject:de(d.contextPath,le),payload:{siblingDomAddress:{contextPath:de(h.contextPath,le)}}}]);if(ce(a,E),!(E?.feedbacks??[]).some(v=>v?.type==="Neos.Neos.Ui:UpdateNodeInfo"))throw new Error(p("error.moveFailed","The resource could not be moved."))}catch(E){throw await Promise.all([t.reload(),w?i(w):Promise.resolve([])]),E}},"move"))},duplicate:async d=>{d.length!==0&&await t.run(async()=>{let h=t.container??(await t.reload()).container,b=await K.get().endpoints.change(d.map(v=>({type:"Neos.Neos.Ui:CopyInto",subject:de(v.contextPath,le),payload:{parentContextPath:h.contextPath}})));ce(a,b);let w=(b?.feedbacks??[]).filter(v=>v?.type==="Neos.Neos.Ui:NodeCreated").map(v=>v?.payload?.identifier).filter(Boolean);t.touch();let{resources:E}=await t.reload(),g=E.find(v=>v.identifier===w[w.length-1]);r.leave(),g&&await n.inspect(g)},"duplicate")},setHidden:async(d,h)=>{d.length!==0&&await t.run(async()=>{let b=await K.get().endpoints.change(d.map(w=>({type:"Neos.Neos.Ui:Property",subject:de(w.contextPath,le),payload:{propertyName:"_hidden",value:h}})));ce(a,b),d.forEach(w=>t.patch(w.contextPath,{hidden:h})),n.node&&d.some(w=>w.contextPath===n.node.contextPath)&&n.patchProperty("_hidden",h),await Be(a),t.touch(),a.dispatch(Zt.actions.UI.ContentCanvas.reload())},"hide")},requestRemoval:async d=>{if(d.length!==0){C(null),N(d);try{C(await Xt(a,e.neos?.routes,d.map(h=>h.identifier)))}catch{C({})}}},remove:async d=>{N(null),await t.run(async()=>{let h=await K.get().endpoints.change(d.map(w=>({type:"Neos.Neos.Ui:RemoveNode",subject:de(w.contextPath,le),payload:{}})));ce(a,h),t.touch(),o.drop(d.map(w=>w.identifier));let b=d.map(w=>w.contextPath);r.forget(b),r.selection.length>0&&d.length>=r.selection.length&&r.leave(),n.node&&b.includes(n.node.contextPath)&&n.forget(),await t.reload()},"delete")},cancelRemoval:()=>N(null),pendingRemoval:m,pendingRemovalUsage:_}};var Y=R(L());var to=e=>{let t=e?.get?.("dataLoaders")?.get?.("NodeLookup");t&&(t._lruCache=null)};var nt=(e,t,o,r)=>{let n=e.findIndex(c=>c.contextPath===t);if(n<0||!e.some(c=>c.contextPath===o))return null;let s=e.filter((c,a)=>a!==n),i=s.findIndex(c=>c.contextPath===o);return s.splice(r==="before"?i:i+1,0,e[n]),s},st=(e,t,o,r)=>nt(e,t,o,r)??e.map(n=>n.children?{...n,children:st(n.children,t,o,r)}:n);var oo=(e,t,o)=>e.map(r=>r.contextPath===t?{...r,...o}:r.children?{...r,children:oo(r.children,t,o)}:r),ro=(e,t)=>{let{store:o,globalRegistry:r}=I(),n=e.resourceCreation,[s,i]=Y.default.useState(null),[c,a]=Y.default.useState([]),[l,u]=Y.default.useState(!1),[p,f]=Y.default.useState(null),[m,N]=Y.default.useState(null),[_,C]=Y.default.useState(0),D=Y.default.useRef(null),O=Y.default.useCallback(async()=>{let k=`${o.getState()?.cr?.nodes?.documentNode??""}|${n.collection}`,P=D.current?.key===k?D.current.container:await Jt(o,n,t);return D.current={key:k,container:P},i(P),P},[n,t,o]),S=Y.default.useCallback(async()=>{let k=await O(),P=await Qt(o,t,e,k.contextPath);return i(k),a(P),{container:k,resources:P}},[e,O,t,o]),M=Y.default.useCallback(async(k,P)=>{u(!0),f(P??null),N(null);try{return await k()}catch(y){N(Ve(y));return}finally{u(!1),f(null)}},[]);return{container:s,resources:c,isLoading:l,activity:p,error:m,setError:N,resolve:O,reload:S,run:M,version:_,touch:Y.default.useCallback(()=>{to(r),C(k=>k+1)},[r]),patch:Y.default.useCallback((k,P)=>a(y=>oo(y,k,P)),[]),reorder:Y.default.useCallback((k,P,y)=>a(A=>st(A,k,P,y)),[])}};var Ae=R(L());var no=(e,t)=>{let{store:o}=I(),[r,n]=Ae.default.useState({}),s=Ae.default.useRef(new Set),i=Ae.default.useCallback(async f=>{let m=await ot(o,t,f);return n(N=>({...N,[f]:m})),m},[t,o]),c=f=>r[f.contextPath]??f.children,a=[],l=(f,m,N)=>f.flatMap(_=>{let C={resource:_,depth:m,ancestors:N},D=c(_);return D?D.length>0?[C,...l(D,m+1,[...N,_])]:[C]:(_.childCount&&a.push(_.contextPath),[C])}),u=l(e.resources,0,[]),p=a.join("|");return Ae.default.useEffect(()=>{let f=a.filter(m=>!s.current.has(m));f.length!==0&&(f.forEach(m=>s.current.add(m)),e.run(async()=>{for(let m of f)await i(m)}))},[p,i]),{rows:u,reveal:async f=>(s.current.add(f),i(f)),reorder:(f,m,N)=>n(_=>Object.fromEntries(Object.entries(_).map(([C,D])=>[C,nt(D,f,m,N)??D])))}};var Ue=R(L()),so=()=>{let[e,t]=Ue.default.useState(null),o=Ue.default.useRef(null),r=Ue.default.useCallback(()=>{o.current=null,t(null)},[]),n=Ue.default.useCallback((s,i)=>{if(!s||!i||o.current===s){r();return}o.current=s,t({id:s,element:i()})},[r]);return{secondaryInspector:e,render:n,close:r}};var Ce=R(L()),io=e=>{let[t,o]=Ce.default.useState(!1),[r,n]=Ce.default.useState([]),s=Ce.default.useCallback(()=>{o(!1),n([])},[]),i=Ce.default.useCallback(a=>{n(l=>l.includes(a.contextPath)?l.filter(u=>u!==a.contextPath):[...l,a.contextPath])},[]),c=Ce.default.useCallback(a=>{n(l=>l.filter(u=>!a.includes(u)))},[]);return{isSelecting:t,enter:(a=[])=>{n(a),o(!0)},leave:s,selection:r,selected:e.filter(a=>r.includes(a.contextPath)),toggle:i,pick:(a,l=[])=>{if(t){i(a);return}n([...l.filter(u=>u!==a.contextPath),a.contextPath]),o(!0)},setSelection:n,forget:c}};var ao=`
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
`;var G=R(L()),te=R(X());var ve=e=>!!e?.hidden||!!e?.tags?.disabled||!!e?.properties?._hidden;var co=({resources:e,usage:t,onCancel:o,onHideInstead:r,onConfirm:n})=>{let{nodeTypesRegistry:s,t:i}=I(),c=e.every(a=>!!s.getNodeType(a.nodeType)?.properties?._hidden)&&!e.every(ve);return G.default.createElement(te.Dialog,{isOpen:!0,type:"warn",style:"narrow",title:e.length===1?i("removal.titleOne","Delete this resource?"):i("removal.title","Delete {count} resources?",{count:e.length}),onRequestClose:o,actions:[G.default.createElement(te.Button,{key:"cancel",type:"button",onClick:o},i("action.cancel","Cancel")),c?G.default.createElement(te.Button,{key:"hide",type:"button",style:"lighter",onClick:()=>r(e)},G.default.createElement(te.Icon,{icon:"eye-slash"})," ",i("action.hideInstead","Hide instead")):null,G.default.createElement(te.Button,{key:"delete",type:"button",style:"error",hoverStyle:"error",onClick:()=>n(e)},G.default.createElement(te.Icon,{icon:"trash"})," ",i("action.delete","Delete"))].filter(Boolean)},G.default.createElement("div",{className:"sitegeist-resource-reference-editor__confirmation"},G.default.createElement("ul",null,e.map(a=>{let l=t?.[a.identifier];return G.default.createElement("li",{key:a.contextPath},G.default.createElement("strong",null,a.label||a.identifier),t===null&&G.default.createElement("small",null,i("removal.checking","Checking references\u2026")),l&&l.count>0&&G.default.createElement("small",null,l.count===1?i("removal.referencedOnce","Referenced once"):i("removal.referenced","Referenced {count} times",{count:l.count}),l.documents.length>0?`: ${l.documents.join(", ")}`:""),t!==null&&!l?.count&&G.default.createElement("small",null,i("removal.notReferenced","Not referenced")))})),G.default.createElement("p",null,i("removal.explanation","Deleting removes the resource from the collection, and every document that references it loses that reference. Hiding it instead keeps those references intact."))))};var $=R(L()),$e=R(X());var H=R(L()),oe=R(X());var it=R(L()),at=R(X()),be=({icon:e,isBusy:t})=>t?it.default.createElement(at.Icon,{icon:"spinner",className:"sitegeist-resource-reference-editor__spinner"}):it.default.createElement(at.Icon,{icon:e});var lo=({targets:e,selectableResources:t,selection:o,isSelecting:r,isLoading:n,activity:s,canDuplicate:i,canChangeTargets:c,isMultiple:a,canUseSelection:l,selectionIsReferenced:u,path:p,onDuplicate:f,onSetHidden:m,onDelete:N,onSetSelection:_,onUseSelection:C,onUnuseSelection:D})=>{let{nodeTypesRegistry:O,t:S}=I(),M=e.length>0&&e.every(d=>!d.tethered),k=M&&e.every(ve),P=M&&e.every(d=>!!O.getNodeType(d.nodeType)?.properties?._hidden),y=t.length>0&&t.every(d=>o.includes(d.contextPath)),A=()=>r?o.length>0?S("selection.count","{count} selected",{count:o.length}):S("selection.hint","Click the resources to select them"):p.length>0?p.join(" \u203A "):S("action.noTarget","No resource selected");return H.default.createElement("div",{className:"sitegeist-resource-reference-editor__footer"},H.default.createElement("span",{className:"sitegeist-resource-reference-editor__footer-target"+(M?"":" sitegeist-resource-reference-editor__footer-target--empty")},A()),H.default.createElement("div",{className:"sitegeist-resource-reference-editor__footer-actions"},r&&H.default.createElement(oe.Button,{type:"button",style:"lighter",disabled:n||t.length===0,onClick:()=>_(y?[]:t.map(d=>d.contextPath))},y?S("action.deselectAll","Deselect all"):S("action.selectAll","Select all")),i&&H.default.createElement(oe.Button,{type:"button",style:"lighter",disabled:n||!M,onClick:f},H.default.createElement(be,{icon:"clone",isBusy:s==="duplicate"})," ",S("action.duplicate","Duplicate")),c&&H.default.createElement(oe.Button,{type:"button",style:"lighter",disabled:n||!P,onClick:()=>m(!k)},H.default.createElement(be,{icon:k?"eye":"eye-slash",isBusy:s==="hide"})," ",k?S("action.show","Show"):S("action.hide","Hide")),r&&a&&H.default.createElement(oe.Button,{className:"sitegeist-resource-reference-editor__bulk-use"+(u?" sitegeist-resource-reference-editor__bulk-use--remove":""),type:"button",style:"lighter",disabled:n||!l,onClick:u?D:C},u?H.default.createElement(H.default.Fragment,null,H.default.createElement(oe.Icon,{icon:"times"})," ",S("action.remove","Remove")):H.default.createElement(H.default.Fragment,null,H.default.createElement(oe.Icon,{icon:"check"})," ",S("action.use","Use"))),c&&H.default.createElement(oe.Button,{type:"button",style:"error",hoverStyle:"error",disabled:n||!M,onClick:N},H.default.createElement(be,{icon:"trash",isBusy:s==="delete"})," ",S("action.delete","Delete"))))};var Q=R(L()),ke=R(X());var we=R(L()),Ne=R(X());var ct=R(L()),fo=R(po()),go=({item:e,node:t,value:o,hooks:r,isChanged:n,isReadOnly:s,onChange:i,renderSecondaryInspector:c,validationErrors:a})=>ct.default.createElement("div",{className:"sitegeist-resource-reference-editor__field"},ct.default.createElement(fo.EditorEnvelope,{identifier:e.id,label:e.label??e.id,editor:e.editor,options:s?{...e.editorOptions??{},disabled:!0}:e.editorOptions,value:o,hooks:r??null,node:t,propertyName:e.id,commit:(l,u)=>{s||i(e.id,l,u)},renderSecondaryInspector:c,validationErrors:a,helpMessage:e.helpMessage,helpThumbnail:e.helpThumbnail,highlight:!!n}));var Go={panel__headline:"sitegeist-resource-reference-editor__group-label"},mo=({group:e,node:t,values:o,draft:r,isOpen:n,isReadOnly:s,onToggle:i,onChange:c,renderSecondaryInspector:a,validationErrors:l})=>{let{i18nRegistry:u}=I();return we.default.createElement(Ne.ToggablePanel,{isOpen:n,onPanelToggle:i,className:"sitegeist-resource-reference-editor__group"},we.default.createElement(Ne.ToggablePanel.Header,{theme:Go},e.icon&&we.default.createElement("div",{className:"sitegeist-resource-reference-editor__group-icon"},we.default.createElement(Ne.Icon,{icon:e.icon})),J(u,e.label)),we.default.createElement(Ne.ToggablePanel.Contents,null,Ge(e).map(p=>we.default.createElement(go,{key:`${t?.contextPath??"new"}-${p.id}`,item:p,node:t,value:p.id==="_nodeType"?t?.nodeType:o[p.id],hooks:r[p.id]?.hooks,isChanged:!!r[p.id],isReadOnly:s,onChange:c,renderSecondaryInspector:a,validationErrors:l[p.id]}))))};var ho=({inspected:e,isLoading:t,isReadOnly:o,renderSecondaryInspector:r})=>{let{i18nRegistry:n,t:s}=I();return Q.default.createElement("div",{className:"sitegeist-resource-reference-editor__inspector"},Q.default.createElement("div",{className:"sitegeist-resource-reference-editor__inspector-body"},e.node?e.tabs.length===0?Q.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},s("inspector.noConfiguration","This node type has no inspector configuration.")):Q.default.createElement(ke.Tabs,{className:"sitegeist-resource-reference-editor__tabs"},e.tabs.map(c=>Q.default.createElement(ke.Tabs.Panel,{key:c.id,id:c.id,icon:c.icon,tooltip:J(n,c.label)},c.groups.map(a=>Q.default.createElement(mo,{key:a.id,group:a,node:e.node,values:e.values,draft:e.draft,isOpen:e.isPanelOpen(a.id,a.collapsed),onToggle:()=>e.togglePanel(a.id),isReadOnly:o,onChange:e.change,renderSecondaryInspector:r,validationErrors:e.validationErrors}))))):Q.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},s("inspector.empty","Select a resource to edit its properties."))),e.node&&!o&&Q.default.createElement("div",{className:"sitegeist-resource-reference-editor__inspector-footer"},Q.default.createElement(ke.Button,{type:"button",style:"lighter",disabled:t||!e.hasChanges,onClick:e.discard},s("action.discard","Discard")),Q.default.createElement(ke.Button,{type:"button",style:"success",disabled:t||!e.hasChanges,onClick:e.save},s("action.apply","Apply"))))};var ie=R(L());var ut=new Set,V=new WeakMap,_e=new WeakMap,se=new WeakMap,Le=new WeakMap,lt=new WeakMap,pt=new WeakMap,xe=new WeakMap,Te=new WeakMap,Pe=new WeakSet,ue,gt=0,mt=0,ne="__aa_tgt",Fe="__aa_del",Ye="__aa_new",bo=e=>{let t=Jo(e);t&&t.forEach(o=>Xo(o))},Vo=e=>{e.forEach(t=>{t.target===ue&&Yo(),V.has(t.target)&&Re(t.target)})};function qo(e){let t=Le.get(e);t?.disconnect();let o=V.get(e),r=0,n=5;o||(o=Se(e),V.set(e,o));let{offsetWidth:s,offsetHeight:i}=ue,a=[o.top-n,s-(o.left+n+o.width),i-(o.top+n+o.height),o.left-n].map(u=>`${-1*Math.floor(u)}px`).join(" "),l=new IntersectionObserver(()=>{++r>1&&Re(e)},{root:ue,threshold:1,rootMargin:a});l.observe(e),Le.set(e,l)}function Re(e){clearTimeout(Te.get(e));let t=Ke(e),o=je(t)?500:t.duration;Te.set(e,setTimeout(async()=>{let r=se.get(e);try{await r?.finished,V.set(e,Se(e)),qo(e)}catch{}},o))}function Yo(){clearTimeout(Te.get(ue)),Te.set(ue,setTimeout(()=>{ut.forEach(e=>ft(e,t=>wo(()=>Re(t))))},100))}function Ko(e){setTimeout(()=>{pt.set(e,setInterval(()=>wo(Re.bind(null,e)),2e3))},Math.round(2e3*Math.random()))}function wo(e){typeof requestIdleCallback=="function"?requestIdleCallback(()=>e()):requestAnimationFrame(()=>e())}var re,xo=typeof window<"u"&&"ResizeObserver"in window;xo&&(ue=document.documentElement,new MutationObserver(bo),re=new ResizeObserver(Vo),window.addEventListener("scroll",()=>{mt=window.scrollY,gt=window.scrollX}),re.observe(ue));function Jo(e){return e.reduce((r,n)=>[...r,...Array.from(n.addedNodes),...Array.from(n.removedNodes)],[]).every(r=>r.nodeName==="#comment")?!1:e.reduce((r,n)=>{if(r===!1)return!1;if(n.target instanceof Element){if(dt(n.target),!r.has(n.target)){r.add(n.target);for(let s=0;s<n.target.children.length;s++){let i=n.target.children.item(s);if(i){if(Fe in i)return!1;dt(n.target,i),r.add(i)}}}if(n.removedNodes.length)for(let s=0;s<n.removedNodes.length;s++){let i=n.removedNodes[s];if(Fe in i)return!1;i instanceof Element&&(r.add(i),dt(n.target,i),_e.set(i,[n.previousSibling,n.nextSibling]))}}return r},new Set)}function dt(e,t){!t&&!(ne in e)?Object.defineProperty(e,ne,{value:e}):t&&!(ne in t)&&Object.defineProperty(t,ne,{value:e})}function Xo(e){var t;let o=e.isConnected,r=V.has(e);o&&_e.has(e)&&_e.delete(e),se.has(e)&&((t=se.get(e))===null||t===void 0||t.cancel()),Ye in e?yo(e):r&&o?Zo(e):r&&!o?er(e):yo(e)}function Z(e){return Number(e.replace(/[^0-9.\-]/g,""))}function Qo(e){let t=e.parentElement;for(;t;){if(t.scrollLeft||t.scrollTop)return{x:t.scrollLeft,y:t.scrollTop};t=t.parentElement}return{x:0,y:0}}function Se(e){let t=e.getBoundingClientRect(),{x:o,y:r}=Qo(e);return{top:t.top+r,left:t.left+o,width:t.width,height:t.height}}function _o(e,t,o){let r=t.width,n=t.height,s=o.width,i=o.height,c=getComputedStyle(e);if(c.getPropertyValue("box-sizing")==="content-box"){let l=Z(c.paddingTop)+Z(c.paddingBottom)+Z(c.borderTopWidth)+Z(c.borderBottomWidth),u=Z(c.paddingLeft)+Z(c.paddingRight)+Z(c.borderRightWidth)+Z(c.borderLeftWidth);r-=u,s-=u,n-=l,i-=l}return[r,s,n,i].map(Math.round)}function Ke(e){return ne in e&&xe.has(e[ne])?xe.get(e[ne]):{duration:250,easing:"ease-in-out"}}function Ro(e){if(ne in e)return e[ne]}function ht(e){let t=Ro(e);return t?Pe.has(t):!1}function ft(e,...t){t.forEach(o=>o(e,xe.has(e)));for(let o=0;o<e.children.length;o++){let r=e.children.item(o);r&&t.forEach(n=>n(r,xe.has(r)))}}function yt(e){return Array.isArray(e)?e:[e]}function je(e){return typeof e=="function"}function Zo(e){let t=V.get(e),o=Se(e);if(!ht(e))return V.set(e,o);let r;if(!t)return;let n=Ke(e);if(typeof n!="function"){let s=t.left-o.left,i=t.top-o.top,[c,a,l,u]=_o(e,t,o),p={transform:`translate(${s}px, ${i}px)`},f={transform:"translate(0, 0)"};c!==a&&(p.width=`${c}px`,f.width=`${a}px`),l!==u&&(p.height=`${l}px`,f.height=`${u}px`),r=e.animate([p,f],{duration:n.duration,easing:n.easing})}else{let[s]=yt(n(e,"remain",t,o));r=new Animation(s),r.play()}se.set(e,r),V.set(e,o),r.addEventListener("finish",()=>Re(e),{once:!0})}function yo(e){Ye in e&&delete e[Ye];let t=Se(e);V.set(e,t);let o=Ke(e);if(!ht(e))return;let r;if(typeof o!="function")r=e.animate([{transform:"scale(.98)",opacity:0},{transform:"scale(0.98)",opacity:0,offset:.5},{transform:"scale(1)",opacity:1}],{duration:o.duration*1.5,easing:"ease-in"});else{let[n]=yt(o(e,"add",t));r=new Animation(n),r.play()}se.set(e,r),r.addEventListener("finish",()=>Re(e),{once:!0})}function vo(e,t){var o;e.remove(),V.delete(e),_e.delete(e),se.delete(e),(o=Le.get(e))===null||o===void 0||o.disconnect(),setTimeout(()=>{if(Fe in e&&delete e[Fe],Object.defineProperty(e,Ye,{value:!0,configurable:!0}),t&&e instanceof HTMLElement)for(let r in t)e.style[r]=""},0)}function er(e){var t;if(!_e.has(e)||!V.has(e))return;let[o,r]=_e.get(e);Object.defineProperty(e,Fe,{value:!0,configurable:!0});let n=window.scrollX,s=window.scrollY;if(r&&r.parentNode&&r.parentNode instanceof Element?r.parentNode.insertBefore(e,r):o&&o.parentNode?o.parentNode.appendChild(e):(t=Ro(e))===null||t===void 0||t.appendChild(e),!ht(e))return vo(e);let[i,c,a,l]=or(e),u=Ke(e),p=V.get(e);(n!==gt||s!==mt)&&tr(e,n,s,u);let f,m={position:"absolute",top:`${i}px`,left:`${c}px`,width:`${a}px`,height:`${l}px`,margin:"0",pointerEvents:"none",transformOrigin:"center",zIndex:"100"};if(!je(u))Object.assign(e.style,m),f=e.animate([{transform:"scale(1)",opacity:1},{transform:"scale(.98)",opacity:0}],{duration:u.duration,easing:"ease-out"});else{let[N,_]=yt(u(e,"remove",p));_?.styleReset!==!1&&(m=_?.styleReset||m,Object.assign(e.style,m)),f=new Animation(N),f.play()}se.set(e,f),f.addEventListener("finish",()=>vo(e,m),{once:!0})}function tr(e,t,o,r){let n=gt-t,s=mt-o,i=document.documentElement.style.scrollBehavior;if(getComputedStyle(ue).scrollBehavior==="smooth"&&(document.documentElement.style.scrollBehavior="auto"),window.scrollTo(window.scrollX+n,window.scrollY+s),!e.parentElement)return;let a=e.parentElement,l=a.clientHeight,u=a.clientWidth,p=performance.now();function f(){requestAnimationFrame(()=>{if(!je(r)){let m=l-a.clientHeight,N=u-a.clientWidth;p+r.duration>performance.now()?(window.scrollTo({left:window.scrollX-N,top:window.scrollY-m}),l=a.clientHeight,u=a.clientWidth,f()):document.documentElement.style.scrollBehavior=i}})}f()}function or(e){let t=V.get(e),[o,,r]=_o(e,t,Se(e)),n=e.parentElement;for(;n&&(getComputedStyle(n).position==="static"||n instanceof HTMLBodyElement);)n=n.parentElement;n||(n=document.body);let s=getComputedStyle(n),i=V.get(n)||Se(n),c=Math.round(t.top-i.top)-Z(s.borderTopWidth),a=Math.round(t.left-i.left)-Z(s.borderLeftWidth);return[c,a,o,r]}function Co(e,t={}){if(xo&&re&&!(window.matchMedia("(prefers-reduced-motion: reduce)").matches&&!je(t)&&!t.disrespectUserMotionPreference)){Pe.add(e),getComputedStyle(e).position==="static"&&Object.assign(e.style,{position:"relative"}),ft(e,Re,Ko,i=>re?.observe(i)),je(t)?xe.set(e,t):xe.set(e,{duration:250,easing:"ease-in-out",...t});let s=new MutationObserver(bo);s.observe(e,{childList:!0}),lt.set(e,s),ut.add(e)}return Object.freeze({parent:e,enable:()=>{Pe.add(e)},disable:()=>{Pe.delete(e)},isEnabled:()=>Pe.has(e),destroy:()=>{Pe.delete(e),ut.delete(e),xe.delete(e);let r=lt.get(e);r?.disconnect(),lt.delete(e),ft(e,n=>{re?.unobserve(n);let s=se.get(n);try{s?.cancel()}catch{}se.delete(n);let i=Le.get(n);i?.disconnect(),Le.delete(n);let c=pt.get(n);c&&clearInterval(c),pt.delete(n);let a=Te.get(n);a&&clearTimeout(a),Te.delete(n),V.delete(n),_e.delete(n)})}})}var B=R(L()),pe=R(X());var vt=20,No=({resource:e,isActive:t,isReferenced:o,isSelecting:r,isSelected:n,isUsable:s,depth:i,guides:c,onOpen:a,onToggleSelection:l,onPick:u,onToggleReference:p,isDraggable:f,isDragged:m,onDragStart:N,onDragEnd:_,onMoveByKey:C})=>{let{nodeTypesRegistry:D,i18nRegistry:O,t:S}=I(),M=D.getNodeType(e.nodeType),k=r?l:a,P=B.default.useRef(null);return B.default.useEffect(()=>{t&&P.current?.scrollIntoView({block:"nearest"})},[t]),B.default.createElement("div",{ref:P,role:"button",tabIndex:0,className:["sitegeist-resource-reference-editor__item",t&&!r?"sitegeist-resource-reference-editor__item--active":"",r&&n?"sitegeist-resource-reference-editor__item--selected":"",ve(e)?"sitegeist-resource-reference-editor__item--hidden":"",i>0?"sitegeist-resource-reference-editor__item--child":"",m?"sitegeist-resource-reference-editor__item--dragged":""].join(" "),"data-context-path":e.contextPath,draggable:f,onDragStart:y=>{y.dataTransfer.effectAllowed="move",y.dataTransfer.setData("text/plain",e.label??""),N(y.clientY)},onDragEnd:_,style:i>0?{marginLeft:`${i*vt}px`}:void 0,onMouseDown:y=>{y.shiftKey&&y.preventDefault()},onClick:y=>y.shiftKey?u():k(),onKeyDown:y=>{if(y.altKey&&(y.key==="ArrowUp"||y.key==="ArrowDown")){y.preventDefault(),C(y.key==="ArrowUp"?-1:1);return}(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),k())}},c.map(y=>B.default.createElement("span",{key:y.level,"aria-hidden":"true",className:"sitegeist-resource-reference-editor__guide"+(y.isEnd?" sitegeist-resource-reference-editor__guide--end":""),style:{left:`${-((i-y.level)*vt)-vt/2}px`}})),r&&B.default.createElement("span",{className:"sitegeist-resource-reference-editor__item-select"},B.default.createElement(pe.CheckBox,{isChecked:n,onChange:l})),B.default.createElement(pe.Icon,{icon:M?.ui?.icon??"file"}),B.default.createElement("div",{className:"sitegeist-resource-reference-editor__item-label"},B.default.createElement("strong",{className:e.label?"":"sitegeist-resource-reference-editor__item-unnamed"},e.label||J(O,M?.ui?.label)||e.identifier),B.default.createElement("small",null,J(O,M?.ui?.label)||e.nodeType)),B.default.createElement("span",{className:"sitegeist-resource-reference-editor__item-actions"+(r?" sitegeist-resource-reference-editor__item-actions--inert":"")},ve(e)&&B.default.createElement("span",{className:"sitegeist-resource-reference-editor__hidden-badge",title:S("resource.hiddenTitle","This resource is hidden")},B.default.createElement(pe.Icon,{icon:"eye-slash"})," ",S("resource.hidden","Hidden")),s&&B.default.createElement("button",{type:"button",className:"sitegeist-resource-reference-editor__use"+(o?" sitegeist-resource-reference-editor__use--active":""),onClick:y=>{y.stopPropagation(),p()}},o?B.default.createElement(B.default.Fragment,null,B.default.createElement("span",{className:"sitegeist-resource-reference-editor__use-state"},B.default.createElement(pe.Icon,{icon:"check"})," ",S("action.inUse","In use")),B.default.createElement("span",{className:"sitegeist-resource-reference-editor__use-action"},B.default.createElement(pe.Icon,{icon:"times"})," ",S("action.remove","Remove"))):B.default.createElement(B.default.Fragment,null,B.default.createElement(pe.Icon,{icon:"plus"})," ",S("action.use","Use")))))};var rr=(e,t)=>{let{depth:o}=e[t],r=[];for(let n=1;n<=o;n++){let s=!1;for(let i=t+1;i<e.length&&e[i].depth>=n;i++)if(e[i].depth===n){s=!0;break}s?r.push({level:n,isEnd:!1}):n===o&&r.push({level:n,isEnd:!0})}return r},He=e=>e.ancestors[e.ancestors.length-1]?.contextPath??null,Po=(e,t)=>e.depth===t.depth&&He(e)===He(t),ko=(e,t)=>{let o=t+1;for(;o<e.length&&e[o].depth>e[t].depth;)o++;return[t,o]},fe=(e,t)=>e.findIndex(o=>o.resource.contextPath===t),nr=(e,t,o,r)=>{let[n,s]=ko(e,fe(e,t)),i=e.slice(n,s),c=[...e.slice(0,n),...e.slice(s)],a=fe(c,o),l=r==="before"?a:ko(c,a)[1];return[...c.slice(0,l),...i,...c.slice(l)]},sr=4,ir=(e,t,o,r)=>{let n=e[fe(e,t)],s=e[fe(e,o)];if(!n||!s||t===o||!Po(s,n))return null;let i=fe(e,o)<fe(e,t);return i!==(r==="up")?null:nr(e,t,o,i?"before":"after")},bt=(e,t)=>e.filter(o=>Po(o,t)),To=({rows:e,isLoading:t,activeContextPath:o,referencedIdentifiers:r,isSelecting:n,selection:s,usableNodeTypes:i,onOpen:c,onToggleSelection:a,onPick:l,onToggleReference:u,canReorder:p,onMove:f})=>{let{nodeTypesRegistry:m,t:N}=I(),_=ie.default.useRef(null),[C,D]=ie.default.useState(null),[O,S]=ie.default.useState(null),M=O??e,k=ie.default.useRef({y:0,direction:null});ie.default.useEffect(()=>{_.current&&Co(_.current,{duration:160,easing:"ease-out"})},[]);let P=(d,h)=>{let b=d[fe(d,h)],w=e[fe(e,h)];if(!b||!w)return;let E=bt(e,w).map(F=>F.resource.contextPath),g=bt(d,b);if(E.join("|")===g.map(F=>F.resource.contextPath).join("|"))return;let v=g.findIndex(F=>F.resource.contextPath===h),T=g[v+1],U=g[v-1];T?f(b.resource,T.resource,"before",He(b)):U&&f(b.resource,U.resource,"after",He(b))},y=()=>{D(null),S(null)},A=(d,h)=>{let b=bt(e,d),w=b.findIndex(g=>g.resource.contextPath===d.resource.contextPath),E=b[w+h];E&&f(d.resource,E.resource,h<0?"before":"after",He(d))};return ie.default.createElement("div",{ref:_,className:"sitegeist-resource-reference-editor__list",onDragOver:d=>{if(!C)return;d.preventDefault(),d.dataTransfer.dropEffect="move";let h=d.clientY-k.current.y;Math.abs(h)>=sr&&(k.current={y:d.clientY,direction:h<0?"up":"down"});let{direction:b}=k.current,w=d.target.closest?.("[data-context-path]")?.getAttribute("data-context-path");if(w&&b){let E=ir(M,C,w,b);E&&S(E)}},onDrop:d=>{d.preventDefault(),C&&O&&P(O,C),y()}},M.length===0&&ie.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},t?N("list.loading","Loading\u2026"):N("list.empty","No resources found.")),M.map((d,h)=>ie.default.createElement(No,{key:d.resource.contextPath,resource:d.resource,depth:d.depth,guides:rr(M,h),isActive:o===d.resource.contextPath,isReferenced:r.includes(d.resource.identifier),isSelecting:n,isSelected:s.includes(d.resource.contextPath),isUsable:ze(m,d.resource.nodeType,i),isDraggable:p&&!d.resource.tethered&&!!d.resource.canManage,isDragged:C===d.resource.contextPath,onDragStart:b=>{k.current={y:b,direction:null},D(d.resource.contextPath),S(e)},onDragEnd:y,onMoveByKey:b=>{p&&!d.resource.tethered&&d.resource.canManage&&A(d,b)},onOpen:()=>c(d.resource),onToggleSelection:()=>a(d.resource),onPick:()=>l(d.resource),onToggleReference:()=>u(d.resource.identifier)})))};var ge=R(L()),Ee=R(X());var q=R(L()),We=R(X());var So=({groups:e,isDisabled:t,isBusy:o,onCreate:r})=>{let{t:n}=I(),[s,i]=q.default.useState(!1),c=q.default.useRef(null),a=e.flatMap(p=>p.options);q.default.useEffect(()=>{if(!s)return;let p=m=>{c.current?.contains(m.target)||i(!1)},f=m=>{m.key==="Escape"&&(m.stopPropagation(),i(!1))};return document.addEventListener("mousedown",p),document.addEventListener("keydown",f,!0),()=>{document.removeEventListener("mousedown",p),document.removeEventListener("keydown",f,!0)}},[s]);let l=p=>{i(!1),r(p)},u=p=>q.default.createElement("button",{key:(p.parentContextPath??"")+p.nodeTypeName,type:"button",role:"menuitem",className:"sitegeist-resource-reference-editor__create-option",onClick:()=>l(p)},q.default.createElement(We.Icon,{icon:p.icon??"file"})," ",p.label);return a.length<=1?q.default.createElement(We.Button,{type:"button",style:"lighter",disabled:t||a.length===0,title:a[0]?.label,onClick:()=>a[0]&&l(a[0])},q.default.createElement(be,{icon:"plus",isBusy:o})," ",n("action.new","New")):q.default.createElement("div",{className:"sitegeist-resource-reference-editor__create-menu",ref:c},q.default.createElement(We.Button,{type:"button",style:"lighter",disabled:t,"aria-haspopup":"menu","aria-expanded":s,onClick:()=>i(p=>!p)},q.default.createElement(be,{icon:"plus",isBusy:o})," ",n("action.new","New")),s&&q.default.createElement("div",{className:"sitegeist-resource-reference-editor__create-options",role:"menu"},e.map(p=>q.default.createElement(q.default.Fragment,{key:p.label??""},p.label&&q.default.createElement("span",{className:"sitegeist-resource-reference-editor__create-section"},p.label),p.options.map(u)))))};var Eo=({filter:e,onFilter:t,isLoading:o,isCreating:r,isSelecting:n,canSelect:s,createGroups:i,onCreate:c,onEnterSelection:a,onLeaveSelection:l})=>{let{t:u}=I();return ge.default.createElement("div",{className:"sitegeist-resource-reference-editor__toolbar"},ge.default.createElement("input",{className:"sitegeist-resource-reference-editor__search",type:"search",value:e,placeholder:u("list.search","Filter resources"),onChange:p=>t(p.currentTarget.value)}),i.length>0&&ge.default.createElement(So,{groups:i,isDisabled:o,isBusy:r,onCreate:c}),n?ge.default.createElement(Ee.Button,{type:"button",style:"lighter",onClick:l},ge.default.createElement(Ee.Icon,{icon:"check"})," ",u("action.done","Done")):ge.default.createElement(Ee.Button,{type:"button",style:"lighter",disabled:o||!s,onClick:a},ge.default.createElement(Ee.Icon,{icon:"list-check"})," ",u("action.selectMultiple","Select multiple")))};var Io=({isOpen:e,onClose:t,collection:o,tree:r,inspected:n,selection:s,references:i,actions:c,creationType:a,usableNodeTypes:l,renderSecondaryInspector:u,secondaryInspector:p,onCloseSecondaryInspector:f})=>{let{nodeTypesRegistry:m,i18nRegistry:N,t:_}=I(),[C,D]=$.default.useState(""),O=C.trim().toLocaleLowerCase(),S=O===""?r.rows:r.rows.filter(x=>(x.resource.label??"").toLocaleLowerCase().includes(O)),M=S.map(x=>x.resource),k=x=>ze(m,x.nodeType,l),P=s.selected.filter(k),y=n.node?r.rows.find(x=>x.resource.contextPath===n.node.contextPath)??null:null,A=y?.resource??null,d=s.isSelecting?s.selected:A?[A]:[],h=y?[...y.ancestors,y.resource].map(x=>x.label):[],b=m.getNodeType(a),w=x=>x.canManage?Lt(m,N,x.nodeType).map(me=>({...me,parentContextPath:x.contextPath})):[],E=x=>_("action.createIn","In \u201C{name}\u201D",{name:x}),g=o.container?.canManage??!1,v=d.length>0?d.every(x=>!!x.canManage):g,T=!A?.canManage,U=s.isSelecting?null:y,F=U?.ancestors[U.ancestors.length-1]??null,j=[F?{label:E(F.label),options:w(F)}:{options:g?[{nodeTypeName:a,label:J(N,b?.ui?.label)||a,icon:b?.ui?.icon}]:[]},...U?[{label:E(U.resource.label),options:w(U.resource)}]:[]].filter(x=>x.options.length>0);return $.default.createElement($e.Dialog,{isOpen:e,title:"",style:"jumbo",onRequestClose:p?f:t,actions:[]},$.default.createElement("div",{className:"sitegeist-resource-reference-editor__layout"},$.default.createElement("button",{type:"button",className:"sitegeist-resource-reference-editor__close",title:_("action.close","Close"),"aria-label":_("action.close","Close"),onClick:t},$.default.createElement($e.Icon,{icon:"times"})),$.default.createElement("div",{className:"sitegeist-resource-reference-editor__content"},o.error&&$.default.createElement("div",{className:"sitegeist-resource-reference-editor__state sitegeist-resource-reference-editor__error"},o.error),$.default.createElement(Eo,{filter:C,onFilter:D,isLoading:o.isLoading,isCreating:o.activity==="create",isSelecting:s.isSelecting,canSelect:M.length>0,createGroups:j,onCreate:x=>c.create(x.parentContextPath?{parentContextPath:x.parentContextPath,nodeTypeName:x.nodeTypeName}:void 0),onEnterSelection:()=>s.enter(A?[A.contextPath]:[]),onLeaveSelection:s.leave}),$.default.createElement("div",{className:"sitegeist-resource-reference-editor__progress"+(o.isLoading?" sitegeist-resource-reference-editor__progress--active":""),"aria-hidden":"true"}),$.default.createElement(To,{rows:S,usableNodeTypes:l,isLoading:o.isLoading,activeContextPath:n.node?.contextPath,referencedIdentifiers:i.referenced,isSelecting:s.isSelecting,selection:s.selection,onOpen:n.inspect,onToggleSelection:s.toggle,onPick:x=>s.pick(x,A?[A.contextPath]:[]),onToggleReference:i.toggle,canReorder:O===""&&!s.isSelecting&&!o.isLoading,onMove:c.move}),$.default.createElement(lo,{targets:d,selectableResources:M,selection:s.selection,isSelecting:s.isSelecting,isLoading:o.isLoading,activity:o.activity,canDuplicate:g,canChangeTargets:v,isMultiple:i.isMultiple,path:h,canUseSelection:P.length>0,selectionIsReferenced:P.length>0&&P.every(x=>i.referenced.includes(x.identifier)),onDuplicate:()=>c.duplicate(d),onSetHidden:x=>c.setHidden(d,x),onDelete:()=>c.requestRemoval(d),onSetSelection:s.setSelection,onUseSelection:()=>{i.addMany(P.map(x=>x.identifier)),s.leave()},onUnuseSelection:()=>{i.drop(P.map(x=>x.identifier)),s.leave()}})),p&&$.default.createElement("div",{className:"sitegeist-resource-reference-editor__secondary"},$.default.createElement("button",{type:"button",className:"sitegeist-resource-reference-editor__secondary-close",title:_("action.close","Close"),onClick:f},$.default.createElement($e.Icon,{icon:"times"})),p),$.default.createElement(ho,{inspected:n,isReadOnly:T,isLoading:o.isLoading,renderSecondaryInspector:u})))};var Do=({ReferenceEditor:e,ReferencesEditor:t,...o})=>{let{i18nRegistry:r,nodeTypesRegistry:n,t:s}=I(),[i,c]=z.default.useState(!1),a=o.options.resourceCreation,l=so(),u=ro(o.options,o.neos?.routes),p=no(u,o.neos?.routes),f=io(p.rows.map(h=>h.resource)),m=Kt(o),N=qt(u,l.close),_=()=>c(!0),C=eo(o,u,m,f,N,_,h=>p.reveal(h),p.reorder);z.default.useEffect(()=>{u.resolve().catch(()=>{})},[u.resolve]);let D=u.container?.canManage??null,O=async()=>{_(),await u.run(()=>u.reload())},S=()=>{l.close(),c(!1)},M=h=>{if(!m.isMultiple)return h.closest('[class*="selectBoxHeader"]')&&m.referenced.length===1?m.referenced[0]:null;let b=h.closest('[class*="selectedOptions__innerPreview"]')?.closest("li"),w=b?.parentElement;return!b||!w?null:m.referenced[Array.prototype.indexOf.call(w.children,b)]??null},k=h=>{let b=h.target;if(!b||b.closest("input, button"))return;let w=M(b);if(!w)return;h.preventDefault(),h.stopPropagation(),_();let E=u.resources.find(g=>g.identifier===w);u.run(async()=>{if(E){await Promise.all([u.reload(),N.inspect(E)]);return}let{resources:g}=await u.reload(),v=g.find(T=>T.identifier===w);v&&await N.inspect(v)})},{resourceCreation:P,...y}=o.options,A=o.options.nodeTypes??[a.type],d=A.length===1?J(r,n.getNodeType(A[0])?.ui?.label):"";return z.default.createElement(z.default.Fragment,null,z.default.createElement("style",null,ao),z.default.createElement("div",{className:"sitegeist-resource-reference-editor__reference",style:{"--sitegeist-resource-type":JSON.stringify(d)},onClickCapture:k},m.isMultiple&&t?z.default.createElement(t,{key:u.version,...o,options:y}):z.default.createElement(e,{key:u.version,...o,options:y})),z.default.createElement("div",{className:"sitegeist-resource-reference-editor__actions"},D!==!1&&z.default.createElement(Ie.Button,{className:"sitegeist-resource-reference-editor__create",type:"button",style:"lighter",disabled:o.options.disabled||u.isLoading||D===null,onClick:C.create,title:a.buttonLabel??s("action.createNew","Create new"),"aria-label":a.buttonLabel??s("action.createNew","Create new")},z.default.createElement(Ie.Icon,{icon:"plus"})),z.default.createElement(Ie.Button,{type:"button",style:"lighter",disabled:o.options.disabled||u.isLoading,onClick:O},z.default.createElement(Ie.Icon,{icon:"list"})," ",s("action.showAll","Show all"))),z.default.createElement(Io,{isOpen:i,onClose:S,collection:u,tree:p,inspected:N,selection:f,references:m,actions:C,creationType:a.type,usableNodeTypes:A,renderSecondaryInspector:l.render,secondaryInspector:l.secondaryInspector?.element??null,onCloseSecondaryInspector:l.close}),C.pendingRemoval&&z.default.createElement(co,{resources:C.pendingRemoval,usage:C.pendingRemovalUsage,onCancel:C.cancelRemoval,onHideInstead:h=>{C.cancelRemoval(),C.setHidden(h,!0)},onConfirm:C.remove}))};Rt("Sitegeist.ResourceReferenceEditor",{},(e,{store:t})=>{let o=e.get("inspector"),r=o?.get("editors"),n=o?.get("saveHooks"),s=e.get("validators"),i=r?.get("Neos.Neos/Inspector/Editors/ReferenceEditor"),c=r?.get("Neos.Neos/Inspector/Editors/ReferencesEditor"),a=e.get("@neos-project/neos-ui-contentrepository"),l=e.get("i18n");if(!r||!i?.component||!a){console.warn("[Sitegeist.ResourceReferenceEditor] Required Neos UI registries are missing.");return}e.get("sagas")?.set("Sitegeist.ResourceReferenceEditor/CreationDialog",{saga:St});let u={store:t,globalRegistry:e,nodeTypesRegistry:a,saveHooksRegistry:n,validatorsRegistry:s,i18nRegistry:l};r.set("Sitegeist.ResourceReferenceEditor/Inspector/Editors/ResourceReferenceEditor",{component:p=>wt.default.createElement(Bt,{registries:u},wt.default.createElement(Do,{...p,ReferenceEditor:i.component,ReferencesEditor:c?.component}))})});})();
//# sourceMappingURL=Plugin.js.map
