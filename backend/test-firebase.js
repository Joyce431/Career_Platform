const admin = require('firebase-admin');
const { FirebaseService } = require('./services/FirebaseService');

// Test Firebase connection
async function testFirebaseConnection() {
  try {
    console.log('Testing Firebase Admin SDK connection...');

    // Test basic Firestore operations
    console.log('Testing Firestore operations...');

    // Create a test document
    const testData = {
      name: 'Test Document',
      description: 'This is a test document to verify Firebase connection',
      timestamp: new Date().toISOString()
    };

    const createdDoc = await FirebaseService.create('test', testData);
    console.log('✓ Created test document:', createdDoc.id);

    // Get the document
    const retrievedDoc = await FirebaseService.getById('test', createdDoc.id);
    console.log('✓ Retrieved test document:', retrievedDoc.name);

    // Update the document
    const updatedDoc = await FirebaseService.update('test', createdDoc.id, {
      ...testData,
      updated: true
    });
    console.log('✓ Updated test document:', updatedDoc.updated);

    // Query documents
    const allDocs = await FirebaseService.getAll('test');
    console.log('✓ Queried documents, found:', allDocs.length);

    // Delete the test document
    await FirebaseService.delete('test', createdDoc.id);
    console.log('✓ Deleted test document');

    console.log('✅ All Firebase operations completed successfully!');

  } catch (error) {
    console.error('❌ Firebase test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testFirebaseConnection();
