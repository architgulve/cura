import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('cura.db');

export const getDatabaseStatus = async () => {
  try {
    const result = await db.getAllAsync(`SELECT name FROM sqlite_master WHERE type='table';`);
    console.log('  Database tables:', result);
    return result;
  } catch (error) {
    console.error('  Error fetching database status:', error);
    return [];
  }
};

const createNotiTable = () => {
  try {
    db.execAsync(`
      CREATE TABLE IF NOT EXISTS Notification (
        NotificationID INTEGER PRIMARY KEY AUTOINCREMENT,
        NotificationName TEXT NOT NULL,
        NotificationTime TEXT NOT NULL
      );
    `);
    console.log('  Notification table created successfully');
  } catch (error) {
    console.error('  Error creating Notification table:', error);
  }
}

const addNoti = async (name, time) => {
  try {
    const result = await db.runAsync(
      `INSERT INTO Notification (NotificationName, NotificationTime)
       VALUES (?, ?)`,
      [name, time]
    );
    console.log('  Insert result:', result);
    console.log('New notification ID:', result.lastInsertRowId);
    return result.changes > 0;
  } catch (error) {
    console.error('  Error adding notification:', error);
    return false;
  }
}

const getAllNotifications = async () => {
  try {
    const notifications = await db.getAllAsync('SELECT * FROM Notification ORDER BY NotificationID DESC');
    console.log('Retrieved notifications:', notifications);
    return notifications;
  } catch (error) {
    console.error('  Error fetching notifications:', error);
    return [];
  }
};

const deleteNoti = async (id) => {
  try {
    const result = await db.runAsync('DELETE FROM Notification WHERE NotificationID = ?', [id]);
    console.log('  Delete result:', result);
    return result.changes > 0;
  } catch (error) {
    console.error('  Error deleting notification:', error);
    return false;
  }
}

export { createNotiTable, addNoti, getAllNotifications, deleteNoti };


const createMedicineTable = () => {
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS Medicine (
        MedicineID INTEGER PRIMARY KEY AUTOINCREMENT,
        MedicineName TEXT NOT NULL,
        QuantityLiquid INTEGER DEFAULT 0,
        QuantityTablet INTEGER DEFAULT 0,
        NumberOfDays INTEGER NOT NULL,
        TimeToBeTakenAt TEXT NOT NULL,
        StartDate DATE NOT NULL
      );
    `);
    console.log('  Medicine table created successfully');
    return true;
  } catch (error) {
    console.error('  Error creating Medicine table:', error);
    return false;
  }
};

const insertMedicine = async (name, quantityLiquid, quantityTablet, numberOfDays, timeToBeTakenAt, startDate) => {
  try {
    console.log('Inserting medicine with data:', {
      name,
      quantityLiquid,
      quantityTablet,
      numberOfDays,
      timeToBeTakenAt,
      startDate
    });

    const result = await db.runAsync(
      `INSERT INTO Medicine (MedicineName, QuantityLiquid, QuantityTablet, NumberOfDays, TimeToBeTakenAt, StartDate)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, quantityLiquid, quantityTablet, numberOfDays, timeToBeTakenAt, startDate]
    );
    
    console.log('  Insert result:', result);
    console.log('New medicine ID:', result.lastInsertRowId);
    
    return result.changes > 0;
  } catch (error) {
    console.error('  Error inserting medicine:', error);
    return false;
  }
};

const getAllMedicines = async () => {
  try {
    const medicines = await db.getAllAsync('SELECT * FROM Medicine ORDER BY MedicineID DESC');
    console.log('Retrieved medicines:', medicines);
    return medicines;
  } catch (error) {
    console.error('  Error fetching medicines:', error);
    return [];
  }
};

const getMedicineById = async (id) => {
  try {
    const medicine = await db.getFirstAsync('SELECT * FROM Medicine WHERE MedicineID = ?', [id]);
    return medicine;
  } catch (error) {
    console.error('  Error fetching medicine by ID:', error);
    return null;
  }
};


