---
title: Development - Vagrant
sort: 11
contributors:
  - SpaceK33z
  - chrisVillanueva
  - byzyk
  - wizardofhogwarts
translators:
  - choilim
---

[Vagrant를](https://www.vagrantup.com/) 사용하여 가상 머신에서 개발 환경을 실행하는 경우, 가상 머신에서도 webpack을 실행하고 싶을 수 있습니다.

## Configuring the Project

시작하려면, `Vagrantfile`에 고정 IP가 있는지 확인하세요.

```ruby
Vagrant.configure("2") do |config|
  config.vm.network :private_network, ip: "10.10.10.61"
end
```

다음으로, 프로젝트에 `webpack`과 `webpack-dev-server`를 설치하세요.

```bash
npm install --save-dev webpack webpack-dev-server
```

`webpack.config.js` 파일이 있는지 확인하세요. 만약 파일이 없다면 다음을 최소한의 예제로 사용해 시작하세요.

```js
module.exports = {
  context: __dirname,
  entry: './app.js',
};
```

그리고 `index.html` 파일을 만듭니다. 스크립트 태그는 번들을 가리켜야 합니다. `output.filename`이 지정되어 있지 않다면, `bundle.js`가 됩니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="/bundle.js" charset="utf-8"></script>
  </head>
  <body>
    <h2>Heey!</h2>
  </body>
</html>
```

`app.js` 파일도 만들어야 합니다.

## Running the Server

이제, 서버를 실행하세요.

```bash
webpack serve --host 0.0.0.0 --public 10.10.10.61:8080 --watch-poll
```

기본적으로, 서버는 로컬 호스트에서만 접근할 수 있습니다. 호스트 PC에서 접근할 것이므로, 이를 허용하려면 `--host`를 변경해야 합니다.

`webpack-dev-server`는 파일이 변경될 때 다시 로드하기 위해 WebSocket에 연결하는 스크립트를 번들에 포함합니다.
`--public` 플래그는 스크립트가 WebSocket을 찾을 위치를 알고 있는지 확인합니다. 서버는 기본적으로 `8080` 포트를 사용하므로, 여기에서도 지정해야 합니다.

`--watch-poll`은 webpack이 파일의 변경을 감지할 수 있도록 합니다. 기본적으로, webpack은 파일 시스템에 의해 트리거되는 이벤트를 수신하지만, VirtualBox에는 이와 관련된 많은 문제가 있습니다.

서버는 이제 `http://10.10.10.61:8080`에서 접근할 수 있습니다. `app.js`를 변경하면 실시간으로 다시 로드됩니다.

## Advanced Usage with nginx

좀 더 생산적인 환경을 모방하기 위해, nginx로 `webpack-dev-server`를 프록시 할 수도 있습니다.

nginx 설정 파일에 다음을 추가하십시오.

```nginx
server {
  location / {
    proxy_pass http://127.0.0.1:8080;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    error_page 502 @start-webpack-dev-server;
  }

  location @start-webpack-dev-server {
    default_type text/plain;
    return 502 "Please start the webpack-dev-server first.";
  }
}
```

`proxy_set_header` 줄은 WebSocket이 올바르게 작동하도록 허용하기 때문에 중요합니다.

`webpack-dev-server`를 시작하는 명령을 다음과 같이 변경할 수 있습니다.

```bash
webpack serve --public 10.10.10.61 --watch-poll
```

이렇게 하면, `127.0.0.1`에서만 서버에 접근할 수 있으며, nginx가 호스트 PC에서 사용할 수 있도록 처리하므로 괜찮습니다.

## Conclusion

고정 IP에서 Vagrant box에 접근할 수 있도록 만든 다음, `webpack-dev-server`를 공개적으로 접근할 수 있도록 하여 브라우저에서 접근할 수 있도록 했습니다. VirtualBox가 파일 시스템 이벤트를 보내지 않아 서버가 파일 변경 시 다시 로드되지 않는 일반적인 문제를 해결했습니다.
