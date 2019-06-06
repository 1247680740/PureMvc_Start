/**
 * 网络公共类
 * by dily
 * (c) copyright 2014 - 2035
 * All Rights Reserved. 
 * 存放网络公共方法 
 * 注意：是同步请求，不是异步
 */
module SocketManager {

    var sock: egret.WebSocket = new egret.WebSocket();
    var fileName: string;  //协议包名
    var reqName: string;  //协议方法名
    //连接服务器
    export function connectServer(host: string = "", port: number = 80) {
        Global.showWaritPanel();
        this.sock = new egret.WebSocket();
        this.sock.type = "webSocketTypeBinary";
        this.sock.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.sock.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);

        this.sock.connect(host, port);
    }

    //连接成功返回
    export function onSocketOpen(): void {
        Global.hideWaritPanel();
        game.AppFacade.getInstance().sendNotification(NoficationConfig.CONNECT_SERVER_SUCCESS);
    }

    //消息返回  
    export function onReceiveMessage(): void {
        Global.hideWaritPanel();
        var _arr: egret.ByteArray = new egret.ByteArray();
        this.sock.readBytes(_arr);
        var mainId = _arr.readInt();
        var subId = _arr.readShort();
        var cmdDataBA: egret.ByteArray = new egret.ByteArray();
        _arr.readBytes(cmdDataBA);

        var message = dcodeIO.ProtoBuf.loadProto(RES.getRes(this.fileName + "_proto"));
        var user_login_class = message.build(this.reqName);
        var recevieData = user_login_class.decode(cmdDataBA.buffer);
        game.AppFacade.getInstance().sendNotification(this.fileName + "_" + this.reqName, recevieData);
    }

    //向服务端发送消息
    export function sendMessage(mainId: number, subId: number, msg: any): void {
        Global.showWaritPanel();
        var sendMsg: egret.ByteArray = new egret.ByteArray();
        sendMsg.writeInt(mainId);
        sendMsg.writeShort(subId);
        sendMsg.writeBytes(new egret.ByteArray(msg));
        this.sock.writeBytes(sendMsg);
    }

    //向服务端发送消息转化为二进制信息
    export function changeSendInfo(reqMethor: string, reqObj: Object): void {
        if (reqMethor.indexOf("_") != -1) {
            this.fileName = reqMethor.substring(0, reqMethor.indexOf("_"));
            this.reqName = reqMethor.substring(reqMethor.indexOf("_") + 1, reqMethor.length);
            var sendObj = Global.getMessage(this.fileName,this.reqName);
            var proObj = new sendObj(reqObj);
            var bytes = proObj.toArrayBuffer();
            SocketManager.sendMessage(100, 1, bytes);
        }
    }
}



