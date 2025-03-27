import React, { useEffect } from 'react';
import { ChatProvider } from '@/context/ChatContext';
import NavBar from '@/components/NavBar';
import ChatInterface from '@/components/ChatInterface';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
const Index = () => {
    // Smooth scroll functionality for navigation
    useEffect(() => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (!targetId) return;
                const targetElement = document.querySelector(targetId);
                if (!targetElement) return;
                window.scrollTo({
                    top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
                    // Offset for navbar
                    behavior: 'smooth'
                });
            });
        });
    }, []);
    return <ChatProvider>
        <div className="min-h-screen bg-background">
            <NavBar />

            {/* Hero/Chat Section */}
            <section id="home" className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 text-center mb-12">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-4 animate-slide-down">
                        Welcome to My Portfolio
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-slide-down [animation-delay:150ms]">Chat with my AI assistant to learn more about my skills and experience and even some personal opinions of mine</p>
                </div>

                <div className="w-full px-4 animate-slide-up [animation-delay:300ms]">
                    <ChatInterface />
                </div>
            </section>

            <AboutSection />
            <ContactSection />
        </div>
    </ChatProvider>;
};
export default Index;