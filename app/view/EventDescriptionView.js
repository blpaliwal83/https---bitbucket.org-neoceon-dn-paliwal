/*
 * File: app/view/EventDescriptionView.js
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

Ext.define('DNB.view.EventDescriptionView', {
    extend: 'Ext.Panel',
    alias: 'widget.eventdescriptionview',

    requires: [
        'Ext.Toolbar',
        'Ext.Label',
        'Ext.Button'
    ],

    config: {
        centered: true,
        // height: 10,
        id: 'EventDescriptionView',
        cls : 'event-description-wrapper-cls',
        // style: 'background-color:white;height:40%;width:80%;margin-top: -40%;',
        // width: 250,
        layout : {
            type : 'vbox'
        },
        hideOnMaskTap: true,
        modal: true,
        items: [
            {
                xtype : 'label',
                html : 'View Info',
                cls : 'popup-heading-label-cls'
            },
            {
                xtype: 'label',
                cls : 'popup-description-label-cls',
                id: 'EventDescriptionInfo'
            },
            {
                xtype: 'button',
                docked: 'bottom',
                itemId: 'close',
                cls : 'bottom-cross-btn-cls',
                ui: 'plain'
            }
        ],
        listeners: [
            {
                fn: 'onCloseTap',
                event: 'tap',
                delegate: '#close'
            }
        ]
    },

    onCloseTap: function(button, e, eOpts) {
        Ext.getCmp('EventDescriptionView').hide();
    }

});