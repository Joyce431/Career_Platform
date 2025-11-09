const axios = require('axios');

// Test authentication endpoints
async function testAuthEndpoints() {
  const baseURL = 'http://localhost:5000/api/auth';

  console.log('Testing Authentication Endpoints...\n');

  try {
    // Test 1: User Registration
    console.log('1. Testing user registration...');
    const registerResponse = await axios.post(`${baseURL}/register`, {
      name: 'Test Student',
      email: 'teststudent@example.com',
      password: 'password123',
      role: 'student',
      phone: '+1234567890'
    });

    console.log('✓ Registration successful:', registerResponse.data);
    const verificationCode = registerResponse.data.verificationCode;

    // Test 2: Email Verification
    console.log('2. Testing email verification...');
    const verifyResponse = await axios.post(`${baseURL}/verify-email`, {
      email: 'teststudent@example.com',
      verificationCode: verificationCode
    });
    console.log('✓ Email verification successful:', verifyResponse.data);

    // Test 3: User Login
    console.log('3. Testing user login...');
    const loginResponse = await axios.post(`${baseURL}/login`, {
      email: 'teststudent@example.com',
      password: 'password123'
    });
    console.log('✓ Login successful:', loginResponse.data);
    const token = loginResponse.data.token;

    // Test 4: Get User Profile
    console.log('4. Testing get user profile...');
    const profileResponse = await axios.get(`${baseURL}/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✓ Profile fetch successful:', profileResponse.data);

    console.log('\nAll authentication tests passed! ✅');

  } catch (error) {
    console.error('Authentication test failed:', error.response ? error.response.data : error.message);
  }
}

// Test error scenarios
async function testErrorScenarios() {
  const baseURL = 'http://localhost:5000/api/auth';

  console.log('\nTesting Error Scenarios...\n');

  try {
    // Test duplicate registration
    console.log('1. Testing duplicate user registration...');
    try {
      await axios.post(`${baseURL}/register`, {
        name: 'Test Student 2',
        email: 'teststudent@example.com', // Same email
        password: 'password123',
        role: 'student'
      });
      console.log('✗ Should have failed for duplicate email');
    } catch (error) {
      console.log('✓ Duplicate registration correctly rejected:', error.response.data.error);
    }

    // Test invalid login
    console.log('2. Testing invalid login...');
    try {
      await axios.post(`${baseURL}/login`, {
        email: 'nonexistent@example.com',
        password: 'wrongpassword'
      });
      console.log('✗ Should have failed for invalid credentials');
    } catch (error) {
      console.log('✓ Invalid login correctly rejected:', error.response.data.error);
    }

    // Test accessing profile without token
    console.log('3. Testing unauthorized profile access...');
    try {
      await axios.get(`${baseURL}/me`);
      console.log('✗ Should have failed without authentication');
    } catch (error) {
      console.log('✓ Unauthorized access correctly rejected:', error.response.data.error);
    }

    console.log('\nAll error scenario tests passed! ✅');

  } catch (error) {
    console.error('Error scenario test failed:', error.message);
  }
}

// Run all tests
async function runAllTests() {
  console.log('Starting Authentication Integration Tests...\n');

  await testAuthEndpoints();
  await testErrorScenarios();

  console.log('\n🎉 All authentication tests completed!');
}

runAllTests();
