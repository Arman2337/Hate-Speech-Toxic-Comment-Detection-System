import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiShield, FiZap, FiBarChart2, FiUsers, FiArrowRight, FiPlay } from 'react-icons/fi'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ToxicityMeter from '../components/charts/ToxicityMeter'

const Home = () => {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const features = [
    {
      icon: FiShield,
      title: 'Advanced Detection',
      description: 'AI-powered toxic speech detection with high accuracy and real-time analysis.'
    },
    {
      icon: FiZap,
      title: 'Real-time Analysis',
      description: 'Get instant results with our optimized machine learning algorithms.'
    },
    {
      icon: FiBarChart2,
      title: 'Detailed Reports',
      description: 'Comprehensive analytics and insights for better content moderation.'
    },
    {
      icon: FiUsers,
      title: 'Batch Processing',
      description: 'Process multiple texts simultaneously for efficient content review.'
    }
  ]

  const handleAnalyze = async () => {
    if (!text.trim()) return
    
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const mockScore = Math.random() * 0.4 // Low toxicity for demo
      setResult({
        score: mockScore,
        isToxic: mockScore > 0.5,
        categories: {
          toxic: mockScore,
          severe_toxic: mockScore * 0.3,
          obscene: mockScore * 0.2,
          threat: mockScore * 0.1,
          insult: mockScore * 0.4,
          identity_hate: mockScore * 0.1
        }
      })
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen lg:ml-64">
      {/* Hero Section */}
      <section className="pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center p-4 bg-white/20 rounded-3xl mb-6 pulse-glow">
              <FiShield className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight gradient-text">
              ToxiGuard AI
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Advanced AI-powered toxic speech detection system for safer online communities
            </p>
          </div>
        </div>
      </section>

      {/* Quick Analyzer */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Try It Now - Quick Text Analysis
            </h2>
            
            <div className="space-y-6">
              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text to analyze for toxicity..."
                  className="w-full h-32 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                  disabled={isLoading}
                />
                {text && (
                  <div className="absolute bottom-3 right-3 text-sm text-white/60">
                    {text.length} characters
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleAnalyze}
                  disabled={!text.trim() || isLoading}
                  loading={isLoading}
                  className="px-8 py-3"
                  size="lg"
                >
                  <FiPlay className="w-5 h-5 mr-2" />
                  Analyze Text
                </Button>
              </div>

              {result && (
                <Card className="bg-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">Analysis Result</h3>
                      <p className={`text-sm ${result.isToxic ? 'text-red-400' : 'text-green-400'}`}>
                        Content is {result.isToxic ? 'potentially toxic' : 'clean'}
                      </p>
                    </div>
                    <ToxicityMeter score={result.score} size="sm" />
                  </div>
                </Card>
              )}
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Everything you need for comprehensive toxic content detection and analysis
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} hover className="text-center">
                <div className="p-4 bg-white/20 rounded-2xl w-fit mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Experience the power of AI-driven content moderation. Sign up for full access to all features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="xl" className="w-full sm:w-auto">
                  <span>Get Started Free</span>
                  <FiArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="secondary" size="xl" className="w-full sm:w-auto">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default Home
