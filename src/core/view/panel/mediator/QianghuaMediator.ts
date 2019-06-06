/**
  * 背包面板
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    var sendObj = {
        "userId":0,
        "userName":""
    } 

    export class QianghuaMediator extends BaseMediator {
        public static NAME: string = "QianghuaMediator";

        public constructor(viewComponent: any = null) {
            super(QianghuaMediator.NAME,viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                NoficationConfig.OPEN_QIANGHUA,
                NoficationConfig.CLOSE_QIANGHUA,
                NoficationConfig.CONNECT_SERVER_SUCCESS,
                NoficationConfig.UPDATE_DATA
            ];
        }
        private qinghuaPanel: QianghuaPanel = new QianghuaPanel();
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch(notification.getName()) {
                case NoficationConfig.OPEN_QIANGHUA: {
                    //显示角色面板
                    this.showUI(this.qinghuaPanel,false,0,0,3);
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
                    this.qinghuaPanel.showText.text += "userId:"+data.getUserId()+"\nuserName:"+data.getUserName();
                    break;
                }
            }
        }       

        /**
         * 初始化面板ui
         */
        public initUI(): void {
            this.qinghuaPanel.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeButtonClick,this);
            this.qinghuaPanel.connectServer.addEventListener(egret.TouchEvent.TOUCH_TAP,this.connectServerButtonClick,this);
            this.qinghuaPanel.sendMsg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.sendMsgButtonClick,this);
        }	

        /**
         * 初始化面板数据
         */
        public initData(): void {
 

        }

        private connectServerButtonClick(event: egret.TouchEvent): void {
            SocketManager.connectServer("echo.websocket.org",80);
        }
        
        private sendMsgButtonClick(event: egret.TouchEvent): void {
            sendObj.userId = Number(this.qinghuaPanel.input1.text);
            sendObj.userName = this.qinghuaPanel.input2.text;
            SocketManager.changeSendInfo(ProtobufConfig.TEMPLATE_USER_LOGIN,sendObj);
        }
        
        private closeButtonClick(event: egret.TouchEvent): void {
            this.closePanel(1);
        }

    }
}