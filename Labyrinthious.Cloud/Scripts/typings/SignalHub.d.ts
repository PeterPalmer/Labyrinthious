// Get signalr.d.ts.ts from https://github.com/borisyankov/DefinitelyTyped (or delete the reference)
/// <reference path="signalr.d.ts" />
/// <reference path="jquery.d.ts" />

////////////////////
// available hubs //
////////////////////
//#region available hubs

interface SignalR {

    /**
      * The hub implemented by Labyrinthious.Cloud.SignalHub
      */
    signalHub : SignalHub;
}
//#endregion available hubs

///////////////////////
// Service Contracts //
///////////////////////
//#region service contracts

//#region SignalHub hub

interface SignalHub {
    
    /**
      * This property lets you send messages to the SignalHub hub.
      */
    server : SignalHubServer;

    /**
      * The functions on this property should be replaced if you want to receive messages from the SignalHub hub.
      */
    client : SignalHubClient;
}

interface SignalHubServer {

    /** 
      * Sends a "send" message to the SignalHub hub.
      * Contract Documentation: ---
      * @param name {string} 
      * @param message {string} 
      * @return {JQueryPromise of void}
      */
    send(name : string, message : string) : JQueryPromise<void>;

    /** 
      * Sends a "postOrientation" message to the SignalHub hub.
      * Contract Documentation: ---
      * @param pitch {number} 
      * @param roll {number} 
      * @param yaw {number} 
      * @return {JQueryPromise of void}
      */
    postOrientation(pitch : number, roll : number, yaw : number) : JQueryPromise<void>;

    /** 
      * Sends a "deviceConnected" message to the SignalHub hub.
      * Contract Documentation: ---
      * @return {JQueryPromise of void}
      */
    deviceConnected() : JQueryPromise<void>;
}

interface SignalHubClient
{

    /**
      * Set this function with a "function(name : string, message : string){}" to receive the "send" message from the SignalHub hub.
      * Contract Documentation: ---
      * @param name {string} 
      * @param message {string} 
      * @return {void}
      */
    send : (name : string, message : string) => void;

    /**
      * Set this function with a "function(pitch : number, roll : number, yaw : number){}" to receive the "postOrientation" message from the SignalHub hub.
      * Contract Documentation: ---
      * @param pitch {number} 
      * @param roll {number} 
      * @param yaw {number} 
      * @return {void}
      */
    postOrientation : (pitch : number, roll : number, yaw : number) => void;

    /**
      * Set this function with a "function(){}" to receive the "deviceConnected" message from the SignalHub hub.
      * Contract Documentation: ---
      * @return {void}
      */
    deviceConnected: () => void;
}

//#endregion SignalHub hub

//#endregion service contracts

