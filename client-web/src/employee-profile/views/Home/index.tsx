import {useCallback, useEffect, useRef, useState} from "react";
import {getSIPSimpleUser} from "helpers/getSIPSimpleUser";
import {SimpleUser} from "sip.js/lib/platform/web";
import phoneCallSound from "static/sounds/phone-call.mp3";
import phoneReceivedSound from "static/sounds/synth-telephone-ring.mp3";

const Home = () => {
    const localVid = useRef<HTMLVideoElement>(null);
    const remoteVid = useRef<HTMLVideoElement>(null);
    const remoteAudio = useRef<HTMLAudioElement>(null);
    const localAudio = useRef<HTMLAudioElement>(null);

    const simpleUserRef = useRef<SimpleUser>();
    let simpleUser = simpleUserRef.current!;

    const [hasIncomingCall, setHasIncomingCall] = useState(false);
    const [hasOutgoingCall, setHasOutgoingCall] = useState(false);

    useEffect(() => {
        (async () => {
            const audio = localAudio.current;
            simpleUser = getSIPSimpleUser({
                localVid: localVid.current,
                remoteVid: remoteVid.current,
                remoteAudio: remoteAudio.current,
                userID: "1000", // hardcoded
                userPassword: "1234", // hardcoded
                sipServer: process.env.SIP_SWITCH_HOST!,
                delegate: {
                    async onCallReceived() {
                        setHasIncomingCall(true);
                        setHasOutgoingCall(false);
                        if (audio) {
                            audio.pause();
                            audio.src = phoneReceivedSound;
                            try {
                                await audio.play();
                            } catch (err) {
                                console.error(err);
                            }
                        }
                    },
                    async onCallAnswered() {
                        setHasIncomingCall(false);
                        setHasOutgoingCall(false);
                        if (audio) {
                            await audio.pause();
                        }
                    },
                    async onCallHangup() {
                        setHasIncomingCall(false);
                        setHasOutgoingCall(false);
                        if (audio) {
                            await audio.pause();
                        }
                    },
                    onServerDisconnect() {
                        setHasIncomingCall(false);
                        setHasOutgoingCall(false);
                        console.log("disconnected");
                    },
                },
            });

            // Connect to server
            await simpleUser.connect();

            // Register to receive inbound calls (optional)
            await simpleUser.register();
        })();

        return () =>
            (() => {
                if (simpleUser) {
                    simpleUser.disconnect();
                }
            })();
    }, []);

    const call = useCallback(async () => {
        const audio = localAudio.current;
        try {
            await simpleUser.call(`sip:1001@${process.env.SIP_SWITCH_HOST}`); // hardcoded
            setHasOutgoingCall(true);
            if (audio) {
                audio.src = phoneCallSound;
                try {
                    await audio.play();
                } catch (err) {
                    console.error(err);
                }
            }
        } catch (err) {
            setHasOutgoingCall(false);
            if (audio) {
                audio.pause();
            }
            alert(err);
        }
    }, []);

    const hangup = useCallback(async () => {
        try {
            await simpleUser.hangup();
        } catch (err) {
            alert(err);
        }
    }, []);

    const accept = useCallback(async () => {
        try {
            await simpleUser.answer();
        } catch (err) {
            alert(err);
        }
    }, []);

    return (
        <div className="d-flex flex-column align-items-center">
            <header>
                <h2>Employee profile</h2>
            </header>
            <section className="d-flex flex-column align-items-center">
                <video
                    id="remote-vid"
                    ref={remoteVid}
                    width="80%"
                    autoPlay
                    muted
                    playsInline
                ></video>
                <video
                    id="local-vid"
                    ref={localVid}
                    width="40%"
                    autoPlay
                    playsInline
                    muted
                    className="mt-3"
                ></video>
                <audio id="remote-audio" ref={remoteAudio}></audio>
                <audio id="local-audio" ref={localAudio} loop></audio>
            </section>
            <section>
                {hasOutgoingCall && (
                    <div className="d-flex align-items-center mt-4">
                        <div className="pulse pulse_blue"></div>
                        <div>Calling</div>
                    </div>
                )}
                {hasIncomingCall && (
                    <div className="d-flex align-items-center mt-4">
                        <div className="pulse pulse_green"></div>
                        <div>Incoming call</div>
                    </div>
                )}
            </section>
            <section className="mt-4">
                <div
                    className="btn-group"
                    role="group"
                    aria-label="Call buttons"
                >
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="button"
                        onClick={call}
                    >
                        Call
                    </button>
                    <button
                        type="button"
                        className="btn btn-success ms-2"
                        data-bs-toggle="button"
                        aria-pressed="true"
                        onClick={accept}
                    >
                        Accept
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger ms-2"
                        data-bs-toggle="button"
                        onClick={hangup}
                    >
                        Hang up
                    </button>
                </div>
            </section>
            <footer className="mt-4">A portfolio by Jason Cheng</footer>
        </div>
    );
};

export default Home;
