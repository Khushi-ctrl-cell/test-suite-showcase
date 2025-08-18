import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Clock, 
  FileText,
  Download,
  Calendar,
  Award,
  AlertTriangle,
  CheckCircle2,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Reports = () => {
  const coverageData = [
    { name: "Unit Tests", coverage: 94, total: 156, passed: 152 },
    { name: "Integration Tests", coverage: 87, total: 43, passed: 39 },
    { name: "End-to-End Tests", coverage: 91, total: 28, passed: 26 },
    { name: "API Tests", coverage: 96, total: 67, passed: 65 }
  ];

  const trendData = [
    { period: "Week 1", coverage: 78, tests: 145 },
    { period: "Week 2", coverage: 82, tests: 167 },
    { period: "Week 3", coverage: 89, tests: 198 },
    { period: "Week 4", coverage: 94, tests: 216 }
  ];

  const recentBuilds = [
    { 
      id: "build-124", 
      branch: "main", 
      status: "passed", 
      duration: "2m 34s", 
      coverage: 94, 
      date: "2024-01-18T10:30:00",
      commit: "abc123f"
    },
    { 
      id: "build-123", 
      branch: "feature/auth", 
      status: "passed", 
      duration: "3m 12s", 
      coverage: 92, 
      date: "2024-01-18T09:15:00",
      commit: "def456a"
    },
    { 
      id: "build-122", 
      branch: "main", 
      status: "failed", 
      duration: "1m 45s", 
      coverage: 89, 
      date: "2024-01-17T16:22:00",
      commit: "ghi789b"
    },
    { 
      id: "build-121", 
      branch: "main", 
      status: "passed", 
      duration: "2m 56s", 
      coverage: 91, 
      date: "2024-01-17T14:10:00",
      commit: "jkl012c"
    }
  ];

  const overallCoverage = Math.round(
    coverageData.reduce((acc, item) => acc + item.coverage, 0) / coverageData.length
  );

  const totalTests = coverageData.reduce((acc, item) => acc + item.total, 0);
  const totalPassed = coverageData.reduce((acc, item) => acc + item.passed, 0);
  const successRate = Math.round((totalPassed / totalTests) * 100);

  return (
    <div className="min-h-screen pt-20 px-4 pb-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Testing Reports</h1>
            <p className="text-muted-foreground">
              Comprehensive coverage analysis and testing metrics
            </p>
          </div>
          
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overall Coverage</p>
                  <p className="text-3xl font-bold text-success">{overallCoverage}%</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-success mr-1" />
                    <span className="text-sm text-success">+5.2%</span>
                  </div>
                </div>
                <Target className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-3xl font-bold text-info">{successRate}%</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-info mr-1" />
                    <span className="text-sm text-info">+2.1%</span>
                  </div>
                </div>
                <Award className="w-8 h-8 text-info" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Tests</p>
                  <p className="text-3xl font-bold">{totalTests}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-warning mr-1" />
                    <span className="text-sm text-warning">+18 this week</span>
                  </div>
                </div>
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Build Time</p>
                  <p className="text-3xl font-bold">2.4m</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-success mr-1" />
                    <span className="text-sm text-success">-12s</span>
                  </div>
                </div>
                <Clock className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Coverage Breakdown */}
          <div className="lg:col-span-2">
            <Card className="shadow-card mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Coverage Breakdown by Test Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {coverageData.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{item.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {item.passed}/{item.total} tests
                          </span>
                          <Badge 
                            variant={item.coverage >= 90 ? "default" : item.coverage >= 80 ? "secondary" : "destructive"}
                          >
                            {item.coverage}%
                          </Badge>
                        </div>
                      </div>
                      <Progress value={item.coverage} className="h-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trends */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Coverage Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trendData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-medium">{index + 1}</span>
                        </div>
                        <div>
                          <div className="font-medium">{item.period}</div>
                          <div className="text-sm text-muted-foreground">
                            {item.tests} total tests
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{item.coverage}%</div>
                        <div className="text-sm text-muted-foreground">coverage</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Builds */}
          <div className="lg:col-span-1">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Builds
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBuilds.map((build, index) => (
                    <div key={build.id} className="p-4 border border-border/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {build.branch}
                        </code>
                        <Badge 
                          variant={build.status === 'passed' ? 'default' : 'destructive'}
                          className="flex items-center gap-1"
                        >
                          {build.status === 'passed' ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <AlertTriangle className="w-3 h-3" />
                          )}
                          {build.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span>{build.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Coverage:</span>
                          <span>{build.coverage}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Commit:</span>
                          <code className="text-xs">{build.commit}</code>
                        </div>
                        <div className="text-xs mt-2">
                          {new Date(build.date).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quality Gates */}
        <Card className="shadow-card mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Quality Gates Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                <div>
                  <div className="font-medium">Code Coverage</div>
                  <div className="text-sm text-muted-foreground">Minimum 85%</div>
                </div>
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              
              <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                <div>
                  <div className="font-medium">Build Time</div>
                  <div className="text-sm text-muted-foreground">Maximum 5 min</div>
                </div>
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              
              <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                <div>
                  <div className="font-medium">Test Success</div>
                  <div className="text-sm text-muted-foreground">Minimum 95%</div>
                </div>
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              
              <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                <div>
                  <div className="font-medium">Security Scan</div>
                  <div className="text-sm text-muted-foreground">No critical issues</div>
                </div>
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;