import React from 'react';

import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({name: 'boots.db'});
var tableName="boots";

export const init = () =>{
    const promise = new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //tx.executeSql('DROP TABLE IF EXISTS boots', []);
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

export const addBootDb=(type, size)=>{
    const promise = new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            tx.executeSql('insert into '+tableName+'(type, size) values(?,?);',
            [type, size],            
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

export const fetchBoots=()=>{
    const promise = new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            tx.executeSql('select * from '+tableName, [],
            (tx, result)=>{
                resolve(result.rows.raw());
            },
            (tx,err)=>{
                reject(err);
            }
        );
    });
});
return promise;
};

export const deleteBootDb=(boot)=>{
    const promise = new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            tx.executeSql('delete from '+tableName+' where id=?;',
            [boot],            
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
