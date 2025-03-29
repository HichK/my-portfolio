import React, { useEffect } from 'react';
import { ChatProvider } from '@/context/ChatContext';
import NavBar from '@/components/NavBar';
import ChatInterface from '@/components/ChatInterface';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import ScrollingGears from '@/components/ScrollingGears';

const Index = () => {
    useEffect(() => {
        // Smooth scroll functionality for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (!targetId) return;
                const targetElement = document.querySelector(targetId);
                if (!targetElement) return;
                window.scrollTo({
                    top: targetElement.getBoundingClientRect().top + window.scrollY - 80, // Offset for navbar
                    behavior: 'smooth'
                });
            });
        });

        // Scroll to the section if there's a hash in the URL on page load
        const hash = window.location.hash;
        if (hash) {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.getBoundingClientRect().top + window.scrollY - 80, // Offset for navbar
                    behavior: 'smooth'
                });
            }
        }
    }, []);
    return <ChatProvider>
        <div className="h-auto bg-background">
            <NavBar />

            <section id="gears" className="h-0 mt-0">
                {/* Add our ScrollingGears component */}
                <ScrollingGears />
            </section>


            {/* Hero/Chat Section */}

            <section id="home" className="h-auto pt-12 pb-0 flex flex-col items-center justify-center">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 text-center mb-12 mt-9">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-4 animate-slide-down">
                        Welcome to Hicham's Portfolio
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-slide-down [animation-delay:150ms]">Chat with my virtual self to learn more about my skills and experience and even some personal opinions of mine</p>
                </div>

                <div className="w-full px-4 animate-slide-up [animation-delay:300ms] mb-0">
                    <ChatInterface />
                </div>
            </section>


            <section id="about" className="h-auto mt-0">
                <AboutSection />
            </section>

            <section id="contact" className="h-auto mt-0">
                <ContactSection />
            </section>


        </div>
    </ChatProvider>;
};
export default Index;