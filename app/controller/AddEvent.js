
/*
 * File: app/controller/AddEvent.js
 */
Ext.define('DNB.controller.AddEvent', {
    extend: 'Ext.app.Controller',
    alias: 'controller.addevent',
    config: {
        views: ['AddEvent'],
        refs: {
            eventImageOnEventPage: 'image[name=eventImageOnEventPage]',
            freeLocationsList: 'dataview[name=freeLocationsList]',
            uploadNoticeVideo: 'button[name=uploadNoticeVideo]',
            uploadNoticeAudio: 'button[name=uploadNoticeAudio]',
            uploadNoticeImage: 'button[name=uploadNoticeImage]',
            myNoticeMediaDataView: 'dataview[name=myNoticeMediaDataView]',
            eventCategoryButton: 'button[name=eventCategoryButton]',
            eventHotFiveToggle: 'togglefield[name=eventHotFiveToggle]',
            back: 'button[name=back]'
        },
        control: {
            eventImageOnEventPage: {
                tap: 'onEventImageOnEventPageTap'
            },
            freeLocationsList: {
                itemtap: 'onFreeLocationsListItemTap'
            },
            uploadNoticeVideo: {
                tap: 'onUploadNoticeVideoTap'
            },
            uploadNoticeAudio: {
                tap: 'onUploadNoticeAudioTap'
            },
            uploadNoticeImage: {
                // tap: 'onUploadNoticePickTap'
                tap: 'onUploadNoticeImageTap'
            },
            myNoticeMediaDataView: {
                itemtap: 'onMydataview8ItemTap31'
            },
            eventCategoryButton: {
                tap: 'onSelectCategoryTap1'
            },
            eventHotFiveToggle: {
                change: 'checkHotFiveSlot'
            },
            back: {
                tap: 'onBackTap'
            },
            "button[itemId=EventSubmit]": {
                tap: 'onEventSubmitButtonTap'
            }
        }
    },
    init: function(application) {
        application.on([{
            event: 'checkHotFiveSlotSuccess',
            fn: this.onCheckHotFiveSlotSuccess,
            scope: this
        }, {
            event: 'checkHotFiveSlotFailed',
            fn: this.onCheckHotFiveSlotFailed,
            scope: this
        }]);
    },
    onCheckHotFiveSlotSuccess: function(response) {
        Ext.Viewport.setMasked(false);
        var field = Ext.getCmp('EventHotFive');
        var res = JSON.parse(response.responseText);
        var check = res.status;
        if (check == true || check == 'true') {
            field.setValue(1);
        } else {
            field.setValue(0);
        }
        Ext.Msg.alert('', res.msg);
    },
    onCheckHotFiveSlotFailed: function(response) {
        var field = Ext.getCmp('EventHotFive');
        Ext.Viewport.setMasked(false);
        Ext.Msg.alert('', 'TryAgain');
        field.setValue(0);
    },
    onEventImageOnEventPageTap: function(image, e, eOpts) {
        var imageURI=null;
        
        // window.imagePicker.getPictures(function success(results) {
        //     for (var i = 0; i < results.length; i++) {
        //         console.log('Image URI: ' + results[i]);
        //         imageURI = results[i];
        //     }
        //     var fileSize = imageURI.split(',')[1];
        //     fileSize = fileSize / 1024;
        //     imageURI = imageURI.split(',')[0];
        //     noticeImageBannerFILEURI = imageURI;
        //     console.log(noticeImageBannerFILEURI);
        //     image.setSrc(imageURI);
        //     var fileName = noticeImageBannerFILEURI.substr(noticeImageBannerFILEURI.lastIndexOf('/') + 1);
        //     var fileExtension = '.' + fileName.split('.')[1];
        //     console.log('Type:' + fileExtension);
        //     // alert(fileExtension);
        //     if (promotionUploadSetting.image.formate.indexOf(':' + fileExtension + ':') < 0) {
        //         noticeImageBannerFILEURI = '';
        //         image.setSrc('resources/images/addimage.PNG');
        //         Ext.Msg.alert('', 'Only .jpg & .png type files can be uploaded.');
        //         return;
        //     } else
        //     if (promotionUploadSetting.image.size < fileSize) {
        //         noticeImageBannerFILEURI = '';
        //         image.setSrc('resources/images/addimage.PNG');
        //         Ext.Msg.alert('', 'File size should not be greater than ' + promotionUploadSetting.image.size + ' kb');
        //         return;
        //     }
        //     if (isEditNotice) {
        //         var ft = new FileTransfer();
        //         var path = imageURI;
        //         var name = imageURI.substr(imageURI.lastIndexOf('/') + 1); // mediaFile.name;//mediaFile.fullPath
        //         var options = new FileUploadOptions();
        //         options.fileKey = "img";
        //         options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        //         options.mimeType = "image/jpeg";
        //         var params = {};
        //         params.method = 'update_notice_img';
        //         params.img = name;
        //         params.notice_id = editNoticeId;
        //         options.params = params;
        //         Ext.Viewport.setMasked({
        //             xtype: 'loadmask',
        //             message: 'Uploading notice image'
        //         });
        //         ft.upload(path, webserviceURL + "notices/update_notice_img.json", function(result) {
        //             Ext.Viewport.setMasked(false);
        //             DNB.app.getController('Events').GetMyNotices('users/get_my_notice/', 'MyNoticesPanel');
        //         }, function(error) {
        //             Ext.Viewport.setMasked(false);
        //             Ext.Msg.alert('', 'error');
        //             console.log('Error uploading file ' + path + ': ' + error.code);
        //         }, options);
        //     }
        // }, function error(error) {
        //     console.log('Error: ' + error);
        // }, {
        //     maximumImagesCount: 1,
        //     width: 800,
        //     height: 400
        // });

        navigator.camera.getPicture(function success(results) {

            imageURI = results;
            // var fileSize = imageURI.split(',')[1];
            // fileSize = fileSize / 1024;
            // imageURI = imageURI.split(',')[0];
            noticeImageBannerFILEURI = imageURI;
            console.log(noticeImageBannerFILEURI);
            image.setSrc(imageURI);
            var fileName = noticeImageBannerFILEURI.substr(noticeImageBannerFILEURI.lastIndexOf('/') + 1);
            // var fileExtension = '.' + fileName.split('.')[1];
            // console.log('Type:' + fileExtension);
            // alert(fileExtension);
            // if (promotionUploadSetting.image.formate.indexOf(':' + fileExtension + ':') < 0) {
            //     noticeImageBannerFILEURI = '';
            //     image.setSrc('resources/images/addimage.PNG');
            //     Ext.Msg.alert('', 'Only .jpg & .png type files can be uploaded.');
            //     return;
            // } else
            // if (promotionUploadSetting.image.size < fileSize) {
            //     noticeImageBannerFILEURI = '';
            //     image.setSrc('resources/images/addimage.PNG');
            //     Ext.Msg.alert('', 'File size should not be greater than ' + promotionUploadSetting.image.size + ' kb');
            //     return;
            // }
            if (isEditNotice) {
                var ft = new FileTransfer();
                var path = imageURI;
                var name = imageURI.substr(imageURI.lastIndexOf('/') + 1); // mediaFile.name;//mediaFile.fullPath
                var options = new FileUploadOptions();
                options.fileKey = "img";
                options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
                options.mimeType = "image/jpeg";
                var params = {};
                params.method = 'update_notice_img';
                params.img = name;
                params.notice_id = editNoticeId;
                options.params = params;
                Ext.Viewport.setMasked({
                    xtype: 'loadmask',
                    message: 'Uploading notice image'
                });
                ft.upload(path, webserviceURL + "notices/update_notice_img.json", function(result) {
                    Ext.Viewport.setMasked(false);
                    DNB.app.getController('Events').GetMyNotices('users/get_my_notice/', 'MyNoticesPanel');
                }, function(error) {
                    Ext.Viewport.setMasked(false);
                    Ext.Msg.alert('', 'error');
                    console.log('Error uploading file ' + path + ': ' + error.code);
                }, options);
            }



        }, function error(error) {
            console.log('Error: ' + error);
        },
        {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            quality: 25
        });

        
    },
    onFreeLocationsListItemTap: function(dataview, index, target, record, e, eOpts) {
        Ext.getCmp('EventLocationOnEventPage').setValue(record.data.address2);
    },
    onUploadNoticeVideoTap: function(button, e, eOpts) {},
    onUploadNoticeAudioTap: function(button, e, eOpts) {
        // window.plugins.iOSAudioPicker.getAudio(function(res) {
        //     if (res.length > 0) {
        //         if (promotionUploadSetting.audio.max_upload_limit < res.length) {
        //             Ext.Msg.alert('', 'Only ' + promotionUploadSetting.audio.max_upload_limit + ' files can be uploaded');
        //             return;
        //         }
        //         var tempAudio = [];
        //         for (var i = 0; i < res.length; i++) {
        //             var fileName = res[i].exportedurl.substr(res[i].exportedurl.lastIndexOf('/') + 1);
        //             var fileExtension = '.' + fileName.split('.')[1];
        //             //alert(fileExtension);
        //             if (promotionUploadSetting.audio.formate.indexOf(':' + fileExtension + ':') < 0) {
        //                 Ext.Msg.alert('', 'Only ' + promotionUploadSetting.audio.formatemsg + ' type file can be uploaded');
        //                 return;
        //             } else {
        //                 if (res[i].duration > parseInt(promotionUploadSetting.audio.duration)) {
        //                     Ext.Msg.alert('', 'Only ' + promotionUploadSetting.audio.duration + ' seconds file can be uploaded');
        //                     return;
        //                 } else {
        //                     tempAudio.push(res[i].exportedurl);
        //                 }
        //             }
        //         }
        //         noticeAudioFILEURI = tempAudio.join(',');
        //         Ext.Msg.alert('Audio files selected successfully');
        //         if (isEditNotice) {
        //             var ft = new FileTransfer();
        //             var path = noticeAudioFILEURI;
        //             var name = '';
        //             var options = new FileUploadOptions();
        //             options.fileKey = "img";
        //             options.fileName = '';
        //             options.mimeType = "image/jpeg";
        //             var params = {};
        //             params.method = 'addMedia_Audio';
        //             params.img = name;
        //             params.notice_id = editNoticeId;
        //             params.totalaudios = res.length;
        //             options.params = params;
        //             Ext.Viewport.setMasked({
        //                 xtype: 'loadmask',
        //                 message: 'Uploading notice audios'
        //             });
        //             ft.upload(path, webserviceURL + "notices/addMedia.json", function(result) {
        //                 Ext.Viewport.setMasked(false);
        //             }, function(error) {
        //                 Ext.Viewport.setMasked(false);
        //                 Ext.Msg.alert('', 'error');
        //                 console.log('Error uploading file ' + path + ': ' + error.code);
        //             }, options);
        //         }
        //     }
        // }, function() {
        //     Ext.Msg.alert('eror to pick audio file');
        // }, true, true);
    },
    onUploadNoticeImageTap: function(button, e, eOpts) {
        window.imagePicker.getPictures(function(results) {
            var img = [];
            if (parseInt(promotionUploadSetting.image.max_upload_limit) < parseInt(results.length / 2)) {
                alert('', 'Only ' + promotionUploadSetting.image.max_upload_limit + ' files can be uploaded');
                return;
            }
            for (var i = 0; i < results.length; i++) {
                var fileSize = results[i];
                fileSize = fileSize / 1024;
                // i++;
                var fileName = results[i].substr(results[i].lastIndexOf('/') + 1);
                var fileExtension = '.' + fileName.split('.')[1];
                if (promotionUploadSetting.image.formate.indexOf(':' + fileExtension + ':') < 0) {
                    alert('', 'Only ' + promotionUploadSetting.image.formatemsg + ' type file can be uploaded');
                    return;
                } else if (promotionUploadSetting.image.size < fileSize) {
                    alert('', 'File size should not be greater than ' + promotionUploadSetting.image.size + ' kb');
                    //return;
                } else {
                    img.push(results[i]);
                }
                console.log('Image URI: ' + results[i]);
                // img.push(results[i]);
            }
            noticeImageFILEURI = img.join(',');
            if (isEditNotice) {
                var ft = new FileTransfer();
                var path = noticeImageFILEURI;
                var name = ''; //imageURI.substr(fileURL.lastIndexOf('/') + 1);// mediaFile.name;//mediaFile.fullPath
                var options = new FileUploadOptions();
                options.fileKey = "img";
                options.fileName = ''; // imageURI.substr(imageURI.lastIndexOf('/') + 1);
                options.mimeType = "image/jpeg";
                var params = {};
                params.method = 'addMedia_Image';
                params.img = name;
                params.notice_id = editNoticeId;
                params.totalimages = results.length;
                options.params = params;
                Ext.Viewport.setMasked({
                    xtype: 'loadmask',
                    message: 'Uploading notice images'
                });
                ft.upload(path, webserviceURL + "notices/addMedia.json", function(result) {
                    //Ext.Viewport.setMasked(false);
                    //
                    Ext.Ajax.request({
                        url: DNB.util.Common.api.getNoticeImagesById(editNoticeId),
                        method: 'POST',
                        success: function(res, options) {
                            Ext.Viewport.setMasked(false);
                            console.log('success:' + res.responseText);
                            var res = Ext.decode(res.responseText).response_data;
                            if (res.length > 0) {
                                var GalleryList = [];
                                for (j = 0; j < res.length; j++) {
                                    //if(res[j].Media.type=='I'){
                                    GalleryList.push(res[j].Media);
                                    //}
                                } //media for
                                //console.log(GalleryList);
                                if (GalleryList.length > 0) {
                                    Ext.getCmp('NoticeImagPanel').setHeight(150);
                                    Ext.getStore('NoticeMediaStore').setData(GalleryList);
                                } else {
                                    Ext.getCmp('NoticeImagPanel').setHeight(50);
                                    Ext.getCmp('EventImagesListPanel').hide();
                                }
                            }
                        },
                        failure: function(res, options) {
                            Ext.Viewport.setMasked(false);
                        }
                    });
                }, function(error) {
                    Ext.Viewport.setMasked(false);
                    alert('', 'error');
                    console.log('Error uploading file ' + path + ': ' + error.code);
                }, options);
            } //eo edit if
            else { //new notice
                
            }
        }, function(error) {
            console.log('Error: ' + error);
        }, {
            maximumImagesCount: 10,
            width: 800
        });
    },
    onMydataview8ItemTap31: function(dataview, index, target, record, e, eOpts) {
        if (e.target.className.indexOf('deleteMedia') >= 0) {
            Ext.Msg.confirm('DNB', 'Are you sure?', function(btn) {
                if (btn == 'yes') {
                    Ext.Viewport.setMasked({
                        xtype: 'loadmask',
                        message: 'deleting notice image'
                    });
                    if (isEditNotice) {
                        Ext.Ajax.request({
                            url: webserviceURL + 'notices/DelteMedia.json',
                            method: 'POST',
                            params: {
                                media_id: record.data.id
                            },
                            success: function(res) {
                                //Ext.Viewport.setMasked(false);
                                console.log(res.responseText);
                                //var res=Ext.decode(res.responseText);
                                Ext.Ajax.request({
                                    //url:webserviceURL+'Notices/get_specific_notice/'+record.data.notice_id+'.json',
                                    url: DNB.util.Common.api.getNoticeById(record.data.notice_id),
                                    success: function(res) {
                                        Ext.Viewport.setMasked(false);
                                        var res = Ext.decode(res.responseText);
                                        selectedEventDetail = res.response_data;
                                        var GalleryList = [];
                                        for (j = 0; j < selectedEventDetail.Media.length; j++) {
                                            if (selectedEventDetail.Media[j].type == 'I') {
                                                GalleryList.push(selectedEventDetail.Media[j]);
                                            }
                                        } //media for
                                        Ext.getStore('NoticeMediaStore').setData(GalleryList);
                                        Ext.Msg.alert('', 'Media has been deleted !');
                                    },
                                    failure: function(res) {
                                        Ext.Viewport.setMasked(false);
                                        Ext.Msg.alert('', 'Internet is not available.');
                                    }
                                });
                            },
                            failure: function(res) {
                                Ext.Viewport.setMasked(false);
                                Ext.Msg.alert('', 'Internet is not available.');
                            }
                        });
                    } else {
                        var GalleryList = noticeImageFILEURI.split(',');
                        GalleryList = GalleryList.splice(record.data.id, 1);
                        noticeImageFILEURI = temp.join(',');
                        if (GalleryList.length > 0) {
                            Ext.getCmp('NoticeImagPanel').setHeight(150);
                            Ext.getStore('NoticeMediaStore').setData(GalleryList);
                        } else {
                            Ext.getCmp('NoticeImagPanel').setHeight(50);
                            Ext.getCmp('EventImagesListPanel').hide();
                        }
                    }
                }
            });
        }
    },
    onSelectCategoryTap1: function(button, e, eOpts) {
        if (Ext.getCmp('CategoryMultiSelect')) Ext.getCmp('CategoryMultiSelect').show();
        Ext.getStore('EventCategoryMultiSelectStore').setData(categoryDataToAdd);
    },
    checkHotFiveSlot: function(field, newValue, oldValue) {
        if (newValue) {
            if(isEditNotice && selectedEventDetail.Notice.hot_five=='Yes'){
                return;
            }
            if(selectedCategoryID==0 || selectedCategoryID==null || selectedCategoryID==''){
                Ext.Msg.alert("","Select a category.");
                field.setValue(0);
                return;
            }
                Ext.Viewport.setMasked({
                    xtype: 'loadmask',
                    message: 'Checking HotFive Slot.'
                });
                var params = {
                    "latitude": 22.721939,
                    "longitude": 75.877769,
                    "category_id":selectedCategoryID
                }
                var successFunction = 'checkHotFiveSlotSuccess';
                var failedFunction = 'checkHotFiveSlotFailed';
                
                var servicesController = DNB.app.getController('ServicesController');
                servicesController.checkHotFiveSlot(params, successFunction, failedFunction);
            }
    },
    onBackTap: function(button, e, eOpts) {
        Ext.getCmp('DNBView').show();
        Ext.getCmp('HomeContainer').show();
        Ext.getCmp('AddEvent').hide();
    },
    onEventSubmitButtonTap: function(button, e, eOpts) {
        var eventName = Ext.getCmp('EventNameOnEventPage').getValue();
        var eventLocation = document.getElementById('locationField').value;
        // eventLocation = eventLocation.replace("'", "");
        var eventLocationCity = Ext.getCmp('EventLocationCityOnEventPage').getValue();
        var eventLocationState = Ext.getCmp('EventLocationStateOnEventPage').getValue();
        var eventLocationZip = Ext.getCmp('EventLocationZipOnEventPage').getValue();
        var eventStartDate = Ext.getCmp('EventStartDate').getValue();
        var eventEndDate = Ext.getCmp('EventEndDate').getValue();
        var eventPhone = Ext.getCmp('EventPhone').getValue();
        

        if (isEditNotice == false && noticeImageBannerFILEURI == '') {
            noticeImageBannerFILEURI = 'resources/images/default_event.jpg';
            // Ext.Msg.alert('', 'Notice banner is mandatory!');
            // return;
        } else if (eventName == '') {
            Ext.Msg.alert('', 'Notice name is mandatory!');
            return;
        } else if (eventLocation == '') {
            Ext.Msg.alert('', 'Notice location is mandatory!');
            return;
        } else if (eventLocationCity == '') {
            Ext.Msg.alert('', 'Notice city is mandatory!');
            return;
        } else if (eventLocationState == '') {
            Ext.Msg.alert('', 'Notice state is mandatory!');
            return;
        } else if (eventLocationZip == '') {
            Ext.Msg.alert('', 'Notice Zip is mandatory!');
            return;
        } else if (eventStartDate == null || eventStartDate == '') {
            Ext.Msg.alert('', 'Notice Start date is mandatory!');
            return;
        } else if (eventStartDate.toString().indexOf('1901') >= 0) {
            Ext.Msg.alert('', 'Notice Start date is mandatory!');
            return;
        } else if (eventEndDate == null || eventEndDate == '') {
            Ext.Msg.alert('', 'Notice End date is mandatory!');
            return;
        } else if (eventEndDate.toString().indexOf('1901') >= 0) {
            Ext.Msg.alert('', 'Notice End date is mandatory!');
            return;
        } else if(eventPhone=='' || eventPhone==null){
            Ext.Msg.alert('','Phone no is mandatory!');
            return;
        }

        var lat = noticeLocationLat,
            longi = noticeLocationLong;
        // eventStartDate = (new Date(eventStartDate.getFullYear(), eventStartDate.getMonth(), eventStartDate.getDate()));
        // eventEndDate = new Date(eventEndDate.getFullYear(), eventEndDate.getMonth(), eventEndDate.getDate());
        if (new Date(eventStartDate) > new Date(eventEndDate)) {
            Ext.Msg.alert('', 'Notice start date should not be greater than end date');
            return;
        }
        var sh = Ext.getCmp('EventStartTimeHour').getValue();
        var sm = Ext.getCmp('EventStartTimeMinute').getValue();
        var sampm = Ext.getCmp('EventStartTimeAMPM').getValue();
        var eventFromTime = sh + ':' + sm + ':00 ' + sampm;
        var eh = Ext.getCmp('EventEndTimeHour').getValue();
        var em = Ext.getCmp('EventEndTimeMinute').getValue();
        var eampm = Ext.getCmp('EventEndTimeAMPM').getValue();
        var eventToTime = eh + ':' + em + ':00 ' + eampm;
        if (new Date(eventStartDate) == new Date(eventEndDate)) {
            if (sampm == eampm) {
                if (sampm == 'AM') {
                    if (parseInt(sh) > parseInt(eh)) {
                        Ext.Msg.alert('', 'Notice "Time From" should not be greater than "Time To".');
                        return;
                    } else if ((parseInt(sh) == parseInt(eh)) && (parseInt(sm) > parseInt(em))) {
                        Ext.Msg.alert('', 'Notice "Time From" should not be greater than "Time To".');
                        return;
                    }
                } else if (sampm == 'PM') {
                    if (parseInt(sh) < 12 && (parseInt(sh) > parseInt(eh))) {
                        Ext.Msg.alert('', 'Notice "Time From" should not be greater than "Time To".');
                        return;
                    } else if ((parseInt(sh) == parseInt(eh)) && (parseInt(sm) > parseInt(em))) {
                        Ext.Msg.alert('', 'Notice "Time From" should not be greater than "Time To".');
                        return;
                    }
                }
            } else if (sampm == 'PM') {
                if (parseInt(sh) < 12 && (parseInt(sh) > parseInt(eh))) {
                    Ext.Msg.alert('', 'Notice "Time From" should not be greater than "Time To".');
                    return;
                } else if ((parseInt(sh) == parseInt(eh)) && (parseInt(sm) > parseInt(em))) {
                    Ext.Msg.alert('', 'Notice "Time From" should not be greater than "Time To".');
                    return;
                }
            }
            if (eventFromTime == eventToTime && eventFromTime != 'H:M:00 AM') {
                Ext.Msg.alert('', 'Notice "Time From" should not be equal to "Time To".');
                return;
            }
        }
        var eventVideoLink = Ext.getCmp('VideoLinkUrls').getValue();
        var eventCategory = selectedCategoryIDsToAdd;
        if (selectedCategoryIDsToAdd == '' || selectedCategoryIDsToAdd == null || selectedCategoryIDsToAdd == 0) {
            Ext.Msg.alert('', 'Notice category is mandatory!');
            return;
        }
        var payStatus = Ext.getCmp('PayStatus').getValue();
        var eventHotFive = Ext.getCmp('EventHotFive').getValue();
        var noticeSlot = Ext.getCmp('NoticeSlot').getValue();
        
        var eventEmail = Ext.getCmp('EventEmail').getValue();
        var eventWebsite = Ext.getCmp('EventWebsite').getValue();
        var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        if (eventWebsite != '') {
            if (!regexp.test(eventWebsite)) {
                Ext.Msg.alert('', 'Notice website url is invalid.');
                return;
            }
        }
        
        var eventComments = Ext.getCmp('EventComments').getValue();
        var eventDescription = Ext.getCmp('EventDescription').getValue();
        if (eventHotFive == 0 || eventHotFive == '0') {
            eventHotFive = 'No';
        } else {
            eventHotFive = 'Yes';
        }
        if (eventComments == 0 || eventComments == '0') {
            eventComments = 'no';
        } else {
            eventComments = 'yes';
        }
        var totalPrice = 0;
        if (eventHotFive == 'Yes') {
            totalPrice = hotFivePrice;
        }
        if (payStatus == 'paid') {
            var timeDiff = Math.abs(eventEndDate.getTime() - eventStartDate.getTime());
            var duration = Math.ceil(timeDiff / (1000 * 3600 * 24));
            var week = duration / 7;
            if (duration > 7) {
                week = duration / 7;
                totalPrice += (perWeekPrice * week);
            } else {
                totalPrice += (perWeekPrice);
            }
        }
        if (totalPrice == 0) {
            totalPrice = 1;
        }
        totalPrice = totalPrice.toFixed(2);
        if (isEditNotice) {
            // debugger
            var editParams = {
                                id: editNoticeId,
                                description: eventDescription,
                                notice_type: payStatus,
                                venu_detail: eventLocation.replace("'", ""),
                                city: eventLocationCity,
                                state: eventLocationState,
                                zip: eventLocationZip,
                                country: '',
                                date: eventStartDate,
                                time_from: eventFromTime,
                                time_to: eventToTime,
                                hot_five: eventHotFive,
                                slot: noticeSlot,
                                start_date: eventStartDate,
                                end_date: eventEndDate,
                                categorys: eventCategory,
                                extra: '',
                                price: 10,
                                website: eventWebsite,
                                payment_status: payStatus,
                                user_id: localStorage.getItem('userid'),
                                title: eventName,
                                duration: 5,
                                latitude: lat,
                                longitude: longi,
                                videos: eventVideoLink,
                                phone_number: eventPhone,
                                email: eventEmail,
                                comment: eventComments
                            };
                var oldEndDate = new Date(selectedEventDetail.Notice.end_date);
                var oldHotFive = selectedEventDetail.Notice.hot_five;

                // console.log('OldDate:'+oldEndDate)
                // console.log('oldHotFive:'+oldHotFive)
                // console.log('NewDate:'+eventEndDate)
                // console.log('NewHotfive:'+eventHotFive)

            // console.log(editParams);
            // return;
            
            if((eventEndDate > oldEndDate) || (eventHotFive != oldHotFive) ){

            console.log('If works')       
            var clientIDs = {
                "PayPalEnvironmentProduction": "YOUR_PRODUCTION_CLIENT_ID",
                "PayPalEnvironmentSandbox": "YOUR_SANDBOX_CLIENT_ID"
            };
            PayPalMobile.init(clientIDs, function() {
                    var config = new PayPalConfiguration({
                        merchantName: "My test shop",
                        merchantPrivacyPolicyURL: "https://mytestshop.com/policy",
                        merchantUserAgreementURL: "https://mytestshop.com/agreement"
                    });
                    // must be called
                    // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
                    PayPalMobile.prepareToRender("PayPalEnvironmentNoNetwork", config, function() {
                        //totalCategoryAmount=50.0;
                        var paymentDetails = new PayPalPaymentDetails("50.00", "0.00", "0.00");
                        var payment = new PayPalPayment("50.00", "USD", "Awesome Sauce", "Sale", paymentDetails);
                        PayPalMobile.renderSinglePaymentUI(payment, function(payment) {
                           
                            Ext.Viewport.setMasked({
                                xtype: 'loadmask',
                                message: 'Saving notice'
                            });
                            Ext.Ajax.request({
                            url: DNB.util.Common.api.updateNotice,
                            method: 'POST',
                            params: editParams,
                           
                            success: function(res) {
                                Ext.Viewport.setMasked(false);
                                var res = Ext.decode(res.responseText).response_data;
                                console.log(res.responseText);
                                DNB.app.getController('Events').ResetNoticeForm();
                                editNoticeId = '';
                                isEditNotice = false;
                                Ext.Msg.alert('', res.Message);
                                DNB.app.getController('Events').GetMyNotices('users/get_my_notice/', 'MyNoticesPanel');
                                Ext.getCmp('DNBView').show();
                                Ext.getCmp('AddEvent').hide();
                            },
                            failure: function(res) {
                                Ext.Viewport.setMasked(false);
                                Ext.Msg.alert('', 'Internet is not available.');
                            }
                        });
                            
                        }, function(result) {
                            console.log(result);
                        });
                    });
                });
            }else{
                console.log('else Works')
                // return;
                Ext.Viewport.setMasked({
                                xtype: 'loadmask',
                                message: 'Saving notice'
                            });
                            Ext.Ajax.request({
                            url: DNB.util.Common.api.updateNotice,
                            method: 'POST',
                            params: editParams,
                            success: function(res) {
                                Ext.Viewport.setMasked(false);
                                var res = Ext.decode(res.responseText).response_data;
                                console.log(res.responseText);
                                DNB.app.getController('Events').ResetNoticeForm();
                                editNoticeId = '';
                                isEditNotice = false;
                                Ext.Msg.alert('', res.Message);
                                DNB.app.getController('Events').GetMyNotices('users/get_my_notice/', 'MyNoticesPanel');
                                Ext.getCmp('DNBView').show();
                                Ext.getCmp('AddEvent').hide();
                            },
                            failure: function(res) {
                                Ext.Viewport.setMasked(false);
                                Ext.Msg.alert('', 'Internet is not available.');
                            }
                        });
            }
                
        } else {

            // eventStartDate = (new Date(eventStartDate.getFullYear(), eventStartDate.getMonth(), eventStartDate.getDate() + 1));
            // eventEndDate = new Date(eventEndDate.getFullYear(), eventEndDate.getMonth(), eventEndDate.getDate() + 1);
            var ft = new FileTransfer();
            var uploadFileUrls = noticeImageBannerFILEURI;
            var name = '';
            var options = new FileUploadOptions();
            options.fileKey = "flyer";
            options.fileName = uploadFileUrls.substr(uploadFileUrls.lastIndexOf('/') + 1);
            // options.fileName = '';
            options.mimeType = "image/jpeg";
            var params = {};
            params.method = "notice";
            params.value2 = "param";
            params.title = eventName;
            params.description = eventDescription;
            params.notice_type = payStatus;
            params.venu_detail = eventLocation.replace("'", "");
            params.city = eventLocationCity;
            params.state = eventLocationState;
            params.zip = eventLocationZip;
            params.country = ''; //eventLocationCountry;
            params.videos = eventVideoLink;
            params.date = eventStartDate; // "2015-04-25";
            params.time_from = eventFromTime; // "11:00AM";
            params.time_to = eventToTime; // "1:00PM";
            params.hot_five = eventHotFive;
            params.slot = noticeSlot;
            params.duration = "2";
            params.start_date = eventStartDate; // "2015-04-25";
            params.end_date = eventEndDate; // "2015-04-27";
            params.extra = "event extra data goes to here";
            params.price = totalCategoryAmount;
            params.website = eventWebsite;
            params.phone_number = eventPhone;
            params.email = eventEmail;
            params.payment_status = "1";
            params.user_id = localStorage.getItem('userid');
            params.categorys = eventCategory; // "3,4";
            params.latitude = lat;
            params.longitude = longi;
            params.comment = eventComments;
            options.params = params;

            // console.log(params);
            // return;

            var clientIDs = {
                "PayPalEnvironmentProduction": "YOUR_PRODUCTION_CLIENT_ID",
                "PayPalEnvironmentSandbox": "YOUR_SANDBOX_CLIENT_ID"
            };
            var checkLocation = this.compareLocation(eventLocation);
            if ((checkLocation == true || checkLocation == 'true') && (eventHotFive == 0 || eventHotFive =='No')) {
                console.log(options);
                Ext.Viewport.setMasked({
                    xtype: 'loadmask',
                    message: 'Saving notice'
                });
                ft.upload(uploadFileUrls, //    path.join(','),
                    webserviceURL + "Notices/add_notice.json",
                    function(result) {
                        console.log('successfully upload Notice')
                        console.log(result);
                        Ext.Viewport.setMasked(false);
                        Ext.Msg.alert('', 'Notice added successfully.');
                        DNB.app.getController('Events').ResetNoticeForm();
                        Ext.getCmp('DNBView').show();
                        Ext.getCmp('AddEvent').hide();
                        DNB.app.getController('Events').GetNotices();
                    },
                    function(error) {
                        Ext.Viewport.setMasked(false);
                        Ext.Msg.alert('', 'error');
                        console.log('Error uploading file ' + path + ': ' + error.code);
                        console.log(error);
                    }, options);
            } else {
                PayPalMobile.init(clientIDs, function() {
                    var config = new PayPalConfiguration({
                        merchantName: "My test shop",
                        merchantPrivacyPolicyURL: "https://mytestshop.com/policy",
                        merchantUserAgreementURL: "https://mytestshop.com/agreement"
                    });
                    // must be called
                    // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
                    PayPalMobile.prepareToRender("PayPalEnvironmentNoNetwork", config, function() {
                        //totalCategoryAmount=50.0;
                        var paymentDetails = new PayPalPaymentDetails("50.00", "0.00", "0.00");
                        var payment = new PayPalPayment("50.00", "USD", "Awesome Sauce", "Sale", paymentDetails);
                        PayPalMobile.renderSinglePaymentUI(payment, function(payment) {
                            console.log(payment);
                            console.log(options);
                            console.log(uploadFileUrls);
                            //commented for testing.
                            Ext.Viewport.setMasked({
                                xtype: 'loadmask',
                                message: 'Saving notice'
                            });
                            ft.upload(uploadFileUrls, //    path.join(','),
                                webserviceURL + "Notices/add_notice.json",
                                function(result) {
                                    console.log('successfully upload Notice')
                                    console.log(result);
                                    Ext.Viewport.setMasked(false);
                                    Ext.Msg.alert('', 'Notice added successfully.');
                                    DNB.app.getController('Events').ResetNoticeForm();
                                    Ext.getCmp('DNBView').show();
                                    Ext.getCmp('AddEvent').hide();
                                    DNB.app.getController('Events').GetNotices();
                                },
                                function(error) {
                                    Ext.Viewport.setMasked(false);
                                    Ext.Msg.alert('', 'error');
                                    console.log(error);
                                    console.log('Error uploading file : ' + error.code);
                                    // console.log(error);
                                }, options);
                        }, function(result) {
                            console.log(result);
                        });
                    });
                });
            }
        }
    },
    
    compareLocation: function(location) {
        Ext.getStore('FreeLocationsStore').setData(DNB.util.Common.freeLocations);
        var freeLocationsStore = Ext.getStore('FreeLocationsStore');
        var locationFound = freeLocationsStore.findRecord('address', location);
        if (locationFound == '' || locationFound == null) {
            return false;
        } else {
            return true;
        }
    }
});