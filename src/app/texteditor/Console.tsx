import React, { useState, useEffect } from 'react'
import { Console, Hook, Unhook } from 'console-feed'
import { Message } from 'console-feed/lib/definitions/Console';
import { useTheme } from "next-themes";
import {Variants} from 'console-feed/lib/definitions/Component'

const LogsContainer = () => {
    const {theme,setTheme} = useTheme();
    const [logs, setLogs] = useState<Message[]>([]);
    let themeVariant:Variants = theme === "dark" ? "dark" : "light";

    // run once!
    useEffect((): (() => void) => {
        const hookedConsole = Hook(
            window.console,
            (log) => setLogs((currLogs) => [...currLogs, { ...log, id: Math.random().toString() }]),
            false
        );
        return () => Unhook(hookedConsole);
    }, []);

    // Add the 'id' property to each message in the 'logs' array
    const formattedLogs = logs.map((log) => ({ ...log, id: Math.random().toString() }));

    return <Console logs={formattedLogs.map(log => ({...log, data: log.data || []}))} variant={themeVariant} />;
};

export { LogsContainer }