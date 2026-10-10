import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AppFrame, Page, Toolbar, Button, ListSection, ListRow, Toggle, TextField, Alert, Sheet, PreviewProvider, usePhoneContext, useNuiEvent, waitForPhone, phone, type PhoneContext } from '@xiaoha/phone-sdk';
import '@xiaoha/phone-sdk/styles.css';
import './style.css';
type Profile = { ok: boolean; displayName?: string; serverTime?: number; error?: string };
function App() {
    const context = usePhoneContext();
    const pending = useRef<Promise<Profile | null> | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null), [error, setError] = useState(''), [loading, setLoading] = useState(true), [name, setName] = useState(''), [enabled, setEnabled] = useState(true), [alert, setAlert] = useState(false), [sheet, setSheet] = useState(false);
    const load = useCallback(async () => {
        setLoading(true); setError(''); try {
            if (!pending.current) pending.current = import.meta.env.DEV && window.parent === window ? Promise.resolve({ ok: true, displayName: '预览角色', serverTime: Math.floor(Date.now() / 1000) }) : waitForPhone().then(() => phone.message<Profile>({ action: 'profile' }));
            const next = await pending.current;
            if (!next?.ok) throw Error(next?.error || '读取失败，请稍后再试'); setProfile(next);
        } catch (e) { setError(e instanceof Error ? e.message : '读取失败') } finally { pending.current = null; setLoading(false) }
    }, []);
    useEffect(() => { void load() }, [load]);
    const onRefresh = useCallback((data: { action?: string }) => { if (data.action === 'refresh') void load() }, [load]);
    useNuiEvent('message', onRefresh);
    return <AppFrame><Page toolbar={<Toolbar title="城市服务" largeTitle trailing={<Button variant="liquid-glass" onClick={() => phone.home()}>完成</Button>} />}>
        <div className="app-content"><p className="app-intro">你的第一个 xiaoha 手机 App</p>
            {loading ? <p role="status">正在读取资料…</p> : error ? <div role="alert" className="error-panel">{error}<Button onClick={() => void load()}>重试</Button></div> : <ListSection header="角色资料"><ListRow trailing={profile?.displayName}>角色</ListRow><ListRow trailing={context?.model === 'iphone18promax' ? 'Pro Max' : 'Duo'}>机型</ListRow><ListRow trailing={context?.theme === 'dark' ? '深色' : '浅色'}>主题</ListRow></ListSection>}
            <ListSection header="试试这些组件"><ListRow trailing={<Toggle checked={enabled} onChange={setEnabled} aria-label="接收提醒" />}>接收提醒</ListRow><TextField placeholder="输入你的城市名称" value={name} onChange={setName} /><ListRow onClick={() => setAlert(true)} disclosure>iOS 确认弹窗</ListRow><ListRow onClick={() => setSheet(true)} disclosure>毛玻璃底部面板</ListRow></ListSection>
            <Button variant="filled" size="large" onClick={() => phone.toast('来自城市服务的提示')}>发送手机提示</Button>
        </div><Alert open={alert} onChange={setAlert} title="你好，城市。" message="这个弹窗由受保护的 iOS 组件 SDK 渲染。" actions={[{ label: '取消', style: 'cancel', onClick: () => { } }, { label: '确认', onClick: () => phone.notify({ title: '城市服务', message: name || '欢迎回来' }) }]} />
        <Sheet open={sheet} onChange={setSheet}><div className="sheet-content"><h2>同一套毛玻璃组件</h2><p>主题与机型跟随手机，浮层挂在当前 AppFrame 内。</p><Button variant="liquid-glass" onClick={() => setSheet(false)}>完成</Button></div></Sheet>
    </Page></AppFrame>;
}
function Preview() {
    const [context, setContext] = useState<PhoneContext>({ theme: 'light', model: 'iphone18promax', folded: false, language: 'zh-CN', screen: 'main' });
    return <PreviewProvider context={context}><div className="preview-controls"><label>机型<select value={context.model} onChange={e => setContext({ ...context, model: e.target.value as PhoneContext['model'] })}><option value="iphone18promax">Pro Max</option><option value="duo">Duo</option></select></label><label><input type="checkbox" checked={context.theme === 'dark'} onChange={e => setContext({ ...context, theme: e.target.checked ? 'dark' : 'light' })} />深色</label><label><input type="checkbox" checked={context.folded} onChange={e => setContext({ ...context, folded: e.target.checked })} />Duo 折叠</label></div><div className={'preview-phone ' + (context.model === 'duo' && !context.folded ? 'wide' : '')}><App /></div></PreviewProvider>;
}
const preview = import.meta.env.DEV && window.parent === window;
createRoot(document.getElementById('root')!).render(<React.StrictMode>{preview ? <Preview /> : <App />}</React.StrictMode>);
