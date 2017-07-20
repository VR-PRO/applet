Page({
     data: {
        hidden:true
    },
    scanQrcode: function() {
        var _this = this;
        wx.scanCode({
            onlyFromCamera: true,
            success: function(_res) {
                if (_res.errMsg == 'scanCode:ok') {
                    var url =  _res.result;
                    if(url.indexOf('vr.mtscrm.com')>=0){
                        _this.setData({ hidden: false });
                        wx.request({
                            url: _res.result,
                            method: 'GET',
                            success: function(res) {
                                var res = res.data;
                                if (res.result == 2) {
                                    _this.setData({ hidden: true });
                                    wx.navigateTo({
                                        url: '../again/again',
                                    })
                                } else if (res.result == 1) {
                                    _this.setData({ hidden: true });
                                    wx.navigateTo({
                                        url: '../vr/vr?devCode=' + res.data.devCode,
                                    })
                                } else {
                                    _this.setData({ hidden: true });
                                    wx.showModal({
                                        title: '提示',
                                        showCancel: false,
                                        content: res.msg
                                    });
                                }
                            }
                        })
                    }else{
                        _this.setData({ hidden: true });
                        wx.showModal({
                            title: '提示',
                            showCancel: false,
                            content: "识别失败,请扫描正确的二维码.",
                        });
                    }
                }
            },
            fail: function(res) {
                _this.setData({ hidden: true });
                wx.showModal({
                    title: '提示',
                    showCancel: false,
                    content: "识别失败,请关闭后重试.",
                });
            },
            complete: function(res) {

            }
        });
    }
})