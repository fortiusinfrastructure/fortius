import { Suspense } from 'react';
import LoginForm from './LoginForm';

export const metadata = {
    title: 'Acceso clientes — Fortius Consulting',
};

export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <h1 className="mb-8 text-center text-2xl font-semibold tracking-tight">
                    Área de clientes
                </h1>
                <Suspense>
                    <LoginForm />
                </Suspense>
            </div>
        </main>
    );
}
