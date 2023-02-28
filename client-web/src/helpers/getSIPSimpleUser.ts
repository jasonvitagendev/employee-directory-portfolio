import {
    SimpleUser,
    SimpleUserDelegate,
    SimpleUserOptions,
} from "sip.js/lib/platform/web";

interface Options {
    sipServer: string;
    userID: string;
    userPassword: string;
    localVid?: HTMLVideoElement | null;
    remoteVid?: HTMLVideoElement | null;
    remoteAudio?: HTMLAudioElement | null;
    delegate?: SimpleUserDelegate;
}

export const getSIPSimpleUser = ({
    sipServer,
    userID,
    userPassword,
    localVid,
    remoteVid,
    remoteAudio,
    delegate,
}: Options) => {
    const server = `wss://${sipServer}`;
    const aor = `sip:${userID}@${sipServer}`;
    const authorizationUsername = userID;
    const authorizationPassword = userPassword;

    const options: SimpleUserOptions = {
        aor,
        media: {
            remote: {
                audio: remoteAudio ?? undefined,
                video: remoteVid ?? undefined,
            },
            local: {
                video: localVid ?? undefined,
            },
            constraints: {
                video: true,
                audio: true,
            },
        },
        userAgentOptions: {
            authorizationPassword,
            authorizationUsername,
        },
        delegate,
    };

    return new SimpleUser(server, options);
};
