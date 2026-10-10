fx_version 'cerulean'
game 'gta5'
lua54 'yes'
name 'xiaoha_phone_app_vue'
description 'xiaoha Phone custom app starter'
version '1.0.0'
shared_script '@ox_lib/init.lua'
client_script 'client.lua'
server_script 'server.lua'
files {'web/dist/index.html', 'web/dist/assets/*', 'web/icon.svg'}
dependencies {'ox_lib', 'xiaoha_phone_duo'}
