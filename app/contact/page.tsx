"use client";

import type React from "react";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Send,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function ContactPage() {
  /* ---------- local form state ---------- */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /* ---------- submit handler (Formspree) ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("https://formspree.io/f/xgvybool", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Formspree error");

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      alert(
        "Sorry – your message could not be sent. Please try again or email me directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------- input change handler ---------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ---------- static info ---------- */
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "muiruriian82@gmail.com",
      href: "mailto:muiruriian82@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+254 748 264 231",
      href: "tel:+254748264231",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Nairobi, Kenya",
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/iantech-cloud",
      color: "hover:text-gray-900",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/yourusername",
      color: "hover:text-blue-600",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com/yourusername",
      color: "hover:text-blue-400",
    },
  ];

  const services = [
    "Python Development",
    "Data Science Consulting",
    "Cybersecurity Assessment",
    "Technical Training",
    "Code Review",
    "Database Optimization",
  ];

  /* ---------- render ---------- */
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-600">
            Let's discuss your project, collaboration opportunities, or just say
            hello!
          </p>
        </div>

        {/* main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ------------- contact form ------------- */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send Me a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Tell me about your project, question, or how I can help..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-600">
                      Thank you for reaching out. I'll get back to you within 24
                      hours.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* ------------- sidebar ------------- */}
          <div className="space-y-6">
            {/* contact details */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{item.label}</p>
                        {item.href !== "#" ? (
                          <a
                            href={item.href}
                            className="text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-gray-600">{item.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* social */}
            <Card>
              <CardHeader>
                <CardTitle>Connect With Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  {socialLinks.map((social, i) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-lg border hover:shadow-md transition-all ${social.color}`}
                        title={social.label}
                      >
                        <Icon className="h-6 w-6" />
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* services */}
            <Card>
              <CardHeader>
                <CardTitle>Services I Offer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {services.map((service, i) => (
                    <Badge key={i} variant="outline">
                      {service}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* response time */}
            <Card>
              <CardHeader>
                <CardTitle>Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>General Inquiries:</span>
                    <span className="font-medium">Within 24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Project Discussions:</span>
                    <span className="font-medium">Within 48 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Urgent Matters:</span>
                    <span className="font-medium">Same day</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* availability */}
            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday – Friday:</span>
                    <span>9:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM – 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>By appointment</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    * Times are in your local timezone
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ------------- FAQ ------------- */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">
                  What's your typical project timeline?
                </h3>
                <p className="text-gray-600 text-sm">
                  Project timelines vary based on complexity. Small projects
                  typically take 1‑2 weeks, while larger applications can take
                  1‑3 months. I'll provide a detailed timeline during our
                  initial discussion.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">
                  Do you offer ongoing support?
                </h3>
                <p className="text-gray-600 text-sm">
                  Yes! I provide ongoing maintenance and support for all
                  projects. This includes bug fixes, updates, and feature
                  enhancements as needed.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">
                  Can you work with existing teams?
                </h3>
                <p className="text-gray-600 text-sm">
                  I enjoy collaborating with existing development teams and can
                  adapt to your current workflows and methodologies.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">
                  What technologies do you specialize in?
                </h3>
                <p className="text-gray-600 text-sm">
                  I specialize in Python, PHP, MySQL, data science libraries,
                  and cybersecurity tools. I'm also experienced with modern web
                  frameworks and cloud platforms.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
