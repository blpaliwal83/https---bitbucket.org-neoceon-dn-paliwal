/**
 * A class that gives access into WebSQL storage
 */
Ext.define('storage.WebSql', {
    singleton: true,
    requires: ['Ext.DateExtras', 'Ext.Date'],
    config: {
        /**
         * The database capacity in bytes (can't be changed after construction). 50MB by default.
         */
        itemId: 'websql',
        capacity: 50 * 1024 * 1024,
        wellBoreCount: 0,
        wellTestCount: 0,
        refreshIncremental: false,
        isOffline: true
    },
    /**
     * @private
     * The websql database object.
     */
    storage: null,
    connected: false,
    constructor: function(config) {
        // this.callParent(config);
        this.storage = openDatabase('Dnb', '1.0', 'Offline resource storage', this.getCapacity());
        this.storage.transaction(function(tx) {
            // tx.executeSql('CREATE TABLE IF NOT EXISTS notices (id NUMERIC NOT NULL UNIQUE, flyer  , title  ,description  ,notice_type  ,venu_detail  ,time_from  ,time_to  ,hot_five  ,duration  ,start_date  , end_date  , extra , price , total_likes ,total_comments ,total_favorites ,isLike ,total_views ,categoryIds ,phone_number ,email ,city ,state ,zip ,slot_no ,latitude ,longitude ,comment )');
            tx.executeSql('CREATE TABLE IF NOT EXISTS notices (notice_id NUMERIC NOT NULL UNIQUE , jsoncollection)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS notice_detail (notice_id NUMERIC NOT NULL UNIQUE , jsoncollection)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS hot_five (notice_id NUMERIC NOT NULL UNIQUE , jsoncollection)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS my_zone (notice_type TEXT NOT NULL UNIQUE , jsoncollection)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS promotions (promotion_id NUMERIC NOT NULL UNIQUE , jsoncollection)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS notice_catgories   (type TEXT NOT NULL UNIQUE , jsoncollection)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS promotion_catgories  (type TEXT NOT NULL UNIQUE , jsoncollection)');
        }, function(error) {
            console.log('WebSQL: Connection Error is:' + error);
        }, function(tx) {
            console.log('WebSQL: Connected');
        });
    },
    
    // set all notices
    setNotices: function(record, callbacks) {
        this.storage.transaction(function(tx) {
            tx.executeSql("DELETE FROM notices WHERE notice_id=?", [record.notice_id]);
            tx.executeSql("INSERT INTO notices (notice_id, jsoncollection) VALUES (?, ?)", [record.notice_id, record.jsoncollection]);
            

            // tx.executeSql("DELETE FROM notices WHERE notice_id="+record.notice_id);
            // tx.executeSql("INSERT INTO notices (notice_id ,jsoncollection) VALUES ('" + record.notice_id + "','" + record.jsoncollection + "')");
        }, function(error) {
            console.log(error.message);
        }, function(success) {
            // Ext.getStore('NoticesStore').load();
            // console.log('success');
        });
    },
    // set all notices
    setNoticeDetails: function(record, callbacks) {
        this.storage.transaction(function(tx) {
            // tx.executeSql("DELETE FROM notice_detail WHERE notice_id="+record.notice_id);
            tx.executeSql("DELETE FROM notice_detail WHERE notice_id=?", [record.notice_id]);
            tx.executeSql("INSERT INTO notice_detail (notice_id, jsoncollection) VALUES (?, ?)", [record.notice_id, record.jsoncollection]);
            // tx.executeSql("INSERT INTO notice_detail (notice_id ,jsoncollection) VALUES ('" + record.notice_id + "','" + record.jsoncollection + "')");
        }, function(error) {
            console.log(error.message);
        }, function(success) {
            // Ext.getStore('NoticesStore').load();
            // console.log('success');
        });
    },
    // set hot five notices
    setHotFive: function(record, callbacks) {
        this.storage.transaction(function(tx) {
            tx.executeSql("INSERT INTO hot_five (notice_id, jsoncollection) VALUES (?, ?)", [record.notice_id, record.jsoncollection]);
            // tx.executeSql("INSERT INTO hot_five (notice_id ,jsoncollection) VALUES ('" + record.notice_id + "','" + record.jsoncollection + "')");
        }, function(error) {
            console.log(error.message);
        }, function(success) {
            // Ext.getStore('NoticesStore').load();
            // console.log('success');
        });
    },
    // set hot five notices
    setPromotion: function(record, callbacks) {
        this.storage.transaction(function(tx) {
            tx.executeSql("INSERT INTO promotions (promotion_id, jsoncollection) VALUES (?, ?)", [record.promotion_id, record.jsoncollection]);

            // tx.executeSql("INSERT INTO promotions (promotion_id ,jsoncollection) VALUES ('" + record.promotion_id + "','" + record.jsoncollection + "')");
        }, function(error) {
            console.log(error.message);
        }, function(success) {
            // Ext.getStore('NoticesStore').load();
            // console.log('success');
        });
    },
    // set hot five notices
    setNoticeCategory: function(record, callbacks) {
        this.storage.transaction(function(tx) {
            tx.executeSql("INSERT INTO notice_catgories (type, jsoncollection) VALUES (?, ?)", [record.type, record.jsoncollection]);

            // tx.executeSql("INSERT INTO notice_catgories (type ,jsoncollection) VALUES ('" + record.type + "','" + record.jsoncollection + "')");
        }, function(error) {
            console.log(error.message);
        }, function(success) {
            // Ext.getStore('NoticesStore').load();
            // console.log('success');
        });
    },
    // set my zone notices
    setMyZone: function(record, callbacks) {
        this.storage.transaction(function(tx) {
            tx.executeSql("DELETE FROM my_zone WHERE notice_type=?", [record.notice_type]);
            tx.executeSql("INSERT INTO my_zone (notice_type, jsoncollection) VALUES (?, ?)", [record.notice_type, record.jsoncollection]);
            

            // tx.executeSql("DELETE FROM my_zone WHERE notice_type='"+record.notice_type +"'");
            // tx.executeSql("INSERT INTO my_zone (notice_type ,jsoncollection) VALUES ('" + record.notice_type + "','" + record.jsoncollection + "')");
        }, function(error) {
            console.log(error.message);
        }, function(success) {
            // Ext.getStore('NoticesStore').load();
            // console.log('success');
        });
    },
    truncateTable: function(tableName, callbacks) {
        this.storage.transaction(function(tx) {
            tx.executeSql("DELETE FROM '" + tableName + "'");
        }, function(error) {
            console.log(error.message);
        }, function() {
            // console.log('success');
        });
    },

    truncateNoticesTable: function() {

        this.storage.transaction(function(tx) {
            tx.executeSql('DROP TABLE IF EXISTS notices ', [], function(tx, results) {}, null);
            tx.executeSql('CREATE TABLE IF NOT EXISTS notices (notice_id NUMERIC NOT NULL UNIQUE , jsoncollection)');
        }, function(error) {
            console.log(error.message);
        }, function() {
            // console.log('success');
            
        });

    },

    truncateHotFiveTable: function() {

        this.storage.transaction(function(tx) {
            tx.executeSql('DROP TABLE IF EXISTS hot_five ', [], function(tx, results) {}, null);
            tx.executeSql('CREATE TABLE IF NOT EXISTS hot_five (notice_id NUMERIC NOT NULL UNIQUE , jsoncollection)');
        }, function(error) {
            console.log(error.message);
        }, function() {
            // console.log('success');
            
        });

    },
    truncatePromotionTable: function() {

        this.storage.transaction(function(tx) {
            tx.executeSql('DROP TABLE IF EXISTS promotions ', [], function(tx, results) {}, null);
            tx.executeSql('CREATE TABLE IF NOT EXISTS promotions (promotion_id NUMERIC NOT NULL UNIQUE , jsoncollection)');
        }, function(error) {
            console.log(error.message);
        }, function() {
            // console.log('success');
            
        });

    },
     truncateNoticeCategoryTable: function() {

        this.storage.transaction(function(tx) {
            tx.executeSql('DROP TABLE IF EXISTS notice_catgories ', [], function(tx, results) {}, null);
            tx.executeSql('CREATE TABLE IF NOT EXISTS notice_catgories (type TEXT NOT NULL UNIQUE , jsoncollection)');
        }, function(error) {
            console.log(error.message);
        }, function() {
            // console.log('success');
            
        });

    },
    dropTableByName: function(tableName) {
        this.storage.transaction(function(tx) {
            tx.executeSql('DROP TABLE ' + tableName, [], function(tx, results) {}, null);
        }, function(error) {
            console.log(error.message);
        }, function() {
            // console.log('success');
        });
    },
    getTableRecords: function(tableName, callbacks) {
        var resultObj = null;
        var noticesArr = [];
        this.storage.transaction(function(tx) {
            tx.executeSql('SELECT * FROM ' + tableName, [], function(tx, results) {
                var len = results.rows.length;
                for (var i = 0; i < results.rows.length; i++) {
                    resultObj = results.rows.item(i);
                    noticesArr.push(
                        JSON.parse(Ext.Object.getValues(resultObj)[1])
                        // id: Ext.Object.getValues(resultObj)[0],
                        // notice: JSON.parse(Ext.Object.getValues(resultObj)[1])
                    );
                }
            }, null);
        }, function(error) {
            console.log(error.message);
        }, function(response) {
            // console.log('DB Data');
            // console.log(noticesArr)
            DNB.app.fireEvent(callbacks, noticesArr);

        });
    },
    getMyZoneRecords: function(type ,callbacks) {
        var resultObj = null;
        var noticesObj = null;
        this.storage.transaction(function(tx) {
            tx.executeSql('SELECT * FROM my_zone Where notice_type ="'+type+'"', [], function(tx, results) {
                var len = results.rows.length;
                    resultObj = results.rows.item(0);
                    noticesObj= JSON.parse(Ext.Object.getValues(resultObj)[1]);
                
            }, null);
        }, function(error) {
            console.log(error.message);
        }, function(response) {
            
            console.log(noticesObj)
            DNB.app.fireEvent(callbacks, noticesObj);

        });
    },
    getNoticeRecordById: function(id ,callbacks) {
        var resultObj = null;
        var noticesObj = null;
        this.storage.transaction(function(tx) {
            tx.executeSql('SELECT * FROM notice_detail Where notice_id ='+id, [], function(tx, results) {
                var len = results.rows.length;
                    resultObj = results.rows.item(0);
                    noticesObj= JSON.parse(Ext.Object.getValues(resultObj)[1]);
                
            }, null);
        }, function(error) {
            console.log(error.message);
        }, function(response) {
            
            console.log(noticesObj)
            DNB.app.fireEvent(callbacks, noticesObj);

        });
    },
    deleteRecordById: function(tableNameArg, id, callbacks) {
        this.storage.transaction(function(tx) {
            tx.executeSql('DELETE FROM ' + tableNameArg + ' WHERE id=' + id);
        }, function(error) {
            console.log(error.message);
        }, function() {
            // console.log('success');
        });
    },
   
    updateNoticeDetailTableById: function( id, value, callbacks) {
        this.storage.transaction(function(tx) {
            // tx.executeSql("DELETE FROM notice_detail WHERE notice_id="+id);
            // tx.executeSql("INSERT INTO notice_detail (notice_id ,jsoncollection) VALUES ('" + id + "','" + value + "')");
            
            tx.executeSql("DELETE FROM notice_detail WHERE notice_id=?", [id]);
            tx.executeSql("INSERT INTO notice_detail (notice_id, jsoncollection) VALUES (?, ?)", [id, value]);
            
        }, function(error) {
            console.log(error.message);
        }, function() {
            console.log('success');
            // DNB.app.fireEvent(callbacks, noticesObj);

        });
    },
    truncatemyZoneTable: function() {

        this.storage.transaction(function(tx) {
            tx.executeSql('DROP TABLE IF EXISTS my_zone ', [], function(tx, results) {}, null);
            tx.executeSql('CREATE TABLE IF NOT EXISTS my_zone (notice_type TEXT NOT NULL UNIQUE , jsoncollection)');
        }, function(error) {
            console.log(error.message);
        }, function() {
            // console.log('success');
            
        });

    }
});