
import React from 'react';

const AboutSection = () => {
    return (
        <section id="about" className="py-20 container max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 animate-slide-up [animation-delay:200ms]">
                    <h2 className="text-3xl font-medium mb-6">About Me</h2>
                    <div className="space-y-4 text-muted-foreground">
                        <p>
                            I'm a passionate developer with expertise in building interactive
                            web applications and AI-powered solutions. My work combines technical
                            proficiency with creative problem-solving to deliver exceptional user experiences.
                        </p>
                        <p>
                            With experience in frontend development, cloud functions, and AI integration,
                            I create solutions that are not only functional but also intuitive and elegant.
                        </p>
                        <p>
                            When I'm not coding, you can find me exploring new technologies,
                            contributing to open-source projects, or continuing my learning journey
                            in the ever-evolving tech landscape.
                        </p>
                    </div>
                </div>

                <div className="order-1 md:order-2 flex justify-center animate-slide-up [animation-delay:400ms]">
                    <div className="relative w-64 h-64 md:w-80 md:h-80">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full animate-float"></div>
                        <div className="absolute inset-4 bg-gradient-to-tr from-accent/40 to-accent/10 rounded-full animate-float [animation-delay:1s]"></div>
                        <div className="absolute inset-8 glass rounded-full flex items-center justify-center animate-float [animation-delay:2s]">
                            <span className="text-6xl md:text-7xl">👨‍💻</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                    {
                        title: "Web Development",
                        description: "Building modern, responsive web applications with React, TypeScript, and other cutting-edge technologies."
                    },
                    {
                        title: "Cloud Solutions",
                        description: "Developing and deploying scalable solutions using Google Cloud Functions and other cloud services."
                    },
                    {
                        title: "AI Integration",
                        description: "Incorporating artificial intelligence into applications to create intelligent, responsive user experiences."
                    }
                ].map((skill, index) => (
                    <div
                        key={index}
                        className="glass p-6 rounded-xl animate-slide-up"
                        style={{ animationDelay: `${(index + 1) * 200}ms` }}
                    >
                        <h3 className="text-xl font-medium mb-2">{skill.title}</h3>
                        <p className="text-muted-foreground">{skill.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AboutSection;