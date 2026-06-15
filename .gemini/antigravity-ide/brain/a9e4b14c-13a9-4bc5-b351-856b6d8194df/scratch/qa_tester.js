const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('=== RUNNING QA TEST SUITE ===\n');
  const results = {
    e2e: { passed: false, details: [] },
    negatives: { passed: false, details: [] },
    consistency: { passed: false, details: [] }
  };

  let userToken = '';
  let adminToken = '';
  let testTableId = null;
  let testTableNumber = '';
  let createdBookingId = null;

  const testDate = '2026-07-28';
  const testTime = '19:00:00';

  // Helper for requests
  const request = async (path, method = 'GET', body = null, token = null) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const config = {
      method,
      headers,
    };
    if (body) config.body = JSON.stringify(body);

    const res = await fetch(`${BASE_URL}${path}`, config);
    let data = null;
    try {
      data = await res.json();
    } catch (e) {
      // ignore
    }
    return { status: res.status, data };
  };

  try {
    // -------------------------------------------------------------
    // PREPARATION: Get an available table
    // -------------------------------------------------------------
    console.log('Step 0: Log in as admin to get table list...');
    const adminLoginRes = await request('/auth/login', 'POST', {
      email: 'admin@atma.com',
      password: 'admin'
    });

    if (adminLoginRes.status !== 200 || !adminLoginRes.data.token) {
      throw new Error(`Gagal login admin untuk inisialisasi: ${JSON.stringify(adminLoginRes.data)}`);
    }
    adminToken = adminLoginRes.data.token;

    const tablesRes = await request('/tables');
    if (tablesRes.status !== 200 || !tablesRes.data || tablesRes.data.length === 0) {
      throw new Error('Gagal mengambil daftar meja untuk inisialisasi');
    }
    // Find an available table
    const availTable = tablesRes.data.find(t => !t.isBooked) || tablesRes.data[0];
    testTableId = availTable.id;
    testTableNumber = availTable.table_number;
    console.log(`Using Table ID: ${testTableId} (${testTableNumber}) for testing.\n`);

    // -------------------------------------------------------------
    // PART A: END-TO-END USER FLOW TEST
    // -------------------------------------------------------------
    console.log('--- A. END-TO-END FLOW TEST ---');

    // 1. Login sebagai user
    console.log('1. Logging in as standard user (user@atma.com)...');
    const userLoginRes = await request('/auth/login', 'POST', {
      email: 'user@atma.com',
      password: 'user'
    });
    if (userLoginRes.status === 200 && userLoginRes.data.token) {
      userToken = userLoginRes.data.token;
      results.e2e.details.push({ test: 'Login user', status: 'PASS' });
      console.log('   -> PASS: User login successful');
    } else {
      results.e2e.details.push({ test: 'Login user', status: 'FAIL', error: userLoginRes.data });
      console.log('   -> FAIL: User login failed');
    }

    // 2. Melakukan booking meja
    console.log(`2. Booking table ${testTableNumber} for ${testDate} at ${testTime}...`);
    const bookingPayload = {
      table_id: testTableId,
      booking_date: testDate,
      booking_time: testTime,
      guest_count: 2
    };
    const bookingRes = await request('/bookings', 'POST', bookingPayload, userToken);
    if (bookingRes.status === 201 && bookingRes.data.bookingId) {
      createdBookingId = bookingRes.data.bookingId;
      results.e2e.details.push({ test: 'Booking meja', status: 'PASS' });
      console.log(`   -> PASS: Booking created with ID ${createdBookingId}`);
    } else {
      results.e2e.details.push({ test: 'Booking meja', status: 'FAIL', error: bookingRes.data });
      console.log('   -> FAIL: Booking creation failed');
    }

    // 3. Login sebagai admin & Verify booking muncul di admin dashboard
    console.log('3. Fetching bookings as admin to check if the new booking appears...');
    const adminBookingsRes = await request('/admin/bookings', 'GET', null, adminToken);
    if (adminBookingsRes.status === 200 && adminBookingsRes.data.success) {
      const allBookings = adminBookingsRes.data.data;
      const found = allBookings.find(b => b.id === createdBookingId);
      if (found) {
        results.e2e.details.push({ test: 'Booking muncul di admin', status: 'PASS' });
        console.log('   -> PASS: Booking found in admin dashboard');
      } else {
        results.e2e.details.push({ test: 'Booking muncul di admin', status: 'FAIL', error: 'Booking ID not found' });
        console.log('   -> FAIL: Booking ID not found in admin list');
      }
    } else {
      results.e2e.details.push({ test: 'Admin fetch bookings', status: 'FAIL', error: adminBookingsRes.data });
      console.log('   -> FAIL: Admin get bookings endpoint failed');
    }

    // 4. Admin Approve booking
    console.log(`4. Admin approving Booking ID ${createdBookingId}...`);
    const approveRes = await request(`/admin/bookings/${createdBookingId}/approve`, 'PUT', null, adminToken);
    if (approveRes.status === 200 && approveRes.data.success) {
      results.e2e.details.push({ test: 'Approve booking', status: 'PASS' });
      console.log('   -> PASS: Booking approved successfully');
    } else {
      results.e2e.details.push({ test: 'Approve booking', status: 'FAIL', error: approveRes.data });
      console.log('   -> FAIL: Booking approval failed');
    }

    // 5. Login kembali sebagai user & Cek apakah status booking berubah
    console.log('5. Fetching bookings as user to verify status is updated...');
    const myBookingsRes = await request('/bookings/my', 'GET', null, userToken);
    if (myBookingsRes.status === 200 && Array.isArray(myBookingsRes.data)) {
      const myBooking = myBookingsRes.data.find(b => b.id === createdBookingId);
      if (myBooking && myBooking.status === 'approved') {
        results.e2e.details.push({ test: 'Status booking berubah di user', status: 'PASS' });
        console.log('   -> PASS: Booking status verified as "approved" on user dashboard');
      } else {
        results.e2e.details.push({ test: 'Status booking berubah di user', status: 'FAIL', error: myBooking });
        console.log(`   -> FAIL: Booking status is not "approved". Actual: ${myBooking ? myBooking.status : 'not found'}`);
      }
    } else {
      results.e2e.details.push({ test: 'User fetch own bookings', status: 'FAIL', error: myBookingsRes.data });
      console.log('   -> FAIL: User get own bookings endpoint failed');
    }

    results.e2e.passed = results.e2e.details.every(d => d.status === 'PASS');
    console.log('\n');

    // -------------------------------------------------------------
    // PART B: NEGATIVE / EDGE CASE TEST
    // -------------------------------------------------------------
    console.log('--- B. NEGATIVE / EDGE CASE TEST ---');

    // 1. Booking tanpa login
    console.log('1. Testing booking without auth token...');
    const noAuthRes = await request('/bookings', 'POST', {
      table_id: testTableId,
      booking_date: testDate,
      booking_time: testTime,
      guest_count: 2
    });
    if (noAuthRes.status === 401 || noAuthRes.status === 403) {
      results.negatives.details.push({ test: 'Booking tanpa login ditolak', status: 'PASS' });
      console.log(`   -> PASS: Blocked correctly with status ${noAuthRes.status}`);
    } else {
      results.negatives.details.push({ test: 'Booking tanpa login ditolak', status: 'FAIL', error: `Allowed status ${noAuthRes.status}` });
      console.log(`   -> FAIL: Request was NOT blocked correctly. Status: ${noAuthRes.status}`);
    }

    // 2. Login dengan token invalid
    console.log('2. Testing booking with invalid auth token...');
    const badAuthRes = await request('/bookings', 'POST', {
      table_id: testTableId,
      booking_date: testDate,
      booking_time: testTime,
      guest_count: 2
    }, 'invalidTokenSignatureXYZ');
    if (badAuthRes.status === 401 || badAuthRes.status === 403) {
      results.negatives.details.push({ test: 'Booking dengan token invalid ditolak', status: 'PASS' });
      console.log(`   -> PASS: Blocked correctly with status ${badAuthRes.status}`);
    } else {
      results.negatives.details.push({ test: 'Booking dengan token invalid ditolak', status: 'FAIL', error: `Allowed status ${badAuthRes.status}` });
      console.log(`   -> FAIL: Request was NOT blocked correctly. Status: ${badAuthRes.status}`);
    }

    // 3. Double booking meja yang sama
    console.log('3. Testing double booking on same table, date, and time...');
    const secondUserPayload = {
      table_id: testTableId,
      booking_date: testDate,
      booking_time: testTime,
      guest_count: 2
    };
    const doubleRes = await request('/bookings', 'POST', secondUserPayload, userToken);
    if (doubleRes.status === 409) {
      results.negatives.details.push({ test: 'Double booking ditolak', status: 'PASS' });
      console.log('   -> PASS: Double booking rejected with 409 Conflict');
    } else {
      results.negatives.details.push({ test: 'Double booking ditolak', status: 'FAIL', error: `Status code ${doubleRes.status}` });
      console.log(`   -> FAIL: Double booking did not return 409. Status: ${doubleRes.status}`);
    }

    // 4. Akses admin page/API sebagai user biasa
    console.log('4. Testing admin endpoint access as regular user...');
    const regularUserAdminRes = await request('/admin/bookings', 'GET', null, userToken);
    if (regularUserAdminRes.status === 403 || regularUserAdminRes.status === 401) {
      results.negatives.details.push({ test: 'Akses admin oleh user ditolak', status: 'PASS' });
      console.log(`   -> PASS: Blocked with status ${regularUserAdminRes.status}`);
    } else {
      results.negatives.details.push({ test: 'Akses admin oleh user ditolak', status: 'FAIL', error: `Allowed status ${regularUserAdminRes.status}` });
      console.log(`   -> FAIL: Access was not restricted. Status: ${regularUserAdminRes.status}`);
    }

    // 5. Submit booking dengan data kosong / tidak valid
    console.log('5. Testing booking with empty / invalid payload...');
    const invalidPayloadRes = await request('/bookings', 'POST', {
      table_id: null,
      booking_date: '',
      booking_time: '',
      guest_count: 0
    }, userToken);
    if (invalidPayloadRes.status === 400) {
      results.negatives.details.push({ test: 'Booking payload tidak valid ditolak', status: 'PASS' });
      console.log('   -> PASS: Rejected correctly with 400 Bad Request');
    } else {
      results.negatives.details.push({ test: 'Booking payload tidak valid ditolak', status: 'FAIL', error: `Status code ${invalidPayloadRes.status}` });
      console.log(`   -> FAIL: Empty fields booking did not return 400. Status: ${invalidPayloadRes.status}`);
    }

    results.negatives.passed = results.negatives.details.every(d => d.status === 'PASS');
    console.log('\n');

    // -------------------------------------------------------------
    // PART C: DATA CONSISTENCY TEST
    // -------------------------------------------------------------
    console.log('--- C. DATA CONSISTENCY TEST ---');

    console.log('Fetching latest admin bookings...');
    const freshAdminBookingsRes = await request('/admin/bookings', 'GET', null, adminToken);
    
    if (freshAdminBookingsRes.status === 200 && freshAdminBookingsRes.data.success) {
      const userView = myBookingsRes.data.find(b => b.id === createdBookingId);
      const adminView = freshAdminBookingsRes.data.data.find(b => b.id === createdBookingId);

      if (userView && adminView) {
        const matchDate = userView.booking_date === adminView.booking_date;
        const matchTime = userView.booking_time === adminView.booking_time;
        const matchStatus = userView.status === adminView.status;

        if (matchDate && matchTime && matchStatus) {
          results.consistency.details.push({ test: 'Data sinkron antara user dan admin views', status: 'PASS' });
          console.log('   -> PASS: Date, Time, and Status are consistent across User and Admin views.');
        } else {
          results.consistency.details.push({ 
            test: 'Data sinkron antara user dan admin views', 
            status: 'FAIL', 
            error: { userView, adminView } 
          });
          console.log('   -> FAIL: Data mismatch between User and Admin views.');
          console.log('      User View:', userView);
          console.log('      Admin View:', adminView);
        }
      } else {
        results.consistency.details.push({ test: 'Booking ditemukan di kedua view', status: 'FAIL' });
        console.log('   -> FAIL: Booking could not be found in user or admin dashboard.');
      }
    } else {
      results.consistency.details.push({ test: 'Fresh admin bookings fetch', status: 'FAIL' });
      console.log('   -> FAIL: Gagal mengambil data admin booking terbaru.');
    }

    results.consistency.passed = results.consistency.details.every(d => d.status === 'PASS');
    console.log('\n');

  } catch (error) {
    console.error('CRITICAL SYSTEM FAILURE IN TEST RUN:', error);
  }

  console.log('=== TEST RESULT SUMMARY ===');
  console.log(`E2E FLOW TESTS      : ${results.e2e.passed ? 'PASSED ✅' : 'FAILED ❌'}`);
  console.log(`EDGE CASE TESTS     : ${results.negatives.passed ? 'PASSED ✅' : 'FAILED ❌'}`);
  console.log(`CONSISTENCY TESTS   : ${results.consistency.passed ? 'PASSED ✅' : 'FAILED ❌'}`);
}

runTests();
