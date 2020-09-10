import http from 'k6/http';

export default function () {
  var url = 'http://localhost:3001/properties/10000';
  var payload = JSON.stringify({
    email: 'eugkim1997@gmail.com',
    password: 'password',
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
}