Page({
    scanQrcode: function() {
        wx.scanCode({
            onlyFromCamera: true,
            success: function(_res) {
                if (_res.errMsg == 'scanCode:ok') {
                    wx.request({
                        url: _res.result,
                        method: 'GET',
                        success: function(res) {
                            var res = res.data;
                            if (res.result == 2) {
                                wx.navigateTo({
                                    url: '../again/again',
                                })
                            } else if (res.result == 1) {
                                wx.navigateTo({
                                    url: '../vr/vr?devCode=' + res.data.devCode,
                                })
                            } else {
                                wx.showModal({
                                    title: '提示',
                                    showCancel: false,
                                    content: res.msg
                                });
                            }
                        }
                    })
                }
            },
            fail: function(res) {
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