/*
 * File: app/view/Feedback.js
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
Ext.define('DNB.view.Feedback', {
    extend: 'Ext.Container',
    alias: 'widget.feedback',
    requires: ['Ext.Panel', 'Ext.field.Email', 'Ext.field.TextArea', 'Ext.Button', 'Ext.Toolbar', 'Ext.Spacer'],
    config: {
        centered: true,
        id: 'Feedback',
        hideOnMaskTap: true,
        modal: true,
        items: [{
            xtype: 'panel',
            padding: 20,
            style: 'background-color:#32AFE7;',
            items: [{
                xtype: 'panel',
                height: 40,
                html: '<div class="feedheading"> Feedback </div>'
            }, {
                xtype: 'textfield',
                cls: 'roundfeedfiled',
                id: 'NameInFeedBack',
                style: 'border-radius:10px;',
                clearIcon: false,
                placeHolder: 'Name'
            }, {
                xtype: 'emailfield',
                cls: 'roundfeedfiled',
                id: 'EmailInFeedBack',
                margin: '10 0 0 0',
                style: 'border-radius:10px;',
                clearIcon: false,
                placeHolder: 'Email'
            }, {
                xtype: 'textareafield',
                cls: 'roundfeedfiled',
                id: 'DescriptionInFeedBack',
                margin: '10 0 0 0',
                style: 'border-radius:10px;',
                clearIcon: false,
                placeHolder: 'Description'
            }, {
                xtype: 'button',
                height: 40,
                id: 'SubmitFeedBack',
                itemId: 'SubmitFeedBack',
                margin: '10 auto',
                style: 'background-color:white;color:#32AFE7;',
                ui: 'plain',
                width: 120,
                text: 'Submit'
            }]
        }, {
            xtype: 'toolbar',
            cls: 'transparentBG',
            docked: 'top',
            items: [{
                xtype: 'spacer'
            }, {
                xtype: 'button',
                html: '<div><img width="32" src="resources/images/feedbackclose.png"></div>',
                itemId: 'CloseFeedback',
                margin: '0 -5 0 0',
                ui: 'plain',
                iconAlign: 'right'
            }]
        }],
        listeners: [{
            fn: 'onSubmitFeedBackTap',
            event: 'tap',
            delegate: '#SubmitFeedBack'
        }, {
            fn: 'onCloseFeedbackTap',
            event: 'tap',
            delegate: '#CloseFeedback'
        }]
    },
    onSubmitFeedBackTap: function(button, e, eOpts) {
        var name = Ext.getCmp('NameInFeedBack').getValue();
        var email = Ext.getCmp('EmailInFeedBack').getValue();
        var description = Ext.getCmp('DescriptionInFeedBack').getValue();
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var checkemail = filter.test(email);
        if (name == '') {
            Ext.Msg.alert('', 'Name is mandatory!');
        } else if (email == '') {
            Ext.Msg.alert('', 'Email is mandatory!');
        } else if (!checkemail) {
            Ext.Msg.alert('', 'Invalid Email!');
        } else if (description == '') {
            Ext.Msg.alert('', 'Description is mandatory!');
        } else {
            Ext.Ajax.request({
                //url:webserviceURL+'Users/feedback.json',
                url: DNB.util.Common.api.feedback,
                method: 'POST',
                params: {
                    email: email,
                    message: description,
                    name: name,
                    appversion: '',
                    deviceType: deviceName,
                    OS: ''
                },
                success: function(res) {
                    var res = Ext.decode(res.responseText).response_data;
                    if (res.status) {
                        Ext.Msg.alert(res.message);
                    }
                    Ext.getCmp('Feedback').hide();
                },
                failure: function(res) {
                    Ext.Msg.alert('', 'Internet is not available.');
                }
            });
        }
    },
    onCloseFeedbackTap: function(button, e, eOpts) {
        Ext.getCmp('NameInFeedBack').setValue('');
        Ext.getCmp('EmailInFeedBack').setValue('');
        Ext.getCmp('DescriptionInFeedBack').setValue('');
        Ext.getCmp('Feedback').hide();
    }
});