(()=>{var tr=Object.create;var jt=Object.defineProperty;var or=Object.getOwnPropertyDescriptor;var rr=Object.getOwnPropertyNames;var nr=Object.getPrototypeOf,sr=Object.prototype.hasOwnProperty;var ir=(e,t)=>()=>(e&&(t=e(e=0)),t);var Se=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var ar=(e,t,o,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of rr(t))!sr.call(e,n)&&n!==o&&jt(e,n,{get:()=>t[n],enumerable:!(r=or(t,n))||r.enumerable});return e};var _=(e,t,o)=>(o=e!=null?tr(nr(e)):{},ar(t||!e||!e.__esModule?jt(o,"default",{value:e,enumerable:!0}):o,e));function W(e){return(...t)=>{if(window["@Neos:HostPluginAPI"]&&window["@Neos:HostPluginAPI"][`@${e}`])return window["@Neos:HostPluginAPI"][`@${e}`](...t);throw new Error("You are trying to read from a consumer api that hasn't been initialized yet!")}}var re=ir(()=>{});var D=Se((Ur,Ht)=>{re();Ht.exports=W("vendor")().React});var be=Se((Vr,$t)=>{re();$t.exports=W("NeosProjectPackages")().NeosUiReduxStore});var Gt=Se((Yr,zt)=>{re();zt.exports=W("vendor")().reduxSagaEffects});var Z=Se((Qr,Kt)=>{re();Kt.exports=W("NeosProjectPackages")().ReactUiComponents});var So=Se((vs,Po)=>{re();Po.exports=W("NeosProjectPackages")().NeosUiEditors});var Ko=Se((fi,Yo)=>{re();Yo.exports=W("vendor")().ReactDOM});var Pe=_(D());re();var cr=W("manifest"),Wt=cr,{SynchronousRegistry:Fr,SynchronousMetaRegistry:jr}=W("NeosProjectPackages")().NeosUiRegistry;re();var Q=W("NeosProjectPackages")().NeosUiBackendConnectorDefault,{fetchWithErrorHandling:$r}=W("NeosProjectPackages")().NeosUiBackendConnector;var xe=_(be()),pt=_(Gt()),ft=null,Vt=e=>{let t=ft;ft=null,t&&e(t)},qt=async(e,t,o,r)=>{let[n]=await Q.get().q([r]).get();return n&&e.dispatch(xe.actions.CR.Nodes.merge({[n.contextPath]:n})),new Promise(s=>{ft={apply:i=>s(i),cancel:()=>s(null)},e.dispatch(xe.actions.UI.NodeCreationDialog.open(t?.ui?.label??o,t?.ui?.creationDialog??{elements:{}},r,o))})};function*Yt(){yield(0,pt.takeEvery)(xe.actionTypes.UI.NodeCreationDialog.APPLY,e=>Vt(t=>t.apply(e?.payload??{}))),yield(0,pt.takeEvery)([xe.actionTypes.UI.NodeCreationDialog.CANCEL,xe.actionTypes.UI.NodeCreationDialog.BACK],()=>Vt(e=>e.cancel()))}var U=_(D()),Ue=_(Z());var Fe=_(D());var Jt="Sitegeist.ResourceReferenceEditor",Xt="Main",q=(e,t)=>t?e?.translate?e.translate(t):t:"",lr=(e,t,o,r)=>e?.translate?e.translate(`${Jt}:${Xt}:${t}`,o,r,Jt,Xt):o,Qt=e=>(t,o,r)=>lr(e,t,o,r);var Zt=Fe.default.createContext(null),Je=({registries:e,children:t})=>{let o=Fe.default.useMemo(()=>({...e,t:Qt(e.i18nRegistry)}),[e]);return Fe.default.createElement(Zt.Provider,{value:o},t)},P=()=>{let e=Fe.default.useContext(Zt);if(!e)throw new Error("[Sitegeist.ResourceReferenceEditor] The Neos UI registries are only available below RegistriesProvider.");return e};var dr="Sitegeist.ResourceReferenceEditor/Inspector/Editors/ResourceReferenceEditor",Xe=(e,t)=>{let o=new Map;for(let r of e?.getAllAsList?.()??[]){let n=[...Object.values(r?.properties??{}),...Object.values(r?.references??{})];for(let s of n){let i=s?.ui?.inspector,c=i?.editorOptions,a=c?.resourceCreation;if(i?.editor!==dr||!c||!a?.collection)continue;let l=o.get(a.collection);if(l){l.options={...l.options,nodeTypes:[...new Set([...l.options.nodeTypes??[],...c.nodeTypes??[]])]};continue}let u=e.getNodeType(a.type);o.set(a.collection,{name:a.collection,label:q(t,u?.ui?.label)||a.collection,icon:u?.ui?.icon,options:{...c,resourceCreation:a,multiple:!1,disabled:!1}})}}return[...o.values()].sort((r,n)=>r.label.localeCompare(n.label))};var gt=_(D()),Qe={isOpen:!1,collection:null},mt=new Set,eo=e=>{Qe=e,mt.forEach(t=>t(e))},Ze=(e=null)=>eo({isOpen:!0,collection:e}),ht=()=>eo({...Qe,isOpen:!1}),to=()=>{let[e,t]=gt.default.useState(Qe);return gt.default.useEffect(()=>(mt.add(t),t(Qe),()=>{mt.delete(t)}),[]),e};var oo=_(D()),ro=e=>{let t=!!e.options.multiple,{value:o,commit:r}=e,n=oo.default.useMemo(()=>Array.isArray(o)?o:o?[o]:[],[o]),s=l=>{if(!t){r(l);return}let u=Array.isArray(o)?o:[];u.includes(l)||r([...u,l])},i=l=>{if(!t){l.length>0&&r(l[0]);return}let u=Array.isArray(o)?o:[],f=l.filter(d=>!u.includes(d));f.length>0&&r([...u,...f])},c=l=>{let u=new Set(l);if(t||Array.isArray(o)){let f=Array.isArray(o)?o:[],d=f.filter(y=>!u.has(y));d.length!==f.length&&r(d);return}typeof o=="string"&&u.has(o)&&r("")};return{referenced:n,isMultiple:t,add:s,addMany:i,drop:c,toggle:l=>{if(n.includes(l)){c([l]);return}s(l)}}},yt={referenced:[],isMultiple:!1,add:()=>{},addMany:()=>{},drop:()=>{},toggle:()=>{}};var ne=_(D());var xt=_(be());var je=_(be()),ur=["Neos.Neos.Ui:UpdateNodeInfo","Neos.Neos.Ui:UpdateNodePreviewUrl","Neos.Neos.Ui:UpdateWorkspaceInfo","Neos.Neos.Ui:Success","Neos.Neos.Ui:Info","Neos.Neos.Ui:Warning","Neos.Neos.Ui:Error"],no=(e,t)=>{if(typeof t!="string")return;let o=e.getState(),r=je.selectors.CR.Nodes.focusedNodePathSelector(o),n=o?.ui?.inspector?.valuesByNodePath?.[r]??{},s=Object.keys(n).filter(i=>n[i]!==void 0);s.length===1&&s[0]===t&&e.dispatch(je.actions.UI.Inspector.apply())},ue=(e,t)=>{let o=(t?.feedbacks??[]).filter(r=>ur.includes(r?.type));o.length>0&&e.dispatch(je.actions.ServerFeedback.handleServerFeedback({feedbacks:o}))},so=(e,t)=>(e?.feedbacks??[]).find(r=>r?.type==="Neos.Neos.Ui:UpdateNodeInfo")?.payload?.byContextPath?.[t]??null;var vt=_(be()),He=async e=>{let t=Q.get().endpoints?.syncWorkspace;if(!t)return;let o=e.getState(),r=vt.selectors.CR.Workspaces.personalWorkspaceNameSelector(o);if(typeof r!="string"||r==="")return;let n=await t(r,!1,vt.selectors.CR.ContentDimensions.active(o));if(n&&typeof n=="object"&&"conflicts"in n)throw new Error("Your workspace could not be brought up to date with the live workspace, because some of your changes conflict with it. Resolve the conflicts from the workspace dialog, then try again.");if(n&&typeof n=="object"&&"error"in n)throw new Error(n.error?.message??"Your workspace could not be brought up to date with the live workspace.")};var pr="Sitegeist.ResourceReferenceEditor:Resource",et=(e,t,o)=>o.some(r=>e.isOfType?.(t,r)??t===r),fr=(e,t)=>!!e.isOfType?.(t,pr),io=(e,t,o)=>(e.getAllowedChildNodeTypes?.(o)??[]).map(r=>({name:r,nodeType:e.getNodeType(r)})).filter(({name:r,nodeType:n})=>!!n&&n.abstract!==!0&&fr(e,r)).map(({name:r,nodeType:n})=>({nodeTypeName:r,label:q(t,n?.ui?.label)||r,icon:n?.ui?.icon})).sort((r,n)=>r.label.localeCompare(n.label)),tt=e=>(e.items??[]).filter(t=>t.type==="editor"&&t.editor&&t.hidden!==!0),ao=(e,t)=>(e.getInspectorViewConfigurationFor(t)?.tabs??[]).map(r=>({...r,groups:(r.groups??[]).filter(n=>tt(n).length>0)})).filter(r=>r.groups.length>0),co=e=>{switch(e){case"integer":case"float":return 0;case"boolean":return!1;case"array":return[];default:return""}},lo=e=>Object.entries(e?.ui?.creationDialog?.elements??{}).filter(([,t])=>t?.ui?.editor&&t?.ui?.hidden!==!0).map(([t,o])=>({type:"editor",id:t,dataType:o.type,label:o.ui?.label??t,editor:o.ui.editor,editorOptions:o.ui.editorOptions,helpMessage:o.ui?.help,defaultValue:o.defaultValue,validation:o.validation})),uo=(e,t)=>{if(!Array.isArray(e.requiredProperties))return["(stale editor configuration - flush the Neos caches)"];let o=new Set(t.map(r=>r.id));return[...e.unsupportedRequiredProperties??[],...e.requiredProperties.filter(r=>!o.has(r.name)).map(r=>r.name)]},po=(e,t)=>e?.properties?.[t]??e?.references?.[t],fo=e=>e.flatMap(t=>t.groups.flatMap(o=>tt(o)));var bt=async(e,t,o)=>{if(!t)return e;let r=e;for(let[n,s]of Object.entries(t)){let i=o?.get(n);if(!i)throw new Error(`There is no registered save hook function for identifier ${n}`);r=await i(r,s)}return r},go=async(e,t)=>{let o={};for(let[r,n]of Object.entries(e))o[r]=await bt(n.value,n.hooks,t);return o};var mo=(e,t,o,r)=>{let n={};for(let s of e){let i=po(t,s.id)?.validation;if(!i)continue;let c=Object.keys(i).map(a=>{let l=r?.get(a);return l?l(o[s.id],i[a]):(console.warn(`[Sitegeist.ResourceReferenceEditor] Validator ${a} not found`),null)}).filter(Boolean);c.length>0&&(n[s.id]=c)}return n},ot=e=>{if(e instanceof Error)return e.message;if(typeof e=="string")return e;let t=e?.message??e?.error;if(typeof t=="string")return t;try{return JSON.stringify(e)}catch{return String(e)}};var pe="live",fe=(e,t)=>{if(!t)return e;try{let o=JSON.parse(e);return o?.workspaceName===t?e:JSON.stringify({...o,workspaceName:t})}catch{return e}};var ho=(e,t)=>{let{store:o,nodeTypesRegistry:r,saveHooksRegistry:n,validatorsRegistry:s}=P(),[i,c]=ne.default.useState(null),[a,l]=ne.default.useState([]),[u,f]=ne.default.useState({}),[d,y]=ne.default.useState({}),[C,m]=ne.default.useState({}),[x,E]=ne.default.useState({}),M=r.getNodeType(i?.nodeType),S=fo(a),B=Object.keys(d).length>0,N=()=>{y({}),f({}),m({}),t()},O=ne.default.useRef(null),b=ne.default.useRef(d);b.current=d;let H=(g,v)=>{o.dispatch(xt.actions.CR.Nodes.merge({[g.contextPath]:g}));let T=v?Object.fromEntries(Object.entries(b.current).map(([$,L])=>[$,L.value])):{};c(g),l(ao(r,g.nodeType)),f({...g.properties??{},...T})},p=async(g,v)=>{if(!v?.force&&O.current===g.contextPath)return;O.current=g.contextPath,N(),e.setError(null);let T=v?.force?null:o.getState()?.cr?.nodes?.byContextPath?.[g.contextPath];T&&H(T,!1);try{let[$]=await Q.get().q([g.contextPath]).get();if(O.current!==g.contextPath)return;let L=$??T??g;if(T&&JSON.stringify(L)===JSON.stringify(T))return;H(L,!!T)}catch($){if(O.current!==g.contextPath)return;T||(O.current=null),e.setError(ot($))}};return{node:i,nodeType:M,tabs:a,values:u,draft:d,hasChanges:B,validationErrors:C,isPanelOpen:(g,v)=>!!x[g]==!!v,togglePanel:g=>E(v=>({...v,[g]:!v[g]})),inspect:p,forget:()=>{O.current=null,c(null),l([]),N()},change:(g,v,T)=>{let $=i?.properties?.[g],L=!T&&($===v||JSON.stringify($)===JSON.stringify(v));y(F=>{if(L){let{[g]:oe,...ve}=F;return ve}return{...F,[g]:{value:v,hooks:T}}}),f(F=>({...F,[g]:v})),m(F=>{if(!F[g])return F;let{[g]:oe,...ve}=F;return ve})},patchProperty:(g,v)=>{c(T=>T&&{...T,properties:{...T.properties,[g]:v}}),f(T=>({...T,[g]:v}))},save:async()=>{if(!i)return;let g=mo(S,M,u,s);m(g),!(Object.keys(g).length>0)&&(t(),await e.run(async()=>{let v=await go(d,n),T=fe(i.contextPath,pe),$=Object.entries(v).map(([oe,ve])=>({type:"Neos.Neos.Ui:Property",subject:T,payload:{propertyName:oe,value:ve}}));if($.length===0){y({});return}let L=await Q.get().endpoints.change($);ue(o,L),y({});let F=so(L,T);F&&(e.patch(T,{label:F.label,properties:F.properties,tags:F.tags}),H(F,!1)),await He(o),e.touch(),o.dispatch(xt.actions.UI.ContentCanvas.reload()),!F&&(await e.reload(),await p(i,{force:!0}))},"save"))},discard:()=>{t(),y({}),m({}),f({...i?.properties??{}})}}};var Rt=_(D());var vo=_(be());var rt=_(be()),wt=e=>{let t=e?.core?.service?.nodes;return typeof t!="string"?"":t.replace(/\/neos\/service\/nodes\/?$/,"")},nt=async(e,t,o)=>{let r=e.getState(),n=r?.cr?.nodes?.documentNode??rt.selectors.CR.Nodes.focusedNodePathSelector(r);if(typeof n!="string")throw new Error("The node of the current editing session could not be resolved.");let s=new URLSearchParams({node:n,collection:t.collection});t.buttonLabel&&s.append("title",t.buttonLabel);let i=await fetch(`${wt(o)}/neos/service/data-source/sitegeist-resource-collections?${s.toString()}`,{credentials:"include",headers:{Accept:"application/json"}}),c=await i.text();if(!i.ok)throw new Error(`The resource collection "${t.collection}" could not be resolved (HTTP ${i.status}). ${c.slice(0,500)}`);let a=null;try{a=JSON.parse(c)}catch{throw new Error(`The resource collection data source did not answer with JSON: ${c.slice(0,500)}`)}let l=a?.contextPath??a?.data?.contextPath;if(typeof l!="string")throw new Error(`The resource collection "${t.collection}" has no node address: ${c.slice(0,500)}`);return{contextPath:l,canManage:!!(a?.canManage??a?.data?.canManage)}},yo=async(e,t,o)=>{if(o.length===0)return{};let r=e.getState(),n=r?.cr?.nodes?.documentNode??rt.selectors.CR.Nodes.focusedNodePathSelector(r);if(typeof n!="string")return{};let s=new URLSearchParams({node:n,nodes:o.join(",")}),i=await fetch(`${wt(t)}/neos/service/data-source/sitegeist-resource-usage?${s.toString()}`,{credentials:"include",headers:{Accept:"application/json"}});if(!i.ok)return{};try{let c=await i.json();return c?.data??c??{}}catch{return{}}},st=async(e,t,o,r)=>_t(e,t,r,{nodeTypes:o.nodeTypes??[o.resourceCreation.type]}),_t=async(e,t,o,r={})=>{let n=e.getState(),s=n?.cr?.nodes?.documentNode??rt.selectors.CR.Nodes.focusedNodePathSelector(n);if(typeof s!="string")return[];let i=new URLSearchParams({node:s,parent:o});r.nodeTypes?.length&&i.append("nodeTypes",r.nodeTypes.join(","));let c=await fetch(`${wt(t)}/neos/service/data-source/sitegeist-resource-children?${i.toString()}`,{credentials:"include",headers:{Accept:"application/json"}}),a=await c.text();if(!c.ok)throw new Error(`The children of the resource could not be read (HTTP ${c.status}). `+a.slice(0,500));let l=JSON.parse(a);return l?.data??l??[]};var bo=(e,t,o,r,n,s,i,c)=>{let{store:a,nodeTypesRegistry:l,saveHooksRegistry:u,t:f}=P(),d=e.options.resourceCreation,[y,C]=Rt.default.useState(null),[m,x]=Rt.default.useState(null),E=async p=>{s(),t.setError(null);let h=p?.nodeTypeName??d.type,w=l.getNodeType(h),R=lo(w);if(!p){let v=uo(d,R);if(v.length>0){t.setError(f("error.creationBlocked","{type} cannot be created here: {properties} must be provided on creation. Give these properties a default value, make them nullable, or promote them to the creation dialog (showInCreationDialog).",{type:h,properties:v.join(", ")}));return}}let I=p?.parentContextPath??(t.container??(await t.reload()).container).contextPath;if(R.length===0){await M({},h,I,!p);return}let g=await qt(a,w,h,I);g!==null&&await M(g,h,I,!p)},M=async(p,h,w,R)=>{let I={};for(let[g,v]of Object.entries(p))I[g]=await bt(v.value,v.hooks,u);if(R)for(let g of d.requiredProperties??[])(I[g.name]===void 0||I[g.name]===null)&&(I[g.name]=co(g.type));await t.run(async()=>{let g=await Q.get().endpoints.change([{type:"Neos.Neos.Ui:CreateInto",subject:w,payload:{nodeType:h,data:I}}]);ue(a,g);let v=(g?.feedbacks??[]).find(oe=>oe?.type==="Neos.Neos.Ui:NodeCreated")?.payload;if(!v?.identifier)throw new Error(f("error.creationFailed","The resource could not be created."));R&&(await He(a),o.add(v.identifier),no(a,e.identifier)),t.touch();let[{resources:T},$]=await Promise.all([t.reload(),R?Promise.resolve(null):i(w)]),F=($??T).find(oe=>oe.identifier===v.identifier);F&&await n.inspect(F)},"create")};return{create:E,move:async(p,h,w,R)=>{p.contextPath!==h.contextPath&&(t.reorder(p.contextPath,h.contextPath,w),c(p.contextPath,h.contextPath,w),await t.run(async()=>{try{let I=await Q.get().endpoints.change([{type:w==="before"?"Neos.Neos.Ui:MoveBefore":"Neos.Neos.Ui:MoveAfter",subject:fe(p.contextPath,pe),payload:{siblingDomAddress:{contextPath:fe(h.contextPath,pe)}}}]);if(ue(a,I),!(I?.feedbacks??[]).some(v=>v?.type==="Neos.Neos.Ui:UpdateNodeInfo"))throw new Error(f("error.moveFailed","The resource could not be moved."))}catch(I){throw await Promise.all([t.reload(),R?i(R):Promise.resolve([])]),I}},"move"))},duplicate:async p=>{p.length!==0&&await t.run(async()=>{let h=t.container??(await t.reload()).container,w=await Q.get().endpoints.change(p.map(v=>({type:"Neos.Neos.Ui:CopyInto",subject:fe(v.contextPath,pe),payload:{parentContextPath:h.contextPath}})));ue(a,w);let R=(w?.feedbacks??[]).filter(v=>v?.type==="Neos.Neos.Ui:NodeCreated").map(v=>v?.payload?.identifier).filter(Boolean);t.touch();let{resources:I}=await t.reload(),g=I.find(v=>v.identifier===R[R.length-1]);r.leave(),g&&await n.inspect(g)},"duplicate")},setHidden:async(p,h)=>{p.length!==0&&await t.run(async()=>{let w=await Q.get().endpoints.change(p.map(R=>({type:"Neos.Neos.Ui:Property",subject:fe(R.contextPath,pe),payload:{propertyName:"_hidden",value:h}})));ue(a,w),p.forEach(R=>t.patch(R.contextPath,{hidden:h})),n.node&&p.some(R=>R.contextPath===n.node.contextPath)&&n.patchProperty("_hidden",h),await He(a),t.touch(),a.dispatch(vo.actions.UI.ContentCanvas.reload())},"hide")},requestRemoval:async p=>{if(p.length!==0){x(null),C(p);try{x(await yo(a,e.neos?.routes,p.map(h=>h.identifier)))}catch{x({})}}},remove:async p=>{C(null),await t.run(async()=>{let h=await Q.get().endpoints.change(p.map(R=>({type:"Neos.Neos.Ui:RemoveNode",subject:fe(R.contextPath,pe),payload:{}})));ue(a,h),t.touch(),o.drop(p.map(R=>R.identifier));let w=p.map(R=>R.contextPath);r.forget(w),r.selection.length>0&&p.length>=r.selection.length&&r.leave(),n.node&&w.includes(n.node.contextPath)&&n.forget(),await t.reload()},"delete")},cancelRemoval:()=>C(null),pendingRemoval:y,pendingRemovalUsage:m}};var X=_(D());var xo=e=>{let t=e?.get?.("dataLoaders")?.get?.("NodeLookup");t&&(t._lruCache=null)};var Ct=(e,t,o,r)=>{let n=e.findIndex(c=>c.contextPath===t);if(n<0||!e.some(c=>c.contextPath===o))return null;let s=e.filter((c,a)=>a!==n),i=s.findIndex(c=>c.contextPath===o);return s.splice(r==="before"?i:i+1,0,e[n]),s},Nt=(e,t,o,r)=>Ct(e,t,o,r)??e.map(n=>n.children?{...n,children:Nt(n.children,t,o,r)}:n);var wo=(e,t,o)=>e.map(r=>r.contextPath===t?{...r,...o}:r.children?{...r,children:wo(r.children,t,o)}:r),_o=(e,t)=>{let{store:o,globalRegistry:r}=P(),n=e.resourceCreation,[s,i]=X.default.useState(null),[c,a]=X.default.useState([]),[l,u]=X.default.useState(!1),[f,d]=X.default.useState(null),[y,C]=X.default.useState(null),[m,x]=X.default.useState(0),E=X.default.useRef(null),M=X.default.useCallback(async()=>{let N=`${o.getState()?.cr?.nodes?.documentNode??""}|${n.collection}`,O=E.current?.key===N?E.current.container:await nt(o,n,t);return E.current={key:N,container:O},i(O),O},[n,t,o]),S=X.default.useCallback(async()=>{let N=await M(),O=await st(o,t,e,N.contextPath);return i(N),a(O),{container:N,resources:O}},[e,M,t,o]),B=X.default.useCallback(async(N,O)=>{u(!0),d(O??null),C(null);try{return await N()}catch(b){C(ot(b));return}finally{u(!1),d(null)}},[]);return{container:s,resources:c,isLoading:l,activity:f,error:y,setError:C,resolve:M,reload:S,run:B,version:m,touch:X.default.useCallback(()=>{xo(r),x(N=>N+1)},[r]),patch:X.default.useCallback((N,O)=>a(b=>wo(b,N,O)),[]),reorder:X.default.useCallback((N,O,b)=>a(H=>Nt(H,N,O,b)),[])}};var We=_(D());var Ro=(e,t)=>{let{store:o}=P(),[r,n]=We.default.useState({}),s=We.default.useRef(new Set),i=We.default.useCallback(async d=>{let y=await _t(o,t,d);return n(C=>({...C,[d]:y})),y},[t,o]),c=d=>r[d.contextPath]??d.children,a=[],l=(d,y,C)=>d.flatMap(m=>{let x={resource:m,depth:y,ancestors:C},E=c(m);return E?E.length>0?[x,...l(E,y+1,[...C,m])]:[x]:(m.childCount&&a.push(m.contextPath),[x])}),u=l(e.resources,0,[]),f=a.join("|");return We.default.useEffect(()=>{let d=a.filter(y=>!s.current.has(y));d.length!==0&&(d.forEach(y=>s.current.add(y)),e.run(async()=>{for(let y of d)await i(y)}))},[f,i]),{rows:u,reveal:async d=>(s.current.add(d),i(d)),reorder:(d,y,C)=>n(m=>Object.fromEntries(Object.entries(m).map(([x,E])=>[x,Ct(E,d,y,C)??E])))}};var $e=_(D()),Co=()=>{let[e,t]=$e.default.useState(null),o=$e.default.useRef(null),r=$e.default.useCallback(()=>{o.current=null,t(null)},[]),n=$e.default.useCallback((s,i)=>{if(!s||!i||o.current===s){r();return}o.current=s,t({id:s,element:i()})},[r]);return{secondaryInspector:e,render:n,close:r}};var Te=_(D()),No=e=>{let[t,o]=Te.default.useState(!1),[r,n]=Te.default.useState([]),s=Te.default.useCallback(()=>{o(!1),n([])},[]),i=Te.default.useCallback(a=>{n(l=>l.includes(a.contextPath)?l.filter(u=>u!==a.contextPath):[...l,a.contextPath])},[]),c=Te.default.useCallback(a=>{n(l=>l.filter(u=>!a.includes(u)))},[]);return{isSelecting:t,enter:(a=[])=>{n(a),o(!0)},leave:s,selection:r,selected:e.filter(a=>r.includes(a.contextPath)),toggle:i,pick:(a,l=[])=>{if(t){i(a);return}n([...l.filter(u=>u!==a.contextPath),a.contextPath]),o(!0)},setSelection:n,forget:c}};var it=(e,t,o)=>{let r=Co(),n=_o(e.options,e.neos?.routes),s=Ro(n,e.neos?.routes),i=No(s.rows.map(l=>l.resource)),c=ho(n,r.close),a=bo(e,n,t,i,c,o,l=>s.reveal(l),s.reorder);return{secondary:r,collection:n,tree:s,selection:i,inspected:c,actions:a}};var Ee=`
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
        /* The manager's collection tabs sit above the layout. */
        flex-direction: column;
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
    /*
     * The collection tabs of the resource manager, right below the top bar and on
     * the same ground, so the two read as one header. The open tab is marked by a
     * blue line along its bottom edge, over the row's own border.
     */
    .sitegeist-resource-reference-editor__manager-tabs {
        flex-shrink: 0;
        display: flex;
        /* Sideways only, for many collections - never a vertical scrollbar. */
        overflow-x: auto;
        overflow-y: hidden;
        /* Inset like the list below, so the first tab lines up with its rows. */
        padding-left: 16px;
        background: var(--colors-ContrastDarker, #222);
        /* The bottom line is a shadow inside the row, so the open tab's blue line
           can lie over it without reaching past the row. */
        box-shadow: inset 0 -1px 0 var(--colors-ContrastDark, #3f3f3f);
    }
    .sitegeist-resource-reference-editor__manager-tab:first-child {
        border-left: 1px solid var(--colors-ContrastDark, #3f3f3f);
    }
    .sitegeist-resource-reference-editor__manager-tab {
        position: relative;
        flex-shrink: 0;
        height: var(--spacing-GoldenUnit, 40px);
        padding: 0 var(--spacing-Full, 16px);
        border: 0;
        border-right: 1px solid var(--colors-ContrastDark, #3f3f3f);
        background: none;
        color: var(--colors-ContrastBrightest, #fff);
        font: inherit;
        white-space: nowrap;
        cursor: pointer;
    }
    .sitegeist-resource-reference-editor__manager-tab:hover {
        color: var(--colors-PrimaryBlue, #00adee);
    }
    .sitegeist-resource-reference-editor__manager-tab--active {
        color: var(--colors-PrimaryBlue, #00adee);
        cursor: default;
    }
    .sitegeist-resource-reference-editor__manager-tab--active::after {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 2px;
        background: var(--colors-PrimaryBlue, #00adee);
    }
    /*
     * The Resources section of the left sidebar, below the content tree - with the
     * toggle row of the content tree (ToggleContentTree in the Neos UI) and rows in
     * the measure of its tree nodes.
     */
    .sitegeist-resource-reference-editor__sidebar-host {
        flex: 0 0 auto;
        margin-right: var(--spacing-Quarter, 4px);
    }
    .sitegeist-resource-reference-editor__sidebar {
        border-top: 1px solid var(--colors-ContrastDark, #3f3f3f);
        background: var(--colors-ContrastDarkest, #141414);
        color: var(--colors-ContrastBrightest, #fff);
        font-family: 'Noto Sans', sans-serif;
        font-size: 14px;
    }
    .sitegeist-resource-reference-editor__sidebar-toggle {
        display: flex;
        align-items: center;
        height: var(--spacing-GoldenUnit, 40px);
        cursor: pointer;
    }
    .sitegeist-resource-reference-editor__sidebar-toggle-button {
        width: 46px;
        background: var(--colors-ContrastDarkest, #141414);
    }
    .sitegeist-resource-reference-editor__sidebar-label {
        padding-left: 9px;
        line-height: 40px;
        font-weight: bold;
    }
    .sitegeist-resource-reference-editor__sidebar-list {
        max-height: 40vh;
        overflow-y: auto;
        margin: 0;
        padding: 0 0 8px;
        list-style: none;
        background: var(--colors-ContrastDarker, #222);
        border-top: 1px solid var(--colors-ContrastDark, #3f3f3f);
    }
    .sitegeist-resource-reference-editor__sidebar-item {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        height: 32px;
        padding: 0 var(--spacing-Full, 16px) 0 38px;
        border: 0;
        background: none;
        color: inherit;
        font: inherit;
        text-align: left;
        cursor: pointer;
    }
    .sitegeist-resource-reference-editor__sidebar-item:hover {
        background: var(--colors-ContrastNeutral, #323232);
        color: var(--colors-PrimaryBlue, #00adee);
    }
    .sitegeist-resource-reference-editor__sidebar-item-label {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .sitegeist-resource-reference-editor__sidebar-count {
        color: var(--colors-ContrastBright, #999);
    }
`;var Y=_(D()),se=_(Z());var we=e=>!!e?.hidden||!!e?.tags?.disabled||!!e?.properties?._hidden;var at=({resources:e,usage:t,onCancel:o,onHideInstead:r,onConfirm:n})=>{let{nodeTypesRegistry:s,t:i}=P(),c=e.every(a=>!!s.getNodeType(a.nodeType)?.properties?._hidden)&&!e.every(we);return Y.default.createElement(se.Dialog,{isOpen:!0,type:"warn",style:"narrow",title:e.length===1?i("removal.titleOne","Delete this resource?"):i("removal.title","Delete {count} resources?",{count:e.length}),onRequestClose:o,actions:[Y.default.createElement(se.Button,{key:"cancel",type:"button",onClick:o},i("action.cancel","Cancel")),c?Y.default.createElement(se.Button,{key:"hide",type:"button",style:"lighter",onClick:()=>r(e)},Y.default.createElement(se.Icon,{icon:"eye-slash"})," ",i("action.hideInstead","Hide instead")):null,Y.default.createElement(se.Button,{key:"delete",type:"button",style:"error",hoverStyle:"error",onClick:()=>n(e)},Y.default.createElement(se.Icon,{icon:"trash"})," ",i("action.delete","Delete"))].filter(Boolean)},Y.default.createElement("div",{className:"sitegeist-resource-reference-editor__confirmation"},Y.default.createElement("ul",null,e.map(a=>{let l=t?.[a.identifier];return Y.default.createElement("li",{key:a.contextPath},Y.default.createElement("strong",null,a.label||a.identifier),t===null&&Y.default.createElement("small",null,i("removal.checking","Checking references\u2026")),l&&l.count>0&&Y.default.createElement("small",null,l.count===1?i("removal.referencedOnce","Referenced once"):i("removal.referenced","Referenced {count} times",{count:l.count}),l.documents.length>0?`: ${l.documents.join(", ")}`:""),t!==null&&!l?.count&&Y.default.createElement("small",null,i("removal.notReferenced","Not referenced")))})),Y.default.createElement("p",null,i("removal.explanation","Deleting removes the resource from the collection, and every document that references it loses that reference. Hiding it instead keeps those references intact."))))};var G=_(D()),Ke=_(Z());var z=_(D()),ie=_(Z());var kt=_(D()),Pt=_(Z()),_e=({icon:e,isBusy:t})=>t?kt.default.createElement(Pt.Icon,{icon:"spinner",className:"sitegeist-resource-reference-editor__spinner"}):kt.default.createElement(Pt.Icon,{icon:e});var ko=({targets:e,selectableResources:t,selection:o,isSelecting:r,isLoading:n,activity:s,canDuplicate:i,canChangeTargets:c,isMultiple:a,canUseSelection:l,selectionIsReferenced:u,path:f,onDuplicate:d,onSetHidden:y,onDelete:C,onSetSelection:m,onUseSelection:x,onUnuseSelection:E})=>{let{nodeTypesRegistry:M,t:S}=P(),B=e.length>0&&e.every(p=>!p.tethered),N=B&&e.every(we),O=B&&e.every(p=>!!M.getNodeType(p.nodeType)?.properties?._hidden),b=t.length>0&&t.every(p=>o.includes(p.contextPath)),H=()=>r?o.length>0?S("selection.count","{count} selected",{count:o.length}):S("selection.hint","Click the resources to select them"):f.length>0?f.join(" \u203A "):S("action.noTarget","No resource selected");return z.default.createElement("div",{className:"sitegeist-resource-reference-editor__footer"},z.default.createElement("span",{className:"sitegeist-resource-reference-editor__footer-target"+(B?"":" sitegeist-resource-reference-editor__footer-target--empty")},H()),z.default.createElement("div",{className:"sitegeist-resource-reference-editor__footer-actions"},r&&z.default.createElement(ie.Button,{type:"button",style:"lighter",disabled:n||t.length===0,onClick:()=>m(b?[]:t.map(p=>p.contextPath))},b?S("action.deselectAll","Deselect all"):S("action.selectAll","Select all")),i&&z.default.createElement(ie.Button,{type:"button",style:"lighter",disabled:n||!B,onClick:d},z.default.createElement(_e,{icon:"clone",isBusy:s==="duplicate"})," ",S("action.duplicate","Duplicate")),c&&z.default.createElement(ie.Button,{type:"button",style:"lighter",disabled:n||!O,onClick:()=>y(!N)},z.default.createElement(_e,{icon:N?"eye":"eye-slash",isBusy:s==="hide"})," ",N?S("action.show","Show"):S("action.hide","Hide")),r&&a&&z.default.createElement(ie.Button,{className:"sitegeist-resource-reference-editor__bulk-use"+(u?" sitegeist-resource-reference-editor__bulk-use--remove":""),type:"button",style:"lighter",disabled:n||!l,onClick:u?E:x},u?z.default.createElement(z.default.Fragment,null,z.default.createElement(ie.Icon,{icon:"times"})," ",S("action.remove","Remove")):z.default.createElement(z.default.Fragment,null,z.default.createElement(ie.Icon,{icon:"check"})," ",S("action.use","Use"))),c&&z.default.createElement(ie.Button,{type:"button",style:"error",hoverStyle:"error",disabled:n||!B,onClick:C},z.default.createElement(_e,{icon:"trash",isBusy:s==="delete"})," ",S("action.delete","Delete"))))};var ee=_(D()),Oe=_(Z());var Re=_(D()),Ie=_(Z());var St=_(D()),To=_(So()),Eo=({item:e,node:t,value:o,hooks:r,isChanged:n,isReadOnly:s,onChange:i,renderSecondaryInspector:c,validationErrors:a})=>St.default.createElement("div",{className:"sitegeist-resource-reference-editor__field"},St.default.createElement(To.EditorEnvelope,{identifier:e.id,label:e.label??e.id,editor:e.editor,options:s?{...e.editorOptions??{},disabled:!0}:e.editorOptions,value:o,hooks:r??null,node:t,propertyName:e.id,commit:(l,u)=>{s||i(e.id,l,u)},renderSecondaryInspector:c,validationErrors:a,helpMessage:e.helpMessage,helpThumbnail:e.helpThumbnail,highlight:!!n}));var gr={panel__headline:"sitegeist-resource-reference-editor__group-label"},Io=({group:e,node:t,values:o,draft:r,isOpen:n,isReadOnly:s,onToggle:i,onChange:c,renderSecondaryInspector:a,validationErrors:l})=>{let{i18nRegistry:u}=P();return Re.default.createElement(Ie.ToggablePanel,{isOpen:n,onPanelToggle:i,className:"sitegeist-resource-reference-editor__group"},Re.default.createElement(Ie.ToggablePanel.Header,{theme:gr},e.icon&&Re.default.createElement("div",{className:"sitegeist-resource-reference-editor__group-icon"},Re.default.createElement(Ie.Icon,{icon:e.icon})),q(u,e.label)),Re.default.createElement(Ie.ToggablePanel.Contents,null,tt(e).map(f=>Re.default.createElement(Eo,{key:`${t?.contextPath??"new"}-${f.id}`,item:f,node:t,value:f.id==="_nodeType"?t?.nodeType:o[f.id],hooks:r[f.id]?.hooks,isChanged:!!r[f.id],isReadOnly:s,onChange:c,renderSecondaryInspector:a,validationErrors:l[f.id]}))))};var Oo=({inspected:e,isLoading:t,isReadOnly:o,renderSecondaryInspector:r})=>{let{i18nRegistry:n,t:s}=P();return ee.default.createElement("div",{className:"sitegeist-resource-reference-editor__inspector"},ee.default.createElement("div",{className:"sitegeist-resource-reference-editor__inspector-body"},e.node?e.tabs.length===0?ee.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},s("inspector.noConfiguration","This node type has no inspector configuration.")):ee.default.createElement(Oe.Tabs,{className:"sitegeist-resource-reference-editor__tabs"},e.tabs.map(c=>ee.default.createElement(Oe.Tabs.Panel,{key:c.id,id:c.id,icon:c.icon,tooltip:q(n,c.label)},c.groups.map(a=>ee.default.createElement(Io,{key:a.id,group:a,node:e.node,values:e.values,draft:e.draft,isOpen:e.isPanelOpen(a.id,a.collapsed),onToggle:()=>e.togglePanel(a.id),isReadOnly:o,onChange:e.change,renderSecondaryInspector:r,validationErrors:e.validationErrors}))))):ee.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},s("inspector.empty","Select a resource to edit its properties."))),e.node&&!o&&ee.default.createElement("div",{className:"sitegeist-resource-reference-editor__inspector-footer"},ee.default.createElement(Oe.Button,{type:"button",style:"lighter",disabled:t||!e.hasChanges,onClick:e.discard},s("action.discard","Discard")),ee.default.createElement(Oe.Button,{type:"button",style:"success",disabled:t||!e.hasChanges,onClick:e.save},s("action.apply","Apply"))))};var de=_(D());var It=new Set,K=new WeakMap,Ne=new WeakMap,le=new WeakMap,ze=new WeakMap,Tt=new WeakMap,Ot=new WeakMap,Ce=new WeakMap,Me=new WeakMap,De=new WeakSet,ge,Mt=0,Bt=0,ce="__aa_tgt",Ge="__aa_del",ct="__aa_new",Bo=e=>{let t=br(e);t&&t.forEach(o=>xr(o))},mr=e=>{e.forEach(t=>{t.target===ge&&yr(),K.has(t.target)&&ke(t.target)})};function hr(e){let t=ze.get(e);t?.disconnect();let o=K.get(e),r=0,n=5;o||(o=Be(e),K.set(e,o));let{offsetWidth:s,offsetHeight:i}=ge,a=[o.top-n,s-(o.left+n+o.width),i-(o.top+n+o.height),o.left-n].map(u=>`${-1*Math.floor(u)}px`).join(" "),l=new IntersectionObserver(()=>{++r>1&&ke(e)},{root:ge,threshold:1,rootMargin:a});l.observe(e),ze.set(e,l)}function ke(e){clearTimeout(Me.get(e));let t=lt(e),o=Ve(t)?500:t.duration;Me.set(e,setTimeout(async()=>{let r=le.get(e);try{await r?.finished,K.set(e,Be(e)),hr(e)}catch{}},o))}function yr(){clearTimeout(Me.get(ge)),Me.set(ge,setTimeout(()=>{It.forEach(e=>Dt(e,t=>Ao(()=>ke(t))))},100))}function vr(e){setTimeout(()=>{Ot.set(e,setInterval(()=>Ao(ke.bind(null,e)),2e3))},Math.round(2e3*Math.random()))}function Ao(e){typeof requestIdleCallback=="function"?requestIdleCallback(()=>e()):requestAnimationFrame(()=>e())}var ae,Uo=typeof window<"u"&&"ResizeObserver"in window;Uo&&(ge=document.documentElement,new MutationObserver(Bo),ae=new ResizeObserver(mr),window.addEventListener("scroll",()=>{Bt=window.scrollY,Mt=window.scrollX}),ae.observe(ge));function br(e){return e.reduce((r,n)=>[...r,...Array.from(n.addedNodes),...Array.from(n.removedNodes)],[]).every(r=>r.nodeName==="#comment")?!1:e.reduce((r,n)=>{if(r===!1)return!1;if(n.target instanceof Element){if(Et(n.target),!r.has(n.target)){r.add(n.target);for(let s=0;s<n.target.children.length;s++){let i=n.target.children.item(s);if(i){if(Ge in i)return!1;Et(n.target,i),r.add(i)}}}if(n.removedNodes.length)for(let s=0;s<n.removedNodes.length;s++){let i=n.removedNodes[s];if(Ge in i)return!1;i instanceof Element&&(r.add(i),Et(n.target,i),Ne.set(i,[n.previousSibling,n.nextSibling]))}}return r},new Set)}function Et(e,t){!t&&!(ce in e)?Object.defineProperty(e,ce,{value:e}):t&&!(ce in t)&&Object.defineProperty(t,ce,{value:e})}function xr(e){var t;let o=e.isConnected,r=K.has(e);o&&Ne.has(e)&&Ne.delete(e),le.has(e)&&((t=le.get(e))===null||t===void 0||t.cancel()),ct in e?Do(e):r&&o?_r(e):r&&!o?Rr(e):Do(e)}function te(e){return Number(e.replace(/[^0-9.\-]/g,""))}function wr(e){let t=e.parentElement;for(;t;){if(t.scrollLeft||t.scrollTop)return{x:t.scrollLeft,y:t.scrollTop};t=t.parentElement}return{x:0,y:0}}function Be(e){let t=e.getBoundingClientRect(),{x:o,y:r}=wr(e);return{top:t.top+r,left:t.left+o,width:t.width,height:t.height}}function Lo(e,t,o){let r=t.width,n=t.height,s=o.width,i=o.height,c=getComputedStyle(e);if(c.getPropertyValue("box-sizing")==="content-box"){let l=te(c.paddingTop)+te(c.paddingBottom)+te(c.borderTopWidth)+te(c.borderBottomWidth),u=te(c.paddingLeft)+te(c.paddingRight)+te(c.borderRightWidth)+te(c.borderLeftWidth);r-=u,s-=u,n-=l,i-=l}return[r,s,n,i].map(Math.round)}function lt(e){return ce in e&&Ce.has(e[ce])?Ce.get(e[ce]):{duration:250,easing:"ease-in-out"}}function Fo(e){if(ce in e)return e[ce]}function At(e){let t=Fo(e);return t?De.has(t):!1}function Dt(e,...t){t.forEach(o=>o(e,Ce.has(e)));for(let o=0;o<e.children.length;o++){let r=e.children.item(o);r&&t.forEach(n=>n(r,Ce.has(r)))}}function Ut(e){return Array.isArray(e)?e:[e]}function Ve(e){return typeof e=="function"}function _r(e){let t=K.get(e),o=Be(e);if(!At(e))return K.set(e,o);let r;if(!t)return;let n=lt(e);if(typeof n!="function"){let s=t.left-o.left,i=t.top-o.top,[c,a,l,u]=Lo(e,t,o),f={transform:`translate(${s}px, ${i}px)`},d={transform:"translate(0, 0)"};c!==a&&(f.width=`${c}px`,d.width=`${a}px`),l!==u&&(f.height=`${l}px`,d.height=`${u}px`),r=e.animate([f,d],{duration:n.duration,easing:n.easing})}else{let[s]=Ut(n(e,"remain",t,o));r=new Animation(s),r.play()}le.set(e,r),K.set(e,o),r.addEventListener("finish",()=>ke(e),{once:!0})}function Do(e){ct in e&&delete e[ct];let t=Be(e);K.set(e,t);let o=lt(e);if(!At(e))return;let r;if(typeof o!="function")r=e.animate([{transform:"scale(.98)",opacity:0},{transform:"scale(0.98)",opacity:0,offset:.5},{transform:"scale(1)",opacity:1}],{duration:o.duration*1.5,easing:"ease-in"});else{let[n]=Ut(o(e,"add",t));r=new Animation(n),r.play()}le.set(e,r),r.addEventListener("finish",()=>ke(e),{once:!0})}function Mo(e,t){var o;e.remove(),K.delete(e),Ne.delete(e),le.delete(e),(o=ze.get(e))===null||o===void 0||o.disconnect(),setTimeout(()=>{if(Ge in e&&delete e[Ge],Object.defineProperty(e,ct,{value:!0,configurable:!0}),t&&e instanceof HTMLElement)for(let r in t)e.style[r]=""},0)}function Rr(e){var t;if(!Ne.has(e)||!K.has(e))return;let[o,r]=Ne.get(e);Object.defineProperty(e,Ge,{value:!0,configurable:!0});let n=window.scrollX,s=window.scrollY;if(r&&r.parentNode&&r.parentNode instanceof Element?r.parentNode.insertBefore(e,r):o&&o.parentNode?o.parentNode.appendChild(e):(t=Fo(e))===null||t===void 0||t.appendChild(e),!At(e))return Mo(e);let[i,c,a,l]=Nr(e),u=lt(e),f=K.get(e);(n!==Mt||s!==Bt)&&Cr(e,n,s,u);let d,y={position:"absolute",top:`${i}px`,left:`${c}px`,width:`${a}px`,height:`${l}px`,margin:"0",pointerEvents:"none",transformOrigin:"center",zIndex:"100"};if(!Ve(u))Object.assign(e.style,y),d=e.animate([{transform:"scale(1)",opacity:1},{transform:"scale(.98)",opacity:0}],{duration:u.duration,easing:"ease-out"});else{let[C,m]=Ut(u(e,"remove",f));m?.styleReset!==!1&&(y=m?.styleReset||y,Object.assign(e.style,y)),d=new Animation(C),d.play()}le.set(e,d),d.addEventListener("finish",()=>Mo(e,y),{once:!0})}function Cr(e,t,o,r){let n=Mt-t,s=Bt-o,i=document.documentElement.style.scrollBehavior;if(getComputedStyle(ge).scrollBehavior==="smooth"&&(document.documentElement.style.scrollBehavior="auto"),window.scrollTo(window.scrollX+n,window.scrollY+s),!e.parentElement)return;let a=e.parentElement,l=a.clientHeight,u=a.clientWidth,f=performance.now();function d(){requestAnimationFrame(()=>{if(!Ve(r)){let y=l-a.clientHeight,C=u-a.clientWidth;f+r.duration>performance.now()?(window.scrollTo({left:window.scrollX-C,top:window.scrollY-y}),l=a.clientHeight,u=a.clientWidth,d()):document.documentElement.style.scrollBehavior=i}})}d()}function Nr(e){let t=K.get(e),[o,,r]=Lo(e,t,Be(e)),n=e.parentElement;for(;n&&(getComputedStyle(n).position==="static"||n instanceof HTMLBodyElement);)n=n.parentElement;n||(n=document.body);let s=getComputedStyle(n),i=K.get(n)||Be(n),c=Math.round(t.top-i.top)-te(s.borderTopWidth),a=Math.round(t.left-i.left)-te(s.borderLeftWidth);return[c,a,o,r]}function jo(e,t={}){if(Uo&&ae&&!(window.matchMedia("(prefers-reduced-motion: reduce)").matches&&!Ve(t)&&!t.disrespectUserMotionPreference)){De.add(e),getComputedStyle(e).position==="static"&&Object.assign(e.style,{position:"relative"}),Dt(e,ke,vr,i=>ae?.observe(i)),Ve(t)?Ce.set(e,t):Ce.set(e,{duration:250,easing:"ease-in-out",...t});let s=new MutationObserver(Bo);s.observe(e,{childList:!0}),Tt.set(e,s),It.add(e)}return Object.freeze({parent:e,enable:()=>{De.add(e)},disable:()=>{De.delete(e)},isEnabled:()=>De.has(e),destroy:()=>{De.delete(e),It.delete(e),Ce.delete(e);let r=Tt.get(e);r?.disconnect(),Tt.delete(e),Dt(e,n=>{ae?.unobserve(n);let s=le.get(n);try{s?.cancel()}catch{}le.delete(n);let i=ze.get(n);i?.disconnect(),ze.delete(n);let c=Ot.get(n);c&&clearInterval(c),Ot.delete(n);let a=Me.get(n);a&&clearTimeout(a),Me.delete(n),K.delete(n),Ne.delete(n)})}})}var A=_(D()),me=_(Z());var Lt=20,Ho=({resource:e,isActive:t,isReferenced:o,isSelecting:r,isSelected:n,isUsable:s,depth:i,guides:c,onOpen:a,onToggleSelection:l,onPick:u,onToggleReference:f,isDraggable:d,isDragged:y,onDragStart:C,onDragEnd:m,onMoveByKey:x})=>{let{nodeTypesRegistry:E,i18nRegistry:M,t:S}=P(),B=E.getNodeType(e.nodeType),N=r?l:a,O=A.default.useRef(null);return A.default.useEffect(()=>{t&&O.current?.scrollIntoView({block:"nearest"})},[t]),A.default.createElement("div",{ref:O,role:"button",tabIndex:0,className:["sitegeist-resource-reference-editor__item",t&&!r?"sitegeist-resource-reference-editor__item--active":"",r&&n?"sitegeist-resource-reference-editor__item--selected":"",we(e)?"sitegeist-resource-reference-editor__item--hidden":"",i>0?"sitegeist-resource-reference-editor__item--child":"",y?"sitegeist-resource-reference-editor__item--dragged":""].join(" "),"data-context-path":e.contextPath,draggable:d,onDragStart:b=>{b.dataTransfer.effectAllowed="move",b.dataTransfer.setData("text/plain",e.label??""),C(b.clientY)},onDragEnd:m,style:i>0?{marginLeft:`${i*Lt}px`}:void 0,onMouseDown:b=>{b.shiftKey&&b.preventDefault()},onClick:b=>b.shiftKey?u():N(),onKeyDown:b=>{if(b.altKey&&(b.key==="ArrowUp"||b.key==="ArrowDown")){b.preventDefault(),x(b.key==="ArrowUp"?-1:1);return}(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),N())}},c.map(b=>A.default.createElement("span",{key:b.level,"aria-hidden":"true",className:"sitegeist-resource-reference-editor__guide"+(b.isEnd?" sitegeist-resource-reference-editor__guide--end":""),style:{left:`${-((i-b.level)*Lt)-Lt/2}px`}})),r&&A.default.createElement("span",{className:"sitegeist-resource-reference-editor__item-select"},A.default.createElement(me.CheckBox,{isChecked:n,onChange:l})),A.default.createElement(me.Icon,{icon:B?.ui?.icon??"file"}),A.default.createElement("div",{className:"sitegeist-resource-reference-editor__item-label"},A.default.createElement("strong",{className:e.label?"":"sitegeist-resource-reference-editor__item-unnamed"},e.label||q(M,B?.ui?.label)||e.identifier),A.default.createElement("small",null,q(M,B?.ui?.label)||e.nodeType)),A.default.createElement("span",{className:"sitegeist-resource-reference-editor__item-actions"+(r?" sitegeist-resource-reference-editor__item-actions--inert":"")},we(e)&&A.default.createElement("span",{className:"sitegeist-resource-reference-editor__hidden-badge",title:S("resource.hiddenTitle","This resource is hidden")},A.default.createElement(me.Icon,{icon:"eye-slash"})," ",S("resource.hidden","Hidden")),s&&A.default.createElement("button",{type:"button",className:"sitegeist-resource-reference-editor__use"+(o?" sitegeist-resource-reference-editor__use--active":""),onClick:b=>{b.stopPropagation(),f()}},o?A.default.createElement(A.default.Fragment,null,A.default.createElement("span",{className:"sitegeist-resource-reference-editor__use-state"},A.default.createElement(me.Icon,{icon:"check"})," ",S("action.inUse","In use")),A.default.createElement("span",{className:"sitegeist-resource-reference-editor__use-action"},A.default.createElement(me.Icon,{icon:"times"})," ",S("action.remove","Remove"))):A.default.createElement(A.default.Fragment,null,A.default.createElement(me.Icon,{icon:"plus"})," ",S("action.use","Use")))))};var kr=(e,t)=>{let{depth:o}=e[t],r=[];for(let n=1;n<=o;n++){let s=!1;for(let i=t+1;i<e.length&&e[i].depth>=n;i++)if(e[i].depth===n){s=!0;break}s?r.push({level:n,isEnd:!1}):n===o&&r.push({level:n,isEnd:!0})}return r},qe=e=>e.ancestors[e.ancestors.length-1]?.contextPath??null,$o=(e,t)=>e.depth===t.depth&&qe(e)===qe(t),Wo=(e,t)=>{let o=t+1;for(;o<e.length&&e[o].depth>e[t].depth;)o++;return[t,o]},he=(e,t)=>e.findIndex(o=>o.resource.contextPath===t),Pr=(e,t,o,r)=>{let[n,s]=Wo(e,he(e,t)),i=e.slice(n,s),c=[...e.slice(0,n),...e.slice(s)],a=he(c,o),l=r==="before"?a:Wo(c,a)[1];return[...c.slice(0,l),...i,...c.slice(l)]},Sr=4,Tr=(e,t,o,r)=>{let n=e[he(e,t)],s=e[he(e,o)];if(!n||!s||t===o||!$o(s,n))return null;let i=he(e,o)<he(e,t);return i!==(r==="up")?null:Pr(e,t,o,i?"before":"after")},Ft=(e,t)=>e.filter(o=>$o(o,t)),zo=({rows:e,isLoading:t,activeContextPath:o,referencedIdentifiers:r,isSelecting:n,selection:s,usableNodeTypes:i,onOpen:c,onToggleSelection:a,onPick:l,onToggleReference:u,canReorder:f,onMove:d})=>{let{nodeTypesRegistry:y,t:C}=P(),m=de.default.useRef(null),[x,E]=de.default.useState(null),[M,S]=de.default.useState(null),B=M??e,N=de.default.useRef({y:0,direction:null});de.default.useEffect(()=>{m.current&&jo(m.current,{duration:160,easing:"ease-out"})},[]);let O=(p,h)=>{let w=p[he(p,h)],R=e[he(e,h)];if(!w||!R)return;let I=Ft(e,R).map(L=>L.resource.contextPath),g=Ft(p,w);if(I.join("|")===g.map(L=>L.resource.contextPath).join("|"))return;let v=g.findIndex(L=>L.resource.contextPath===h),T=g[v+1],$=g[v-1];T?d(w.resource,T.resource,"before",qe(w)):$&&d(w.resource,$.resource,"after",qe(w))},b=()=>{E(null),S(null)},H=(p,h)=>{let w=Ft(e,p),R=w.findIndex(g=>g.resource.contextPath===p.resource.contextPath),I=w[R+h];I&&d(p.resource,I.resource,h<0?"before":"after",qe(p))};return de.default.createElement("div",{ref:m,className:"sitegeist-resource-reference-editor__list",onDragOver:p=>{if(!x)return;p.preventDefault(),p.dataTransfer.dropEffect="move";let h=p.clientY-N.current.y;Math.abs(h)>=Sr&&(N.current={y:p.clientY,direction:h<0?"up":"down"});let{direction:w}=N.current,R=p.target.closest?.("[data-context-path]")?.getAttribute("data-context-path");if(R&&w){let I=Tr(B,x,R,w);I&&S(I)}},onDrop:p=>{p.preventDefault(),x&&M&&O(M,x),b()}},B.length===0&&de.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},t?C("list.loading","Loading\u2026"):C("list.empty","No resources found.")),B.map((p,h)=>de.default.createElement(Ho,{key:p.resource.contextPath,resource:p.resource,depth:p.depth,guides:kr(B,h),isActive:o===p.resource.contextPath,isReferenced:r.includes(p.resource.identifier),isSelecting:n,isSelected:s.includes(p.resource.contextPath),isUsable:et(y,p.resource.nodeType,i),isDraggable:f&&!p.resource.tethered&&!!p.resource.canManage,isDragged:x===p.resource.contextPath,onDragStart:w=>{N.current={y:w,direction:null},E(p.resource.contextPath),S(e)},onDragEnd:b,onMoveByKey:w=>{f&&!p.resource.tethered&&p.resource.canManage&&H(p,w)},onOpen:()=>c(p.resource),onToggleSelection:()=>a(p.resource),onPick:()=>l(p.resource),onToggleReference:()=>u(p.resource.identifier)})))};var ye=_(D()),Ae=_(Z());var J=_(D()),Ye=_(Z());var Go=({groups:e,isDisabled:t,isBusy:o,onCreate:r})=>{let{t:n}=P(),[s,i]=J.default.useState(!1),c=J.default.useRef(null),a=e.flatMap(f=>f.options);J.default.useEffect(()=>{if(!s)return;let f=y=>{c.current?.contains(y.target)||i(!1)},d=y=>{y.key==="Escape"&&(y.stopPropagation(),i(!1))};return document.addEventListener("mousedown",f),document.addEventListener("keydown",d,!0),()=>{document.removeEventListener("mousedown",f),document.removeEventListener("keydown",d,!0)}},[s]);let l=f=>{i(!1),r(f)},u=f=>J.default.createElement("button",{key:(f.parentContextPath??"")+f.nodeTypeName,type:"button",role:"menuitem",className:"sitegeist-resource-reference-editor__create-option",onClick:()=>l(f)},J.default.createElement(Ye.Icon,{icon:f.icon??"file"})," ",f.label);return a.length<=1?J.default.createElement(Ye.Button,{type:"button",style:"lighter",disabled:t||a.length===0,title:a[0]?.label,onClick:()=>a[0]&&l(a[0])},J.default.createElement(_e,{icon:"plus",isBusy:o})," ",n("action.new","New")):J.default.createElement("div",{className:"sitegeist-resource-reference-editor__create-menu",ref:c},J.default.createElement(Ye.Button,{type:"button",style:"lighter",disabled:t,"aria-haspopup":"menu","aria-expanded":s,onClick:()=>i(f=>!f)},J.default.createElement(_e,{icon:"plus",isBusy:o})," ",n("action.new","New")),s&&J.default.createElement("div",{className:"sitegeist-resource-reference-editor__create-options",role:"menu"},e.map(f=>J.default.createElement(J.default.Fragment,{key:f.label??""},f.label&&J.default.createElement("span",{className:"sitegeist-resource-reference-editor__create-section"},f.label),f.options.map(u)))))};var Vo=({filter:e,onFilter:t,isLoading:o,isCreating:r,isSelecting:n,canSelect:s,createGroups:i,onCreate:c,onEnterSelection:a,onLeaveSelection:l})=>{let{t:u}=P();return ye.default.createElement("div",{className:"sitegeist-resource-reference-editor__toolbar"},ye.default.createElement("input",{className:"sitegeist-resource-reference-editor__search",type:"search",value:e,placeholder:u("list.search","Filter resources"),onChange:f=>t(f.currentTarget.value)}),i.length>0&&ye.default.createElement(Go,{groups:i,isDisabled:o,isBusy:r,onCreate:c}),n?ye.default.createElement(Ae.Button,{type:"button",style:"lighter",onClick:l},ye.default.createElement(Ae.Icon,{icon:"check"})," ",u("action.done","Done")):ye.default.createElement(Ae.Button,{type:"button",style:"lighter",disabled:o||!s,onClick:a},ye.default.createElement(Ae.Icon,{icon:"list-check"})," ",u("action.selectMultiple","Select multiple")))};var dt=({isOpen:e,onClose:t,collection:o,tree:r,inspected:n,selection:s,references:i,actions:c,creationType:a,usableNodeTypes:l,renderSecondaryInspector:u,secondaryInspector:f,onCloseSecondaryInspector:d,header:y})=>{let{nodeTypesRegistry:C,i18nRegistry:m,t:x}=P(),[E,M]=G.default.useState(""),S=E.trim().toLocaleLowerCase(),B=S===""?r.rows:r.rows.filter(k=>(k.resource.label??"").toLocaleLowerCase().includes(S)),N=B.map(k=>k.resource),O=k=>et(C,k.nodeType,l),b=s.selected.filter(O),H=n.node?r.rows.find(k=>k.resource.contextPath===n.node.contextPath)??null:null,p=H?.resource??null,h=s.isSelecting?s.selected:p?[p]:[],w=H?[...H.ancestors,H.resource].map(k=>k.label):[],R=C.getNodeType(a),I=k=>k.canManage?io(C,m,k.nodeType).map(er=>({...er,parentContextPath:k.contextPath})):[],g=k=>x("action.createIn","In \u201C{name}\u201D",{name:k}),v=o.container?.canManage??!1,T=h.length>0?h.every(k=>!!k.canManage):v,$=!p?.canManage,L=s.isSelecting?null:H,F=L?.ancestors[L.ancestors.length-1]??null,oe=[F?{label:g(F.label),options:I(F)}:{options:v?[{nodeTypeName:a,label:q(m,R?.ui?.label)||a,icon:R?.ui?.icon}]:[]},...L?[{label:g(L.resource.label),options:I(L.resource)}]:[]].filter(k=>k.options.length>0),ve=G.default.createElement(G.default.Fragment,null,y,G.default.createElement("div",{className:"sitegeist-resource-reference-editor__layout"},G.default.createElement("button",{type:"button",className:"sitegeist-resource-reference-editor__close",title:x("action.close","Close"),"aria-label":x("action.close","Close"),onClick:t},G.default.createElement(Ke.Icon,{icon:"times"})),G.default.createElement("div",{className:"sitegeist-resource-reference-editor__content"},o.error&&G.default.createElement("div",{className:"sitegeist-resource-reference-editor__state sitegeist-resource-reference-editor__error"},o.error),G.default.createElement(Vo,{filter:E,onFilter:M,isLoading:o.isLoading,isCreating:o.activity==="create",isSelecting:s.isSelecting,canSelect:N.length>0,createGroups:oe,onCreate:k=>c.create(k.parentContextPath?{parentContextPath:k.parentContextPath,nodeTypeName:k.nodeTypeName}:void 0),onEnterSelection:()=>s.enter(p?[p.contextPath]:[]),onLeaveSelection:s.leave}),G.default.createElement("div",{className:"sitegeist-resource-reference-editor__progress"+(o.isLoading?" sitegeist-resource-reference-editor__progress--active":""),"aria-hidden":"true"}),G.default.createElement(zo,{rows:B,usableNodeTypes:l,isLoading:o.isLoading,activeContextPath:n.node?.contextPath,referencedIdentifiers:i.referenced,isSelecting:s.isSelecting,selection:s.selection,onOpen:n.inspect,onToggleSelection:s.toggle,onPick:k=>s.pick(k,p?[p.contextPath]:[]),onToggleReference:i.toggle,canReorder:S===""&&!s.isSelecting&&!o.isLoading,onMove:c.move}),G.default.createElement(ko,{targets:h,selectableResources:N,selection:s.selection,isSelecting:s.isSelecting,isLoading:o.isLoading,activity:o.activity,canDuplicate:v,canChangeTargets:T,isMultiple:i.isMultiple,path:w,canUseSelection:b.length>0,selectionIsReferenced:b.length>0&&b.every(k=>i.referenced.includes(k.identifier)),onDuplicate:()=>c.duplicate(h),onSetHidden:k=>c.setHidden(h,k),onDelete:()=>c.requestRemoval(h),onSetSelection:s.setSelection,onUseSelection:()=>{i.addMany(b.map(k=>k.identifier)),s.leave()},onUnuseSelection:()=>{i.drop(b.map(k=>k.identifier)),s.leave()}})),f&&G.default.createElement("div",{className:"sitegeist-resource-reference-editor__secondary"},G.default.createElement("button",{type:"button",className:"sitegeist-resource-reference-editor__secondary-close",title:x("action.close","Close"),onClick:d},G.default.createElement(Ke.Icon,{icon:"times"})),f),G.default.createElement(Oo,{inspected:n,isReadOnly:$,isLoading:o.isLoading,renderSecondaryInspector:u})));return G.default.createElement(Ke.Dialog,{isOpen:e,title:"",style:"jumbo",onRequestClose:f?d:t,actions:[]},ve)};var Er=({collection:e,routes:t,header:o,onClose:r})=>{let n=U.default.useMemo(()=>({options:e.options,value:null,commit:()=>{},neos:{routes:t}}),[e,t]),{secondary:s,collection:i,tree:c,selection:a,inspected:l,actions:u}=it(n,yt,()=>{});return U.default.useEffect(()=>{i.run(()=>i.reload())},[i.reload]),U.default.createElement(U.default.Fragment,null,U.default.createElement(dt,{isOpen:!0,header:o,onClose:()=>{s.close(),r()},collection:i,tree:c,inspected:l,selection:a,references:yt,actions:u,creationType:e.options.resourceCreation.type,usableNodeTypes:[],renderSecondaryInspector:s.render,secondaryInspector:s.secondaryInspector?.element??null,onCloseSecondaryInspector:s.close}),u.pendingRemoval&&U.default.createElement(at,{resources:u.pendingRemoval,usage:u.pendingRemovalUsage,onCancel:u.cancelRemoval,onHideInstead:f=>{u.cancelRemoval(),u.setHidden(f,!0)},onConfirm:u.remove}))},qo=({routes:e,className:t})=>{let{nodeTypesRegistry:o,i18nRegistry:r,t:n}=P(),{isOpen:s,collection:i}=to(),c=U.default.useMemo(()=>Xe(o,r),[o,r]),[a,l]=U.default.useState(null);U.default.useEffect(()=>{s&&l(i??c[0]?.name??null)},[s,i]);let u=c.find(d=>d.name===a)??c[0]??null,f=U.default.createElement("div",{className:"sitegeist-resource-reference-editor__manager-tabs",role:"tablist"},c.map(d=>U.default.createElement("button",{key:d.name,type:"button",role:"tab","aria-selected":d.name===u?.name,className:"sitegeist-resource-reference-editor__manager-tab"+(d.name===u?.name?" sitegeist-resource-reference-editor__manager-tab--active":""),onClick:()=>l(d.name)},d.label)));return U.default.createElement(U.default.Fragment,null,U.default.createElement(Ue.IconButton,{className:t,icon:"box-archive",title:n("manager.open","Resources"),"aria-label":n("manager.open","Resources"),onClick:()=>Ze()}),s&&U.default.createElement(U.default.Fragment,null,U.default.createElement("style",null,Ee),u?U.default.createElement(Er,{key:u.name,collection:u,routes:e,header:f,onClose:ht}):U.default.createElement(Ir,{onClose:ht})))},Ir=({onClose:e})=>{let{t}=P();return U.default.createElement(Ue.Dialog,{isOpen:!0,title:t("manager.open","Resources"),onRequestClose:e,actions:[U.default.createElement(Ue.Button,{key:"close",type:"button",style:"lighter",onClick:e},t("action.close","Close"))]},U.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},t("manager.empty","No resource collections yet - a collection appears here once a property uses the resource reference editor.")))};var j=_(D()),Jo=_(Ko()),ut=_(Z());var Xo="Sitegeist.ResourceReferenceEditor:sidebarSectionOpen",Or=()=>{try{return window.localStorage.getItem(Xo)==="1"}catch{return!1}},Dr=e=>{try{window.localStorage.setItem(Xo,e?"1":"0")}catch{}},Qo=({routes:e})=>{let{nodeTypesRegistry:t,i18nRegistry:o,store:r,t:n}=P(),s=j.default.useRef(null),[i,c]=j.default.useState(null),[a,l]=j.default.useState(Or),[u,f]=j.default.useState({}),d=j.default.useMemo(()=>Xe(t,o),[t,o]);j.default.useLayoutEffect(()=>{let m=s.current?.parentElement?.parentElement;if(!m)return;let x=document.createElement("div");return x.className="sitegeist-resource-reference-editor__sidebar-host",m.appendChild(x),c(x),()=>{x.remove()}},[]),j.default.useEffect(()=>{a&&d.forEach(m=>{let x=m.options.resourceCreation;nt(r,x,e).then(E=>st(r,e,m.options,E.contextPath)).then(E=>f(M=>({...M,[m.name]:E.length}))).catch(()=>{})})},[a,d,e,r]);let y=()=>{l(m=>(Dr(!m),!m))},C=d.length===0?null:j.default.createElement("div",{className:"sitegeist-resource-reference-editor__sidebar"},j.default.createElement("style",null,Ee),j.default.createElement("div",{role:"button",className:"sitegeist-resource-reference-editor__sidebar-toggle",onClick:y},j.default.createElement(ut.IconButton,{className:"sitegeist-resource-reference-editor__sidebar-toggle-button",icon:a?"chevron-circle-down":"chevron-circle-up",hoverStyle:"clean","aria-label":n("sidebar.toggle","Toggle resources")}),j.default.createElement("span",{className:"sitegeist-resource-reference-editor__sidebar-label"},n("manager.open","Resources"))),a&&j.default.createElement("ul",{className:"sitegeist-resource-reference-editor__sidebar-list"},d.map(m=>j.default.createElement("li",{key:m.name},j.default.createElement("button",{type:"button",className:"sitegeist-resource-reference-editor__sidebar-item",onClick:()=>Ze(m.name)},j.default.createElement(ut.Icon,{icon:m.icon??"box-archive"}),j.default.createElement("span",{className:"sitegeist-resource-reference-editor__sidebar-item-label"},m.label),u[m.name]!==void 0&&j.default.createElement("span",{className:"sitegeist-resource-reference-editor__sidebar-count"},u[m.name]))))));return j.default.createElement(j.default.Fragment,null,j.default.createElement("span",{ref:s,hidden:!0}),i&&C&&Jo.default.createPortal(C,i))};var V=_(D()),Le=_(Z());var Zo=({ReferenceEditor:e,ReferencesEditor:t,...o})=>{let{i18nRegistry:r,nodeTypesRegistry:n,t:s}=P(),[i,c]=V.default.useState(!1),a=o.options.resourceCreation,l=ro(o),u=()=>c(!0),{secondary:f,collection:d,tree:y,selection:C,inspected:m,actions:x}=it(o,l,u);V.default.useEffect(()=>{d.resolve().catch(()=>{})},[d.resolve]);let E=d.container?.canManage??null,M=async()=>{u(),await d.run(()=>d.reload())},S=()=>{f.close(),c(!1)},B=h=>{if(!l.isMultiple)return h.closest('[class*="selectBoxHeader"]')&&l.referenced.length===1?l.referenced[0]:null;let w=h.closest('[class*="selectedOptions__innerPreview"]')?.closest("li"),R=w?.parentElement;return!w||!R?null:l.referenced[Array.prototype.indexOf.call(R.children,w)]??null},N=h=>{let w=h.target;if(!w||w.closest("input, button"))return;let R=B(w);if(!R)return;h.preventDefault(),h.stopPropagation(),u();let I=d.resources.find(g=>g.identifier===R);d.run(async()=>{if(I){await Promise.all([d.reload(),m.inspect(I)]);return}let{resources:g}=await d.reload(),v=g.find(T=>T.identifier===R);v&&await m.inspect(v)})},{resourceCreation:O,...b}=o.options,H=o.options.nodeTypes??[a.type],p=H.length===1?q(r,n.getNodeType(H[0])?.ui?.label):"";return V.default.createElement(V.default.Fragment,null,V.default.createElement("style",null,Ee),V.default.createElement("div",{className:"sitegeist-resource-reference-editor__reference",style:{"--sitegeist-resource-type":JSON.stringify(p)},onClickCapture:N},l.isMultiple&&t?V.default.createElement(t,{key:d.version,...o,options:b}):V.default.createElement(e,{key:d.version,...o,options:b})),V.default.createElement("div",{className:"sitegeist-resource-reference-editor__actions"},E!==!1&&V.default.createElement(Le.Button,{className:"sitegeist-resource-reference-editor__create",type:"button",style:"lighter",disabled:o.options.disabled||d.isLoading||E===null,onClick:x.create,title:a.buttonLabel??s("action.createNew","Create new"),"aria-label":a.buttonLabel??s("action.createNew","Create new")},V.default.createElement(Le.Icon,{icon:"plus"})),V.default.createElement(Le.Button,{type:"button",style:"lighter",disabled:o.options.disabled||d.isLoading,onClick:M},V.default.createElement(Le.Icon,{icon:"list"})," ",s("action.showAll","Show all"))),V.default.createElement(dt,{isOpen:i,onClose:S,collection:d,tree:y,inspected:m,selection:C,references:l,actions:x,creationType:a.type,usableNodeTypes:H,renderSecondaryInspector:f.render,secondaryInspector:f.secondaryInspector?.element??null,onCloseSecondaryInspector:f.close}),x.pendingRemoval&&V.default.createElement(at,{resources:x.pendingRemoval,usage:x.pendingRemovalUsage,onCancel:x.cancelRemoval,onHideInstead:h=>{x.cancelRemoval(),x.setHidden(h,!0)},onConfirm:x.remove}))};Wt("Sitegeist.ResourceReferenceEditor",{},(e,{store:t,routes:o})=>{let r=e.get("inspector"),n=r?.get("editors"),s=r?.get("saveHooks"),i=e.get("validators"),c=n?.get("Neos.Neos/Inspector/Editors/ReferenceEditor"),a=n?.get("Neos.Neos/Inspector/Editors/ReferencesEditor"),l=e.get("@neos-project/neos-ui-contentrepository"),u=e.get("i18n");if(!n||!c?.component||!l){console.warn("[Sitegeist.ResourceReferenceEditor] Required Neos UI registries are missing.");return}e.get("sagas")?.set("Sitegeist.ResourceReferenceEditor/CreationDialog",{saga:Yt});let f={store:t,globalRegistry:e,nodeTypesRegistry:l,saveHooksRegistry:s,validatorsRegistry:i,i18nRegistry:u};e.get("containers")?.set("PrimaryToolbar/Right/SitegeistResourceManager",({className:d})=>Pe.default.createElement(Je,{registries:f},Pe.default.createElement(qo,{className:d,routes:o})),"start"),e.get("containers")?.set("LeftSideBar/Top/SitegeistResources",()=>Pe.default.createElement(Je,{registries:f},Pe.default.createElement(Qo,{routes:o})),"end"),n.set("Sitegeist.ResourceReferenceEditor/Inspector/Editors/ResourceReferenceEditor",{component:d=>Pe.default.createElement(Je,{registries:f},Pe.default.createElement(Zo,{...d,ReferenceEditor:c.component,ReferencesEditor:a?.component}))})});})();
//# sourceMappingURL=Plugin.js.map
