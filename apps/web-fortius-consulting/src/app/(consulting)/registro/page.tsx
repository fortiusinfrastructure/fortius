import type { Metadata } from 'next';
import SignupForm from './SignupForm';
import { SITE_NAME } from '@/lib/site-config';

export const metadata: Metadata = {
    title: `Crear cuenta — ${SITE_NAME}`,
    description: 'Regístrate en Fortius Consulting para acceder a nuestras herramientas y servicios premium.',
};

export default function SignupPage() {
    return (
        <main className="flex min-h-[calc(100vh-120px)] items-center justify-center px-4 py-12">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="font-serif text-3xl font-light italic">Crear cuenta</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Únete a Fortius Consulting para gestionar tus suscripciones.
                    </p>
                </div>

                <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-sm">
                    <SignupForm />
                </div>
            </div>
        </main>
    );
}
