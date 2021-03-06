/*
 * File: app/view/EventAudios.js
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

Ext.define('DNB.view.EventAudios', {
    extend: 'Ext.Container',
    alias: 'widget.eventaudios',

    requires: [
        'Ext.Panel',
        'Ext.dataview.DataView',
        'Ext.XTemplate',
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'DNB.view.EventAudioPlayer'
    ],

    config: {
        id: 'EventAudios',
        items: [
            {
                xtype: 'panel',
                items: [
                    {
                        xtype: 'dataview',
                        height: 200,
                        itemId: 'EventAudiosList',
                        itemTpl: [
                            '<div style="margin:5px"><img width="32px" height="32px" src="resources/images/audio1.png" />{title}</div>'
                        ],
                        store: 'EventAudiosStore'
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                title: 'Notice Audios',
                items: [
                    {
                        xtype: 'button',
                        html: 'Back',
                        itemId: 'Back',
                        ui: 'plain',
                        iconCls: 'previousArrowIcon'
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onEventAudiosListItemTap',
                event: 'itemtap',
                delegate: '#EventAudiosList'
            },
            {
                fn: 'onBackTap',
                event: 'tap',
                delegate: '#Back'
            }
        ]
    },

    onEventAudiosListItemTap: function(dataview, index, target, record, e, eOpts) {
        //open audio
        //console.log(record.data);
        audioPlayerOpenFrom='Notice';
        DNB.app.getController('Events').ShowAudioPlayer(record.data.url,selectedEventDetail.Notice.flyer);

    },

    onBackTap: function(button, e, eOpts) {
        ShowHideHomePages('EventDetailContainer');
    }

});