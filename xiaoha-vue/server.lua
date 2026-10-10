local lastRequest = {}
lib.callback.register(GetCurrentResourceName() .. ':profile', function(source)
    if not GetPlayerName(source) then return {ok = false, error = '角色不在线'} end
    local now = GetGameTimer()
    if lastRequest[source] and now - lastRequest[source] < 1000 then
        return {ok = false, error = '请稍后重试'}
    end
    lastRequest[source] = now
    -- 始终使用服务器提供的 source；钱、物品和职业权限在这里检查。
    return {ok = true, displayName = GetPlayerName(source), serverTime = os.time()}
end)
AddEventHandler('playerDropped', function() lastRequest[source] = nil end)
