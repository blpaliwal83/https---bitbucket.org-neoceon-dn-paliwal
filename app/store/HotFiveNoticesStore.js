/*
 * File: app/store/HotFiveNoticesStore.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.4.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.4.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('DNB.store.HotFiveNoticesStore', {
    extend: 'Ext.data.Store',

    requires: [
        'DNB.model.Notices',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    config: {
        model: 'DNB.model.Notices',
        storeId: 'HotFiveNoticesStore',
        proxy: {
            type: 'ajax',
            reader: {
                type: 'json'
            }
        }
    }
});