import {FC, useEffect, useState} from 'react';
import {LocalStorageEnum} from '../../../enum/local-storage.enum.ts';
import {AgentInfoModel} from '../../../models/agent-info.model.ts';
import './dashboard.css';

interface DashboardProps { }

export const Dashboard: FC<DashboardProps> = () => {

    const [agent, setAgent] = useState<AgentInfoModel | null>(null);
    const storageAgent = localStorage.getItem(LocalStorageEnum.AGENT);

    useEffect(() => {
        if (storageAgent != null) {
            setAgent(JSON.parse(storageAgent));
        }
    }, [storageAgent]);

    return (
        <>
            <h2 className="title-3xl mb-10">Dashboard</h2>
            {/* Agent info */}
            <section>
                <h3 className="title-2xl">Agent info</h3>
                <ul className="dashboard">
                    {Object.keys(agent ?? {}).map((key, i) => (
                        <li className="dashboard__item" key={i}><b>{key}:</b> {agent ? agent[key as keyof AgentInfoModel] : ''}</li>
                    ))}
                </ul>
            </section>
        </>
    );
}
