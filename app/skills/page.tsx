import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Brain, Shield, GraduationCap, Server, Globe, BarChart } from "lucide-react"

export default function SkillsPage() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      skills: [
        {
          name: "Python",
          level: 95,
          description: "Advanced proficiency in Python for web development, data science, and automation",
        },
        { name: "PHP", level: 88, description: "Extensive experience in PHP for web application development" },
        { name: "JavaScript", level: 82, description: "Proficient in modern JavaScript and ES6+ features" },
        { name: "SQL", level: 90, description: "Expert-level database querying and optimization" },
        { name: "HTML/CSS", level: 85, description: "Strong foundation in web markup and styling" },
      ],
    },
    {
      title: "Data Science & Analytics",
      icon: Brain,
      skills: [
        {
          name: "Data Analysis",
          level: 92,
          description: "Statistical analysis and data interpretation using Python libraries",
        },
        { name: "Machine Learning", level: 88, description: "Experience with scikit-learn, pandas, and numpy" },
        {
          name: "Data Visualization",
          level: 85,
          description: "Creating insights through matplotlib, seaborn, and plotly",
        },
        { name: "Statistical Modeling", level: 80, description: "Predictive modeling and hypothesis testing" },
      ],
    },
    {
      title: "Database Technologies",
      icon: Database,
      skills: [
        { name: "MySQL", level: 92, description: "Database design, optimization, and administration" },
        { name: "PostgreSQL", level: 78, description: "Advanced SQL queries and database management" },
        { name: "MongoDB", level: 70, description: "NoSQL database design and operations" },
        { name: "Database Design", level: 88, description: "Normalization, indexing, and performance optimization" },
      ],
    },
    {
      title: "Cybersecurity",
      icon: Shield,
      skills: [
        {
          name: "Security Assessment",
          level: 75,
          description: "Vulnerability analysis and penetration testing basics",
        },
        {
          name: "Network Security",
          level: 70,
          description: "Understanding of network protocols and security measures",
        },
        { name: "Secure Coding", level: 82, description: "Implementing security best practices in development" },
        { name: "Risk Analysis", level: 78, description: "Identifying and mitigating security risks" },
      ],
    },
    {
      title: "Teaching & Education",
      icon: GraduationCap,
      skills: [
        { name: "Curriculum Development", level: 90, description: "Creating comprehensive programming courses" },
        { name: "Student Mentoring", level: 95, description: "Guiding students through their learning journey" },
        { name: "Technical Writing", level: 85, description: "Creating clear documentation and tutorials" },
        { name: "Workshop Facilitation", level: 88, description: "Leading hands-on coding workshops" },
      ],
    },
    {
      title: "Web Technologies",
      icon: Globe,
      skills: [
        { name: "React/Next.js", level: 80, description: "Modern frontend development with React ecosystem" },
        { name: "RESTful APIs", level: 88, description: "Designing and consuming web APIs" },
        { name: "Version Control (Git)", level: 90, description: "Advanced Git workflows and collaboration" },
        { name: "Cloud Platforms", level: 75, description: "Deployment on AWS, Vercel, and other platforms" },
      ],
    },
  ]

  const certifications = [
    "Python Institute PCAP Certification",
    "MySQL Database Administrator",
    "CompTIA Security+ (In Progress)",
    "AWS Cloud Practitioner (Planned)",
    "Certified Ethical Hacker (Studying)",
  ]

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Skills & Expertise</h1>
          <p className="text-xl text-gray-600">
            A comprehensive overview of my technical skills and professional capabilities
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Card key={index} className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{skill.name}</h4>
                        <span className="text-sm text-gray-500">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                      <p className="text-sm text-gray-600">{skill.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Professional Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-6 w-6 text-green-600" />
                Professional Highlights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">5+ years of professional development experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">Taught 200+ students programming fundamentals</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">Led multiple data science projects with measurable impact</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">Currently pursuing advanced cybersecurity studies</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">Active contributor to open-source projects</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-purple-600" />
                Certifications & Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Badge
                      variant={
                        cert.includes("Progress") || cert.includes("Studying") || cert.includes("Planned")
                          ? "outline"
                          : "default"
                      }
                    >
                      {cert.includes("Progress") || cert.includes("Studying") || cert.includes("Planned")
                        ? "In Progress"
                        : "Completed"}
                    </Badge>
                    <span className="text-gray-600">{cert}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tools & Technologies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-6 w-6 text-orange-600" />
              Tools & Technologies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                "VS Code",
                "PyCharm",
                "Git",
                "Docker",
                "Linux",
                "AWS",
                "Jupyter",
                "Pandas",
                "NumPy",
                "Scikit-learn",
                "TensorFlow",
                "Matplotlib",
                "Laravel",
                "CodeIgniter",
                "WordPress",
                "Bootstrap",
                "Tailwind CSS",
                "React",
                "Postman",
                "MySQL Workbench",
                "phpMyAdmin",
                "Wireshark",
                "Burp Suite",
                "Metasploit",
              ].map((tool, index) => (
                <Badge key={index} variant="outline" className="justify-center p-2">
                  {tool}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
