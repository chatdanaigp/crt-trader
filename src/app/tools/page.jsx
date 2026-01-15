'use client';

import Navbar from '@/components/Navbar';
import ToolsDocumentation from '@/components/ToolsDocumentation';
import Footer from '@/components/Footer';

export default function ToolsPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <div className="pt-20">
                <ToolsDocumentation />
            </div>
            <Footer />
        </main>
    );
}
