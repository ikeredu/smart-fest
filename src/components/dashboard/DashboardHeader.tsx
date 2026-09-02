'use client';

import React from 'react';
import Link from 'next/link';
import UserProfileMenu from './UserProfileMenu';

interface DashboardHeaderProps {
  userName: string;
  userEmail: string;
  userRole: string;
  avatarUrl?: string | null;
  breadcrumb?: {
    label: string;
    href?: string;
  };
}

export default function DashboardHeader({
  userName,
  userEmail,
  userRole,
  avatarUrl,
  breadcrumb,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-8 py-2.5 sm:py-3 bg-[var(--bg-card)]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 shadow-xs transition-colors duration-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Lado Izquierdo: Marca Smart-Fest + Badge de Rol o Breadcrumb */}
        <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
          <Link
            href="/dashboard"
            className="text-lg sm:text-xl font-bold tracking-tight text-[var(--text-main)] hover:opacity-85 transition-opacity shrink-0"
          >
            Smart-Fest
          </Link>

          {breadcrumb ? (
            <div className="flex items-center space-x-2 min-w-0 text-xs">
              <span className="text-[var(--text-muted)]">/</span>
              {breadcrumb.href ? (
                <Link
                  href={breadcrumb.href}
                  className="font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors truncate max-w-[130px] sm:max-w-[240px]"
                >
                  {breadcrumb.label}
                </Link>
              ) : (
                <span className="font-medium text-[var(--text-main)] truncate max-w-[130px] sm:max-w-[240px]">
                  {breadcrumb.label}
                </span>
              )}
            </div>
          ) : (
            <span className="text-[10px] uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-semibold shrink-0">
              {userRole}
            </span>
          )}
        </div>

        {/* Lado Derecho: Menú Unificado de Perfil (Avatar + Tema + Logout) */}
        <div className="shrink-0 flex items-center">
          <UserProfileMenu
            userName={userName}
            userEmail={userEmail}
            userRole={userRole}
            avatarUrl={avatarUrl}
          />
        </div>
      </div>
    </header>
  );
}
