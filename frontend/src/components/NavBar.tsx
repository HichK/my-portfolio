import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type NavLink = {
    title: string;
    href: string;
    target?: string;
};

const links: NavLink[] = [{
    title: 'Home',
    href: '#home'
}, {
    title: 'About',
    href: '#about'
}, {
    title: 'Contact',
    href: '#contact'
}];

const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Track scroll position to change navbar style
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when clicking a link
    const handleLinkClick = () => {
        setMobileMenuOpen(false);
    };

    return <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out', isScrolled ? 'py-3 glass-darker shadow-sm' : 'py-5 bg-transparent')}>
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
            {/* Logo/Brand */}
            <a href="#home" className="text-xl font-medium tracking-tight transition-colors hover:text-primary/80" onClick={handleLinkClick}>Hicham Khawand's Portfolio</a>

            {/* Desktop Navigation */}
            <nav className="hidden sm:flex items-center space-x-1">
                {links.map(link => <a key={link.href} href={link.href} target={link.target} className="px-4 py-2 text-sm transition-colors rounded-md hover:bg-secondary">
                    {link.title}
                </a>)}
            </nav>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="sm:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X /> : <Menu />}
            </Button>


        </div>

        {/* Mobile Navigation - Ensure it's always fully opaque */}
        <div className={cn('fixed inset-0 top-[57px] z-50 sm:hidden', 'transform transition-transform duration-300 ease-in-out', mobileMenuOpen ? 'translate-x-0' : 'translate-x-full')}>
            <nav className="flex flex-col items-center pt-10 space-y-4 bg-white dark:bg-black">
                {links.map(link => <a key={link.href} href={link.href} target={link.target} className="px-4 py-2 text-lg transition-colors rounded-md hover:bg-secondary w-[80%] text-center" onClick={handleLinkClick}>
                    {link.title}
                </a>)}
            </nav>
        </div>
    </header>;
};

export default NavBar;
