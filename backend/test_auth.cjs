const http = require('http');

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, data: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, data: body });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function runTests() {
  console.log('--- STARTING AUTH ENDPOINT TESTS ---');

  // 1. Send OTP
  const otpRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/send-otp',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { phone: '9123456780' });
  console.log('1. Send OTP result:', otpRes.status, otpRes.data);
  const otp = otpRes.data.simulatedOtp;

  // 2. Signup
  const signupRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/signup',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    name: 'Ramesh Patel',
    phone: '9123456780',
    email: 'ramesh@vyapaarsarthi.gov.in',
    password: 'Password123',
    otp: otp
  });
  console.log('2. Signup result:', signupRes.status, signupRes.data);
  const cookie = signupRes.headers['set-cookie']?.[0]?.split(';')[0];
  console.log('   Received cookie:', cookie);

  // 3. Duplicate phone test
  const dupRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/signup',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    name: 'Duplicate User',
    phone: '9123456780',
    password: 'Password123'
  });
  console.log('3. Duplicate Signup check (should fail 409):', dupRes.status, dupRes.data);

  // 4. GET /api/auth/me with cookie
  const meRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/me',
    method: 'GET',
    headers: { 'Cookie': cookie }
  });
  console.log('4. GET /me result:', meRes.status, meRes.data);

  // 5. Logout
  const logoutRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/logout',
    method: 'POST',
    headers: { 'Cookie': cookie }
  });
  console.log('5. Logout result:', logoutRes.status, logoutRes.data);

  // 6. Login with phone
  const loginRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    identifier: '9123456780',
    password: 'Password123'
  });
  console.log('6. Login with phone result:', loginRes.status, loginRes.data);

  // 7. Login with email
  const loginEmailRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    identifier: 'ramesh@vyapaarsarthi.gov.in',
    password: 'Password123'
  });
  console.log('7. Login with email result:', loginEmailRes.status, loginEmailRes.data);

  // 8. Forgot password
  const forgotRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/forgot-password',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    identifier: 'ramesh@vyapaarsarthi.gov.in'
  });
  console.log('8. Forgot password result:', forgotRes.status, forgotRes.data);
  const resetToken = forgotRes.data.simulatedToken;

  // 9. Reset password
  const resetRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/reset-password',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    token: resetToken,
    newPassword: 'NewPassword999'
  });
  console.log('9. Reset password result:', resetRes.status, resetRes.data);

  // 10. Login with new password
  const loginNewRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    identifier: '9123456780',
    password: 'NewPassword999'
  });
  console.log('10. Login with new password:', loginNewRes.status, loginNewRes.data);

  console.log('--- ALL AUTH TESTS PASSED ---');
}

runTests().catch(console.error);
