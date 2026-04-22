'use client';

import React, { useState } from 'react';
import {
    LayoutDashboard,
    FileText,
    CalendarDays,
    LogOut,
    Menu,
    X,
    ChevronRight,
} from 'lucide-react';

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    active?: boolean;
}

interface AdminShellProps {
    children: React.ReactNode;
    orgName: string;
    orgSlug: string;
    currentPath: string;
    userEmail?: string;
    onSignOut?: () => void;
}

const NAV_ITEMS = (orgSlug: string): NavItem[] => [
    {
        label: 'Panel',
        href: '/admin',
        icon: <LayoutDashboard size={16} />,
    },
    {
        label: 'Artículos',
        href: '/admin/articles',
        icon: <FileText size={16} />,
    },
    {
        label: 'Eventos',
        href: '/admin/events',
        icon: <CalendarDays size={16} />,
    },
];

export function AdminShell({
    children,
    orgName,
    orgSlug,
    currentPath,
    userEmail,
    onSignOut,
}: AdminShellProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navItems = NAV_ITEMS(orgSlug);

    const SidebarContent = () => (
        <nav className="flex flex-col h-full">
            {/* Logo */}
            <div className="px-6 py-5 border-b border-slate-700">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-red-500 rounded flex items-center justify-center text-white font-bold text-xs">
                        {orgName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-white font-semibold text-sm leading-none">{orgName}</p>
                        <p className="text-slate-400 text-xs mt-0.5">CMS Admin</p>
                    </div>
                </div>
            </div>

            {/* Nav links */}
            <div className="flex-1 px-3 py-4 space-y-0.5">
                {navItems.map((item) => {
                    const isActive =
                        item.href === '/admin'
                            ? currentPath === '/admin'
                            : currentPath.startsWith(item.href);

                    return (
                        <a
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                isActive
                                    ? 'bg-white/10 text-white'
                                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <span className={isActive ? 'text-white' : 'text-slate-400'}>
                                {item.icon}
                            </span>
                            {item.label}
                            {isActive && (
                                <ChevronRight size={14} className="ml-auto text-slate-400" />
                            )}
                        </a>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="px-4 py-4 border-t border-slate-700">
                {userEmail && (
                    <p className="text-slate-400 text-xs mb-3 truncate">{userEmail}</p>
                )}
                {onSignOut && (
                    <button
                        onClick={onSignOut}
                        className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors w-full"
                    >
                        <LogOut size={15} />
                        Cerrar sesión
                    </button>
                )}
            </div>
        </nav>
    );

    return (
        <div className="flex h-screen bg-slate-50 font-sans">
            {/* Desktop sidebar */}
            <aside className="hidden lg:flex flex-col w-56 bg-[#0A2540] flex-shrink-0">
                <SidebarContent />
            </aside>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="lg:hidden fixed inset-0 z-40 flex">
                    <div
                        className="fixed inset-0 bg-black/50"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <aside className="relative z-50 flex flex-col w-56 bg-[#0A2540]">
                        <SidebarContent />
                    </aside>
                </div>
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile top bar */}
                <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-slate-600 hover:text-slate-900"
                    >
                        <Menu size={20} />
                    </button>
                    <span className="font-semibold text-sm text-slate-900">{orgName} Admin</span>
                    <div className="w-5" />
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}
