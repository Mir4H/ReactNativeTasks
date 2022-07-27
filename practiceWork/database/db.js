import React from 'react';

import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'people.db'});
var tableName = 'people';

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      //tx.executeSql('DROP TABLE IF EXISTS people', []); //For testing
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

export const updateDataToDb = (firstname, lastname, street, postalCode, city, id) => {
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
