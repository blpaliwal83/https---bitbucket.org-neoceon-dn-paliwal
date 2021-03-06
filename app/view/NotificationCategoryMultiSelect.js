/*
 * File: app/view/NotificationCategoryMultiSelect.js
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

Ext.define('DNB.view.NotificationCategoryMultiSelect', {
    extend: 'Ext.Container',
    alias: 'widget.notificationcategorymultiselect',

    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Panel',
        'Ext.dataview.DataView',
        'Ext.XTemplate'
    ],

    config: {
        centered: true,
        height: 400,
        id: 'NotificationCategoryMultiSelect',
        width: '80%',
        hideOnMaskTap: true,
        layout: 'fit',
        modal: true,
        items: [
            {
                xtype: 'toolbar',
                docked: 'bottom',
                cls : 'bottomButtonToolbar',
                padding: 0,
                items: [
                    {
                        xtype: 'button',
                        height: 40,
                        itemId: 'Done',
                        style: 'background-color: rgb(54, 174, 228);margin:0 auto;',
                        ui: 'plain',
                        width: '96%',
                        text: 'Done'
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                hidden : true,
                style : 'border-radius: 10px 10px 0 0;',
                title: 'Notification Category'
            },
            {
                xtype: 'panel',
                layout: 'fit',
                items: [
                    {
                        xtype: 'dataview',
                        itemId: 'NotificationCategoryList',
                        cls : 'notification-panel-category-wrapper',
                        scrollable: 'vertical',
                        itemTpl: Ext.create('Ext.XTemplate', 
                            '<table width="100%" height="40px" ><tr>',
                            '    <td style="width:17%;padding-left:15px;padding-top:5px;">',
                            '        <tpl if="isSelected ==\'yes\'">',
                            '            <img width="20px" height="20px" src="resources/images/tick_mark.png" />',
                            '        </tpl>',
                            '    </td><td style="text-align:left;">',
                            '    {title}',
                            '    </td></tr></table>',
                            {
                                GetImage: function(isSelected) {
                                    //<img width="20px" height="20px" src="{[this.GetImage(values.isSelected)]}" />
                                    if(isSelected=='yes'){
                                        return 'resources/images/categoryselected.png';
                                    }
                                    else{
                                        return 'resources/images/categoryNotSelected.PNG';
                                    }
                                }
                            }
                        ),
                        store: 'NotificationCategoryMultiSelectStore'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onDoneTap',
                event: 'tap',
                delegate: '#Done'
            },
            {
                fn: 'onCategoryListItemTap1',
                event: 'itemtap',
                delegate: '#NotificationCategoryList'
            }
        ]
    },

    onDoneTap: function(button, e, eOpts) {

        var catIDs=[],catTitle='',tempC=[];
        if(NotificationCategory.length>0){
            for(var i=0;i<NotificationCategory.length;i++){
                if(NotificationCategory[i].isSelected=='yes'){
                    catIDs.push(NotificationCategory[i].id);
                    tempC.push({category_id:NotificationCategory[i].id});
                    if(catTitle=='')
                        catTitle=NotificationCategory[i].title;
                }
            }

            if(catIDs.length>0){
                var addImageIcon='<img width="32px" height="32px" src="resources/images/plus-icon.png">';
                catTitle='<span style="font-size:10px;">'+catTitle+'</span>';

                if(Ext.getCmp('NotificationCategoryButton'))
                    Ext.getCmp('NotificationCategoryButton').setText(catTitle+addImageIcon);
            }

            localStorage.setItem('notificationCategory',Ext.encode(tempC));

        }
            Ext.Viewport.setMasked({xtype:'loadmask',message:'Updating Notification Categories...'});
            //var categoryIds=catIDs.join(',');
            Ext.Ajax.request({
                url:DNB.util.Common.api.notificationCategory,
                method:'POST',
                params :  {
                    category_id:catIDs.join(','),user_id:localStorage.getItem('userid')
                },
                success:function(res,options){
                    //alert('success:'+res.responseText);
                    Ext.Viewport.setMasked(false);
                    var res=Ext.decode(res.responseText).response_data;
                    //alert(res.message);
                    if(res.status){
                        alert('',res.message);
                    }
                    Ext.getCmp('NotificationCategoryMultiSelect').hide();
                },
                failure:function(res,options){
                    Ext.Viewport.setMasked(false);
                    Ext.getCmp('NotificationCategoryMultiSelect').hide();
                    alert('','failure'+res.responseText);
                }
            });

    },

    onCategoryListItemTap1: function(dataview, index, target, record, e, eOpts) {
        if(NotificationCategory.length>0){
            for(var i=0;i<NotificationCategory.length;i++){
                if(NotificationCategory[i].id==record.data.id){
                    if(NotificationCategory[i].isSelected=='yes')
                        NotificationCategory[i].isSelected='no';
                    else
                        NotificationCategory[i].isSelected='yes';
                    break;
                }

            }
            Ext.getStore('NotificationCategoryMultiSelectStore').setData(NotificationCategory);
        }

        console.log('categoryListData3');
        console.log(categoryListData);
    }

});