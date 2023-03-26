```
nest new mycv
nest g module users
nest g module reports
nest g controller users
nest g controller reports
nest g service users
nest g service reports

pnpm i @types/node
pnpm i -g  --verbose windows-build-tools
pnpm config set python python3 -g
pnpm config set msvs_version 2019 -g
pnpm i @nestjs/typeorm typeorm sqlite3

.npmrc
strict-ssl=false 
set NODE_TLS_REJECT_UNAUTHORIZED=0
node_sqlite3_binary_host_mirror=https://registry.npmmirror.com/

#http to socks5
npm install -g http-proxy-to-socks
# socks5 1080 to 1081
hpts -s 127.0.0.1:1080 -p 1081
#设置代理
npm config set proxy http://127.0.0.1:9910
npm config set https-proxy http://127.0.0.1:9910
```
``` 
pnpm i class-validator class-transformer
pnpm i cookie-session @types/cookie-session
```
