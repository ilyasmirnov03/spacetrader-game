import {FC, useEffect, useState} from 'react';
import {LocalStorageEnum} from '../../../enum/local-storage.enum.ts';
import {AgentInfo} from '../../../models/agent-info.ts';
import './dashboard.css';

interface DashboardProps { }

export const Dashboard: FC<DashboardProps> = () => {

    const [agent, setAgent] = useState<AgentInfo | null>(null);
    const storageAgent = localStorage.getItem(LocalStorageEnum.AGENT);

    useEffect(() => {
        if (storageAgent != null) {
            setAgent(JSON.parse(storageAgent));
        }
    }, [storageAgent]);

    return (
        <>
            <h2>Dashboard</h2>
            {/* Agent info */}
            <section>
                <h3>Agent info</h3>
                <ul className="dashboard">
                    {Object.keys(agent ?? {}).map((key, i) => (
                        <li className="dashboard__item" key={i}><b>{key}:</b> {agent ? agent[key as keyof AgentInfo] : ''}</li>
                    ))}
                </ul>
            </section>
        </>
    );
}
