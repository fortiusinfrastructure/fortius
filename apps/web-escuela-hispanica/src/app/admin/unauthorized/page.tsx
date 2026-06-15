import Link from 'next/link';

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen bg-[#050a14] flex items-center justify-center p-4">
            <div className="text-center text-white max-w-sm">
                <p className="text-5xl mb-4">🔒</p>
                <h1 className="text-2xl font-bold mb-2">Acceso restringido</h1>
                <p className="text-white/70 mb-6">Tu usuario no tiene permisos administrativos en Escuela Hispánica.</p>
                <Link href="/admin/login" className="inline-block bg-[#c5a059] text-[#050a14] px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-white transition-colors">Volver al inicio de sesión</Link>
            </div>
        </div>
    );
}