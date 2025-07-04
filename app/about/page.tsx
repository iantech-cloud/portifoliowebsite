import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, GraduationCap, Briefcase } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-xl text-gray-600">Get to know more about my journey, experience, and aspirations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Bio */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Professional Background
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  I am a passionate technology professional with a diverse background spanning software development,
                  data science, and cybersecurity. My journey in tech began with a fascination for problem-solving and
                  has evolved into a career dedicated to creating innovative solutions and sharing knowledge.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  As a developer, I specialize in Python and PHP, building robust applications and data-driven
                  solutions. My expertise in MySQL and database design allows me to create efficient, scalable systems
                  that handle complex data requirements.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  In the field of data science, I leverage statistical analysis and machine learning techniques to
                  extract meaningful insights from data. I'm particularly passionate about using data to drive
                  decision-making and solve real-world problems.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  My role as an educator has been incredibly fulfilling, allowing me to mentor aspiring developers and
                  data scientists. I believe in the power of knowledge sharing and am committed to helping others
                  succeed in their tech careers.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Currently pursuing studies in cybersecurity, I'm expanding my expertise to include security best
                  practices and threat analysis. This knowledge enhances my ability to build secure, reliable systems
                  and protect valuable data assets.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Quick Facts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">5+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Cybersecurity Student</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Educator & Developer</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Core Values</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Innovation</Badge>
                  <Badge variant="secondary">Continuous Learning</Badge>
                  <Badge variant="secondary">Collaboration</Badge>
                  <Badge variant="secondary">Quality</Badge>
                  <Badge variant="secondary">Mentorship</Badge>
                  <Badge variant="secondary">Problem Solving</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Career Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Advance cybersecurity expertise</li>
                  <li>• Lead innovative data science projects</li>
                  <li>• Mentor the next generation of developers</li>
                  <li>• Contribute to open-source projects</li>
                  <li>• Build secure, scalable applications</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Professional Journey</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Senior Developer & Data Scientist</h3>
                  <Badge>2022 - Present</Badge>
                </div>
                <p className="text-gray-600 mb-2">
                  Leading development of data-driven applications and analytics platforms
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Python</Badge>
                  <Badge variant="outline">Machine Learning</Badge>
                  <Badge variant="outline">MySQL</Badge>
                  <Badge variant="outline">Team Leadership</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Programming Instructor</h3>
                  <Badge>2020 - Present</Badge>
                </div>
                <p className="text-gray-600 mb-2">
                  Teaching Python programming and data analysis to students and professionals
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Education</Badge>
                  <Badge variant="outline">Curriculum Development</Badge>
                  <Badge variant="outline">Mentoring</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Full Stack Developer</h3>
                  <Badge>2019 - 2022</Badge>
                </div>
                <p className="text-gray-600 mb-2">
                  Developed web applications using PHP, MySQL, and modern frontend technologies
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">PHP</Badge>
                  <Badge variant="outline">MySQL</Badge>
                  <Badge variant="outline">JavaScript</Badge>
                  <Badge variant="outline">Web Development</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
