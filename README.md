# Glitch & Grit

**Glitch & Grit  is a modern, accessible client-site web design, created as the freelancing company. It features the creation of websites, designs, and digital experiences that elevate your brand and bring your vision to life.**

**This will solve the problem of small oragnization who cannot afford expensive developers fee or the freelancing agency who charge expensive fee to create even an small project . Here we provide a lot of budget option for the clinet according to their project demand.**

**This Freelancing Agency "Glitch & Grit " Will contain Home , Portfolio , Team , Testimonials , Contact to enquire about the project and budget with the team .**

**There will be 5 branches in total seperate for each page**
## 🏗️ Architecture

```mermaid
flowchart TD
    A["Frontend (HTML · CSS · Bootstrap)\nUI · Layout · Components"]
    B["JavaScript Logic\nForm Handling · Validation · Events"]
    C["jQuery\nDOM Manipulation · AJAX (optional)"]
    D["Local Storage\nSave Projects · User Data"]
    E["Session Storage\nTemporary Session ID · Page State"]
    F["Project Data JSON\nSkills · Portfolio Items"]
    G["Contact / Enquiry Form\nClient Messages"]
    H["Deployment\nGitHub Pages"]

    A -->|loads scripts| B
    A -->|Bootstrap styling| A
    B -->|DOM actions| C
    B -->|store/retrieve| D
    B -->|session id| E
    B -->|fetch projects| F
    A -->|submit enquiry| G

    G -->|store locally| D
    F -->|project list| A

    H -->|static hosting| A


