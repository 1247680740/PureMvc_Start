/**
  * 服务器命令返回
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  */
var game;
(function (game) {
    var Processor_100_1 = (function (_super) {
        __extends(Processor_100_1, _super);
        function Processor_100_1() {
            _super.call(this);
        }
        var d = __define,c=Processor_100_1;p=c.prototype;
        /** 注册消息 */
        p.register = function () {
            this.facade.registerCommand(ProtobufConfig.TEMPLATE_USER_LOGIN, Processor_100_1);
        };
        p.execute = function (notification) {
            var data = notification.getBody(); //携带数据
            this.sendNotification(NoficationConfig.UPDATE_DATA, data);
        };
        Processor_100_1.NAME = ProtobufConfig.TEMPLATE_USER_LOGIN;
        return Processor_100_1;
    })(puremvc.SimpleCommand);
    game.Processor_100_1 = Processor_100_1;
    egret.registerClass(Processor_100_1,"game.Processor_100_1",["puremvc.ICommand","puremvc.INotifier"]);
})(game || (game = {}));
//# sourceMappingURL=Processor_100_1.js.map