const updateMedicine = async (id, name, quantityLiquid, quantityTablet, numberOfDays, timeToBeTakenAt, startDate) => {
  try {
    const result = await db.runAsync(
      `UPDATE Medicine 
       SET MedicineName = ?, QuantityLiquid = ?, QuantityTablet = ?, 
           NumberOfDays = ?, TimeToBeTakenAt = ?, StartDate = ?
       WHERE MedicineID = ?`,
      [name, quantityLiquid, quantityTablet, numberOfDays, timeToBeTakenAt, startDate, id]
    );
    return result.changes > 0;
  } catch (error) {
    console.error('  Error updating medicine:', error);
    return false;
  }
};

const deleteMedicine = async (id) => {
  try {
    const result = await db.runAsync('DELETE FROM Medicine WHERE MedicineID = ?', [id]);
    return result.changes > 0;
  } catch (error) {
    console.error('  Error deleting medicine:', error);
    return false;
  }
};

const debugShowAllMedicines = async () => {
  try {
    const medicines = await getAllMedicines();
    console.log('DEBUG - All medicines in database:');
    medicines.forEach((med, index) => {
      console.log(`${index + 1}. ID: ${med.MedicineID}, Name: ${med.MedicineName}, Times: ${med.TimeToBeTakenAt}`);
    });
    return medicines;
  } catch (error) {
    console.error('  Debug error:', error);
    return [];
  }
};

export {
  createMedicineTable,
  insertMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
  debugShowAllMedicines
};

export const initDatabase = () => {
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        age TEXT NOT NULL,
        language TEXT NOT NULL,
        bloodgroup TEXT NOT NULL,
        emergencyContact TEXT NOT NULL,
        primaryDoctor TEXT NOT NULL
      );
    `);
    console.log('  Settings table created successfully');
  } catch (error) {
    console.error('  Error creating settings table:', error);
  }
};

export const insertSetting = async (name, age, language, bloodgroup, emergencyContact, primaryDoctor) => {
  try {
    const result = await db.runAsync(
      `INSERT OR REPLACE INTO settings (name, age, language, bloodgroup, emergencyContact, primaryDoctor) VALUES (?, ?, ?, ?, ?, ?);`,
      [name, age, language, bloodgroup, emergencyContact, primaryDoctor]
    );
    console.log('  Insert result:', result);
    return true;
  } catch (error) {
    console.error('  Error inserting setting:', error);
    return false;
  }
};

export const getSettings = async () => {
  try {
    return await db.getFirstAsync(`SELECT * FROM settings LIMIT 1;`);
  } catch (error) {
    console.error('  Error fetching settings:', error);
    return null;
  }
};

export const clearSettings = async () => {
  try {
    await db.runAsync(`DELETE FROM settings;`);
    return true;
  } catch (error) {
    console.error('  Error clearing settings:', error);
    return false;
  }
};

export const dietpage = () => {
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS diet (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        calories INTEGER NOT NULL,
        protein INTEGER NOT NULL,
        water INTEGER NOT NULL,
        breakfast TEXT NOT NULL,
        lunch TEXT NOT NULL,
        dinner TEXT NOT NULL,
        description TEXT NOT NULL
      );
    `);
    console.log('  Diet table created successfully');
  } catch (error) {
    console.error('  Error creating diet table:', error);
  }
};

export const insertDiet = async (calories, protein, water, breakfast, lunch, dinner, description) => {
  try {
    const result = await db.runAsync(
      `INSERT INTO diet (calories, protein, water, breakfast, lunch, dinner, description) VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [calories, protein, water, breakfast, lunch, dinner, description]
    );
    return true;
  } catch (error) {
    console.error('  Error inserting diet:', error);
    return false;
  }
};

export const getLatestDiet = async () => {
  try {
    return await db.getFirstAsync(`SELECT * FROM diet ORDER BY id DESC LIMIT 1;`);
  } catch (error) {
    console.error('  Error fetching latest diet:', error);
    return null;
  }
};

export const getAllDiets = async () => {
  try {
    return await db.getAllAsync(`SELECT * FROM diet ORDER BY id DESC;`);
  } catch (error) {
    console.error('  Error fetching diets:', error);
    return [];
  }
};

export const initializeDatabase = () => {
  createMedicineTable();
  initDatabase();
  dietpage();
  createNotiTable();
  console.log('  All tables initialized');
};


