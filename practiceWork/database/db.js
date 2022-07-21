import React from 'react';

import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({name: 'people.db'});
var tableName="people";

export const init = () =>{
    const promise = new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //tx.executeSql('DROP TABLE IF EXISTS people', []); //For testing
            tx.executeSql('create table if not exists '+tableName+'(id integer not null primary key, fname text not null, lname text not null, street text, pcode integer not null, city text, country text, archive integer);',
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