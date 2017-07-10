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
                            if (res.result) { //能查到订单--->直接跳到成功页面
                                wx.navigateTo({
                                    url: '../again/again',
                                })
                            } else {
                                if (res.msg) { //没有订单,但是有错误 直接弹出错误信息
                                    wx.showModal({
                                        title: '提示',
                                        showCancel: false,
                                        content: res.msg
                                    });
                                } else { //没有订单也没有错误,直接跳转到待支付的页面,并生成一个待支付的订单
                                    var devCode = res.data.devCode || 'da327059e71';
                                    wx.navigateTo({
                                        url: '../vr/vr?devCode=' + devCode,
                                    })
                                }
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