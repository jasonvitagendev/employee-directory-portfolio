import {useCallback, useEffect, useRef} from "react";
import {getSIPSimpleUser} from "helpers/getSIPSimpleUser";
import {SimpleUser} from "sip.js/lib/platform/web";
import phoneCallSound from "static/sounds/phone-call.mp3";
import phoneReceivedSound from "static/sounds/synth-telephone-ring.mp3";

interface Props {
    setShowModal: (show: boolean) => void;
}

const CallModal = ({setShowModal}: Props) => {
    const localVid = useRef<HTMLVideoElement>(null);
    const remoteVid = useRef<HTMLVideoElement>(null);
    const remoteAudio = useRef<HTMLAudioElement>(null);
    const localAudio = useRef<HTMLAudioElement>(null);

    const simpleUserRef = useRef<SimpleUser>();
    let simpleUser = simpleUserRef.current!;

    useEffect(() => {
        (async () => {
            const audio = localAudio.current;
            simpleUser = getSIPSimpleUser({
                localVid: localVid.current,
                remoteVid: remoteVid.current,
                remoteAudio: remoteAudio.current,
                userID: "1001", // hardcoded
                userPassword: "1234", // hardcoded
                sipServer: process.env.SIP_SWITCH_HOST!,
                delegate: {
                    async onCallReceived() {
                        if (audio) {
                            audio.pause();
                            audio.src = phoneReceivedSound;
                            try {
                                await audio.play();
                            } catch (err) {
                                alert(err);
                            }
                        }
                    },
                    async onCallAnswered() {
                        if (audio) {
                            console.log(111, "answered");

                            await audio.pause();
                        }
                    },
                    async onCallHangup() {
                        if (audio) {
                            console.log(111, "hangup");
                            await audio.pause();
                        }
                    },
                    onServerDisconnect() {
                        alert("disconnected");
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
            await simpleUser.call(`sip:1000@${process.env.SIP_SWITCH_HOST}`); // hardcoded
            if (audio) {
                audio.src = phoneCallSound;
                try {
                    await audio.play();
                } catch (err) {
                    alert(err);
                }
            }
        } catch (err) {
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
        <div
            className="modal fade"
            style={{display: "block"}}
            tabIndex={-1}
            aria-labelledby="call modal"
        >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                            Call
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={() => setShowModal(false)}
                        >
                            ✕
                        </button>
                    </div>
                    <div className="modal-body">
                        <section className="d-flex flex-column align-items-center">
                            <video
                                id="remote-vid"
                                ref={remoteVid}
                                width="80%"
                                autoPlay
                            ></video>
                            <video
                                id="local-vid"
                                ref={localVid}
                                width="40%"
                                autoPlay
                                className="mt-3"
                            ></video>
                            <audio id="remote-audio" ref={remoteAudio}></audio>
                            <audio
                                id="local-audio"
                                ref={localAudio}
                                loop
                            ></audio>
                        </section>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
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
                </div>
            </div>
        </div>
    );
};

export default CallModal;
