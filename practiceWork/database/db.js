import React from 'react';
import {openDatabase} from 'react-native-sqlite-storage';

//create database with name people and a table named people
var db = openDatabase({name: 'people.db'});
var tableName = 'people';

//create the table in case doesn't exist
export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      //tx.executeSql('DROP TABLE IF EXISTS people', []); //For testing - empty the database
      tx.executeSql(
        'create table if not exists ' +
          tableName +
          '(id integer not null primary key, firstname text not null, lastname text not null, street text, postalcode text not null, city text, archive integer);',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

//save contacts data to the database
export const saveDataToDb = (firstname, lastname, street, postalCode, city) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'insert into ' +
          tableName +
          '(firstname, lastname, street, postalcode, city, archive) values(?,?,?,?,?,?);',
        [firstname, lastname, street, postalCode, city, 0],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

//update existing database item
export const updateDataToDb = (
  firstname,
  lastname,
  street,
  postalCode,
  city,
  id,
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'update ' +
          tableName +
          ' set firstname=?, lastname=?, street=?, postalcode=?, city=?, archive=? where id=?;',
        [firstname, lastname, street, postalCode, city, 0, id],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

// fetch all data fromm database based on if it's archived or not and in a specific order
export const fetchData = (archive, order) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'select * from ' + tableName + ' where archive = ? order by ' + order,
        [archive],
        (tx, result) => {
          resolve(result.rows.raw());
        },
        (tx, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

//fetch one contact's data from database
export const fetchPersonData = id => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'select * from ' + tableName + ' where id = ' + id,
        [],
        (tx, result) => {
          resolve(result.rows.raw());
        },
        (tx, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

//delete one contact's data from the database
export const deleteItemDb = id => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'delete from ' + tableName + ' where id=?;',
        [id],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

//modify archive value of an item in the database
export const archiveItemDb = (archive, id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'update ' + tableName + ' set archive=? where id=?;',
        [archive, id],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};
