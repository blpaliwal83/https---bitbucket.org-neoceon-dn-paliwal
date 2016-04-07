/*
 * File: app/view/ContactInfo.js
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

Ext.define('DNB.view.ContactInfo', {
    extend: 'Ext.Panel',
    alias: 'widget.contactinfo',

    requires: [
        'Ext.Toolbar',
        'Ext.Panel',
        'Ext.XTemplate',
        'Ext.Label',
        'Ext.Button'
    ],

    config: {
        centered: true,
        id: 'ContactInfo',
        height : '40%',
        cls : 'event-description-wrapper-cls',
        // style: 'background-color:white;text-align:center;',
        // width: 250,
        hideOnMaskTap: false,
        modal: true,
        items: [
            // {
            //     xtype: 'toolbar',
            //     docked: 'top',
            //     ui: 'light',
            //     title: 'Contact Info'
            // },
            {
                xtype : 'label',
                html : 'Contact Info',
                cls : 'popup-heading-label-cls'
            },
            {
                xtype: 'panel',
                id: 'contactinfoparel',
                tpl: [
                    '<div >',
                        '<div class="wrapper-contact-info-items-cls">',
                            '<div class="wrapper-contact-info-cell-cls">',
                                '<div class="contactinfo-icon-cls">',
                                    '<div class="info-transparent-phone">',
                                    '</div>',
                                    // '<img  src="resources/images/transparentphone.png">',
                                '</div>',    
                                '<span class="contactInfo"><a href="tel:{phone}">{phone}</a></span>',
                                '<div style="clear:both;"></div>',
                            '</div>',
                            '<div class="wrapper-contact-info-cell-cls">',
                                '<div class="contactinfo-icon-cls">',
                                    '<div class="info-transparent-web">',
                                    '</div>',
                                    // '<img src="resources/images/transparentwebsite.png">',
                                '</div>',    
                                '<span class="contactInfo"><a href="#" onclick="fnShowNoticeWebsite();">{website}</a></span>',
                                '<div style="clear:both;"></div>',
                            '</div>',
                            '<div class="wrapper-contact-info-cell-cls">',
                                '<div class="contactinfo-icon-cls">',
                                    '<div class="info-transparent-message">',
                                    '</div>',
                                    // '<img  src="resources/images/message.png">',
                                 '</div>',   
                                '<span class="contactInfo"><a href="mailto:{email}">{email}</a></span>',
                                '<div style="clear:both;"></div>',
                            '</div>',
                        '</div>',
                    '</div>'

                    // '<table class="contact-info-table-cls" cellpadding="10" cellspacing="20">',
                    // '    <tr><td><img width="32px" src="resources/images/phone.png"/></td>',
                    // '        <td class="contactInfo"><a href="tel:{phone}">{phone}</a></td>',
                    // '    </tr>',
                    // '    <tr><td><img width="32px" src="resources/images/website.png"/></td>',
                    // '        <td class="contactInfo"><a href="#" onclick="fnShowNoticeWebsite();">{website}</a></td></tr>',
                    // '    <tr><td><img width="32px" src="resources/images/email.png"/></td>',
                    // '        <td class="contactInfo"><a href="mailto:{email}">{email}</a></td>',
                    // '    </tr>',
                    // '</table>'
                ]
            },
            {
                xtype: 'label',
                hidden: true,
                html: '<img width="32px" src="resources/images/phone.png"/> 111-1111-1111',
                id: 'EventManagerContactNo'
            },
            {
                xtype: 'label',
                hidden: true,
                html: '<img src="resources/images/website.png"/> 111-1111-1111',
                id: 'EventManagerWebsite'
            },
            {
                xtype: 'label',
                hidden: true,
                html: '<img width="32px" src="resources/images/email.png"/> 111-1111-1111',
                id: 'EventManagerEmail'
            },
            {
                xtype: 'button',
                docked: 'bottom',
                // height: 50,
                // html: 'Close',
                itemId: 'close',
                cls : 'bottom-cross-yellow-btn-cls',
                // style: 'background-color:#DCB209;',
                ui: 'plain'
                // width: '100%',
                // text: 'Close'
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
        Ext.getCmp('ContactInfo').hide();
    }

});