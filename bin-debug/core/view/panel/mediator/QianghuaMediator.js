/**
  * 背包面板
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  */
var game;
(function (game) {
    var sendObj = {
        "userId": 0,
        "userName": ""
    };
    var QianghuaMediator = (function (_super) {
        __extends(QianghuaMediator, _super);
        function QianghuaMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            _super.call(this, QianghuaMediator.NAME, viewComponent);
            this.qinghuaPanel = new game.QianghuaPanel();
        }
        var d = __define,c=QianghuaMediator;p=c.prototype;
        p.listNotificationInterests = function () {
            return [
                NoficationConfig.OPEN_QIANGHUA,
                NoficationConfig.CLOSE_QIANGHUA,
                NoficationConfig.CONNECT_SERVER_SUCCESS,
                NoficationConfig.UPDATE_DATA
            ];
        };
        p.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case NoficationConfig.OPEN_QIANGHUA: {
                    //显示角色面板
                    this.showUI(this.qinghuaPanel, false, 0, 0, 3);
                    break;
                }
                case NoficationConfig.CLOSE_QIANGHUA: {
                    this.closePanel(1);
                    break;
                }
                case NoficationConfig.CONNECT_SERVER_SUCCESS: {
                    this.qinghuaPanel.showText.text += "服务器连接成功...\n";
                    break;
                }
                case NoficationConfig.UPDATE_DATA: {
                    this.qinghuaPanel.showText.text += "userId:" + data.getUserId() + "\nuserName:" + data.getUserName();
                    break;
                }
            }
        };
        /**
         * 初始化面板ui
         */
        p.initUI = function () {
            this.qinghuaPanel.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeButtonClick, this);
            this.qinghuaPanel.connectServer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.connectServerButtonClick, this);
            this.qinghuaPanel.sendMsg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendMsgButtonClick, this);
        };
        /**
         * 初始化面板数据
         */
        p.initData = function () {
        };
        p.connectServerButtonClick = function (event) {
            SocketManager.connectServer("echo.websocket.org", 80);
        };
        p.sendMsgButtonClick = function (event) {
            sendObj.userId = Number(this.qinghuaPanel.input1.text);
            sendObj.userName = this.qinghuaPanel.input2.text;
            SocketManager.changeSendInfo(ProtobufConfig.TEMPLATE_USER_LOGIN, sendObj);
        };
        p.closeButtonClick = function (event) {
            this.closePanel(1);
        };
        QianghuaMediator.NAME = "QianghuaMediator";
        return QianghuaMediator;
    })(BaseMediator);
    game.QianghuaMediator = QianghuaMediator;
    egret.registerClass(QianghuaMediator,"game.QianghuaMediator");
})(game || (game = {}));
//# sourceMappingURL=QianghuaMediator.js.map