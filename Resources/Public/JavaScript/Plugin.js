(()=>{var tr=Object.create;var Lt=Object.defineProperty;var or=Object.getOwnPropertyDescriptor;var rr=Object.getOwnPropertyNames;var nr=Object.getPrototypeOf,sr=Object.prototype.hasOwnProperty;var ir=(e,t)=>()=>(e&&(t=e(e=0)),t);var Te=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var ar=(e,t,o,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of rr(t))!sr.call(e,n)&&n!==o&&Lt(e,n,{get:()=>t[n],enumerable:!(r=or(t,n))||r.enumerable});return e};var w=(e,t,o)=>(o=e!=null?tr(nr(e)):{},ar(t||!e||!e.__esModule?Lt(o,"default",{value:e,enumerable:!0}):o,e));function H(e){return(...t)=>{if(window["@Neos:HostPluginAPI"]&&window["@Neos:HostPluginAPI"][`@${e}`])return window["@Neos:HostPluginAPI"][`@${e}`](...t);throw new Error("You are trying to read from a consumer api that hasn't been initialized yet!")}}var oe=ir(()=>{});var A=Te((Ar,Ft)=>{oe();Ft.exports=H("vendor")().React});var ue=Te((Gr,Ht)=>{oe();Ht.exports=H("NeosProjectPackages")().NeosUiReduxStore});var ct=Te((qr,Wt)=>{oe();Wt.exports=H("vendor")().reduxSagaEffects});var Q=Te((Qr,Jt)=>{oe();Jt.exports=H("NeosProjectPackages")().ReactUiComponents});var So=Te((ps,To)=>{oe();To.exports=H("vendor")().ReactDOM});var Oo=Te((bs,Io)=>{oe();Io.exports=H("NeosProjectPackages")().NeosUiEditors});var Pe=w(A());oe();var cr=H("manifest"),jt=cr,{SynchronousRegistry:Lr,SynchronousMetaRegistry:Fr}=H("NeosProjectPackages")().NeosUiRegistry;oe();var X=H("NeosProjectPackages")().NeosUiBackendConnectorDefault,{fetchWithErrorHandling:Wr}=H("NeosProjectPackages")().NeosUiBackendConnector;var we=w(ue()),lt=w(ct()),dt=null,$t=e=>{let t=dt;dt=null,t&&e(t)},zt=async(e,t,o,r)=>{let[n]=await X.get().q([r]).get();return n&&e.dispatch(we.actions.CR.Nodes.merge({[n.contextPath]:n})),new Promise(s=>{dt={apply:i=>s(i),cancel:()=>s(null)},e.dispatch(we.actions.UI.NodeCreationDialog.open(t?.ui?.label??o,t?.ui?.creationDialog??{elements:{}},r,o))})};function*Gt(){yield(0,lt.takeEvery)(we.actionTypes.UI.NodeCreationDialog.APPLY,e=>$t(t=>t.apply(e?.payload??{}))),yield(0,lt.takeEvery)([we.actionTypes.UI.NodeCreationDialog.CANCEL,we.actionTypes.UI.NodeCreationDialog.BACK],()=>$t(e=>e.cancel()))}var ut=w(A()),Vt=w(ue()),qt=w(ct()),pt=!1,ft=new Set,Yt=e=>{pt=e,ft.forEach(t=>t(e))},gt=()=>{let[e,t]=ut.default.useState(pt);return ut.default.useEffect(()=>(ft.add(t),t(pt),()=>{ft.delete(t)}),[]),e},Ke=()=>/\/neos\/management\/resources\/?$/.test(window.location.pathname);function*Kt(){yield(0,qt.takeEvery)(Vt.actionTypes.CR.Nodes.SET_DOCUMENT_NODE,()=>{Ke()&&window.setTimeout(()=>{Ke()&&window.location.search!==""&&window.history.replaceState(window.history.state,"",window.location.pathname)},0)})}var I=w(A()),de=w(Q());var Je=w(ue()),Se=e=>{let t=e?.core?.service?.nodes;return typeof t!="string"?"":t.replace(/\/neos\/service\/nodes\/?$/,"")},Xt=async(e,t,o)=>{let r=e.getState(),n=r?.cr?.nodes?.documentNode??Je.selectors.CR.Nodes.focusedNodePathSelector(r);if(typeof n!="string")throw new Error("The node of the current editing session could not be resolved.");let s=new URLSearchParams({node:n,collection:t.collection});t.buttonLabel&&s.append("title",t.buttonLabel);let i=await fetch(`${Se(o)}/neos/service/data-source/sitegeist-resource-collections?${s.toString()}`,{credentials:"include",headers:{Accept:"application/json"}}),c=await i.text();if(!i.ok)throw new Error(`The resource collection "${t.collection}" could not be resolved (HTTP ${i.status}). ${c.slice(0,500)}`);let a=null;try{a=JSON.parse(c)}catch{throw new Error(`The resource collection data source did not answer with JSON: ${c.slice(0,500)}`)}let l=a?.contextPath??a?.data?.contextPath;if(typeof l!="string")throw new Error(`The resource collection "${t.collection}" has no node address: ${c.slice(0,500)}`);return{contextPath:l,canManage:!!(a?.canManage??a?.data?.canManage)}},Qt=async(e,t,o)=>{if(o.length===0)return{};let r=e.getState(),n=r?.cr?.nodes?.documentNode??Je.selectors.CR.Nodes.focusedNodePathSelector(r);if(typeof n!="string")return{};let s=new URLSearchParams({node:n,nodes:o.join(",")}),i=await fetch(`${Se(t)}/neos/service/data-source/sitegeist-resource-usage?${s.toString()}`,{credentials:"include",headers:{Accept:"application/json"}});if(!i.ok)return{};try{let c=await i.json();return c?.data??c??{}}catch{return{}}},Zt=async(e,t,o,r)=>mt(e,t,r,{nodeTypes:o.nodeTypes??[o.resourceCreation.type]}),mt=async(e,t,o,r={})=>{let n=e.getState(),s=n?.cr?.nodes?.documentNode??Je.selectors.CR.Nodes.focusedNodePathSelector(n);if(typeof s!="string")return[];let i=new URLSearchParams({node:s,parent:o});r.nodeTypes?.length&&i.append("nodeTypes",r.nodeTypes.join(","));let c=await fetch(`${Se(t)}/neos/service/data-source/sitegeist-resource-children?${i.toString()}`,{credentials:"include",headers:{Accept:"application/json"}}),a=await c.text();if(!c.ok)throw new Error(`The children of the resource could not be read (HTTP ${c.status}). `+a.slice(0,500));let l=JSON.parse(a);return l?.data??l??[]};var Le=w(A());var eo="Sitegeist.ResourceReferenceEditor",to="Main",V=(e,t)=>t?e?.translate?e.translate(t):t:"",lr=(e,t,o,r)=>e?.translate?e.translate(`${eo}:${to}:${t}`,o,r,eo,to):o,oo=e=>(t,o,r)=>lr(e,t,o,r);var ro=Le.default.createContext(null),Xe=({registries:e,children:t})=>{let o=Le.default.useMemo(()=>({...e,t:oo(e.i18nRegistry)}),[e]);return Le.default.createElement(ro.Provider,{value:o},t)},T=()=>{let e=Le.default.useContext(ro);if(!e)throw new Error("[Sitegeist.ResourceReferenceEditor] The Neos UI registries are only available below RegistriesProvider.");return e};var dr="Sitegeist.ResourceReferenceEditor/Inspector/Editors/ResourceReferenceEditor",no=(e,t)=>{let o=new Map;for(let r of e?.getAllAsList?.()??[]){let n=[...Object.values(r?.properties??{}),...Object.values(r?.references??{})];for(let s of n){let i=s?.ui?.inspector,c=i?.editorOptions,a=c?.resourceCreation;if(i?.editor!==dr||!c||!a?.collection)continue;let l=o.get(a.collection);if(l){l.options={...l.options,nodeTypes:[...new Set([...l.options.nodeTypes??[],...c.nodeTypes??[]])]};continue}let f=e.getNodeType(a.type);o.set(a.collection,{name:a.collection,label:V(t,f?.ui?.label)||a.collection,icon:f?.ui?.icon,options:{...c,resourceCreation:a,multiple:!1,disabled:!1}})}}return[...o.values()].sort((r,n)=>r.label.localeCompare(n.label))};var so=w(A()),io=e=>{let t=!!e.options.multiple,{value:o,commit:r}=e,n=so.default.useMemo(()=>Array.isArray(o)?o:o?[o]:[],[o]),s=l=>{if(!t){r(l);return}let f=Array.isArray(o)?o:[];f.includes(l)||r([...f,l])},i=l=>{if(!t){l.length>0&&r(l[0]);return}let f=Array.isArray(o)?o:[],d=l.filter(u=>!f.includes(u));d.length>0&&r([...f,...d])},c=l=>{let f=new Set(l);if(t||Array.isArray(o)){let d=Array.isArray(o)?o:[],u=d.filter(m=>!f.has(m));u.length!==d.length&&r(u);return}typeof o=="string"&&f.has(o)&&r("")};return{referenced:n,isMultiple:t,add:s,addMany:i,drop:c,toggle:l=>{if(n.includes(l)){c([l]);return}s(l)}}},ht={referenced:[],isMultiple:!1,add:()=>{},addMany:()=>{},drop:()=>{},toggle:()=>{}};var re=w(A());var bt=w(ue());var Fe=w(ue()),ur=["Neos.Neos.Ui:UpdateNodeInfo","Neos.Neos.Ui:UpdateNodePreviewUrl","Neos.Neos.Ui:UpdateWorkspaceInfo","Neos.Neos.Ui:Success","Neos.Neos.Ui:Info","Neos.Neos.Ui:Warning","Neos.Neos.Ui:Error"],ao=(e,t)=>{if(typeof t!="string")return;let o=e.getState(),r=Fe.selectors.CR.Nodes.focusedNodePathSelector(o),n=o?.ui?.inspector?.valuesByNodePath?.[r]??{},s=Object.keys(n).filter(i=>n[i]!==void 0);s.length===1&&s[0]===t&&e.dispatch(Fe.actions.UI.Inspector.apply())},pe=(e,t)=>{let o=(t?.feedbacks??[]).filter(r=>ur.includes(r?.type));o.length>0&&e.dispatch(Fe.actions.ServerFeedback.handleServerFeedback({feedbacks:o}))},co=(e,t)=>(e?.feedbacks??[]).find(r=>r?.type==="Neos.Neos.Ui:UpdateNodeInfo")?.payload?.byContextPath?.[t]??null;var yt=w(ue()),je=async e=>{let t=X.get().endpoints?.syncWorkspace;if(!t)return;let o=e.getState(),r=yt.selectors.CR.Workspaces.personalWorkspaceNameSelector(o);if(typeof r!="string"||r==="")return;let n=await t(r,!1,yt.selectors.CR.ContentDimensions.active(o));if(n&&typeof n=="object"&&"conflicts"in n)throw new Error("Your workspace could not be brought up to date with the live workspace, because some of your changes conflict with it. Resolve the conflicts from the workspace dialog, then try again.");if(n&&typeof n=="object"&&"error"in n)throw new Error(n.error?.message??"Your workspace could not be brought up to date with the live workspace.")};var pr="Sitegeist.ResourceReferenceEditor:Resource",Qe=(e,t,o)=>o.some(r=>e.isOfType?.(t,r)??t===r),fr=(e,t)=>!!e.isOfType?.(t,pr),lo=(e,t,o)=>(e.getAllowedChildNodeTypes?.(o)??[]).map(r=>({name:r,nodeType:e.getNodeType(r)})).filter(({name:r,nodeType:n})=>!!n&&n.abstract!==!0&&fr(e,r)).map(({name:r,nodeType:n})=>({nodeTypeName:r,label:V(t,n?.ui?.label)||r,icon:n?.ui?.icon})).sort((r,n)=>r.label.localeCompare(n.label)),Ze=e=>(e.items??[]).filter(t=>t.type==="editor"&&t.editor&&t.hidden!==!0),uo=(e,t)=>(e.getInspectorViewConfigurationFor(t)?.tabs??[]).map(r=>({...r,groups:(r.groups??[]).filter(n=>Ze(n).length>0)})).filter(r=>r.groups.length>0),po=e=>{switch(e){case"integer":case"float":return 0;case"boolean":return!1;case"array":return[];default:return""}},fo=e=>Object.entries(e?.ui?.creationDialog?.elements??{}).filter(([,t])=>t?.ui?.editor&&t?.ui?.hidden!==!0).map(([t,o])=>({type:"editor",id:t,dataType:o.type,label:o.ui?.label??t,editor:o.ui.editor,editorOptions:o.ui.editorOptions,helpMessage:o.ui?.help,defaultValue:o.defaultValue,validation:o.validation})),go=(e,t)=>{if(!Array.isArray(e.requiredProperties))return["(stale editor configuration - flush the Neos caches)"];let o=new Set(t.map(r=>r.id));return[...e.unsupportedRequiredProperties??[],...e.requiredProperties.filter(r=>!o.has(r.name)).map(r=>r.name)]},mo=(e,t)=>e?.properties?.[t]??e?.references?.[t],ho=e=>e.flatMap(t=>t.groups.flatMap(o=>Ze(o)));var vt=async(e,t,o)=>{if(!t)return e;let r=e;for(let[n,s]of Object.entries(t)){let i=o?.get(n);if(!i)throw new Error(`There is no registered save hook function for identifier ${n}`);r=await i(r,s)}return r},yo=async(e,t)=>{let o={};for(let[r,n]of Object.entries(e))o[r]=await vt(n.value,n.hooks,t);return o};var vo=(e,t,o,r)=>{let n={};for(let s of e){let i=mo(t,s.id)?.validation;if(!i)continue;let c=Object.keys(i).map(a=>{let l=r?.get(a);return l?l(o[s.id],i[a]):(console.warn(`[Sitegeist.ResourceReferenceEditor] Validator ${a} not found`),null)}).filter(Boolean);c.length>0&&(n[s.id]=c)}return n},et=e=>{if(e instanceof Error)return e.message;if(typeof e=="string")return e;let t=e?.message??e?.error;if(typeof t=="string")return t;try{return JSON.stringify(e)}catch{return String(e)}};var fe="live",ge=(e,t)=>{if(!t)return e;try{let o=JSON.parse(e);return o?.workspaceName===t?e:JSON.stringify({...o,workspaceName:t})}catch{return e}};var bo=(e,t)=>{let{store:o,nodeTypesRegistry:r,saveHooksRegistry:n,validatorsRegistry:s}=T(),[i,c]=re.default.useState(null),[a,l]=re.default.useState([]),[f,d]=re.default.useState({}),[u,m]=re.default.useState({}),[C,R]=re.default.useState({}),[b,D]=re.default.useState({}),L=r.getNodeType(i?.nodeType),O=ho(a),M=Object.keys(u).length>0,k=()=>{m({}),d({}),R({}),t()},S=re.default.useRef(null),x=re.default.useRef(u);x.current=u;let F=(g,v)=>{o.dispatch(bt.actions.CR.Nodes.merge({[g.contextPath]:g}));let P=v?Object.fromEntries(Object.entries(x.current).map(([W,$])=>[W,$.value])):{};c(g),l(uo(r,g.nodeType)),d({...g.properties??{},...P})},p=async(g,v)=>{if(!v?.force&&S.current===g.contextPath)return;S.current=g.contextPath,k(),e.setError(null);let P=v?.force?null:o.getState()?.cr?.nodes?.byContextPath?.[g.contextPath];P&&F(P,!1);try{let[W]=await X.get().q([g.contextPath]).get();if(S.current!==g.contextPath)return;let $=W??P??g;if(P&&JSON.stringify($)===JSON.stringify(P))return;F($,!!P)}catch(W){if(S.current!==g.contextPath)return;P||(S.current=null),e.setError(et(W))}};return{node:i,nodeType:L,tabs:a,values:f,draft:u,hasChanges:M,validationErrors:C,isPanelOpen:(g,v)=>!!b[g]==!!v,togglePanel:g=>D(v=>({...v,[g]:!v[g]})),inspect:p,forget:()=>{S.current=null,c(null),l([]),k()},change:(g,v,P)=>{let W=i?.properties?.[g],$=!P&&(W===v||JSON.stringify(W)===JSON.stringify(v));m(B=>{if($){let{[g]:Z,...be}=B;return be}return{...B,[g]:{value:v,hooks:P}}}),d(B=>({...B,[g]:v})),R(B=>{if(!B[g])return B;let{[g]:Z,...be}=B;return be})},patchProperty:(g,v)=>{c(P=>P&&{...P,properties:{...P.properties,[g]:v}}),d(P=>({...P,[g]:v}))},save:async()=>{if(!i)return;let g=vo(O,L,f,s);R(g),!(Object.keys(g).length>0)&&(t(),await e.run(async()=>{let v=await yo(u,n),P=ge(i.contextPath,fe),W=Object.entries(v).map(([Z,be])=>({type:"Neos.Neos.Ui:Property",subject:P,payload:{propertyName:Z,value:be}}));if(W.length===0){m({});return}let $=await X.get().endpoints.change(W);pe(o,$),m({});let B=co($,P);B&&(e.patch(P,{label:B.label,properties:B.properties,tags:B.tags}),F(B,!1)),await je(o),e.touch(),o.dispatch(bt.actions.UI.ContentCanvas.reload()),!B&&(await e.reload(),await p(i,{force:!0}))},"save"))},discard:()=>{t(),m({}),R({}),d({...i?.properties??{}})}}};var wt=w(A());var wo=w(ue());var xo=(e,t,o,r,n,s,i,c)=>{let{store:a,nodeTypesRegistry:l,saveHooksRegistry:f,t:d}=T(),u=e.options.resourceCreation,[m,C]=wt.default.useState(null),[R,b]=wt.default.useState(null),D=async p=>{s(),t.setError(null);let h=p?.nodeTypeName??u.type,y=l.getNodeType(h),_=fo(y);if(!p){let v=go(u,_);if(v.length>0){t.setError(d("error.creationBlocked","{type} cannot be created here: {properties} must be provided on creation. Give these properties a default value, make them nullable, or promote them to the creation dialog (showInCreationDialog).",{type:h,properties:v.join(", ")}));return}}let E=p?.parentContextPath??(t.container??(await t.reload()).container).contextPath;if(_.length===0){await L({},h,E,!p);return}let g=await zt(a,y,h,E);g!==null&&await L(g,h,E,!p)},L=async(p,h,y,_)=>{let E={};for(let[g,v]of Object.entries(p))E[g]=await vt(v.value,v.hooks,f);if(_)for(let g of u.requiredProperties??[])(E[g.name]===void 0||E[g.name]===null)&&(E[g.name]=po(g.type));await t.run(async()=>{let g=await X.get().endpoints.change([{type:"Neos.Neos.Ui:CreateInto",subject:y,payload:{nodeType:h,data:E}}]);pe(a,g);let v=(g?.feedbacks??[]).find(Z=>Z?.type==="Neos.Neos.Ui:NodeCreated")?.payload;if(!v?.identifier)throw new Error(d("error.creationFailed","The resource could not be created."));_&&(await je(a),o.add(v.identifier),ao(a,e.identifier)),t.touch();let[{resources:P},W]=await Promise.all([t.reload(),_?Promise.resolve(null):i(y)]),B=(W??P).find(Z=>Z.identifier===v.identifier);B&&await n.inspect(B)},"create")};return{create:D,move:async(p,h,y,_)=>{p.contextPath!==h.contextPath&&(t.reorder(p.contextPath,h.contextPath,y),c(p.contextPath,h.contextPath,y),await t.run(async()=>{try{let E=await X.get().endpoints.change([{type:y==="before"?"Neos.Neos.Ui:MoveBefore":"Neos.Neos.Ui:MoveAfter",subject:ge(p.contextPath,fe),payload:{siblingDomAddress:{contextPath:ge(h.contextPath,fe)}}}]);if(pe(a,E),!(E?.feedbacks??[]).some(v=>v?.type==="Neos.Neos.Ui:UpdateNodeInfo"))throw new Error(d("error.moveFailed","The resource could not be moved."))}catch(E){throw await Promise.all([t.reload(),_?i(_):Promise.resolve([])]),E}},"move"))},duplicate:async p=>{p.length!==0&&await t.run(async()=>{let h=t.container??(await t.reload()).container,y=await X.get().endpoints.change(p.map(v=>({type:"Neos.Neos.Ui:CopyInto",subject:ge(v.contextPath,fe),payload:{parentContextPath:h.contextPath}})));pe(a,y);let _=(y?.feedbacks??[]).filter(v=>v?.type==="Neos.Neos.Ui:NodeCreated").map(v=>v?.payload?.identifier).filter(Boolean);t.touch();let{resources:E}=await t.reload(),g=E.find(v=>v.identifier===_[_.length-1]);r.leave(),g&&await n.inspect(g)},"duplicate")},setHidden:async(p,h)=>{p.length!==0&&await t.run(async()=>{let y=await X.get().endpoints.change(p.map(_=>({type:"Neos.Neos.Ui:Property",subject:ge(_.contextPath,fe),payload:{propertyName:"_hidden",value:h}})));pe(a,y),p.forEach(_=>t.patch(_.contextPath,{hidden:h})),n.node&&p.some(_=>_.contextPath===n.node.contextPath)&&n.patchProperty("_hidden",h),await je(a),t.touch(),a.dispatch(wo.actions.UI.ContentCanvas.reload())},"hide")},requestRemoval:async p=>{if(p.length!==0){b(null),C(p);try{b(await Qt(a,e.neos?.routes,p.map(h=>h.identifier)))}catch{b({})}}},remove:async p=>{C(null),await t.run(async()=>{let h=await X.get().endpoints.change(p.map(_=>({type:"Neos.Neos.Ui:RemoveNode",subject:ge(_.contextPath,fe),payload:{}})));pe(a,h),t.touch(),o.drop(p.map(_=>_.identifier));let y=p.map(_=>_.contextPath);r.forget(y),r.selection.length>0&&p.length>=r.selection.length&&r.leave(),n.node&&y.includes(n.node.contextPath)&&n.forget(),await t.reload()},"delete")},cancelRemoval:()=>C(null),pendingRemoval:m,pendingRemovalUsage:R}};var J=w(A());var _o=e=>{let t=e?.get?.("dataLoaders")?.get?.("NodeLookup");t&&(t._lruCache=null)};var xt=(e,t,o,r)=>{let n=e.findIndex(c=>c.contextPath===t);if(n<0||!e.some(c=>c.contextPath===o))return null;let s=e.filter((c,a)=>a!==n),i=s.findIndex(c=>c.contextPath===o);return s.splice(r==="before"?i:i+1,0,e[n]),s},_t=(e,t,o,r)=>xt(e,t,o,r)??e.map(n=>n.children?{...n,children:_t(n.children,t,o,r)}:n);var Ro=(e,t,o)=>e.map(r=>r.contextPath===t?{...r,...o}:r.children?{...r,children:Ro(r.children,t,o)}:r),Co=(e,t)=>{let{store:o,globalRegistry:r}=T(),n=e.resourceCreation,[s,i]=J.default.useState(null),[c,a]=J.default.useState([]),[l,f]=J.default.useState(!1),[d,u]=J.default.useState(null),[m,C]=J.default.useState(null),[R,b]=J.default.useState(0),D=J.default.useRef(null),L=J.default.useCallback(async()=>{let k=`${o.getState()?.cr?.nodes?.documentNode??""}|${n.collection}`,S=D.current?.key===k?D.current.container:await Xt(o,n,t);return D.current={key:k,container:S},i(S),S},[n,t,o]),O=J.default.useCallback(async()=>{let k=await L(),S=await Zt(o,t,e,k.contextPath);return i(k),a(S),{container:k,resources:S}},[e,L,t,o]),M=J.default.useCallback(async(k,S)=>{f(!0),u(S??null),C(null);try{return await k()}catch(x){C(et(x));return}finally{f(!1),u(null)}},[]);return{container:s,resources:c,isLoading:l,activity:d,error:m,setError:C,resolve:L,reload:O,run:M,version:R,touch:J.default.useCallback(()=>{_o(r),b(k=>k+1)},[r]),patch:J.default.useCallback((k,S)=>a(x=>Ro(x,k,S)),[]),reorder:J.default.useCallback((k,S,x)=>a(F=>_t(F,k,S,x)),[])}};var He=w(A());var No=(e,t)=>{let{store:o}=T(),[r,n]=He.default.useState({}),s=He.default.useRef(new Set),i=He.default.useCallback(async u=>{let m=await mt(o,t,u);return n(C=>({...C,[u]:m})),m},[t,o]),c=u=>r[u.contextPath]??u.children,a=[],l=(u,m,C)=>u.flatMap(R=>{let b={resource:R,depth:m,ancestors:C},D=c(R);return D?D.length>0?[b,...l(D,m+1,[...C,R])]:[b]:(R.childCount&&a.push(R.contextPath),[b])}),f=l(e.resources,0,[]),d=a.join("|");return He.default.useEffect(()=>{let u=a.filter(m=>!s.current.has(m));u.length!==0&&(u.forEach(m=>s.current.add(m)),e.run(async()=>{for(let m of u)await i(m)}))},[d,i]),{rows:f,reveal:async u=>(s.current.add(u),i(u)),reorder:(u,m,C)=>n(R=>Object.fromEntries(Object.entries(R).map(([b,D])=>[b,xt(D,u,m,C)??D])))}};var We=w(A()),ko=()=>{let[e,t]=We.default.useState(null),o=We.default.useRef(null),r=We.default.useCallback(()=>{o.current=null,t(null)},[]),n=We.default.useCallback((s,i)=>{if(!s||!i||o.current===s){r();return}o.current=s,t({id:s,element:i()})},[r]);return{secondaryInspector:e,render:n,close:r}};var Ee=w(A()),Po=e=>{let[t,o]=Ee.default.useState(!1),[r,n]=Ee.default.useState([]),s=Ee.default.useCallback(()=>{o(!1),n([])},[]),i=Ee.default.useCallback(a=>{n(l=>l.includes(a.contextPath)?l.filter(f=>f!==a.contextPath):[...l,a.contextPath])},[]),c=Ee.default.useCallback(a=>{n(l=>l.filter(f=>!a.includes(f)))},[]);return{isSelecting:t,enter:(a=[])=>{n(a),o(!0)},leave:s,selection:r,selected:e.filter(a=>r.includes(a.contextPath)),toggle:i,pick:(a,l=[])=>{if(t){i(a);return}n([...l.filter(f=>f!==a.contextPath),a.contextPath]),o(!0)},setSelection:n,forget:c}};var tt=(e,t,o)=>{let r=ko(),n=Co(e.options,e.neos?.routes),s=No(n,e.neos?.routes),i=Po(s.rows.map(l=>l.resource)),c=bo(n,r.close),a=xo(e,n,t,i,c,o,l=>s.reveal(l),s.reorder);return{secondary:r,collection:n,tree:s,selection:i,inspected:c,actions:a}};var ot=`
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
     * The resource manager: the whole backend below the top bar, like a module page,
     * with the list and the inspector scrolling on their own as in the dialog. The
     * top bar stays - with the module menu, and the page's breadcrumb next to the
     * logo - while the content view's own actions in it are put away.
     *
     * It stays under the module menu drawer (45) and under every dialog it opens (55).
     */
    .sitegeist-resource-reference-editor__page {
        position: fixed;
        top: calc(var(--spacing-GoldenUnit, 40px) + 1px);
        right: 0;
        bottom: 0;
        left: 0;
        z-index: calc(var(--zIndex-Drawer, 45) - 1);
        display: flex;
        flex-direction: column;
        background: var(--colors-ContrastDarkest, #141414);
        color: var(--colors-ContrastBrightest, #fff);
        font-family: 'Noto Sans', sans-serif;
    }
    body:has(.sitegeist-resource-reference-editor__page) [class*="primaryToolbar__rightSidedActions"] {
        visibility: hidden;
    }
    /* The logo's group is as wide as the sidebar; the breadcrumb runs on past it. */
    body:has(.sitegeist-resource-reference-editor__page) [class*="primaryToolbar__leftSidedActions"] {
        flex-basis: auto;
    }
    /* As the breadcrumb of Neos' module pages (Lite.css, .neos-breadcrumb). */
    .sitegeist-resource-reference-editor__breadcrumb {
        display: flex;
        align-items: center;
        padding: 0 var(--spacing-Full, 16px);
        font-size: 14px;
        line-height: 40px;
        white-space: nowrap;
    }
    .sitegeist-resource-reference-editor__breadcrumb a {
        color: #fff;
        text-decoration: none;
    }
    .sitegeist-resource-reference-editor__breadcrumb a:hover,
    .sitegeist-resource-reference-editor__breadcrumb-current {
        color: #00b5ff;
    }
    .sitegeist-resource-reference-editor__breadcrumb svg {
        padding-right: 5px;
    }
    .sitegeist-resource-reference-editor__breadcrumb-divider {
        padding: 0 5px;
        color: #ccc;
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
`;var q=w(A()),ne=w(Q());var xe=e=>!!e?.hidden||!!e?.tags?.disabled||!!e?.properties?._hidden;var rt=({resources:e,usage:t,onCancel:o,onHideInstead:r,onConfirm:n})=>{let{nodeTypesRegistry:s,t:i}=T(),c=e.every(a=>!!s.getNodeType(a.nodeType)?.properties?._hidden)&&!e.every(xe);return q.default.createElement(ne.Dialog,{isOpen:!0,type:"warn",style:"narrow",title:e.length===1?i("removal.titleOne","Delete this resource?"):i("removal.title","Delete {count} resources?",{count:e.length}),onRequestClose:o,actions:[q.default.createElement(ne.Button,{key:"cancel",type:"button",onClick:o},i("action.cancel","Cancel")),c?q.default.createElement(ne.Button,{key:"hide",type:"button",style:"lighter",onClick:()=>r(e)},q.default.createElement(ne.Icon,{icon:"eye-slash"})," ",i("action.hideInstead","Hide instead")):null,q.default.createElement(ne.Button,{key:"delete",type:"button",style:"error",hoverStyle:"error",onClick:()=>n(e)},q.default.createElement(ne.Icon,{icon:"trash"})," ",i("action.delete","Delete"))].filter(Boolean)},q.default.createElement("div",{className:"sitegeist-resource-reference-editor__confirmation"},q.default.createElement("ul",null,e.map(a=>{let l=t?.[a.identifier];return q.default.createElement("li",{key:a.contextPath},q.default.createElement("strong",null,a.label||a.identifier),t===null&&q.default.createElement("small",null,i("removal.checking","Checking references\u2026")),l&&l.count>0&&q.default.createElement("small",null,l.count===1?i("removal.referencedOnce","Referenced once"):i("removal.referenced","Referenced {count} times",{count:l.count}),l.documents.length>0?`: ${l.documents.join(", ")}`:""),t!==null&&!l?.count&&q.default.createElement("small",null,i("removal.notReferenced","Not referenced")))})),q.default.createElement("p",null,i("removal.explanation","Deleting removes the resource from the collection, and every document that references it loses that reference. Hiding it instead keeps those references intact."))))};var j=w(A()),Xo=w(So()),Ye=w(Q());var z=w(A()),se=w(Q());var Rt=w(A()),Ct=w(Q()),_e=({icon:e,isBusy:t})=>t?Rt.default.createElement(Ct.Icon,{icon:"spinner",className:"sitegeist-resource-reference-editor__spinner"}):Rt.default.createElement(Ct.Icon,{icon:e});var Eo=({targets:e,selectableResources:t,selection:o,isSelecting:r,isLoading:n,activity:s,canDuplicate:i,canChangeTargets:c,isMultiple:a,canUseSelection:l,selectionIsReferenced:f,path:d,onDuplicate:u,onSetHidden:m,onDelete:C,onSetSelection:R,onUseSelection:b,onUnuseSelection:D})=>{let{nodeTypesRegistry:L,t:O}=T(),M=e.length>0&&e.every(p=>!p.tethered),k=M&&e.every(xe),S=M&&e.every(p=>!!L.getNodeType(p.nodeType)?.properties?._hidden),x=t.length>0&&t.every(p=>o.includes(p.contextPath)),F=()=>r?o.length>0?O("selection.count","{count} selected",{count:o.length}):O("selection.hint","Click the resources to select them"):d.length>0?d.join(" \u203A "):O("action.noTarget","No resource selected");return z.default.createElement("div",{className:"sitegeist-resource-reference-editor__footer"},z.default.createElement("span",{className:"sitegeist-resource-reference-editor__footer-target"+(M?"":" sitegeist-resource-reference-editor__footer-target--empty")},F()),z.default.createElement("div",{className:"sitegeist-resource-reference-editor__footer-actions"},r&&z.default.createElement(se.Button,{type:"button",style:"lighter",disabled:n||t.length===0,onClick:()=>R(x?[]:t.map(p=>p.contextPath))},x?O("action.deselectAll","Deselect all"):O("action.selectAll","Select all")),i&&z.default.createElement(se.Button,{type:"button",style:"lighter",disabled:n||!M,onClick:u},z.default.createElement(_e,{icon:"clone",isBusy:s==="duplicate"})," ",O("action.duplicate","Duplicate")),c&&z.default.createElement(se.Button,{type:"button",style:"lighter",disabled:n||!S,onClick:()=>m(!k)},z.default.createElement(_e,{icon:k?"eye":"eye-slash",isBusy:s==="hide"})," ",k?O("action.show","Show"):O("action.hide","Hide")),r&&a&&z.default.createElement(se.Button,{className:"sitegeist-resource-reference-editor__bulk-use"+(f?" sitegeist-resource-reference-editor__bulk-use--remove":""),type:"button",style:"lighter",disabled:n||!l,onClick:f?D:b},f?z.default.createElement(z.default.Fragment,null,z.default.createElement(se.Icon,{icon:"times"})," ",O("action.remove","Remove")):z.default.createElement(z.default.Fragment,null,z.default.createElement(se.Icon,{icon:"check"})," ",O("action.use","Use"))),c&&z.default.createElement(se.Button,{type:"button",style:"error",hoverStyle:"error",disabled:n||!M,onClick:C},z.default.createElement(_e,{icon:"trash",isBusy:s==="delete"})," ",O("action.delete","Delete"))))};var ee=w(A()),Oe=w(Q());var Re=w(A()),Ie=w(Q());var Nt=w(A()),Do=w(Oo()),Mo=({item:e,node:t,value:o,hooks:r,isChanged:n,isReadOnly:s,onChange:i,renderSecondaryInspector:c,validationErrors:a})=>Nt.default.createElement("div",{className:"sitegeist-resource-reference-editor__field"},Nt.default.createElement(Do.EditorEnvelope,{identifier:e.id,label:e.label??e.id,editor:e.editor,options:s?{...e.editorOptions??{},disabled:!0}:e.editorOptions,value:o,hooks:r??null,node:t,propertyName:e.id,commit:(l,f)=>{s||i(e.id,l,f)},renderSecondaryInspector:c,validationErrors:a,helpMessage:e.helpMessage,helpThumbnail:e.helpThumbnail,highlight:!!n}));var gr={panel__headline:"sitegeist-resource-reference-editor__group-label"},Bo=({group:e,node:t,values:o,draft:r,isOpen:n,isReadOnly:s,onToggle:i,onChange:c,renderSecondaryInspector:a,validationErrors:l})=>{let{i18nRegistry:f}=T();return Re.default.createElement(Ie.ToggablePanel,{isOpen:n,onPanelToggle:i,className:"sitegeist-resource-reference-editor__group"},Re.default.createElement(Ie.ToggablePanel.Header,{theme:gr},e.icon&&Re.default.createElement("div",{className:"sitegeist-resource-reference-editor__group-icon"},Re.default.createElement(Ie.Icon,{icon:e.icon})),V(f,e.label)),Re.default.createElement(Ie.ToggablePanel.Contents,null,Ze(e).map(d=>Re.default.createElement(Mo,{key:`${t?.contextPath??"new"}-${d.id}`,item:d,node:t,value:d.id==="_nodeType"?t?.nodeType:o[d.id],hooks:r[d.id]?.hooks,isChanged:!!r[d.id],isReadOnly:s,onChange:c,renderSecondaryInspector:a,validationErrors:l[d.id]}))))};var Ao=({inspected:e,isLoading:t,isReadOnly:o,renderSecondaryInspector:r})=>{let{i18nRegistry:n,t:s}=T();return ee.default.createElement("div",{className:"sitegeist-resource-reference-editor__inspector"},ee.default.createElement("div",{className:"sitegeist-resource-reference-editor__inspector-body"},e.node?e.tabs.length===0?ee.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},s("inspector.noConfiguration","This node type has no inspector configuration.")):ee.default.createElement(Oe.Tabs,{className:"sitegeist-resource-reference-editor__tabs"},e.tabs.map(c=>ee.default.createElement(Oe.Tabs.Panel,{key:c.id,id:c.id,icon:c.icon,tooltip:V(n,c.label)},c.groups.map(a=>ee.default.createElement(Bo,{key:a.id,group:a,node:e.node,values:e.values,draft:e.draft,isOpen:e.isPanelOpen(a.id,a.collapsed),onToggle:()=>e.togglePanel(a.id),isReadOnly:o,onChange:e.change,renderSecondaryInspector:r,validationErrors:e.validationErrors}))))):ee.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},s("inspector.empty","Select a resource to edit its properties."))),e.node&&!o&&ee.default.createElement("div",{className:"sitegeist-resource-reference-editor__inspector-footer"},ee.default.createElement(Oe.Button,{type:"button",style:"lighter",disabled:t||!e.hasChanges,onClick:e.discard},s("action.discard","Discard")),ee.default.createElement(Oe.Button,{type:"button",style:"success",disabled:t||!e.hasChanges,onClick:e.save},s("action.apply","Apply"))))};var le=w(A());var Tt=new Set,Y=new WeakMap,Ne=new WeakMap,ce=new WeakMap,$e=new WeakMap,kt=new WeakMap,St=new WeakMap,Ce=new WeakMap,Me=new WeakMap,De=new WeakSet,me,It=0,Ot=0,ae="__aa_tgt",ze="__aa_del",nt="__aa_new",Fo=e=>{let t=br(e);t&&t.forEach(o=>wr(o))},mr=e=>{e.forEach(t=>{t.target===me&&yr(),Y.has(t.target)&&ke(t.target)})};function hr(e){let t=$e.get(e);t?.disconnect();let o=Y.get(e),r=0,n=5;o||(o=Be(e),Y.set(e,o));let{offsetWidth:s,offsetHeight:i}=me,a=[o.top-n,s-(o.left+n+o.width),i-(o.top+n+o.height),o.left-n].map(f=>`${-1*Math.floor(f)}px`).join(" "),l=new IntersectionObserver(()=>{++r>1&&ke(e)},{root:me,threshold:1,rootMargin:a});l.observe(e),$e.set(e,l)}function ke(e){clearTimeout(Me.get(e));let t=st(e),o=Ge(t)?500:t.duration;Me.set(e,setTimeout(async()=>{let r=ce.get(e);try{await r?.finished,Y.set(e,Be(e)),hr(e)}catch{}},o))}function yr(){clearTimeout(Me.get(me)),Me.set(me,setTimeout(()=>{Tt.forEach(e=>Et(e,t=>jo(()=>ke(t))))},100))}function vr(e){setTimeout(()=>{St.set(e,setInterval(()=>jo(ke.bind(null,e)),2e3))},Math.round(2e3*Math.random()))}function jo(e){typeof requestIdleCallback=="function"?requestIdleCallback(()=>e()):requestAnimationFrame(()=>e())}var ie,Ho=typeof window<"u"&&"ResizeObserver"in window;Ho&&(me=document.documentElement,new MutationObserver(Fo),ie=new ResizeObserver(mr),window.addEventListener("scroll",()=>{Ot=window.scrollY,It=window.scrollX}),ie.observe(me));function br(e){return e.reduce((r,n)=>[...r,...Array.from(n.addedNodes),...Array.from(n.removedNodes)],[]).every(r=>r.nodeName==="#comment")?!1:e.reduce((r,n)=>{if(r===!1)return!1;if(n.target instanceof Element){if(Pt(n.target),!r.has(n.target)){r.add(n.target);for(let s=0;s<n.target.children.length;s++){let i=n.target.children.item(s);if(i){if(ze in i)return!1;Pt(n.target,i),r.add(i)}}}if(n.removedNodes.length)for(let s=0;s<n.removedNodes.length;s++){let i=n.removedNodes[s];if(ze in i)return!1;i instanceof Element&&(r.add(i),Pt(n.target,i),Ne.set(i,[n.previousSibling,n.nextSibling]))}}return r},new Set)}function Pt(e,t){!t&&!(ae in e)?Object.defineProperty(e,ae,{value:e}):t&&!(ae in t)&&Object.defineProperty(t,ae,{value:e})}function wr(e){var t;let o=e.isConnected,r=Y.has(e);o&&Ne.has(e)&&Ne.delete(e),ce.has(e)&&((t=ce.get(e))===null||t===void 0||t.cancel()),nt in e?Uo(e):r&&o?_r(e):r&&!o?Rr(e):Uo(e)}function te(e){return Number(e.replace(/[^0-9.\-]/g,""))}function xr(e){let t=e.parentElement;for(;t;){if(t.scrollLeft||t.scrollTop)return{x:t.scrollLeft,y:t.scrollTop};t=t.parentElement}return{x:0,y:0}}function Be(e){let t=e.getBoundingClientRect(),{x:o,y:r}=xr(e);return{top:t.top+r,left:t.left+o,width:t.width,height:t.height}}function Wo(e,t,o){let r=t.width,n=t.height,s=o.width,i=o.height,c=getComputedStyle(e);if(c.getPropertyValue("box-sizing")==="content-box"){let l=te(c.paddingTop)+te(c.paddingBottom)+te(c.borderTopWidth)+te(c.borderBottomWidth),f=te(c.paddingLeft)+te(c.paddingRight)+te(c.borderRightWidth)+te(c.borderLeftWidth);r-=f,s-=f,n-=l,i-=l}return[r,s,n,i].map(Math.round)}function st(e){return ae in e&&Ce.has(e[ae])?Ce.get(e[ae]):{duration:250,easing:"ease-in-out"}}function $o(e){if(ae in e)return e[ae]}function Dt(e){let t=$o(e);return t?De.has(t):!1}function Et(e,...t){t.forEach(o=>o(e,Ce.has(e)));for(let o=0;o<e.children.length;o++){let r=e.children.item(o);r&&t.forEach(n=>n(r,Ce.has(r)))}}function Mt(e){return Array.isArray(e)?e:[e]}function Ge(e){return typeof e=="function"}function _r(e){let t=Y.get(e),o=Be(e);if(!Dt(e))return Y.set(e,o);let r;if(!t)return;let n=st(e);if(typeof n!="function"){let s=t.left-o.left,i=t.top-o.top,[c,a,l,f]=Wo(e,t,o),d={transform:`translate(${s}px, ${i}px)`},u={transform:"translate(0, 0)"};c!==a&&(d.width=`${c}px`,u.width=`${a}px`),l!==f&&(d.height=`${l}px`,u.height=`${f}px`),r=e.animate([d,u],{duration:n.duration,easing:n.easing})}else{let[s]=Mt(n(e,"remain",t,o));r=new Animation(s),r.play()}ce.set(e,r),Y.set(e,o),r.addEventListener("finish",()=>ke(e),{once:!0})}function Uo(e){nt in e&&delete e[nt];let t=Be(e);Y.set(e,t);let o=st(e);if(!Dt(e))return;let r;if(typeof o!="function")r=e.animate([{transform:"scale(.98)",opacity:0},{transform:"scale(0.98)",opacity:0,offset:.5},{transform:"scale(1)",opacity:1}],{duration:o.duration*1.5,easing:"ease-in"});else{let[n]=Mt(o(e,"add",t));r=new Animation(n),r.play()}ce.set(e,r),r.addEventListener("finish",()=>ke(e),{once:!0})}function Lo(e,t){var o;e.remove(),Y.delete(e),Ne.delete(e),ce.delete(e),(o=$e.get(e))===null||o===void 0||o.disconnect(),setTimeout(()=>{if(ze in e&&delete e[ze],Object.defineProperty(e,nt,{value:!0,configurable:!0}),t&&e instanceof HTMLElement)for(let r in t)e.style[r]=""},0)}function Rr(e){var t;if(!Ne.has(e)||!Y.has(e))return;let[o,r]=Ne.get(e);Object.defineProperty(e,ze,{value:!0,configurable:!0});let n=window.scrollX,s=window.scrollY;if(r&&r.parentNode&&r.parentNode instanceof Element?r.parentNode.insertBefore(e,r):o&&o.parentNode?o.parentNode.appendChild(e):(t=$o(e))===null||t===void 0||t.appendChild(e),!Dt(e))return Lo(e);let[i,c,a,l]=Nr(e),f=st(e),d=Y.get(e);(n!==It||s!==Ot)&&Cr(e,n,s,f);let u,m={position:"absolute",top:`${i}px`,left:`${c}px`,width:`${a}px`,height:`${l}px`,margin:"0",pointerEvents:"none",transformOrigin:"center",zIndex:"100"};if(!Ge(f))Object.assign(e.style,m),u=e.animate([{transform:"scale(1)",opacity:1},{transform:"scale(.98)",opacity:0}],{duration:f.duration,easing:"ease-out"});else{let[C,R]=Mt(f(e,"remove",d));R?.styleReset!==!1&&(m=R?.styleReset||m,Object.assign(e.style,m)),u=new Animation(C),u.play()}ce.set(e,u),u.addEventListener("finish",()=>Lo(e,m),{once:!0})}function Cr(e,t,o,r){let n=It-t,s=Ot-o,i=document.documentElement.style.scrollBehavior;if(getComputedStyle(me).scrollBehavior==="smooth"&&(document.documentElement.style.scrollBehavior="auto"),window.scrollTo(window.scrollX+n,window.scrollY+s),!e.parentElement)return;let a=e.parentElement,l=a.clientHeight,f=a.clientWidth,d=performance.now();function u(){requestAnimationFrame(()=>{if(!Ge(r)){let m=l-a.clientHeight,C=f-a.clientWidth;d+r.duration>performance.now()?(window.scrollTo({left:window.scrollX-C,top:window.scrollY-m}),l=a.clientHeight,f=a.clientWidth,u()):document.documentElement.style.scrollBehavior=i}})}u()}function Nr(e){let t=Y.get(e),[o,,r]=Wo(e,t,Be(e)),n=e.parentElement;for(;n&&(getComputedStyle(n).position==="static"||n instanceof HTMLBodyElement);)n=n.parentElement;n||(n=document.body);let s=getComputedStyle(n),i=Y.get(n)||Be(n),c=Math.round(t.top-i.top)-te(s.borderTopWidth),a=Math.round(t.left-i.left)-te(s.borderLeftWidth);return[c,a,o,r]}function zo(e,t={}){if(Ho&&ie&&!(window.matchMedia("(prefers-reduced-motion: reduce)").matches&&!Ge(t)&&!t.disrespectUserMotionPreference)){De.add(e),getComputedStyle(e).position==="static"&&Object.assign(e.style,{position:"relative"}),Et(e,ke,vr,i=>ie?.observe(i)),Ge(t)?Ce.set(e,t):Ce.set(e,{duration:250,easing:"ease-in-out",...t});let s=new MutationObserver(Fo);s.observe(e,{childList:!0}),kt.set(e,s),Tt.add(e)}return Object.freeze({parent:e,enable:()=>{De.add(e)},disable:()=>{De.delete(e)},isEnabled:()=>De.has(e),destroy:()=>{De.delete(e),Tt.delete(e),Ce.delete(e);let r=kt.get(e);r?.disconnect(),kt.delete(e),Et(e,n=>{ie?.unobserve(n);let s=ce.get(n);try{s?.cancel()}catch{}ce.delete(n);let i=$e.get(n);i?.disconnect(),$e.delete(n);let c=St.get(n);c&&clearInterval(c),St.delete(n);let a=Me.get(n);a&&clearTimeout(a),Me.delete(n),Y.delete(n),Ne.delete(n)})}})}var U=w(A()),he=w(Q());var Bt=20,Go=({resource:e,isActive:t,isReferenced:o,isSelecting:r,isSelected:n,isUsable:s,depth:i,guides:c,onOpen:a,onToggleSelection:l,onPick:f,onToggleReference:d,isDraggable:u,isDragged:m,onDragStart:C,onDragEnd:R,onMoveByKey:b})=>{let{nodeTypesRegistry:D,i18nRegistry:L,t:O}=T(),M=D.getNodeType(e.nodeType),k=r?l:a,S=U.default.useRef(null);return U.default.useEffect(()=>{t&&S.current?.scrollIntoView({block:"nearest"})},[t]),U.default.createElement("div",{ref:S,role:"button",tabIndex:0,className:["sitegeist-resource-reference-editor__item",t&&!r?"sitegeist-resource-reference-editor__item--active":"",r&&n?"sitegeist-resource-reference-editor__item--selected":"",xe(e)?"sitegeist-resource-reference-editor__item--hidden":"",i>0?"sitegeist-resource-reference-editor__item--child":"",m?"sitegeist-resource-reference-editor__item--dragged":""].join(" "),"data-context-path":e.contextPath,draggable:u,onDragStart:x=>{x.dataTransfer.effectAllowed="move",x.dataTransfer.setData("text/plain",e.label??""),C(x.clientY)},onDragEnd:R,style:i>0?{marginLeft:`${i*Bt}px`}:void 0,onMouseDown:x=>{x.shiftKey&&x.preventDefault()},onClick:x=>x.shiftKey?f():k(),onKeyDown:x=>{if(x.altKey&&(x.key==="ArrowUp"||x.key==="ArrowDown")){x.preventDefault(),b(x.key==="ArrowUp"?-1:1);return}(x.key==="Enter"||x.key===" ")&&(x.preventDefault(),k())}},c.map(x=>U.default.createElement("span",{key:x.level,"aria-hidden":"true",className:"sitegeist-resource-reference-editor__guide"+(x.isEnd?" sitegeist-resource-reference-editor__guide--end":""),style:{left:`${-((i-x.level)*Bt)-Bt/2}px`}})),r&&U.default.createElement("span",{className:"sitegeist-resource-reference-editor__item-select"},U.default.createElement(he.CheckBox,{isChecked:n,onChange:l})),U.default.createElement(he.Icon,{icon:M?.ui?.icon??"file"}),U.default.createElement("div",{className:"sitegeist-resource-reference-editor__item-label"},U.default.createElement("strong",{className:e.label?"":"sitegeist-resource-reference-editor__item-unnamed"},e.label||V(L,M?.ui?.label)||e.identifier),U.default.createElement("small",null,V(L,M?.ui?.label)||e.nodeType)),U.default.createElement("span",{className:"sitegeist-resource-reference-editor__item-actions"+(r?" sitegeist-resource-reference-editor__item-actions--inert":"")},xe(e)&&U.default.createElement("span",{className:"sitegeist-resource-reference-editor__hidden-badge",title:O("resource.hiddenTitle","This resource is hidden")},U.default.createElement(he.Icon,{icon:"eye-slash"})," ",O("resource.hidden","Hidden")),s&&U.default.createElement("button",{type:"button",className:"sitegeist-resource-reference-editor__use"+(o?" sitegeist-resource-reference-editor__use--active":""),onClick:x=>{x.stopPropagation(),d()}},o?U.default.createElement(U.default.Fragment,null,U.default.createElement("span",{className:"sitegeist-resource-reference-editor__use-state"},U.default.createElement(he.Icon,{icon:"check"})," ",O("action.inUse","In use")),U.default.createElement("span",{className:"sitegeist-resource-reference-editor__use-action"},U.default.createElement(he.Icon,{icon:"times"})," ",O("action.remove","Remove"))):U.default.createElement(U.default.Fragment,null,U.default.createElement(he.Icon,{icon:"plus"})," ",O("action.use","Use")))))};var kr=(e,t)=>{let{depth:o}=e[t],r=[];for(let n=1;n<=o;n++){let s=!1;for(let i=t+1;i<e.length&&e[i].depth>=n;i++)if(e[i].depth===n){s=!0;break}s?r.push({level:n,isEnd:!1}):n===o&&r.push({level:n,isEnd:!0})}return r},Ve=e=>e.ancestors[e.ancestors.length-1]?.contextPath??null,qo=(e,t)=>e.depth===t.depth&&Ve(e)===Ve(t),Vo=(e,t)=>{let o=t+1;for(;o<e.length&&e[o].depth>e[t].depth;)o++;return[t,o]},ye=(e,t)=>e.findIndex(o=>o.resource.contextPath===t),Pr=(e,t,o,r)=>{let[n,s]=Vo(e,ye(e,t)),i=e.slice(n,s),c=[...e.slice(0,n),...e.slice(s)],a=ye(c,o),l=r==="before"?a:Vo(c,a)[1];return[...c.slice(0,l),...i,...c.slice(l)]},Tr=4,Sr=(e,t,o,r)=>{let n=e[ye(e,t)],s=e[ye(e,o)];if(!n||!s||t===o||!qo(s,n))return null;let i=ye(e,o)<ye(e,t);return i!==(r==="up")?null:Pr(e,t,o,i?"before":"after")},At=(e,t)=>e.filter(o=>qo(o,t)),Yo=({rows:e,isLoading:t,activeContextPath:o,referencedIdentifiers:r,isSelecting:n,selection:s,usableNodeTypes:i,onOpen:c,onToggleSelection:a,onPick:l,onToggleReference:f,canReorder:d,onMove:u})=>{let{nodeTypesRegistry:m,t:C}=T(),R=le.default.useRef(null),[b,D]=le.default.useState(null),[L,O]=le.default.useState(null),M=L??e,k=le.default.useRef({y:0,direction:null});le.default.useEffect(()=>{R.current&&zo(R.current,{duration:160,easing:"ease-out"})},[]);let S=(p,h)=>{let y=p[ye(p,h)],_=e[ye(e,h)];if(!y||!_)return;let E=At(e,_).map($=>$.resource.contextPath),g=At(p,y);if(E.join("|")===g.map($=>$.resource.contextPath).join("|"))return;let v=g.findIndex($=>$.resource.contextPath===h),P=g[v+1],W=g[v-1];P?u(y.resource,P.resource,"before",Ve(y)):W&&u(y.resource,W.resource,"after",Ve(y))},x=()=>{D(null),O(null)},F=(p,h)=>{let y=At(e,p),_=y.findIndex(g=>g.resource.contextPath===p.resource.contextPath),E=y[_+h];E&&u(p.resource,E.resource,h<0?"before":"after",Ve(p))};return le.default.createElement("div",{ref:R,className:"sitegeist-resource-reference-editor__list",onDragOver:p=>{if(!b)return;p.preventDefault(),p.dataTransfer.dropEffect="move";let h=p.clientY-k.current.y;Math.abs(h)>=Tr&&(k.current={y:p.clientY,direction:h<0?"up":"down"});let{direction:y}=k.current,_=p.target.closest?.("[data-context-path]")?.getAttribute("data-context-path");if(_&&y){let E=Sr(M,b,_,y);E&&O(E)}},onDrop:p=>{p.preventDefault(),b&&L&&S(L,b),x()}},M.length===0&&le.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},t?C("list.loading","Loading\u2026"):C("list.empty","No resources found.")),M.map((p,h)=>le.default.createElement(Go,{key:p.resource.contextPath,resource:p.resource,depth:p.depth,guides:kr(M,h),isActive:o===p.resource.contextPath,isReferenced:r.includes(p.resource.identifier),isSelecting:n,isSelected:s.includes(p.resource.contextPath),isUsable:Qe(m,p.resource.nodeType,i),isDraggable:d&&!p.resource.tethered&&!!p.resource.canManage,isDragged:b===p.resource.contextPath,onDragStart:y=>{k.current={y,direction:null},D(p.resource.contextPath),O(e)},onDragEnd:x,onMoveByKey:y=>{d&&!p.resource.tethered&&p.resource.canManage&&F(p,y)},onOpen:()=>c(p.resource),onToggleSelection:()=>a(p.resource),onPick:()=>l(p.resource),onToggleReference:()=>f(p.resource.identifier)})))};var ve=w(A()),Ae=w(Q());var K=w(A()),qe=w(Q());var Ko=({groups:e,isDisabled:t,isBusy:o,onCreate:r})=>{let{t:n}=T(),[s,i]=K.default.useState(!1),c=K.default.useRef(null),a=e.flatMap(d=>d.options);K.default.useEffect(()=>{if(!s)return;let d=m=>{c.current?.contains(m.target)||i(!1)},u=m=>{m.key==="Escape"&&(m.stopPropagation(),i(!1))};return document.addEventListener("mousedown",d),document.addEventListener("keydown",u,!0),()=>{document.removeEventListener("mousedown",d),document.removeEventListener("keydown",u,!0)}},[s]);let l=d=>{i(!1),r(d)},f=d=>K.default.createElement("button",{key:(d.parentContextPath??"")+d.nodeTypeName,type:"button",role:"menuitem",className:"sitegeist-resource-reference-editor__create-option",onClick:()=>l(d)},K.default.createElement(qe.Icon,{icon:d.icon??"file"})," ",d.label);return a.length<=1?K.default.createElement(qe.Button,{type:"button",style:"lighter",disabled:t||a.length===0,title:a[0]?.label,onClick:()=>a[0]&&l(a[0])},K.default.createElement(_e,{icon:"plus",isBusy:o})," ",n("action.new","New")):K.default.createElement("div",{className:"sitegeist-resource-reference-editor__create-menu",ref:c},K.default.createElement(qe.Button,{type:"button",style:"lighter",disabled:t,"aria-haspopup":"menu","aria-expanded":s,onClick:()=>i(d=>!d)},K.default.createElement(_e,{icon:"plus",isBusy:o})," ",n("action.new","New")),s&&K.default.createElement("div",{className:"sitegeist-resource-reference-editor__create-options",role:"menu"},e.map(d=>K.default.createElement(K.default.Fragment,{key:d.label??""},d.label&&K.default.createElement("span",{className:"sitegeist-resource-reference-editor__create-section"},d.label),d.options.map(f)))))};var Jo=({filter:e,onFilter:t,isLoading:o,isCreating:r,isSelecting:n,canSelect:s,createGroups:i,onCreate:c,onEnterSelection:a,onLeaveSelection:l})=>{let{t:f}=T();return ve.default.createElement("div",{className:"sitegeist-resource-reference-editor__toolbar"},ve.default.createElement("input",{className:"sitegeist-resource-reference-editor__search",type:"search",value:e,placeholder:f("list.search","Filter resources"),onChange:d=>t(d.currentTarget.value)}),i.length>0&&ve.default.createElement(Ko,{groups:i,isDisabled:o,isBusy:r,onCreate:c}),n?ve.default.createElement(Ae.Button,{type:"button",style:"lighter",onClick:l},ve.default.createElement(Ae.Icon,{icon:"check"})," ",f("action.done","Done")):ve.default.createElement(Ae.Button,{type:"button",style:"lighter",disabled:o||!s,onClick:a},ve.default.createElement(Ae.Icon,{icon:"list-check"})," ",f("action.selectMultiple","Select multiple")))};var it=({isOpen:e,onClose:t,collection:o,tree:r,inspected:n,selection:s,references:i,actions:c,creationType:a,usableNodeTypes:l,renderSecondaryInspector:f,secondaryInspector:d,onCloseSecondaryInspector:u,header:m,asPage:C=!1})=>{let{nodeTypesRegistry:R,i18nRegistry:b,t:D}=T(),[L,O]=j.default.useState(""),M=L.trim().toLocaleLowerCase(),k=M===""?r.rows:r.rows.filter(N=>(N.resource.label??"").toLocaleLowerCase().includes(M)),S=k.map(N=>N.resource),x=N=>Qe(R,N.nodeType,l),F=s.selected.filter(x),p=n.node?r.rows.find(N=>N.resource.contextPath===n.node.contextPath)??null:null,h=p?.resource??null,y=s.isSelecting?s.selected:h?[h]:[],_=p?[...p.ancestors,p.resource].map(N=>N.label):[],E=R.getNodeType(a),g=N=>N.canManage?lo(R,b,N.nodeType).map(at=>({...at,parentContextPath:N.contextPath})):[],v=N=>D("action.createIn","In \u201C{name}\u201D",{name:N}),P=o.container?.canManage??!1,W=y.length>0?y.every(N=>!!N.canManage):P,$=!h?.canManage,B=s.isSelecting?null:p,Z=B?.ancestors[B.ancestors.length-1]??null,be=[Z?{label:v(Z.label),options:g(Z)}:{options:P?[{nodeTypeName:a,label:V(b,E?.ui?.label)||a,icon:E?.ui?.icon}]:[]},...B?[{label:v(B.resource.label),options:g(B.resource)}]:[]].filter(N=>N.options.length>0),Ut=j.default.createElement(j.default.Fragment,null,m,j.default.createElement("div",{className:"sitegeist-resource-reference-editor__layout"},j.default.createElement("button",{type:"button",className:"sitegeist-resource-reference-editor__close",title:D("action.close","Close"),"aria-label":D("action.close","Close"),onClick:t},j.default.createElement(Ye.Icon,{icon:"times"})),j.default.createElement("div",{className:"sitegeist-resource-reference-editor__content"},o.error&&j.default.createElement("div",{className:"sitegeist-resource-reference-editor__state sitegeist-resource-reference-editor__error"},o.error),j.default.createElement(Jo,{filter:L,onFilter:O,isLoading:o.isLoading,isCreating:o.activity==="create",isSelecting:s.isSelecting,canSelect:S.length>0,createGroups:be,onCreate:N=>c.create(N.parentContextPath?{parentContextPath:N.parentContextPath,nodeTypeName:N.nodeTypeName}:void 0),onEnterSelection:()=>s.enter(h?[h.contextPath]:[]),onLeaveSelection:s.leave}),j.default.createElement("div",{className:"sitegeist-resource-reference-editor__progress"+(o.isLoading?" sitegeist-resource-reference-editor__progress--active":""),"aria-hidden":"true"}),j.default.createElement(Yo,{rows:k,usableNodeTypes:l,isLoading:o.isLoading,activeContextPath:n.node?.contextPath,referencedIdentifiers:i.referenced,isSelecting:s.isSelecting,selection:s.selection,onOpen:n.inspect,onToggleSelection:s.toggle,onPick:N=>s.pick(N,h?[h.contextPath]:[]),onToggleReference:i.toggle,canReorder:M===""&&!s.isSelecting&&!o.isLoading,onMove:c.move}),j.default.createElement(Eo,{targets:y,selectableResources:S,selection:s.selection,isSelecting:s.isSelecting,isLoading:o.isLoading,activity:o.activity,canDuplicate:P,canChangeTargets:W,isMultiple:i.isMultiple,path:_,canUseSelection:F.length>0,selectionIsReferenced:F.length>0&&F.every(N=>i.referenced.includes(N.identifier)),onDuplicate:()=>c.duplicate(y),onSetHidden:N=>c.setHidden(y,N),onDelete:()=>c.requestRemoval(y),onSetSelection:s.setSelection,onUseSelection:()=>{i.addMany(F.map(N=>N.identifier)),s.leave()},onUnuseSelection:()=>{i.drop(F.map(N=>N.identifier)),s.leave()}})),d&&j.default.createElement("div",{className:"sitegeist-resource-reference-editor__secondary"},j.default.createElement("button",{type:"button",className:"sitegeist-resource-reference-editor__secondary-close",title:D("action.close","Close"),onClick:u},j.default.createElement(Ye.Icon,{icon:"times"})),d),j.default.createElement(Ao,{inspected:n,isReadOnly:$,isLoading:o.isLoading,renderSecondaryInspector:f})));return j.default.useEffect(()=>{if(!C||!e||!d)return;let N=at=>{at.key==="Escape"&&!document.querySelector('[role="dialog"]')&&u()};return document.addEventListener("keydown",N),()=>document.removeEventListener("keydown",N)},[C,e,d,u]),C?e?Xo.default.createPortal(j.default.createElement("div",{className:"sitegeist-resource-reference-editor__page"},Ut),document.body):null:j.default.createElement(Ye.Dialog,{isOpen:e,title:"",style:"jumbo",onRequestClose:d?u:t,actions:[]},Ut)};var Er=({collection:e,routes:t,header:o,onClose:r})=>{let n=I.default.useMemo(()=>({options:e.options,value:null,commit:()=>{},neos:{routes:t}}),[e,t]),{secondary:s,collection:i,tree:c,selection:a,inspected:l,actions:f}=tt(n,ht,()=>{});return I.default.useEffect(()=>{i.run(()=>i.reload())},[i.reload]),I.default.createElement(I.default.Fragment,null,I.default.createElement(it,{isOpen:!0,asPage:!0,header:o,onClose:()=>{s.close(),r()},collection:i,tree:c,inspected:l,selection:a,references:ht,actions:f,creationType:e.options.resourceCreation.type,usableNodeTypes:[],renderSecondaryInspector:s.render,secondaryInspector:s.secondaryInspector?.element??null,onCloseSecondaryInspector:s.close}),f.pendingRemoval&&I.default.createElement(rt,{resources:f.pendingRemoval,usage:f.pendingRemovalUsage,onCancel:f.cancelRemoval,onHideInstead:d=>{f.cancelRemoval(),f.setHidden(d,!0)},onConfirm:f.remove}))},Qo=({routes:e,isManagerPage:t,isAvailable:o,className:r})=>{let{nodeTypesRegistry:n,i18nRegistry:s,store:i,t:c}=T(),a=gt(),l=Se(e);I.default.useEffect(()=>{t&&o&&Yt(!0)},[]);let f=()=>{let b=i.getState()?.cr?.nodes?.documentNode;window.location.href=`${l}/neos/content`+(typeof b=="string"?`?node=${encodeURIComponent(b)}`:"")},d=I.default.useMemo(()=>no(n,s),[n,s]),[u,m]=I.default.useState(d[0]?.name??null),C=d.find(b=>b.name===u)??null;if(!o)return null;let R=I.default.createElement(I.default.Fragment,null,I.default.createElement("div",{className:"sitegeist-resource-reference-editor__manager-tabs",role:"tablist"},d.map(b=>I.default.createElement("button",{key:b.name,type:"button",role:"tab","aria-selected":b.name===u,className:"sitegeist-resource-reference-editor__manager-tab"+(b.name===u?" sitegeist-resource-reference-editor__manager-tab--active":""),onClick:()=>m(b.name)},b.label))));return I.default.createElement(I.default.Fragment,null,I.default.createElement(de.IconButton,{className:r,icon:"box-archive",title:c("manager.open","Resources"),"aria-label":c("manager.open","Resources"),onClick:()=>{window.location.href=`${l}/neos/management/resources`}}),a&&I.default.createElement(I.default.Fragment,null,I.default.createElement("style",null,ot),C?I.default.createElement(Er,{key:C.name,collection:C,routes:e,header:R,onClose:f}):I.default.createElement(Ir,{onClose:f})))},Ir=({onClose:e})=>{let{t}=T();return I.default.createElement(de.Dialog,{isOpen:!0,title:t("manager.open","Resources"),onRequestClose:e,actions:[I.default.createElement(de.Button,{key:"close",type:"button",style:"lighter",onClick:e},t("action.close","Close"))]},I.default.createElement("div",{className:"sitegeist-resource-reference-editor__state"},t("manager.empty","No resource collections yet - a collection appears here once a property uses the resource reference editor.")))},Zo=({routes:e})=>{let{i18nRegistry:t,t:o}=T();return gt()?I.default.createElement("nav",{className:"sitegeist-resource-reference-editor__breadcrumb","aria-label":"Breadcrumb"},I.default.createElement("a",{href:`${Se(e)}/neos/management`},I.default.createElement(de.Icon,{icon:"briefcase"}),t.translate("Neos.Neos:Modules:management.label","Management")),I.default.createElement("span",{className:"sitegeist-resource-reference-editor__breadcrumb-divider"},"/"),I.default.createElement("span",{className:"sitegeist-resource-reference-editor__breadcrumb-current"},I.default.createElement(de.Icon,{icon:"box-archive"}),o("module.label","Resources"))):null};var G=w(A()),Ue=w(Q());var er=({ReferenceEditor:e,ReferencesEditor:t,...o})=>{let{i18nRegistry:r,nodeTypesRegistry:n,t:s}=T(),[i,c]=G.default.useState(!1),a=o.options.resourceCreation,l=io(o),f=()=>c(!0),{secondary:d,collection:u,tree:m,selection:C,inspected:R,actions:b}=tt(o,l,f);G.default.useEffect(()=>{u.resolve().catch(()=>{})},[u.resolve]);let D=u.container?.canManage??null,L=async()=>{f(),await u.run(()=>u.reload())},O=()=>{d.close(),c(!1)},M=h=>{if(!l.isMultiple)return h.closest('[class*="selectBoxHeader"]')&&l.referenced.length===1?l.referenced[0]:null;let y=h.closest('[class*="selectedOptions__innerPreview"]')?.closest("li"),_=y?.parentElement;return!y||!_?null:l.referenced[Array.prototype.indexOf.call(_.children,y)]??null},k=h=>{let y=h.target;if(!y||y.closest("input, button"))return;let _=M(y);if(!_)return;h.preventDefault(),h.stopPropagation(),f();let E=u.resources.find(g=>g.identifier===_);u.run(async()=>{if(E){await Promise.all([u.reload(),R.inspect(E)]);return}let{resources:g}=await u.reload(),v=g.find(P=>P.identifier===_);v&&await R.inspect(v)})},{resourceCreation:S,...x}=o.options,F=o.options.nodeTypes??[a.type],p=F.length===1?V(r,n.getNodeType(F[0])?.ui?.label):"";return G.default.createElement(G.default.Fragment,null,G.default.createElement("style",null,ot),G.default.createElement("div",{className:"sitegeist-resource-reference-editor__reference",style:{"--sitegeist-resource-type":JSON.stringify(p)},onClickCapture:k},l.isMultiple&&t?G.default.createElement(t,{key:u.version,...o,options:x}):G.default.createElement(e,{key:u.version,...o,options:x})),G.default.createElement("div",{className:"sitegeist-resource-reference-editor__actions"},D!==!1&&G.default.createElement(Ue.Button,{className:"sitegeist-resource-reference-editor__create",type:"button",style:"lighter",disabled:o.options.disabled||u.isLoading||D===null,onClick:b.create,title:a.buttonLabel??s("action.createNew","Create new"),"aria-label":a.buttonLabel??s("action.createNew","Create new")},G.default.createElement(Ue.Icon,{icon:"plus"})),G.default.createElement(Ue.Button,{type:"button",style:"lighter",disabled:o.options.disabled||u.isLoading,onClick:L},G.default.createElement(Ue.Icon,{icon:"list"})," ",s("action.showAll","Show all"))),G.default.createElement(it,{isOpen:i,onClose:O,collection:u,tree:m,inspected:R,selection:C,references:l,actions:b,creationType:a.type,usableNodeTypes:F,renderSecondaryInspector:d.render,secondaryInspector:d.secondaryInspector?.element??null,onCloseSecondaryInspector:d.close}),b.pendingRemoval&&G.default.createElement(rt,{resources:b.pendingRemoval,usage:b.pendingRemovalUsage,onCancel:b.cancelRemoval,onHideInstead:h=>{b.cancelRemoval(),b.setHidden(h,!0)},onConfirm:b.remove}))};jt("Sitegeist.ResourceReferenceEditor",{},(e,{store:t,routes:o})=>{let r=e.get("inspector"),n=r?.get("editors"),s=r?.get("saveHooks"),i=e.get("validators"),c=n?.get("Neos.Neos/Inspector/Editors/ReferenceEditor"),a=n?.get("Neos.Neos/Inspector/Editors/ReferencesEditor"),l=e.get("@neos-project/neos-ui-contentrepository"),f=e.get("i18n");if(!n||!c?.component||!l){console.warn("[Sitegeist.ResourceReferenceEditor] Required Neos UI registries are missing.");return}e.get("sagas")?.set("Sitegeist.ResourceReferenceEditor/CreationDialog",{saga:Gt});let d={store:t,globalRegistry:e,nodeTypesRegistry:l,saveHooksRegistry:s,validatorsRegistry:i,i18nRegistry:f},u=Ke();e.get("sagas")?.set("Sitegeist.ResourceReferenceEditor/ManagerAddress",{saga:Kt}),e.get("containers")?.set("PrimaryToolbar/Right/SitegeistResourceManager",({className:m})=>Pe.default.createElement(Xe,{registries:d},Pe.default.createElement(Qo,{className:m,routes:o,isManagerPage:u,isAvailable:Or()})),"start"),e.get("containers")?.set("PrimaryToolbar/Left/SitegeistResourceManagerBreadcrumb",()=>Pe.default.createElement(Xe,{registries:d},Pe.default.createElement(Zo,{routes:o})),"end"),n.set("Sitegeist.ResourceReferenceEditor/Inspector/Editors/ResourceReferenceEditor",{component:m=>Pe.default.createElement(Xe,{registries:d},Pe.default.createElement(er,{...m,ReferenceEditor:c.component,ReferencesEditor:a?.component}))})});var Or=()=>{try{let e=JSON.parse(document.getElementById("initialData")?.textContent??"{}"),t=[],o=r=>Object.values(r??{}).forEach(n=>{typeof n?.uri=="string"&&t.push(n.uri),o(n?.children)});return o(e?.menu),t.some(r=>/\/management\/resources(?:[?#]|$)/.test(r))}catch{return!1}};})();
//# sourceMappingURL=Plugin.js.map
