## File: Hicham_Khawand_detailed_experience

My Key Accomplishments:
1. **Emulator that worked for Sales (Technica)**  
In February 2021, I led a small software team of three engineers at an OEM machine manufacturing company. We had an opportunity to sell our first software-only product for tracking and tracing plastic pallets (more expensive than wooden ones) at a Dubai water bottle factory.
To pitch the idea, I developed a Unity-based emulator with a top-down GTA 2-style view, integrated with MongoDB. The emulator simulated forklifts, pallet scanning, and deliveries. Additionally, an early version of the Android app, designed for Zebra readers (our target product), dynamically updated in real-time based on the emulator's actions.  
The emulator was a success—it helped us secure the project! While it wasn’t reused, it demonstrated the power of a well-crafted emulator in effectively selling an idea.  

2. **Emulator that worked in Cutting Costs (Technica)**  
In 2016, we received our first layer mixing project, featuring six uniform pallet infeeds and two mixed pallet outfeeds. The robot was Kuka’s first 1000kg model, and while its control (and the overall line control) was challenging, the biggest hurdle was the algorithm. It had to determine which infeed to take from, ensuring no deadlocks, minimizing cycle time, and reducing forklift movements—a real chess game.  
To address this, I created a line emulator that simulated the infeeds and communicated via simple TCP/IP messages (for speed) with an old S7-300 PLC emulator (two emulators communicating). This allowed us to write and test code directly on the PLC before deployment.  
It took six months to develop but saved two months in physical testing and commissioning. Was it worth it? Absolutely. During commissioning, we had two engineers and two technicians in a foreign country, with additional expenses, incentives, and a customer holding payment until completion. The emulator significantly reduced risks, making the time investment well worth it.  

3. **Leading the Electrical and Automation Design of a Full ESS Manufacturing Line (Northvolt)**  
The line included several fully automated machines and 34 PLCs. Initially, I worked alone before being joined by an automation engineer whom I mentored through the project. Later, a newly recruited manager took over after eight months, as the workload was exhausting. However, I continued focusing on the MES communication aspect of the line.  
During this time, I served as the main automation lead, collaborating with several automation project managers and technical leads from the supplier side. I oversaw, discussed, and approved PLC control, electrical design, labeling, naming conventions, MES communication, network architecture, HMI control, and led design workshops.  
At the line commissioning in Poland, I led a small team to modify the PLC software of all 34 PLCs to ensure proper communication with our in-house MES system. It was rewarding to see the line operational, even if only for a few months, as Northvolt eventually went bankrupt. 

**Google foobar**  
In 2021, before the AI hype, Google’s Foobar challenge randomly popped up for me while I was searching online. I got to level 4 before pausing it out of fatigue. Later, I noticed a Google recruiter checked my LinkedIn profile, probably out of curiosity, but I assume my experience didn’t match the standard expectations for a SWE profile. It’s just another example of how my background doesn’t always reflect what I’m capable of.

**Why Did You Leave your old company?**  
Technica is a reputable company with strong values and was conveniently located near my home in Bikfaya, Lebanon. While they tried to create new roles to retain me, I felt saturated in my position. However, my decision to leave wasn’t due to Technica itself but rather the rapidly deteriorating economic situation in Lebanon.  
Despite earning a high salary that allowed me to afford solar panels for 24/7 electricity, periodic water purchases, and other necessities, the collapsing medical system, road safety, political instability, and overall security made it unsustainable. I needed a functioning government and a better future for my daughter and family, which led me to move to Sweden.