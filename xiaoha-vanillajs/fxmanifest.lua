fx_version 'cerulean'
game 'gta5'
lua54 'yes'
name 'xiaoha_phone_app_vanillajs'
description 'xiaoha Phone custom app starter'
version '1.0.0'
shared_script '@ox_lib/init.lua'
client_script 'client.lua'
server_script 'server.lua'
files {'web/index.html', 'web/app.js', 'web/style.css', 'web/vendor/**/*', 'web/icon.svg'}
dependencies {'ox_lib', 'xiaoha_phone_duo'}
