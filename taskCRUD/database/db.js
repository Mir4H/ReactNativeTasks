import React from 'react';

import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({name: 'boots.db'});
var tableName="boots";

export const init = () =>{
    const promise = new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            tx.executeSql('DROP TABLE IF EXISTS fish', []);
            tx.executeSql('create table if not exists '+tableName+'(id integer not null primary key, type text not null, size real not null);',
            [],
            ()=>{
                resolve();
            },
            (_,err)=>{
                reject(err);
            }
            );
        });
    });
    return promise;
};
