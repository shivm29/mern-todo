import React, { createContext, useState, useRef, useEffect } from "react";

import { io } from 'socket.io-client'
import Peer from 'simple-peer'

const SocketContext = createContext();

const socket = io('http://localhost:5000');

const ContextProvider = ({ children }) => {

    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState(true);
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');
  
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {

        // getUserMedia() is a Web API method that allows web applications to access the user's media devices, such as the camera and microphone, 

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);

                myVideo.current.srcObject = currentStream;
            })

        socket.on('me', (id) => setMe(id));

        // calluser listener  responsible for handling incoming call requests from other users
        // remains active and continues to listen for incoming calls even after the initial rendering.
        socket.on('calluser', ({ from, name: callerName, signal }) => {
            setCall({ isRecievedCall: true, from, name: callerName, signal })
        })
    }, []);

    // useEffect(() => {
    //     if (callAccepted && call.signal) {
    //       const peer = new Peer({ initiator: false, trickle: false, stream });
      
    //       peer.on('signal', (data) => {
    //         socket.emit('answerCall', { signal: data, to: call.from });
    //       });
       
    //       peer.on('stream', (currentStream) => {
    //         userVideo.current.srcObject = currentStream;
    //       });
      
    //       peer.signal(call.signal);
      
    //       connectionRef.current = peer;
    //     }
    //   }, [callAccepted, call.signal]);

    //  callback that gets executed when a user wants to answer an incoming call. 
    const answerCall = () => {
        setCallAccepted(true)
        // The Peer object represents a connection between two users for video calling
        const peer = new Peer({ initiator: false, trickle: false, stream })

        peer.on('signal', (data) => {
            // sends a message to the server with the event name 'answerCall' and the payload { signal: data, to: call.from }. It indicates that the user is answering the call and sends the signaling data (data) and the ID of the caller (call.from) to the server.
            socket.emit('answercall', { signal: data, to: call.from });

            // When the peer object receives a media stream from the caller, it triggers the callback function (currentStream) => { ... }.currentStream represents the media stream received from the caller.

            peer.on('stream', (currentStream) => {
                userVideo.current.srcObject = currentStream;
            })
        })

        peer.signal(call.signal);

        connectionRef.current = peer;
    }

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream })

        peer.on('signal', (data) => {
            socket.emit('calluser', { userToCall: id, signalData: data, from: me, name });

            peer.on('stream', (currentStream) => {
                userVideo.current.srcObject = currentStream;
            })
        })

        socket.on('callaccepted', (signal) => {
            setCallAccepted(true);

            peer.signal(signal)
        })

        connectionRef.current = peer;
    }

    const leaveCall = () => {

        setCallEnded(true)
        connectionRef.current.destroy();

        window.location.reload();
    }

    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callEnded,
            me,
            callUser,
            leaveCall,
            answerCall
        }} >
            {children}
        </SocketContext.Provider>)
}

export { ContextProvider, SocketContext }