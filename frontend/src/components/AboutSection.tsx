
import React from 'react';
import MeOnLaptop from '@/assets/images/Me_on_laptop.png';

const AboutSection = () => {
    return (
        <section id="about" className="py-20 container max-w-7xl mx-auto px-4 sm:px-6 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="order-2 md:order-1 animate-slide-up [animation-delay:200ms]">
                    <h2 className="text-3xl font-medium mb-6">About Me</h2>
                    <div className="space-y-4 text-muted-foreground">
                        <p>
                            I am a Senior Software Engineer with a strong foundation in automation, electrical systems, and cloud-based MES integration.
                            Over the years, I have been at the crossroads of manufacturing and digitalization, driving factory optimization through a seamless blend of automation, cloud computing, and machine intelligence.
                        </p>
                        <p>
                            Before joining Northvolt, I spent more than a decade at Technica International, where I led R&D efforts, delivered over 60 automation projects globally,
                            and developed cutting-edge IoT and machine vision systems.
                        </p>
                        <p>
                            I am passionate about problem-solving, innovation, and learning.
                            Whether it's developing VR/AR applications, exploring the world of edge computing, or automating mechanical designs,
                            I always seek challenges that push me beyond the conventional.
                        </p>
                    </div>
                </div>

                <div className="order-1 md:order-2 flex justify-center animate-slide-up [animation-delay:400ms]">
                    <div className="relative w-64 h-64 md:w-80 md:h-80">
                        <div className="absolute inset-2 glass rounded-full flex items-center justify-center overflow-hidden">
                            <img
                                src={MeOnLaptop}
                                alt="Couldn't find picture"
                                className="rounded-full w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 rounded-full border-[20px] from-accent/40 to-accent/10 border-background animate-float">
                            <div className="absolute inset-0 rounded-full border-[20px] from-accent/40 to-accent/10 border-background opacity-50">
                                <div className="absolute inset-0 rounded-full border-[20px] from-accent/40 to-accent/10 border-background opacity-30">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {[
                    {
                        title: "Automation & Control",
                        description: "Expert in PLC programming (Siemens, Rockwell), SCADA (TIA Portal, WinCC, FactoryTalk), robotics (KUKA, ABB, Fanuc), and industrial automation. Delivered 60+ commissioned projects in food & beverage and battery industries."
                    },
                    {
                        title: "Simulation & Software Integration",
                        description: "Skilled in MES integration, factory digitalization, Unity3D simulations, machine vision, and cloud-edge systems (AWS, OPC-UA). Bridging factory data with cloud platforms for OEE and traceability."
                    },
                    {
                        title: "Technical Leadership",
                        description: "Hands-on technical lead with experience in mentoring engineers, leading automation teams, and solving critical factory-floor challenges under pressure."
                    }
                ].map((skill, index) => (
                    <div
                        key={index}
                        className="glass p-6 rounded-xl animate-slide-up"
                        style={{
                            animationDelay: `${(index + 1) * 200}ms`,
                            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Transparent background
                        }}
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