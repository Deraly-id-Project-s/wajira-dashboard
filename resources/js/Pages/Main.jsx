import HomePage from '@/Components/pages/HomePage';
import { Head } from '@inertiajs/react';

export default function Main({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <HomePage />
        </>
    );
}