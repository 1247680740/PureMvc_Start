/**
  * 服务器命令返回(注册监听服务器响应)
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class Processor_100_1 extends puremvc.SimpleCommand implements puremvc.ICommand {
        public constructor() {
            super();
        }

        public static NAME: string = ProtobufConfig.TEMPLATE_USER_LOGIN;

        /** 注册消息 */
        public register(): void {
            this.facade.registerCommand(ProtobufConfig.TEMPLATE_USER_LOGIN,Processor_100_1);
        }

        public execute(notification: puremvc.INotification): void {
            var data: any = notification.getBody();//携带数据
            switch(notification.getName()){
                case ProtobufConfig.TEMPLATE_USER_LOGIN:
                    this.sendNotification(NoficationConfig.UPDATE_DATA,data);
                break;

                default:

                break;
            }
        }
    }
}
