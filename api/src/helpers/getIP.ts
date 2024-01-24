import { Request } from "express";

const getIP = (req: Request): string => {
    const ip = req.ip || req.socket.remoteAddress;

    return ip as string;
};

export default getIP;
