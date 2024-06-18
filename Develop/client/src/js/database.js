import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Adds it to the database
export const putDb = async (content) => {
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({id: 1, value: content });
  const result = await request;
  console.log("data saved to the database", result);
};

// console.error('putDb not implemented');

// Retrieves from the database
export const getDb = async (e) => {
  console.log('GET from the database');
 const jateDB = await openDB('jate', 1);
 const tx = jateDB.transaction('jate', 'readonly');
 const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log("data read from database", result);
  return result;
};

// console.error('getDb not implemented');

// Export a function we will use to DELETE to the database.
export const deleteDb = async (id) => {
  console.log('DELETE from the database', id);

  // Create a connection to the database database and version we want to use.
  const contactDb = await openDB('contact', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = contactDb.transaction('contact', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('contact');

  // Use the .delete() method to get all data in the database.
  const request = store.delete(id);

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result?.value;

};
initdb();
