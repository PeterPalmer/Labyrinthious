/// <reference path="typings/jquery.d.ts" />
/// <reference path="typings/signalr.d.ts" />
/// <reference path="typings/signalhub.d.ts" />

module Labyrinthious {

    export class MobilePage {
        hub: SignalHub;
        roll: number;
        pitch: number;
        yaw: number;
        alphaOffset: number;

        constructor() {
            this.hub = $.connection.signalHub;
            $.connection.hub.start().done(() => {
                this.RegisterEvents();
                this.hub.server.deviceConnected();
            });
        }

        private RegisterEvents(): void {
            window.addEventListener("deviceorientation", this.Ondeviceorientation, true);

            setInterval(function () {
                mobilePage.hub.server.postOrientation(this.pitch, this.roll, this.yaw);
            }, 100);
        }

        private Ondeviceorientation(event: DeviceOrientationEvent): void {
            if (this.alphaOffset == null) {
                this.alphaOffset = event.alpha * -1;
            }
            this.yaw = event.alpha + this.alphaOffset;
            this.pitch = event.beta;
            this.roll = event.gamma;
        }
    }
}

var mobilePage: Labyrinthious.MobilePage;
window.onload = () => {
    mobilePage = new Labyrinthious.MobilePage();
};