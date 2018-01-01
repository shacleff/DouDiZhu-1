class UserPlayerView extends PlayerBaseView{
	private socketMsg: SocketMsg = new SocketMsg();
	public constructor() {
		super();
		this.bind(UIEventCode.PLAYER_READY, UIEventCode.GAME_START);
	}
	protected createChildren() {
		super.createChildren();
		this.skinName = UserPlayerSkin;
	}
	public execute(eventCode: number, msg: any) {
		super.execute(eventCode, msg);
		switch(eventCode) {
			case UIEventCode.PLAYER_READY:
				let userId = <number> msg;
				// 如果是自身角色，就显示
				if(Models.gameModel.userDto.id == userId) {
					this.readyState();
				}
				break;
			case UIEventCode.GAME_START:
				let playerCtrl = new MyPlayerCtrl();
				this.addChild(playerCtrl);
				break;
		}
	}
	protected childrenCreated() {
		super.childrenCreated();
		this.readyCom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReadyCom, this);
	}
	public onReadyCom(evt: egret.TouchEvent) {
		if(evt.target.name == 'btnReady') {
			this.socketMsg.change(OpCode.MATCH, MatchCode.READY_CREQ, null);
			this.dispatch(AreaCode.NET, NetEventCode.SEND, this.socketMsg);
		}
	}
	public onDispose() {
		
	}
}