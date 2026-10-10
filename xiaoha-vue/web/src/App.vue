<script setup>
import {computed,onMounted,onUnmounted,ref} from 'vue';
const phone=window.XiaohaPhone;
const standalone=import.meta.env.DEV&&window.parent===window;
const context=ref(phone.context||{theme:'light',model:'iphone18promax',screen:'cover',folded:false});
const profile=ref(null),loading=ref(false),error=ref(''),city=ref(''),alerts=ref(true);
const stops=[];
let pending=null;
const wide=computed(()=>context.value.model==='duo'&&!context.value.folded);
function updateContext(next){context.value={...context.value,...next};}
async function load(){
 if(!standalone&&!phone.context)return;
 loading.value=true;error.value='';
 try{
  if(!pending)pending=standalone?Promise.resolve({ok:true,displayName:'预览角色'}):phone.message({action:'profile'});
  const next=await pending;
  if(!next?.ok)throw Error(next?.error||'读取失败，请稍后重试');
  profile.value=next;
 }catch(e){error.value=e.message||'读取失败';}finally{pending=null;loading.value=false;}
}
function toast(){if(standalone)window.alert('来自 Vue App 的提示');else phone.toast('来自 Vue App 的提示');}
function notify(){if(standalone)window.alert(city.value||'欢迎回来');else phone.notify({title:'Vue 城市服务',message:city.value||'欢迎回来'});}
onMounted(()=>{
 stops.push(phone.on('context',updateContext));
 stops.push(phone.on('ready',()=>void load()));
 stops.push(phone.on('message',data=>{if(data?.action==='refresh')void load();}));
 if(standalone||phone.context)void load();else phone.ready();
});
onUnmounted(()=>stops.forEach(stop=>stop()));
</script>

<template>
 <div v-if="standalone" class="preview-controls">
  <label>机型<select :value="context.model" @change="updateContext({model:$event.target.value})"><option value="iphone18promax">Pro Max</option><option value="duo">Duo</option></select></label>
  <label><input type="checkbox" :checked="context.theme==='dark'" @change="updateContext({theme:$event.target.checked?'dark':'light'})">深色</label>
  <label><input type="checkbox" :checked="context.folded" @change="updateContext({folded:$event.target.checked})">Duo 折叠</label>
 </div>
 <div :class="['vue-shell',{'preview-phone':standalone,wide:standalone&&wide}]">
  <div class="ios27-scope vue-app" :data-theme="context.theme" :data-model="context.model">
   <header><div><p class="eyebrow">XIAOHA PHONE · VUE</p><h1>城市服务</h1></div><button class="glass-button" @click="phone.home()">完成</button></header>
   <main>
    <p class="intro">你的第一个 Vue 手机 App</p>
    <p v-if="loading" role="status">正在读取资料…</p>
    <div v-else-if="error" class="error" role="alert">{{error}}<button @click="load">重试</button></div>
    <p v-else-if="!profile" role="status">正在连接手机…</p>
    <section class="group"><h2>角色资料</h2><div class="row"><span>角色</span><span>{{profile?.displayName||'—'}}</span></div><div class="row"><span>机型</span><span>{{context.model==='iphone18promax'?'Pro Max':'Duo'}}</span></div><div class="row"><span>主题</span><span>{{context.theme==='dark'?'深色':'浅色'}}</span></div></section>
    <section class="group"><h2>你的城市</h2><label class="row">接收提醒<input v-model="alerts" type="checkbox" role="switch" class="toggle" aria-label="接收提醒"></label><input v-model="city" class="text-field" placeholder="输入你的城市名称" aria-label="城市名称"></section>
    <div class="actions"><button :disabled="loading" @click="load">刷新资料</button><button @click="toast">发送手机提示</button><button class="glass-button" @click="notify">发送通知</button></div>
   </main>
  </div>
 </div>
</template>
