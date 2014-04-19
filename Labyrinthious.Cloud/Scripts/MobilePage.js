/// <reference path="typings/jquery.d.ts" />
/// <reference path="typings/signalr.d.ts" />
/// <reference path="typings/signalhub.d.ts" />
var Labyrinthious;
(function (Labyrinthious) {
    var MobilePage = (function () {
        function MobilePage() {
            var _this = this;
            this.hub = $.connection.signalHub;
            $.connection.hub.start().done(function () {
                _this.RegisterEvents();
                _this.hub.server.deviceConnected();
            });
        }
        MobilePage.prototype.RegisterEvents = function () {
            window.addEventListener("deviceorientation", this.Ondeviceorientation, true);

            setInterval(function () {
                mobilePage.hub.server.postOrientation(this.pitch, this.roll, this.yaw);
            }, 100);
        };

        MobilePage.prototype.Ondeviceorientation = function (event) {
            if (this.alphaOffset == null) {
                this.alphaOffset = event.alpha * -1;
            }
            this.yaw = event.alpha + this.alphaOffset;
            this.pitch = event.beta;
            this.roll = event.gamma;
        };
        return MobilePage;
    })();
    Labyrinthious.MobilePage = MobilePage;
})(Labyrinthious || (Labyrinthious = {}));

var mobilePage;
window.onload = function () {
    mobilePage = new Labyrinthious.MobilePage();
};
//# sourceMappingURL=MobilePage.js.map
