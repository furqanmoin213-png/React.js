import Card from './Card';

const User = () => {
    const profiles = [
  {
    id: 1,
    status: "available",
    hourlyRate: 55,
    name: "Wade Wilson",
    designation: "UI/UX Designer",
    company: "Epic Coders",
    image: "deadpool.jpg",
    skills: ["UI", "UX", "Photoshop"],
    additionalSkills: 5,
    description: "Creative UI/UX designer with expertise in user-centered design."
  },
  {
    id: 2,
    status: "available",
    hourlyRate: 60,
    name: "Ali Khan",
    designation: "Frontend Developer",
    company: "Code Masters",
    image: "ali.jpg",
    skills: ["HTML", "CSS", "JavaScript"],
    additionalSkills: 4,
    description: "Passionate frontend developer creating responsive web applications."
  },
  {
    id: 3,
    status: "busy",
    hourlyRate: 70,
    name: "Ahmed Raza",
    designation: "Backend Developer",
    company: "Tech Solutions",
    image: "ahmed.jpg",
    skills: ["Node.js", "Express", "MongoDB"],
    additionalSkills: 3,
    description: "Experienced backend developer specializing in scalable APIs."
  },
  {
    id: 4,
    status: "available",
    hourlyRate: 65,
    name: "Fatima Noor",
    designation: "Full Stack Developer",
    company: "Dev Hub",
    image: "fatima.jpg",
    skills: ["React", "Node.js", "MySQL"],
    additionalSkills: 6,
    description: "Full stack engineer building modern web applications."
  },
  {
    id: 5,
    status: "available",
    hourlyRate: 50,
    name: "Hassan Ali",
    designation: "Graphic Designer",
    company: "Creative Studio",
    image: "hassan.jpg",
    skills: ["Illustrator", "Photoshop", "Figma"],
    additionalSkills: 2,
    description: "Graphic designer focused on branding and visual identity."
  },
  {
    id: 6,
    status: "busy",
    hourlyRate: 75,
    name: "Sara Ahmed",
    designation: "Mobile App Developer",
    company: "AppWorks",
    image: "sara.jpg",
    skills: ["Flutter", "Dart", "Firebase"],
    additionalSkills: 4,
    description: "Building high-performance cross-platform mobile applications."
  },
  {
    id: 7,
    status: "available",
    hourlyRate: 58,
    name: "Usman Tariq",
    designation: "WordPress Developer",
    company: "Web Creators",
    image: "usman.jpg",
    skills: ["WordPress", "PHP", "Elementor"],
    additionalSkills: 3,
    description: "Creating professional and optimized WordPress websites."
  },
  {
    id: 8,
    status: "available",
    hourlyRate: 80,
    name: "Ayesha Malik",
    designation: "Data Scientist",
    company: "AI Labs",
    image: "ayesha.jpg",
    skills: ["Python", "Machine Learning", "SQL"],
    additionalSkills: 7,
    description: "Data scientist transforming data into actionable insights."
  },
  {
    id: 9,
    status: "busy",
    hourlyRate: 68,
    name: "Bilal Sheikh",
    designation: "DevOps Engineer",
    company: "Cloud Experts",
    image: "bilal.jpg",
    skills: ["Docker", "Kubernetes", "AWS"],
    additionalSkills: 5,
    description: "Automating deployments and managing cloud infrastructure."
  },
  {
    id: 10,
    status: "available",
    hourlyRate: 62,
    name: "Zainab Iqbal",
    designation: "QA Engineer",
    company: "Quality First",
    image: "zainab.jpg",
    skills: ["Selenium", "Cypress", "Testing"],
    additionalSkills: 4,
    description: "Ensuring software quality through automated and manual testing."
  }
];
  return (
    <>
        {
           profiles.map(elem =>(
            <div key={elem.id}>
                <Card profile={elem}/>
            </div>
           )) 
        }
        
    </>
  )
}

export default User