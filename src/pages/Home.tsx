import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  TestTube, 
  CheckCircle, 
  Zap, 
  BarChart3, 
  Play, 
  ArrowRight,
  Shield,
  Target,
  Timer
} from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: TestTube,
      title: "Selenium Automation",
      description: "End-to-end browser testing with cross-platform support"
    },
    {
      icon: CheckCircle,
      title: "Cypress Testing",
      description: "Fast, reliable frontend integration testing"
    },
    {
      icon: Zap,
      title: "CI/CD Integration",
      description: "Automated pipeline with GitHub Actions"
    },
    {
      icon: BarChart3,
      title: "Coverage Reports",
      description: "Detailed testing metrics and analytics"
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "90%+ code coverage with comprehensive test suites"
    },
    {
      icon: Target,
      title: "Test Accuracy",
      description: "Precise testing with minimal false positives"
    }
  ];

  const stats = [
    { label: "Test Coverage", value: "94%", color: "text-success" },
    { label: "Tests Passed", value: "847", color: "text-info" },
    { label: "Build Time", value: "2.3m", color: "text-warning" },
    { label: "Success Rate", value: "99.2%", color: "text-success" }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-float mb-8">
            <div className="w-20 h-20 gradient-primary rounded-2xl mx-auto flex items-center justify-center shadow-glow">
              <TestTube className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Automated Testing Suite
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Professional-grade testing automation with Selenium, Cypress, and CI/CD integration. 
            Built for modern web applications with comprehensive coverage and real-time reporting.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="gradient-primary shadow-glow text-white border-0">
                <Play className="w-5 h-5 mr-2" />
                View Test Dashboard
              </Button>
            </Link>
            <Link to="/tasks">
              <Button size="lg" variant="outline">
                Try Demo App
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="shadow-card border-border/50">
                <CardContent className="p-6 text-center">
                  <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete Testing Solution
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for professional web application testing, 
              from unit tests to end-to-end automation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card border-border/50 hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 gradient-secondary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="gradient-primary shadow-glow">
            <CardContent className="p-12 text-center text-white">
              <Timer className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl font-bold mb-4">
                Ready to Start Testing?
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Explore our demo task manager application and see how comprehensive 
                automated testing works in real-time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/tasks">
                  <Button size="lg" variant="secondary">
                    <TestTube className="w-5 h-5 mr-2" />
                    Demo Application
                  </Button>
                </Link>
                <Link to="/reports">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    View Reports
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;