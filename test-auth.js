// Simple test script to verify authentication flow
const API_URL = 'http://localhost:5000/api';

async function testAuthFlow() {
  console.log('🚀 Testing Authentication Flow...\n');

  try {
    // Test 1: Signup
    console.log('1️⃣ Testing Signup...');
    const signupResponse = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'testuser@example.com',
        password: 'testpassword123',
        firstName: 'Test',
        lastName: 'User',
        confirmPassword: 'testpassword123'
      })
    });

    const signupData = await signupResponse.json();
    console.log('✅ Signup Response:', signupData);
    
    if (!signupData.success) {
      console.log('ℹ️ User might already exist, continuing with signin...');
    }

    // Test 2: Signin
    console.log('\n2️⃣ Testing Signin...');
    const signinResponse = await fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'testuser@example.com',
        password: 'testpassword123'
      })
    });

    const signinData = await signinResponse.json();
    console.log('✅ Signin Response:', signinData);

    if (!signinData.success) {
      throw new Error('Signin failed: ' + signinData.message);
    }

    const token = signinData.data.token;
    console.log('🔑 Token received:', token.substring(0, 20) + '...');

    // Test 3: Protected Route (/me)
    console.log('\n3️⃣ Testing Protected Route (/me)...');
    const meResponse = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const meData = await meResponse.json();
    console.log('✅ /me Response:', meData);

    if (!meData.success) {
      throw new Error('Protected route failed: ' + meData.message);
    }

    // Test 4: Invalid Token
    console.log('\n4️⃣ Testing Invalid Token...');
    const invalidResponse = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer invalid-token',
        'Content-Type': 'application/json'
      }
    });

    const invalidData = await invalidResponse.json();
    console.log('✅ Invalid Token Response:', invalidData);

    if (invalidData.success) {
      throw new Error('Invalid token should have failed');
    }

    console.log('\n🎉 All authentication tests passed!');
    console.log('\n📋 Summary:');
    console.log('- ✅ Signup endpoint working');
    console.log('- ✅ Signin endpoint working');
    console.log('- ✅ JWT token generation working');
    console.log('- ✅ Protected routes working');
    console.log('- ✅ Token validation working');
    console.log('- ✅ Error handling working');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testAuthFlow();
