import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw,
  TestTube,
  Monitor,
  Zap,
  AlertTriangle,
  Activity,
  Code,
  Globe
} from "lucide-react";

interface TestResult {
  id: string;
  name: string;
  type: 'unit' | 'integration' | 'e2e';
  status: 'running' | 'passed' | 'failed' | 'pending';
  duration: number;
  coverage: number;
  lastRun: Date;
}

const TestDashboard = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const [testResults, setTestResults] = useState<TestResult[]>([
    {
      id: "1",
      name: "Task CRUD Operations",
      type: "unit",
      status: "passed",
      duration: 1.2,
      coverage: 95,
      lastRun: new Date("2024-01-18T10:30:00")
    },
    {
      id: "2", 
      name: "User Interface Components",
      type: "integration",
      status: "passed",
      duration: 3.4,
      coverage: 89,
      lastRun: new Date("2024-01-18T10:31:15")
    },
    {
      id: "3",
      name: "Navigation Flow",
      type: "e2e",
      status: "running",
      duration: 0,
      coverage: 0,
      lastRun: new Date()
    },
    {
      id: "4",
      name: "Form Validation",
      type: "integration",
      status: "failed",
      duration: 2.1,
      coverage: 73,
      lastRun: new Date("2024-01-18T10:28:45")
    },
    {
      id: "5",
      name: "API Endpoints",
      type: "unit",
      status: "passed",
      duration: 0.8,
      coverage: 92,
      lastRun: new Date("2024-01-18T10:29:30")
    }
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsRunning(false);
            // Simulate test completion
            setTestResults(prev => prev.map(test => 
              test.status === 'running' 
                ? { ...test, status: 'passed', duration: Math.random() * 5, coverage: 85 + Math.random() * 10 }
                : test
            ));
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const runAllTests = () => {
    setIsRunning(true);
    setProgress(0);
    setTestResults(prev => prev.map(test => ({ 
      ...test, 
      status: 'running',
      lastRun: new Date()
    })));
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'running':
        return <Clock className="w-4 h-4 text-warning animate-pulse" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTypeIcon = (type: TestResult['type']) => {
    switch (type) {
      case 'unit':
        return <Code className="w-4 h-4" />;
      case 'integration':
        return <Activity className="w-4 h-4" />;
      case 'e2e':
        return <Globe className="w-4 h-4" />;
    }
  };

  const testStats = {
    total: testResults.length,
    passed: testResults.filter(t => t.status === 'passed').length,
    failed: testResults.filter(t => t.status === 'failed').length,
    running: testResults.filter(t => t.status === 'running').length,
    coverage: Math.round(testResults.reduce((acc, test) => acc + test.coverage, 0) / testResults.length)
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Test Dashboard</h1>
            <p className="text-muted-foreground">
              Real-time automated testing results and coverage metrics
            </p>
          </div>
          
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button 
              onClick={runAllTests} 
              disabled={isRunning}
              className="gradient-primary text-white"
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run All Tests
                </>
              )}
            </Button>
            <Button variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        {isRunning && (
          <Card className="mb-8 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Test Execution Progress</span>
                <span className="text-sm text-muted-foreground">{progress.toFixed(0)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </CardContent>
          </Card>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Tests</p>
                  <p className="text-2xl font-bold">{testStats.total}</p>
                </div>
                <TestTube className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Passed</p>
                  <p className="text-2xl font-bold text-success">{testStats.passed}</p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Failed</p>
                  <p className="text-2xl font-bold text-destructive">{testStats.failed}</p>
                </div>
                <XCircle className="w-8 h-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Coverage</p>
                  <p className="text-2xl font-bold text-info">{testStats.coverage}%</p>
                </div>
                <Monitor className="w-8 h-8 text-info" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Test Results */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Test Suite List */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TestTube className="w-5 h-5" />
                  Test Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testResults.map((test) => (
                    <Card key={test.id} className="border border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(test.status)}
                            <div>
                              <h3 className="font-semibold">{test.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                {getTypeIcon(test.type)}
                                <span className="text-sm text-muted-foreground capitalize">
                                  {test.type} test
                                </span>
                                {test.duration > 0 && (
                                  <>
                                    <span className="text-muted-foreground">•</span>
                                    <span className="text-sm text-muted-foreground">
                                      {test.duration.toFixed(1)}s
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            {test.coverage > 0 && (
                              <div className="text-right">
                                <div className="text-sm font-medium">{test.coverage}%</div>
                                <div className="text-xs text-muted-foreground">coverage</div>
                              </div>
                            )}
                            <Badge 
                              variant={
                                test.status === 'passed' ? 'default' :
                                test.status === 'failed' ? 'destructive' : 'secondary'
                              }
                            >
                              {test.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Testing Tools */}
          <div className="lg:col-span-1">
            <Card className="shadow-card mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Testing Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="font-medium">Selenium</span>
                  </div>
                  <Badge variant="outline">E2E</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="font-medium">Cypress</span>
                  </div>
                  <Badge variant="outline">Integration</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="font-medium">Jest</span>
                  </div>
                  <Badge variant="outline">Unit</Badge>
                </div>
              </CardContent>
            </Card>

            {/* CI/CD Status */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  CI/CD Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Build</span>
                  <Badge className="bg-success">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Passed
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Build Time</span>
                  <span className="text-sm text-muted-foreground">2m 34s</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Branch</span>
                  <code className="text-xs bg-muted px-2 py-1 rounded">main</code>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Commit</span>
                  <code className="text-xs bg-muted px-2 py-1 rounded">abc123f</code>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDashboard;