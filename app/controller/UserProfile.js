/*
 * File: app/controller/Account.js
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

Ext.define('DNB.controller.UserProfile', {
    extend: 'Ext.app.Controller',
    alias: 'controller.userprofile',

    config: {
        views: [
            'UserProfile'
        ],
        control: {
           
        }
    },

    
    setData: function(data) {
        console.log(data);
        var imageAdresss;
        if(data.user_img== '' || data.user_img==null){
           imageAdresss= 'resources/images/default-user.png';
        }else{
            imageAdresss= imageBaseUrl+data.user_img;
        }
        var me = this;
        Ext.getCmp('userNameLabel').setHtml(data.user_name);
        Ext.getCmp('totalCommentsLabel').setHtml(data.totalComment);
        Ext.getCmp('userImage').setSrc(imageAdresss);
        Ext.getCmp('userImage').setSrc(imageAdresss);
        Ext.getCmp('statusLabel').setHtml(data.user_status);
        
        
    }

});