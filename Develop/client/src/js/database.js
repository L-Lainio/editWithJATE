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
 const jateDB = await openDB('jate', 1);
 const tx = jateDB.transaction('jate', 'readonly');
 const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log("data read from database", result);
  return result.value;
};

// console.error('getDb not implemented');

initdb();
