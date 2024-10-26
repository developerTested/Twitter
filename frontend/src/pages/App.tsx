import React from 'react'
import Home from './Home';
import Welcome from './Welcome';
import { useAppSelector } from '@/hooks';

export default function App() {
    const { loggedIn } = useAppSelector(state => state.auth);

    return (
        <React.Fragment>
            {loggedIn ? <Home /> : <Welcome />}
        </React.Fragment>
    )
}
