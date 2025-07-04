import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react"

export default function BlogPostPage({ params }: { params: { id: string } }) {
  // Mock blog post data - in a real app, this would be fetched based on the ID
  const post = {
    id: Number.parseInt(params.id),
    title: "Getting Started with Python for Data Science",
    content: `
# Introduction

Data science has become one of the most sought-after fields in technology, and Python has emerged as the go-to programming language for data scientists worldwide. In this comprehensive guide, we'll explore why Python is perfect for data science and how you can get started on your journey.

## Why Python for Data Science?

Python's popularity in data science isn't accidental. Here are the key reasons why it's the preferred choice:

### 1. Simplicity and Readability
Python's syntax is clean and intuitive, making it accessible to beginners while remaining powerful enough for experts. This readability is crucial when working with complex data analysis workflows.

### 2. Rich Ecosystem of Libraries
The Python ecosystem offers incredible libraries specifically designed for data science:

- **Pandas**: Data manipulation and analysis
- **NumPy**: Numerical computing
- **Matplotlib & Seaborn**: Data visualization
- **Scikit-learn**: Machine learning
- **Jupyter**: Interactive development environment

### 3. Strong Community Support
Python has a massive, active community that contributes to open-source projects, provides support, and creates educational content.

## Essential Libraries to Master

Let's dive deeper into the core libraries you'll need:

### Pandas
Pandas is your Swiss Army knife for data manipulation. It provides data structures like DataFrames that make working with structured data intuitive.

\`\`\`python
import pandas as pd

# Reading data
df = pd.read_csv('data.csv')

# Basic operations
df.head()  # View first 5 rows
df.info()  # Get data info
df.describe()  # Statistical summary
\`\`\`

### NumPy
NumPy provides the foundation for numerical computing in Python, offering efficient array operations.

\`\`\`python
import numpy as np

# Creating arrays
arr = np.array([1, 2, 3, 4, 5])

# Mathematical operations
mean = np.mean(arr)
std = np.std(arr)
\`\`\`

### Matplotlib
For creating visualizations to understand your data better.

\`\`\`python
import matplotlib.pyplot as plt

# Simple plot
plt.plot([1, 2, 3, 4], [1, 4, 2, 3])
plt.xlabel('X-axis')
plt.ylabel('Y-axis')
plt.title('Sample Plot')
plt.show()
\`\`\`

## Getting Started: Your First Data Science Project

Here's a step-by-step approach to your first project:

### Step 1: Set Up Your Environment
Install the necessary packages using pip:

\`\`\`bash
pip install pandas numpy matplotlib seaborn jupyter scikit-learn
\`\`\`

### Step 2: Choose a Dataset
Start with clean, well-documented datasets like:
- Iris dataset (classification)
- Boston Housing (regression)
- Titanic dataset (classification)

### Step 3: Explore Your Data
Always start with exploratory data analysis (EDA):

\`\`\`python
# Load and explore
df = pd.read_csv('your_dataset.csv')
print(df.shape)
print(df.columns)
print(df.isnull().sum())
\`\`\`

### Step 4: Clean and Prepare Data
Handle missing values, outliers, and prepare features:

\`\`\`python
# Handle missing values
df.fillna(df.mean(), inplace=True)

# Remove outliers
Q1 = df.quantile(0.25)
Q3 = df.quantile(0.75)
IQR = Q3 - Q1
df = df[~((df < (Q1 - 1.5 * IQR)) | (df > (Q3 + 1.5 * IQR))).any(axis=1)]
\`\`\`

### Step 5: Visualize Your Findings
Create meaningful visualizations:

\`\`\`python
import seaborn as sns

# Correlation heatmap
plt.figure(figsize=(10, 8))
sns.heatmap(df.corr(), annot=True, cmap='coolwarm')
plt.show()
\`\`\`

## Best Practices for Data Science with Python

### 1. Use Virtual Environments
Always work in isolated environments to avoid dependency conflicts:

\`\`\`bash
python -m venv data_science_env
source data_science_env/bin/activate  # On Windows: data_science_env\\Scripts\\activate
\`\`\`

### 2. Document Your Work
Use Jupyter notebooks for exploration and document your thought process. Include markdown cells explaining your approach.

### 3. Version Control
Use Git to track your projects and collaborate with others.

### 4. Follow the Data Science Process
1. Define the problem
2. Collect and explore data
3. Clean and prepare data
4. Model and analyze
5. Communicate results

## Common Pitfalls to Avoid

### 1. Jumping to Modeling Too Quickly
Spend adequate time understanding your data before building models.

### 2. Ignoring Data Quality
Poor data quality leads to poor results. Always validate and clean your data.

### 3. Overfitting
Don't create overly complex models that don't generalize well.

### 4. Not Validating Results
Always use proper validation techniques like cross-validation.

## Next Steps

Once you're comfortable with the basics:

1. **Learn SQL**: Essential for working with databases
2. **Master Statistics**: Understanding statistical concepts is crucial
3. **Explore Machine Learning**: Start with scikit-learn
4. **Practice Regularly**: Work on projects and participate in competitions
5. **Join Communities**: Engage with other data scientists online

## Conclusion

Python provides an excellent foundation for data science with its simplicity, powerful libraries, and strong community support. The key to success is consistent practice and working on real projects.

Remember, data science is as much about asking the right questions as it is about technical skills. Start with simple projects, gradually increase complexity, and don't be afraid to experiment.

Happy coding, and welcome to the exciting world of data science!

## Resources for Further Learning

- **Books**: "Python for Data Analysis" by Wes McKinney
- **Online Courses**: Coursera, edX, Udacity
- **Practice Platforms**: Kaggle, Google Colab
- **Documentation**: Official Python and library documentation

---

*Have questions about getting started with Python for data science? Feel free to reach out through the contact page or leave a comment below.*
    `,
    author: "Your Name",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Data Science",
    tags: ["Python", "Data Science", "Pandas", "NumPy", "Beginner"],
    published: true,
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>

        {/* Article Header */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <Badge className="w-fit mx-auto mb-4">{post.category}</Badge>
            <CardTitle className="text-3xl md:text-4xl font-bold leading-tight">{post.title}</CardTitle>
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600 mt-6">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardHeader>
        </Card>

        {/* Article Content */}
        <Card>
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed">
                {post.content.split("\n").map((line, index) => {
                  if (line.startsWith("# ")) {
                    return (
                      <h1 key={index} className="text-3xl font-bold mt-8 mb-4">
                        {line.substring(2)}
                      </h1>
                    )
                  } else if (line.startsWith("## ")) {
                    return (
                      <h2 key={index} className="text-2xl font-semibold mt-6 mb-3">
                        {line.substring(3)}
                      </h2>
                    )
                  } else if (line.startsWith("### ")) {
                    return (
                      <h3 key={index} className="text-xl font-semibold mt-4 mb-2">
                        {line.substring(4)}
                      </h3>
                    )
                  } else if (line.startsWith("```")) {
                    return null // Handle code blocks separately if needed
                  } else if (line.startsWith("- ") || line.startsWith("* ")) {
                    return (
                      <li key={index} className="ml-4">
                        {line.substring(2)}
                      </li>
                    )
                  } else if (line.trim() === "") {
                    return <br key={index} />
                  } else {
                    return (
                      <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                        {line}
                      </p>
                    )
                  }
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Share and Actions */}
        <div className="flex justify-between items-center mt-8 p-6 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-semibold mb-2">Share this article</h3>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Share2 className="h-4 w-4 mr-1" />
                Twitter
              </Button>
              <Button size="sm" variant="outline">
                <Share2 className="h-4 w-4 mr-1" />
                LinkedIn
              </Button>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-2">Enjoyed this article?</p>
            <Button asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <Badge variant="outline" className="mb-2">
                  Cybersecurity
                </Badge>
                <h3 className="font-semibold mb-2">
                  <Link href="/blog/2" className="hover:text-blue-600 transition-colors">
                    Cybersecurity Best Practices for Developers
                  </Link>
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Essential security practices every developer should know...
                </p>
                <div className="text-xs text-gray-500">12 min read</div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <Badge variant="outline" className="mb-2">
                  Database
                </Badge>
                <h3 className="font-semibold mb-2">
                  <Link href="/blog/4" className="hover:text-blue-600 transition-colors">
                    Database Optimization Techniques
                  </Link>
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Advanced MySQL optimization strategies to improve performance...
                </p>
                <div className="text-xs text-gray-500">10 min read</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
