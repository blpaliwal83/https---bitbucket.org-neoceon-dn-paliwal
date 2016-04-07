/*
 * File: app/controller/AddEvent.js
 */

Ext.define('DNB.controller.AddPromotion', {
    extend: 'Ext.app.Controller',
    alias: 'controller.addpromotion',

    config: {
        views: ['AddPromotion'],
        refs: {
            promotionImageAdd    : 'image[name=promotionImageAdd]',
            selectCategoryButton : 'button[name=selectCategoryButton]',
            uploadPromotionAudio : 'button[name=uploadPromotionAudio]',
            backPromotionPage    : 'button[name=backPromotionPage]',
            submitPromotion      : 'button[name=submitPromotion]'

        },
        control: {
            promotionImageAdd : {
                tap: 'onPromotionImageAddTap'
            },
           
            selectCategoryButton : {
                tap: 'onSelectCategoryTap'
            },
            uploadPromotionAudio : {
                tap : 'onUploadPromotionAudioTap'
            },
            backPromotionPage : {
                tap: 'onBackTap'
            },
            submitPromotion : {
                tap: 'onSubmitTap'
                // tap: 'paypaltest'
            }
            
        }
    },
    onPromotionImageAddTap: function(image, e, eOpts) {
        var imageURI=null;
        
        // window.imagePicker.getPictures(function success(results) {
        //     for (var i = 0; i < results.length; i++) {
        //         console.log('Image URI: ' + results[i]);
        //         imageURI = results[i];
        //     }
        //     // var fileSize=imageURI.split(',')[1];
        //     //     fileSize=fileSize/1024;
        //         //fileSize=fileSize/1024;
        //         imageURI=imageURI.split(',')[0];
        //         promotionImageFILEURI=imageURI;
        //         image.setSrc(imageURI);
        //         //promotionUploadSetting.image
        //         var fileName = promotionImageFILEURI.substr(promotionImageFILEURI.lastIndexOf('/') + 1);
        //         var fileExtension='.'+fileName.split('.')[1];
        //         //alert(fileExtension);
        //         if(promotionUploadSetting.image.formate.indexOf(':'+fileExtension+':')<0){
        //             promotionImageFILEURI='';
        //             image.setSrc('resources/images/addimage.PNG');
        //             Ext.Msg.alert('','Only .jpg & .png type files can be uploaded.');
        //             return;
        //         }
        //         // else 
        //         // if(promotionUploadSetting.image.size<fileSize)
        //         // {
        //         //     promotionImageFILEURI='';
        //         //     image.setSrc('resources/images/addimage.PNG');
        //         //     Ext.Msg.alert('','File size should not be greater than '+promotionUploadSetting.image.size+' kb');
        //         //     return;
        //         // }
        // }, function error(error) {
        //     console.log('Error: ' + error);
        // }, {
        //     maximumImagesCount: 1,
        //     width: 800,
        //     height: 400
        // });


         navigator.camera.getPicture(function success(results) {

            imageURI = results;
            // imageURI=imageURI.split(',')[0];
            promotionImageFILEURI=imageURI;
            image.setSrc(imageURI);
                // //promotionUploadSetting.image
                // var fileName = promotionImageFILEURI.substr(promotionImageFILEURI.lastIndexOf('/') + 1);
                // var fileExtension='.'+fileName.split('.')[1];
                // //alert(fileExtension);
                // if(promotionUploadSetting.image.formate.indexOf(':'+fileExtension+':')<0){
                //     promotionImageFILEURI='';
                //     image.setSrc('resources/images/addimage.PNG');
                //     Ext.Msg.alert('','Only .jpg & .png type files can be uploaded.');
                //     return;
                // }

        }, function error(error) {
            console.log('Error: ' + error);
        },
        {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            quality: 25
        });
        
    },
     onSelectCategoryTap: function(button, e, eOpts) {
        if(Ext.getCmp('CategoryMultiSelect'))
            Ext.getCmp('CategoryMultiSelect').show();
        Ext.getStore('EventCategoryMultiSelectStore').setData(categoryDataToAdd);

    },
     onUploadPromotionAudioTap: function(button, e, eOpts) {
        // window.plugins.iOSAudioPicker.getAudio(function(res){
        //  if(res.length>1){
        //      alert('','Only one audio file can be uploaded');
        //      return;
        //  }
        //         promotionAudioFILEURI=res[0].exportedurl;
        //         var fileName = promotionAudioFILEURI.substr(promotionAudioFILEURI.lastIndexOf('/') + 1);
        //         var fileExtension='.'+fileName.split('.')[1];
        //         alert(fileExtension);
        //         if(promotionUploadSetting.audio.formate.indexOf(':'+fileExtension+':')<0){
        //             promotionAudioFILEURI='';
        //             alert('','Only '+promotionUploadSetting.audio.formatemsg+' type file can be uploaded');
        //             return;
        //         }
        //         else{
        //             if(res.duration>parseInt(promotionUploadSetting.audio.duration)){
        //                 alert('','Only '+promotionUploadSetting.audio.duration+' seconds file can be uploaded');
        //                 return;
        //             }
        //             else{
        //                 alert('','Audio file selected successfully');
        //             }
        //         }
        // },
        //      function(){
        //          alert('','error to pick audio file.');
        //      },true,true);

    },
    onBackTap: function(button, e, eOpts) {

        Ext.getCmp('AddPromotion').hide();
        Ext.getCmp('DNBView').show();

    },
   

    onSubmitTap: function(button, e, eOpts) {
        // debugger
        var promotionTitle=Ext.getCmp('PromotionTitle').getValue();
        var promotionCategory=selectedCategoryIDsToAdd;//Ext.getCmp('PromotionCategory').getValue();
        var PromotionLocation=document.getElementById('plocationField').value;
        
        var PromotionLocationCity=Ext.getCmp('PromotionLocationCity').getValue();
        var PromotionLocationState=Ext.getCmp('PromotionLocationState').getValue();
        var PromotionLocationZip=Ext.getCmp('PromotionLocationZip').getValue();
        var PromotionLocationCountry=Ext.getCmp('PromotionLocationCountry').getValue();
        if(isEditPromotion==false && promotionImageFILEURI==''){
            Ext.Msg.alert('','Promotion banner is mandatory!');
            return;
        }
        else if(promotionTitle==''){

            Ext.Msg.alert('','Promotion Name is mandatory!');
            return;
        }
        else if(PromotionLocation==''){
            Ext.Msg.alert('','Promotion Location is mandatory!');
            return;
        }
        else if(PromotionLocationCity==''){
            Ext.Msg.alert('','Promotion City is mandatory!');
            return;
        }
        else if(PromotionLocationState==''){
            Ext.Msg.alert('','Promotion State is mandatory!');
            return;
        }
        /*else if(PromotionLocationCountry==''){
            Ext.Msg.alert('','Promotion Country is mandatory!');
            return;
        }*/
        else if(PromotionLocationZip==''){
            Ext.Msg.alert('','Promotion Zip is mandatory!');
            return;
        }

        var promotionFromDate=Ext.getCmp('PromotionFromDate').getValue();
        if(promotionFromDate=='' || promotionFromDate==null){

            Ext.Msg.alert('','Promotion "From" Date is mandatory!');
            return;
        }
        else if(promotionFromDate.toString().indexOf('1901')>=0){

            Ext.Msg.alert('','Promotion "From" Date is mandatory!');
            return;
        }
        var promotionEndDate=Ext.getCmp('PromotionToDate').getValue();
        if(promotionEndDate=='' || promotionEndDate==null){

            Ext.Msg.alert('','Promotion "To" Date is mandatory!');
            return;
        }
        else if(promotionEndDate.toString().indexOf('1901')>=0){

            Ext.Msg.alert('','Promotion "To" Date is mandatory!');
            return;
        }
        promotionFromDate=(new Date(promotionFromDate.getFullYear(),
                                    promotionFromDate.getMonth(),
                                    promotionFromDate.getDate()));

        promotionEndDate=new Date(promotionEndDate.getFullYear(),
                                  promotionEndDate.getMonth(),
                                  promotionEndDate.getDate());

        if(new Date(promotionFromDate)> new Date(promotionEndDate)){
            Ext.Msg.alert('','Promotion "Start" date should not be greater than "End" date.');
            return;
        }
        else if(selectedCategoryIDsToAdd==''){
            Ext.Msg.alert('','Promotion Category is mandatory');
            return;
        }
        var promotionHotFive=Ext.getCmp('PromotionHotFive').getValue();
        var promotionWebsite=Ext.getCmp('PromotionWebsite').getValue();
        var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        if(promotionWebsite!=''){
            if(!regexp.test(promotionWebsite)){
                Ext.Msg.alert('','Promotion Website url is invalid');
                return;
            }
        }
        var totalPrice=0;
        var timeDiff = Math.abs(promotionEndDate.getTime() - promotionFromDate.getTime());
        var duration = Math.ceil(timeDiff / (1000 * 3600 * 24));
        var week=duration/7;
        if(duration>7){
            week=duration/7;
            totalPrice +=(perWeekPrice*week);
        }else{
            totalPrice +=(perWeekPrice);
        }
        if(totalPrice==0){
            totalPrice=1;
        }
        totalPrice=totalPrice.toFixed(2);
        var ft = new FileTransfer();
        var uploadFileUrls = promotionImageFILEURI;
        var    name ='';//fileURL.substr(fileURL.lastIndexOf('/') + 1);// mediaFile.name;//mediaFile.fullPath
        var options = new FileUploadOptions();
        options.fileKey = "image";
        options.fileName=uploadFileUrls.substr(uploadFileUrls.lastIndexOf('/') + 1);
        options.mimeType =  "image/jpeg";
        var params = {};
        params.method ="promotion";
        if(isEditPromotion){
            params.method ="update_promotion";
            params.id=editPromotionId;
        }
        params.img = name;
        params.promotion_title=promotionTitle;//'promotion 21 may';

        params.additional_info=  'notice description';
        params.promotion_from =promotionFromDate;
        params.promotion_to=promotionEndDate;
        params.hot_five =promotionHotFive;
        params.price =totalPrice;
        params.venu_detail =PromotionLocation;
        params.city =PromotionLocationCity;
        params.state =PromotionLocationState;
        params.zip =PromotionLocationZip;
        params.country='';//PromotionLocationCountry;
        params.status= 'active';
        params.payment_status= '1';
        params.user_id=localStorage.getItem('userid');
        params.audio_url='file.mp3';
        params.promotion_website=promotionWebsite;
        params.promotion_categorys =promotionCategory;

        options.params = params;


        var clientIDs = {
             "PayPalEnvironmentProduction": "YOUR_PRODUCTION_CLIENT_ID",
             "PayPalEnvironmentSandbox": "YOUR_SANDBOX_CLIENT_ID"
            };
        if(isEditPromotion){

            var oldEndDate = new Date(selectedEditPromotion.Promotion.to);

            if(promotionEndDate > oldEndDate){
                console.log('if workes for Edit Promotion');
                // return;

                PayPalMobile.init(clientIDs, function() {
                    var config = new PayPalConfiguration({
                        merchantName: "My test shop",
                        merchantPrivacyPolicyURL: "https://mytestshop.com/policy",
                        merchantUserAgreementURL: "https://mytestshop.com/agreement"
                    });
                    PayPalMobile.prepareToRender("PayPalEnvironmentNoNetwork",config,
                    function() {
                        //totalCategoryAmount=50.0;
                       var paymentDetails = new PayPalPaymentDetails("50.00", "0.00", "0.00");
                       var payment = new PayPalPayment("50.00", "USD", "Awesome Sauce", "Sale",paymentDetails);
                       PayPalMobile.renderSinglePaymentUI(payment, function(payment) {

                        console.log(payment);
                         Ext.Viewport.setMasked({
                                xtype: 'loadmask',
                                message: 'Saving Promotion'
                            });
                         if(promotionImageFILEURI==null || promotionImageFILEURI==''){
                             Ext.Ajax.request({
                                    url: webserviceURL+"promotions/update_promotion.json",
                                    method: 'POST',
                                    params: {
                                        id: editPromotionId,
                                        promotion_title: promotionTitle,//'promotion 21 may';
                                        additional_info:  'notice description',
                                        promotion_from: promotionFromDate,
                                        promotion_to: promotionEndDate,
                                        hot_five: promotionHotFive,
                                        price : totalPrice,
                                        venu_detail : PromotionLocation,
                                        city :PromotionLocationCity,
                                        state :PromotionLocationState,
                                        zip :PromotionLocationZip,
                                        country:'',//PromotionLocationCountry;
                                        status:'active',
                                        payment_status:'1',
                                        user_id:localStorage.getItem('userid'),
                                        audio_url:'file.mp3',
                                        promotion_website:promotionWebsite,
                                        promotion_categorys :promotionCategory
                                    },
                                    success: function(res) {
                                        Ext.Viewport.setMasked(false);
                                        editPromotionId='';
                                        isEditPromotion=false;
                                        Ext.Msg.alert('','Promotion updated successfully.');
                                        DNB.app.getController('Events').ResetPromotionForm();
                                        DNB.app.getController('Events').GetPromotionsByUser();
                                        Ext.getCmp('DNBView').show();
                                        Ext.getCmp('AddPromotion').hide();
                                       
                                    },
                                    failure: function(res) {
                                        Ext.Viewport.setMasked(false);
                                        Ext.Msg.alert('', 'Internet is not available.');
                                    }
                                });
                        }else{
                            ft.upload(uploadFileUrls,
                                  webserviceURL+"promotions/update_promotion.json",
                                  function(result) {
                                      Ext.Viewport.setMasked(false);
                                      editPromotionId='';
                                      isEditPromotion=false;
                                      Ext.Msg.alert('','Promotion updated successfully');
                                      DNB.app.getController('Events').ResetPromotionForm();
                                      DNB.app.getController('Events').GetPromotionsByUser();
                                      Ext.getCmp('DNBView').show();
                                      Ext.getCmp('AddPromotion').hide();

                                  },
                                  function(error) {
                                      Ext.Viewport.setMasked(false);
                                      console.log(error);
                                      Ext.Msg.alert('error');

                                  },
                                  options);
                            }
                        
                        }, function(result) {
                            console.log(result);
                        });
                    });
            });

            }else{
                console.log('Else workes for Edit Promotion');
                // return;
                 if(promotionImageFILEURI==null || promotionImageFILEURI==''){
                             Ext.Ajax.request({
                                    url: webserviceURL+"promotions/update_promotion.json",
                                    method: 'POST',
                                    params: {
                                        id: editPromotionId,
                                        promotion_title: promotionTitle,//'promotion 21 may';
                                        additional_info:  'notice description',
                                        promotion_from: promotionFromDate,
                                        promotion_to: promotionEndDate,
                                        hot_five: promotionHotFive,
                                        price : totalPrice,
                                        venu_detail : PromotionLocation,
                                        city :PromotionLocationCity,
                                        state :PromotionLocationState,
                                        zip :PromotionLocationZip,
                                        country:'',//PromotionLocationCountry;
                                        status:'active',
                                        payment_status:'1',
                                        user_id:localStorage.getItem('userid'),
                                        audio_url:'file.mp3',
                                        promotion_website:promotionWebsite,
                                        promotion_categorys :promotionCategory
                                    },
                                    success: function(res) {
                                        Ext.Viewport.setMasked(false);
                                        editPromotionId='';
                                        isEditPromotion=false;
                                        Ext.Msg.alert('','Promotion updated successfully.');
                                        DNB.app.getController('Events').ResetPromotionForm();
                                        DNB.app.getController('Events').GetPromotionsByUser();
                                        Ext.getCmp('DNBView').show();
                                        Ext.getCmp('AddPromotion').hide();
                                       
                                    },
                                    failure: function(res) {
                                        Ext.Viewport.setMasked(false);
                                        Ext.Msg.alert('', 'Internet is not available.');
                                    }
                                });
                        }else{
                            ft.upload(uploadFileUrls,
                                  webserviceURL+"promotions/update_promotion.json",
                                  function(result) {
                                      Ext.Viewport.setMasked(false);
                                      editPromotionId='';
                                      isEditPromotion=false;
                                      Ext.Msg.alert('','Promotion updated successfully');
                                      DNB.app.getController('Events').ResetPromotionForm();
                                      DNB.app.getController('Events').GetPromotionsByUser();
                                      Ext.getCmp('DNBView').show();
                                      Ext.getCmp('AddPromotion').hide();

                                  },
                                  function(error) {
                                      Ext.Viewport.setMasked(false);
                                      console.log(error);
                                      Ext.Msg.alert('error');

                                  },
                                  options);
                            }

            }
                    
        }else{

            PayPalMobile.init(clientIDs, function() {
                var config = new PayPalConfiguration({
                    merchantName: "My test shop",
                    merchantPrivacyPolicyURL: "https://mytestshop.com/policy",
                    merchantUserAgreementURL: "https://mytestshop.com/agreement"
                });
                // must be called
                // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
               PayPalMobile.prepareToRender("PayPalEnvironmentNoNetwork",config,
                    function() {
                        //totalCategoryAmount=50.0;
                       var paymentDetails = new PayPalPaymentDetails("50.00", "0.00", "0.00");
                       var payment = new PayPalPayment("50.00", "USD", "Awesome Sauce", "Sale",paymentDetails);
                       PayPalMobile.renderSinglePaymentUI(payment, function(payment) {

                        console.log(payment);
                         Ext.Viewport.setMasked({
                                xtype: 'loadmask',
                                message: 'Saving Promotion'
                            });
                            console.log(options);
                             ft.upload(uploadFileUrls,
                                  webserviceURL+"promotions/add_promotion.json",
                                  function(result) {
                                    console.log(result);
                                      Ext.Viewport.setMasked(false);
                                      Ext.Msg.alert('','Promotion added successfully.');
                                      DNB.app.getController('Events').ResetPromotionForm();
                                      console.log('Upload success: ' + result);
                                      DNB.app.getController('Events').GetPromotionsByUser();
                                      DNB.app.getController('Events').GetPromotions();
                                      Ext.getCmp('DNBView').show();
                                      Ext.getCmp('AddPromotion').hide();
                                  },
                                  function(error) {
                                      Ext.Viewport.setMasked(false);
                                      Ext.Msg.alert('','error');
                                  },
                                   options);
                           

                            
                        }, function(result) {
                            console.log(result);
                        });
                    });
            });

        }


    }


});