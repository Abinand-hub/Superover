const email = 'test@test.com';
const action = 'login';

fetch('http://localhost:3000/api/auth/send-otp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, action })
})
.then(res => res.json())
.then(console.log)
.catch(console.error);
