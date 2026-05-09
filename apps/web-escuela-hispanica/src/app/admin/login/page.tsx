import LoginForm from './LoginForm';

export default async function AdminLoginPage({
    searchParams,
}: {
    searchParams: Promise<{ redirect?: string }>;
}) {
    const params = await searchParams;
    const redirectTo = params.redirect ?? '/admin';

    return (
        <div className="min-h-screen bg-[#050a14] flex items-center justify-center p-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-[#c5a059] rounded-xl mb-4 text-[#050a14] font-bold text-lg">EH</div>
                    <h1 className="text-white text-xl font-bold">EH Admin</h1>
                    <p className="text-white/60 text-sm mt-1">Acceso restringido a editores y administradores</p>
                </div>

                <LoginForm redirectTo={redirectTo} />
            </div>
        </div>
    );
}