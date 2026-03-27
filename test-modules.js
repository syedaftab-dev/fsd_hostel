// Comprehensive test script for all modules
import fetch from 'node-fetch';

const API_BASE = 'http://localhost:4000/api';

// Test user token (from previous registration)
let testToken = '';
let testUserId = '69cf952bf78a56fd22cae36b'; // From our test user

async function testModule(moduleName, endpoint, method = 'GET', body = null, requireAuth = false) {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (requireAuth && testToken) {
      headers.Cookie = `token=${testToken}`;
    }

    const options = {
      method,
      headers,
    };

    if (body && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(body);
    }

    console.log(`\nTesting ${moduleName}...`);
    const response = await fetch(`${API_BASE}${endpoint}`, options);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ ${moduleName}: SUCCESS`);
      if (data && typeof data === 'object' && Object.keys(data).length > 0) {
        console.log(`   Data:`, JSON.stringify(data, null, 2));
      }
    } else {
      console.log(`❌ ${moduleName}: FAILED (${response.status})`);
      console.log(`   Error:`, await response.text());
    }
  } catch (error) {
    console.log(`❌ ${moduleName}: ERROR - ${error.message}`);
  }
}

async function runAllTests() {
  console.log('🚀 Starting comprehensive module tests...\n');

  // First, login to get token
  try {
    const loginResponse = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'test123'
      })
    });
    
    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      console.log('✅ Login successful, got user data');
    }
  } catch (error) {
    console.log('❌ Login failed:', error.message);
    return;
  }

  // Test all modules
  await testModule('Health Check', '/health');
  await testModule('Session Check', '/auth/session');
  await testModule('Student Data', `/students/${testUserId}`, 'GET', null, true);
  await testModule('Admin Dashboard', '/admin/dashboard', 'GET', null, true);
  await testModule('All Rooms', '/rooms', 'GET', null, true);
  await testModule('Student Parcels', `/parcels/student/${testUserId}`, 'GET', null, true);
  await testModule('Notifications', '/notifications', 'GET', null, true);
  await testModule('Recent Chats', '/chat/recent', 'GET', null, true);

  // Test POST endpoints
  await testModule('Submit Complaint', '/complaints', 'POST', {
    subject: 'Test Complaint',
    description: 'This is a test complaint'
  }, true);

  await testModule('Send Notification', '/notifications', 'POST', {
    title: 'Test Notification',
    message: 'This is a test notification'
  }, true);

  await testModule('Apply for Leave', '/leaves', 'POST', {
    reason: 'Test leave',
    from: '2026-04-05',
    to: '2026-04-07'
  }, true);

  await testModule('Apply for Gate Pass', '/gatepasses', 'POST', {
    reason: 'Test gate pass',
    fromDate: '2026-04-05',
    toDate: '2026-04-05'
  }, true);

  await testModule('Emergency Alert', '/emergencies', 'POST', {
    emergencyType: 'Medical',
    description: 'Test emergency'
  }, true);

  await testModule('Lost & Found', '/lost-found', 'POST', {
    itemType: 'Wallet',
    description: 'Lost wallet near canteen',
    location: 'Canteen'
  }, true);

  await testModule('Add Parcel', '/parcels', 'POST', {
    studentId: testUserId,
    courier: 'Test Courier',
    trackingId: 'TEST123'
  }, true);

  console.log('\n🎉 All tests completed!');
}

runAllTests();
