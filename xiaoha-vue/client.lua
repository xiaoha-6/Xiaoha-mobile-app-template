local appId = 'city_vue'
local registered = false
local resource = GetCurrentResourceName()

local function register()
    if registered or GetResourceState('xiaoha_phone_duo') ~= 'started' then return end
    local called, ok, message = pcall(function()
        return exports['xiaoha_phone_duo']:RegisterApp({
            id = appId, name = 'Vue 城市服务', description = '你的第一个 xiaoha 手机 App',
            icon = 'web/icon.svg', ui = 'web/dist/index.html', category = 'city',
            onMessage = function(data)
                if type(data) ~= 'table' then return {ok = false, error = '请求格式不正确'} end
                if data.action == 'profile' then
                    return lib.callback.await(resource .. ':profile', false)
                end
                return {ok = false, error = '不支持此操作'}
            end,
        })
    end)
    registered = called and ok == true
    if called and not ok then print('[xiaoha Phone App] ' .. tostring(message)) end
end

AddEventHandler('xiaoha_phone_duo:client:ready', register)
AddEventHandler('onClientResourceStart', function(resource)
    if resource == 'xiaoha_phone_duo' then registered = false end
    if resource == GetCurrentResourceName() or resource == 'xiaoha_phone_duo' then register() end
end)
CreateThread(function()
    while true do if not registered then register() end;Wait(1500) end
end)
AddEventHandler('onClientResourceStop', function(resource)
    if resource == 'xiaoha_phone_duo' then registered = false end
    if resource == GetCurrentResourceName() and GetResourceState('xiaoha_phone_duo') == 'started' then
        pcall(function() exports['xiaoha_phone_duo']:UnregisterApp(appId) end)
    end
end)

-- 业务数据准备好后推送；首次数据由网页挂载后主动请求。
RegisterNetEvent(resource .. ':refresh', function()
    exports['xiaoha_phone_duo']:SendAppMessage(appId, {action = 'refresh'})
end)
