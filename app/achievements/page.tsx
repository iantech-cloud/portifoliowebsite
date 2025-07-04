import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Award, Star, Users, BookOpen, Code } from "lucide-react"

export default function AchievementsPage() {
  const achievements = [
    {
      category: "Professional Recognition",
      icon: Trophy,
      items: [
        {
          title: "Outstanding Developer Award",
          organization: "Tech Excellence Awards 2023",
          date: "December 2023",
          description:
            "Recognized for exceptional contributions to data science projects and innovative problem-solving approaches.",
          type: "Award",
        },
        {
          title: "Best Educator in Technology",
          organization: "Education Innovation Summit",
          date: "September 2023",
          description: "Honored for excellence in teaching programming and mentoring aspiring developers.",
          type: "Award",
        },
        {
          title: "Top Performer",
          organization: "Current Company",
          date: "2022, 2023",
          description: "Consistently exceeded performance targets and delivered high-impact projects.",
          type: "Recognition",
        },
      ],
    },
    {
      category: "Certifications",
      icon: Award,
      items: [
        {
          title: "Python Institute PCAP Certification",
          organization: "Python Institute",
          date: "March 2023",
          description:
            "Certified Associate in Python Programming - demonstrating proficiency in Python fundamentals and advanced concepts.",
          type: "Certification",
        },
        {
          title: "MySQL Database Administrator",
          organization: "Oracle",
          date: "January 2023",
          description: "Certified in MySQL database administration, optimization, and security best practices.",
          type: "Certification",
        },
        {
          title: "Data Science Professional Certificate",
          organization: "IBM",
          date: "November 2022",
          description:
            "Comprehensive certification covering machine learning, data analysis, and statistical modeling.",
          type: "Certification",
        },
        {
          title: "Cybersecurity Fundamentals",
          organization: "CompTIA",
          date: "August 2022",
          description: "Foundation certification in cybersecurity principles and practices.",
          type: "Certification",
        },
      ],
    },
    {
      category: "Academic Excellence",
      icon: BookOpen,
      items: [
        {
          title: "Dean's List",
          organization: "University",
          date: "2021-2022",
          description: "Maintained GPA above 3.8 while pursuing cybersecurity studies.",
          type: "Academic",
        },
        {
          title: "Research Publication",
          organization: "Journal of Cybersecurity",
          date: "June 2023",
          description: "Co-authored research paper on 'Machine Learning Applications in Threat Detection'.",
          type: "Publication",
        },
        {
          title: "Cybersecurity Scholarship Recipient",
          organization: "National Cybersecurity Foundation",
          date: "2022",
          description: "Awarded scholarship for outstanding academic performance and potential in cybersecurity field.",
          type: "Scholarship",
        },
      ],
    },
    {
      category: "Teaching & Mentorship",
      icon: Users,
      items: [
        {
          title: "Mentor of the Year",
          organization: "Coding Bootcamp",
          date: "2023",
          description: "Recognized for exceptional mentorship and student success rates in programming courses.",
          type: "Award",
        },
        {
          title: "200+ Students Taught",
          organization: "Various Institutions",
          date: "2020-Present",
          description:
            "Successfully taught Python programming and data analysis to over 200 students with 95% satisfaction rate.",
          type: "Milestone",
        },
        {
          title: "Curriculum Developer",
          organization: "Online Learning Platform",
          date: "2022-Present",
          description: "Developed comprehensive Python and data science curriculum adopted by multiple institutions.",
          type: "Achievement",
        },
      ],
    },
    {
      category: "Technical Achievements",
      icon: Code,
      items: [
        {
          title: "Open Source Contributor",
          organization: "GitHub",
          date: "2021-Present",
          description: "Active contributor to popular Python libraries with 500+ stars across repositories.",
          type: "Contribution",
        },
        {
          title: "Hackathon Winner",
          organization: "DataHack 2023",
          date: "May 2023",
          description: "First place in data science category for developing innovative customer analytics solution.",
          type: "Competition",
        },
        {
          title: "Security Vulnerability Discovery",
          organization: "Bug Bounty Program",
          date: "2023",
          description: "Discovered and reported critical security vulnerabilities in major web applications.",
          type: "Discovery",
        },
        {
          title: "Performance Optimization Expert",
          organization: "Current Role",
          date: "2022-Present",
          description: "Improved system performance by 40% through database optimization and code refactoring.",
          type: "Achievement",
        },
      ],
    },
    {
      category: "Community Impact",
      icon: Star,
      items: [
        {
          title: "Tech Conference Speaker",
          organization: "PyCon Regional",
          date: "2023",
          description: "Delivered keynote presentation on 'Python in Cybersecurity' to 500+ attendees.",
          type: "Speaking",
        },
        {
          title: "Workshop Facilitator",
          organization: "Women in Tech",
          date: "2022-Present",
          description: "Regular facilitator of coding workshops for underrepresented groups in technology.",
          type: "Volunteer",
        },
        {
          title: "Technical Blog Author",
          organization: "Medium & Dev.to",
          date: "2021-Present",
          description: "Published 50+ technical articles with 10K+ total views on programming and data science topics.",
          type: "Content",
        },
      ],
    },
  ]

  const stats = [
    { label: "Years of Experience", value: "5+", icon: Trophy },
    { label: "Students Taught", value: "200+", icon: Users },
    { label: "Projects Completed", value: "50+", icon: Code },
    { label: "Certifications Earned", value: "8", icon: Award },
  ]

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Achievements & Recognition</h1>
          <p className="text-xl text-gray-600">
            A comprehensive overview of my professional accomplishments, certifications, and contributions
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <IconComponent className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Achievements by Category */}
        <div className="space-y-12">
          {achievements.map((category, categoryIndex) => {
            const IconComponent = category.icon
            return (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <IconComponent className="h-6 w-6 text-blue-600" />
                  {category.category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.items.map((item, itemIndex) => (
                    <Card key={itemIndex} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                          <Badge variant="outline">{item.type}</Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          {item.organization} • {item.date}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Timeline View */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Achievement Timeline</h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gray-200"></div>
            <div className="space-y-8">
              {[
                {
                  year: "2023",
                  achievements: ["Outstanding Developer Award", "Best Educator in Technology", "Hackathon Winner"],
                },
                {
                  year: "2022",
                  achievements: ["Data Science Professional Certificate", "Cybersecurity Scholarship", "Top Performer"],
                },
                { year: "2021", achievements: ["Dean's List", "Open Source Contributor", "Technical Blog Author"] },
                {
                  year: "2020",
                  achievements: ["Started Teaching Career", "First Professional Role", "Python Certification"],
                },
              ].map((yearData, index) => (
                <div key={index} className="relative flex items-center">
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="ml-12 md:ml-0 md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="text-lg font-semibold mb-2">{yearData.year}</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {yearData.achievements.map((achievement, achIndex) => (
                          <li key={achIndex}>• {achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
