
import React from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactSection = () => {
    return (
        <section id="contact" className="py-20 container max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 animate-slide-up">
                <h2 className="text-3xl font-medium mb-4">Get In Touch</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    I'm always open to new opportunities, collaborations, or just a friendly chat.
                    Feel free to reach out through any of the channels below.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
                <a
                    href="mailto:hicham.khawand@gmail.com"
                    className="animate-slide-up [animation-delay:200ms]"
                >
                    <Button className="flex items-center space-x-2 h-14 px-6">
                        <Mail className="h-5 w-5" />
                        <span>Email Me</span>
                    </Button>
                </a>

                <a
                    href="https://github.com/HichK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="animate-slide-up [animation-delay:400ms]"
                >
                    <Button variant="outline" className="flex items-center space-x-2 h-14 px-6">
                        <Github className="h-5 w-5" />
                        <span>GitHub</span>
                    </Button>
                </a>

                <a
                    href="https://www.linkedin.com/in/hicham-khawand/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="animate-slide-up [animation-delay:600ms]"
                >
                    <Button variant="outline" className="flex items-center space-x-2 h-14 px-6">
                        <Linkedin className="h-5 w-5" />
                        <span>LinkedIn</span>
                    </Button>
                </a>
            </div>

            <div className="glass rounded-xl p-8 text-center max-w-3xl mx-auto animate-slide-up [animation-delay:800ms]">
                <h3 className="text-xl font-medium mb-4">Let's Work Together</h3>
                <p className="mb-6 text-muted-foreground">
                    Whether you're looking for an experienced engineer or a developer for your next project, want to collaborate on something exciting,
                    or just want to say hi, I'd love to hear from you.
                </p>
                <div className="text-sm text-muted-foreground">
                    Made with precision and care, with Lovable as a base and custom enhancements. © {new Date().getFullYear()}
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
