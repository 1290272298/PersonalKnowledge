let pages=[],current=decodeHash()||"home",searchCorpus=null,searchPromise=null;
const $=s=>document.querySelector(s);
const SITE_BASE=new URL("./",location.href);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function decodeHash(){try{return decodeURIComponent(location.hash.slice(1))}catch(e){return location.hash.slice(1)}}
function titleOf(p){return p.title||p.path.split("/").pop()}
function pageUrl(path){return new URL(path,SITE_BASE)}
function pagePathFromUrl(url){return decodeURIComponent(url.pathname).replace(decodeURIComponent(SITE_BASE.pathname),"").replace(/^\//,"")}
function normalizeText(s){return String(s||"").normalize("NFKC").toLocaleLowerCase().replace(/[\u200b-\u200f\ufeff]/g,"").replace(/[：:，,。！？!?、；;（）()【】\[\]{}"'“”‘’]/g," ").replace(/\s+/g," ").trim()}
const SEARCH_ALIASES={
 "退订":["unsubscribe","subscription","opt out","退订","取消订阅"],
 "取消订阅":["unsubscribe","subscription","opt out","退订"],
 "邮件":["email","send","mail","邮件发送"],
 "邮件发送":["email","send","send classification","email activity"],
 "发送":["send","email","send activity"],
 "自动化":["automation","schedule","sql query activity","import activity"],
 "定时":["schedule","automation"],
 "数据表":["data extension","de","data extension api"],
 "扩展表":["data extension","de"],
 "联系人":["contact","contact key","contact builder"],
 "订阅者":["subscriber","subscriber key","all subscribers"],
 "客户旅程":["journey","journey builder","entry source"],
 "旅程":["journey","journey builder"],
 "垃圾邮件":["spam","deliverability","held","bounce"],
 "送达":["deliverability","bounce","held","spam"],
 "助词":["助詞","じょし","joshi"],
 "平假名":["ひらがな","hiragana"],
 "片假名":["カタカナ","katakana"],
 "语法":["文法","grammar"],
 "词汇":["語彙","vocabulary"],
 "汉字":["漢字","kanji"],
 "阅读":["読解","reading"],
 "听力":["聴解","listening"],
 "商务日语":["ビジネス日本語","business japanese"],
 "日常会话":["日常会話","conversation"],
 "能力考试":["jlpt","日本語能力試験"],
 "n2":["jlpt n2","日本語能力試験 n2"],
 "n3":["jlpt n3","日本語能力試験 n3"]
};
function queryGroups(q){return normalizeText(q).split(" ").filter(Boolean).map(term=>{let alts=[term];for(const [k,values] of Object.entries(SEARCH_ALIASES)){if(term===normalizeText(k)||term===normalizeText(k))alts.push(...values.map(normalizeText))}return [...new Set(alts)]})}
function renderNav(){
 const roots=[["home","首页｜开始使用"],["marketingcloud","Marketing Cloud｜产品学习"],["ri-ben-yu-xue-xi","日本語｜日语学习"]];
 $("#navigation").innerHTML='<div class="tree">'+roots.map(([key,label])=>{
  const arr=pages.filter(p=>p.path.startsWith(key+"/"));
  const groups=new Map();
  arr.forEach(p=>{if(p.path.endsWith("/README.md")&&p.path!==key+"/README.md")return;const group=p.section||"基础内容";if(!groups.has(group))groups.set(group,[]);groups.get(group).push(p)});
  return '<details open><summary>'+esc(label)+'</summary>'+[...groups.entries()].map(([g,items])=>'<details class="nav-group" open><summary>'+esc(g)+'</summary>'+items.map(p=>'<a href="#'+encodeURIComponent(p.path)+'" data-path="'+esc(p.path)+'">'+esc(titleOf(p))+'</a>').join("")+'</details>').join("")+'</details>'
 }).join("")+'</div>';
 $("#navigation").querySelectorAll("a").forEach(a=>a.onclick=e=>{e.preventDefault();location.hash=encodeURIComponent(a.dataset.path);$("#sidebar").classList.remove("open")});
}
async function init(){try{const r=await fetch(new URL("site-index.json",SITE_BASE));if(!r.ok)throw new Error("目录文件加载失败（"+r.status+"）");pages=await r.json();renderNav();await show(current);setupSearch()}catch(e){$("#article").innerHTML='<h1>暂时无法打开知识目录</h1><p>请刷新页面；如果问题持续，请检查网络连接。</p><p class="muted">'+esc(e.message)+'</p>'}}
async function show(path){
 let p=pages.find(x=>x.path===path)||pages.find(x=>x.path==="home/README.md")||pages[0];if(!p)return;
 current=p.path;history.replaceState(null,"","#"+encodeURIComponent(current));
 $("#breadcrumbs").textContent=p.section?p.section+" / "+titleOf(p):"首页";
 const res=await fetch(pageUrl(p.path));if(!res.ok){$("#article").innerHTML='<h1>文章暂时无法打开</h1><p>文件读取失败：'+esc(p.path)+'</p>';return}
 const md=await res.text();const html=window.marked?marked.parse(md):"<pre>"+esc(md)+"</pre>";$("#article").innerHTML=window.DOMPurify?DOMPurify.sanitize(html):html;
 $("#article").querySelectorAll("a").forEach(a=>{const h=a.getAttribute("href");if(!h||/^(https?:|mailto:|#|data:)/i.test(h))return;try{const resolved=new URL(h,pageUrl(p.path));if(/\.md(?:#.*)?$/i.test(h)){const target=pagePathFromUrl(resolved);if(pages.some(x=>x.path===target))a.href="#"+encodeURIComponent(target);else a.href=resolved.href}else a.href=resolved.href}catch(e){}});
 $("#article").querySelectorAll("img").forEach(img=>{const s=img.getAttribute("src");if(s&&!/^(https?:|data:)/i.test(s))img.src=new URL(s,pageUrl(p.path)).href});
 makeToc();$("#navigation a").forEach(a=>a.classList.toggle("active",a.dataset.path===p.path));
 const i=pages.indexOf(p);$("#pager").innerHTML=(i>0?'<a href="#'+encodeURIComponent(pages[i-1].path)+'">← '+esc(titleOf(pages[i-1]))+"</a>":"<span></span>")+(i<pages.length-1?'<a href="#'+encodeURIComponent(pages[i+1].path)+'">'+esc(titleOf(pages[i+1]))+" →</a>":"");
 window.scrollTo(0,0);
}
function makeToc(){const hs=[...$("#article").querySelectorAll("h2,h3")];$("#tocLinks").innerHTML=hs.map((h,i)=>{h.id="section-"+i;return '<a href="#'+h.id+'" style="margin-left:'+(h.tagName==="H3"?12:0)+'px">'+esc(h.textContent)+"</a>"}).join("")}
function stripMarkdown(md){return md.replace(/^---[\s\S]*?---\s*/," ").replace(/!\[[^\]]*\]\([^)]*\)/g," ").replace(/\[([^\]]+)\]\([^)]*\)/g,"$1").replace(/<[^>]+>/g," ").replace(/\x60{1,3}/g," ").replace(/[#>*_~|]/g," ").replace(/\s+/g," ").trim()}
async function buildSearchCorpus(){
 if(searchCorpus)return searchCorpus;if(searchPromise)return searchPromise;
 searchPromise=(async()=>{const out=[];let cursor=0;let failed=0;
  async function worker(){while(cursor<pages.length){const p=pages[cursor++];try{const r=await fetch(pageUrl(p.path));if(!r.ok){failed++;continue}const md=await r.text();const plain=stripMarkdown(md);out.push({path:p.path,title:titleOf(p),section:p.section||"",text:normalizeText(titleOf(p)+" "+(p.section||"")+" "+plain),plain})}catch(e){failed++}}}
  await Promise.all(Array.from({length:10},worker));searchCorpus=out;searchCorpus.failed=failed;return out
 })();return searchPromise
}
function makeSnippet(p,terms){const at=terms.map(t=>p.text.indexOf(t)).filter(n=>n>=0).sort((a,b)=>a-b)[0]||0;const start=Math.max(0,at-48);return esc((start?"…":"")+p.plain.slice(start,start+150)+(start+150<p.plain.length?"…":""))}
function setupSearch(){
 const input=$("#search"),box=$("#searchResults");let request=0;
 async function search(){const q=input.value.trim();if(!q){box.classList.remove("show");box.innerHTML="";return}
  const id=++request;box.classList.add("show");box.innerHTML='<p class="search-status">正在建立全文索引，首次搜索可能需要几秒钟…</p>';
  const corpus=await buildSearchCorpus();if(id!==request)return;
  const groups=queryGroups(q);const hits=corpus.map(p=>{const matched=groups.map(group=>group.find(term=>p.text.includes(term))).filter(Boolean);return {...p,matched,score:(normalizeText(p.title).includes(normalizeText(q))?100:0)+(matched.length*5)+(p.text.startsWith(normalizeText(q))?10:0)}}).filter(p=>p.matched.length===groups.length).sort((a,b)=>b.score-a.score).slice(0,30);
  const status='<p class="search-status">找到 '+hits.length+' 条结果'+(corpus.failed?'；'+corpus.failed+' 篇文章暂时无法读取':'')+'。支持中文、日文、英文和多个关键词。</p>';
  box.innerHTML=status+(hits.map(p=>'<a href="#'+encodeURIComponent(p.path)+'"><strong>'+esc(p.title)+'</strong><small>'+esc(p.section||p.path.split("/").slice(0,-1).join(" / "))+'</small><small>'+makeSnippet(p,terms)+'</small></a>').join("")||'<p class="search-status">没有找到完全匹配的内容。试试更短的词，例如「DE」「邮件」「语法」「N2」。</p>');
 }
 input.addEventListener("input",search);input.addEventListener("keydown",e=>{if(e.key==="Escape"){box.classList.remove("show");input.blur()}if(e.key==="Enter"){const first=box.querySelector("a");if(first)first.click()}});
 box.addEventListener("click",e=>{if(e.target.closest("a"))box.classList.remove("show")});
 document.addEventListener("click",e=>{if(!e.target.closest(".topsearch"))box.classList.remove("show")});
}
$("#menuToggle").onclick=()=>$("#sidebar").classList.toggle("open");
window.addEventListener("hashchange",()=>{const path=decodeHash();if(path)show(path)});
init();