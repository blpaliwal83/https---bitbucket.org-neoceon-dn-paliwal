/*
 * File: app/view/CategoryMultiSelect.js
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

Ext.define('DNB.view.CategoryMultiSelect', {
    extend: 'Ext.Container',
    alias: 'widget.categorymultiselect',

    requires: [
        'Ext.Toolbar',
        'Ext.Spacer',
        'Ext.Button',
        'Ext.Panel',
        'Ext.dataview.DataView',
        'Ext.XTemplate'
    ],

    config: {
        centered: true,
        height: 400,
        id: 'CategoryMultiSelect',
        width: '80%',
        hideOnMaskTap: true,
        layout: 'fit',
        modal: true,
        items: [
            {
                xtype: 'toolbar',
                docked: 'bottom',
                cls : 'category-bottom-toolbar',
                items: [
                    {
                        xtype: 'spacer',
                        flex: 1
                    },
                    {
                        xtype: 'button',
                        itemId: 'Done',
                        ui: 'plain',
                        text: 'Done'
                    },
                    {
                        xtype: 'spacer',
                        flex: 1
                    }
                ]
            },
            {
                xtype: 'panel',
                layout: 'fit',
                items: [
                    {
                        xtype: 'dataview',
                        itemId: 'CategoryList1',
                        cls : 'category-list-dataview',
                        style: 'background-color:white;color:#36AEE4;',
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
                        store: 'EventCategoryMultiSelectStore'
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
                delegate: '#CategoryList1'
            }
        ]
    },

    onDoneTap: function(button, e, eOpts) {

        //SelectCategoryButton

        var catIDs=[];
        var catTitles=[];
        totalCategoryAmount=0;
        //console.log(categoryDataToAdd);
        selectedCategoryIDsToAdd='';
        if(categoryDataToAdd.length>0){
            for(var i=0;i<categoryDataToAdd.length;i++){
                if(categoryDataToAdd[i].isSelected=='yes'){
                    catIDs.push(categoryDataToAdd[i].id);
                    catTitles.push(categoryDataToAdd[i].title);
                    //console.log(categoryDataToAdd[i].amount);
                    totalCategoryAmount += parseFloat(categoryDataToAdd[i].amount);
                }
            }

            if(catIDs.length>0){
                //var addImageIcon='<img width="32px" height="32px" src="resources/images/add.PNG">';
                //var catTitle='<span style="font-size:10px;">'+catTitles[0]+'</span>';
                if(Ext.getCmp('EventCategoryButton'))
                    Ext.getCmp('EventCategoryButton').setText(catTitles[0]+addImageIcon);

                if(Ext.getCmp('SelectCategoryButton'))
                    Ext.getCmp('SelectCategoryButton').setText(catTitles[0]+addImageIcon);
                selectedCategoryIDsToAdd=catIDs.join(',');
            }
            totalCategoryAmount=50.0;
        }
        //alert(totalCategoryAmount);
        if(categoryMultiSelectOpenFromPage=='Settings'){
            Ext.Viewport.setMasked({xtype:'loadmask',message:'Updating Notification Categories...'});
            var categoryIds=catIDs.join(',');
            Ext.Ajax.request({
                url:DNB.util.Common.api.notificationCategory,
                method:'POST',
                params :  {
                    category_id:categoryIds,user_id:localStorage.getItem('userid')
                },
                success:function(res,options){
                    //alert('success:'+res.responseText);
                    Ext.Viewport.setMasked(false);
                    var res=Ext.decode(res.responseText).response_data;
                    //alert(res.message);
                    if('',res.status){
                        alert('',res.message);
                    }
                },
                failure:function(res,options){
                    Ext.Viewport.setMasked(false);
                    alert('','failure'+res.responseText);
                }
            });
        }
        Ext.getCmp('CategoryMultiSelect').hide();
    },

    onCategoryListItemTap1: function(dataview, index, target, record, e, eOpts) {

        // console.log(categoryDataToAdd);
        // console.log(record);
        // debugger
         if(categoryDataToAdd.length>0){
                if(categoryMultiSelectOpenFromPage=='AddEvent'){
                    
                        for(var i=0;i<categoryDataToAdd.length;i++){
                            if(categoryDataToAdd[i].id==record.data.id){
                                console.log(categoryDataToAdd[i].isSelected);
                                if(categoryDataToAdd[i].isSelected=='yes')
                                    categoryDataToAdd[i].isSelected='no';
                                else
                                {
                                     selectedCategoryID = categoryDataToAdd[i].id;
                                     categoryDataToAdd[i].isSelected='yes';
                                }
                                    
                            }
                            else {
                                categoryDataToAdd[i].isSelected='no';
                            }
                        }
                       
                }else{

                        for(var i=0;i<categoryDataToAdd.length;i++){
                            if(categoryDataToAdd[i].id==record.data.id){
                                console.log(categoryDataToAdd[i].isSelected);
                                if(categoryDataToAdd[i].isSelected=='yes')
                                    categoryDataToAdd[i].isSelected='no';
                                else
                                    categoryDataToAdd[i].isSelected='yes';
                                break;
                            }
                        }
                        

                }
            Ext.getStore('EventCategoryMultiSelectStore').setData(categoryDataToAdd);
        }   

    }

});