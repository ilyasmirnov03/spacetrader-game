import { FC } from 'react';
import { AgentInfoModel } from '../../../models/agent-info.model.ts';
import './dashboard.css';
import { useAuth } from '../../../hooks/auth/useAuth.tsx';

interface DashboardProps { }

export const Dashboard: FC<DashboardProps> = () => {

    const auth = useAuth();

    return (
        <>
            <h2 className="title-3xl mb-10">Dashboard</h2>
            {/* Agent info */}
            <section>
                <h3 className="title-2xl">Agent info</h3>
                <ul className="dashboard">
                    {Object.keys(auth.agent ?? {}).map((key) => (
                        <li className="dashboard__item" key={key}><b>{key}:</b> {auth.agent ? auth.agent[key as keyof AgentInfoModel] : ''}</li>
                    ))}
                </ul>
            </section>
        </>
    );
}
