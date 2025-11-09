const { db, storage } = require('../firebase');
const admin = require('firebase-admin');

// Utility functions
const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

// Collection references
const collections = {
  USERS: 'users',
  INSTITUTIONS: 'institutions',
  STUDENTS: 'students',
  COMPANIES: 'companies',
  JOBS: 'jobs',
  APPLICATIONS: 'applications',
  ADMISSIONS: 'admissions',
  DOCUMENTS: 'documents'
};

// Generic CRUD operations
class FirebaseService {
  // Create document
  static async create(collectionName, data) {
    try {
      const docId = data.id || db.collection(collectionName).doc().id;
      const docRef = db.collection(collectionName).doc(docId);
      await docRef.set({
        ...data,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      return { id: docRef.id, ...data };
    } catch (error) {
      throw new Error(`Error creating document: ${error.message}`);
    }
  }

  // Get document by ID
  static async getById(collectionName, id) {
    try {
      const docRef = db.collection(collectionName).doc(id);
      const docSnap = await docRef.get();

      if (docSnap.exists) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Error getting document: ${error.message}`);
    }
  }

  // Update document
  static async update(collectionName, id, data) {
    try {
      const docRef = db.collection(collectionName).doc(id);
      await docRef.update({
        ...data,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      return await this.getById(collectionName, id);
    } catch (error) {
      throw new Error(`Error updating document: ${error.message}`);
    }
  }

  // Delete document
  static async delete(collectionName, id) {
    try {
      const docRef = db.collection(collectionName).doc(id);
      await docRef.delete();
      return { message: 'Document deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting document: ${error.message}`);
    }
  }

  // Get all documents with optional query
  static async getAll(collectionName, conditions = [], orderByField = 'createdAt', orderDirection = 'desc') {
    try {
      let query = db.collection(collectionName);

      // Add where conditions
      conditions.forEach(condition => {
        query = query.where(condition.field, condition.operator, condition.value);
      });

      // Add order by
      query = query.orderBy(orderByField, orderDirection);

      const querySnapshot = await query.get();
      const documents = [];

      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });

      return documents;
    } catch (error) {
      throw new Error(`Error getting documents: ${error.message}`);
    }
  }

  // Query documents
  static async query(collectionName, field, operator, value) {
    try {
      const querySnapshot = await db.collection(collectionName).where(field, operator, value).get();
      const documents = [];

      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });

      return documents;
    } catch (error) {
      throw new Error(`Error querying documents: ${error.message}`);
    }
  }

  // Upload file to storage
  static async uploadFile(file, path) {
    try {
      const bucket = storage.bucket();
      const fileRef = bucket.file(path);
      await fileRef.save(file.buffer, {
        metadata: {
          contentType: file.mimetype
        }
      });
      const downloadURL = await fileRef.getSignedUrl({
        action: 'read',
        expires: '03-09-2491'
      });
      return downloadURL[0];
    } catch (error) {
      throw new Error(`Error uploading file: ${error.message}`);
    }
  }

  // Delete file from storage
  static async deleteFile(path) {
    try {
      const bucket = storage.bucket();
      const fileRef = bucket.file(path);
      await fileRef.delete();
      return { message: 'File deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting file: ${error.message}`);
    }
  }

  // Batch operations
  static async batchCreate(collectionName, documents) {
    try {
      const batch = db.batch();

      documents.forEach(document => {
        const docRef = db.collection(collectionName).doc();
        batch.set(docRef, {
          ...document,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      });

      await batch.commit();
      return { message: 'Batch create successful' };
    } catch (error) {
      throw new Error(`Error in batch create: ${error.message}`);
    }
  }
}

module.exports = { FirebaseService, collections, generateId };
