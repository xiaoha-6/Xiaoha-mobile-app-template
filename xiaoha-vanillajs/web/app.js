const phone = window.XiaohaPhone;
const status = document.getElementById('state');
const stops = [];
let ready = false;
async function load() {
 if (!ready) return;
 status.textContent = '正在读取资料…';
 try {
  const result = await phone.message({action:'profile'});
  if (!result?.ok) throw Error(result?.error || '读取失败，请稍后重试');
  document.getElementById('name').textContent = result.displayName || '—';
  status.textContent = '资料已更新';
 } catch (error) {status.textContent = error.message;}
}
stops.push(phone.on('context', context => {
 document.getElementById('app').dataset.theme = context.theme;
 document.getElementById('model').textContent = context.model === 'iphone18promax' ? 'Pro Max' : 'Duo';
}));
stops.push(phone.on('ready', () => {ready=true;void load();}));
stops.push(phone.on('message', data => {if(data?.action==='refresh')void load();}));
document.getElementById('home').onclick = () => phone.home();
document.getElementById('refresh').onclick = load;
document.getElementById('toast').onclick = () => phone.toast('来自城市服务的提示');
document.getElementById('notify').onclick = () => phone.notify({title:'城市服务',message:'欢迎回来'});
window.addEventListener('pagehide', () => stops.forEach(stop => stop()), {once:true});
if(phone.context) {
 document.getElementById('app').dataset.theme=phone.context.theme;
 document.getElementById('model').textContent=phone.context.model==='iphone18promax'?'Pro Max':'Duo';
 ready=true;void load();
} else phone.ready();
