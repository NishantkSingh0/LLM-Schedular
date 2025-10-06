import React from "react";
import { Camera, DollarSign, Smartphone, LayoutDashboard, Brain, Shield } from "lucide-react";

const Card = ({ children, className }) => (
  <div className={`bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => <div className="mb-4">{children}</div>;
const CardContent = ({ children }) => <div>{children}</div>;
const CardTitle = ({ children }) => (
  <h3 className="text-xl font-bold text-white mb-2">{children}</h3>
);
const Badge = ({ children, variant = "default", className }) => (
  <span
    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
      variant === "outline"
        ? "border border-blue-400 text-blue-400"
        : "bg-blue-500/10 text-blue-400"
    } ${className}`}
  >
    {children}
  </span>
);

const WhatNew = () => {
  const updates = [
    {
      icon: Camera,
      title: "Webcam Integration",
      badge: "Major Update",
      description:
        "Introduced webcam monitoring system to prevent cheating during AI-driven assessments.",
      features: [
        "Real-time detection and secure data handling",
        "Ensures fairness in online recruitment and exams",
        "Helps organizations maintain integrity",
      ],
      delay: "0ms",
    },
    {
      icon: DollarSign,
      title: "New Smart Pricing Plans",
      badge: "New",
      description:
        "Flexible pricing for startups and enterprises with transparent and affordable options.",
      features: [
        "Monthly + yearly subscriptions available",
        "Trial options for all plans",
        "Transparent pricing structure",
      ],
      delay: "100ms",
    },
    {
      icon: Smartphone,
      title: "Mobile App Launch",
      badge: "New",
      description:
        "Velora AI is now available on Android & iOS with a clean, dark-themed UI.",
      features: [
        "Manage hiring and view reports on the go",
        "Track interviews from your phone",
        "Smooth animations and responsive layout",
      ],
      delay: "200ms",
    },
    {
      icon: LayoutDashboard,
      title: "Improved Dashboard Experience",
      badge: "Enhanced",
      description:
        "Fully redesigned dashboard for better visualization and user experience.",
      features: [
        "Quick access to analytics and insights",
        "Smoother animations and transitions",
        "Enhanced data visualization",
      ],
      delay: "300ms",
    },
    {
      icon: Brain,
      title: "AI Enhancement Update",
      badge: "Improved",
      description: "Smarter candidate ranking model using updated LLM algorithms.",
      features: [
        "More accurate recommendations",
        "Reduced bias in evaluations",
        "30% faster processing of large datasets",
      ],
      delay: "400ms",
    },
    {
      icon: Shield,
      title: "Privacy & Compliance",
      badge: "Security",
      description:
        "GDPR-ready secure data handling with enhanced encryption.",
      features: [
        "Role-based access control",
        "Enhanced encryption for webcam data",
        "Full compliance with privacy regulations",
      ],
      delay: "500ms",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-950 text-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
           
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            What's New in Velora AI
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover the latest features and improvements designed to
            revolutionize your hiring and assessment experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {updates.map((update, index) => (
            <Card
              key={index}
              className="hover:border-blue-400 transition-all duration-300"
              style={{ animationDelay: update.delay }}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-blue-500/10">
                    <update.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <Badge variant="default" className="text-xs">
                    {update.badge}
                  </Badge>
                </div>
                <CardTitle>{update.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">{update.description}</p>
                <ul className="space-y-2">
                  {update.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-sm text-gray-400">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-400 text-lg mb-6">
            Stay tuned for more exciting updates and features
          </p>
          <div className="inline-block rounded-full p-1 bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="px-8 py-4 bg-gray-900 rounded-full">
              <span className="text-white font-semibold text-lg">
                Velora AI 
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatNew;
