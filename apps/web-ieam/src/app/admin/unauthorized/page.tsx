export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen bg-[#0A2540] flex items-center justify-center p-4">
            <div className="text-center text-white max-w-sm">
                <p className="text-5xl mb-4">🔒</p>
                <h1 className="text-2xl font-bold mb-2">Acceso restringido</h1>
                <p className="text-slate-300 mb-6">
                    No tienes permisos de editor en esta organización.
                </p>
                <a
                    href="/admin/login"
                    className="inline-block bg-white text-[#0A2540] px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-slate-100 transition-colors"
                >
                    Volver al inicio de sesión
                </a>
            </div>
        </div>
    );
}
